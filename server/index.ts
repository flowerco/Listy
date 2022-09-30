import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as dotenv from "dotenv";
const { auth } = require("express-openid-connect");
const router = require('./router');

dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

//middleware
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());

//address for rest API
// app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
app.use(router);

//IGNORE
// app.use('/api/auth', authRoute);

const atlasUri = <string>process.env.ATLAS_URI;

mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const connection = mongoose.connection;
connection.once("open", () => console.log("Database connection successful🍃"));

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:3000",
  clientID: "6aFL4m1lJjcg6n26300PoGgjf8fExYZ1",
  issuerBaseURL: "https://listy.us.auth0.com",
  secret: "-31IoP6wJu",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

//temporary, will go to the post route later
// app.delete('/post/:id', async (req, res) => {
//   try {
//     const result = await Post.findByIdAndDelete(req.params.id)
//     res.json(result)
//   } catch (error) {
//     console.log(error)
//   }
// })

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT} 🚀`);
});
