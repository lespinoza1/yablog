define('tree', ['base'], function(require, exports, module) {
    var Base    = require('base');
    var Tree    = Base.extend({
        /**
         * var {object} [_el=null] ��ǩ��jquery����
         */
        _el: null,

        /**
         * var {object} [_treeData={}] �˵��ڵ�����
         */
        _treeData: {},

        /**
         * �̳�$.fn.tree.methods
         *
         * @author          mrmsl <msl-138@163.com>
         * @date            2013-08-01 15:06:08
         *
         * return {void} �޷���ֵ
         */
        _extendMethods: function() {
            var me = this;

            $.extend($.fn.tree.methods, {
                /**
                 * ���ݿ����������������������ڵ���Ϣ
                 *
                 * @author          mrmsl <msl-138@163.com>
                 * @date            2013-09-02 16:26:34
                 *
                 * @param {object} jq jquery����
                 * @param {object} controllerAction {controller: controller, action: action}
                 *
                 * return {mixed} ����ڵ���ڣ����ؽڵ���Ϣ������null
                 */
                findByControllerAction: function(jq, controllerAction) {
                    var node = null;

                    $.each(me._treeData, function(index, item) {

                        if (item.controller == controllerAction.controller && item.action == controllerAction.action) {
                            node = item;
                            return false;
                        }
                    });

                    return node;
                }
            });
        },

        /**
         * ����¼�
         *
         * @author      mrmsl <msl-138@163.com>
         * @date        2013-08-01 17:06:45
         *
         * return {void} �޷���ֵ
         */
        _onClick: function(v) {
            global('clickMenu', true);

            var target  = v.target,
                isLeaf  = this._el.tree('isLeaf', target);

            if (isLeaf) {
                var id          = v.id,
                    data        = this._treeData[id],
                    queryParams = object2querystring(data.queryParams),
                    router      = require('router');

                router.navigate(queryParams ? queryParams : 'controller={controller}&action={action}'.format(data));
                router.router(data.controller, data.action);
            }
            else {
                this._el.tree('toggle', target);
            }

            global('clickMenu', false);
        },

        /**
         * ����
         *
         * @author      mrmsl <msl-138@163.com>
         * @date        2013-08-01 15:21:41
         *
         * return {void} �޷���ֵ
         */
        bootstrap: function() {
            var me = this;

            this._extendMethods();

            $('#tree-panel').append('<ul id="tree"></ul>');
            this._el = $('#tree');
            this._el.addClass('easyui-tree')
            .data('data-options', {
                url: '../get_tree.php',
                lines: false,
                onClick: function(v) {
                    me._onClick(v);
                },
                formatter: function(node) {
                    node.queryParams = {};
                    me._treeData[node.menu_id] = node;
                    return node.menu_name;
                },
                onLoadSuccess: function() {
                    require('router').notifyTreeLoaded();
                }
            }).tree();
        },

        /**
         * ���캯��
         *
         * @author      mrmsl <msl-138@163.com>
         * @date        2013-08-01 15:23:08
         *
         * return {void} �޷���ֵ
         */
        constructor: function() {
            this.base();
        },

        /**
         *
         *
         * @author      mrmsl <msl-138@163.com>
         * @date        2013-08-01 17:07:10
         *
         * return {function} $.fn.tree
         */
        getSelected: function() {
            return this._el.tree('getSelected');
        }
    });

    var tree = new Tree();

    tree.bootstrap();

    module.exports = tree;
});