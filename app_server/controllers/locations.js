module.exports.list_locations=function(req,res){
    res.render('list_locations',{title:'Home'});
}

module.exports.details=function(req,res){
    res.render('location_details',{title:'Details'});
}

module.exports.review=function(req,res){
    res.render('add_review',{title:'New review'});
}
