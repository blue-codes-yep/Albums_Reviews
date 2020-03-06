const express = require('express'),
    userModel = require('../models/usersModel'),
    bcrypt = require('bcryptjs'),
    router = express.Router();


router.get('/signup', async (req, res) => {

    res.render('template', {
        locals: {
            title: "Sign Up",

        },
        partials: {
            partial: "partial-signup"
        }

    });
});



router.get('/login', async (req, res) => {

    res.render('template', {
        locals: {
            title: "Login",

        },
        partials: {
            partial: "partial-login"
        }

    });
});

router.post('/login', async (req,res, next) => {
    const { user_email, user_password } = req.body;

    const user = new userModel(null, null, null, user_email, user_password);
    
    const loginResponse = await user.loginUser();
    console.log("This is what it is:", loginResponse);

    if (!!loginResponse.isValid) {
        req.session.is_logged_in = loginResponse.isValid;
        req.session.user_id = loginResponse.user_id;
        req.session.firstname = loginResponse.firstname;
        req.session.lastname = loginResponse.lastname;
        res.redirect('/');
    } else {
        res.sendStatus(403)
    }
});

router.post('/signup', (req,res, next) => {
    const { first_name, last_name, user_email, user_password } = req.body;

    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user_password, salt);
    

    const user = new userModel(null, first_name, last_name, user_email, hash);
    user.addUser();
    res.status(200).redirect('/');
});

module.exports = router;