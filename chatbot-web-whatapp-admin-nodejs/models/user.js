const mongoose = require('mongoose');

const Usershema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    password2: {
        type: String,
        required: true

    },
    UUID: {
        type: String,
        required: true
    },
    apikey: {
        type: String,
        required: true
    }
});

const UserDetails = mongoose.model('aruna-project', Usershema);

module.exports = UserDetails;