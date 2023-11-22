const jwt = require('jsonwebtoken')
require('dotenv').config();
const express = require('express');
const router = express.Router();


const { requireAuth } = require('../middleware/auth');
const { createUser, getUser, getUsers } = require('../db/models/users');
const { getCheckout, createCheckout, inventoryCheck, updateInventory } = require('../db/models/checkout');
const { JsonWebTokenError } = require('jsonwebtoken');
const { getClothing } = require('../db/models/clothing');

router.get('/', async (req, res) => {
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

router.get('/users', async (req, res) => {

    const users = req.body;

    try{
        const allUsers = await getUsers();
        res.json(allUsers);
        
    }catch(err) {
        throw err;
    }
})



router.post('/users', async (req, res, next) => {
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


router.get('/checkout', async (req, res) => {

    try{
        const checkout = await getCheckout();
        res.json(checkout);
        
    }catch(err) {
        throw err;
    }
})

router.post('/checkout', async (req, res, next) => {
    
    const data = req.body;
    console.log(data)

    
    try {
        const newInventoryNumber = await inventoryCheck(data.clothesId, data.quantity);
    
        if (newInventoryNumber === false) {
            next({
                name:"inventory error",
                message: "Not enough inventory"
            }) 
        }
        

        await updateInventory(data.clothesId, newInventoryNumber)
        

        const checkout = await createCheckout(data.userId, data.clothesId, data.quantity);
        console.log(checkout);
        if (checkout === undefined) {
            throw new Error();
        }
        res.json(checkout);
                
    } catch (err) {
        console.log(err)
        next({
            name: 'CreatingCheckoutError',
            message: 'There was an error with your checkout. Please try agaian.',
        })
       
    }

    const checkoutList = await getCheckout(data);
    if (checkoutList == undefined){
        res.status(401).send();
        return 
    }
})

router.delete('/clothing,:id',  async (req, res, next) => {
    try{
        
    }catch(error){
        throw error;
    }
} )

router.update('/clothing,:id',  async (req, res, next) => {
    try{
        

    }catch(error){
        throw error;
    }
} )

router.delete('/users,:id',  async (req, res, next) => {
    try{
       

    }catch(error){
        throw error;
    }
} )

router.update('/users,:id',  async (req, res, next) => {
    try{
        
    }catch(error){
        throw error;
    }
} )
   

    


    


    

module.exports = router