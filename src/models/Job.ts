import { type Sequelize, Model, Op, TEXT, BOOLEAN, DECIMAL, DATE } from 'sequelize'

class Job extends Model {}

export default (sequelize: Sequelize) =>
  Job.init(
    {
      description: {
        type: TEXT,
        allowNull: false,
      },
      price: {
        type: DECIMAL(12, 2),
        allowNull: false,
      },
      paid: {
        type: BOOLEAN,
        defaultValue: false,
      },
      paymentDate: {
        type: DATE,
      },
    },
    {
      scopes: {
        unpaid: {
          where: {
            paid: {
              [Op.or]: [false, null],
            },
          },
        },
        paid: {
          where: {
            paid: true,
          },
        },
      },
      sequelize,
      modelName: 'Job',
    }
  )
