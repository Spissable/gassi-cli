import { Command, flags } from '@oclif/command';
import axios from 'axios';
import * as inquirer from 'inquirer';
import { v4 as uuid } from 'uuid';
import { executeCommands } from '../constants/executeCommands';
import { ExecuteRequest } from '../entities/ExecuteRequest';
import { readConfig } from '../util/configUtil';
import { parseInput } from '../util/parseUtil';

export default class Execute extends Command {
  static description = 'Sends an EXECUTE request intent';

  static flags = {
    token: flags.string({
      char: 't',
      description: 'oauth access token',
      env: 'token',
      required: true,
    }),
    uri: flags.string({
      char: 'u',
      description: 'uri of the service',
      env: 'uri',
      required: true,
    }),
    id: flags.string({
      char: 'i',
      description: 'id to query',
      env: 'id',
      required: false,
    }),
    command: flags.string({
      char: 'c',
      description: 'command to execute',
      env: 'command',
      required: false,
    }),

    help: flags.help({ char: 'h' }),
  };

  static args = [
    { name: 'paramName', required: false },
    {
      name: 'paramValue',
      required: false,
    },
  ];

  async run() {
    const { args, flags } = this.parse(Execute);
    const id =
      flags.id ||
      (await this.promptId().catch(() => {
        this.error('Please run sync first or provide arguments.');
      }));
    const command = flags.command || (await this.promptCommand());
    const paramName = args.paramName || (await this.promptParamName(command));
    const paramValueStr =
      args.paramValue || (await this.promptParamValue(command, paramName));
    const paramValue = parseInput(paramValueStr);
    const requestId = uuid();

    let commandParams: any = { [paramName]: paramValue };
    if (command === 'SetModes') {
      commandParams = {
        updateModeSettings: {
          [args.paramName]: paramValue,
        },
      };
    } else if (command === 'SetToggles') {
      commandParams = {
        updateToggleSettings: {
          [args.paramName]: paramValue,
        },
      };
    }
    const executeBody: ExecuteRequest = {
      requestId,
      inputs: [
        {
          intent: 'action.devices.EXECUTE',
          payload: {
            commands: [
              {
                devices: [{ id }],
                execution: [
                  {
                    command: `action.devices.commands.${command}`,
                    params: commandParams,
                  },
                ],
              },
            ],
          },
        },
      ],
    };

    await axios
      .post(flags.uri, executeBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${flags.token}`,
        },
        responseType: 'json',
      })
      .then(
        (response) => {
          this.log(JSON.stringify(response.data, null, 2));
        },
        (error) => {
          this.log(`Request ${requestId} failed with:`);
          this.log(JSON.stringify(error.response.data, null, 2));
        },
      );
  }

  async promptId(): Promise<string> {
    const syncedDevices = await readConfig(this.config.configDir);
    const responses = await inquirer.prompt([
      {
        name: 'id',
        message: 'select a device id',
        type: 'list',
        choices: syncedDevices.ids,
      },
    ]);
    return responses.id;
  }

  async promptCommand(): Promise<string> {
    const commands = Object.keys(executeCommands);
    const responses = await inquirer.prompt([
      {
        name: 'command',
        message: 'select a command',
        type: 'list',
        choices: commands,
      },
    ]);
    return responses.command;
  }

  async promptParamName(command: string): Promise<string> {
    const params = Object.keys(executeCommands[command]);
    const responses = await inquirer.prompt([
      {
        name: 'param',
        message: 'select a param',
        type: 'list',
        choices: params,
      },
    ]);
    return responses.param;
  }

  async promptParamValue(command: string, param: string): Promise<string> {
    const values = executeCommands[command][param];
    const responses = await inquirer.prompt([
      {
        name: 'value',
        message: 'select a value',
        type: 'list',
        choices: values,
      },
    ]);
    return responses.value;
  }
}
