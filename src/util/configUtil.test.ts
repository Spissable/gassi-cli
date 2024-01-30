jest.mock('fs-extra');
import * as fs from 'fs-extra';
import { Config } from '../entities/Config';
import { readConfig, writeConfig } from './configUtil';

describe('configUtil', () => {
  describe('writeConfig write user config file', () => {
    test('gassi-cli config folder exists', async () => {
      jest
        .spyOn(fs, 'pathExists')
        .mockImplementationOnce(async () => Promise.resolve(true));
      const config: Config = { ids: ['1'] };
      const dir = '/home/user/.config/gassi-cli/';

      await writeConfig(dir, config);
      expect(fs.mkdir).not.toHaveBeenCalled();
      expect(fs.writeJSON).toHaveBeenCalledWith(`${dir}config.json`, config);
    });

    test("gassi-cli config doesn't exist", async () => {
      jest
        .spyOn(fs, 'pathExists')
        .mockImplementationOnce(async () => Promise.resolve(false));
      const config: Config = { ids: ['1'] };
      const dir = '/home/user/.config/gassi-cli/';

      await writeConfig(dir, config);
      expect(fs.mkdir).toHaveBeenCalled();
      expect(fs.writeJSON).toHaveBeenCalledWith(`${dir}config.json`, config);
    });
  });

  describe('readConfig reads config file', () => {
    test('reads file', async () => {
      const dir = '/home/user/.config/gassi-cli/';

      await readConfig(dir);
      expect(fs.readJSON).toHaveBeenCalledWith(`${dir}config.json`);
    });
  });
});
