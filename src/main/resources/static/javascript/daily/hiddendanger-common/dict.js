


/**
 * @Author Charlie高  20180703
 * @type {{name: string, dicts: *[]}}
 */

var dictList = [{name:"hd_level", dicts:[
        {code:"1", text:"一般隐患"},{code:"2", text:"重大隐患"}
    ]},
    {name:"neaten_state", dicts:[
        {code:"1", text:"未整改"},{code:"2", text:"已整改"}
    ]}
];

var dict_hdLevel = function(value,row,index){
    return dictText("hd_level", value);
};

var dict_neatenState = function(value,row,index){
    return dictText("neaten_state", value);
};


/**
 *
 * @param dictType 字典类型
 * @param dictCode 字典编码
 */
function dictText(dictType, dictCode){
    for(var i = 0; i < dictList.length; i ++){
        var el = dictList[i];
        if(el.name == dictType){
            for(var j = 0; j < el.dicts.length; j ++){
                var v = el.dicts[j];
                if(v.code == dictCode){
                    return v.text;
                }
            }
        }
    }
    return "";
}