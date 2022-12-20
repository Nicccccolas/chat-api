const messageControllers = require('./messages.controllers')

const getAllMessages = (req, res) => {
  const conversationId = req.params.conversation_id
  messageControllers.findAllMessages(conversationId)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}


const postMessage = (req, res) => {
  const userId = req.user.id
  const conversationId = req.params.conversation_id
  const { message } = req.body

  messageControllers.createMessage({ userId, conversationId, message })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(400).json({
        message: err.message, fields: {
          message: 'text'
        }
      })
    })
}

const getMessageById = (req, res) => {
  // const userId = req.user.id
  const id = req.params.message_id

  messageControllers.findMessageById(id)
    .then((data) => {
      if(data){
        res.status(200).json(data)
      } else {
        res.status(404).json({message: 'Invalid ID' + id})
      }
    })
    .catch(err => {
      res.status(400).json({message:err.message})
    })
}

const deleteMessage = (req, res) => {
  const id = req.params.message_id
  messageControllers.removeMessage(id)
    .then((data) => {
      if(data){
        res.status(200).json()
      }else {
        res.status(401).json({message: 'Invalid ID'})
      }
    })
    .catch(err => {
      res.status(400).json({message: err.message})
    })
}

module.exports = {
  getAllMessages,
  postMessage,
  getMessageById,
  deleteMessage
}