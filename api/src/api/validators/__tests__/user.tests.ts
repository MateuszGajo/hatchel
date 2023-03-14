import { validateUser } from "../user";

describe("user validators, validate user", () => {
  it("Should return validate error", async () => {
    let user = {
      name: "name",
      email: "",
    };

    let error = await validateUser(user);
    expect(error).toBe("Email is required");

    user = {
      name: "name",
      email: "invalidEmail",
    };

    error = await validateUser(user);
    expect(error).toBe("Email is invalid");

    user = {
      name: "",
      email: "invalidEmail",
    };

    error = await validateUser(user);
    expect(error).toBe("User name is required");
  });

  it("Should pass validation", async () => {
    const user = {
      name: "name",
      email: "valid@valid.com",
    };

    let error = await validateUser(user);
    expect(error).toBe(null);
  });
});
