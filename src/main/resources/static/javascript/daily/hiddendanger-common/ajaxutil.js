if (typeof AjaxUtil !== 'object') {
    AjaxUtil = {};
}
(function () {
	if(typeof AjaxUtil.ajax !== "function"){
        AjaxUtil.ajax = function(url,param,type,async,dataType,successFun){
			if(type == undefined || !type){
				type = 'POST';
			}
			if(async == undefined || !async){
				async = false;
			}
			if(dataType == undefined || !dataType){
				dataType = 'text';
			}
			var rtn = null;
			$.ajax({
				type :  type,
				url : url,
				async : async,
				data : param,
				dataType: dataType,
				success : successFun?successFun:function(data, textStatus, jqXHR) {
					rtn = data;
				}
			});
			return rtn;
		};
	}
	if(typeof AjaxUtil.jsonAjax !== "function"){
		//同步ajax
        AjaxUtil.jsonAjax =function(url,param,successFun){
			return AjaxUtil.ajax (url,param,"POST",false,'json',successFun);
		};
	}

    if(typeof AjaxUtil.textAjax !== "function"){
        //同步ajax
        AjaxUtil.textAjax =function(url,param,successFun){
            return AjaxUtil.ajax (url,param,"POST",false,'text',successFun);
        };
    }


    if(typeof AjaxUtil.htmlAjax !== "function"){
        AjaxUtil.htmlAjax =function(url,param,successFun){
			return AjaxUtil.ajax (url,param,"GET",false,'html',successFun);
		};
	}
	if(typeof AjaxUtil.xmlAjax !== "function"){
        AjaxUtil.xmlAjax =function(url,param,type,async,successFun){
			return AjaxUtil.ajax (url,param,type,async,'xml',successFun);
		};
	}
}());