package com.micromap.business.oneplatform.daily.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.micromap.business.oneplatform.common.entity.BaseAuditEntity;
import com.micromap.business.oneplatform.system.entity.Dept;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;


/**
 * 移交及受理
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "C_HD_MOVE_INFO")
@Where(clause = "DELETE_STATE = 0")
@EntityListeners(AuditingEntityListener.class)
public class MoveInfo extends BaseAuditEntity {

    /*
    	隐患标识
    */
    @Column(name = "HD_ID", scale = 18)
    private Long hd_id;

    @ManyToOne
    @JoinColumn(name = "HD_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    @JsonIgnoreProperties("moveInfo")
    private HiddenDanger hiddenDanger;

    /*
    	移交日期
    */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate move_date;

    /*
    	移交人姓名
    */
    @Column(name = "MOVE_PSN_NAME", length = 50)
    @Size(max = 50)
    @NotBlank
    private String move_psn_name;

    /*
    	联系方式
    */
    @Column(name = "CONTACT", length = 16)
    @Size(max = 16)
    @NotBlank
    private String contact;

    /*
    	移交部门标识
    */
    @Column(name = "MOVE_DEPT_ID", scale = 18)
    private Long move_dept_id;

    @ManyToOne
    @JoinColumn(name = "MOVE_DEPT_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private Dept moveDept;

    /*
    	移交类型;1：系统内移交2：系统外移交
    */
    @Column(name = "MOVE_TYPE", length = 32)
    @Size(max = 32)
    @NotBlank
    private String move_type;

 /*    @OneToOne
@JoinColumn(name = "MOVE_TYPE", referencedColumnName = "DICT_CODE", insertable = false, updatable = false)
@Where(clause = "BUSI_CODE = 'hidden-danger-moveinfo' AND DICT_TYPE = 'move_type'")
        @Transient
    @Column(name = "MOVE_TYPE", length = 32, insertable = false, updatable = false)
    @Type(type = "com.micromap.business.oneplatform.daily.entity.DbEnumType")
    private MoveType moveType;


    @OneToOne
    @JoinColumn(name = "MOVE_TYPE", referencedColumnName = "DICT_CODE", insertable = false, updatable = false)
    private MoveTypeDict moveType2;*/

    /*
    	情况说明
    */
    @Column(name = "MOVE_DESC", length = 1024)
    @Size(max = 1024)
    private String move_desc;

    /*
    	受理结果;1：未受理2：同意受理3：退回
    */
    @Column(name = "ACCEPT_RESULT", length = 32)
    @Size(max = 32)
    @NotBlank
    private String accept_result;

    /*
    	系统内受理部门标识
    */
    @Column(name = "SYS_IN_ACCEPT_DEPT_ID", scale = 18)
    private Long sys_in_accept_dept_id;


    @OneToOne
    @JoinColumn(name = "SYS_IN_ACCEPT_DEPT_ID", referencedColumnName = "ID", updatable = false, insertable = false)
    private Dept acceptDept;



    /*
    	系统外受理部门名称
    */
    @Column(name = "SYS_OUT_ACCEPT_DEPT_NAME", length = 128)
    @Size(max = 128)
    private String sys_out_accept_dept_name;

    /*
    	受理人姓名
    */
    @Column(name = "ACCEPT_PSN_NAME", length = 50)
    @Size(max = 50)
    private String accept_psn_name;

    /*
    	受理日期
    */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate accept_date;

    /*
    	退回原因说明
    */
    @Column(name = "RETURN_CAUSE_DESC", length = 1024)
    @Size(max = 1024)
    private String return_cause_desc;

    /*
    	录入部门标识
    */
    @Column(name = "ENTER_DEPT_ID", scale = 18)
    private Long enter_dept_id;


    @Transient
    private List<Long> accessories = Collections.emptyList();


}

/*
enum MoveType implements IBaseDbEnum {

    SYS_IN(1,"系统内移交"),
    SYS_OUT(2,"系统外移交");

    private final Integer code;
    private final String text;
    MoveType(Integer code, String text){
        this.code = code;
        this.text = text;
    }
    public Integer getValue() {
        return code;
    }

    public String getText(){
        return  text;
    }
}
*/
