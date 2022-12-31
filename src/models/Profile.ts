import { type Sequelize, Model, STRING, DECIMAL, ENUM } from 'sequelize'

class Profile extends Model {}

export default (sequelize: Sequelize) =>
  Profile.init(
    {
      firstName: {
        type: STRING,
        allowNull: false,
      },
      lastName: {
        type: STRING,
        allowNull: false,
      },
      profession: {
        type: STRING,
        allowNull: false,
      },
      balance: {
        type: DECIMAL(12, 2),
      },
      type: {
        type: ENUM('client', 'contractor'),
      },
    },
    {
      sequelize,
      modelName: 'Profile',
    }
  )
