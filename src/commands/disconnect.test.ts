import * as nock from "nock";
import { stdout } from "stdout-stderr";
import Disconnect from "./disconnect";

describe("DISCONNECT intent", () => {
  const errorReply = {
    message: "some.error"
  };
  const testHost = "http://some.google-action.com";

  test("Sends a DISCONNECT request to the specified host", async () => {
    const mock = nock(testHost, {
      reqheaders: { Authorization: "Bearer some.token" }
    })
      .post("/", {
        requestId: "some.uuid",
        inputs: [
          {
            intent: "action.devices.DISCONNECT"
          }
        ]
      })
      .reply(200, {});

    stdout.start();
    await Disconnect.run(["-t", "some.token", "-u", testHost]);
    stdout.stop();

    expect(mock.isDone()).toBeTruthy();
    expect(stdout.output).toEqual(JSON.stringify({}, null, 2) + "\n");
  });

  test("Error response is logged", async () => {
    const mock = nock(testHost, {
      reqheaders: { Authorization: "Bearer some.token" }
    })
      .post("/", {
        requestId: "some.uuid",
        inputs: [
          {
            intent: "action.devices.DISCONNECT"
          }
        ]
      })
      .reply(409, errorReply);

    stdout.start();
    await Disconnect.run(["-t", "some.token", "-u", testHost]);
    stdout.stop();

    expect(mock.isDone()).toBeTruthy();
    expect(stdout.output).toEqual(
      `Request some.uuid failed with:\n${JSON.stringify(errorReply, null, 2)}\n`
    );
  });
});
