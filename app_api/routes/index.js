var express=require('express');
var router=express.Router();
var location_controller=require('../controllers/locations');
var review_controller=require('../controllers/reviews');

router.get('/locations',location_controller.list_by_distance);
router.post('/locations',location_controller.create);
router.get('/locations/:locationid',location_controller.read_one);
router.put('/locations/:locationid',location_controller.update_one);
router.delete('/locations/:locationid',location_controller.delete_one);

router.post('/locations/:locationid/reviews',review_controller.create);
router.get('/locations/:locationid/reviews/:reviewid',review_controller.read_one);
router.put('/locatons/:locationid/reviews/:reviewid',review_controller.update_one);
router.delete('/locations/:locationid/reviews/:reviewid',review_controller.delete_one);

module.exports=router;
