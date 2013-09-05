define('base', ['router'], function(require, exports, module) {
    var BASE = Base.extend({
        /**
         * var {object} _self ����ʵ������
         */
        _self: null,

        /**
         * datagrid�б�
         *
         * @author          mrmsl <msl-138@163.com>
         * @date            2013-09-05 14:37:16
         *
         * return {void} �޷���ֵ
         */
        _datagrid: function(defaults, callback) {
            var tabs        = require('tabs'),
                selectedTab = tabs.getSelected(),
                grid        = tabs.get('_el').find('#grid-' + C + A);

            TREE_DATA._prevQueryParams = _.clone(TREE_DATA.queryParams);

            var page        = intval(Q2O.page || 1),
                pagesize    = {
                pageNumber: page,
                pageSize: Q2O.page_size || 20
            };

            $.extend(TREE_DATA.queryParams, defaults);

            if (global('FIRST_LOAD')) {
                $.extend(this._datagridOptions, pagesize);
                $.extend(this._datagridOptions.queryParams, TREE_DATA.queryParams);
                grid.data('data-options', this._datagridOptions);
                this._setToolbar(selectedTab);
                grid.datagrid();

                grid.datagrid('getPager').pagination({
                    onSelectPage: function(page, pageSize) {
                        $.extend(grid.datagrid('options'), {
                            pageNumber: page
                        });
                        $.extend(grid.datagrid('getPager').pagination('options'), {
                            pageNumber: page
                        });

                        $.extend(TREE_DATA.queryParams, {
                            page: page
                        });

                        require('router').navigate(object2querystring(TREE_DATA.queryParams));
                        grid.datagrid('reload');
                    },
                    showPageList: false
                });
            }
            else if(object2querystring(TREE_DATA._prevQueryParams) != object2querystring(TREE_DATA.queryParams)) {
                log('prev', TREE_DATA._prevQueryParams, TREE_DATA.queryParams);
                $.extend(grid.datagrid('options'), pagesize);
                $.extend(grid.datagrid('options').queryParams, TREE_DATA.queryParams);
                $.extend(grid.datagrid('getPager').pagination('options'), pagesize);
                grid.datagrid('getPager').pagination('select', pagesize.pageNumber);
            }

            callback && callback();
        },//end _datagrid

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