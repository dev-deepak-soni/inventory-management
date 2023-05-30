const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const authLogin = require('../middleware/auth');
const User = require('../models/User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.use(express.json());


router.post('/login', async (req, res) => {
    try {
        const secretKey = process.env.JWT_secret_key;
        const errors = validationResult(req);
        const {
            email
        } = req.body;

        //validate form data
        if (!errors.isEmpty()) {
            return res.json(errors)
        }

        //check user-exists or not
        try {

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(500).json({
                    success: false,
                    msg: 'Invalid Credentials!.'
                });
            }

            const verify = await bcrypt.compare(req.body.password, user.password)

            if (verify) {

                const data = {
                    user: {
                        id: user.name
                    }
                }
                const token = jwt.sign(data, secretKey);

                res.status(200).json({
                    success: true,
                    msg: 'You have login successfully',
                    token
                });
            } else {
                res.status(409).json({
                    success: false,
                    msg: 'Invalid Credentials!'
                });
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                msg: 'Error finding user : ' + error
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error finding user : ' + error
        });
    }
})


router.post('/signup', [
    body('email', 'Email length should be 10 to 30 characters')
        .isEmail().isLength({
            min: 10,
            max: 30
        }),
    body('password', 'Password length should be 8 to 15 characters')
        .isLength({
            min: 8,
            max: 15
        })
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json(errors)
    }

    // check if user already exists or not
    try {
        const user = await User.find({
            email: req.body.email
        }).select('-password');
        if (user.length > 0) {
            return res.status(404).json({
                success: false,
                msg: 'You have already signed up.',
                user
            });
        }

        // POST route to create a new user
        try {
            const {
                name,
                surname,
                email,
                city,
                state,
                zip
            } = req.body;

            //Encryption of password
            const salt = bcrypt.genSaltSync(10);
            const password = bcrypt.hashSync(req.body.password, salt);

            const user = await User.create({
                name,
                surname,
                email,
                password,
                city,
                state,
                zip
            });
            res.status(200).json({
                success: true,
                msg: 'You have signed up successfully',
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: 'Error creating user : ' + error
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error finding user : ' + error
        });
    }
})

router.post('/forgetpassword', (req, res) => {
    res.send('Welcome to forgetpassword.')
})

router.post('/getuser', authLogin, (req, res) => {
    res.status(200).json({ success: true, msg: 'Token verified' })
})

module.exports = router