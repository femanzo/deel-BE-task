import { Sequelize, Model, Op, ENUM, TEXT } from 'sequelize'

class Contract extends Model {}

export default (sequelize: Sequelize) =>
  Contract.init(
    {
      terms: {
        type: TEXT,
        allowNull: false,
      },
      status: {
        type: ENUM('new', 'in_progress', 'terminated'),
      },
    },
    {
      scopes: {
        pending: {
          where: { status: { [Op.not]: 'terminated' } },
        },
        active: {
          where: { status: 'in_progress' },
        },
      },
      sequelize,
      modelName: 'Contract',
    }
  )
