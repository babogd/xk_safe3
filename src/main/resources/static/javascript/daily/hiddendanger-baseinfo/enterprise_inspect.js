
$(function(){
    var PageModel = P(Base, function() {

        return {
            viewList: '/hd/view/list',
            apiInsert: '/hd/insert_danger',
            apiUpdate: '/api/system/dict/update',
            apiOne: '/api/one',
            apiPage: '/hd/api/page'
        };
    });

    pageModel = window.pageModel = new PageModel('企业自查');
    pageModel.bindEventByIdName();

    initDataGridList();

});

/*
function initDataGridList(){
    $('#datagrid_list').datagrid({
        url: pageModel.apiPage,
        queryParams:pageModel.formSearch.serializeJSON(),
        singleSelect: true,
        rownumbers: true,
        pagination: true,
        autoRowHeight: true,
        fit: true,
        remoteSort: true,
        idField: 'id',
        columns:[[
            {field: 'id', checkbox: true},
            {field:'dept.dept_name',title:'单位名称', width:200, halign: 'center', align: 'left'},
            {field:'hd_desc',title:'隐患描述', width: 200, halign: 'center', align: 'left'},
            {field:'hdType.text',title:'隐患级别', width:150, halign: 'center', align: 'left'},
            {field:'neaten.neatenType.text',title:'整改类型', width:100, halign: 'center', align: 'left'},
            {field:'check_date',title:'排查日期', width:150, halign: 'center', align: 'left'},
            {field:'neaten.neaten_limit_date',title:'整改期限', width:150, halign: 'center', align: 'left'},
            {field:'neaten.neaten_situation',title:'整改情况', width:90, halign: 'center', align: 'left',
                formatter: function(value, row, index){
                    return dictText("neaten_state", value);
                }}
        ]]
    });
}
*/
