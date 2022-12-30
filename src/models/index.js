const initModels = (sequelize) => {
  /**
   * Execute models initializers
   */
  require('./Contract')(sequelize)
  require('./Job')(sequelize)
  require('./Profile')(sequelize)

  /**
   * Relationships definition
   */
  const { Profile, Contract, Job } = sequelize.models
  Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' })
  Contract.belongsTo(Profile, { as: 'Contractor' })
  Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' })
  Contract.belongsTo(Profile, { as: 'Client' })
  Contract.hasMany(Job)
  Job.belongsTo(Contract)
}

module.exports = {
  initModels,
}
