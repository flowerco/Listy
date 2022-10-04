import express, { Request } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import router from './router';
import { expressjwt as jwt } from 'express-jwt';

dotenv.config();
if (!process.env.PORT) {
	console.log('Error: Port not provided');
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 3030;

const app = express();

//middleware
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());
app.use(cookieParser());

// Middleware to use/decode jwt
app.use((req, res, next) => {
  const authHeader = req.cookies.sessionJwt;
  if (authHeader) {
    req.headers.authorization = `Bearer ${authHeader}`;
  }
  next();
});

// app.use(
//   jwt({
//     secret: process.env.JWT_SECRET as string,
//     algorithms: ["HS256"],
//     getToken: (req: Request) => req.cookies.sessionJwt
//   }).unless({
//     path:[
//       '/login'
//     ]
//   })
// );

//address for rest API
// app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
app.use(router);

//IGNORE
// app.use('/api/auth', authRoute);

const MONGO_URI = <string>process.env.ATLAS_URI || 'mongodb://127.0.0.1/test';

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
} as ConnectOptions);

const connection = mongoose.connection;
connection.once('open', () =>
	console.log(`Database connection successful at ${MONGO_URI} 🍃`)
);

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

export default app;
