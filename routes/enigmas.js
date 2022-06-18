const router = require("express").Router();
const User = require("../models/User");
const isLoggedIn = require("../middlewares");

router.get('/', isLoggedIn, (req, res, next) => {
    res.render('enigmas')
});

module.exports = router;