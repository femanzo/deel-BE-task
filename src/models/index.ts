import { Job } from './Job'
import { Profile } from './Profile'
import { Contract } from './Contract'

export { Job, Profile, Contract }

// Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' })
// Contract.belongsTo(Profile, { as: 'Contractor' })
// Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' })
// Contract.belongsTo(Profile, { as: 'Client' })
// Contract.hasMany(Job)
// Job.belongsTo(Contract)
