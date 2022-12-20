const Participants = require('../models/participants.models')
const Messages = require('../models/messages.models')

const findParticipantConversation = async(userId, conversationId) =>{
  const data = await Participants.findOne({
    where: {
      userId: userId,
      conversationId: conversationId
    },
    
  })
  return data
}

module.exports = {
  findParticipantConversation
}