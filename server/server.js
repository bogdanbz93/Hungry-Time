import express from "express";
import { readdirSync } from "fs";
const morgan = require("morgan");
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();

const app = express();

// Database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("* Baza de date (MongoDB Atlas) este conectată cu succes."))
  .catch(err => console.log("A fost o eroare la conexiunea bazei de date (MongoDB Atlas): ", err));

mongoose.set("useFindAndModify", false);

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Route middleware
readdirSync("./routes").map(r => app.use("/api", require(`./routes/${r}`)));
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port 8000.`));
