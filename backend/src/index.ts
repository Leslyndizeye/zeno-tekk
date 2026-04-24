import express from "express";
import cors from "cors";
import morgan from "morgan";
import { AppDataSource } from "./config/db";
import { databaseSslConfig, databaseUrl } from "./config/runtime";
import session from "express-session";
import router from "./routes";
import "reflect-metadata";
import cookieParser from "cookie-parser"; 
import pgSession from 'connect-pg-simple';
import pg from 'pg';
import { initSocket } from "./socket/socket";

const { Pool } = pg;

if (!databaseUrl) {
  console.error(
    "Startup Error: missing database connection string. Set DB_URL or DATABASE_URL in the environment before starting the backend."
  );
  process.exit(1);
}

const pgPool = new Pool({
  connectionString: databaseUrl,
  ...(databaseSslConfig ? { ssl: databaseSslConfig } : {}),
});

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8000', 'https://zenotekk.com', 'https://www.zenotekk.com', 'https://zeno-tekk.onrender.com'],
  credentials: true // Enable CORS with credentials
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser()); // Add cookie parser middleware


// Express Session
const PgSession = pgSession(session);

app.use(
  session({
    store: new PgSession({
      pool: pgPool,
      tableName: 'session',
      createTableIfMissing: true,
    }),
    secret: process.env.JWT_SECRET || "fallback-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    },
  })
);

// Keep-alive health check (prevents Render free tier from idling)
app.get("/health", (_req, res) => {
  res.status(200).send("ok");
});

// Routes
app.use("/z1", router);

// Multer errors
app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    // Specific multer errors
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ message: "File too large!" });
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ message: "Unexpected file upload field!" });
    }

    return res.status(400).json({ message: "Upload error", error: err.message });
  }

  if (err.message?.includes("Filename must not end with a whitespace")) {
    return res.status(400).json({ message: "Bad filename", error: err.message });
  }

  if (err.message?.includes("File is empty")) {
    return res.status(400).json({ message: "File is empty", error: err.message });
  }

  console.error("Unhandled error in middleware:", err);
  res.status(500).json({ message: "Server error", error: String(err) });
});



const PORT = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0";

// **Initialize Database First, Then Start Server**
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database Connected");


    // Start Express server
    server.listen(PORT, HOST, () =>
      console.log(`Server running on: http://${HOST}:${PORT}`)
    );
  } catch (error) {
    console.error("Database Connection Error:", error);
    process.exit(1);
  }
};

// websockets
import http from 'http';
import multer from "multer";
const server = http.createServer(app)
const io = initSocket(server)
export { io }


// Run server
startServer();
