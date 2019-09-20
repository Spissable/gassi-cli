import { parseInput } from "./util";

describe("Util", () => {
  describe("parseInput returns parsed numeric, boolean or string", () => {
    test("numeric values are parsed", () => {
      expect(parseInput("19")).toEqual(19);
    });

    test("boolean values are parsed", () => {
      expect(parseInput("true")).toEqual(true);
      expect(parseInput("True")).toEqual(true);
      expect(parseInput("TRUE")).toEqual(true);
      expect(parseInput("false")).toEqual(false);
      expect(parseInput("False")).toEqual(false);
      expect(parseInput("FALSE")).toEqual(false);
    });

    test("everything else stays a string", () => {
      expect(parseInput("someString")).toEqual("someString");
      expect(parseInput("anotherString123")).toEqual("anotherString123");
    });
  });
});
