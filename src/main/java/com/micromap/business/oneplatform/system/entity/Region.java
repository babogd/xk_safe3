package com.micromap.business.oneplatform.system.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Create By Fighting on 2018/6/19 0019
 * 行政区实体类
 */
@EqualsAndHashCode(callSuper = false)
@Data
@Entity
@Table(name = "JDP_CODE_REGION")
@EntityListeners(AuditingEntityListener.class)
public class Region implements Serializable {
    private static final long serialVersionUID = 1L;
    /**
     * 行政区编码
     */
    @Id
    private String regionCode;
    /**
     * 行政区名称
     */
    private String regionName;
    /**
     * 父节点编码
     */
    private String parentCode;
    /**
     * 省份编码
     */
    private String provinceCode;
    /**
     * 城市编码
     */
    private String cityCode;
    /**
     * 区县编码
     */
    private String countyCode;
    /**
     * 乡镇编码
     */
    private String townCode;
    /**
     * 行政区全称
     */
    private String allReginName;


}
