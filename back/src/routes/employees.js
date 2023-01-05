/* eslint-disable consistent-return */
const express = require("express");

const router = express.Router();
//const jsonData = require("../../FilteredDataHuman.json");
/*const socketio = require("socket.io");

const db  = new questdb();

async function conn() {
  await db.connect();
  // Expected output: "resolved"
}*/

/*/!* Get all employees *!/
router.get("/", async (req, res, next) => {
  try {
    for (const datapoint of jsonData) {
      console.log("data", datapoint);
      await conn.exec(
        `INSERT INTO mytable (timestamp) VALUES ('${datapoint.timestamp}')`
      );
    }
  } catch (error) {
    next(error);
  }
});*/

/*/!* Get a specific employee *!/
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await employees.findOne({
      _id: id,
    });

    if (!employee) {
      const error = new Error("Employee does not exist");
      return next(error);
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
});

/!* Create a new employee *!/
router.post("/", async (req, res, next) => {
  try {
    const { name, job } = req.body;
    await schema.validateAsync({ name, job });

    const employee = await employees.findOne({
      name,
    });

    // Employee already exists
    if (employee) {
      const error = new Error("Employee already exists");
      res.status(409); // conflict error
      return next(error);
    }

    const newuser = await employees.insert({
      name,
      job,
    });

    res.status(201).json(newuser);
  } catch (error) {
    next(error);
  }
});

/!* Update a specific employee *!/
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, job } = req.body;
    const result = await schema.validateAsync({ name, job });
    const employee = await employees.findOne({
      _id: id,
    });

    // Employee does not exist
    if (!employee) {
      return next();
    }

    const updatedEmployee = await employees.update(
      {
        _id: id,
      },
      { $set: result },
      { upsert: true }
    );

    res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
});

/!* Delete a specific employee *!/
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await employees.findOne({
      _id: id,
    });

    // Employee does not exist
    if (!employee) {
      return next();
    }
    await employees.remove({
      _id: id,
    });

    res.json({
      message: "Employee has been deleted",
    });
  } catch (error) {
    next(error);
  }
});*/

//module.exports = router;
