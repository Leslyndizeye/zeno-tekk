import { DataSource } from "typeorm";
import { databaseSslConfig, databaseUrl, isDev } from "./runtime";


export const AppDataSource = new DataSource({
  type: "postgres",
  url: databaseUrl,
  synchronize: true,
  logging: false,
  entities: [isDev ? "src/database/**/*.ts" : "dist/database/**/*.js"],
  migrations: [isDev ? "src/database/migrations/*.ts" : "dist/database/migrations/*.js"],
  extra: {
    connectionTimeoutMillis: 30000, 
  },
  ...(databaseSslConfig ? { ssl: databaseSslConfig } : {}),
  schema: 'public',
});
