const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

var { Doctor } = require("./Model/doctor");

mongoose.connect("mongodb://localhost:27017/DoctorsDB");
/**Express internally uses the same body-parser */
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WELCOME");
});

app.get("/json", (req, res) => {
  res.json({
    status: "SUCCESS"
  });
});

app.post("/createdoc", (req, res) => {
  var doctor = new Doctor(req.body);
  doctor
    .save()
    .then(data => {
      res.status(201).json({
        processingmsg: "Created below doctor info successfully",
        docinfo: req.body
      });
    })
    .catch(err => {
      res.status(500).json({
        processingmsg: "Unable to create Doctor info successfully",
        errormsg: err.message
      });
    });
});

app.get("/finddoctor/:long/:lat", (req, res) => {
  Doctor.find()
    .where("location")
    .within({
      center: [req.params.long, req.params.lat],
      radius: 1
    })
    .then(data => res.status(200).json(data))
    .catch(error => {
      res.status(400).json({
        processingmsg: "Unable to find Doctor",
        errormsg: err.message
      });
    });
});

app.get("/*", (req, res) => {
  res
    .status(400)
    .send("<h1>Bad Request. No resource found for this end point/method</h1>");
});
app.post("/*", (req, res) => {
  res
    .status(400)
    .send("<h1>Bad Request. No resource found for this end point/method</h1>");
});
app.put("/*", (req, res) => {
  res
    .status(400)
    .send("<h1>Bad Request. No resource found for this end point/method</h1>");
});
app.delete("/*", (req, res) => {
  res
    .status(400)
    .send("<h1>Bad Request. No resource found for this end point/method</h1>");
});

app.listen(3001);
