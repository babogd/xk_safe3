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
                $('#dwmc').show();
            }else{
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
            var enterpriseId = G.getParaInt('enterpriseId');
            $('#enterpriseId').val(enterpriseId);
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

        //生产经营活动类型
        function initActiveTypeComboBox() {
            $('#activeType').combobox({
                url: '/api/system/dict/children?code=activeType',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }

        //生产存储场所产权
        function initStorageFacilityPropertyComboBox() {
            $('#storageFacilityProperty').combobox({
                url: '/api/system/dict/children?code=storageFacilityProperty',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }

        //易引发事故类型
        function initAccidentTypeComboBox() {
            $('#accidentType').combobox({
                url: '/api/system/dict/children?code=accidentType',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }

        return {
            apiInsert: '/api/enterprise/enterprise-dangsrc/insert',
            apiUpdate: '/api/enterprise/enterprise-dangsrc/update',
            apiOne: '/api/enterprise/enterprise-dangsrc/one',
            apiFileUpload: '/api/system/accessory/upload',
            apiFileAll: '/api/system/accessory/all',
            apiFileDelete: '/api/system/accessory/delete',
            apiFileDownload: '/api/system/accessory/download',
            switchEditableByPageType: switchEditableByPageType,
            initActiveTypeComboBox: initActiveTypeComboBox,
            initStorageFacilityPropertyComboBox: initStorageFacilityPropertyComboBox,
            initAccidentTypeComboBox: initAccidentTypeComboBox,
            setData: setData
        };
    });

    var pageModel = window.pageModel = new PageModel('字典');
    pageModel.initActiveTypeComboBox();
    pageModel.initStorageFacilityPropertyComboBox();
    pageModel.initAccidentTypeComboBox();
    pageModel.setData();
    pageModel.bindEventByIdName();
    pageModel.initAccessory('accessory');
});