import { Command, flags } from "@oclif/command";
import axios from "axios";
import * as uuid from "uuid/v4";

export default class Sync extends Command {
  static description = "Sends a SYNC request intent";

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
    help: flags.help({ char: "h" })
  };

  async run() {
    const { flags } = this.parse(Sync);
    const token = flags.token;
    const uri = flags.uri;
    const requestId = uuid();
    const syncBody: SyncBody = {
      requestId,
      inputs: [
        {
          intent: "action.devices.SYNC"
        }
      ]
    };

    await axios
      .post(uri, syncBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        responseType: "json"
      })
      .then(
        response => {
          this.log(JSON.stringify(response.data, null, 2));
        },
        error => {
          this.log(`Request ${requestId} failed with:`);
          this.log(JSON.stringify(error.response.data, null, 2));
        }
      );
  }
}

interface SyncBody {
  requestId: string;
  inputs: {
    intent: "action.devices.SYNC";
  }[];
}
