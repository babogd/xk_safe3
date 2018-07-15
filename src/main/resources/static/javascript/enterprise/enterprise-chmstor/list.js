/**
 * @author limeng
 * @file 企业化学品仓库列表js
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
                            field: 'chmstorName',
                            title: '化学品仓库名称',
                            halign: 'center',
                            align: 'left',
                            width: 400,
                            sortable: true,
                            formatter: me.detailRenderer.bind(me)
                        },
                        {
                            field: 'storemanName',
                            title: '仓库管理员',
                            halign: 'center',
                            align: 'left',
                            width: 400
                        },
                        {
                            field: 'linkMode',
                            title: '联系方式',
                            halign: 'center',
                            align: 'left',
                            width: 400
                        }
                    ]]
            });
        }

        return {
            viewList: '/view/enterprise/enterprise-chmstor/list',
            viewDetail: '/view/enterprise/enterprise-chmstor/detail?enterpriseId=' + enterpriseId,
            apiPage: '/api/enterprise/enterprise-chmstor/page?enterpriseId=' + enterpriseId,
            apiDelete: '/api/enterprise/enterprise-chmstor/delete',
            apiAll: '/data/tree.json',
            initDatagridList: initDatagridList
        };
    });
    var pageModel = window.pageModel = new PageModel('企业化学品仓库');
    pageModel.bindEventByIdName();
    pageModel.initModuleTree();
    pageModel.initDatagridList();
});
