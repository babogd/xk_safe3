/**
 * @author limeng
 * @file 生产单元区域列表js
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
                            field: 'prodcellName',
                            title: '生产单元区域名称',
                            halign: 'center',
                            align: 'left',
                            width: 300,
                            sortable: true,
                            formatter: me.detailRenderer.bind(me)
                        },
                        {
                            field: 'prodcellType.text',
                            title: '生产单元区域类别',
                            halign: 'center',
                            align: 'left',
                            width: 300,
                            sortable: true
                        },
                        {
                            field: 'name',
                            title: '涉及相关生产装置',
                            halign: 'center',
                            align: 'left',
                            width: 350,
                            formatter: function (value, row) {
                                return '<a href="javascript:void(0)"' +
                                    ' onclick="detailsProdcell(\'' + row.id + '\')">' + '详情' + '</a>';
                            }
                        },
                        {
                            field: 'address',
                            title: '涉及相关仓库',
                            halign: 'center',
                            align: 'left',
                            width: 350,
                            formatter: function (value, row) {
                                return '<a href="javascript:void(0)"' +
                                    ' onclick="detailsChmstor(\'' + row.id + '\')">' + '详情' + '</a>';
                            }
                        }

                    ]]
            });
        }

        function initprodcellTypeComboBox() {
            $('#prodcellType').combobox({
                url: '/api/system/dict/children?code=prodcellType',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }

        return {
            viewList: '/view/enterprise/enterprise-prodcell/list',
            viewDetail: '/view/enterprise/enterprise-prodcell/detail?enterpriseId=' + enterpriseId,
            apiPage: '/api/enterprise/enterprise-prodcell/page?enterpriseId=' + enterpriseId,
            apiDelete: '/api/enterprise/enterprise-prodcell/delete',
            apiAll: '/data/tree.json',
            initDatagridList: initDatagridList,
            initprodcellTypeComboBox: initprodcellTypeComboBox
        };
    });
    var pageModel = window.pageModel = new PageModel('生产单元区域');
    pageModel.bindEventByIdName();
    pageModel.initModuleTree();
    pageModel.initDatagridList();
    pageModel.initprodcellTypeComboBox();
});

function detailsProdcell(id) {
    id = id || '';
    G.open({
        url: '/view/enterprise/enterprise-prodcell/proddev-look?prodcellId=' + id,
        title: "查看生产单元相关生产装置",
        width: '80%',
        height: '80%'
    });
}

function detailsChmstor(id) {
    id = id || '';
    G.open({
        url: '/view/enterprise/enterprise-prodcell/chmstor-look?prodcellId=' + id,
        title: "查看生产单元相关仓库",
        width: '80%',
        height: '80%'
    });
}
