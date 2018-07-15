/**
 * @author limeng
 * @file 企业化学品明细js
 */
/*global window P G Base $*/
$(function () {
    var PageModel = P(Base, function () {

        function getMSDS(selected) {
            $('#msdsId').val(selected.sid);
            $('#chemicalEName').val(selected.msdsNameEn);
            $('#chemicalCName').textbox('setValue', selected.msdsNameCh);
            $('#casCode').textbox('setValue', selected.casNo);
        }

        function initChemicalCName() {
            $('#chemicalCName').textbox({
                editable: false,
                icons: [
                    {
                        iconCls: 'icon-more',
                        handler: function () {
                            G.open({
                                title: 'MSDS信息选择',
                                pageType: G.PAGE_TYPE.VIEW,
                                width: '90%',
                                height: '90%',
                                url: '/view/enterprise/chemical/chemical-select'
                            });
                        }
                    }]
            });
        }

        /**
         * 根据页面类型切换表单可编辑状态
         */
        function switchEditableByPageType() {
            var pageType = G.getParaInt('pageType');
            if (pageType === G.PAGE_TYPE.VIEW) {
                this.formSubmit.find(':input').prop('disable', true);
                $('.form-button').remove();
                $('#dwmc').show();
            } else {
                $('#dwmc').hide();
            }
        }

        /**
         * 加载时初始化表单数据
         */
        function setData() {
            var me = this;
            me.switchEditableByPageType();
            var id = G.getParaStr('id');
            if (!id) {
                return;
            }

            G.ajax({
                url: me.apiOne + '?id=' + id,
                success: function (resultData) {
                    if (typeof resultData.data !== 'undefined') {
                        me.formSubmit.form('setData', resultData.data);
                    }
                }
            });
        }

        function initChemicalUseComboBox() {
            $('#chemicalUse').combobox({
                url: '/api/system/dict/children?code=chemicalUse',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }

        return {
            apiInsert: '/api/enterprise/enterprise-chemical/insert',
            apiUpdate: '/api/enterprise/enterprise-chemical/update',
            apiOne: '/api/enterprise/enterprise-chemical/one',
            apiFileUpload: '/api/system/accessory/upload',
            apiFileAll: '/api/system/accessory/all',
            apiFileDelete: '/api/system/accessory/delete',
            apiFileDownload: '/api/system/accessory/download',
            switchEditableByPageType: switchEditableByPageType,
            initChemicalUseComboBox: initChemicalUseComboBox,
            initChemicalCName: initChemicalCName,
            getMSDS: getMSDS,
            setData: setData
        };
    });

    var pageModel = window.pageModel = new PageModel('字典');
    pageModel.initChemicalCName();
    pageModel.initChemicalUseComboBox();
    pageModel.setData();
    pageModel.bindEventByIdName();
    pageModel.initAccessory('accessory');
});