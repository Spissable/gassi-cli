import { Command, flags } from "@oclif/command";
import axios from "axios";
import * as uuid from "uuid/v4";

export default class Query extends Command {
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
    help: flags.help({ char: "h" })
  };

  async run() {
    const { flags } = this.parse(Query);
    const requestId = uuid();
    const queryBody: QueryBody = {
      requestId,
      inputs: [
        {
          intent: "action.devices.QUERY",
          payload: {
            devices: [{ id: flags.id }]
          }
        }
      ]
    };

    await axios
      .post(flags.uri, queryBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${flags.token}`
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

interface QueryBody {
  requestId: string;
  inputs: {
    intent: "action.devices.QUERY";
    payload: {
      devices: { id: string }[];
    };
  }[];
}
