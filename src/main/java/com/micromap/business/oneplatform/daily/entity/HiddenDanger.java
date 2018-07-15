package com.micromap.business.oneplatform.daily.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.micromap.business.oneplatform.common.entity.BaseAuditEntity;
import com.micromap.business.oneplatform.system.entity.Dept;
import com.micromap.business.oneplatform.system.entity.Dict;
import com.micromap.business.oneplatform.utils.LocalDateJsonDeserializer;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "C_HD_HIDDENDANGERINFO")
@Where(clause = "DELETE_STATE = 0")
@EntityListeners(AuditingEntityListener.class)
public class HiddenDanger extends BaseAuditEntity {

    /*
    	隐患等级;1：一般隐患2：重大隐患
    */
    @Column(name = "HD_LEVEL", length = 32)
    @Size(max = 32)
    @NotBlank
    private String hd_level;

    @Column(name = "HD_LEVEL", length = 32, insertable = false, updatable = false)
    @Type(type = "com.micromap.business.oneplatform.daily.entity.DbEnumType")
    private HdLevel hdLevel;

    /*
    	隐患来源;1：企业自查2：政府排查3：中介检查4：网格检查
    */
    @Column(name = "HD_SOURCE", length = 32)
    @Size(max = 32)
    @NotBlank
    private String hd_source;

    @Column(name = "HD_SOURCE", length = 32, insertable = false, updatable = false)
    @Type(type = "com.micromap.business.oneplatform.daily.entity.DbEnumType")
    private HdSource hdSource;


    /*@ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "HD_SOURCE", referencedColumnName = "id", insertable = false, updatable = false)
    private Dict hdSource;*/

    /*
    	企业标识
    */
    @Column(name = "ENTERPRISE_ID", scale = 18)
    private Long enterprise_id;

    /*
        企业名称
     */
    @Transient
    private String enterprise_name;

    /*
    	排查日期
    */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonDeserialize(using = LocalDateJsonDeserializer.class)
    private LocalDate check_date;

    /*
    	排查人姓名
    */
    @Column(name = "CHECKER_NAME", length = 50)
    @Size(max = 50)
    private String checker_name;

    /*
    	隐患类别
    */
    @Column(name = "HD_TYPE", length = 32)
    @Size(max = 32)
    @NotBlank
    private String hd_type;

    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "HD_TYPE", referencedColumnName = "id", insertable = false, updatable = false)
    private Dict hdType;

    /*
    	隐患地点
    */
    @Column(name = "HD_LOCATION", length = 128)
    @Size(max = 128)
    private String hd_location;

    /*
    	隐患部位
    */
    @Column(name = "HD_POSITION", length = 128)
    @Size(max = 128)
    private String hd_position;

    /*
    	监管责任人姓名
    */
    @Column(name = "SUPERVISE_PRINCIPAL_NAME", length = 50)
    @Size(max = 50)
    private String supervise_principal_name;

    /*
    	隐患描述
    */
    @Column(name = "HD_DESC", length = 1024)
    @Size(max = 1024)
    @NotBlank
    private String hd_desc;

    /*
    	隐患报告摘要
    */
    @Column(name = "HD_SUMMARY", length = 1024)
    @Size(max = 1024)
    private String hd_summary;

    /*
    	排查单位
    */
    @Column(name = "CHECK_DEPT_ID", scale = 18)
    private Long check_dept_id;

    /*
    	排查科室
    */
    @Column(name = "CHECK_OFFICE_ID", scale = 18)
    private Long check_office_id;

    /*
    	监管部门标识
    */
    @Column(name = "SUPERVISE_DEPT_ID", scale = 18)
    private Long supervise_dept_id;

    /*
    	整改责任部门名称
    */
    @Column(name = "NEATEN_DUTY_DEPT_NAME", length = 128)
    @Size(max = 128)
    private String neaten_duty_dept_name;

    /*
    	监管分类
    */
    @Column(name = "REGULATORY_TYPE_CODE", length = 32)
    @Size(max = 32)
    private String regulatory_type_code;

    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "REGULATORY_TYPE_CODE", referencedColumnName = "id", insertable = false, updatable = false)
    private Dict regulatoryType;

    /*
    	隐患是否上报
    */
    @Column(name = "HD_ISUP", scale = 1)
    private Integer hd_isup;

    /*
    	隐患上报日期
    */
    private LocalDateTime hd_up_date;

    /*
    	隐患上报人员
    */
    @Column(name = "HD_UP_PERSON", scale = 18)
    private Long hd_up_person;

    /*
    	录入部门标识
    */
    @Column(name = "ENTER_DEPT_ID", scale = 18)
    private Long enter_dept_id;

    /*
        整改信息
    */
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="NEATEN_ID", referencedColumnName = "ID")
    private Neaten neaten;

    @Transient
    private List<Long> accessories = Collections.emptyList();

    @Transient
    /**
     * 整改状态： 查询用：1 超期
     */
    private String neatenState;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name="ENTERPRISE_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private Dept dept;

    @Transient
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate check_date_start;

    @Transient
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate check_date_end;

    /*
    	当前移交受理ID
    */
    @Column(name = "MOVE_INFO_ID", scale = 18)
    private Long move_info_id;

    @OneToOne
    @JoinColumn(name = "MOVE_INFO_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private MoveInfo moveInfo;

    /*
        当前处理人
     */
    @Column(name = "CURR_HANDLE_dept_ID", scale = 18)
    private Long curr_handle_dept_id;
}

enum HdLevel implements IBaseDbEnum {

    GEN(1,"一般隐患"),
    SER(2,"重大隐患");

    private final Integer code;
    private final String text;
    HdLevel(Integer code, String text){
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

