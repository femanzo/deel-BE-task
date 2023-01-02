import { Sequelize } from 'sequelize-typescript'

import { Profile } from './models/Profile'
import { Contract } from './models/Contract'
import { Job } from './models/Job'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
  models: [Profile, Contract, Job],
})
