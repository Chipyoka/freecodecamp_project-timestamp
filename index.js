
var express = require('express');
var app = express();


var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to handle date parsing
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  let dateObject;

  // If the date is empty, use the current date
  if (!date) {
    dateObject = new Date();
  } 
  
  // Check if the date parameter is a number (Unix timestamp)
  else if (!isNaN(date)) {
    // If it's a Unix timestamp, convert it to a Date object
    dateObject = new Date(parseInt(date));
  } else {
    // Otherwise, try parsing the date string normally
    dateObject = new Date(date);
  }

  // Check if the date is valid
  if (dateObject.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Prepare the response
  const unixTimestamp = dateObject.getTime(); // Unix timestamp (in milliseconds)
  const utcString = dateObject.toUTCString(); // UTC date string

  // Return the response as a JSON object
  res.json({
    unix: unixTimestamp,
    utc: utcString,
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
