
var pageModel;


$(function(){
    var PageModel = P(Base, function() {
        return {
            viewList: '/hd/view/list2',
            apiInsert: '/hd/api/assign/save',
            apiPage: '/hd/api/assign/page2',
            apiFileUpload: '/api/system/accessory/upload',
            apiFileAll: '/api/system/accessory/all',
            apiFileDelete: '/api/system/accessory/delete',
            apiFileDownload: '/api/system/accessory/download'
        };
    });

    pageModel = window.pageModel = new PageModel('隐患');
    pageModel.bindEventByIdName();
    pageModel.initAccessory('accessory', 'one', moveId, false);

    //initData();
});

function initData(){
    var moveData = AjaxUtil.jsonAjax("/hd/api/moveinfo/one?",{id:moveId});
    //console.log(moveData);
}


