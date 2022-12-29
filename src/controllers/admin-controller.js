const {
  adminServices: { getBestClients, getBestProfession },
} = require('../services')

const getBestClientsRequest = async (req, res, next) => {
  const { start, end, limit } = req.query

  const startDate = new Date(start)
  const endDate = new Date(end)

  try {
    const result = await getBestClients(startDate, endDate, limit)
    return res.json(result)
  } catch (err) {
    return next(err)
  }
}

const getBestProfessionRequest = async (req, res, next) => {
  const { start, end } = req.query

  const startDate = new Date(start)
  const endDate = new Date(end)

  try {
    const result = await getBestProfession(startDate, endDate)
    return res.json(result)
  } catch (err) {
    return next(err)
  }
}

/***********************
 * Internal functions
 ***********************/

module.exports = {
  getBestClientsRequest,
  getBestProfessionRequest,
}
