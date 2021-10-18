const mongoose = require('../database/');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    cpf:{
        type: String,
        unique: true,
        required: true,
    },
    birthDate:{
       type:Date,
       required: true, 
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;