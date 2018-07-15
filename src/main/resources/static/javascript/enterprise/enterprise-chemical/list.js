/**
 * @author limeng
 * @file 企业化学品列表js
 */
/*global window P Base G $*/
$(function() {
    var enterpriseId = G.getParaInt('enterpriseId');
    if (!enterpriseId) {
        G.fail('获取企业id失败！');
        return;
    }
    var PageModel = new P(Base, function() {

        /**
         * 初始化数据表格
         */
        function initDatagridList() {
            var me = this;
            me.datagridList.datagrid({
                url: me.apiPage + '?enterpriseId=' + enterpriseId,
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
                            field: 'chemicalCName',
                            title: '品名',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true,
                            formatter: me.detailRenderer.bind(me)
                        },
                        {
                            field: 'casCode',
                            title: 'CAS号',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true
                        },
                        {
                            field: 'catalogNo',
                            title: '危化品目录序号',
                            halign: 'center',
                            align: 'left',
                            sortable: true
                        },
                        {
                            field: 'chemicalUse.text',
                            title: '作用',
                            halign: 'center',
                            align: 'right',
                            width: 200,
                            sortable: true
                        },
                        {
                            field: 'yearUseQty',
                            title: '年用量或产量（T）',
                            halign: 'center',
                            align: 'right',
                            sortable: true
                        },
                        {
                            field: 'maxStorQty',
                            title: '最大储存量（T）',
                            halign: 'center',
                            align: 'right',
                            sortable: true
                        },
                        {
                            field: 'storMode',
                            title: '储存方式/地点',
                            halign: 'center',
                            align: 'right',
                            width: 200,
                            sortable: true
                        },
                        {
                            field: 'isImportChem',
                            title: '是否重点监管危化品',
                            halign: 'center',
                            align: 'right',
                            sortable: true,
                            formatter: me.boolRenderer
                        }
                    ]]
            });
        }

        return {
            viewList: '/view/enterprise/enterprise-chemical/list',
            viewDetail: '/view/enterprise/enterprise-chemical/detail?enterpriseId=' +
            enterpriseId,
            viewExcel: '/export',
            apiPage: '/api/enterprise/enterprise-chemical/page',
            apiDelete: '/api/enterprise/enterprise-chemical/delete',
            apiExportExcel: '/api/enterprise/enterprise-chemical/export-excel',
            apiAll: '/data/tree.json',
            initDatagridList: initDatagridList
        };
    });
    var pageModel = window.pageModel = new PageModel('企业化学品');
    pageModel.bindEventByIdName();
    pageModel.initModuleTree();
    pageModel.initDatagridList();
});
