const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Test Route
app.get("/api", (req, res) => {
  res.send("API Running Successfully");
});
app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});

// React Frontend Build Folder Serve
//app.use(express.static(path.join(__dirname, "../client/build")));

// Home Route
//app.get("/", (req, res) => {
 // res.sendFile(path.join(__dirname, "../client/build", "index.html"));
//});

// All Other Routes
//app.get(/.*/, (req, res) => {
 // res.sendFile(path.join(__dirname, "../client/build", "index.html"));
//});

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

})
.catch((err) => {
  console.log(err);
});