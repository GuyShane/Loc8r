var mongoose=require('mongoose');
var Loc=mongoose.model('Location');

var send_response=function(res,status,content){
    res.status(status);
    res.json(content);
};

var make_location_list=function(results){
    var locations=[];
    results.forEach(function(doc){
	locations.push({
	    distance: doc.dis,
	    name: doc.obj.name,
	    address: doc.obj.address,
	    rating: doc.obj.rating,
	    facilities: doc.obj.facilities,
	    _id: doc.obj._id
	});
    });
    return locations;
}

module.exports.list_by_distance=function(req,res){
    var lon=parseFloat(req.query.lon);
    var lat=parseFloat(req.query.lat);
    var point={
	type: 'Point',
	coordinates: [lon,lat]
    };
    var opts={
	spherical: true,
	maxDistance: 20000,
	num: 10
    };
    if (!lon || !lat){
	send_response(res,404,{'message':'You must specify a latitude and longitude'});
	return;
    }
    Loc.geoNear(point,opts,function(err,results,stats){
	if (err){
	    send_response(res,404,err);
	}
	else {
	    var locations=make_location_list(results);
	    send_response(res,200,locations);
	}
    });
}

module.exports.create=function(req,res){
    Loc.create({
	name: req.body.name,
	address: req.body.address,
	facilities: req.body.facilities.split(','),
	coords: [parseFloat(req.body.lon),parseFloat(req.body.lat)],
	hours: [{
	    period: req.body.days1,
	    open: req.body.open1,
	    close: req.body.close1,
	    closed: req.body.closed1
	},{
	    period: req.body.days2,
	    open: req.body.open2,
	    close: req.body.close2,
	    closed: req.body.closed2
	}]
    },function(err,location){
	if (err){
	    send_response(res,404,err);
	}
	else {
	    send_response(res,201,location);
	}
    });
}

module.exports.read_one=function(req,res){
    if (req.params && req.params.locationid){
	Loc.findById(req.params.locationid)
	    .exec(function(err,location){
		if (!location){
		    send_response(res,404,{'message':'Location not found'});
		    return;
		}
		else if (err) {
		    send_response(res,404,err);
		    return;
		}
		send_response(res,200,location);
	    });
    }
    else {
	send_response(res,404,{'message':'No location id specified'});
    }
}

module.exports.update_one=function(req,res){
    if (!req.params.locationid){
	send_response(res,404,{'message':'Location id required'});
	return;
    }
    Loc.findById(req.params.locationid)
	.select('-reviews -rating')
	.exec(function(err,location){
	    if (!location){
		send_response(res,404,{'message':'Location not found'});
		return;
	    }
	    else if (err){
		send_response(res,400,err);
	    }
	    location.name=req.body.name;
	    location.address=req.body.address;
	    location.facilities=req.body.facilities.split(',');
	    location.coords=[parseFloat(req.body.lon),parseFloat(req.body.lat)];
	    location.hours=[{
		period: req.body.days1,
		open: req.body.open1,
		close: req.body.close1,
		closed: req.body.closed1,
	    },{
		period: req.body.days2,
		open: req.body.open2,
		close: req.body.close2,
		closed: req.body.closed2,
	    }];
	    location.save(function(err,location){
		if (err){
		    send_response(res,404,err);
		}
		else {
		    send_response(res,200,location);
		}
	    });
	});
}

module.exports.delete_one=function(req,res){
    var id=req.params.locationid;
    if (id){
	Loc.findByIdAndRemove(id)
	    .exec(function(err,location){
		if (err){
		    send_response(res,404,err);
		    return;
		}
		send_response(res,204,null);
	    });
    }
    else {
	send_response(res,404,{'message':'No id specified'});
    }
}
