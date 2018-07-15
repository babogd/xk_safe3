package com.micromap.business.oneplatform.common.entity;


import java.util.Map;


import com.mitchellbosecke.pebble.template.EvaluationContext;


public class NvlFunction extends BaseResultFunction {
    public static final String FUNCTION_NAME = "nvl";

    public NvlFunction() {
        super(new String[]{"formName", "errorValue"});
    }

    public Object execute(Map<String, Object> args) {
        String formName = (String)args.get("formName");
        EvaluationContext context = (EvaluationContext)args.get("_context");
        Object rtnObj = this.getBindingResult(formName, context);
        Object errorValue = args.get("errorValue");
        return rtnObj == null? errorValue : rtnObj;
    }

}
