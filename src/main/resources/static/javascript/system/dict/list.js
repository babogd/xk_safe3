/**
 * @author limeng
 * @file 字典管理列表js
 */
/*global window P G Base $*/
$(function() {
    var PageModel = new P(Base, function() {
        /**
         * 初始化字典树
         */
        function initDictTree() {
            var me = this;
            me.dictTree.tree({
                url: me.apiAll,
                method: 'post',
                idField: 'id',
                textField: 'text',
                parentField: 'pid',
                rootNode: true,
                rootValue: null,
                lines: true,
                onClick: function(node) {
                    if (node.id === 'root') {
                        me.datagridList.datagrid('load', {});
                    } else {
                        me.datagridList.datagrid('load', {
                            pid: node.id
                        });
                    }
                }
            });
        }

        /**
         * 初始化数据表格
         */
        function initDatagridList() {
            var me = this;
            me.datagridList.datagrid({
                url: me.apiPage,
                singleSelect: false,
                rownumbers: true,
                pagination: true,
                autoRowHeight: true,
                fit: true,
                remoteSort: true,
                striped: true,
                idField: 'id',
                columns: [
                    [
                        {field: 'id', checkbox: true},
                        {
                            field: 'code',
                            title: '类型编码',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true
                        },
                        {
                            field: 'text',
                            title: '名称',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true
                        },
                        {
                            field: 'parent.text',
                            title: '上级名称',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true
                        },
                        {
                            field: 'sortNum',
                            title: '排序号',
                            halign: 'center',
                            align: 'right',
                            width: 200,
                            sortable: true
                        }
                    ]]
            });
        }

        /**
         * 重写打开详情弹窗时操作
         * @override
         * @param id 数据id
         * @param pageType 页面类型
         * @param title 弹窗标题
         */
        function showDetail(id, pageType, title) {
            var me = this;
            id = id || '';
            title = title || '详情';
            pageType = pageType || G.PAGE_TYPE.VIEW;
            var selectedNode = this.dictTree.tree('getSelected');
            var pid,
                ptext;
            if (selectedNode == null) {
                pid = '';
                ptext = '根节点';
            }
            else {
                pid = selectedNode.id?selectedNode.id:'';
                ptext = selectedNode.text;
            }
            var url = me.viewDetail + '?id=' + id + '&pid=' + pid +
                '&ptext=' + ptext;
            G.open({
                url: url,
                pageType: pageType,
                title: title
            });
        }

        /**
         * 重写查询时操作
         * @override
         * @param title 标题
         * @param isReload 是否从第一页载入
         */
        function search(title, isReload) {
            isReload = isReload || false;
            var formData = this.formSearch.serializeJSON();
            if (isReload) {
                this.datagridList.datagrid('reload', formData);
            } else {
                this.datagridList.datagrid('load', formData);
            }
            this.datagridList.datagrid('clearSelections');
            if (this.dictTree) {
                this.dictTree.tree('reload');
            }
        }

        return {
            viewList: '/view/system/dict/list',
            viewDetail: '/view/system/dict/detail',
            apiPage: '/api/system/dict/page',
            apiDelete: '/api/system/dict/delete',
            apiAll: '/api/system/dict/all',
            dictTree: $('#dict_tree'),
            initDictTree: initDictTree,
            initDatagridList: initDatagridList,
            showDetail: showDetail,
            search: search
        };
    });
    var pageModel = window.pageModel = new PageModel('字典');
    pageModel.bindEventByIdName();
    pageModel.initDictTree();
    pageModel.initDatagridList();
});
