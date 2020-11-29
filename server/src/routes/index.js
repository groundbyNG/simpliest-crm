import express from 'express';
import usersRouter from './user';
import ordersRouter from './order';

const app = express();

app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);


export default app;