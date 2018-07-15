package com.micromap.business.oneplatform.daily.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

/**
 * @author gaoliqi 20180620
 * 隐患(共用) Dto
 *
 */

@Data
public class HiddenDangerDto {
    /*
        主键ID
    */
    private Long id;

    /*
    	隐患等级;1：一般隐患2：重大隐患
    */
    private String hd_level;

    /*
    	隐患来源;1：企业自查2：政府排查3：中介检查4：网格检查
    */
    private String hd_source;

    /*
    	企业标识
    */
    private Long enterprise_id;

    /*
        企业名称
     */
    private String enterprise_name;

    /*
    	排查日期
    */
    private LocalDate check_date;

    /*
    	排查人姓名
    */
    private String checker_name;

    /*
    	隐患类别
    */
    private String hd_type;

    /*
    	隐患地点
    */
    private String hd_location;

    /*
    	隐患部位
    */
    private String hd_position;

    /*
    	监管责任人姓名
    */
    private String supervise_principal_name;

    /*
    	隐患描述
    */
    private String hd_desc;

    /*
    	隐患报告摘要
    */
    private String hd_summary;

    /*
    	排查单位
    */
    private Long check_dept_id;

    /*
    	排查科室
    */
    private Long check_office_id;

    /*
    	监管部门标识
    */
    private Long supervise_dept_id;

    /*
    	整改责任部门名称
    */
    private String neaten_duty_dept_name;

    /*
    	监管分类
    */
    private String regulatory_type_code;

    /*
    	隐患是否上报
    */
    private Long hd_isup;

    /*
    	隐患上报日期
    */
    private Date hd_up_date;

    /*
    	隐患上报人员
    */
    private Long hd_up_person;

    /*
    	录入部门标识
    */
    private Long enter_dept_id;

    /*
    	删除状态;0:未删除；1：已删除
    */
    private Long delete_state;

    /*
    	创建人
    */
    private Long created_user_id;

    /*
    	创建时间
    */
    private Date created_time;

    /*
    	更新人
    */
    private Long updated_user_id;

    /*
    	更新时间
    */
    private Date updated_time;

}
