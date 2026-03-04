import cors from 'cors';
import express from 'express';
import fileupload from 'express-fileupload';
import transferRoutes from './routes/transferRoutes.js';

const app = express();

app.use(express.text());
app.use(cors({ origin: '*' }));
app.use(fileupload());

app.use('/', transferRoutes);

export { app };
