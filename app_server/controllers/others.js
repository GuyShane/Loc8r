module.exports.about=function(req,res){
    res.render('about',{
	title:'About - What is this place?',
	header: 'About',
	paragraphs: [
	    'Loc8r was created to help people find places to sit down and get a bit of work done.',
	    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse metus turpis, interdum sit amet dui sed, molestie ultricies nunc. Aenean molestie mollis erat, non sollicitudin augue posuere nec. Praesent blandit nisl nec nibh laoreet, vel consequat dolor accumsan. Pellentesque eu mauris quis tellus commodo mattis. Curabitur eros dui, molestie at scelerisque eu, pellentesque vitae velit. Cras laoreet velit ac arcu bibendum, non pellentesque magna vulputate. Nullam laoreet sagittis tempor. Maecenas pretium vel orci id malesuada. Integer aliquam eros et eros semper molestie.',
	    'Nam blandit varius eleifend. Mauris scelerisque leo varius, interdum magna quis, elementum metus. Fusce et arcu velit. Duis bibendum tellus id enim tristique pulvinar. Donec rutrum dolor at mollis tincidunt. Donec id nisl ut eros bibendum laoreet. Morbi ac mi risus. Aliquam arcu magna, euismod non nulla sed, mollis consectetur est. Integer blandit ullamcorper neque hendrerit pretium. Ut scelerisque mauris sed odio vehicula hendrerit. Integer id maximus magna, a gravida arcu. Donec odio sem, pulvinar vitae neque a, mattis malesuada justo. Morbi vel rhoncus ligula. Suspendisse potenti.',
	    'Pellentesque neque mauris, facilisis eu dui sit amet, accumsan viverra nunc. Duis luctus ante eu lacus congue egestas. Nam ullamcorper suscipit enim vel elementum. Sed eleifend condimentum ante, quis convallis risus dictum ut. Nunc eu ultricies erat. Nullam nec facilisis magna. Mauris ullamcorper facilisis quam, eget aliquam mi varius ac. Duis nec sem nibh. Fusce vestibulum ornare consequat. Maecenas risus leo, lacinia vel nibh nec, sollicitudin consectetur ex. Nam porta non turpis et porta. Pellentesque eu eros id nisi finibus condimentum. Curabitur viverra ullamcorper ipsum ut vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;'
	],
    });
}
