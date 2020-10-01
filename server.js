const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

// BodyParser Middleware
app.use(express.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db || process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// use routes
app.use("/api/items", items);

// Serve static assets if in production
if (process.env.NODE_ENV === production) {
  // Then set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__direname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
