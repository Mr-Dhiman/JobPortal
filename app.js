const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require('./config/db');
const login_router = require("./router/login-router");
const cors=require('cors');
app.use(cors());

app.use(express.json());  // to parser request content_type:json

app.use(express.urlencoded({ extended: true })); // parse request content-type:form-data;




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
mongoose.Promise = global.Promise;

app.use('/', login_router);

mongoose.connect(db.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("database connected");
}).catch(err => {
    console.log("connection Failed", err);
})
// app.use(express.static("Hoitalent"));


const port = process.env.PORT || 8082;

app.listen(port, () => {
    console.log("server is listening at port", port);
})