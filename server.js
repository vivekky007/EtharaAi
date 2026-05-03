// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running")
    );
  })
  .catch(err => console.log(err));