export interface DisconnectRequest {
  requestId: string;
  inputs: {
    intent: "action.devices.DISCONNECT";
  }[];
}
