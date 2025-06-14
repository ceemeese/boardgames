const express = require('express');
const { getUsers, getUser, postUser, putUser, deleteUser } = require('../controller/users');
const { userValidation, userIdValidation, checkUniqueUserFields } = require('../validators/userValidator');
const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', userIdValidation ,getUser);
router.post('/users',userValidation, checkUniqueUserFields, postUser);
router.put('/users/:id', userIdValidation, userValidation, putUser);
router.delete('/users/:id', userIdValidation, deleteUser)


module.exports = router;