const jwt = require('jsonwebtoken')
require('dotenv').config();
const express = require('express');
const router = express.Router();


const { requireAuth } = require('../middleware/auth');
const { createUser, getUser } = require('../db/models/users');
const { JsonWebTokenError } = require('jsonwebtoken');
const { getClothing } = require('../db/models/clothing');

router.get('/', async (req, res, next) => {
    res.json({ status: 'working' })
  });


router.get('/clothes', async (req, res) => {

    const clothing = req.body;

    try{
        const clothes = await getClothing();
        res.json(clothes);
    }catch(err) {
        throw err;
    }
})



router.post('/user', async (req, res, next) => {
    // get all the classes from my database
    
    const data = req.body;
    console.log(data)

    try {
        const user = await createUser(data)
        
        if (user === undefined) {
            throw new Error();
        }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.json({ accessToken: accessToken});
                
    } catch (err) {
        console.log(err)
        next({
            name: 'CreatingUserError',
            message: 'There was an error creating a user. Please try agaian',
        })
       
    }

    const user = await getUser(data);
    if (user == undefined){
        res.status(401).send();
        return 
    }
})


   

    
    // create JWT 

    


    

module.exports = router