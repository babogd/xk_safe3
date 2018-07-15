/**
 * @author limeng
 * @file 字典管理明细js
 */
/*global window P G Base $*/
$(function() {
    var PageModel = P(Base, function() {
        /**
         * 根据页面类型切换表单可编辑状态
         */
        function switchEditableByPageType() {
            var pageType = G.getParaInt('pageType');
            if (pageType !== G.PAGE_TYPE.NEW) {
                $('#pid').textbox('readonly');
            }

            if (pageType === G.PAGE_TYPE.VIEW) {
                this.formSubmit.find(':input').
                    validatebox('readonly', true);
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
            var pid = G.getParaStr('pid');
            var ptext = G.getParaStr('ptext');
            if (pid != null && ptext != null) {
                var $pid = $('#pid');
                $pid.textbox('setValue', pid);
                $pid.textbox('setText', ptext);
                $('#parent').val(pid);
            }

            if (!id) {
                return;
            }

            G.ajax({
                url: me.apiOne + '?id=' + id,
                success: function(resultData) {
                    if (typeof resultData.data !== 'undefined') {
                        me.formSubmit.form('load', resultData.data);
                    }
                }
            });
        }

        return {
            apiInsert: '/api/system/dict/insert',
            apiUpdate: '/api/system/dict/update',
            apiOne: '/api/system/dict/one',
            apiAll: '/api/system/dict/all',
            switchEditableByPageType: switchEditableByPageType,
            setData: setData
        };
    });

    var pageModel = window.pageModel = new PageModel('字典');
    pageModel.bindEventByIdName();
    pageModel.setData();
});
