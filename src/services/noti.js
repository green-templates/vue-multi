import iziToast from 'izitoast'
import * as utils from './utils'
import 'izitoast/dist/css/iziToast.min.css'

const defaultOptions = {
  position: 'topRight',
  timeout: 3000
}

const noti = {
  info (options) {
    iziToast.info(utils.merge(defaultOptions, options))
  },
  success (options) {
    iziToast.success(utils.merge(defaultOptions, options))
  },
  error (options) {
    iziToast.error(utils.merge(defaultOptions, options))
  },
  warning (options) {
    iziToast.warning(utils.merge(defaultOptions, options))
  }
}

export default noti
