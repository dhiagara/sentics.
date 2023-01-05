/////const express = require('express');

const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const { notFound, errorHandler } = require("./middlewares");

////const app = express();
//////const router = express.Router();

const express = require("express");
const app = express();

require("dotenv").config();

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());

const fs = require("fs");
const jsonData = JSON.parse(
  fs.readFileSync("./FilteredDataHuman.json", "utf8")
);

//const socketio = require("socket.io");
//const express = require("express");

var mongoose = require("mongoose");
try {
  mongoose.connect(
    "mongodb+srv://dia:dia123@cluster0.k2twaa5.mongodb.net/?retryWrites=true&w=majority"
  );
} catch (err) {
  console.log(err);
}

var HumanSchema = new mongoose.Schema({
  timestamp: Object,
  id: Object,
  instances: Object,
  velocity: Object,
});

var Human = mongoose.model("Human", HumanSchema);

/*john = new Human({ name: 'John', age: 30 });
john.save(function (err, john) {
    if (err) return console.error(err);
});*/

function calculateVelocity(data) {
  console.log("data", data);
  if (data) {
    let velocitie = 0;
    vel_x = 0;
    let array = [];
    if (data.instances) array = Object.values(data.instances);

    console.log("sizeeeee", array.length);
    for (const val of array) {
      console.log("val", val);
      const pos_x2 = val.pos_x;
      const pos_y2 = val.pos_y;
      vel_x += pos_x2 - pos_y2;
    }
    velocitie = vel_x;

    return velocitie;
  } else return null;
}

fs.readFile("./FilteredDataHuman.json", "utf8", async function (err, data) {
  if (err) throw err;
  var jsonData = JSON.parse(data);
  if (jsonData !== null) {
    const dataExist = await Human.find();
    console.log(dataExist.length);
    console.log("dataExist", dataExist);
    if (dataExist.length === 0) {
      try {
        jsonData.forEach((element) => {
          console.log(element);
          let dataTosave = element;
          dataTosave.id = element._id;
          delete dataTosave._id;
          dataTosave.velocity = calculateVelocity(element);
          human = new Human(dataTosave);
          human.save(function (err, john) {
            if (err) return console.error(err);
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
});

fs.watch("./FilteredDataHuman.json", function (event, filename) {
  if (event === "change") {
    console.log(filename + " was changed");
    fs.readFile("./FilteredDataHuman.json", "utf8", function (err, data) {
      if (err) throw err;
      var jsonData = JSON.parse(data);
      try {
        jsonData.forEach((element) => {
          //console.log(element)
          let dataTosave = element;
          dataTosave.id = element._id;
          delete dataTosave._id;

          human = new Human(dataTosave);
          human.save(function (err, john) {
            if (err) return console.error(err);
          });
        });
      } catch (error) {
        next(error);
      }
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");

  // Find all documents
  Person.find(function (err, persons) {
    console.log(persons);
    if (err) return console.error(err);
  });
});

app.get("/stats", async (req, res, next) => {
  try {
    data = await Human.find().select({ velocity: 1, timestamp: 1 });
    console.log("data", data);
    res.json({ data });
    //return data
  } catch (error) {
    next(error);
  }
});

/*const employees = require('./routes/employees');

app.use('/api/employees', employees);*/

app.use(notFound);
app.use(errorHandler);

module.exports = app;
