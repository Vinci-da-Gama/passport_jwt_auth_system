var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var saltRound = 10;

var UserSchemaContent = {
    UserName: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    UserPassword: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    Role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    }
};

var UserSchema = new Schema(UserSchemaContent);

UserSchema.pre('validate', function (next) {
    var currentUser = this;
    var un = currentUser.UserName;
    if(!un) {
        currentUser.invalidate('UserName', 'UserName is required.', un);
    } else if(un.length < 3 || un.length > 30) {
        currentUser.invalidate('UserName', 'The Range of UserName is: >=3 && <= 30.', un);
    }
    next();
});

UserSchema.pre('validate', function (next) {
    var currentUser = this;
    var up = currentUser.UserPassword;
    if(!up) {
        currentUser.invalidate('UserName', 'UserName is required.', up);
    } else if(up.length < 3 || up.length > 30) {
        currentUser.invalidate('UserName', 'The Range of UserName is: >=3 && <= 30.', up);
    }
    next();
});

UserSchema.pre('save', function (next, done) {
    var theUser = this;
    if (this.isModified('UserPassword') || this.isNew) {
        bcrypt.genSalt(saltRound, function (err, synthesizedSalt) {
            if (err) {
                return next(err);
            } else {
                bcrypt.hash(theUser.UserPassword, synthesizedSalt, function (err, hashedPassword) {
                    if (err) {
                        return next(err);
                    } else {
                        theUser.UserPassword = hashedPassword;
                    }
                });
            }
        })
    } else {
        return next();
    }
});

UserSchema.methods.comparePasswords = function (passedInPassword, cb) {
    bcrypt.compare(passedInPassword, this.UserPassword, function (err, isMatched) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatched);
    });
}

module.exports = mongoose.model('UserModel', UserSchema);
