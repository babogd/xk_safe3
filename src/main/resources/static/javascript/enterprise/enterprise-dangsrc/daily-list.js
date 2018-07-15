/**
 * 重大危险源信息
 */
/*global window P Base $*/
$(function() {
    var PageModel = new P(Base, function() {

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
                            field: 'dangsrcName',
                            title: '重大危险源名称',
                            halign: 'center',
                            align: 'left',
                            width: 280,
                            sortable: true,
                            formatter: me.detailRenderer.bind(me)
                        },
                        {
                            field: 'enterpriseId.enterpriseName',
                            title: '单位名称',
                            halign: 'center',
                            align: 'left',
                            width: 350,
                            sortable: true
                        },
                        {
                            field: 'dangsrcLevel',
                            title: '重大危险源级别',
                            halign: 'center',
                            align: 'left',
                            width: 230,
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
                            field: 'tankMedia',
                            title: '储存介质',
                            halign: 'center',
                            align: 'left',
                            width: 600,
                            sortable: true
                        }
                    ]],
                onLoadSuccess:function() {
                    var total = me.datagridList.datagrid('getPager').pagination('options').total;
                    $("#num").html(total);
                }
            });
        }
        return {
            viewList: '/view/enterprise/enterprise-dangsrc/list',
            viewDetail: '/view/enterprise/enterprise-dangsrc/detail',
            apiPage: '/api/enterprise/enterprise-dangsrc/page',
            initDatagridList: initDatagridList
        };
    });
    var pageModel = window.pageModel = new PageModel('重大危险源');
    pageModel.bindEventByIdName();
    pageModel.initDatagridList();
});