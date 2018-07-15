package com.micromap.business.oneplatform.common.entity;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

/**
 * convert mini ui page param to pageable
 *
 * @author limeng 2018/5/28
 */
@ConfigurationProperties(prefix = "ui.param")
public class UiParam {
    /**
     * page index,default 0
     */
    private int page = 1;

    /**
     * data num of every page,default 10
     */
    private int rows = 10;

    /**
     * sort field,default "id"
     */
    private String sort = "id";

    /**
     * sort type(desc,asc),default "desc"
     */
    private SortOrder order = SortOrder.desc;

    public UiParam() {
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        if (!"".equals(sort)) {
            this.sort = sort;
        }
    }

    public SortOrder getOrder() {
        return order;
    }

    public void setOrder(SortOrder order) {
        if (order != null) {
            this.order = order;
        }
    }

    public Pageable toPageable() {
        return PageRequest.of(getPage() - 1,
                getRows(),
                Sort.Direction.fromString(getOrder().name()),
                getSort());
    }

    public enum SortOrder {
        asc, desc
    }
}
