const { Schema, model } = require('mongoose')

const scheme = new Schema({
    content: { type: String, required: true },
    // На чьей странице комментарий
    pageId: { type: Schema.Types.ObjectId, res: 'User', required: true },
    // Кто оставил комментарий
    userId: { type: Schema.Types.ObjectId, res: 'User', required: true },
},
    {
        timestamps: { createdAt: 'created_at' }
    })

module.exports = model('Comments', scheme)