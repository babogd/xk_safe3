package com.micromap.business.oneplatform.utils;


import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import java.beans.FeatureDescriptor;
import java.util.stream.Stream;

/**
 * @author limeng 2018/2/6
 */
public class BeanUtils {
    /**
     * 复制source的属性到target，忽略source中为null的属性
     *
     * @param source 源
     * @param target 目标
     */
    public static void copyFormToEntity(Object source, Object target) {
        org.springframework.beans.BeanUtils.copyProperties(source, target, getNullPropertyNames(source));
    }

    /**
     * 获取source属性中为null的属性
     *
     * @param source 源
     * @return 属性为null的字符串属性数组
     */
    public static String[] getNullPropertyNames(Object source) {
        final BeanWrapper wrappedSource = new BeanWrapperImpl(source);
        return Stream.of(wrappedSource.getPropertyDescriptors())
                .map(FeatureDescriptor::getName)
                .filter(propertyName -> wrappedSource.getPropertyValue(propertyName) == null)
                .toArray(String[]::new);
    }
}
