import { Request } from "express";

class APIFeatures {
  request: Request;
  query: Record<string, string | Record<string, string>>;
  constructor(request: Request) {
    this.request = request;
    this.query = {};
  }

  filter() {
    const queryObj = { ...this.request.query };

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = JSON.parse(queryStr);
    return this;
  }
}
export default APIFeatures;
