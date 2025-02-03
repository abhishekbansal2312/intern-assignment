import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import main from "./main";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to alloan.ai");
});

app.use("/api", main);
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
