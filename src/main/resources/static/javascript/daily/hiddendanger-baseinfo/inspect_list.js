
var pageModel;

$(function(){
    var PageModel = P(Base, function() {

        return {
            viewList: '/hd/view/list',
            apiInsert: '/hd/insert_danger',
            apiUpdate: '/hd/update_danger',
            apiPage: '/hd/api/page'
        };
    });

    pageModel = window.pageModel = new PageModel('隐患');
    pageModel.bindEventByIdName();

    initDataGridList();
});

function showDetail(idx){
    var rows = $('#datagrid_list').datagrid("getRows");
    var row = rows[idx];
    var ifrmId = "hdShowFrm";
    var param = "id="+row.id+"&hd_level="+row.hd_level+"&hd_source="+row.hd_source;
    G.open({
        url: "/hd/view/hd_info_list?" + param,
        title: "查看隐患详情",
        pageType: G.PAGE_TYPE.VIEW,
        ifrmId: ifrmId,
        width:"88%",
        height:"80%",
        buttons:[
           {
              text:'关闭',
              handler:function(){
                closeDialog();
              }
           }]
    });
}

