export const executeCommands: {
  [command: string]: { [param: string]: string[] };
} = {
  StartStop: {
    start: ['true', 'false'],
  },
  OnOff: {
    on: ['true', 'false'],
  },
};
