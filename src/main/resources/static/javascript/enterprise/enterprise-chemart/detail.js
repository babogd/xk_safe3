/**
 * @author zhangfei
 * @file
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
            var enterpriseId = G.getParaStr('enterpriseId');
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
            apiInsert: '/api/enterprise/enterprise-chemart/insert',
            apiUpdate: '/api/enterprise/enterprise-chemart/update',
            apiOne: '/api/enterprise/enterprise-chemart/one',
            switchEditableByPageType: switchEditableByPageType,
            initChemartArtComboBox: initChemartArtComboBox,
            setData: setData
        };
    });

    var pageModel = window.pageModel = new PageModel('字典');
    pageModel.initChemartArtComboBox();
    pageModel.setData();
    pageModel.bindEventByIdName();
});