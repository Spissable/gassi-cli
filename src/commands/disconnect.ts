import { Command, flags } from "@oclif/command";
import axios from "axios";
import * as uuid from "uuid/v4";

export default class Disconnect extends Command {
  static description = "Sends a DISCONNECT request intent";

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
    const { flags } = this.parse(Disconnect);
    const requestId = uuid();

    await axios
      .post(
        flags.uri,
        {
          requestId,
          inputs: [
            {
              intent: "action.devices.DISCONNECT"
            }
          ]
        } as DisconnectBody,
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

interface DisconnectBody {
  requestId: string;
  inputs: {
    intent: "action.devices.DISCONNECT";
  }[];
}