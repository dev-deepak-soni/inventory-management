const express = require('express')
const router = express.Router()
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/', (req, res) => {
    res.send('Welcome to Google.')
})

// define the home page route
router.post('/verify', async (req, res) => {
    console.log('req.body.data', req.body);
    const { token, type } = req.body;
    console.log('token', token);
    const result = await verifyIdToken(token, type);
    console.log('result', result);
    res.status(200).json({ success: result.success, msg : result.msg, redirect: 'http://localhost:3000' });
})

const verifyIdToken = async (idToken, type) => {
    const client = getClient();

    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        // check if user already exists or not
        try {
            const user = await User.findOne({ email: payload.email });
            console.log('user',user);
            if (user && type === 'login') {
                return { success: true, msg: 'User found.', data: user };
            } else if (!user && type === 'login') {
                return { success: false, msg: 'No user found associated with this email. Kindly create an account with us.', data: user };
            } else if (!user && type === 'signup') {
                // POST route to create a new user
                try {
                    const { given_name: name, family_name: surname, email, email_verified, picture } = payload;
                    const newUser = await User.create({ name, surname, email, email_verified, picture });
                    return { success: true, msg: 'You have signed up successfully', data: newUser };
                } catch (error) {
                    return { success: false, msg: 'Error creating user: ' + error };
                }
            } else {
                return { success: true, msg: 'User found.', data: user };
            }

        } catch (error) {
            return { success: false, msg: 'Error finding user: ' + error };
        }
    } catch (error) {
        console.error('Error verifying ID token:', error.message);
        throw error;
    }
};


const getClient = () => {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REDIRECT_URI = process.env.GOOGLE_CALLBACK_URL;
    const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    return oauth2Client;
};

module.exports = router