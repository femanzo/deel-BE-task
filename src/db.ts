import { Sequelize } from 'sequelize'

import { initModels } from './models'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
})

initModels(sequelize)

export { sequelize }
