/**
 * @classdesc Represents an PolicyManager. (You most likely shouldn't be accessing this directly, use {@link AcrosureClient#policy} instead.)
 * @class
 */
class PolicyManager {
  /**
   * @description Create an policy manager.
   * @constructor
   * @param {Object} args - An object consists of several properties.
   *   @param {function} args.callAPI - A function which call Acrosure API.
   */
  constructor(args) {
    /**
     * @member {function}
     * @description callAPI Function (which should be granted by {@link AcrosureClient#callAPI} )
     */
    this.callAPI = args.callAPI
  }

  /**
   * @function
   * @description Get policy with the specify id.
   * @param {string} id - Policy id.
   * @returns {Object} Policy
   */
  async get(id) {
    try {
      if (id) this.id = id
      const resp = await this.callAPI('/policies/get', {
        policy_id: this.id
      })
      return resp
    } catch (err) {
      throw err
    }
  }
}

export default PolicyManager