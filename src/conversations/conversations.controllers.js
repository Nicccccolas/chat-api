const uuid = require('uuid')

const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')

const createConversation = async(obj) => {
    const newConversation =  await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        imgUrl: obj.imgUrl,
        userId: obj.ownerId //? Creador de la conversacion (owner)
    })
    const participant1 =  await Participants.create({
        id: uuid.v4(),
        userId: obj.ownerId, //? este es el owner que viene desde el token
        conversationId: newConversation.id
    })
    const participant2 =  await Participants.create({
        id: uuid.v4(),
        userId: obj.participantId, //? Este es el otro usuario que viene desde el body
        conversationId: newConversation.id
    })
    return {
        newConversation,
        participant1,
        participant2
    }
}

createConversation({
    title: 'Conversation Nico - Samu', //? titulo del chat
    ownerId: 'c765d9ea-3a53-43e4-b220-261eba0f803c',
    participantId: 'a4130120-f81f-4199-aa97-d9a383b08954' //?nicolas como owner y samu como invitado
})
.then(data => console.log(data))
.catch(err => console.log(err))

module.exports = createConversation