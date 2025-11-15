const dotenv = require('dotenv')
dotenv.config()
const mongoose = require("mongoose");
const express = require('express')
const app = express()
// const connect = require('./db/db')
// connect()
const userRoutes = require('./routes/user.routes')
const cookieParser = require('cookie-parser')
// const rabbitMq = require('./service/rabbit')


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/userdb-rapido");
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("DB Error:", err);
  }
};
connectDB();


// rabbitMq.connect()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/', userRoutes)

module.exports = app