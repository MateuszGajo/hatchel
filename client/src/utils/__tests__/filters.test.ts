import { FilterListParams } from "../../types/filtersParams";
import { convertFilterListParams } from "../filters";

describe("filters utils, convert filter list params", () => {
  it("Should return empty string", () => {
    const result = convertFilterListParams({});

    expect(result).toBe("");
  });

  it("Should return params with value", () => {
    const data: FilterListParams = {
      abcd: 30,
    };
    const result = convertFilterListParams(data);

    expect(result).toBe("abcd=30");
  });

  it("Should return param with comparison operator", () => {
    const data: FilterListParams = {
      abcd: {
        type: "gt",
        value: 20,
      },
    };
    const result = convertFilterListParams(data);

    expect(result).toBe("abcd[gt]=20");
  });

  it("Should return params with correct values", () => {
    const data: FilterListParams = {
      abcd: {
        type: "gt",
        value: 21,
      },
      test1: 25,
    };
    const result = convertFilterListParams(data);

    expect(result).toBe("abcd[gt]=21&test1=25");
  });
});
