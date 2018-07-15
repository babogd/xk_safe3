var pageModel;
var editBusiId;
$(function(){
    var PageModel = P(Base, function() {
        function saveAndUp(){
            $("[name='hd_isup']").val("1");
            this.save();
        }

        /**
         * 加载时初始化表单数据
         */
        function setData(hd_id) {
            var me = this;
            G.ajax({
                url: me.apiOne + '?id=' + hd_id,
                success: function(resultData) {
                    if (typeof resultData.data !== 'undefined') {
                        me.formSubmit.form('setData', resultData.data);
                        initData(resultData.data);
                    }
                }
            });
        }

        function initData(data){

            if(data.hd_source == "1"){
                $("#hd_src").textbox("setValue", "企业自查");
            }else{
                $("#hd_src").textbox("setValue", "政府排查");
            }

            $("#enterpriseName").textbox("setValue", data.dept.deptName);

            $("#neaten_id").val(data.neaten.id);

        }

        return {
            apiInsert: '/hd/api/add',
            apiUpdate: '/hd/api/add',
            apiOne: '/hd/api/one',
            apiAll: '/hd/api/page',
            apiFileUpload: '/api/system/accessory/upload',
            apiFileAll: '/api/system/accessory/all',
            apiFileDelete: '/api/system/accessory/delete',
            apiFileDownload: '/api/system/accessory/download',
            saveAndUp: saveAndUp,
            setData: setData
        };
    });

    pageModel = window.pageModel = new PageModel('隐患');
    pageModel.bindEventByIdName();
    if(hdLevel == '2'){
        pageModel.initAccessory('accessoryPreschema', 'preschema');
    }

    if(justShow){
        disableFormAllControl(pageModel.formSubmit);
        $("#enterpriseName").textbox({
            icons:[{}]
        });
    }

    if(editId && justShow){
        pageModel.setData(editId);
    }

    var showAccessory = undefined;
    if(justShow == true){
        showAccessory = false;
    }

    pageModel.initAccessory('accessoryBefore', 'before', editId, showAccessory);
    pageModel.initAccessory('accessoryAfter', 'after', editId, showAccessory);
});


function closeDeptDialog(){
    $("#dialog").dialog("close");
}

function chooseOneComp(e){
    G.open({
        url: "/hd/view/choose_dept?deptType=1&onlyOne=1",
        title: "选择公司",
        pageType: G.PAGE_TYPE.VIEW,
        ifrmId:"chDeptFrm",
        width:"80%",
        height:"80%",
        buttons:[
            {
                id:'btn_save',
                text:'确认并返回',
                handler:function(){
                    var inWin = document.getElementById('chDeptFrm').contentWindow;
                    var row = inWin.pageModel.getSelect(true);
                    var obj = $(e.data.target).textbox("setValue", row.deptName);
                    $("input[name='enterprise_id']").val(row.id);
                    closeDeptDialog();
                }
            },{
                text:'关闭',
                handler:function(){
                    closeDeptDialog();
                }
            }]
    });
}
