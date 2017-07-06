/**
 * 设置网页标题
 * e.g. iOS title 不修改
 */
;
!((window) => {
    var title = (title) => {

        window.document.title = title;

        setTimeout(function() {

            var iframe = document.createElement('iframe');

            iframe.style.visibility = 'hidden';
            iframe.style.width = '1px';
            iframe.style.height = '1px';
            iframe.src = '/favicon.ico';

            iframe.onload = function() {

                setTimeout(function() {
                    document.body.removeChild(iframe);
                }, 0);

            };

            document.body.appendChild(iframe);

        }, 0);

    }

    window.title = title;
})(window)
