var pjwt = require('passport-jwt');
var JwtStrategy = pjwt.Strategy;
var ExtractJwt = pjwt.ExtractJwt;
var UserModel = require('../schemas/users.schema');
var cfg = require('../config.js');

module.exports = 
