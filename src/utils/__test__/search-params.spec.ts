import { convertToURLSearchParams } from "@/utils";

describe("Test convertToURLSearchParams", () => {
  test.each([
    [
      "offset=0&limit=24",
      {
        offset: 0,
        limit: 24,
      },
    ],
    [
      "offset=0&limit=24&type=",
      {
        offset: 0,
        limit: 24,
        type: [],
      },
    ],
    [
      "offset=0&limit=24&type=poison%2C+flying",
      {
        offset: 0,
        limit: 24,
        type: "poison, flying",
      },
    ],
    [
      "offset=0&limit=24&type=dragon",
      {
        offset: 0,
        limit: 24,
        type: ["dragon"],
      },
    ],
    [
      "offset=0&limit=24&type=dragon%2Cfire%2Cghost",
      {
        offset: 0,
        limit: 24,
        type: ["dragon", "fire", "ghost"],
      },
    ],
    [
      "offset=10&active=true",
      {
        offset: 10,
        active: true,
      },
    ],
    [
      "offset=10",
      {
        offset: 10,
        type: null,
        extra: undefined,
        name: "",
      },
    ],
  ])(
    "Should return %s when input = %p",
    (
      expected: string,
      input: Record<
        string,
        | string
        | number
        | boolean
        | Array<string | number | boolean>
        | undefined
        | null
      >,
    ) => {
      expect(convertToURLSearchParams(input)).toBe(expected);
    },
  );
});
