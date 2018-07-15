/**
 * @author gaoliqi
 */

$(function() {
    var PageModel = new P(Base, function() {
        /**
         * 初始化单位列表
         */
        function initDatagridList() {
            var me = this;
            me.datagridList.datagrid({
                url: me.apiPage + "?dept_cate=" + $("#deptType").val(),
                singleSelect: $("#onlyOne").val() == "1" ? true:false,
                rownumbers: true,
                pagination: true,
                autoRowHeight: true,
                fit: true,
                remoteSort: true,
                striped: true,
                idField: 'id',
                columns: [
                    [
                        {field: 'id', checkbox: true},
                        {
                            field: 'deptName',
                            title: '企业名称',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true
                        },
                        {
                            field: 'deptCode',
                            title: '企业编码',
                            halign: 'center',
                            align: 'left',
                            width: 100,
                            sortable: true
                        },
                        {
                            field: 'teamLeader',
                            title: '负责人',
                            halign: 'center',
                            align: 'left',
                            width: 100,
                            sortable: true
                        }
                    ]]
            });
        }


        /**
         * 重写查询时操作
         * @override
         * @param title 标题
         * @param isReload 是否从第一页载入
         */
        function search(title, isReload) {
            isReload = isReload || false;
            var formData = this.formSearch.serializeJSON();
            if (isReload) {
                this.datagridList.datagrid('reload', formData);
            } else {
                this.datagridList.datagrid('load', formData);
            }
            this.datagridList.datagrid('clearSelections');
            if (this.dictTree) {
                this.dictTree.tree('reload');
            }
        }

        /**
         * 返回选择记录
         * @param onlyOne 是否只能选择一个企业，true是 false否，可选多个
         */
        function getSelect(onlyOne){
            var rows = this.datagridList.datagrid('getSelections');

            if(onlyOne && rows.length != 1){
                $.messager.alert("警告","需要且只能选择一家企业");
                return;
            }
            return rows[0];
        }

        return {
            viewList: '/hd/view/dept_list',
            viewDetail: '/view/system/dict/detail',
            apiPage: '/hd/api/dept/list',
            apiDelete: '/api/system/dict/delete',
            apiAll: '/api/system/dict/all',
            initDatagridList: initDatagridList,
            //showDetail: showDetail,
            search: search,
            getSelect: getSelect
        };
    });
    var pageModel = window.pageModel = new PageModel('字典');
    pageModel.bindEventByIdName();
    pageModel.initDatagridList();
});
