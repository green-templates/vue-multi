;
!((window) => {
    var root = document.documentElement;
    var tool = {
        /**
         * 选择器
         * @param {String} selector css 选择器
         * @param {Object | String} context DOM | css 选择器
         * tool.$$('.test', tool.$$('#app'))
         * tool.$$('.test', '#app')
         */
        $$(selector, context) {
            context = context || document;
            context = tcheck.isString(context) ? this.$$(context)[0] : context;

            var element = context.querySelectorAll(selector);
            return Array.prototype.slice.call(element);
        },
        /**
         * 检测属性
         * @param {String} property css 属性
         * tool.testProperty('filter')
         */
        testProperty(property) {
            if (property in root.style) {
                root.classList.add(property.toLowerCase());
                return true;
            }
            root.classList.add('no-' + property.toLowerCase());
            return false;
        },
        /**
         * 检测属性值
         * @param {String} id 标识
         * @param {String} value 值
         * @param {String} property 属性
         * tool.testValue('blur', 'blur(10px)', 'filter')
         */
        testValue(id, value, property) {
            var dummy = document.createElement('p');
            dummy.style[property] = value;

            if (dummy.style[property]) {
                root.classList.add(id);
                return true;
            }
            root.classList.add('no-' + id);
            return false;
        },
        /**
         * 合并
         * tool.merge(obj1, obj2, ...)
         * tool.merge(true, obj1, obj2, ...)
         */
        merge(obj1, obj2) {
            var _this = this

            var arr = obj1 === true ? Array.prototype.slice.call(arguments, 1) : Array.prototype.slice.call(arguments);

            var obj = {};
            var i = 0;
            var len = arr.length;

            if (obj1 !== true) {
                obj = arr[0];
                i++;
            }

            for (; i < len; i++) {
                var el = arr[i];
                loop(obj, el)
            }

            function loop(obj, el) {
                for (var k in el) {
                    if (typeof el[k] === 'object') {
                        // !{} | ![]
                        if (!tcheck.isArrObj(el[k]) || (obj1 !== true && !tcheck.isArrObj(obj[k]))) {
                            obj[k] = el[k]

                        } else {
                            // Array | Object
                            // 深拷贝
                            if (obj1 === true && !tcheck.isArrObj(obj[k])) {
                                obj[k] = tcheck.isArray(el[k]) ? [] : {};
                            }

                            // 浅拷贝
                            loop(obj[k], el[k])
                        }
                        continue
                    }
                    obj[k] = el[k];
                }
            }

            return obj;
        }
    }

    window.tool = tool;
})(window)
