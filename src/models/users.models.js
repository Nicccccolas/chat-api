const {DataTypes} = require('sequelize')

const db = require('../utils/database')

const Users = db.define('users' ,{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50] //? Longitud mínima, longitud máxima
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len : [2, 50]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true //?Validacion si es correo
        },
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
    },
    birthday: {
        type: DataTypes.DATEONLY, //? formato fecha
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'normal' //? No da valor nulo, pero sí 'normal' por defecto
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false //?Inicia en fasle, porque no está verificado (por correo)
    }
})

module.exports = Users