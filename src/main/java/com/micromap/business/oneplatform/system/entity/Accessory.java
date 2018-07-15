package com.micromap.business.oneplatform.system.entity;

import com.micromap.business.oneplatform.common.entity.BaseAuditEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * 文档附件
 *
 * @author limeng 2018/5/29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "S_ACCESSORY")
@Where(clause = "DELETE_STATE = 0")
public class Accessory extends BaseAuditEntity {
    /**
     * 业务Id
     */
    private Long businessId;
    /**
     * 文件名称
     */
    @NotBlank
    @Size(max = 255)
    private String name;
    /**
     * 存放路径
     */
    @NotBlank
    @Size(max = 255)
    private String path;
    /**
     * 文件原名称
     */
    @NotBlank
    @Size(max = 255)
    private String originName;
    /**
     * 文档类型
     */
    @NotBlank
    @Size(max = 255)
    private String contentType;
    /**
     * 文档大小(byte)
     */
    private Long fileSize;
    /**
     * 文档标记
     */
    private String mark;
}
