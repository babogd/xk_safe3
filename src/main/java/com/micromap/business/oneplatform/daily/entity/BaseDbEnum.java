package com.micromap.business.oneplatform.daily.entity;

import java.util.Objects;

public class BaseDbEnum {
    protected String name;
    protected Integer value;
    /**
     * 用于显示的枚举名
     *
     * @return
     */
    public String getText(){
        return this.name;
    }

    /**
     * 存储到数据库的枚举值
     *
     * @return
     */
    public Integer getValue(){
        return this.value;
    }

    //按枚举的value获取枚举实例
    static <T extends BaseDbEnum> T fromValue(Class<T> enumType, Integer value) {
        for (T object : enumType.getEnumConstants()) {
            if (Objects.equals(value, object.getValue())) {
                return object;
            }
        }
        throw new IllegalArgumentException("No enum value " + value + " of " + enumType.getCanonicalName());
    }
}