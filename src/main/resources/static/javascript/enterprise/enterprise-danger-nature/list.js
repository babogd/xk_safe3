$(function () {
    /*global window P Base $*/
    /**
     * @author lizhaolong
     * @file 危险特性js
     */
    var PageModel = new P(Base, function () {

        var enterpriseId = G.getParaInt('enterpriseId');

        $('.dangerChemicals').radiobox({});
        $('#inputDangerChemicals').on('click', function () {
            var dangerChemicals = $('.dangerChemicals').radiobox('getValues');
            if (dangerChemicals === '1') {
                $('#dangerChemicalsView').show('slow');
                $('#dangerChemicalsType').combobox({
                    required: true
                })
            } else {
                $('#dangerChemicalsView').hide('slow');
                $('#dangerChemicalsType').combobox({
                    required: false
                })
            }
        });

        $('.dust').radiobox({});
        $('#inputDust').on('click', function () {
            var dust = $('.dust').radiobox('getValues');
            if (dust === '1') {
                $('#dustTypeView').show('slow');
                $('#dustType').combobox({
                    required: true
                })
            } else {
                $('#dustTypeView').hide('slow');
                $('#dustType').combobox({
                    required: false
                })
            }
        });

        $('.liquidAmmonia').radiobox({});
        $('#inputLiquidAmmonia').on('click', function () {
            var liquidAmmonia = $('.liquidAmmonia').radiobox('getValues');
            if (liquidAmmonia === '1') {
                $('#liquidAmmoniaTypeView').show('slow');
                $('#liquidAmmoniaUseTypeView').show('slow');
                $('#liquidAmmoniaType').combobox({
                    required: true
                });
                $('#liquidAmmoniaUse').combobox({
                    required: true
                })
            } else {
                $('#liquidAmmoniaTypeView').hide('slow');
                $('#liquidAmmoniaUseTypeView').hide('slow');
                $('#liquidAmmoniaType').combobox({
                    required: false
                });
                $('#liquidAmmoniaUse').combobox({
                    required: false
                })
            }
        });

        $('.specialtyEquipment').radiobox({});
        $('#inputSpecialtyEquipment').on('click', function () {
            var specialtyEquipment = $('.specialtyEquipment').radiobox('getValues');
            if (specialtyEquipment === '1') {
                $('#specialtyEquipmentTypeView').show('slow');
                $('#specialtyEquipmentType').combobox({
                    required: true
                })
            } else {
                $('#specialtyEquipmentTypeView').hide('slow');
                $('#specialtyEquipmentType').combobox({
                    required: false
                })
            }
        });

        $('.dangerEquipment').radiobox({});
        $('#inputDangerEquipment').on('click', function () {
            var dangerEquipment = $('.dangerEquipment').radiobox('getValues');
            if (dangerEquipment === '1') {
                $('#dangerEquipmentTypeView').show('slow');
                $('#dangerEquipmentType').combobox({
                    required: true
                })
            } else {
                $('#dangerEquipmentTypeView').hide('slow');
                $('#dangerEquipmentType').combobox({
                    required: false
                })
            }
        });

        /**
         * 加载时初始化表单数据
         */
        function setData() {
            var me = this;
            //将企业ID放入表单中
            $("#enterpriseId").val(enterpriseId);

            G.ajax({
                url: me.apiOne + '?enterpriseId=' + enterpriseId,
                success: function (resultData) {
                    if (typeof resultData.data !== 'undefined') {
                        var data = resultData.data;
                        data.enterpriseId = enterpriseId;
                        me.formSubmit.form('setData', resultData.data);
                        var dangerChemicals = $('.dangerChemicals').radiobox('getValues');
                        var dust = $('.dust').radiobox('getValues');
                        var liquidAmmonia = $('.liquidAmmonia').radiobox('getValues');
                        var specialtyEquipment = $('.specialtyEquipment').radiobox('getValues');
                        var dangerEquipment = $('.dangerEquipment').radiobox('getValues');
                        if (dangerChemicals === '1') {
                            $('#dangerChemicalsView').show('slow');
                        }
                        if (dust === '1') {
                            $('#dustTypeView').show('slow');
                        }
                        if (liquidAmmonia === '1') {
                            $('#liquidAmmoniaTypeView').show('slow');
                            $('#liquidAmmoniaUseTypeView').show('slow');
                        }
                        if (specialtyEquipment === '1') {
                            $('#specialtyEquipmentTypeView').show('slow');
                        }
                        if (dangerEquipment === '1') {
                            $('#dangerEquipmentTypeView').show('slow');
                        }
                    }
                }
            });
        }

        function initdustTypeComboBox() {
            $('#dustType').combobox({
                url: '/api/system/dict/children?code=dustType',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }

        function initliquidAmmoniaTypeComboBox() {
            $('#liquidAmmoniaType').combobox({
                url: '/api/system/dict/children?code=liquidAmmoniaType',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }

        function initliquidAmmoniaUseComboBox() {
            $('#liquidAmmoniaUse').combobox({
                url: '/api/system/dict/children?code=liquidAmmoniaUse',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }

        function initspecialtyEquipmentTypeComboBox() {
            $('#specialtyEquipmentType').combobox({
                url: '/api/system/dict/children?code=specialtyEquipmentType',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                showNullItem: true
            });
        }

        return {
            apiInsert: '/api/enterprise/enterprise-danger-nature/insertOrUpdate',
            apiUpdate: '/api/enterprise/enterprise-danger-nature/update',
            apiOne: '/api/enterprise/enterprise-danger-nature/one',
            viewList: '/view/enterprise/enterprise-danger-nature/list',
            viewDetail: '/view/enterprise/enterprise-danger-nature/detail?enterpriseId=' + enterpriseId,
            apiPage: '/api/enterprise/enterprise-danger-nature/page',
            apiDelete: '/api/enterprise/enterprise-danger-nature/delete',
            apiAll: '/data/tree.json',
            setData: setData,
            initdustTypeComboBox: initdustTypeComboBox,
            initliquidAmmoniaTypeComboBox: initliquidAmmoniaTypeComboBox,
            initliquidAmmoniaUseComboBox: initliquidAmmoniaUseComboBox,
            initspecialtyEquipmentTypeComboBox: initspecialtyEquipmentTypeComboBox
        };
    });
    var pageModel = window.pageModel = new PageModel('危险特性');
    pageModel.bindEventByIdName();
    pageModel.initModuleTree();
    pageModel.setData();
    pageModel.initdustTypeComboBox();
    pageModel.initliquidAmmoniaTypeComboBox();
    pageModel.initliquidAmmoniaUseComboBox();
    pageModel.initspecialtyEquipmentTypeComboBox();

});

function getDangerChemicalsType() {
    return [{
        "value": "dangerChemicalsType_sc",
        "text": "生产",
        "group": ""
    }, {
        "value": "dangerChemicalsType_ycc",
        "text": "有存储设施经营",
        "group": "经营"
    }, {
        "value": "dangerChemicalsType_wcc",
        "text": "无存储设施经营",
        "group": "经营"
    }, {
        "value": "dangerChemicalsType_qtjy",
        "text": "其它经营",
        "group": "经营"
    }, {
        "value": "dangerChemicalsType_sy",
        "text": "使用",
        "group": ""
    }, {
        "value": "dangerChemicalsType_whp",
        "text": "危险化学品运输",
        "group": "运输"
    }, {
        "value": "dangerChemicalsType_rqgd",
        "text": "燃气管道运输",
        "group": "运输"
    }, {
        "value": "dangerChemicalsType_cc",
        "text": "储存",
        "group": ""
    }]
}

function getDangerEquipmentType() {
    return [{
        "value": "dangerChemicalsType_pj",
        "text": "冲剪烟设备模切压痕机（啤机）",
        "group": "冲剪压机械"
    }, {
        "value": "dangerChemicalsType_zs",
        "text": "注塑机械",
        "group": "冲剪压机械"
    }, {
        "value": "dangerChemicalsType_cj",
        "text": "冲剪压设备",
        "group": "冲剪压机械"
    }, {
        "value": "dangerChemicalsType_mg",
        "text": "木工机械",
        "group": "金属切削机械"
    }, {
        "value": "dangerChemicalsType_jz",
        "text": "建筑施工机械",
        "group": "金属切削机械"
    }, {
        "value": "dangerChemicalsType_sl",
        "text": "砂轮机",
        "group": "其它"
    }, {
        "value": "dangerChemicalsType_dh",
        "text": "电焊机",
        "group": "其它"
    }, {
        "value": "dangerChemicalsType_pd",
        "text": "皮带运输机",
        "group": "其它"
    }, {
        "value": "dangerChemicalsType_sc",
        "text": "手持电动工具和移动电器设备",
        "group": "其它"
    }]
}

