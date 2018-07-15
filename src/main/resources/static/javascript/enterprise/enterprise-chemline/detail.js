/**
 * @author lizhaolong
 * @file 危化品运输管道明细js
 */
/*global window P G Base $*/
$(function() {
    var PageModel = P(Base, function() {
        /**
         * 根据页面类型切换表单可编辑状态
         */
        function switchEditableByPageType() {
            var pageType = G.getParaInt('pageType');
            if (pageType === G.PAGE_TYPE.VIEW) {
                this.formSubmit.find(':input').prop('disable', true);
                $('.form-button').remove();
            }
        }

        /**
         * 加载时初始化表单数据
         */
        function setData() {
            var me = this;
            me.switchEditableByPageType();
            var id = G.getParaStr('id');
            var enterpriseId = G.getParaInt('enterpriseId');
            //将企业ID放入表单中
            $("#enterpriseId").val(enterpriseId);
            if (!id) {
                return;
            }

            G.ajax({
                url: me.apiOne + '?id=' + id,
                success: function(resultData) {
                    if (typeof resultData.data !== 'undefined') {
                        me.formSubmit.form('setData', resultData.data);
                    }
                }
            });
        }

        function initLayModeComboBox() {
            $('#layMode').combobox({
                url: '/api/system/dict/children?code=layMode',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }

        function initChemlineStatusComboBox() {
            $('#chemlineStatus').combobox({
                url: '/api/system/dict/children?code=chemlineStatus',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }

        return {
            apiInsert: '/api/enterprise/enterprise-chemline/insert',
            apiUpdate: '/api/enterprise/enterprise-chemline/update',
            apiOne: '/api/enterprise/enterprise-chemline/one',
            apiFileUpload: '/api/system/accessory/upload',
            apiFileAll: '/api/system/accessory/all',
            apiFileDelete: '/api/system/accessory/delete',
            apiFileDownload: '/api/system/accessory/download',
            switchEditableByPageType: switchEditableByPageType,
            initLayModeComboBox: initLayModeComboBox,
            initChemlineStatusComboBox: initChemlineStatusComboBox,
            setData: setData
        };
    });

    var pageModel = window.pageModel = new PageModel('字典');
    pageModel.initLayModeComboBox();
    pageModel.initChemlineStatusComboBox();
    pageModel.setData();
    pageModel.bindEventByIdName();
    pageModel.initAccessory('accessoryFS','accessoryFS');
    pageModel.initAccessory('accessoryTZ','accessoryTZ');
    pageModel.initAccessory('accessorySG','accessorySG');
    pageModel.initAccessory('accessoryFH','accessoryFH');
    pageModel.initAccessory('accessoryWZ','accessoryWZ');
    pageModel.initAccessory('accessoryYH','accessoryYH');
    pageModel.initAccessory('accessoryZG','accessoryZG');
    pageModel.initAccessory('accessoryQT','accessoryQT');
});