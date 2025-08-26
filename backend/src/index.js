const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://127.0.0.1:5500',
};

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/caravan_rental', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'caravan_rentalDB connection error:'));
db.once('open', () => {
  console.log('Connected to caravan_rentalDB');
});

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Import the booking router
const bookingRouter = require('./bookingBack');

// Use the booking router for booking-related routes
app.use('/', bookingRouter);

// Import the contactUs router
const contactUsRouter = require('./contactUsBack');

// Use the contactUs router for contactUs-related routes
app.use('/', contactUsRouter);

// Additional routes for other pages or functionality can be added here
