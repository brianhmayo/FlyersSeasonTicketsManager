var express = require('express'),
    path = require('path'),
    passport = require('passport');


module.exports = function(app, config) {
    // all environments
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(config.rootPath, 'server/views'));
    app.set('view engine', 'jade');
//    app.use(express.favicon(path.join(config.rootPath, 'public/images/favicon.ico')));
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser('secretvalueheretostay'));
    app.use(express.bodyParser());
    app.use(express.session({secret: 'secretvalueherefornowthengone'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(require('stylus').middleware(path.join(config.rootPath, 'public')));
    app.use(express.static(path.join(config.rootPath, 'public')));
    app.use(app.router);
    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }
}