var url = require('url'),
	urlConvertor = require('./url-convertor'),
	ToProxyUrlFn = urlConvertor.ToProxyUrlFn,
	FromProxyUrlFn = urlConvertor.FromProxyUrlFn,
	settings = require('../settings')(),
	serverUrl = settings.createHttpUrl(),
	secureServerUrl = settings.createHttpsUrl();

function _id(request){
	return 'shit';
}

function _isClientConnectionSecure(req){
	if (!req) return false;

	return settings.isProduction? req.headers['x-forwarded-proto'] == 'https' : req.secure;
}
function _ipAddress(req){
	if (!req || !req.isProduction) return '127.0.0.1';

	return req.headers['x-forwarded-for'];
}

var Context = function(request){
	if (request.url === '/') request.url = '/' + settings.homepage;

	var fromProxyUrlFn = new FromProxyUrlFn(request),
		toProxyUrlFn = new ToProxyUrlFn(request),
		targetUrl = fromProxyUrlFn(request.url.substr(1)),
		oTargetUrl = url.parse(targetUrl);
	
	this.convert =  {
		toProxyUrl: toProxyUrlFn,
		fromProxyUrl: fromProxyUrlFn,
	};
	this.client =  {
		id: _id(request),
		isSecure: _isClientConnectionSecure(request),
		ipAddress: _ipAddress(request)
	};
	this.target =  {
		url: targetUrl,
		oUrl: oTargetUrl
	};
};

Context.prototype.server = {
	url: serverUrl,
	oUrl: url.parse(serverUrl),
	secureUrl: secureServerUrl,
	oSecureUrl: url.parse(secureServerUrl)
};

module.exports = Context;
