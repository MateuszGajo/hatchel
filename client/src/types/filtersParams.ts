interface ListFilterComparisonParams {
  type: "gt" | "gte" | "lt" | "lte" | "e";
  value: number;
}

export type FilterListParams<T extends Record<string, any> = {}> = {
  [key in keyof T]?: string | number | ListFilterComparisonParams;
};
