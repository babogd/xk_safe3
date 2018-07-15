/**
 * 企业产品信息
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
                            field: 'productName',
                            title: '产品名称',
                            halign: 'center',
                            align: 'left',
                            width: 300,
                            sortable: true,
                            formatter: me.detailRenderer.bind(me)
                        },
                        {
                            field: 'output',
                            title: '年产量',
                            halign: 'center',
                            align: 'left',
                            width: 280,
                            sortable: true
                        },
                        {
                            field: 'measurementUnit',
                            title: '计量单位',
                            halign: 'center',
                            align: 'left',
                            width: 280,
                            sortable: true
                        },
                        {
                            field: 'mainProcess',
                            title: '主要生产工艺',
                            halign: 'center',
                            align: 'left',
                            width: 280,
                            sortable: true
                        }
                    ]]
            });
        }
        return {
            viewList: '/view/enterprise/enterprise-product/list',
            viewDetail: '/view/enterprise/enterprise-product/detail?enterpriseId='+enterpriseId,
            apiPage: '/api/enterprise/enterprise-product/page',
            apiDelete: '/api/enterprise/enterprise-product/delete',
            apiAll: '/data/tree.json',
            initDatagridList: initDatagridList
        };
    });
    var pageModel = window.pageModel = new PageModel('企业产品信息');
    pageModel.bindEventByIdName();
    pageModel.initModuleTree();
    pageModel.initDatagridList();
});
