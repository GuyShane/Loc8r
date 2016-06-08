var mongoose=require('mongoose');
require('./locations');

var db_uri='mongodb://localhost/Loc8r';
if (process.env.NODE_ENV==='production'){
    db_uri=process.env.MONGODB_URI;
}
mongoose.connect(db_uri);

var graceful_shutdown=function(msg,callback){
    mongoose.connection.close(function(){
	console.log('Mongoose disconnected through '+msg);
	callback();
    });
}

mongoose.connection.on('connected',function(){
    console.log('Mongoose connected to '+db_uri);
});

mongoose.connection.on('error',function(err){
    console.log('Mongoose connection error: '+err);
});

mongoose.connection.on('disconnected',function(){
    console.log('Mongoose disconnected');
});

process.once('SIGUSR2',function(){
    graceful_shutdown('nodemon restart',function(){
	process.kill(process.pid,'SIGUSR2');
    });
});

process.on('SIGINT',function(){
    graceful_shutdown('app termination',function(){
	process.exit(0);
    });
});

process.on('SIGTERM',function(){
    graceful_shutdown('Heroku app shutdown',function(){
	process.exit(0);
    });
});
