import { Command, flags } from "@oclif/command";
import axios from "axios";
import { v4 as uuid } from "uuid";
import * as inquirer from "inquirer";
import { QueryRequest } from "../entities/QueryRequest";
import { readConfig } from "../util/configUtil";

export default class Query extends Command {
  static description = "Sends a QUERY request intent";

  static flags = {
    token: flags.string({
      char: "t",
      description: "oauth access token",
      env: "token",
      required: true,
    }),
    uri: flags.string({
      char: "u",
      description: "uri of the service",
      env: "uri",
      required: true,
    }),
    id: flags.string({
      char: "i",
      description: "id to query",
      env: "id",
      required: false,
    }),
    help: flags.help({ char: "h" }),
  };

  async run() {
    const { flags } = this.parse(Query);
    const requestId = uuid();

    const deviceId =
      flags.id ||
      (await this.promptId().catch(() => {
        this.error("Please run sync first or provide arguments.");
      }));

    const queryBody: QueryRequest = {
      requestId,
      inputs: [
        {
          intent: "action.devices.QUERY",
          payload: {
            devices: [{ id: deviceId }],
          },
        },
      ],
    };

    await axios
      .post(flags.uri, queryBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${flags.token}`,
        },
        responseType: "json",
      })
      .then(
        (response) => {
          this.log(JSON.stringify(response.data, null, 2));
        },
        (error) => {
          this.log(`Request ${requestId} failed with:`);
          this.log(JSON.stringify(error.response.data, null, 2));
        }
      );
  }

  async promptId(): Promise<string> {
    const syncedDevices = await readConfig(this.config.configDir);
    const responses = await inquirer.prompt([
      {
        name: "id",
        message: "select a device id",
        type: "list",
        choices: syncedDevices.ids,
      },
    ]);
    return responses.id;
  }
}
