package com.micromap.business.oneplatform.daily.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.micromap.business.oneplatform.common.entity.BaseAuditEntity;
import com.micromap.business.oneplatform.utils.LocalDateJsonDeserializer;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;


@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "C_HD_SUPERVISE_INFO")
@Where(clause = "DELETE_STATE = 0")
@EntityListeners(AuditingEntityListener.class)
public class SuperviseInfo extends BaseAuditEntity {

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
    	挂牌日期
    */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonDeserialize(using = LocalDateJsonDeserializer.class)
    private LocalDate hd_brand_date;

    /*
    	挂牌督办级别;1：国家级挂牌督办2：省级挂牌督办3：地市级挂牌督办4：县（市）、区（管委会）级挂牌督办5：乡镇级挂牌督办
    */
    @Column(name = "HD_SUPERVISE_LEVEL_CODE", length = 32)
    @Size(max = 32)
    @NotBlank
    private String hd_supervise_level_code;

    /*
    	挂牌单位名称
    */
    @Column(name = "HD_SUPERVISE_DEPT_NAME", length = 128)
    @Size(max = 128)
    @NotBlank
    private String hd_supervise_dept_name;

    /*
    	销号单位名称
    */
    @Column(name = "HD_CANCEL_DEPT_NAME", length = 128)
    @Size(max = 128)
    @NotBlank
    private String hd_cancel_dept_name;

    /*
    	督办文号
    */
    @Column(name = "HD_SUPERVISE_DOCNO", length = 128)
    @Size(max = 128)
    @NotBlank
    private String hd_supervise_docno;

    /*
    	督办要求
    */
    @Column(name = "HD_SUPERVISE_APPEAL", length = 1024)
    @Size(max = 1024)
    @NotBlank
    private String hd_supervise_appeal;

    /*
    	是否销案
    */
    @Column(name = "HD_SUPERVISE_IS_CANCEL", scale = 1)
    private Integer hd_supervise_is_cancel;

    /*
    	销案日期
    */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonDeserialize(using = LocalDateJsonDeserializer.class)
    private LocalDate hd_cancel_date;

    /*
    	销案说明
    */
    @Column(name = "HD_CANCEL_DESC", length = 1024)
    @Size(max = 1024)
    private String hd_cancel_desc;

    /*
    	是否主挂牌
    */
    @Column(name = "HD_IS_MAIN_SUPERVISE", scale = 1)
    private Integer hd_is_main_supervise;

    /*
    	录入部门标识
    */
    @Column(name = "ENTER_DEPT_ID", scale = 18)
    private Long enter_dept_id;


}
