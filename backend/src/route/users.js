const express = require('express');
const { getUsers, getUser, postUser, putUser, deleteUser } = require('../controller/users');
const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', postUser);
router.put('users/:id)', putUser);
router.delete('/users/:id', deleteUser)


module.exports = router;