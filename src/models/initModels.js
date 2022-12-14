const Users = require('./users.models')
const RecoveryPasswords = require('./recoveryPasswords.models')
const Conversations = require('./conversations.models')
const Messages = require('./messages.models')
const Participants = require('./participants.models.js')



const initModels = () => {
    //? FK = RecoveryPasswords
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)

    //? Un usuario tiene muchos mensajes
    Users.hasMany(Messages)
    //? Un mensaje pertenece a un usuario
    Messages.belongsTo(Users)

    //? Users 
    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)

    //? Un usuario tiene muchas participaciones en conversaciones
    Users.hasMany(Participants)
    Participants.belongsTo(Users) //? Participants es tabla pivote entre users y conversations

    //? Conversations - Messages
    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)

    //? Conversations - Participants
    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations) //? Tabla pivote entre usuarios y conversaciones
}

module.exports = initModels