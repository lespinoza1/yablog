/**
 * ligerui重写
 *
 * @file            ligerui.overrides.js
 * @version         0.2
 * @copyright       Copyright (c) 2013 {@link http://www.yablog.cn yablog} All rights reserved
 * @license         http://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0
 * @author          mrmsl <msl-138@163.com>
 * @date            2013-09-28 17:40:47
 * @lastmodify      $Date$ $Author$
 */

if ($.fn.ligerTab) {
    $.extend($.ligerMethos.Tab, {
        getSelected: function () {
            return this.tab.links.ul.children('li.l-selected');
        },
        //重写标签事件，增加beforeItemClick及afterItemClick
        _addTabItemEvent: function (tabitem)
        {
            var g = this, p = this.options;
            tabitem.click(function ()
            {
                var tabid = $(this).attr("tabid");
                global('clickTabItem', true);
                g.trigger('beforeItemClick', [tabid, tabitem]);//by mashanling on 2013-10-02 16:26:36
                g.selectTabItem(tabid);
                g.trigger('afterItemClick', [tabid, tabitem]);//by mashanling on 2013-10-02 16:26:36
                global('clickTabItem', false);
            });
            //右键事件支持
            g.tab.menu && g._addTabItemContextMenuEven(tabitem);
            $(".l-tab-links-item-close", tabitem).hover(function ()
            {
                $(this).addClass("l-tab-links-item-close-over");
            }, function ()
            {
                $(this).removeClass("l-tab-links-item-close-over");
            }).click(function ()
            {
                var tabid = $(this).parent().attr("tabid");
                g.removeTabItem(tabid);
            });

        }
    });
}

if ($.fn.ligerGrid) {
    $.extend($.ligerMethos.Grid, {
        /**
         * 改变每页大小
         *
         * @author          mrmsl <msl-138@163.com>
         * @date            2013-10-13 12:25:31
         *
         * @param {int} pageSize 大小
         * @param {object} queryParams 列表查询参数
         *
         * return {void} 无返回值
         */
        changePageSize: function(pageSize, queryParams) {
            var options = this.options;

            if (this.isDataChanged && 'local' != options.dataAction && !confirm(options.isContinueByDataChanged)) {
                return;
            }

            options.newPage = 1;
            options.pageSize = pageSize;
            this.loadData(options.where);

            $.extend(queryParams, {
                page_size: pageSize,
                page: 1
            });

            seajs.require('core/router').navigate(o2q(queryParams));
        },

        /**
         * 顶部工具栏配置,转object为html
         *
         * @author          mrmsl <msl-138@163.com>
         * @date            2013-10-13 22:26:01
         *
         * @param {array} items 工具栏配置
         *
         * return {void} 无返回值
         */
        _setTopBar: function (items) {
            var g       = this,
                grid    = this.grid;
                html    = [];

            html.push(' <div class="l-panel-topbar">');
            html.push('     <div class="l-panel-bbar-inner">');
            html.push('         <div class="l-bar-group  l-bar-message"><span class="l-bar-text"></span></div>');

            $.each(items, function(index, item) {

                switch (typeof(item)) {
                    case 'boolean'://分割
                        html.push('<div class="l-bar-separator"></div>');
                        break;

                    case 'string'://文本
                        html.push('<div class="l-bar-group">' + item + '</div>');
                        break;

                    case 'object'://object
                        html.push('<div class="l-bar-group' + (item.cls ? ' ' + item.cls : '') + '">');

                        if ('string' == typeof(item.text)) {
                            html.push(item.text);
                        }
                        else {
                            html.push('<input type="text" name="' + item.name + '"');

                            if (item.attrs) {//属性

                                if ('string' == typeof(item.attrs)) {
                                    html.push(item.attrs);
                                }
                                else {
                                    $.each(item.attrs, function(k, v) {
                                        html.push(k, '="', v, '"');
                                    });
                                }
                            }

                            html.push(' />');
                        }

                        html.push('</div>');
                        break;
                }//end switch
            });

            html.push('     </div>');
            html.push(' </div>');
            grid.children('.l-grid-loading').after(html.join(''));
            grid.topbar = grid.children('.l-panel-topbar').children('.l-panel-bbar-inner');
        },//end _setTopBar,

        _reBindCangePageSize: function(queryParams) {//改变每页大小
            this.toolbar.find('select').unbind('change').change(function() {
                g.changePageSize(this.value, queryParams);
            });
        },
        _afterChangeSort: function(sort, order, queryParams) {//完成排序回调
            $.extend(queryParams, {
                sort: sort,
                order: order
            });
            seajs.require('core/router').navigate(o2q(queryParams));
        }
    });

    $.extend($.ligerDefaults.Grid, {
        root: 'data',//后台返回数据源json字段名
        record: 'total',//总数字段名
        dateFormat: 'Y-m-d H:i:s',//时间格式
        selectRowButtonOnly: true,//点击复选框才选中行
        rownumbers: true,//行序号
        checkbox: true,//复选框
        height: '100%',//高度
        heightDiff: -30,//高度补齐
        pageParmName: 'page',//页数参数名
        pagesizeParmName: 'page_size',//每页大小参数名
        sortnameParmName: 'sort',//排序字段参数名
        sortorderParmName: 'order',//排序参数名,
        fixedCellHeight: false,//不固定列高
        onSuccess: function() {//加载数据成功回调
            var options = this.options;
            this.gridheader.find('.l-grid-hd-cell-sort').remove()
            .end().find('td[columnname=' + options.sortName + ']').children('div').append('<span class="l-grid-hd-cell-sort l-grid-hd-cell-sort-' + options.sortOrder.toLowerCase() + '">&nbsp;&nbsp;</span>');
            this.toolbar.find('select').val(options.pageSize);
        },
        onChangePage: function(page) {//改变页数
            this.options.parms[this.options.pageParmName] = page;
            seajs.require('core/router').navigate(o2q(this.options.parms));
        }
    });

    $.extend($.ligerDefaults.Grid.formatters, {//渲染字段方法
        //时间
        date: function(value, column) {
            return 0 == value ? '' : date(column.dateFormat || this.options.dateFormat, intval(value) * 1000);
        },
        //勾叉小图标
        yesno: function (value, column) {
            return '<img alt="" src="' + IMAGES[value] + '" class="img-yesno" />';
        }
    });
}

if ($.fn.ligerForm) {
    $.extend($.ligerDefaults.Form, {
        validate: {
            //源代码在输入框首次失去焦点后，未清除掉错误样式，原因见下
            success: function (lable, element)
            {
                //if (!lable.attr("for")) return;
                //var element = $("#" + lable.attr("for"));//原因在此，首次返回空，增加element参数，把这行及上一行干掉即可

                var element = $(element);

                if (element.hasClass("l-textarea"))
                {
                    element.removeClass("l-textarea-invalid");
                }
                else if (element.hasClass("l-text-field"))
                {
                    element.parent().removeClass("l-text-invalid");
                }
                $(element).removeAttr("title").ligerHideTip();
            }
        }
    });
}

if ($.ligerDialog) {
    $.extend($.ligerDefaults.Dialog, {
        cls: 'dialog-break-word'//弹出对话框内容，强制换行，防止出现滚动条
    });
}

//_buliderSpaceContainer重写,支持在输入框后增加提示文字 by mashanling on 2013-10-08 14:00:35
//保留源代码格式,方便版本变更对比
$.ligerui.controls.Form.prototype._buliderSpaceContainer = function (field)
{
    var g = this, p = this.options;
    var spaceWidth = field.space || field.spaceWidth || p.space;
    var out = [];
    out.push('<li');
    if (p.spaceCss)
    {
        out.push(' class="' + p.spaceCss + '"');
    }
    out.push(' style="');
    if (spaceWidth && !field.tip)//增加 && !filed.tip by mashanling on 2013-10-08 13:57:24
    {
        out.push('width:' + spaceWidth + 'px;');
    }
    out.push('">');
    if (field.validate && field.validate.required)
    {
        out.push("<span class='l-star'>*</span>");
    }

    field.tip && out.push('<span style="color: gray; margin-left: 4px;">' + field.tip + '</span>');//提示 by mashanling on 2013-10-08 13:58:06

    out.push('</li>');
    return out.join('');
}

//ueditor继承
$.fn.extend(liger.editors, {
    //纯html
    displayfield: {
        body: $('<div style="color: gray"></div>'),
        control: 'DisplayField'
    }
});

//jquery方法继承
$.extend($.fn,{

    //纯html
    ligerDisplayField: function(options) {
        var me      = this,
            html    = options.html;

        if (!html) {
            return;
        }

        switch($.type(html)) {

            case 'string'://html代码
                this.html(html);
                break;

            case 'function'://函数
                html.call(this);
                break;

            case 'object':

                if (html instanceof $) {//jquery对象
                    this.append(html);
                }

                break;

            case 'array'://jquery对象组成的数组
                $.each(html, function(index, item) {
                    me.append(item);
                });
                break;
        }
    }//end ligerDisplayField
});

//时间控件
if ($.fn.ligerDateEditor) {
    $.extend($.ligerMethos.DateEditor, {
        //重写,支持选择秒
        showDate: function ()
        {
            var g = this, p = this.options;
            if (!this.currentDate) return;
            this.currentDate.hour = parseInt(g.toolbar.time.hour.html(), 10);
            this.currentDate.minute = parseInt(g.toolbar.time.minute.html(), 10);
            var dateStr = this.currentDate.year + '/' + this.currentDate.month + '/' + this.currentDate.date + ' ' + this.currentDate.hour + ':' + this.currentDate.minute;
            //增加这句，支持到秒
            dateStr += ':' + new Date().getSeconds();
            var myDate = new Date(dateStr);
            dateStr = g.getFormatDate(myDate);
            this.inputText.val(dateStr);
            this.onTextChange();
        }
    });
    $.extend($.ligerDefaults.DateEditor, {
        format: 'yyyy-MM-dd hh:mm:ss',//格式
        width: 140,//宽
        cancelable: false,//不可以取消选择,即鼠标移上输入框时,不显示.l-trigger-cancel
        showTime: true//选择时间
    });
}

//combobox
if ($.fn.ligerComboBox) {
    $.extend($.ligerDefaults.ComboBox, {
        cancelable: false//不可以取消选择,即鼠标移上输入框时,不显示.l-trigger-cancel
    });
}
