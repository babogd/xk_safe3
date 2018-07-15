package com.micromap.business.oneplatform.system.entity;

import com.micromap.business.oneplatform.common.entity.BaseAuditEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * @author limeng 2018/5/25
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "S_DICT")
@Where(clause = "DELETE_STATE = 0")
public class Dict extends BaseAuditEntity {
    /**
     * 类型编码
     */
    @NotBlank
    @Size(max = 255)
    private String code;

    /**
     * 名称
     */
    @NotBlank
    @Size(max = 255)
    private String text;

    /**
     * 上级字典
     */
    @ManyToOne
    @JoinColumn(name = "PID", referencedColumnName = "ID")
    @NotFound(action = NotFoundAction.IGNORE)
    private Dict parent;

    /**
     * 排序号
     */
    private Integer sortNum;
}
