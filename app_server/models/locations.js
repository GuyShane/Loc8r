var mongoose=require('mongoose');

var hours_schema=new mongoose.Schema({
    period: {
	type: String,
	required: true
    },
    open: String,
    close: String,
    closed: {
	type: Boolean,
	required: true
    }
});

var review_schema=new mongoose.Schema({
    author: String,
    rating: {
	type: Number,
	min: 0,
	max: 5,
	required: true
    },
    date: {
	type: Date,
	'default': Date.now
    },
    review: String
});

var location_schema=new mongoose.Schema({
    name: {
	type: String,
	required: true
    },
    address: String,
    rating: {
	type: Number,
	'default': 0,
	min: 0,
	max: 5
    },
    facilities: [String],
    coords: {
	type: [Number],
	index: '2dsphere'
    },
    hours: [hours_schema],
    reviews: [review_schema]
});

//mongoose.model('Location','location_schema');
