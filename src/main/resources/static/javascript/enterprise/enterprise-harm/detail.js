/*global window P G Base $*/
Vue.component('easyui-datebox', {
    props: ['data-options', 'value'],
    template: '<input title="检查日期" type="text" name="checkDate">',
    mounted: function() {
        var vm = this;
        var options = $.extend({
            onSelect: function(date) {
                vm.$emit('input', date.toISOString());
            }
        }, vm.dataOptions);
        $(vm.$el).
        datebox(options).
        datebox('setValue', vm.value);
    },
    watch: {
        value: function(value) {
            $(this.$el).datebox('setValue', value);
        },
        dataOptions: function(options) {
            $(this.$el).datebox(options);
        }
    },
    destroyed: function() {
        $(this.$el).off().datebox('destroy');
    }
});
var vm = new Vue({
    el: '#app',
    data: function() {
        return {
            workplaces: []
        };
    },
    methods: {
        addWorkplace: function() {
            var _i = 0;
            if (this.workplaces.length > 0) {
                _i = this.workplaces.slice(-1)[0].index + 1;
            }
            this.workplaces.push({
                index: _i,
                workplaceName: '',
                examineTime: '',
                touchNumber: '',
                factors: [
                    {
                        index: 0,
                        factorName: '',
                        sumNumber: '',
                        concentration: ''
                    }]
            });
        },
        addFactor: function(index) {
            var factors = this.workplaces[index].factors;
            var _i = factors.slice(-1)[0].index + 1;
            factors.push({
                index: _i,
                factorName: '',
                sumNumber: '',
                concentration: ''
            });
        },
        removeFactor: function(w_index, f_index) {
            var factors = this.workplaces[w_index].factors;
            if (factors.length === 1) {
                this.workplaces.splice(w_index, 1);
                return;
            }
            factors.splice(f_index, 1);
        }
    }
});
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
                $('.addWorkplace').remove();
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
                           $("#registeredAddress").textbox('setValue',data.registeredAddress);
                           $("#workpiaceAddress").textbox('setValue',data.registeredAddress);
                           $("#legalRepresentative").textbox('setValue',data.legalPerson);
                           $("#industrySort").textbox('setValue',data.industry);
                           $("#phone").textbox('setValue',data.tel);
                        }
                    }
                });
            }else{
                G.ajax({
                    url: me.apiOne + '?id=' + id,
                    success: function(resultData) {
                        if (typeof resultData.data !== 'undefined') {
                            me.formSubmit.form('setData', resultData.data);
                            var workplaces = resultData.data.workplaces;
                            for (var w_index in workplaces) {
                                var workplace = workplaces[w_index];
                                workplace.index = parseInt(w_index,10);
                                for (var f_index in workplace.factors){
                                    workplace.factors[f_index].index = parseInt(f_index,10);
                                }
                            }
                            vm.workplaces = workplaces;
                        }
                    }
                });
            }
        }

        function save() {
            var me = this;
            if (me.formSubmit.form('validate') === false) {
                G.fail('表单验证不通过，请检查！');
                return false;
            }
            $.messager.progress({
                text: '正在处理……'
            });
            var data = me.formSubmit.form().serializeJSON(
                {skipFalsyValuesForTypes: ['string', 'null']});
            var id = G.getParaStr('id');
            var url =me.apiInsert;
            if (id !== null && id !== '') {
                data.id = id;
                url = me.apiUpdate;
            }
            var $accessory = $('[name^=accessories]');
            if ($accessory.length > 0) {
                data.accessories = [];
                $accessory.each(function(index, element) {
                    var elVal = $(element).val();
                    data.accessories.push(elVal);
                });
            }
            data.workplaces = vm.workplaces;
            var json = JSON.stringify(data);
            G.ajax({
                type: 'POST',
                url: url,
                data: json,
                success: function() {
                    $.messager.progress('close');
                    try {
                        var doc = parent.document;
                        if (!doc) {
                            throw new Error('无法访问父页面！');
                        }
                        parent.G.success('数据保存成功');
                        me.close(null, true);
                    } catch (e) {
                        G.fail(e);
                    }
                },
                fail: function(result) {
                    $.messager.progress('close');
                    if (typeof result.message !== 'undefined') {
                        try {
                            var doc = parent.document;
                            if (!doc) {
                                throw new Error('无法访问父页面！');
                            }
                            parent.G.fail(result.message);
                        } catch (e) {
                            G.fail(e);
                        }
                    }
                }
            });
        }

        return {
            apiInsert: '/api/enterprise/enterprise-harm/insert',
            apiUpdate: '/api/enterprise/enterprise-harm/update',
            apiOne: '/api/enterprise/enterprise-harm/one',
            apiFileUpload: '/api/system/accessory/upload',
            apiFileAll: '/api/system/accessory/all',
            apiFileDelete: '/api/system/accessory/delete',
            apiFileDownload: '/api/system/accessory/download',
            apiInfo: '/api/enterprise/enterprise-info/one',
            switchEditableByPageType: switchEditableByPageType,
            setData: setData,
            save: save
        };
    });

    var pageModel = window.pageModel = new PageModel('字典');
    pageModel.setData();
    pageModel.bindEventByIdName();
    pageModel.initAccessory('accessory');
});