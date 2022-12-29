const { Sequelize, Op } = require('sequelize')

class Job extends Sequelize.Model {}

module.exports = (sequelize) =>
  Job.init(
    {
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      paid: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      paymentDate: {
        type: Sequelize.DATE,
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
