var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type:String, required:'{PATH} is required!'},
    lastName: {type:String, required:'{PATH} is required!'},
    userName: {type:String,
               required: '{PATH} is required!',
               unique:true},
    salt: {type:String, required:'{PATH} is required!'},
    hashed_password: {type:String, required:'{PATH} is required!'},
    roles: [String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPassword(this.salt, passwordToMatch) === this.hashed_password;
    },
    hasrole: function(role) {
        return this.roles.indexOf(role) > -1;
    }
}

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'brianhmayo');
            User.create({firstName:'Brian', lastName:'Mayo',userName:'brianhmayo',salt:salt,hashed_password:hash, roles:['user','admin']});

            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'bschenn');
            User.create({firstName:'Brayden', lastName:'Schenn',userName:'bschenn',salt:salt,hashed_password:hash, roles:['user']});

            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'remrey');
            User.create({firstName:'Ray', lastName:'Emrey',userName:'remrey',salt:salt,hashed_password:hash, roles:['user']});
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;