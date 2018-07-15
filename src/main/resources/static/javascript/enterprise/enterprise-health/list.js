/**
 * @file 职业卫生三同时列表js
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
                            field: 'projectName',
                            title: '项目名称',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true,
                            formatter: me.detailRenderer.bind(me)
                        },
                        {
                            field: 'sortName',
                            title: '建设项目职业病危害类别名称',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true
                        },
                        {
                            field: 'harmSort',
                            title: '职业病危害级别',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true,
                            formatter: function (value){
                                var str = '';
                                switch (value){
                                    case 1:
                                        str = '一般';
                                        break;
                                    case 2:
                                        str = '较重';
                                        break;
                                    case 3:
                                        str = '严重';
                                        break;
                                }
                                return str;
                            }
                        },
                        {
                            field: 'projectNature',
                            title: '项目性质',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true,
                            formatter: function (value){
                                var str = '';
                                switch (value){
                                    case 1:
                                        str = '新建';
                                        break;
                                    case 2:
                                        str = '扩建';
                                        break;
                                    case 3:
                                        str = '改建';
                                        break;
                                    case 4:
                                        str = '技术改造';
                                        break;
                                    case 5:
                                        str = '技术引进';
                                        break;
                                }
                                return str;
                            }
                        },
                        {
                            field: 'projectStatus',
                            title: '项目状态',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true,
                            formatter: function (value){
                                var str = '';
                                switch (value){
                                    case 1:
                                        str = '尚未建设';
                                        break;
                                    case 2:
                                        str = '建设中';
                                        break;
                                    case 3:
                                        str = '建设完成';
                                        break;
                                }
                                return str;
                            }
                        },
                        {
                            field: 'name',
                            title: '联系人姓名',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true
                        },
                        {
                            field: 'phone',
                            title: '联系电话',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true
                        }
                    ]]
            });
        }
        return {
            viewList: '/view/enterprise/enterprise-health/list',
            viewDetail: '/view/enterprise/enterprise-health/detail?enterpriseId='+enterpriseId,
            apiPage: '/api/enterprise/enterprise-health/page',
            apiDelete: '/api/enterprise/enterprise-health/delete',
            apiAll: '/data/tree.json',
            initDatagridList: initDatagridList
        };
    });
    var pageModel = window.pageModel = new PageModel('职业卫生三同时');
    pageModel.bindEventByIdName();
    pageModel.initModuleTree();
    pageModel.initDatagridList();
});
