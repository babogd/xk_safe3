package com.micromap.business.oneplatform.daily.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.micromap.business.oneplatform.common.entity.BaseAuditEntity;
import com.micromap.business.oneplatform.system.entity.Dict;
import com.micromap.business.oneplatform.utils.LocalDateJsonDeserializer;
import com.micromap.business.oneplatform.utils.LocalDateTimeJsonDeserializer;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "C_HD_NEATEN")
@Where(clause = "DELETE_STATE = 0")
@EntityListeners(AuditingEntityListener.class)
public class Neaten extends BaseAuditEntity {

    /*
    	隐患标识
    */
    @Column(name = "HD_ID", scale = 18)
    private Long hd_id;

    /*
    	隐患整改责任人姓名
    */
    @Column(name = "NEATEN_PRINCIPAL_NAME", length = 50)
    @Size(max = 50)
    private String neaten_principal_name;

    /*
    	隐患整改责任单位名称
    */
    @Column(name = "NEATEN_DEPT_NAME", length = 128)
    @Size(max = 128)
    private String neaten_dept_name;

    /*
    	隐患整改类型;1：立即整改2：限期整改3：停产停业整顿
    */
    @Column(name = "NEATEN_TYPE", length = 32)
    @Size(max = 32)
    @NotBlank
    private String neaten_type;

    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "NEATEN_TYPE", referencedColumnName = "id", insertable = false, updatable = false)
    private Dict neatenType;

    /*
    	隐患整改资金(元)
    */
    @Column(name = "NEATEN_FUND", scale = 32, precision=8)
    @Digits(integer = 32, fraction = 8)
    private Double neaten_fund;

    /*
    	隐患整改期限
    */
    @JsonDeserialize(using = LocalDateJsonDeserializer.class)
    private LocalDate neaten_limit_date;

    /*
    	隐患整改完成日期
    */
    @JsonDeserialize(using = LocalDateJsonDeserializer.class)
    private LocalDate neaten_comp_date;

    /*
    	隐患整改措施
    */
    @Column(name = "NEATEN_MEASURE", length = 1024)
    @Size(max = 1024)
    private String neaten_measure;

    /*
    	整改情况;1：未整改2：已整改
    */
    @Column(name = "NEATEN_SITUATION", length = 32)
    @Size(max = 32)
    @NotBlank
    private String neaten_situation;

    @Column(name = "NEATEN_SITUATION", length = 32, insertable = false, updatable = false)
    @Type(type = "com.micromap.business.oneplatform.daily.entity.DbEnumType")
    private NeatenSituation neatenSituation;

    /*
    	整改目标是否到位
    */
    @Column(name = "IS_NEATEN_ARRIVE", scale = 1)
    private Integer is_neaten_arrive;

    /*
    	整改目标到位日期
    */
    @JsonDeserialize(using = LocalDateJsonDeserializer.class)
    private LocalDate neaten_arrive_date;

    /*
    	整改责任是否到位
    */
    @Column(name = "IS_DUTY_ARRIVE", scale = 1)
    private Integer is_duty_arrive;

    /*
    	整改责任到位日期
    */
    @JsonDeserialize(using = LocalDateJsonDeserializer.class)
    private LocalDate duty_arrive_date;

    /*
    	治理措施是否到位
    */
    @Column(name = "IS_MEASURE_ARRIVE", scale = 1)
    private Integer is_measure_arrive;

    /*
    	治理措施到位日期
    */
    @JsonDeserialize(using = LocalDateJsonDeserializer.class)
    private LocalDate measure_arrive_date;

    /*
    	整改资金是否到位
    */
    @Column(name = "IS_FUND_ARRIVE", scale = 1)
    private Integer is_fund_arrive;

    /*
    	整改资金到位日期
    */
    @JsonDeserialize(using = LocalDateJsonDeserializer.class)
    private LocalDate fund_arrive_date;

    /*
    	整改时限是否到位
    */
    @Column(name = "IS_TIMELIMIT_ARRIVE", scale = 1)
    private Integer is_timelimit_arrive;

    /*
    	整改时限到位日期
    */
    @JsonDeserialize(using = LocalDateJsonDeserializer.class)
    private LocalDate timelimit_arrive_date;

    /*
    	应急预案是否到位
    */
    @Column(name = "IS_PRESCHEMA_ARRIVE", scale = 1)
    private Integer is_preschema_arrive;

    /*
    	应急预案到位日期
    */
    @JsonDeserialize(using = LocalDateJsonDeserializer.class)
    private LocalDate preschema_arrive_date;

    /*
    	是否纳入治理计划
    */
    @Column(name = "IS_BRING_PLAN", scale = 1)
    private Integer is_bring_plan;

    /*
    	纳入治理计划日期
    */
    @JsonDeserialize(using = LocalDateJsonDeserializer.class)
    private LocalDate bring_plan_date;

    /*
    	整改是否为主
    */
    @Column(name = "IS_MAIN_NEATEN", scale = 1)
    private Integer is_main_neaten;

    /*
    	录入部门标识
    */
    @Column(name = "ENTER_DEPT_ID", scale = 18)
    private Long enter_dept_id;

    //@OneToOne(mappedBy="neaten")

    //private HiddenDanger hiddenDanger;

}

enum NeatenSituation implements IBaseDbEnum {

    NOT(1,"未整改"),
    YES(2,"已整改");

    private final Integer code;
    private final String text;
    NeatenSituation(Integer code, String text){
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

