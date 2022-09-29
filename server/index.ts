import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
require("dotenv").config; //?
import { auth } from "express-openid-connect";
import userRoute from "./routes/users";
import postRoute from "./routes/posts";
// const authRoute from './routes/auth';

const app = express();
app.use(cors());

const PORT = 3030;

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//address for rest API
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

//IGNORE
// app.use('/api/auth', authRoute);

const atlasUri = process.env.ATLAS_URI;

mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => console.log("Database connection successful🍃"));

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:3000",
  clientID: "6aFL4m1lJjcg6n26300PoGgjf8fExYZ1",
  issuerBaseURL: "https://listy.us.auth0.com",
  secret: "o6XnZn_6Fh2Y9pw2RC4s5ZcBZvpPJqjsc4xU3povXtI48gH24pOIio-31IoP6wJu",
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
