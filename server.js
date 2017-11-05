const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require('./models/article');
// const routes = require('./routes');
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
// app.use(routes);

// Promises with Mongoose
mongoose.Promise = global.Promise;

//MongoDB Connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact", 
  {
    useMongoClient: true
  }
);

var db = mongoose.connection;


db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Route to get all saved articles.
app.get("/api/saved", function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 5
  Article.find({}).limit(10).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// Main "/" Route. Redirects user to rendered React application.
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/client/public/index.html");
});

// Route to save articles from searches.
app.post("/api/saved", function(req, res) {
  console.log("Article title: " + req.body.title);
  console.log("Article date: " + req.body.date);
  console.log("Article url: "+ req.body.url);

  // Save article.
  Article.create({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Article");
    }
  });
});

// Route to delete saved article.
app.delete("/api/saved/:id", function(req, res) {

  console.log("Article ID to delete: " + req.params.id);

  Article.findByIdAndRemove(req.params.id, function (err, response) {
    if(err){
      res.send("Delete didn't work: " + err);
    }
    res.send(response);
  });
});


//---------------

// Send every request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Start Server
app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

