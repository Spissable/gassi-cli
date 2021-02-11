import * as nock from "nock";
import { stdout } from "stdout-stderr";

jest.mock("../util/configUtil.ts", () => ({
  writeConfig: jest.fn(),
}));
import Sync from "./sync";

describe("SYNC intent", () => {
  const syncReply = {
    requestId: "some.uuid",
    payload: {
      agentUserId: "some.user.id",
      devices: [
        {
          id: "123",
          type: "action.devices.types.OUTLET",
          traits: ["action.devices.traits.OnOff"],
          name: {
            defaultNames: ["My Outlet 1234"],
            name: "Night light",
            nicknames: ["wall plug"],
          },
        },
      ],
    },
  };

  const errorReply = {
    message: "some.error",
  };

  const testHost = "http://some.google-action.com";

  test("Sends a SYNC request to the specified host", async () => {
    const mock = nock(testHost, {
      reqheaders: { Authorization: "Bearer some.token" },
    })
      .post("/", {
        requestId: "some.uuid",
        inputs: [
          {
            intent: "action.devices.SYNC",
          },
        ],
      })
      .reply(200, syncReply);

    stdout.start();
    await Sync.run(["-t", "some.token", "-u", testHost]);
    stdout.stop();

    expect(mock.isDone()).toBeTruthy();
    expect(stdout.output).toEqual(JSON.stringify(syncReply, null, 2) + "\n");
  });

  test("Error response is logged", async () => {
    const mock = nock(testHost, {
      reqheaders: { Authorization: "Bearer some.token" },
    })
      .post("/", {
        requestId: "some.uuid",
        inputs: [
          {
            intent: "action.devices.SYNC",
          },
        ],
      })
      .reply(409, errorReply);

    stdout.start();
    await Sync.run(["-t", "some.token", "-u", testHost]);
    stdout.stop();

    expect(mock.isDone()).toBeTruthy();
    expect(stdout.output).toEqual(
      `Request some.uuid failed with:\n${JSON.stringify(errorReply, null, 2)}\n`
    );
  });
});
