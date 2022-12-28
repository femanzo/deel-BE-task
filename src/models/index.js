const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
})

const Contract = require('./Contract')(sequelize)
const Job = require('./Job')(sequelize)
const Profile = require('./Profile')(sequelize)

Contract.belongsTo(Profile, { as: 'Client' })
Contract.belongsTo(Profile, { as: 'Contractor' })
Contract.hasMany(Job)
Job.belongsTo(Contract)
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' })
Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' })

module.exports = {
  sequelize,
  Contract,
  Job,
  Profile,
}
