
var pageModel;


$(function(){
    var PageModel = P(Base, function() {

        return {
            viewList: '/hd/view/list',
            apiInsert: '/hd/insert_danger',
            apiPage: '/hd/api/assign/page'
        };
    });

    pageModel = window.pageModel = new PageModel('交办');
    pageModel.bindEventByIdName();

    initDataGridList();
});

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
            {field:'hiddenDanger.dept.dept_name',title:'单位名称', width:200, halign: 'center', align: 'left'},
            {field:'hiddenDanger.hd_desc',title:'隐患描述', width: 200, halign: 'center', align: 'left'},
            {field:'hiddenDanger.hdType.text',title:'隐患级别', width:150, halign: 'center', align: 'left'},
            {field:'move_date',title:'移交日期', width:150, halign: 'center', align: 'left'},
            {field:'',title:'移交部门', width:150, halign: 'center', align: 'left'},
            {field:'hiddenDanger.neaten.neaten_situation',title:'整改情况', width:90, halign: 'center', align: 'left',
                formatter: function(value, row, index){
                    return dictText("neaten_state", value);
                }}
        ]]
    });
}

function move(){
    var row = $('#datagrid_list').datagrid("getSelected");
    if(row == null){
        G.fail("请选择要移交的隐患!")
        return;
    }
    var ifrmId = "moveHDFrm_" + row.id;
    G.open({
        url: "/hd/view/m?hd_id=" + row.id,
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
                    inWin.pageModel.saveForm();
                    //$("#dialog").dialog("close");
                }
            },{
                text:'关闭',
                handler:function(){
                    $("#dialog").dialog("close");
                }
            }]
    });
}


