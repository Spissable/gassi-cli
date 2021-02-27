export interface SyncResponse {
  requestId: string;
  payload: {
    agentUserId: string;
    devices: {
      id: string;
    }[];
  };
}
