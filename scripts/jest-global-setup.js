const { seed } = require('./seed-db')

module.exports = async () => {
  console.log('\nseed db before tests')
  await seed()
}
