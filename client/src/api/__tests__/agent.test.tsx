import agent from "../agent";
import axios from "axios";
import { waitFor } from "@testing-library/react";
import { LogFormData } from "../../modules/Logger/types";

jest.mock("axios");

const mockAxios = axios as jest.Mocked<typeof axios>;

describe("agent logger module requests", () => {
  it("Should make get request with provided params", async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve());

    const params = { test: 20 };
    agent.logger.get(params);

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith("logs?test=20"));
  });

  it("Should make request with no params", async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve());

    agent.logger.get();

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith("logs"));
  });

  it("Should make post request", async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve());

    const formData: LogFormData = {
      email: "email@email.com",
      name: "name",
      logMessage: "W 10 test",
    };

    agent.logger.add(formData);

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith("logs/add", formData)
    );
  });
});
