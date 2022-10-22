const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Successfull"))
  .catch(() => console.log("Connection Error.."));
