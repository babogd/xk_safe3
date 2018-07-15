package com.micromap.business.oneplatform.daily.entity;

enum HdSource implements IBaseDbEnum {

    SELF(1,"企业自查"),
    GOV(2,"政府排查");

    public final Integer code;
    public final String text;
    HdSource(Integer code, String text){
        this.code = code;
        this.text = text;
    }
    public Integer getValue() {
        return code;
    }

    public String getText(){
        return  text;
    }
}
