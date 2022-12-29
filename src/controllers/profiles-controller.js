const depositFundsRequest = async (req, res, next) => {
  const { userId } = req.params
  const { amount } = req.body

  if (!userId || !amount) {
    const invalidParamsError = new Error('Invalid parameters')
    invalidParamsError.statusCode = 400
    return next(invalidParamsError)
  }

  try {
    const result = await depositFunds(userId, amount)
    return res.json(result)
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  depositFundsRequest,
}
