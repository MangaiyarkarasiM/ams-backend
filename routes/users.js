var express = require("express");
var router = express.Router();
var { dbUrl } = require("../dbConfig");
const mongoose = require("mongoose");
const { UserDetails } = require("../models/user");
const { hashing, hashCompare, createJWT, authVerify } = require("../auth");

mongoose.connect(dbUrl);

//To get the details of all users
router.get("/getAllUsers", authVerify, async (req, res) => {
  try {
    const details = await UserDetails.find();
    res.send({
      statusCode: 200,
      users: details,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
});

//To get the details of the user with id
router.get("/:id", authVerify, async (req, res) => {
  try {
    const details = await UserDetails.findOne({ userName: req.params.id });
    res.send({
      statusCode: 200,
      user: details,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
});

//To register a new user
router.post("/register", async (req, res) => {
  try {
    const details = await UserDetails.findOne({ userName: req.body.userName });
    if (details) {
      res.send({
        statusCode: 400,
        message: "Username already exists",
      });
    } else {
      //hashing the password and saving it in the db
      let hashedPassword = await hashing(req.body.password);
      req.body.password = hashedPassword;
      let doc = await UserDetails.create(req.body);
      res.send({
        statusCode: 200,
        message: "Account Created",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
});

//to login to the app with email and password
router.post("/login", async (req, res) => {
  try {
    console.log(req);
    const details = await UserDetails.findOne({ userName: req.body.userName });

    if (!details) {
      res.send({
        statusCode: 400,
        message: "User Not found",
      });
    } else {
      let userName = details.userName;
      //Compare the password entered by user and stored in the DB
      let compare = await hashCompare(req.body.password, details.password);
      if (compare == true) {
        //create jwt token
        const token = await createJWT({
          userName: req.body.userName,
          email: details.email,
        });
        res.send({
          statusCode: 200,
          token,
          userName,
          message: "Login Successfull",
        });
      } else {
        res.send({
          statusCode: 401,
          message: "Invalid Password",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server error",
    });
  }
});

//To edit the details of the user
router.put("/:id", authVerify, async (req, res) => {
  try {
    const details = await UserDetails.updateOne(
      { _id: req.params.id },
      req.body
    );
    res.send({
      statusCode: 200,
      details,
      message: "Changes Saved",
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
});

//to delete the user
router.delete("/:id", async (req, res) => {
  try {
    await UserDetails.deleteOne({ _id: req.params.id });
    res.send({
      statusCode: 200,
      message: "User Deleted",
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
});

module.exports = router;
