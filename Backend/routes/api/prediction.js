const router = require('express').Router();
const PredictController = require('../../controllers/predictionController');

router.post('/crops', PredictController.predict);

module.exports = router;