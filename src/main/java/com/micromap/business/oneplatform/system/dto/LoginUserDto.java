package com.micromap.business.oneplatform.system.dto;

import lombok.Data;

/**
 * @author limeng 2018/7/6
 */
@Data
public class LoginUserDto {
    /**
     * 用户ID
     */
    private Long id;
    /**
     * 用户ID(来自外部)
     */
    private String userId;
    /**
     * 姓名
     */
    private String userName;
    /**
     * 登录名（即用户名）
     */
    private String loginName;
    /**
     * 状态
     */
    private Integer status;
    /**
     * 用户标识 0 政府用户  1企业用户
     */
    private Integer userRole;
    /**
     * 部门ID
     */
    private Long deptId;
    /**
     * 部门名称
     */
    private String deptName;
    /**
     * 企业性质: 0管委会 1企业
     */
    private Integer deptCate;

    /**
     * 密码
     */
    private String password;
}
