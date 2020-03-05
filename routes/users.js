const express = require('express'),
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

module.exports = router;