require("dotenv").config();

const express = require("express");
const cors = require("cors");

const contactRouter = require("./routes/contact.routes");
const careersRouter = require("./routes/careers.routes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ROUTE
app.use("/contact", contactRouter);
app.use("/careers", careersRouter);

// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
