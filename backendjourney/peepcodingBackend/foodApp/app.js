const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

const userRouter = require('./Routers/userRouter');
// const authRouter = require('./Routers/authRouter');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
app.use('/user', userRouter);
app.use('/plans', planRouter);
app.use('/reviews',reviewRouter);
// app.use('/auth', authRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
