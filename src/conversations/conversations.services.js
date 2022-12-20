const conversationControllers = require('./conversations.controllers')

const getAllConversations = (req, res) => {
    conversationControllers.findAllConversations()
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postConversation = (req, res) => {
    const {title, imgUrl, participantId} = req.body
    const ownerId = req.user.id

    conversationControllers.createConversation({title, imgUrl, participantId, ownerId})
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message, fields: {
                title: 'string',
                imgUrl: 'https://imgurl.com/akjshd',
                participantId: 'UUID',
            }})
        })
}

const getConversationById = (req, res) => {

    const id = req.params.conversation_id
    conversationControllers.findConversationById(id)
        .then((data) => {
            if(data){
                res.status(200).json(data)
            }else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const patchConversation = (req, res) => {
    const id = req.params.conversation_id
    const {title, imgUrl} = req.body

    conversationControllers.updateConversation(id, {title, imgUrl})
        .then((data) => {
            if(data){
                res.status(200).json({message: `Conversation with id: ${id} update succesfully!`})
            } else {
                res.status(400).json({message: 'Invalid ID'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const deleteConversation = (req, res) => {
    
    const id = req.params.conversation_id
    conversationControllers.removeConversation(id)
        .then((data) => {
            if(data) {
                res.status(204).json()
            }else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}



module.exports = {
    getAllConversations,
    postConversation, 
    getConversationById,
    patchConversation,
    deleteConversation
}

