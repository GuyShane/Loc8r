var request=require('request');
var api_opts={
    server: 'http://localhost:3000'
};
if (process.env.NODE_ENV==='production'){
    api_opts.server='https://mighty-chamber-28530.herokuapp.com/';
}

function render_list(req,res,locations){
    let message;
    if (!(locations instanceof Array)){
	message='API lookup error';
	locations=[];
    }
    else if (!locations.length){
	message='No places found nearby';
    }
    res.render('list_locations',{
	title: 'Loc8r - Find places to work',
	header: {
	    title: 'Loc8r',
	    tagline: 'Find places to work near you with WiFi!',
	},
	sidebar: 'Looking for WiFi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake, or a pint? Let Loc8r help you find the place you\'re looking for.',
	message: message,
	locations: locations
    });
}

function format_dist(dist){
    dist=parseFloat(dist);
    if (dist>1000){
	dist/=1000;
	return dist.toFixed(1)+'km';
    }
    return dist.toFixed(0)+'m';
}

module.exports.list_locations=function(req,res){
    const req_opts={
	url: api_opts.server+'/api/locations',
	method: 'GET',
	json: {},
	qs: {
	    lat: 53.5020721,
	    lon: -113.4817427,
	    max_dist: 2000
	}
    };
    request(req_opts,(err,response,body)=>{
	if (err){
	    console.log(err);
	}
	const locations=body;
	if (response.statusCode===200 && locations.length){
	    for (let l of locations){
		l.distance=format_dist(l.distance);
	    }
	}
	render_list(req,res,locations);
    });
}

module.exports.details=function(req,res){
    res.render('location_details',{
	title:'Details - Starcups',
	location_info: {
	    name: 'Starcups',
	    address: '125 High Street, Reading, RG5 TP2',
	    location: {
		lat: 51.455041,
		lon: -0.9690884
	    },
	    rating: '3',
	    hours: [
		{period: 'Monday - Friday', open: '7:00am', close: '7:00pm', closed: false},
		{period: 'Saturday', open: '8:00am', close: '5:00pm', closed: false},
		{period: 'Sunday', closed: true}
	    ],
	    facilities: ['Hot drinks','food','Premium WiFi']
	},
	panel_headers: {
	    hours: 'Opening Hours',
	    map: 'Location Map',
	    facilities: 'Facilities',
	    reviews: 'Customer Reviews'
	},
	reviews: [
	    {
		author: 'Simon Holmes',
		rating: 5,
		date: '16 June 2013',
		review: 'What a great place. Can\'t say enough good things'
	    },
	    {
		author: 'Charlie Chaplin',
		rating: 3,
		date: '24 September 2013',
		review: 'It\'s all right. Decent WiFi I guess'
	    }
	],
	add_review: 'Add Review',
	sidebar: {
	    main: 'Starcups is on Loc8r because it has accessible WiFi and space to sit down with your laptop or whatever.',
	    under: 'If you\'ve been and enjoyed it - or if you didn\'t - leave a review and let other know what you think!'
	}
    });
}

module.exports.review=function(req,res){
    res.render('add_review',{
	title:'New review',
	header: 'Review Starcups',
	input_prompts: {
	    name: 'Name',
	    rating: 'Rating',
	    review: 'Review',
	    submit: 'Add Review',
	},
	rating_options: [5,4,3,2,1,0],
    });
}
