// src/config/typeorm.ts

import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

// Determine which .env file to load
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
const envPath = path.resolve(process.cwd(), envFile);

// Check if the file exists and load it
if (fs.existsSync(envPath)) {
  console.log(`Loading environment from ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.log(`Environment file ${envPath} not found, loading default .env`);
  dotenv.config(); // Load default .env file
}

// Get database URL from environment variables
const dbUrl = process.env.DATABASE_URL;
console.log("DATABASE_URL from env:", process.env.DATABASE_URL);

const commonConfig = {
  type: "postgres",
  url: "postgresql://postgres.qudnrdeiagaqwstgjvvc:bitcot@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres",
  synchronize: true,
  logging: true, // Enable logging to see database queries
  ssl: { rejectUnauthorized: false }, // Always use SSL with rejectUnauthorized: false
  extra: {
    // Ensure TypeORM works better in serverless environments
    connectionLimit: 10,
    max: 10,
    // Add connection timeout settings
    connectTimeout: 30000, // 30 seconds
    idleTimeoutMillis: 30000, // 30 seconds
  },
};

console.log("Database config:", commonConfig);
const runtimeConfig = {
  ...commonConfig,
  entities: ["dist/**/*.entity{.ts,.js}"],
  autoLoadEntities: true,
};

export default registerAs("typeorm", () => runtimeConfig);

// For CLI migrations (if needed later)
export const connectionSource = new DataSource({
  ...commonConfig,
  entities: ["src/**/*.entity{.ts,.js}"],
  migrations: ["src/migrations/*{.ts,.js}"],
} as DataSourceOptions);
