import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import main from "./main";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// ✅ Allow CORS from frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from frontend
    credentials: true, // Allow cookies if needed
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })
);

// ✅ Manually Set CORS Headers (Fallback)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Test Route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to alloan.ai");
});

// ✅ Use main router for API
app.use("/api", main);

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
