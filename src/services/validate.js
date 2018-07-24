/** validate
 * @Author: Jack
 * @Date: 2018-01-20 21:52:35
 * @Last Modified by: Jack
 * @Last Modified time: 2018-05-10 23:37:11
 */
import * as tcheck from './tcheck'

/**
 * rules
 */
const regexp = {
  /**
   * validate length
   * @param {String} i string
   * @param {Number} min min-length
   * @param {Number} max max-length
   *
   * @returns {Boolean}
   */
  _len (i, min, max) {
    let pass = i.length >= min
    if (max) {
      pass = i.length >= min && i.length <= max
    }
    return pass
  }
}

/**
 * handle validate result
 */
function _handleResult ({
  obj,
  pass,
  key
}, callback) {
  tcheck.isFunction(callback) && callback(obj.err, { pass, key })
}

// global pass
let vFormPass = true

/**
 * validate
 * @param {Object|Array} vForm validate object
 * @param {String} vForm.model validate model
 * @param {String} vForm.err validate error
 * @param {String} vForm.rule validate rule
 * @param {Boolean} vForm.ignore ignore
 *
 * @param {Function} callback validate callback
 *
 * @returns {Boolean}
 */
function check (vForm, callback) {
  vFormPass = true

  // validate array
  if (tcheck.isArray(vForm)) {
    for (const k in vForm) {
      // validate each vForm in array
      vFormPass = check(vForm[k])
      // console.log(vFormPass, `array: ${k}`)

      if (vFormPass) {
        continue
      } else {
        break
      }
    }
  }

  // validate each object in vForm
  for (const k in vForm) {
    if (vForm[k].hasOwnProperty('rule') && tcheck.isString(vForm[k].rule) && vForm[k].ignore !== true) {
      const obj = vForm[k]
      const objRule = obj.rule

      let objPass = false
      let rules = [objRule]

      if (objRule.indexOf('|') > -1) {
        rules = objRule.split('|')
      }

      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i]

        // validate length
        if (/^len\d+(-\d+)?/.test(rule)) {
          const len = rule.substr(3)
          let min = len
          let max
          if (len.indexOf('-') > -1) {
            min = len.split('-')[0]
            max = len.split('-')[1]
          }
          objPass = this.regexp['_len'](obj.model, min, max)
        } else {
          if (!tcheck.isFunction(this.regexp[rule])) {
            throw new Error(`validate rule [${rule}] is not a function`)
          }
          objPass = this.regexp[rule](obj.model)
        }
        // console.log(objPass, `reg: ${rule}`)

        _handleResult({
          obj,
          pass: objPass,
          key: k
        }, callback)

        if (!objPass) {
          // console.log(objPass, `err: ${rule}`)

          // validate one by one
          if (tcheck.isFunction(this.handleError)) {
            this.handleError(obj.err)
            return objPass
          }

          vFormPass = false
        }
      }
    }
  }
  // console.log(vFormPass, 'all')
  return vFormPass
}

export default {
  check,
  // validate rules
  regexp,
  // global error handle
  handleError: null,
  setConfig (config) {
    // add custom rules
    for (const k in config.rules) {
      const rule = config.rules[k]
      if (!tcheck.isFunction(rule)) {
        throw new Error(`validate rule [${rule}] is not a function`)
      }
      this.regexp[k] = rule
    }

    if (tcheck.isFunction(config.handleError)) {
      this.handleError = config.handleError
    }
  },
  // install Vue plugin
  install (Vue, vForm) {
    /**
     * validate
     * @param {Onject} vForm form object
     * @param {Function} callback callback
     */
    Vue.prototype.$validate = (vForm, callback) => {
      return check.call(this, vForm, callback)
    }
  }
}
