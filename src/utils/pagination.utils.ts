import { LIMIT_PER_PAGE } from "@/constants";

export const extractOffsetFromPage = (page: number) => {
  return page - 1;
};

export const getTotalPagesFromCount = (totalCount: number) => {
  return !totalCount ? 1 : Math.ceil(totalCount / LIMIT_PER_PAGE);
};
