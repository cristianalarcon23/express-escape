const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/signup', (req, res, next) => {
    res.render('auth/signup');
});

router.get("/login", (req, res, next) => {
    res.render("auth/login");
  });

router.post('/signup', async (req, res, next) => {
    const {name, hashedPassword} = req.body;
    if (!name || !hashedPassword) {
        const error = 'Mail or pass incorrect';
        res.render ('auth/signup', {error});
        return;
    }




  const passwordRegex =
    /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;
  if (!passwordRegex.test(hashedPassword)) {
    const error = `
    Password must be at least 8 characters long, includes one or more uppercase and lowercase letters, has at least one digit,
    has one special character`;
    res.render("auth/signup", { error });
    return;
  }
  try {
    const userFound = await User.findOne({ name });
    if (userFound) {
      const error = `E-Mail already exists`;
      res.render("auth/signup", { error });
      return;
    }
    const password = bcrypt.hashSync(hashedPassword);
    const createdUser = await User.create({
      name,
      hashedPassword: password,
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }

});

router.post("/login", async (req, res, next) => {
    const { name, hashedPassword } = req.body;
    if (!name || !hashedPassword) {
      const message = `Missing username or password`;
      res.render("auth/login", { message });
      return;
    }
    try {
      const userExists = await User.findOne({ name });
      if (!userExists) {
        const message = `User not found`;
        res.render("auth/login", { message });
      }
  // check if password matches
      const passwordMatch = bcrypt.compareSync(hashedPassword, userExists.hashedPassword);
      if (passwordMatch) {
        // create active session QUESTION
        // change userExists to object, delete pw
        const objectUser = userExists.toObject();
        delete objectUser.password;
        // save current user in session
        req.session.currentUser = objectUser;
        // create global variable
        req.app.locals.currentUser = true;
        res.redirect("/");
      } else {
        const message = `Wrong password`;
        res.render("auth/login", { message });
        return;
      }
    } catch (error) {
      next(error);
    }
  });

  router.get("/logout", (req, res, next) => {
    req.session.destroy();
    req.app.locals.currentUser = false;
    res.redirect("/auth/login");
  });
module.exports= router;