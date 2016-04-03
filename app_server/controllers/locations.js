module.exports.list_locations=function(req,res){
    res.render('list_locations',{title:'Home'});
}

module.exports.details=function(req,res){
    res.render('list_locations',{title:'Details'});
}

module.exports.review=function(req,res){
    res.render('list_locations',{title:'New review'});
}
