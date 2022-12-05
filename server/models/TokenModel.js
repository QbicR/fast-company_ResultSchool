const { Schema, model } = require('mongoose')

const scheme = new Schema({
    user: { type: Schema.Types.ObjectId, res: 'User' },
    refreshToken: { type: String, required: true }
},
    {
        timestamps: true
    })

module.exports = model('Token', scheme)