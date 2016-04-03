var express = require('express');
var router = express.Router();

var locations_controller=require('../controllers/locations');
var others_controller=require('../controllers/others');

router.get('/',locations_controller.list_locations);
router.get('/location',locations_controller.details);
router.get('/location/review/new',locations_controller.review);

router.get('/about',others_controller.about);

module.exports = router;
