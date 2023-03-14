import { FilterListParams } from "../types/filtersParams";

export const convertFilterListParams = (
  filters: FilterListParams<Record<string, any>>
) => {
  const paramString = Object.entries(filters).map(([key, data]) => {
    if (typeof data !== "object") return `${key}=${data}`;

    return `${key}[${data.type}]=${data.value}`;
  });

  return paramString.join("&");
};
