import dotenv from "dotenv";

dotenv.config();

export const isDev = process.env.NODE_ENV !== "production";

export const databaseUrl = process.env.DB_URL || process.env.DATABASE_URL;

const databaseUrlLooksLocal = (url: string) =>
  /localhost|127\.0\.0\.1|\[::1\]|::1/i.test(url);

const databaseUrlDisablesSsl = (url: string) =>
  /sslmode=disable|ssl=false/i.test(url);

export const databaseSslConfig =
  databaseUrl &&
  !databaseUrlLooksLocal(databaseUrl) &&
  !databaseUrlDisablesSsl(databaseUrl)
    ? { rejectUnauthorized: false }
    : undefined;
