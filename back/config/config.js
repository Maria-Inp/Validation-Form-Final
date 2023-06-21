const path = require('path');
const env = require('dotenv');

env.config(path.join(__dirname, '..', '.env'))

const appPort = process.env.PORT
const mongoUser = process.env.MONGO_USER
const mongoPass = process.env.MONGO_PASS

module.exports = { appPort, mongoUser, mongoPass }