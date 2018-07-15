/**
 * 化学品选择
 */
$(function() {
    var PageModel = new P(Base, function() {
        /**
         * 初始化数据表格
         */
        function initDatagridList() {
            var me = this;
            me.datagridList.datagrid({
                url: me.apiPage,
                singleSelect: true,
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
                            field: 'msdsNameCh',
                            title: '中文名称',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true
                        },
                        {
                            field: 'msdsNameCh2',
                            title: '中文名称2',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true
                        },
                        {
                            field: 'alias',
                            title: '别名',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true
                        },
                        {
                            field: 'msdsNameEn',
                            title: '英文名',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true
                        },
                        {
                            field: 'casNo',
                            title: 'CAS号',
                            halign: 'center',
                            align: 'left',
                            width: 150,
                            sortable: true
                        }
                    ]]
            });
        }
        function close(title, action) {
            var me = this;
            try {
                var doc = parent.document;
                if (!doc) {
                    throw new Error('无法访问父页面！');
                }
                //封装返回值
                var select = me.getSelected();
                var pageModel = parent.pageModel;
                if(!select){
                    return;
                }
                pageModel.getMSDS(select);
                parent.$('#' + $(window.frameElement).parent().attr('id')).
                dialog('close');
            } catch (e) {
                window.close();
            }
        }
        return {
            apiPage: '/api/enterprise/chemical/page',
            initDatagridList: initDatagridList,
            close:close
        };
    });
    var pageModel = window.pageModel = new PageModel('MSDS');
    pageModel.bindEventByIdName();
    pageModel.initDatagridList();

});