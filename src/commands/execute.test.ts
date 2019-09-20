import * as nock from "nock";
import { stdout } from "stdout-stderr";
import Execute from "./execute";

describe("EXECUTE intent", () => {
  const onOffRequest = {
    requestId: "some.uuid",
    inputs: [
      {
        intent: "action.devices.EXECUTE",
        payload: {
          commands: [
            {
              devices: [
                {
                  id: "some.id"
                }
              ],
              execution: [
                {
                  command: "action.devices.commands.OnOff",
                  params: {
                    on: true
                  }
                }
              ]
            }
          ]
        }
      }
    ]
  };

  const setModesRequest = {
    requestId: "some.uuid",
    inputs: [
      {
        intent: "action.devices.EXECUTE",
        payload: {
          commands: [
            {
              devices: [
                {
                  id: "some.id"
                }
              ],
              execution: [
                {
                  command: "action.devices.commands.SetModes",
                  params: {
                    updateModeSettings: {
                      program: "some.program"
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    ]
  };

  const setTogglesRequest = {
    requestId: "some.uuid",
    inputs: [
      {
        intent: "action.devices.EXECUTE",
        payload: {
          commands: [
            {
              devices: [
                {
                  id: "some.id"
                }
              ],
              execution: [
                {
                  command: "action.devices.commands.SetToggles",
                  params: {
                    updateToggleSettings: {
                      Light: true
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    ]
  };

  const executeReply = {
    requestId: "some.uuid",
    payload: {
      commands: [
        {
          ids: ["123"],
          status: "SUCCESS",
          states: {
            on: true,
            online: true
          }
        }
      ]
    }
  };

  const errorReply = {
    message: "some.error"
  };

  test("Sends a OnOff command to the specified host", async () => {
    const testHost = "http://some.google-action.com/api";
    const mock = nock(testHost, {
      reqheaders: { Authorization: "Bearer some.token" }
    })
      .post("", onOffRequest)
      .reply(200, executeReply);

    stdout.start();
    await Execute.run([
      "-t",
      "some.token",
      "-u",
      testHost,
      "-i",
      "some.id",
      "-c",
      "OnOff",
      "on",
      "true"
    ]);
    stdout.stop();

    expect(mock.isDone()).toBeTruthy();
    expect(stdout.output).toEqual(JSON.stringify(executeReply, null, 2) + "\n");
  });

  test("Sends SetModes command to the specified host", async () => {
    const testHost = "http://some.google-action.com/api";
    const mock = nock(testHost, {
      reqheaders: { Authorization: "Bearer some.token" }
    })
      .post("", setModesRequest)
      .reply(200, executeReply);

    stdout.start();
    await Execute.run([
      "-t",
      "some.token",
      "-u",
      testHost,
      "-i",
      "some.id",
      "-c",
      "SetModes",
      "program",
      "some.program"
    ]);
    stdout.stop();

    expect(mock.isDone()).toBeTruthy();
    expect(stdout.output).toEqual(JSON.stringify(executeReply, null, 2) + "\n");
  });

  test("Sends SetToggles command to the specified host", async () => {
    const testHost = "http://some.google-action.com/api";
    const mock = nock(testHost, {
      reqheaders: { Authorization: "Bearer some.token" }
    })
      .post("", setTogglesRequest)
      .reply(200, executeReply);

    stdout.start();
    await Execute.run([
      "-t",
      "some.token",
      "-u",
      testHost,
      "-i",
      "some.id",
      "-c",
      "SetToggles",
      "Light",
      "true"
    ]);
    stdout.stop();

    expect(mock.isDone()).toBeTruthy();
    expect(stdout.output).toEqual(JSON.stringify(executeReply, null, 2) + "\n");
  });

  test("Error response is logged", async () => {
    const testHost = "http://some.google-action.com/api";
    const mock = nock(testHost, {
      reqheaders: { Authorization: "Bearer some.token" }
    })
      .post("", onOffRequest)
      .reply(409, errorReply);

    stdout.start();
    await Execute.run([
      "-t",
      "some.token",
      "-u",
      testHost,
      "-i",
      "some.id",
      "-c",
      "OnOff",
      "on",
      "true"
    ]);
    stdout.stop();

    expect(mock.isDone()).toBeTruthy();
    expect(stdout.output).toEqual(
      `Request some.uuid failed with:\n${JSON.stringify(errorReply, null, 2)}\n`
    );
  });
});
