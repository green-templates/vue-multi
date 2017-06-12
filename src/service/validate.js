/**
 * validate 验证
 * this.$validate(vForm)
 * @param {Object | Array} vForm
 * @return {Bool}
 * vForm: {
 *  test: {
 *   model: '',
 *   err: '',
 *   rule: ''
 *  }
 * }
 */
var validate = {
    rules: {

        /**
         * 验证是否为空
         */
        required: function(i) {

            return i && i.replace(/\s/g, '') !== '';
        },

        /**
         * 当值不为空时验证
         *
         */
        sometimes: function(i) {

            return true;
        },

        /**
         * 验证姓名不能有数字
         */
        name(i) {
            var reg_name = new RegExp('^[^\\d]+$')
            return reg_name.test(i)
        },

        /**
         * 验证手机号码
         */
        mobile: function(i) {

            // 截取字符串中所有的空格
            // i = i.replace(/\s+/g,"");

            var reg_phone = new RegExp('^1[34578]\\d{9}$');

            return reg_phone.test(i);
        },
        /**
         * 验证电话号码（包括座机和手机）
         */
        tel: function(i) {

            var reg_tel = new RegExp('(^(0[0-9]{2,3}\\-?)?([2-9][0-9]{6,7})+(\\-?[0-9]{1,4})?$)|(^((\\(\\d{3}\\))|(\\d{3}\\-?))?(1[34578]\\d{9})$)');

            return reg_tel.test(i) && !/\-400/.test(i);
        },



        /**
         * 验证字符串不包含数字
         */
        no_number: function(i) {

            var reg_no_number = new RegExp('\\d+');

            return !reg_no_number.test(i);
        },

        /**
         * 验证身份证号
         */
        id_card: function(i) {

            var reg_id_card = new RegExp('^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$|^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}(\\d|x|X)$')

            return reg_id_card.test(i);
        },
        /**
         * 验证日期（年月） 2016-08
         */
        date: function(i) {

            var reg_date = new RegExp('^[1-9]\\d{3}-((0?[1-9])|(1[0-2]))$');

            return reg_date.test(i);
        },
        /**
         * 验证金额
         */
        money: function(i) {

            var reg_money = new RegExp('^[1-9]\\d*.\\d*$');

            return reg_money.test(i);
        },
        /**
         * 银行卡验证，最大 19 位数字
         */
        bankcard: function(i) {

            var reg = new RegExp('^\\d{14,19}$');

            return reg.test(i);
        },

        /**
         * 密码强度检查（6-16位数字或字母）
         */
        password(i) {
            var reg = new RegExp('^[0-9a-zA-Z]{6,16}$')
            return reg.test(i)
        },
        /**
         * 长度限制
         * rule="len5" message="len:请填写详细地址，不少于5个字"
         */
        len: function(i, len) {
            return this.required(i) && i.length >= len;
        }
    },
    check(vForm) {
        this.pass = false

        for (var k in vForm) {
            if (tcheck.isArray(vForm)) {
                var pass = this.check(vForm[k])

                if (pass) {
                    continue
                } else {
                    break
                }
            }

            if (vForm[k].hasOwnProperty('rule') && tcheck.isString(vForm[k].rule)) {
                var obj = vForm[k]
                var pass = false

                if (obj.rule.indexOf('len') > -1) {
                    var len = obj.rule.substr(3)
                    pass = this.rules['len'](obj.model, len)
                } else {
                    pass = this.rules[obj.rule](obj.model)
                }

                if (!pass) {
                    layer.tip(obj.err)
                    // console.log(obj.err)
                    // console.log(this.pass)
                    return this.pass = false
                }

                this.pass = true
            }
        }
        // console.log(this.pass)
        return this.pass
    },
    install(Vue, vForm) {
        Vue.prototype.$validate = (vForm) => {
            return this.check(vForm)
        }
    }
}

export default validate
