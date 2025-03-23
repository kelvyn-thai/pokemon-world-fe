import { faker } from "@faker-js/faker";
import { extractQueryParams } from "../extract-query-params.utils";

describe("Test extractQueryParams", () => {
  test.each([
    [null, ""],
    [null, undefined],
    [null, null],
  ])("should return %s when url = %s", (expected, url) => {
    expect(extractQueryParams(url)).toBe(expected);
  });
  it("Should return correctly query params", () => {
    const url = faker.internet.url();
    const queryParams = new URLSearchParams({
      limit: "24",
      offset: "0",
      type: "poison, flying",
    }).toString();
    const urlWithQueryParams = `${url}?${queryParams}`;

    expect(extractQueryParams(urlWithQueryParams)).toBe(`?${queryParams}`);
  });
});
