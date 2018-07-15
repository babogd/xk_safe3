var pageModel;

$(function(){

    $("#move_type").combobox({
        onChange:function(newValue, oldValue){
            if(newValue == '2'){
                $("#acceptDept").combotree("clear");
                //$("#acceptDept").combotree("loadData",[]);
                $("#acceptDept").combotree({"editable" : true});

                /* $("#acceptDeptNameDiv").show();
                 $("#acceptDeptDiv").hide();*/
            }else{
                $("#acceptDept").combotree("clear");
                //$("#acceptDept").combotree("reload");
                $("#acceptDept").combotree({"editable" : false});
               /* $("#acceptDeptDiv").show();
                $("#acceptDeptNameDiv").hide();*/
            }
        }

    });

    var PageModel = P(Base, function() {
        function saveForm(){
            var moveType = $("#move_type").combobox("getValue");
            if(moveType == '2'){
                $("[name='sys_in_accept_dept_id']").val("");
                $("[name='sys_out_accept_dept_name']").val($("#acceptDept").combotree("getText"));
            }else if(moveType == '1'){
                var selectAcceptDept = $("#acceptDept").combotree("getValue");
                $("[name='sys_in_accept_dept_id']").val($("#acceptDept").combotree("getValue"));
                $("[name='sys_outaccept_dept_name']").val("");
                if(selectAcceptDept == nowDeptId){
                    G.fail("移交部门和受理部门不能相同，请重新选择");
                    return false;
                }

            }

            if(!this.save()) return false;
            return true;

        }
        return {
            apiInsert: '/hd/api/moveinfo/add',
            apiFileUpload: '/api/system/accessory/upload',
            apiFileAll: '/api/system/accessory/all',
            apiFileDelete: '/api/system/accessory/delete',
            apiFileDownload: '/api/system/accessory/download',
            saveForm: saveForm
        };
    });

    pageModel = window.pageModel = new PageModel('移交');
    pageModel.bindEventByIdName();
    pageModel.initAccessory('accessory', 'one', null, true);
});


function closeDeptDialog(){
    $("#dialog").dialog("close");
}
