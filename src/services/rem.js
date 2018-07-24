/**
 * rem 适配
 * 参考 hostcss https://github.com/imochen/hotcss
 */
const docEl = document.documentElement

const baseFont = 100 // 默认字体大小
const baseWidth = 320 // 默认屏幕宽度 iphone5
// const maxWidth = 540 // 最大屏幕宽度
let limit = 1

const rem = {
  designWidth: 750,
  /**
   * px to rem
   * @param {Number} designWidth 设计稿宽度 默认 750, 可通过 rem.designWidth 修改
   * rem.px2rem(30)
   */
  px2rem (px, designWidth) {
    designWidth = designWidth || this.designWidth
    return px * baseWidth / designWidth / baseFont
  },
  /**
   * init
   * @param {Boolean} canScale 是否启用 initial-scale  当第三方样式文件不支持时
   */
  init (canScale = true) {
    function setHtmlFont () {
      const dpr = canScale ? window.devicePixelRatio : 1

      // 部分 Android 需要开启 settings.setUseWideViewPort(true)
      const scale = 1 / dpr

      let viewportEl = docEl.querySelector('[name="viewport"]')
      const content =
        'width=device-width,initial-scale=' +
        scale +
        ', minimum-scale=' +
        scale +
        ', maximum-scale=' +
        scale +
        ', user-scalable=no'

      if (viewportEl) {
        viewportEl.setAttribute('content', content)
      } else {
        viewportEl = document.createElement('meta')
        viewportEl.setAttribute('name', 'viewport')
        viewportEl.setAttribute('content', content)
        document.head.appendChild(viewportEl)
      }

      let clientWidth = docEl.getBoundingClientRect().width || docEl.clientWidth

      // 设置最大宽度
      // if (clientWidth / dpr > maxWidth) {
      // clientWidth = maxWidth * dpr
      // }

      // if (clientWidth > dpr * 375) limit = 0.9

      docEl.style.fontSize = clientWidth / baseWidth * baseFont * limit + 'px'
    }

    setHtmlFont()
    window.addEventListener('resize', setHtmlFont, false)
    window.addEventListener('load', setHtmlFont, false)
    document.addEventListener('DOMContentLoaded', setHtmlFont, false)
  }
}

export default rem
