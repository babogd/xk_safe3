/**
 *  生产单元区域
 */
/*global window P Base $*/
$(function () {
    var PageModel = new P(Base, function () {
        var dangsrcId = G.getParaInt('dangsrcId');
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
                        {
                            field: 'prodcellName',
                            title: '生产单元区域名称',
                            halign: 'center',
                            align: 'left',
                            width: 320,
                            sortable: true,
                            formatter: function (value,row){
                                return  '<a href="javascript:void(0)"' +
                                    ' onclick="detail(\'' + row.id +'\')">' + value + '</a>';
                            }
                        },
                        {
                            field: 'prodcellType.text',
                            title: '生产单元区域类别',
                            halign: 'center',
                            align: 'left',
                            width: 260,
                            sortable: true
                        }
                    ]]
            });
        }

        return {
            viewList: '/view/enterprise/enterprise-prodcell/list',
            apiPage: '/api/enterprise/enterprise-prodcell/page?dangsrcId='+dangsrcId,
            initDatagridList: initDatagridList
        };
    });
    var pageModel = window.pageModel = new PageModel('生产单元区域');
    pageModel.bindEventByIdName();
    pageModel.initDatagridList();
});

function detail(id) {
    id = id || '';
    G.open({
        url: '/view/enterprise/enterprise-prodcell/detail?id='+id,
        title: "重大危险源相关生产单元详情",
        width:730,
        height:500
    });
}
