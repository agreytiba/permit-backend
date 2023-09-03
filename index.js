const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

//  connect to database
connectDB();
// allow to access  data by using req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use to change default error handler
app.use(errorHandler);

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/works", require("./routes/workRoutes"));
app.use("/api/safety", require("./routes/safetyRoutes"));
app.use("/api/controlrisks", require("./routes/riskRoute"));

// use to change default error handler


app.listen(port, () => console.log(`server running in port number ${port}`));
