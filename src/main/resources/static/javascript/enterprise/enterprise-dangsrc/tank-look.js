/**
 *  储罐
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
                            field: 'jarName',
                            title: '储罐名称',
                            halign: 'center',
                            align: 'left',
                            width: 230,
                            sortable: true,
                            formatter: function (value,row){
                                return  '<a href="javascript:void(0)"' +
                                    ' onclick="detail(\'' + row.id +'\')">' + value + '</a>';
                            }
                        },
                        {
                            field: 'jarType.text',
                            title: '储罐类型',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true
                        },
                        {
                            field: 'storMediaCname',
                            title: '储存介质',
                            halign: 'center',
                            width: 230,
                            align: 'left',
                            sortable: true
                        }
                    ]]
            });
        }

        return {
            viewList: '/view/enterprise/enterprise-tank/list',
            apiPage: '/api/enterprise/enterprise-tank/page?dangsrcId='+dangsrcId,
            initDatagridList: initDatagridList
        };
    });
    var pageModel = window.pageModel = new PageModel('储罐');
    pageModel.bindEventByIdName();
    pageModel.initDatagridList();
});

function detail(id) {
    id = id || '';
    G.open({
        url: '/view/enterprise/enterprise-tank/detail?id='+id,
        title: "重大危险源相关储罐详情",
        width:730,
        height:500
    });
}
