const express = require('express')
const router = express.Router()
const { OAuth2Client } = require('google-auth-library');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/', (req,res)=>{
    res.send('Welcome to Google.')
})

// define the home page route
router.post('/verify', async (req, res) => {
    console.log('req.body.data',req.body);
    const {token} = req.body;
    const result = await verifyIdToken(token);
    console.log('result', result);
    res.status(200).json({success:true, data: result, redirect : 'http://localhost:3000/dashboard'});
})

const verifyIdToken = async (idToken) => {
    const client = getClient()

    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        return payload; // Return the payload if needed
    } catch (error) {
        console.error('Error verifying ID token:', error.message);
        throw error;
    }
}

const getClient = () => {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REDIRECT_URI = process.env.GOOGLE_CALLBACK_URL;
    const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    return oauth2Client;
};

module.exports = router