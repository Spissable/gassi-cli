jest.mock("uuid", () => ({
  v4: () => "some.uuid"
}));
