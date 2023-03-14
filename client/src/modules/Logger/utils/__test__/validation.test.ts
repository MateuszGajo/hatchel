import { validateLogMessageRegex } from "../validation";

const INVALID_CASES = [
  "",
  "E 10 fdsf",
  "G fds fds",
  "W 10",
  "W",
  "E 101 10 fdsf",
  "E 0 15 w",
  "e 10 15 fds",
];

const VALID_CASES = [
  "W 10 DFSFSD",
  "E 15 10 abcd",
  "I 12 f32",
  "E 100 11 fds",
  "E 1 15 fds",
];

describe("Logger utils, validate log message with regex", () => {
  it("should returns false", () => {
    INVALID_CASES.forEach((itemData) =>
      expect(validateLogMessageRegex(itemData)).toBe(false)
    );
  });

  it("should returns true", () => {
    VALID_CASES.forEach((itemData) =>
      expect(validateLogMessageRegex(itemData)).toBe(true)
    );
  });
});
