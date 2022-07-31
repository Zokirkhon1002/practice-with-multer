import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

config();

// importing Routes
import multer from "./routes/Multer.js";

const app = express();

app.use(json());
app.use(cors());

// connection of MongoDB
let [userName, password, lastPart] = [
  process.env.USER_NAME,
  process.env.PASSWORD,
  process.env.LAStPART,
];
const LINK = `mongodb+srv://${userName}:${password}${lastPart}`;

mongoose
  .connect(LINK)
  .then(() => console.log("MongoDb is connected: "))
  .catch((e) => console.log(`Mongodb is not connected: ${e}`));

// Home | default;
app.get("/", async (req, res) => {
  res.send("App is running perfectly");
});

// multer => single and multiple file uploads
app.use("/", multer);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
