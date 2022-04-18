import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
// import cors from 'cors';

import  gameRouter  from './routers/gameRouter.js';
import authRouter from './routers/auth-router.js';

const app = express();

app.use(express.json());
// app.use(cors({
//       origin: 'http://localhost:3001',
// }));
app.use(cookieParser());

app.use('/game', gameRouter);
app.use('/auth', authRouter);

app.listen(5001, () => {console.log('ready')});