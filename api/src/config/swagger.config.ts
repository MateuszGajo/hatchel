import { config } from "dotenv";
config();

export default {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Logger app",
      version: "1.0.0",
      description: "The logger API documentation",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/",
      },
    },
    basePath: "/api",
    servers: [
      {
        url: `${process.env.SERVER_URL}:${process.env.PORT || 5000}/api`,
      },
    ],
  },
  tags: [
    {
      name: "User",
      description: "API for users",
    },
  ],
  apis: ["src/models/*.ts", "src/api/controllers/**/*.ts"],
};
