import Vue from 'vue'
import VueI18n from 'vue-i18n'
import * as utils from './utils'
import messages from '../pages/messages.json'

Vue.use(VueI18n)

const defaultLang = utils.getLang()

const i18n = new VueI18n({
  messages,
  locale: defaultLang,
  fallbackLocale: 'zh'
})

export {
  i18n,
  defaultLang
}
