const Sequelize = require('sequelize')

const { initModels } = require('./models')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
})

initModels(sequelize)

module.exports = { sequelize }
