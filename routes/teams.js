const router = require("express").Router();
const Team = require('../models/Team');
const User = require('../models/User');

router.get('/', async (req, res, next) =>{
    const teams = await Team.find({});
    try {
        res.render('teams/teams', {teams});
    } catch (error) {
        next(error)
    }

})


router.get('/create', async (req, res, next) => {
    try {
        const users = await User.find({});
        res.render('teams/new-team', {users});
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const team = await Team.findById(id).populate('participants')
        res.render('teams/team-detail', {team})
    } catch (error) {
        next(error)
    }
});

router.get('/edit/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const team = await Team.findById(id).populate('participants');
        const users = await User.find({});
        res.render('teams/edit-team', {team, users})
    } catch (error) {
        next(error)
    }
});

router.post('/create', async (req, res, next) => {
    const {name, participants} = req.body;
    try {
        await Team.create({name, participants});
        res.redirect('/teams')
    } catch (error) {
        res.render('teams/new-team');
        next(error);
    }

});

router.post('/edit/:id', async (req,res,next) => {
    const {id} = req.params;
    const {name, participants} = req.body;
    try {
        await Team.findByIdAndUpdate(id, {name, participants});
        res.redirect(`/teams/${id}`);
    } catch (error) {
        next(error)
    }
})

router.post('/delete/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        await Team.findByIdAndDelete(id);
        res.redirect('/teams')
    } catch (error) {
        next(error)
    }
});

module.exports = router;