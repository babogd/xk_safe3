package com.micromap.business.oneplatform.daily.entity;

import java.util.Objects;

public interface IBaseDbEnum {
    /**
     * 用于显示的枚举名
     *
     * @return
     */
    String getText();

    /**
     * 存储到数据库的枚举值
     *
     * @return
     */
    Integer getValue();

    //按枚举的value获取枚举实例
    static <T extends IBaseDbEnum> T fromValue(Class<T> enumType, Integer value) {
        for (T object : enumType.getEnumConstants()) {
            if (Objects.equals(value, object.getValue())) {
                return object;
            }
        }
        throw new IllegalArgumentException("No enum value " + value + " of " + enumType.getCanonicalName());
    }
}