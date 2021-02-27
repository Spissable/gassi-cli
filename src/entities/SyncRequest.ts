export interface SyncRequest {
  requestId: string;
  inputs: {
    intent: "action.devices.SYNC";
  }[];
}
