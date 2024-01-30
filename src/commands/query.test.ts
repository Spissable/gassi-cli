import * as inquirer from 'inquirer';
import * as nock from 'nock';
import { stdout } from 'stdout-stderr';

const configStub = jest.fn();
jest.mock('../util/configUtil.ts', () => ({
  readConfig: configStub.mockResolvedValue({ ids: [] }),
}));
import Query from './query';

describe('QUERY intent', () => {
  const queryReply = {
    requestId: 'some.uuid',
    payload: {
      devices: {
        '123': {
          on: true,
          online: true,
        },
      },
    },
  };
  const errorReply = {
    message: 'some.error',
  };
  const nockBody = {
    requestId: 'some.uuid',
    inputs: [
      {
        intent: 'action.devices.QUERY',
        payload: {
          devices: [
            {
              id: 'some.id',
            },
          ],
        },
      },
    ],
  };
  const testHost = 'http://some.google-action.com';

  test('Sends a QUERY request to the specified host', async () => {
    const mock = nock(testHost, {
      reqheaders: { Authorization: 'Bearer some.token' },
    })
      .post('/', nockBody)
      .reply(200, queryReply);

    stdout.start();
    await Query.run(['-t', 'some.token', '-u', testHost, '-i', 'some.id']);
    stdout.stop();

    expect(mock.isDone()).toBeTruthy();
    expect(stdout.output).toEqual(`${JSON.stringify(queryReply, null, 2)}\n`);
  });

  test('Error response is logged', async () => {
    const mock = nock(testHost, {
      reqheaders: { Authorization: 'Bearer some.token' },
    })
      .post('/', nockBody)
      .reply(409, errorReply);

    stdout.start();
    await Query.run(['-t', 'some.token', '-u', testHost, '-i', 'some.id']);
    stdout.stop();

    expect(mock.isDone()).toBeTruthy();
    expect(stdout.output).toEqual(
      `Request some.uuid failed with:\n${JSON.stringify(
        errorReply,
        null,
        2,
      )}\n`,
    );
  });

  test('Id is not provided initially', async () => {
    const mock = nock(testHost, {
      reqheaders: { Authorization: 'Bearer some.token' },
    })
      .post('/', nockBody)
      .reply(200, queryReply);

    jest.spyOn(inquirer, 'prompt').mockResolvedValueOnce({ id: 'some.id' });

    stdout.start();
    await Query.run(['-t', 'some.token', '-u', testHost]);
    stdout.stop();

    expect(mock.isDone()).toBeTruthy();
    expect(stdout.output).toEqual(`${JSON.stringify(queryReply, null, 2)}\n`);
  });

  test('Config error is caught', async () => {
    configStub.mockRejectedValueOnce(new Error());

    await expect(
      Query.run(['-t', 'some.token', '-u', testHost]),
    ).rejects.toThrowError('Please run sync first or provide arguments.');
    stdout.stop();
  });
});
