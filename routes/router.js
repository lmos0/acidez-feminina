const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/middleware')

const { searchProfiles, login } = require('../controllers/controllers')

router.post('/login', login)
router.get('/search', authenticate, (req,res) => {
    res.render('search')
})
router.post('/search', authenticate, searchProfiles);


module.exports = router