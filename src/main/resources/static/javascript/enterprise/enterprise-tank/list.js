/**
 * @author limeng
 * @file 企业化学品列表js
 */
/*global window P Base $*/
$(function() {
    var PageModel = new P(Base, function() {
        var enterpriseId = G.getParaInt('enterpriseId');
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
                idField: 'id',
                columns: [
                    [
                        {field: 'id', checkbox: true},
                        {
                            field: 'jarName',
                            title: '储罐名称',
                            halign: 'center',
                            align: 'left',
                            width: 400,
                            sortable: true,
                            formatter: me.detailRenderer.bind(me)
                        },
                        {
                            field: 'jarType.text',
                            title: '储罐类型',
                            halign: 'center',
                            align: 'left',
                            width: 400,
                            sortable: true
                        },
                        {
                            field: 'storMediaCname',
                            title: '储存介质',
                            halign: 'center',
                            width: 400,
                            align: 'left',
                            sortable: true
                        }
                    ]]
            });
        }

        function initJarTypeComboBox() {
            $('#jarType').combobox({
                url: '/api/system/dict/children?code=jarType',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }
        return {
            viewList: '/view/enterprise/enterprise-tank/list',
            viewDetail: '/view/enterprise/enterprise-tank/detail?enterpriseId=' + enterpriseId,
            apiPage: '/api/enterprise/enterprise-tank/page?enterpriseId=' + enterpriseId,
            apiDelete: '/api/enterprise/enterprise-tank/delete',
            apiAll: '/data/tree.json',
            initDatagridList: initDatagridList,
            initJarTypeComboBox: initJarTypeComboBox
        };
    });
    var pageModel = window.pageModel = new PageModel('储罐信息');
    pageModel.bindEventByIdName();
    pageModel.initModuleTree();
    pageModel.initJarTypeComboBox();
    pageModel.initDatagridList();
});
