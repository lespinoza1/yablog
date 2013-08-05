define('base', ['router'], function(require, exports, module) {
    var BASE = Base.extend({
        /**
         * var {object} _self ����ʵ������
         */
        _self: null,

        /**
         * ���캯��
         *
         * @author      mrmsl <msl-138@163.com>
         * @date        2013-08-01 15:37:08
         *
         * return {void} �޷���ֵ
         */
        constructor: function() {
            this._self = this;
        },

        /**
         * ��ȡָ������
         *
         * @author      mrmsl <msl-138@163.com>
         * @date        2013-08-01 15:40:33
         *
         * param {string} name ��������
         *
         * return {mixed} ����ֵ
         */
        get: function(name) {
            return this[name];
        },

        /**
         * ��ȡ����������
         *
         * @author      mrmsl <msl-138@163.com>
         * @date        2013-08-01 15:37:53
         *
         * return {string} ����������
         */
        getControllerName: function () {
            return this._controllerName;
        },

        /**
         * ����ָ������
         *
         * @author      mrmsl <msl-138@163.com>
         * @date        2013-08-01 15:40:33
         *
         * param {string} name ��������
         * param {mixed} value ����ֵ
         *
         * return {object} this
         */
        set: function(name, value) {
            return this[name] = value;
        }
    });

    module.exports = BASE;
});