import { getTotalPagesFromCount } from "@/utils";

describe("Test getTotalPagesFromCount", () => {
  test.each([[undefined], [0], [null], [""]])(
    "Should return page = 1 when total count = %s",
    (totalCount) => {
      expect(getTotalPagesFromCount(totalCount as number)).toBe(1);
    },
  );

  test.each([
    [5, 100],
    [1, 1],
    [3, 50],
  ])(
    "Should return total pages = %s correctly when total count is %s",
    (totalPages, totalCount) => {
      expect(getTotalPagesFromCount(totalCount)).toBe(totalPages);
    },
  );
});
