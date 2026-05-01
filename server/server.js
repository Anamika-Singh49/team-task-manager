const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// React Frontend Files
app.use(express.static(path.join(__dirname, "../client/build")));

// API Route
app.get("/api", (req, res) => {
  res.send("API Running Successfully");
});

// React Frontend Route
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

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