var $ = require('./my-jquery');
var NavBar = require('./navbar');

require('./xhr-intercept')();
require('./string-intercept')();

$(function(){
	debugger
	var navbar = new NavBar(window.mt3.debug);
	$('body').append(navbar.get$Root());
});
