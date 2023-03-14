import axios from "axios";
import { Log, LogFormData } from "../modules/Logger/types";
import { FilterListParams } from "../types/filtersParams";
import { convertFilterListParams } from "../utils/filters";

axios.defaults.baseURL = "http://localhost:5000/api/";

const requests = {
  get: <T>(url: string, params?: FilterListParams) => {
    const paramsConverted = params ? "?" + convertFilterListParams(params) : "";

    return axios.get<T>(url + paramsConverted);
  },
  post: <T>(url: string, body = {}) => axios.post<T>(url, body),
};

const logger = {
  get: (params?: FilterListParams) => requests.get<Log[]>("logs", params),
  add: (data: LogFormData) => requests.post<Log>("logs/add", data),
};

const agent = {
  logger,
};

export default agent;
