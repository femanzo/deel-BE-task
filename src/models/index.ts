import type { Sequelize } from 'sequelize'

import contractInit from './Contract'
import jobInit from './Job'
import profileInit from './Profile'

export const initModels = (sequelize: Sequelize) => {
  /**
   * Execute models initializers
   */
  contractInit(sequelize)
  jobInit(sequelize)
  profileInit(sequelize)

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
