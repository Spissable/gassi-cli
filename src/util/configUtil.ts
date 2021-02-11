import * as fs from "fs-extra";
import * as path from "path";
import { Config } from "../entities/Config";

export async function writeConfig(dir: string, config: Config) {
  if (!(await fs.pathExists(dir))) {
    await fs.mkdir(dir);
  }
  await fs.writeJSON(path.join(dir, "config.json"), config);
}

export async function readConfig(dir: string): Promise<Config> {
  return fs.readJSON(path.join(dir, "config.json"));
}
