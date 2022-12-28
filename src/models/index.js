const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
})

const Contract = require('./Contract')(sequelize)
const Job = require('./Job')(sequelize)
const Profile = require('./Profile')(sequelize)

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' })
Contract.belongsTo(Profile, { as: 'Contractor' })
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' })
Contract.belongsTo(Profile, { as: 'Client' })
Contract.hasMany(Job)
Job.belongsTo(Contract)

module.exports = {
  sequelize,
  Contract,
  Job,
  Profile,
}
