jest.mock("uuid/v4", () => {
  return () => "some.uuid";
});
