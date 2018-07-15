/*global Vue P Base $*/
var PageModel = new P(Base, function() {

    return {
        apiPage: '/api/enterprise/enterprise-chemical/page'
    };
});
new PageModel('重大危险源级别占比分析');
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
new Vue({
    el: '#app',
    data: function() {
        return {
            workplaces: []
        };
    },
    filters: {
        json: function(value) {
            if (!value) return '';
            return JSON.stringify(value);
        }
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
                checkDate: '',
                contactNum2: '',
                factors: [
                    {
                        index: 0,
                        factorName: '',
                        contactNum1: '',
                        checkResult: ''
                    }]
            });
        },
        addFactor: function(index) {
            var factors = this.workplaces[index].factors;
            var _i = factors.slice(-1)[0].index + 1;
            factors.push({
                index: _i,
                factorName: '',
                contactNum1: '',
                checkResult: ''
            });
        },
        removeFactor: function(w_index, f_index) {
            var factors = this.workplaces[w_index].factors;
            if (factors.length === 1) {
                this.workplaces.splice(w_index, 1);
                return;
            }
            factors.splice(f_index, 1);
        },
        saveWorkplace:function () {
            G.info(this.workplaces)
        }
    }
});