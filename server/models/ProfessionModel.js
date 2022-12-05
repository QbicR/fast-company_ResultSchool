const { Schema, model } = require('mongoose')

const scheme = new Schema({
    name: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

module.exports = model('Profession', scheme)