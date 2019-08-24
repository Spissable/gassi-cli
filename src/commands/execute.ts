import { Command, flags } from "@oclif/command";
import axios from "axios";
import * as uuid from "uuid/v4";

export default class Execute extends Command {
  static description = "Sends a QUERY request intent";

  static flags = {
    token: flags.string({
      char: "t",
      description: "oauth access token",
      env: "token",
      required: true
    }),
    uri: flags.string({
      char: "u",
      description: "uri of the service",
      env: "uri",
      required: true
    }),
    id: flags.string({
      char: "i",
      description: "id to query",
      env: "id",
      required: true
    }),
    command: flags.string({
      char: "c",
      description: "command to execute",
      env: "command",
      required: true
    }),

    help: flags.help({ char: "h" })
  };

  static args = [
    { name: "paramName", required: true },
    { name: "paramValue", required: true }
  ];

  async run() {
    const { args, flags } = this.parse(Execute);
    const command = flags.command;
    const requestId = uuid();
    const commandParams =
      command === "SetModes"
        ? {
            currentModeSettings: {
              [args.paramName]: args.paramValue
            }
          }
        : { [args.paramName]: args.paramValue };

    await axios
      .post(
        flags.uri,
        {
          requestId,
          inputs: [
            {
              intent: "action.devices.EXECUTE",
              payload: {
                commands: [
                  {
                    devices: [{ id: flags.id }],
                    execution: [
                      {
                        command: `action.devices.commands.${command}`,
                        params: commandParams
                      }
                    ]
                  }
                ]
              }
            }
          ]
        } as ExecuteBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${flags.token}`
          },
          responseType: "json"
        }
      )
      .then(
        response => {
          this.log(JSON.stringify(response.data, null, 2));
        },
        error => {
          this.log(`Request ${requestId} failed with:`);
          this.log(error.message);
        }
      );
  }
}

interface ExecuteBody {
  requestId: string;
  inputs: {
    intent: "action.devices.EXECUTE";
    payload: {
      commands: {
        devices: { id: string }[];
        execution: {
          command: string;
          params: any;
        }[];
      }[];
    };
  }[];
}
