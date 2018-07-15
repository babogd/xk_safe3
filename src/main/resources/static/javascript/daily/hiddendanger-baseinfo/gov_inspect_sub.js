
var pageModel;

function addTab2(id, title, url, closable){
    var objId = "#"+id;
    var content = ".. .. ..";
    if (url) {
        content = '<iframe scrolling="auto" framebo' +
            '' +
            'rder="0"  src="' + url+ '" style="width:100%;height:100%;"></iframe>';
    }
    var hasEx = $(objId).tabs('exists', title);
    if (hasEx) {
        $('#tabs').tabs('select', text);
    } else {
        $(objId).tabs("add", {
            title : title,
            closable : closable,
            content : content
        });
    }
}

$(function(){
    var PageModel = P(Base, function() {

        return {
            apiInsert: '/hd/insert_danger',
            apiUpdate: '/api/system/dict/update',
            apiOne: '/api/system/dict/one',
            apiAll: '/api/system/dict/all'
        };
    });

    pageModel = window.pageModel = new PageModel('隐患');
    pageModel.bindEventByIdName();

    $('#hdList').datagrid({
        url:'#asd',
        rownumbers: true,
        columns:[[
            {field:'com_name',title:'单位名称', width:200},
            {field:'hd_desc',title:'隐患描述', width: 200},
            {field:'price',title:'隐患级别', width:100},
            {field:'price',title:'整改类型', width:100},
            {field:'price',title:'排查日期', width:150},
            {field:'price',title:'整改期限', width:150},
            {field:'price',title:'整改情况', width:150}
        ]]
    });
});


