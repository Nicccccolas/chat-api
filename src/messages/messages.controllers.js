const Messages = require('../models/messages.models')
const Conversation = require('../models/conversations.models')
const Users = require('../models/users.models')
const uuid = require('uuid')
const Participants = require('../models/participants.models')

const findAllMessages = async (conversationId) => {
  const data = await Messages.findAll({
    include: {
      model: Conversation,
      include: {
        model: Participants,
        include: {
          model: Users
        }
      }
    },
    where: {
      conversationId: conversationId
    }
  })
  return data
}

const findMessageById = async(id) => {
  const data = await Messages.findOne({
    where: {
      id: id
    },
    include: {
      model: Conversation,
      include:{
        model: Participants,
        include: {
          model: Users
        }
      }
    }
  })
  return data
}

const createMessage = async (obj) => {
  const data = await Messages.create({
    id: uuid.v4(),
    userId: obj.userId,
    conversationId: obj.conversationId,
    message: obj.message
  })
  return data
}

const removeMessage = async(id) => {
  const data = await Messages.destroy({
    where: {
      id: id
    }
  })
  return data
}
module.exports = {
  findAllMessages,
  findMessageById,
  createMessage, 
  removeMessage
}
