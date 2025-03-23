const express = require('express');
const cors = require('cors');
const connect = require('./db');
const cookieParser = require('cookie-parser');
const app = express();
const blogRouter = require('./Route/Blog');
const userRouter = require('./Route/User');

require('dotenv').config();
app.use(cors({
  origin: 'https://ankitablogs.vercel.app/',
  credentials: true
}));

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





