// server/index.js
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config()

//Import routes
const postsRoute= require('./routes/posts');

//Import MongoDB hidden keys
const MongoDB_PASS = process.env.REACT_APP_MONGODB_PASS;
const MongoDB_ACCOUNT_NAME = process.env.REACT_APP_MONGODB_ACCOUNT_NAME;

//connect to database
mongoose.connect(
  `mongodb+srv://${MongoDB_ACCOUNT_NAME}:${MongoDB_PASS}@rgcluster.x7ixk.mongodb.net/shoppingListDatabase?retryWrites=true&w=majority`,

  { useNewUrlParser: true,useUnifiedTopology: true },
  ()=> 
      console.log('connected to DB')
);

//Middleware
app.use(cors());
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middleware to make sure everytime we go to /posts, we use postsRoute
app.use('/items', postsRoute);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//Routes
app.get('/', (req, res)=>{
    res.send('welcome to shopping list');
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});