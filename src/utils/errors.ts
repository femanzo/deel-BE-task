export class ApiError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

/**
 * This function will throw an error if the model does not exist
 * @param {any} record object to check if it exists
 * @param {string} name to use in the error message
 * @param {number | string} id to use in the error message
 */
export const assertRecordFound = (record: any, name: string, id: number) => {
  if (!record) {
    throw new ApiError(`${name} #${id} not found`, 404)
  }
}
