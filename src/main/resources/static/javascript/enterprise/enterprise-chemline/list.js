/**
 * @author limeng
 * @file 企业化学品列表js
 */
/*global window P Base $*/
$(function () {
    var PageModel = new P(Base, function () {
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
                            field: 'chemlineName',
                            title: '管道名称',
                            halign: 'center',
                            align: 'left',
                            width: 300,
                            sortable: true,
                            formatter: me.detailRenderer.bind(me)
                        },
                        {
                            field: 'layMode.text',
                            title: '管道铺设方式',
                            halign: 'center',
                            align: 'left',
                            width: 300,
                            sortable: true
                        },
                        {
                            field: 'propDeptName',
                            title: '产权单位名称',
                            halign: 'center',
                            align: 'left',
                            sortable: true
                        },
                        {
                            field: 'propContactorName',
                            title: '产权单位联系人',
                            halign: 'center',
                            align: 'right',
                            width: 300,
                            sortable: true
                        },
                        {
                            field: 'useDeptName',
                            title: '使用单位名称',
                            halign: 'center',
                            align: 'right',
                            width: 300,
                            sortable: true
                        },
                        {
                            field: 'useContactorName',
                            title: '使用单位联系人',
                            halign: 'center',
                            align: 'right',
                            width: 300,
                            sortable: true
                        }
                    ]]
            });
        }

        function initLayModeComboBox() {
            $('#layMode').combobox({
                url: '/api/system/dict/children?code=layMode',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }

        return {
            viewList: '/view/enterprise/enterprise-chemline/list',
            viewDetail: '/view/enterprise/enterprise-chemline/detail?enterpriseId=' + enterpriseId,
            viewExcel: '/export',
            apiPage: '/api/enterprise/enterprise-chemline/page?enterpriseId=' + enterpriseId,
            apiDelete: '/api/enterprise/enterprise-chemline/delete',
            // apiExportExcel: '/api/enterprise/enterprise-chemline/export-excel',
            apiAll: '/data/tree.json',
            initDatagridList: initDatagridList,
            initLayModeComboBox: initLayModeComboBox
        };
    });
    var pageModel = window.pageModel = new PageModel('危化品运输管道');
    pageModel.bindEventByIdName();
    pageModel.initModuleTree();
    pageModel.initDatagridList();
    pageModel.initLayModeComboBox();
});
