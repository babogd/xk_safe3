function addTab(id, title, url, closable, selected){
    var content = '<iframe src="'+url+'" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="auto" width="100%" height="100%"></iframe>';

   /* AjaxUtil.htmlAjax(url,{},function(data){
        content = '<iframe frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="auto" width="100%" height="100%">'+data+'</iframe>';
    });*/
    $('#' + id).tabs('add', {
        title : title,
        selected : selected?true:false,
        closable : closable,
        content : content
    });
}


//ff=formobject= $("#editform")
//禁用form内所有控件
function disableFormAllControl(fm)
{
    $("input[textboxname]",fm).each(function(idx,obj) {
        $(obj).textbox('readonly', true);
    });
    $("input[switchbuttonname]",fm).each(function(idx,obj) {
        $(obj).switchbutton('readonly', true);
    });
    $(".easyui-linkbutton",fm).each(function(idx,obj) {
        $(obj).linkbutton('readonly', true);
    });
    $(".easyui-radiobox", fm).each(function(idx, obj){
       $(obj).radiobox('readonly');
    });
}


function toUrlParam(p) {
    var str = "";
    var sum = 0;
    for ( var i in p) {
        var typeStr = typeof (p[i]);
        if (sum > 0) {
            str += "&";
        }
        if (typeStr == "string" || typeStr == "number" || typeStr == "boolean") {
            str += i + "=" + encodeURIComponent(p[i]);
        }
        sum++;
    }
    return str;
}

//禁用form表单中所有的input[文本框、复选框、单选框],select[下拉选],多行文本框[textarea]

function disableForm(formId,isDisabled) {

    var attr="disable";
    if(!isDisabled){
        attr="enable";
    }
    $("form[id='"+formId+"'] :text").attr("disabled",isDisabled);
    $("form[id='"+formId+"'] textarea").attr("disabled",isDisabled);
    $("form[id='"+formId+"'] select").attr("disabled",isDisabled);
    $("form[id='"+formId+"'] :radio").attr("disabled",isDisabled);
    $("form[id='"+formId+"'] :checkbox").attr("disabled",isDisabled);

    //禁用jquery easyui中的下拉选（使用input生成的combox）

    $("#" + formId + " input[class='combobox-f combo-f']").each(function () {
        if (this.id) {alert("input"+this.id);
            $("#" + this.id).combobox(attr);
        }
    });

    //禁用jquery easyui中的下拉选（使用select生成的combox）
    $("#" + formId + " select[class='combobox-f combo-f']").each(function () {
        if (this.id) { k
            $("#" + this.id).combobox(attr);
        }
    });

    //禁用jquery easyui中的日期组件dataBox
    $("#" + formId + " input[class='datebox-f combo-f']").each(function () {
        if (this.id) {
            $("#" + this.id).datebox(attr);
        }
    });
}