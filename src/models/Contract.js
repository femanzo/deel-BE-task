const Sequelize = require('sequelize')

class Contract extends Sequelize.Model {}

module.exports = (sequelize) =>
  Contract.init(
    {
      terms: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('new', 'in_progress', 'terminated'),
      },
    },
    {
      scopes: {
        active: {
          where: {
            status: 'in_progress',
          },
        },
      },
      sequelize,
      modelName: 'Contract',
    }
  )
