/**
 * 初始化dataGrid
 */
function initDataGridList(){
    $('#datagrid_list').datagrid({
        url: pageModel.apiPage,
        queryParams: pageModel.formSearch.serializeJSON(),
        singleSelect: true,
        rownumbers: true,
        pagination: true,
        autoRowHeight: true,
        fit: true,
        remoteSort: true,
        idField: 'id',
        columns:[[
            /* {field: 'id', checkbox: true},*/
            {field:'dept.deptName',title:'单位名称', width:200, halign: 'center', align: 'left'},
            {field:'hd_desc',title:'隐患描述', width: 200, halign: 'center', align: 'left',formatter:function(value,row,index){
                    return "<a href='javascript:showDetail(\""+index+"\")'>"+value+"</a>";
                }},
            {field:'hd_level',title:'隐患级别', width:150, halign: 'center', align: 'left',formatter:dict_hdLevel},
            {field:'neaten.neatenType.text',title:'整改类型', width:100, halign: 'center', align: 'left'},
            {field:'check_date',title:'排查日期', width:150, halign: 'center', align: 'left'},
            {field:'neaten.neaten_limit_date',title:'整改期限', width:150, halign: 'center', align: 'left'},
            {field:'neaten.neaten_situation',title:'整改情况', width:90, halign: 'center', align: 'left',formatter:dict_neatenState}
        ]]
    });
}


/**
 * 刷新列表
 */
function refreshGrid(){
    $('#datagrid_list').datagrid("reload");
}

/**
 * 关闭列表
 */
function closeDialog(){
    $("#dialog").dialog("close");
}

/**
 * 判断是否可移交
 * @param hd_id
 * @param currDeptId
 * @returns {boolean}
 */
function judgetIfCanMove(hd_id, curr_dept_id){
    var data = AjaxUtil.textAjax("/hd/api/judge_ifmove",{hd_id: hd_id, currDeptId: curr_dept_id});
    return data == '1' ? true : false;
}

/**
 * 判断是否可挂牌
 * @param hd_id
 * @returns {boolean}
 */
function judgetIfCanSupervise(hd_id){
    //目前可以反复挂牌
    if(1==1) return true;
    var data = AjaxUtil.textAjax("/hd/api/judge_ifsupervise",{hd_id: hd_id});
    return data == '0' ? true : false;

}

/**
 * 判断是否可删除隐患
 * @param hd_id
 * @param curr_dept_id
 */
function checkIfCanDelete(hd_id, curr_dept_id){
    var data = AjaxUtil.textAjax("/hd/api/checkIfCanDelete",{hd_id: hd_id, currDeptId: curr_dept_id});
    return data == '1' ? true : false;
}

/**
 * 判断是否可整改
 * @param hd_id
 */
function checkIfCanNeaten(hd_id, curr_dept_id){
    var data = AjaxUtil.textAjax("/hd/api/checkIfCanNeaten",{hd_id: hd_id, currDeptId: curr_dept_id});
    return data == '1' ? true : false;
}

function nowRow(){
    return $('#datagrid_list').datagrid("getSelected");
}


/**
 * 开始删除
 */
function deleteHd(){
    var row = nowRow();
    if(row == null || !row.id){
        G.fail("请选择要删除的隐患!")
        return;
    }

    var canMove = false;
    if(checkIfCanDelete(row.id, currDeptId)){
        canMove = true;
    }
    if(!canMove){
        G.fail("该隐患无法删除（已移交或挂牌）");
        return;
    }

    $.messager.confirm('请选择', '隐患删除后无法恢复，确认要删除吗？', function(r){
        if (r){
            deleteHiddenDanger(row.id);
        }
    });
}

/**
 * 删除逻辑
 */
function deleteHiddenDanger(hd_id){
    /*
    TODO:  实现删除逻辑
     */
    var json = AjaxUtil.jsonAjax("/hd/api/delete",{hd_id : hd_id});
    if(json.code == "200"){
        G.success("删除成功!");
        refreshGrid();
    }
}

/**
 * 整改方法（也用于修改）
 */
function neaten_hd(){
    var row = nowRow();
    if(row == null || !row.id){
        G.fail("请选择要整改的隐患!")
        return;
    }

    var canMove = false;
    if(checkIfCanNeaten(row.id, currDeptId)){
        canMove = true;
    }

    if(!canMove){
        G.fail("该隐患不可整改!");
        return;
    }

    var ifrmId = "HdEditFrm";
    var param = "id="+row.id+"&hd_level="+row.hd_level+"&hd_source="+row.hd_source;
    G.open({
        url: "/hd/view/neaten_hd?" + param,
        title: "隐患整改",
        pageType: G.PAGE_TYPE.EDIT,
        ifrmId: ifrmId,
        width:"60%",
        height:"80%",
        buttons:[
            {
                id:'btn_save',
                text:'保存',
                handler:function(){
                    var inWin = document.getElementById(ifrmId).contentWindow;
                    if(inWin.pageModel.save(true, row.id)){
                        refreshGrid();
                        closeDialog();
                    }
                }
            },{
                text:'关闭',
                handler:function(){
                    closeDialog();
                }
            }]
    });


}


/**
 * 开始挂牌
 */
function supervise(){

    var row = nowRow();
    if(row == null || !row.id){
        G.fail("请选择要挂牌的隐患!")
        return;
    }

    var canMove = false;
    if(judgetIfCanSupervise(row.id)){
        canMove = true;
    }

    if(!canMove){
        G.fail("该隐患已经被挂牌，不要重复操作!");
        return;
    }

    var ifrmId = "HdAddSuperviseFrm_" + row.id;
    G.open({
        url: "/hd/view/supervise?hd_id=" + row.id,
        title: "隐患挂牌督办",
        pageType: G.PAGE_TYPE.NEW,
        ifrmId: ifrmId,
        width:"60%",
        height:"80%",
        buttons:[
            {
                id:'btn_save',
                text:'保存',
                handler:function(){
                    var inWin = document.getElementById(ifrmId).contentWindow;
                    if(inWin.pageModel.save()){
                        refreshGrid();
                        closeDialog();
                    }
                }
            },{
                text:'关闭',
                handler:function(){
                    closeDialog();
                }
            }]
    });
}

/**
 * 开始登记隐患
 * @param hdSrc
 * @param hdLevel
 */
function add_hd(hdSrc, hdLevel, enterprise){
    var enterpriseSelf = enterprise ? enterprise: "0";
    var ifrmId = "HdAddFrm_" + hdSrc + "_" + hdLevel;
    G.open({
        url: "/hd/view/add_hd?hdSrc=" + hdSrc + "&hdLevel=" + hdLevel+"&enterpriseSelf="+enterpriseSelf,
        title: hdLevel=="1"?"登记一般隐患":"重大隐患",
        pageType: G.PAGE_TYPE.NEW,
        ifrmId: ifrmId,
        width:"60%",
        height:"80%",
        buttons:[
            {
                id:'btn_save',
                text:'保存',
                handler:function(){
                    var inWin = document.getElementById(ifrmId).contentWindow;
                    if(inWin.pageModel.save()){
                        refreshGrid();
                        closeDialog();
                    }
                }
            },{
                text:'关闭',
                handler:function(){
                    closeDialog();
                }
            }]
    });
}

/**
 * 开始移交
 */
function move(){
    var row = nowRow();
    if(row == null || !row.id){
        G.fail("请选择要移交的隐患!")
        return;
    }

    row.currDeptId = currDeptId;
    var canMove = false;

    if(judgetIfCanMove(row.id, currDeptId)){
        canMove = true;
    }

    if(!canMove){
        G.fail("无法移交该隐患!");
        return;
    }

    var ifrmId = "moveHDFrm_" + row.id;
    G.open({
        url: "/hd/view/move_detail?hd_id=" + row.id,
        title: '移交隐患',
        pageType: G.PAGE_TYPE.NEW,
        ifrmId: ifrmId,
        width:"60%",
        height:"80%",
        buttons:[
            {
                id:'btn_save',
                text:'保存',
                handler:function(){
                    var inWin = document.getElementById(ifrmId).contentWindow;
                    if(inWin.pageModel.saveForm()){
                        closeDialog();
                        refreshGrid();
                    }
                }
            },{
                text:'关闭',
                handler:function(){
                    closeDialog();
                }
            }]
    });
}