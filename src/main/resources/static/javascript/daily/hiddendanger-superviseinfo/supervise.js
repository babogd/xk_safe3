var pageModel;

$(function(){

    var PageModel = P(Base, function() {
        function saveForm(){

            if(!this.save()) return false;
            return true;

        }
        return {
            apiInsert: '/hd/api/supervise/add',
            saveForm: saveForm
        };
    });

    pageModel = window.pageModel = new PageModel('挂牌');
    pageModel.bindEventByIdName();
});


function closeDialog(){
    $("#dialog").dialog("close");
}
