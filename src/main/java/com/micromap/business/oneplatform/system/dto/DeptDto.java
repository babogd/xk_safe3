package com.micromap.business.oneplatform.system.dto;

import lombok.Data;

@Data
public class DeptDto {
    /**
     * 单位名称
     */
    private String dept_name;
    /**
     * 单位编码
     */
    private String dept_code;
    /**
     * 单位类型（旧系统）
     */
    private String dept_type;
    /**
     * 单位类别(0管委会  1企业)
     */
    private String dept_cate;
    /**
     * 负责人
     */
    private String team_leader;
}
