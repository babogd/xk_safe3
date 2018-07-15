package com.micromap.business.oneplatform.system.entity;


import com.micromap.business.oneplatform.common.entity.BaseAuditEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.Size;

/**
 * 系统用户表
 *
 * @author charlie高 20180706
 */
@EqualsAndHashCode(callSuper = false, exclude = {"dept"})
@Data
@Entity
@Table(name = "JDP_OU_USER")
@Where(clause = "DELETE_STATE = 0")
public class User extends BaseAuditEntity {

    /*
    	用户ID
    */
    @Column(name = "USER_ID", length = 50)
    @Size(max = 50)
    private String userId;

    /*
    	姓名
    */
    @Column(name = "USER_NAME", length = 50)
    @Size(max = 50)
    private String userName;

    /*
    	登录名
    */
    @Column(name = "LOGIN_NAME", length = 50)
    @Size(max = 50)
    private String loginName;

    /*
    	状态
    */
    @Column(name = "STATUS", scale = 1)
    private Integer status;

    /*
    	排序
    */
    @Column(name = "SORT_NUM", scale = 1)
    private Integer sortNum;

    /*
    	0 政府用户  1企业用户
    */
    @Column(name = "USER_ROLE", scale = 1)
    private Integer userRole;


    /**
     * 所属部门
     */
    @ManyToOne
    @JoinColumn(name = "DEPT_ID", referencedColumnName = "ID")
    @NotFound(action = NotFoundAction.IGNORE)
    private Dept dept;

}
