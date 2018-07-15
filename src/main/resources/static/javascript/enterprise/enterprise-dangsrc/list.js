/**
 * 重大危险源信息
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
                            field: 'dangsrcName',
                            title: '重大危险源名称',
                            halign: 'center',
                            align: 'left',
                            width: 280,
                            sortable: true,
                            formatter: me.detailRenderer.bind(me)
                        },
                        {
                            field: 'dangsrcLevel',
                            title: '重大危险源级别',
                            halign: 'center',
                            align: 'left',
                            width: 280,
                            sortable: true,
                            formatter: function (value){
                                var str = '';
                                switch (value){
                                    case 1:
                                        str = '一级';
                                        break;
                                    case 2:
                                        str = '二级';
                                        break;
                                    case 3:
                                        str = '三级';
                                        break;
                                    case 4:
                                        str = '四级';
                                        break;
                                }
                                return str;
                            }
                        },
                        {
                            field: 'name',
                            title: '涉及相关生产单元',
                            halign: 'center',
                            align: 'left',
                            width: 350,
                            sortable: true,
                            formatter: function (value,row){
                                return  '<a href="javascript:void(0)"' +
                                    ' onclick="detailsProdcell(\'' + row.id +'\')">' + '详情' + '</a>';
                            }
                        },
                        {
                            field: 'address',
                            title: '涉及相关储罐',
                            halign: 'center',
                            align: 'left',
                            width: 300,
                            sortable: true,
                            formatter: function (value,row){
                                return  '<a href="javascript:void(0)"' +
                                    ' onclick="detailsTank(\'' + row.id +'\')">' + '详情' + '</a>';
                            }
                        }
                    ]]
            });
        }
        return {
            viewList: '/view/enterprise/enterprise-dangsrc/list',
            viewDetail: '/view/enterprise/enterprise-dangsrc/detail?enterpriseId='+enterpriseId,
            apiPage: '/api/enterprise/enterprise-dangsrc/page',
            apiDelete: '/api/enterprise/enterprise-dangsrc/delete',
            apiAll: '/data/tree.json',
            initDatagridList: initDatagridList
        };
    });
    var pageModel = window.pageModel = new PageModel('重大危险源信息');
    pageModel.bindEventByIdName();
    pageModel.initModuleTree();
    pageModel.initDatagridList();
});

function detailsProdcell(id) {
    id = id || '';
    G.open({
        url: '/view/enterprise/enterprise-dangsrc/prodcell-look?dangsrcId='+id,
        title: "重大危险源相关生产单元",
        width:800,
        height:600
    });
}

function detailsTank(id) {
    id = id || '';
    G.open({
        url: '/view/enterprise/enterprise-dangsrc/tank-look?dangsrcId='+id,
        title: "重大危险源相关储罐",
        width:800,
        height:600
    });
}