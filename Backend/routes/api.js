const router = require('express').Router();
const UserRouter = require('./api/user');
const PredictionRouter = require('./api/prediction')

//USERS
router.use('/user', UserRouter);
router.use('/prediction', PredictionRouter)

module.exports = router;