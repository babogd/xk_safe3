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

        function getMSDS(selected) {
            $('#productName').textbox('setValue', selected.msdsNameCh);
            $('#chemicalName').textbox('setValue', selected.msdsNameCh);
        }

        function initChemicalCName() {
            $('#productName').textbox({
                editable: true,
                icons: [
                    {
                        iconCls: 'icon-more',
                        handler: function() {
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

        return {
            apiInsert: '/api/enterprise/enterprise-product/insert',
            apiUpdate: '/api/enterprise/enterprise-product/update',
            apiOne: '/api/enterprise/enterprise-product/one',
            switchEditableByPageType: switchEditableByPageType,
            initChemicalCName: initChemicalCName,
            getMSDS: getMSDS,
            setData: setData
        };
    });

    var pageModel = window.pageModel = new PageModel('字典');
    pageModel.setData();
    pageModel.initChemicalCName();
    pageModel.bindEventByIdName();
});