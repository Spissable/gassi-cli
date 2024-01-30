export interface QueryRequest {
  requestId: string;
  inputs: {
    intent: 'action.devices.QUERY';
    payload: {
      devices: { id: string }[];
    };
  }[];
}
