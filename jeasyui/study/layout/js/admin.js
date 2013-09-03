define('admin', ['fields'], function(require, exports, module) {
    var Base    = require('base');
    var Admin   = Base.extend({
        _datagridOptions: {
            columns: [[
                {checkbox: true},
                {title: 'id', field: 'blog_id', width: 50},
                {title: '标题', field: 'title', width: 200},
                {title: '点击', field: 'hits', width: 50, fixed: true}
            ]],
            queryParams: {},
            toolbar: '#tb-adminlist',
            url: 'get_blogs.php',
            striped: true,
            fitColumns: true,
            pagination: true,
            fit: true,
            sortName: 'blog_id',
            sortOrder: 'desc',
            showFooter: true,
            loadFilter: function(data) {
                return {
                    rows: data.data,
                    total: data.total
                };
            },
            selectOnCheck: true,
            checkOnSelect: false,
            onSelect: function(index) {
                var tr = $(this).datagrid('options').finder.getTr(this, index);

                if (!tr.find('div.datagrid-cell-check input[type=checkbox]').prop('checked')) {
                    tr.removeClass('datagrid-row-selected');
                }
            },
            onUnselect: function(index) {
                var tr = $(this).datagrid('options').finder.getTr(this, index);

                if (tr.find('div.datagrid-cell-check input[type=checkbox]').prop('checked')) {
                    tr.addClass('datagrid-row-selected');
                }
            },
            checkbox: true
        },

        /**
         * 列表datagrid
         *
         * @author          mrmsl <msl-138@163.com>
         * @date            2013-08-01 17:03:31
         *
         * return {void} 无返回值
         */
        _datagrid: function() {
            var tabs        = require('tabs'),
                selectedTab = tabs.getSelected(),
                grid        = tabs.get('_el').find('#grid-' + C + A);

            TREE_DATA._prevQueryParams = _.clone(TREE_DATA.queryParams);

            var pagesize = {
                pageNumber: intval(Q2O.page || 1),
                pageSize: Q2O.page_size || 20
            };

            TREE_DATA.queryParams = Q2O;

            //if (!grid.length) {
                $.extend(this._datagridOptions, pagesize);
                $.extend(this._datagridOptions.queryParams, Q2O);
            //}
            /*else {
                $.extend(grid.datagrid('options'), pagesize);
                $.extend(grid.datagrid('options').queryParams, Q2O);
            }*/

            if (global('FIRST_LOAD')) {
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
                        require('router').navigate('' + MENU_ID + '&' + object2querystring(TREE_DATA.queryParams));
                        grid.datagrid('reload');
                    },
                    onChangePageSize: log,
                    showPageList: false
                });
            }
            else if(object2querystring(TREE_DATA._prevQueryParams) != object2querystring(TREE_DATA.queryParams)) {
                $.extend(grid.datagrid('options'), pagesize);
                $.extend(grid.datagrid('options').queryParams, TREE_DATA.queryParams);
                $.extend(grid.datagrid('getPager').pagination('options'), pagesize);
                grid.datagrid('getPager').pagination('select', pagesize.pageNumber);
                //grid.datagrid('reload');log(grid.datagrid('getPager').pagination('options'))
            }

            Q2O.keyword && selectedTab.find('#tb-' + C + A).find('#admin-keyword').searchbox('setValue', Q2O.keyword);
            selectedTab.find('#tb-' + C + A)
            .find('#admin-start_date')
                .datetimebox('setValue', Q2O.start_date)
            .end()
            .find('#admin-end_date')
                .datetimebox('setValue', Q2O.end_date)
            .end()
            .find('#admin-match_mode')
                .combobox('setValue', Q2O.match_mode || 'eq')
            .find('#admin-cate_id')
                //.combobox('setValue', 3);
        },

        /**
         * toolbar
         *
         * @author          mrmsl <msl-138@163.com>
         * @date            2013-08-04 17:18:31
         *
         * return {void} 无返回值
         */
        _setToolbar: function(selectedTab) {
            selectedTab
            .find('#admin-keyword')
                .data('data-options', {
                    prompt: '关键字',
                    searcher: function(keyword) {
                        $.extend(TREE_DATA.queryParams, {
                            keyword: keyword,
                            start_date: selectedTab.find('#admin-start_date').datetimebox('getValue'),
                            end_date: selectedTab.find('#admin-end_date').datetimebox('getValue'),
                            match_mode: selectedTab.find('#admin-match_mode').combobox('getValue'),
                            cate_id: selectedTab.find('#admin-cate_id').combobox('getValue')
                        });
                        var grid = selectedTab.find('#grid-' + C + A);
                        $.extend(grid.datagrid('options').queryParams, TREE_DATA.queryParams);
                        grid.datagrid('getPager').pagination('select', 1);
                    }
                }).searchbox()
            .end()
            .find('.datetime')
                .data('data-options', {
                    width: 140,
                    formatter: function(d) {
                        return date(null, d);
                    }
                })
                .datetimebox()
            .end()
            .find('#admin-match_mode')
                .data('data-options', require('fields').matchMode)
                .combobox()
            .end()
            .find('#admin-cate_id')
                .data('data-options', {
                    url: 'categories.php',
                    valueField: 'cate_id',
                    textField: 'cate_name',
                    onLoadSuccess: function(data) {

                        if (data && data.length) {
                            $(this).combobox('setValue', Q2O.cate_id || 0);
                        }
                    }
                })
                .combobox()
            .end()
            .find('#mm')
                .data('data-options', {
                    onClick: function() {
                        log(selectedTab.find('#grid-' + C + A).datagrid('getChecked'));
                    }
                })
            .end()
            .find('#admin-operate')
                .menubutton();
        },

        /**
         * 构造函数
         *
         * @author          mrmsl <msl-138@163.com>
         * @date            2013-08-01 15:23:08
         *
         * return {void} 无返回值
         */
        constructor: function() {
            this.base();
        },

        /**
         * 添加
         *
         * @author          mrmsl <msl-138@163.com>
         * @date            2013-08-01 17:01:26
         *
         * return {void} 无返回值
         */
        addAction: function() {
            var tabs        = require('tabs'),
                selectedTab = tabs.getSelected(),
                form         = tabs.get('_el').find('#' + C + A);

            if (global('FIRST_LOAD')) {
                form.form({
                    onLoadError: function() {
                        log('error', arguments);
                    },
                    url: 'form.php',
                    success: function() {
                        log('success', arguments);
                    }
                }).find('.validatebox').validatebox();
            }
            else {
                //cc.combobox('setValue', 'like');
            }
        },

        /**
         * 修改密码
         *
         * @author          mrmsl <msl-138@163.com>
         * @date            2013-08-01 17:01:56
         *
         * return {void} 无返回值
         */
        changePasswordAction: function() {log(C + A);return;
            this._setActivePanel();
            var tabs = require('tabs');
            var grid = tabs.get('_el').find('#adminchangePassword');

            if (!grid.length) {
                $('<div id="adminchangePassword">changePassword</div>')
                .appendTo(tabs.getSelected())
            }
            else {
                //log(grid.datagrid('reload'));
            }
        },

        /**
         * 列表
         *
         * @author          mrmsl <msl-138@163.com>
         * @date            2013-08-01 16:50:26
         *
         * return {void} 无返回值
         */
        listAction: function() {
            this._datagrid();
        }
    });

    var admin = new Admin();
    module.exports = admin;
});