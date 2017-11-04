const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;
const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Add routes
app.use(routes);

// Promises with Mongoose
mongoose.Promise = global.Promise;

//MongoDB Connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact", 
  {
    useMongoClient: true
  }
);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Start Server
app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
