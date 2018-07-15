/**
 * @author limeng
 * @file 企业化学品列表js
 */
/*global window P Base G $*/
$(function () {
    // var enterpriseId = G.getParaInt('enterpriseId');
    // if (!enterpriseId) {
    //     G.fail('获取企业id失败！');
    //     return;
    // }
    var PageModel = new P(Base, function () {

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
                            field: 'chemicalCName',
                            title: '品名',
                            halign: 'center',
                            align: 'left',
                            width: 300,
                            sortable: true,
                            formatter: me.detailRenderer.bind(me)
                        },
                        {
                            field: 'enterpriseId.enterpriseName',
                            title: '单位名称',
                            halign: 'center',
                            align: 'left',
                            width: 300,
                            sortable: true
                        },
                        {
                            field: 'casCode',
                            title: 'CAS号',
                            halign: 'center',
                            align: 'left',
                            width: 300,
                            sortable: true
                        },
                        {
                            field: 'catalogNo',
                            title: '危化品目录序号',
                            halign: 'center',
                            align: 'left',
                            width: 300,
                            sortable: true
                        },
                        {
                            field: 'chemicalUse.text',
                            title: '作用',
                            halign: 'center',
                            align: 'right',
                            width: 300,
                            sortable: true
                        }
                    ]],
                onLoadSuccess: function () {
                    var total = me.datagridList.datagrid('getPager').pagination('options').total;
                    $('#num').html(total);//通过html()方法将数据输出到div中
                }
            });
        }

        return {
            viewList: '/view/enterprise/enterprise-chemical/list',
            viewDetail: '/view/enterprise/enterprise-chemical/chemical-detail?enterpriseId=' +
            G.getParaInt('enterpriseId'),
            apiPage: '/api/enterprise/enterprise-chemical/page',
            initDatagridList: initDatagridList
        };
    });
    var pageModel = window.pageModel = new PageModel('企业化学品');
    pageModel.bindEventByIdName();
    pageModel.initModuleTree();
    pageModel.initDatagridList();
});
