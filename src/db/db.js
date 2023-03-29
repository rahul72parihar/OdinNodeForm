const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/registration", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connection SuccessFul");
  })
  .catch((e) => console.log(e));
