const express = require('express');
const { getUsers, deleteUsers, updateUsers } = require('../db/models/users');



const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const allUsers = await getUsers();
        res.json(allUsers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userDelete = await deleteUsers(id);
        res.json({ status: 'successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.patch('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userObj = req.body;
        const userUpdate = await updateUsers(id, userObj);
        res.json(userUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router