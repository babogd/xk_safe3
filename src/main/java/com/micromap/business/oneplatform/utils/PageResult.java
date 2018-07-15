package com.micromap.business.oneplatform.utils;

import lombok.Data;

import java.util.List;

/**
 * 分页列表包装类
 *
 * @param <T>
 */
@Data
public class PageResult<T> {
    private List<T> rows;
    private long total;

    public PageResult(List<T> rows, long total) {
        this.rows = rows;
        this.total = total;
    }

    public PageResult(List<T> rows) {
        this.rows = rows;
        this.total = rows.size();
    }
}
