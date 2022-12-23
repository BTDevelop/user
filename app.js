const express = require("express");
const mongoose = require("mongoose");
const CreateUser = require('./controllers/create-user')

const UsersRouter = require('./routes/users-router')
const app = express();

app.use(express.json());
app.use('/api/v1', UsersRouter, CreateUser)
app.use("/uploads", express.static(__dirname + "/uploads"))

require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose
  .connect('mongodb://192.168.254.103:27018/hexaworks', {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
