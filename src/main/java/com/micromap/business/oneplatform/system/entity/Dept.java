package com.micromap.business.oneplatform.system.entity;

import com.micromap.business.oneplatform.common.entity.BaseAuditEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.Size;

/**
 * 系统部门表
 *
 * @author charlie高 20180706
 */
@EqualsAndHashCode(callSuper = true, exclude = "")
@Data
@Entity
@Table(name = "JDP_OU_DEPT")
@Where(clause = "DELETE_STATE = 0")
public class Dept extends BaseAuditEntity {

    /*
    	部门ID
    */
    @Column(name = "DEPT_ID", length = 50)
    @Size(max = 50)
    private String deptId;

    /*
    	部门名称
    */
    @Column(name = "DEPT_NAME", length = 100)
    @Size(max = 100)
    private String deptName;

    /*
    	代码
    */
    @Column(name = "DEPT_CODE", length = 100)
    @Size(max = 100)
    private String deptCode;

    /*
    	类型
    */
    @Column(name = "DEPT_TYPE", scale = 1)
    private Integer deptType;

    /*
    	父节点
    */
    @Column(name = "PARENT", length = 50)
    @Size(max = 50)
    private String parent;

    /*
    	负责人
    */
    @Column(name = "TEAM_LEADER", length = 50)
    @Size(max = 50)
    private String teamLeader;

    /*
    	上级主管
    */
    @Column(name = "PARENT_SUPERVISOR", length = 50)
    @Size(max = 50)
    private String parentSupervisor;

    /*
    	状态
    */
    @Column(name = "STATUS", scale = 1)
    private Integer status;

    /*
    	所属组织ID
    */
    @Column(name = "ORG_ID", length = 50)
    @Size(max = 50)
    private String orgId;

    /*
    	排序
    */
    @Column(name = "SORT_NUM", scale = 1)
    private Integer sortNum;

    /*
        企业性质: 0管委会 1企业
    */
    @Column(name = "DEPT_CATE", scale = 1)
    private Integer deptCate;

/*    @OneToOne
    @JoinColumn(name="DEPT_ID", referencedColumnName = "DEPT_ID")
    private DeptOrigin origin;*/

    @Column(name = "IS_LEAF", scale = 1)
    private Integer isLeaf;

    @Column(name = "DEPT_PATH", length = 2000)
    @Size(max = 2000)
    private String deptPath;

    /*
        上级部门ID
    */
    @Column(name = "PARENT_ID", scale = 18)
    private Long parentId;

    /*
        部门层级
     */
    @Column(name = "DEPT_LEVEL")
    private Integer deptLevel;
}
