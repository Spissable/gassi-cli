import * as nock from "nock";
import { stdout } from "stdout-stderr";
import Query from "./query";

describe("QUERY intent", () => {
  const queryReply = {
    requestId: "some.uuid",
    payload: {
      devices: {
        "123": {
          on: true,
          online: true
        }
      }
    }
  };

  const errorReply = {
    message: "some.error"
  };

  test("Sends a QUERY request to the specified host", async () => {
    const testHost = "http://some.google-action.com/api";
    const mock = nock(testHost, {
      reqheaders: { Authorization: "Bearer some.token" }
    })
      .post("", {
        requestId: "some.uuid",
        inputs: [
          {
            intent: "action.devices.QUERY",
            payload: {
              devices: [
                {
                  id: "some.id"
                }
              ]
            }
          }
        ]
      })
      .reply(200, queryReply);

    stdout.start();
    await Query.run(["-t", "some.token", "-u", testHost, "-i", "some.id"]);
    stdout.stop();

    expect(mock.isDone()).toBeTruthy();
    expect(stdout.output).toEqual(JSON.stringify(queryReply, null, 2) + "\n");
  });

  test("Error response is logged", async () => {
    const testHost = "http://some.google-action.com/api";
    const mock = nock(testHost, {
      reqheaders: { Authorization: "Bearer some.token" }
    })
      .post("", {
        requestId: "some.uuid",
        inputs: [
          {
            intent: "action.devices.QUERY",
            payload: {
              devices: [
                {
                  id: "some.id"
                }
              ]
            }
          }
        ]
      })
      .reply(409, errorReply);

    stdout.start();
    await Query.run(["-t", "some.token", "-u", testHost, "-i", "some.id"]);
    stdout.stop();

    expect(mock.isDone()).toBeTruthy();
    expect(stdout.output).toEqual(
      `Request some.uuid failed with:\n${JSON.stringify(errorReply, null, 2)}\n`
    );
  });
});
