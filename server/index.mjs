import express from 'express';
// import cors from 'cors';

import { gameRouter } from './routers/gameRouter.mjs';

const app = express();

app.use(express.json());
// app.use(cors({
//       origin: 'http://localhost:3001',
// }));

app.use('/game', gameRouter);

app.listen(5001);