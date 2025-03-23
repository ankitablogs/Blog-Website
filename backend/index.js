const express = require('express');
const cors = require('cors');
const connect = require('./db');
const cookieParser = require('cookie-parser');
const app = express();
const blogRouter = require('./Route/Blog');
const userRouter = require('./Route/User');

require('dotenv').config();
const corsOptions = {
  origin: ['http://localhost:5173', 'https://ankitablogs.vercel.app'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use(cookieParser());


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

connect();

app.use('/blog', blogRouter);
app.use('/user', userRouter);





