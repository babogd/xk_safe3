package com.micromap.business.oneplatform.daily.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.micromap.business.oneplatform.common.entity.BaseAuditEntity;
import com.micromap.business.oneplatform.system.entity.Dept;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Where;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import javax.persistence.*;

import javax.validation.constraints.Size;



/**
 * 业务字典
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "S_BUSI_DICT")
@EntityListeners(AuditingEntityListener.class)
public class BusiDict extends BaseAuditEntity {


    public BusiDict(){

    }
    public BusiDict(String busiCode, String dictCode){
        this.busi_code = busiCode;
        this.dict_code = dictCode;
    }
    /*
        业务编码（自定义）
    */
    @Column(name = "BUSI_CODE", length = 100)
    @Size(max = 100)
    private String busi_code;

    /*
    	字典编码（标识）
    */
    @Column(name = "DICT_CODE", length = 100)
    @Size(max = 100)
    private String dict_code;

    /*
    	字典名称
    */
    @Column(name = "DICT_NAME", length = 100)
    @Size(max = 100)
    private String dict_name;

    /*
    	字典类型
    */
    @Column(name = "DICT_TYPE", length = 100)
    @Size(max = 100)
    private String dict_type;
}
