package com.micromap.business.oneplatform.utils;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;

import static org.springframework.data.domain.ExampleMatcher.StringMatcher;
import static org.springframework.data.domain.ExampleMatcher.matching;

/**
 * @author limeng 2018/5/22
 */
public class QueryHelper {
    /**
     * 简单的查询方式（只能匹配string，其他类型只能等于）
     */
    public static <T> Example<T> queryByExample(T entity) {
        ExampleMatcher matcher = matching()
                .withStringMatcher(StringMatcher.DEFAULT)
                .withIgnorePaths("deleteState", "updatedTime", "createdTime")
                .withIgnoreCase(true)
                .withIgnoreNullValues();

        return Example.of(entity, matcher);
    }
}
