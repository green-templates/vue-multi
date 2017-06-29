import rem from '../../../service/rem'
rem()

import '../../../service/tcheck'
import '../../../service/tool'
import '../../../service/storage'

import '../../../service/title'

import '../../../service/layer'
import InitAjax from '../../../service/ajax/InitAjax'

import validate from '../../../service/validate'
Vue.use(validate)

window.ajax = new InitAjax()
