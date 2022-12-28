const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
})

const Contract = require('./Contract')(sequelize)
const Job = require('./Job')(sequelize)
const Profile = require('./Profile')(sequelize)

Contract.belongsTo(Profile, { as: 'client' })
Contract.belongsTo(Profile, { as: 'contractor' })
Contract.hasMany(Job, { as: 'jobs' })
Job.belongsTo(Contract, { as: 'contract' })
Profile.hasMany(Contract, { as: 'client', foreignKey: 'clientId' })
Profile.hasMany(Contract, { as: 'contractor', foreignKey: 'contractorId' })

module.exports = {
  sequelize,
  Contract,
  Job,
  Profile,
}
