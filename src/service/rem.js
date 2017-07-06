/**
 * rem 适配
 * @param {Boolean} canScale    是否启用 initial-scale  当第三方样式文件不支持时
 * e.g.
 * import rem from './rem.js'
 * rem()
 *
 * 参考 hostcss https://github.com/imochen/hotcss
 */

export default (canScale) => {

    var docEl = document.documentElement;

    // 默认字体大小
    var base_font = 100;
    // 默认屏幕宽度 iphone5
    var base_width = 320;
    // 最大屏幕宽度
    var max_width = 540;

    var rem = {};

    /**
     * px to rem
     * @param {Number} design_width 设计稿宽度 默认 640, 可通过 rem.design_width 修改
     * rem.px2rem(30)
     */
    rem.px2rem = (px, design_width) => {
        design_width = design_width || rem.design_width || 750;
        return px * base_width / base_font / design_width;
    }

    // 动态修改 html 字体
    rem.setHtmlFont = () => {
        var dpr = window.devicePixelRatio || 1;

        if (canScale !== false) {
            var scale = 1 / dpr;

            var viewportEl = docEl.querySelector('[name="viewport"]');
            var content = 'width=device-width,initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no';

            if (viewportEl) {
                viewportEl.setAttribute('content', content);
            } else {
                viewportEl = document.createElement('meta');
                viewportEl.setAttribute('name', 'viewport');
                viewportEl.setAttribute('content', content);
                document.head.appendChild(viewportEl);
            }
        }

        var client_width = docEl.getBoundingClientRect().width || docEl.clientWidth || window.innerWidth;
        if (client_width / dpr > max_width) {
            client_width = max_width * dpr / 1.5;
        }

        docEl.style.maxWidth = max_width * dpr + 'px'
        docEl.style.fontSize = client_width / base_width * base_font + 'px';
    }
    rem.setHtmlFont();
    window.addEventListener('resize', rem.setHtmlFont, false);
    window.addEventListener('load', rem.setHtmlFont, false);
    document.addEventListener('DOMContentLoaded', rem.setHtmlFont, false);

    window.rem = rem;
}
