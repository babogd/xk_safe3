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
            if (!enterpriseId) {
                G.fail('获取企业id失败！');
                return;
            }
            $('#enterpriseId').val(enterpriseId);
            if (!id) {
                G.ajax({
                    url: me.apiInfo + '?id=' + enterpriseId,
                    success: function(resultData) {
                        if (typeof resultData.data !== 'undefined') {
                           var data = resultData.data;
                           $("#buildFirm").textbox('setValue',data.enterpriseName);
                           $("#buildFirmAddress").textbox('setValue',data.address);
                           $("#projectAddress").textbox('setValue',data.registeredAddress);
                           $("#legalRepresentative").textbox('setValue',data.legalPerson);
                        }
                    }
                });
            }else{
                G.ajax({
                    url: me.apiOne + '?id=' + id,
                    success: function(resultData) {
                        if (typeof resultData.data !== 'undefined') {
                            me.formSubmit.form('setData', resultData.data);
                        }
                    }
                });
            }
        }

        return {
            apiInsert: '/api/enterprise/enterprise-health/insert',
            apiUpdate: '/api/enterprise/enterprise-health/update',
            apiOne: '/api/enterprise/enterprise-health/one',
            apiFileUpload: '/api/system/accessory/upload',
            apiFileAll: '/api/system/accessory/all',
            apiFileDelete: '/api/system/accessory/delete',
            apiFileDownload: '/api/system/accessory/download',
            apiInfo: '/api/enterprise/enterprise-info/one',
            switchEditableByPageType: switchEditableByPageType,
            setData: setData
        };
    });

    var pageModel = window.pageModel = new PageModel('字典');
    pageModel.setData();
    pageModel.bindEventByIdName();
    pageModel.initAccessory('accessory');
});