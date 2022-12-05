const express = require('express')
const auth = require('../middleware/auth.middleware')
const Comments = require('../models/CommentsModel')
const router = express.Router({ mergeParams: true })

router
    .route('/')
    .get(auth, async (req, res) => {
        try {
            const { orderBy, equalTo } = req.query
            const list = await Comments.find({ [orderBy]: equalTo })
            res.send(list)
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже.'
            })
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newComment = await Comments.create({
                ...req.body,
                userId: req.user._id
            })
            res.status(201).send(newComment)
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже.'
            })
        }
    })

router.delete('/:commentId', auth, async (req, res) => {
    try {
        const { commentId } = req.params
        // const removedComment = await Comments.find({ _id: commentId })
        const removedComment = await Comments.findById(commentId)
        if (removedComment.userId.toString() === req.user._id) {
            await removedComment.remove()
            return res.send(null)
        } else {
            res.status(401).json({ message: 'Unauthorized' })
        }
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

module.exports = router