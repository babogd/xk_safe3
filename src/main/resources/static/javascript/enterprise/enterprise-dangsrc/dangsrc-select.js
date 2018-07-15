/**
 * 重大危险源选择
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
                            field: 'dangsrcName',
                            title: '重大危险源名称',
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
                            width: 350,
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
                pageModel.getDangsrc(select);
                parent.$('#' + $(window.frameElement).parent().attr('id')).
                dialog('close');
            } catch (e) {
                window.close();
            }
        }
        return {
            apiPage: '/api/enterprise/enterprise-dangsrc/page',
            initDatagridList: initDatagridList,
            close:close
        };
    });
    var pageModel = window.pageModel = new PageModel('重大危险源');
    pageModel.bindEventByIdName();
    pageModel.initDatagridList();

});