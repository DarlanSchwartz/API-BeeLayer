
import express, { json } from 'express';
import "express-async-errors";
import cors from 'cors';
import indexRouter from './routes/index.routes';
import errorHandler from './middlewares/errorHandler';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(json());
app.use(helmet());
app.use(indexRouter);
app.use(errorHandler);


app.listen(PORT, async () => {
  console.log(`This is working in port ${PORT}`);

});