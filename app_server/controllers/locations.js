module.exports.list_locations=function(req,res){
    res.render('index',{title:'Home'});
}

module.exports.details=function(req,res){
    res.render('index',{title:'Details'});
}

module.exports.review=function(req,res){
    res.render('index',{title:'New review'});
}
