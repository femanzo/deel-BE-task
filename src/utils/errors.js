/**
 * This function will throw an error if the model does not exist
 * @param {any} record object to check if it exists
 * @param {string} name to use in the error message
 * @param {number | string} id to use in the error message
 */
const assertRecordFound = (record, name, id) => {
  if (!record) {
    const modelNotFoundError = new Error(`${name} #${id} not found`)
    modelNotFoundError.statusCode = 404
    throw modelNotFoundError
  }
}

module.exports = {
  assertRecordFound,
}
