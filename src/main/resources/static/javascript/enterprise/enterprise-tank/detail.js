/**
 * @author zhangfei
 * @file 储罐信息明细js
 */
/*global window P G Base $*/
var location_map_view = '/view/gis/map/location-map';
var location_msds_view = '/view/enterprise/chemical/chemical-select';
var location_dangsrc_view = '/view/enterprise/enterprise-dangsrc/dangsrc-select';
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

        //获取选中的MSDS数据
        function getMSDS(data) {
            msdsData = data;
            //显示数据
            $('#storMediaId').val(msdsData['sid']);
            $('#storMediaEname').val(msdsData['msdsNameEn']);
            $('#storMediaCname').textbox('setValue', msdsData['msdsNameCh']);
        }

        //获取选中的重大危险源数据
        function getDangsrc(data) {
            msdsData = data;
            //显示数据
            $('#dangsrcId').val(msdsData['id']);
            $('#dangsrcName').textbox('setValue', msdsData['dangsrcName']);
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
        function initJarStatusComboBox() {
            $('#jarStatus').combobox({
                url: '/api/system/dict/children?code=matterForm',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }
        function initJarModeComboBox() {
            $('#jarMode').combobox({
                url: '/api/system/dict/children?code=jarMode',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }
        function initJarTypeComboBox() {
            $('#jarType').combobox({
                url: '/api/system/dict/children?code=jarType',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }
        function openChemicalList() {
            G.open({
                url: '/view/enterprise/chemical/chemical-select',
                title: 'MSDS信息选择',
                width: '90%'
            });
        }

        return {
            apiInsert: '/api/enterprise/enterprise-tank/insert',
            apiUpdate: '/api/enterprise/enterprise-tank/update',
            apiOne: '/api/enterprise/enterprise-tank/one',
            switchEditableByPageType: switchEditableByPageType,
            initJarStatusComboBox: initJarStatusComboBox,
            initJarModeComboBox: initJarModeComboBox,
            initJarTypeComboBox: initJarTypeComboBox,
            getMSDS: getMSDS,
            getDangsrc:getDangsrc,
            setData: setData
        };
    });

    var pageModel = window.pageModel = new PageModel('字典');
    pageModel.initJarStatusComboBox();
    pageModel.initJarModeComboBox();
    pageModel.initJarTypeComboBox();
    pageModel.setData();
    pageModel.bindEventByIdName();
});

function getCoords(){
    G.open({
        url: location_map_view ,
        width:800,
        height:600,
        title: "地图选点"
    });
}

function openChemicalList(){
    G.open({
        url: location_msds_view ,
        title: 'MSDS信息选择',
        width: '90%'
    });
}

function openDangsrcList(){
    G.open({
        url: location_dangsrc_view ,
        title: '重大危险源选择',
        width: '90%'
    });
}

