const router = require("express").Router();
const isLoggedIn = require("../middlewares");
const Team = require('../models/Team');
const Enigma = require('../models/Enigma')

router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const enigmas = await Enigma.find({})
        console.log(enigmas);
        res.render('enigmas/enigmas', {enigmas})
    } catch (error) {
        
    }

});

router.get('/create', isLoggedIn, async (req, res, next) => {
    try {
        const teams = await Team.find({});
        res.render('enigmas/new-enigma', {teams});
    } catch (error) {
        next(error)
    }
});

router.post('/create', isLoggedIn, async (req, res, next) => {
    const {title, number, description, image, team} = req.body;
    try {
        await Enigma.create({title, number, description, image, team});
        res.redirect('/enigmas')
    } catch (error) {
        res.render('enigmas/new-enigma');
        next(error);
    }

});



module.exports = router;