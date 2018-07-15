/**
 * @author limeng
 * @file 企业化学品列表js
 */
/*global window P Base $*/
$(function() {
    var PageModel = new P(Base, function() {
        var enterpriseId = G.getParaInt('enterpriseId');
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
                            title: '重点监管危险化工工艺名称',
                            halign: 'center',
                            align: 'left',
                            width: 400,
                            sortable: true,
                            formatter: me.detailRenderer.bind(me)
                        },
                        {
                            field: 'ctrlMode',
                            title: '控制方式',
                            halign: 'center',
                            align: 'left',
                            width: 400,
                            sortable: true
                        },
                        {
                            field: 'ctrlPara',
                            title: '控制参数',
                            halign: 'center',
                            width: 400,
                            align: 'left',
                            sortable: true
                        },
                        {
                            field: 'isNationDemand',
                            title: '是否满足国家规定的控制要求',
                            halign: 'center',
                            width: 400,
                            align: 'left',
                            sortable: true,
                            formatter: function (value){
                                var str = '';
                                switch (value){
                                    case 0:
                                        str = '是';
                                        break;
                                    case 1:
                                        str = '否';
                                        break;
                                }
                                return str;
                            }
                        }
                    ]]
            });
        }

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
            viewDetail: '/view/enterprise/enterprise-chemart/detail?enterpriseId=' + enterpriseId,
            viewExcel: '/export',
            apiPage: '/api/enterprise/enterprise-chemart/page?enterpriseId=' + enterpriseId,
            apiDelete: '/api/enterprise/enterprise-chemart/delete',
            apiAll: '/data/tree.json',
            initDatagridList: initDatagridList,
            initChemartArtComboBox: initChemartArtComboBox
        };
    });
    var pageModel = window.pageModel = new PageModel('重点监管危险化工工艺');
    pageModel.bindEventByIdName();
    pageModel.initModuleTree();
    pageModel.initChemartArtComboBox();
    pageModel.initDatagridList();
});
