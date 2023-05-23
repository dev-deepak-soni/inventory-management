const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

router.use(express.json());

router.post('/login', [
    body('email', 'Email length should be 10 to 30 characters')
        .isEmail().isLength({ min: 10, max: 30 }),
    body('password', 'Password length should be 8 to 15 characters')
        .isLength({ min: 8, max: 15 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        const { email, password } = req.body;
        //validate form data
        if (!errors.isEmpty()) {
            return res.json(errors)
        }


        //check user-exists or not
        try {

            const user = await User.findOne({ email, password });

            if (!user) {
                return res.status(500).json({ msg: 'Invalid Credentials!.' });
            }

        } catch (error) {
            res.status(500).json({ msg: 'Error finding user : ' + error });
        }



    } catch (error) {
        res.status(500).json({ msg: 'Error finding user : ' + error });
    }
})


router.post('/signup', [
    body('email', 'Email length should be 10 to 30 characters')
        .isEmail().isLength({ min: 10, max: 30 }),
    body('password', 'Password length should be 8 to 15 characters')
        .isLength({ min: 8, max: 15 })
], async (req, res) => {

    console.log('body----', req.body);

    // first validate fields

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json(errors)
    }

    // check if user already exists or not
    try {
        const user = await User.findOne(req.email);
        if (user) {
            return res.status(404).json({ msg: 'You have already signed up.' });
        }

        // POST route to create a new user
        try {
            const { name, surname, email, password, city, state, zip } = req.body;
            const user = await User.create({ name, surname, email, password, city, state, zip });
            res.status(200).json({ msg: 'You have signed up successfully', data: user });
        } catch (error) {
            res.status(500).json({ msg: 'Error creating user : ' + error });
        }

    } catch (error) {
        res.status(500).json({ msg: 'Error finding user : ' + error });
    }




    // if already exists then send them to login page of show alert
    // if not then add user
    // if add success then send them to login page
    res.send('Welcome to signup.')
})


router.post('/forgetpassword', (req, res) => {
    res.send('Welcome to forgetpassword.')
})

module.exports = router