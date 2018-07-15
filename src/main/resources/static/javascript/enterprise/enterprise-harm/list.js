/**
 * 接触职业病危害
 */
/*global window P Base $*/
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
                url: me.apiPage+ '?enterpriseId=' + enterpriseId,
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
                            field: 'filingTime',
                            title: '申报时间',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true,
                            formatter: me.detailRenderer.bind(me)
                        },
                        {
                            field: 'workpiaceAddress',
                            title: '作业场所',
                            halign: 'center',
                            align: 'left',
                            width: 260,
                            sortable: true
                        },
                        {
                            field: 'agencyPrincipal',
                            title: '机构负责人',
                            halign: 'center',
                            align: 'left',
                            width: 220,
                            sortable: true
                        },
                        {
                            field: 'principalPhone',
                            title: '职业卫生负责人电话',
                            halign: 'center',
                            align: 'left',
                            width: 220,
                            sortable: true
                        },
                        {
                            field: 'harmSumNumber',
                            title: '职业病危害总人数',
                            halign: 'center',
                            align: 'left',
                            width: 220,
                            sortable: true
                        }
                    ]]
            });
        }
        return {
            viewList: '/view/enterprise/enterprise-harm/list',
            viewDetail: '/view/enterprise/enterprise-harm/detail?enterpriseId='+enterpriseId,
            apiPage: '/api/enterprise/enterprise-harm/page',
            apiDelete: '/api/enterprise/enterprise-harm/delete',
            apiAll: '/data/tree.json',
            initDatagridList: initDatagridList
        };
    });
    var pageModel = window.pageModel = new PageModel('接触职业病危害');
    pageModel.bindEventByIdName();
    pageModel.initModuleTree();
    pageModel.initDatagridList();
});
