const express = require('express');
const router = express.Router();

router.get('/boardgames');
router.get('/boardgames/:id');
router.post('/boardgames');
router.put('boardgames/:id)');
router.delete('/boardgames/:id')


module.exports = router;