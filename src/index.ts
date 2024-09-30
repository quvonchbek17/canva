import express, { Application, Request, Response } from "express";
import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";
import { errorHandler } from "@middlewares";
import router from "./routes";
import path from "path";
import { AuthController } from "@modules";
dotenv.config();

const app: Application = express();

// CORS sozlamasi
app.use(cors({ origin: "*" }));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "src", "public")));

app.use("/api/v1", router);

app.get('/', AuthController.getAuthUrl);

app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
