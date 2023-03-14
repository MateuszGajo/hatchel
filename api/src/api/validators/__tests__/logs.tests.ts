import {
  validateCreateLogData,
  validateLog,
  validateLogListParams,
} from "../logs";

describe("logs validators, validate log", () => {
  it("Should log type give error", async () => {
    const cases = ["P 10 fsdf", "w 10 dfs", "1 10 d"];

    for (const data of cases) {
      const error = await validateLog(data);
      expect(error).toBe("Log type is invalid");
    }
  });

  it("Should timestamp give error", async () => {
    const cases = ["W dfs fsdf", "W 1d0 dfs", "W 10- d"];

    for (const data of cases) {
      const error = await validateLog(data);
      expect(error).toBe("Log timestamp must be a number");
    }
  });

  it("Should text give error", async () => {
    const cases = ["W 10"];

    for (const data of cases) {
      const error = await validateLog(data);
      expect(error).toBe("Log should contain message");
    }
  });

  it("should pass validation", async () => {
    const log = "W 10 text";

    const error = await validateLog(log);
    expect(error).toBe(null);
  });
});

describe("logs validators, validateCreateLogData", () => {
  it("Should give error", async () => {
    let data = {
      name: "",
      email: "invalid@invalid.pl",
      logMessage: "message",
    };
    let error = await validateCreateLogData(data);
    expect(error).toBe("Name is required");

    data = {
      ...data,
      name: "name",
      email: "",
    };
    error = await validateCreateLogData(data);
    expect(error).toBe("Email is required");

    data = {
      ...data,
      name: "name",
      email: "email",
    };
    error = await validateCreateLogData(data);
    expect(error).toBe("Email is invalid");

    data = {
      ...data,
      name: "name",
      logMessage: "",
    };
    error = await validateCreateLogData(data);
    expect(error).toBe("Log message is required");
  });

  it("should pass validation", async () => {
    const data = {
      name: "name",
      email: "invalid@invalid.pl",
      logMessage: "message",
    };

    const error = await validateCreateLogData(data);
    expect(error).toBe(null);
  });
});

describe("logs validators, validateLogsParams", () => {
  it("Should give typeError", async () => {
    const cases = [{ type: "G" }, { type: "2" }, { type: "w" }];
    for (const data of cases) {
      const error = await validateLogListParams(data);
      expect(error).toBe("Log type is invalid");
    }
  });

  it("Should give timestamp Error", async () => {
    const cases = [{ timestamp: "g" }, { timestamp: "" }, { timestamp: "d34" }];
    for (const data of cases) {
      const error = await validateLogListParams(data);
      expect(error).toBe("Log timestamp must be a number");
    }
  });

  it("Should severity give Error", async () => {
    let data = {
      severity: "0",
    };
    let error = await validateLogListParams(data);
    expect(error).toBe("Log serverity must be at least 1");

    data = {
      severity: "101",
    };
    error = await validateLogListParams(data);
    expect(error).toBe("Log severity must be lower equal than 100");

    data = {
      severity: "g",
    };
    error = await validateLogListParams(data);
    expect(error).toBe("Log severity must be a number");
  });

  it("should pass validation", async () => {
    const data = {
      severity: "10",
      type: "E",
      timestamp: "10",
    };

    const error = await validateLogListParams(data);
    expect(error).toBe(null);
  });
});
