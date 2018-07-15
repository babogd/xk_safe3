/**
 * @author limeng
 * @file 企业化学品明细js
 */
/*global window P G Base $*/
var location_map_view = '/view/gis/map/location-map';
var prodcell = '/view/enterprise/enterprise-chmstor/prodcellList';
var formSubmit = $('#form_submit');
var grid = $('#dg');
var editIndex = undefined;
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
                $('#dwmc').show();
            } else {
                $('#dwmc').hide();
            }
        }

        //获取选中的MSDS数据
        function getMSDS(data) {
            msdsData = data;
            //显示数据
            $(selectEl.data.target).textbox('setValue', msdsData['msdsNameCh']);
            var ed = grid.datagrid('getEditor', {index: editIndex, field: 'chemId'});
            $(ed.target).textbox('setValue', msdsData['sid']);
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
                        //放入危化品配置
                        grid.datagrid('loadData', resultData.data.chmstorCfgList);
                    }
                }
            });
        }

        function initchmstorUseComboBox() {
            $('#chmstorUse').combobox({
                url: '/api/system/dict/children?code=chemicalUse',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }

        function initmatterFormComboBox() {
            $('#matterForm').combobox({
                url: '/api/system/dict/children?code=matterForm',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }

        function openChemicalList(e) {
            G.open({
                url: '/view/enterprise/chemical/chemical-select',
                title: 'MSDS信息选择',
                width: '90%'
            });
            selectEl = e;
        }

        return {
            apiInsert: '/api/enterprise/enterprise-chmstor/insert',
            apiUpdate: '/api/enterprise/enterprise-chmstor/update',
            apiOne: '/api/enterprise/enterprise-chmstor/one',
            switchEditableByPageType: switchEditableByPageType,
            initchmstorUseComboBox: initchmstorUseComboBox,
            initmatterFormComboBox: initmatterFormComboBox,
            //initunitComboBox: initunitComboBox,
            setData: setData,
            getMSDS: getMSDS,
            openChemicalList: openChemicalList
        };
    });

    var pageModel = window.pageModel = new PageModel('字典');
    pageModel.initchmstorUseComboBox();
    pageModel.initmatterFormComboBox();
    //pageModel.initunitComboBox();
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

function getProdcell() {
    G.open({
        url: prodcell,
        width: '95%',
        height: '95%',
        title: "生产单元区域名称列表"
    });
}

function getDangeArt() {
    return [{id: 1, text: '新型煤化工工艺'}, {id: 2, text: '偶氮化工艺'}, {id: 3, text: '烷基化工艺'}];
}

function endEditing() {

    if (editIndex == undefined) {
        return true
    }
    if (grid.datagrid('validateRow', editIndex)) {
        var datas = grid.datagrid('getData');
        var ed = grid.datagrid('getEditor', {index: editIndex, field: 'chemCname'});
        var chemCname = $(ed.target).combobox('getText');
        grid.datagrid('getRows')[editIndex]['chemCname'] = chemCname;
        grid.datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        G.fail('表单验证不通过，请检查！');
        return false;
    }
}

function onClickRow(index) {
    if (editIndex != index) {
        if (endEditing()) {
            grid.datagrid('selectRow', index)
                .datagrid('beginEdit', index);
            editIndex = index;
        } else {
            grid.datagrid('selectRow', editIndex);
        }
    }
}

//新增
function append() {
    if (endEditing()) {
        grid.datagrid('appendRow', {status: 'P'});
        editIndex = grid.datagrid('getRows').length - 1;
        grid.datagrid('selectRow', editIndex)
            .datagrid('beginEdit', editIndex);
    }
}

//删除
function removeit() {
    if (editIndex == undefined) {
        return
    }
    grid.datagrid('cancelEdit', editIndex)
        .datagrid('deleteRow', editIndex);
    editIndex = undefined;
}


$('#btn_alone_Save').on('click', function () {
    $('#dg').datagrid('acceptChanges');
    if (formSubmit.form('validate') === false) {
        G.fail('表单验证不通过，请检查！');
        return false;
    }
    $.messager.progress({
        text: '正在处理……'
    });
    var data = formSubmit.serializeJSON(
        {skipFalsyValuesForTypes: ['string', 'null']});
    var id = G.getParaStr('id');
    var url = pageModel.apiInsert;
    if (id !== null && id !== '') {
        data.id = id;
        url = pageModel.apiUpdate;
    }



    var rowsData = $('#dg').datagrid('getRows');
    data.chmstorCfgList = rowsData;


    var json = JSON.stringify(data);
    G.ajax({
        type: 'POST',
        url: url,
        data: json,
        success: function () {
            $.messager.progress('close');
            try {
                var doc = parent.document;
                if (!doc) {
                    throw new Error('无法访问父页面！');
                }
                parent.G.success('数据保存成功');
                pageModel.close(null, true);
            } catch (e) {
                G.fail(e);
            }
        },
        fail: function (result) {
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
});