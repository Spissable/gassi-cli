import { Command, flags } from "@oclif/command";
import axios, { AxiosResponse } from "axios";
import { v4 as uuid } from "uuid";
import { SyncRequest } from "../entities/SyncRequest";
import { SyncResponse } from "../entities/SyncResponse";
import { Config } from "../entities/Config";
import { writeConfig } from "../util/configUtil";

export default class Sync extends Command {
  static description = "Sends a SYNC request intent";

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
    help: flags.help({ char: "h" }),
  };

  async run() {
    const { flags } = this.parse(Sync);
    const token = flags.token;
    const uri = flags.uri;
    const requestId = uuid();
    const syncBody: SyncRequest = {
      requestId,
      inputs: [
        {
          intent: "action.devices.SYNC",
        },
      ],
    };

    await axios
      .post(uri, syncBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      })
      .then(
        (response: AxiosResponse<SyncResponse>) => {
          const jsonResponse = JSON.stringify(response.data, null, 2);
          const config: Config = {
            ids: response.data.payload.devices.map((device) => device.id),
          };
          writeConfig(this.config.configDir, config);
          this.log(jsonResponse);
        },
        (error) => {
          this.log(`Request ${requestId} failed with:`);
          this.log(JSON.stringify(error.response.data, null, 2));
        }
      );
  }
}
