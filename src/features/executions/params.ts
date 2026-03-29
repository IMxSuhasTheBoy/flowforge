import { parseAsInteger } from "nuqs/server";
import { PAGINATION } from "@/config/constants";

export type ExecutionsParamsInput = {
  page: number;
  pageSize: number;
};

export const executionsParams = {
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),
};

export const normalizeExecutionsParams = (
  params: ExecutionsParamsInput
): ExecutionsParamsInput => ({
  page: Math.max(PAGINATION.DEFAULT_PAGE, params.page),
  pageSize: Math.min(
    PAGINATION.MAX_PAGE_SIZE,
    Math.max(PAGINATION.MIN_PAGE_SIZE, params.pageSize)
  ),
});
