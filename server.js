const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const items = require('./routes/api/items');
const users = require('./routes/api/users');

const app = express();

// BodyParser Middleware
app.use(express.json());

//DB
// sin el config
//const db = require('./config/keys');
const db = config.get('mongoURI');

//connect to DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) //adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
//Use routes
app.use('/api/items', items);
app.use('/api/users', users);
//another way to do the same of above
app.use('/api/auth', require('./routes/api/auth'));

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on Port ${port}`));
