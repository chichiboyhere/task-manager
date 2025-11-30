// import { defineConfig, env } from "prisma/config";

// export default defineConfig({
//   schema: "prisma/schema.prisma",
//   migrations: {
//     path: "prisma/migrations",
//   },
//   engine: "classic",
//   datasource: {
//     url: env("DATABASE_URL"),
//   },
// });

// import { defineConfig } from "@prisma/config";

// export default defineConfig({
//   schema: "./prisma/schema.prisma",
//   env: {
//     load: true, // ensures Prisma loads .env automatically
//   },
// });

import { defineConfig } from "@prisma/config";
import * as dotenv from "dotenv";

// Load .env file
dotenv.config();

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
