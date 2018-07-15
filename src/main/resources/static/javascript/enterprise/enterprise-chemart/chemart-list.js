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
                            field: 'chemartArt.text',
                            title: '工艺名称',
                            halign: 'center',
                            align: 'left',
                            width: 280,
                            sortable: true,
                            formatter: me.detailRenderer.bind(me)
                        },
                        {
                            field: 'enterpriseId.enterpriseName',
                            title: '所属企业',
                            halign: 'center',
                            align: 'left',
                            width: 350,
                            sortable: true
                        },
                        {
                            field: 'ctrlMeasure',
                            title: '工艺简介',
                            halign: 'center',
                            align: 'left',
                            width: 600,
                            sortable: true
                        }
                    ]],

                onLoadSuccess:function() {
                     var total = me.datagridList.datagrid('getPager').pagination('options').total;
                    $('#num').html(total);//通过html()方法将数据输出到div中
                }

            });

        }

        // G.ajax({
        //     async:false,
        //     type: 'POST',
        //     url: '/api/enterprise/enterprise-chemart/num',
        //     success: function(resultData) {
        //        num=resultData.data;
        //     }
        // });




        function initChemartArtComboBox() {
            $('#chemartArt').combobox({
                url: '/api/system/dict/children?code=chemart',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }
        return {
            viewList: '/view/enterprise/enterprise-chemart/list',
            viewDetail: '/view/enterprise/enterprise-chemart/chemart-detail?enterpriseId=' +
            G.getParaInt('enterpriseId'),
            apiPage: '/api/enterprise/enterprise-chemart/page',
            initDatagridList: initDatagridList,
            initChemartArtComboBox: initChemartArtComboBox

        };
    });
    var pageModel = window.pageModel = new PageModel('重点监管工艺');
    pageModel.bindEventByIdName();
    pageModel.initChemartArtComboBox();
    pageModel.initDatagridList();
});