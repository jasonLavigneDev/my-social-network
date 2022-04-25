// dotenv
require('dotenv').config({ path: './config/.env' });

// serveur package
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// db config
require('./config/db');

//routes
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');

// cors require
const cors = require('cors');

const corsOptions = {
  origin: "https://sharkay-aa.github.io",
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type',"Cookies"],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,OPTIONS,DELETE',
  'preflightContinue': false
}

//app
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



// jwt
app.get('*', checkUser);
app.get('/jwtid',requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});


// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


// server
const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})