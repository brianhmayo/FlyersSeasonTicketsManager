var mongoose = require('mongoose');
var userModel = require('../models/User');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('flyers_season_tickets_manager db opened');
    });

    userModel.createDefaultUsers();
}