const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json({limit: '10mb'}));
app.use(morgan('dev'));

app.use('/public', express.static(__dirname + '\\public'));

const uri = `mongodb+srv://vishwa:Intelh61m@travel-database.a94mt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, error => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to MongoDB server successfully!");
  }
});

require('./models');

app.use(require('./routes'));

console.clear();
app.listen(PORT, () => {
  console.log('Server is running on localhost:', PORT);
});
