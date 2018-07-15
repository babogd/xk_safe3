/**
 * @author limeng
 * @file 生产单元区域明细js
 */
/*global window P G Base $*/
var location_map_view = '/view/gis/map/location-map';
var dangsrc = '/view/enterprise/enterprise-prodcell/dangsrcList';
$(function () {
    var PageModel = P(Base, function () {
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
                success: function (resultData) {
                    if (typeof resultData.data !== 'undefined') {
                        me.formSubmit.form('setData', resultData.data);
                    }
                }
            });
        }

        function initprodcellTypeComboBox() {
            $('#prodcellType').combobox({
                url: '/api/system/dict/children?code=prodcellType',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }

        //初始化重大危险源数据
        // function initDangsrcComboBox() {
        //     $('#dangsrcId').combobox({
        //         // url: '/api/system/dict/children?code=chemicalUse',
        //         // method: 'get',
        //         data: [{id: 1, text: '测试重大危险源'}],
        //         valueField: 'id',
        //         textField: 'text',
        //         reversed: true,
        //         showNullItem: true
        //     });
        // }

        return {
            apiInsert: '/api/enterprise/enterprise-prodcell/insert',
            apiUpdate: '/api/enterprise/enterprise-prodcell/update',
            apiOne: '/api/enterprise/enterprise-prodcell/one',
            switchEditableByPageType: switchEditableByPageType,
            initprodcellTypeComboBox: initprodcellTypeComboBox,
            setData: setData
        };
    });

    var pageModel = window.pageModel = new PageModel('字典');
    pageModel.initprodcellTypeComboBox();
    pageModel.setData();
    pageModel.bindEventByIdName();
});

function getCoords() {
    G.open({
        url: location_map_view,
        width: '95%',
        height: '95%',
        title: "地图选点"
    });
}

function getDangsrc() {
    G.open({
        url: dangsrc,
        width: '95%',
        height: '95%',
        title: "重大危险源列表"
    });
}