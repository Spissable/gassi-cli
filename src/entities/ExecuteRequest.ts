export interface ExecuteRequest {
  requestId: string;
  inputs: {
    intent: "action.devices.EXECUTE";
    payload: {
      commands: {
        devices: { id: string }[];
        execution: {
          command: string;
          params: any;
        }[];
      }[];
    };
  }[];
}
