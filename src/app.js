const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();

require("./db/db");
const Register = require("./models/register");

const port = process.env.PORT || 8000;

const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("views", views_path);
app.set("view engine", "hbs");
hbs.registerPartials(partials_path);

// ROUTES

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.get("*", (req, res) => {
  res.render("404");
});

// POST

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.conpassword;

    if (password == cpassword) {
      const registeredUser = new Register({
        fullname: req.body.fullname,
        email: req.body.email,
        password: password,
        confirmpassword: cpassword,
      });

      const registered = await registeredUser.save();
      res.status(201).render("login");
    } else {
      res.send("password Does not match");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await Register.findOne({ email: email });

    if (userEmail.password === password) {
      res.status(200).send("log in successful");
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(400).send("Invalid Email/password");
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
