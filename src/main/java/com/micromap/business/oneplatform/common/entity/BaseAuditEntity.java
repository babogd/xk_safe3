package com.micromap.business.oneplatform.common.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.micromap.business.oneplatform.config.UserIgnoreSerializer;
import com.micromap.business.oneplatform.system.entity.User;
import com.micromap.business.oneplatform.utils.Constants;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @author limeng 2018/5/18
 */
@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(exclude = {"creator", "updator"})
public abstract class BaseAuditEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @Id
    @GenericGenerator(name = "auto_increment_id"
            , strategy = "com.micromap.business.oneplatform.config.SnowFlakeIdGenerator")
    @GeneratedValue(generator = "auto_increment_id")
    @Column(name = "ID", updatable = false, nullable = false, scale = 18, unique = true)
    private Long id;

    /**
     * 创建时间
     */
    @CreatedDate
    @Column(name = "CREATED_TIME")
    private LocalDateTime createdTime;

    /**
     * 修改日期
     */
    @LastModifiedDate
    @Column(name = "UPDATED_TIME")
    private LocalDateTime updatedTime;

    /**
     * 是否有效（1是，0否）
     */
    @Column(name = "DELETE_STATE", nullable = false)
    private Integer deleteState = Constants.ACTIVE;

    /**
     * 创建人
     */
    @CreatedBy
    @ManyToOne
    @JoinColumn(name = "CREATED_USER_ID", referencedColumnName = "ID")
    @JsonSerialize(using = UserIgnoreSerializer.class)
    private User creator;

    /**
     * 修改人
     */
    @LastModifiedBy
    @ManyToOne
    @JoinColumn(name = "UPDATED_USER_ID", referencedColumnName = "ID")
    @JsonSerialize(using = UserIgnoreSerializer.class)
    private User updator;
}
