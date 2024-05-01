const express = require('express');
const jwt = require('jsonwebtoken')
const user = require("../nodejs/Database/models/users");
const multer = require("multer");
const products = require('../nodejs/Database/models/products');
const cookie = require("cookie-parser");
let errors = { name: "", phone: "", email: "", password: "" };
const bcrypt = require("bcrypt");
const maxAge = 2 * 24 * 60 * 60;
const handleErrors = (err) => {
  if (err.code === 11000) {
    errors.email = "AIU";
    errors.phone = "AIU";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const createToken = (id) => {
  return jwt.sign({id}, 'OdayIsNerd', {expiresIn: maxAge});
}
module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.signup_post = async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    const users = await user.create({ name, phone, email, password });
    const token =  createToken(users._id); 
    
    res.status(201).cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }).redirect("/home");
    
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).send(errors);
  }
};
module.exports.login_post = async (req, res) => {
  try {
    const check = await user.findOne({email: req.body.email});
    if(!check){
      console.log("Can't find user");
    }else{
      const isPassMatch = await bcrypt.compare(req.body.password,check.password);
      if(isPassMatch){
        const token =  createToken();
        res.status(201).cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }).redirect("/home");
      }else{
        res.send('Password or Email error');
      }
    }
  } catch{
    console.log("err");
  }
};
module.exports.home_get = (req, res) => {
  res.render("home");
};
module.exports.home_post = (req, res) => {
  res.send("This is home page");
};



module.exports.menu_get = (req, res) => {
  res.render("menu");
};
module.exports.menu_post = (req, res) => {
  res.send("This is menu page");
};
module.exports.dashboard_get = (req, res) => {
  res.render("admin/dashboard");
};
module.exports.dashboard_post = (req, res) => {
  res.send("This is dashboard page");
};
module.exports.customer_get = async (req, res) => {
  res.render('admin/customer');
};
module.exports.customer_data_get = async (req, res) => {
  try {
    const users = await user.find();
    res.json({users});
} catch (err) {
    res.status(500).json({ message: err.message });
}
};
//this code takes all users needed
module.exports.customer_post = (req, res) => {
  res.send("This is customers page");
};
module.exports.customer_put = (req, res) => {
  res.send("This for update users");
}
module.exports.customer_delete = (req, res) => {
  res.send("This for update users");
}
module.exports.products_post = async (req, res) => {
  const { name, price, type, image, givenScore, description } = req.body;
  try {
    const product = await products.create({ name, price, picture, type, image, givenScore, description });
  } catch (err) {
    res.status(400).send(errors);
  }
}
module.exports.products_get = async (req, res) => {
  res.render('product');
}