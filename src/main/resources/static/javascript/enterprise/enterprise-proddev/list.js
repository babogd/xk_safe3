
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
                            field: 'proddevName',
                            title: '生产装置名称',
                            halign: 'center',
                            align: 'left',
                            width: 400,
                            sortable: true,
                            formatter: me.detailRenderer.bind(me)
                        },
                        {
                            field: 'chemartArt.text',
                            title: '涉及相关重点监管工艺',
                            halign: 'center',
                            align: 'left',
                            width: 400,
                            sortable: true
                        },
                        {
                            field: 'platformTiers',
                            title: '平台最高层数',
                            halign: 'center',
                            align: 'left',
                            width: 400
                        }
                    ]]
            });
        }

        return {
            viewList: '/view/enterprise/enterprise-proddev/list',
            viewDetail: '/view/enterprise/enterprise-proddev/detail?enterpriseId=' + enterpriseId,
            apiPage: '/api/enterprise/enterprise-proddev/page',
            apiDelete: '/api/enterprise/enterprise-proddev/delete',
            apiAll: '/data/tree.json',
            initDatagridList: initDatagridList
        };
    });
    var pageModel = window.pageModel = new PageModel('生产装置');
    pageModel.bindEventByIdName();
    pageModel.initModuleTree();
    pageModel.initDatagridList();
});
