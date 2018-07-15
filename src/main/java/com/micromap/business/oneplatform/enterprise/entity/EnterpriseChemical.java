package com.micromap.business.oneplatform.enterprise.entity;

import com.micromap.business.oneplatform.common.entity.BaseAuditEntity;
import com.micromap.business.oneplatform.system.entity.Dict;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collections;
import java.util.List;

/**
 * @author limeng 2018/5/21
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "C_EI_CHEMICAL")
@Where(clause = "DELETE_STATE = 0")
public class EnterpriseChemical extends BaseAuditEntity {
    /**
     * 企业标识
     */
    @Column(name = "ENTERPRISE_ID", scale = 18, nullable = false)
    private Long enterpriseId;

    /**
     * 化学品MSDS标识
     */
    @Column(name = "MSDS_ID", length = 128)
    @NotBlank
    private String medsId;

    /**
     * 化学品中文名称
     */
    @Column(name = "CHEMICAL_CNAME", length = 50)
    @Size(max = 50)
    private String chemicalCName;

    /**
     * 化学品英文名称
     */
    @Column(name = "CHEMICAL_ENAME", length = 50)
    @Size(max = 50)
    private String chemicalEName;

    /**
     * CAS号
     */
    @Column(name = "CAS_CODE", length = 128)
    @Size(max = 128)
    private String casCode;

    /**
     * 危化品目录序号
     */
    @Column(name = "CATALOG_NO", length = 128)
    @Size(max = 128)
    private String catalogNo;

    /**
     * 危化品作用
     */
    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "CHEMICAL_USE", referencedColumnName = "id")
    private Dict chemicalUse;

    /**
     * 年用量或产量（T）
     */
    @Column(name = "YEAR_USE_QTY", scale = 12, precision = 6)
    @Digits(integer = 12, fraction = 6)
    private Double yearUseQty;

    /**
     * 最大储存量（T）
     */
    @Column(name = "MAX_STOR_QTY", scale = 12, precision = 6)
    @Digits(integer = 12, fraction = 6)
    private Double maxStorQty;

    /**
     * 储存方式/地点
     */
    @Column(name = "STOR_MODE", length = 512)
    @Size(max = 512)
    private String storMode;

    /**
     * 是否重点监管危化品
     */
    @Column(name = "IS_IMPORT_CHEM", scale = 1)
    private Integer isImportChem;

    /**
     * 是否剧毒化学品
     */
    @Column(name = "IS_TOXIC", scale = 1)
    private Integer isToxic;

    /**
     * 是否易制毒
     */
    @Column(name = "IS_PRECURSOR", scale = 1)
    private Integer isPrecursor;

    /**
     * 是否易制爆
     */
    @Column(name = "IS_BLAST", scale = 1)
    private Integer isBlast;

    /**
     * 录入部门标识
     */
    @Column(name = "ENTER_DEPT_ID", scale = 18)
    private Long enterDeptId;

    @Transient
    private List<Long> accessories = Collections.emptyList();
}
