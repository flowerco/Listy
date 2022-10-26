import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import router from './router';

dotenv.config();
if (!process.env.PORT) {
	console.log('Error: Port not provided');
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 3030;

const app = express();

//middleware
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

// Middleware to provide jwt in any request header
app.use((req, res, next) => {
  const authHeader = req.cookies.listyJwt;
  if (authHeader) {
    req.headers.authorization = `Bearer ${authHeader}`;
  }
  next();
});

app.use(router);


const MONGO_URI = <string>process.env.ATLAS_URI || 'mongodb://127.0.0.1/test';

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
} as ConnectOptions);

const connection = mongoose.connection;
connection.once('open', () =>
	console.log(`Database connection successful at ${MONGO_URI} 🍃`)
);

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT} 🚀`);
});

export default app;
