var mongoose=require('mongoose');
var Loc=mongoose.model('Location');

var send_response=function(res,status,content){
    res.status(status);
    res.json(content);
}

var set_avg_rating=function(location){
    var i,num,avg,total;
    if (location.reviews && location.reviews.length){
	num=location.reviews.length;
	total=0;
	for (i=0;i<num;i++){
	    total+=location.reviews[i].rating;
	}
	avg=parseInt(total/num,10);
	location.rating=avg;
	location.save(function(err,location){
	    if (err){
		console.log(err);
	    }
	    else {
		console.log('Location '+location._id+' rating updated to '+avg+'!');
	    }
	});
    }
}

var update_rating=function(id){
    Loc.findById(id)
	.select('rating reviews')
	.exec(function(err,location){
	    if (!err){
		set_avg_rating(location);
	    }
	});
}

var add_review=function(req,res,location){
    if (!location){
	send_response(res,404,{'message':'Location not found'});
    }
    else {
	locationreviews.push({
	    author: req.body.author,
	    rating: req.body.rating,
	    review: req.body.review
	});
	location.save(function(err,location){
	    if (err){
		send_response(res,400,err);
	    }
	    else {
		update_rating(location._id);
		var r=location.reviews[location.reviews.length-1];
		send_response(res,201,r);
	    }
	});
    }
}

module.exports.create=function(req,res){
    var locationid=req.params.locationid;
    if (locationid){
	Loc.findById(locationid)
	    .select('reviews')
	    .exec(
		function(err,location){
		    if (err){
			send_response(res,404,err);
		    }
		    else {
			add_review(req,res,location);
		    }
		}
	    );
    }
    else {
	send_response(res,404,{'message':'Location id required'});
    }
}

module.exports.read_one=function(req,res){
    if (req.params && req.params.locationid && req.params.reviewid){
	Loc.findById(req.params.locationid)
	    .select('name reviews')
	    .exec(function(err,location){
		if (!location){
		    send_response(res,404,{'message':'Location not found'});
		    return;
		}
		else if (err) {
		    send_response(res,404,err);
		    return;
		}
		if (location.reviews && location.reviews.length){
		    var review=location.reviews.id(req.params.reviewid);
		    if (!review){
			send_response(res,404,{'message':'Review not found'});
		    }
		    else {
			send_response(res,200,{
			    location: {
				name: location.name,
				id: req.params.locationid
			    },
			    review: review
			});
		    }
		}
		else {
		    send_response(res,404,'No reviews found for location');
		}
	    });
    }
    else {
	send_response(res,404,{'message':'Missing an id'});
    }
}

module.exports.update_one=function(req,res){
    if (!req.params.locationid || !req.params.reviewid){
	send_response(res,404,{'message':'Location id and review id both required'});
	return;
    }
    Loc.findById(req.params.locationid)
	.select('reviews')
	.exec(function(err,location){
	    if (!location){
		send_response(res,404,{'message':'Location not found'});
		return;
	    }
	    else if (err){
		send_response(res,400,err);
		return;
	    }
	    if (location.reviews && location.reviews.length){
		var rev=location.reviews.id(req.params.reviewid);
		if (!rev){
		    send_response(res,404,{'message':'Review not found'});
		}
		else {
		    rev.author=req.body.author;
		    rev.rating=req.body.rating;
		    rev.review=req.body.review;
		    location.save(function(err,location){
			if (err){
			    send_response(res,404,err);
			}
			else {
			    update_rating(location._id);
			    send_respose(res,200,rev);
			}
		    });
		}
	    }
	    else {
		send_response(res,404,{'message':'No reviews found for location'});
	    }
	});
}

module.exports.delete_one=function(req,res){
    if (!req.params.locationid || !req.params.reviewid){
	send_response(res,404,{'message':'Location id and review id required'});
	return;
    }
    Loc.findById(req.params.locationid)
	.select('reviews')
	.exec(function(err,location){
	    if (!location){
		send_response(res,404,{'message':'Location not found'});
		return;
	    }
	    else if (err){
		send_response(res,404,err);
		return;
	    }
	    if (location.reviews && location.reviews.length>0){
		var review=location.reviews.id(req.params.reviewid);
		if (!review){
		    send_response(res,404,{'message':'Review not found'});
		}
		else {
		    review.remove();
		    location.save(function(err){
			if (err){
			    send_response(res,404,err);
			}
			else {
			    update_rating(location._id);
			    send_response(res,204,null);
			}
		    });
		}
	    }
	    else {
		send_response(res,404,{'message':'No reviews for this location'});
	    }
	});
}
