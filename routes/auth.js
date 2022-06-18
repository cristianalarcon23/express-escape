const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/signup', (req, res, next) => {
    res.render('auth/signup');
});

router.post('/signup', async (req, res, next) => {
    const {name, hashedPassword} = req.body;
    if (!name || !hashedPassword) {
        const error = 'Mail or pass incorrect';
        res.render ('auth/signup', {error});
        return;
    }
});



module.exports= router;