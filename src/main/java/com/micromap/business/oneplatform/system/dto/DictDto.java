package com.micromap.business.oneplatform.system.dto;

import com.micromap.business.oneplatform.system.entity.Dict;
import lombok.Data;

/**
 * @author limeng 2018/6/14
 */
@Data
public class DictDto {
    /**
     * 主键id
     */
    private Long id;
    /**
     * 类型编码
     */
    private String code;

    /**
     * 名称
     */
    private String text;

    /**
     * 上级标识
     */
    private Long pid;

    /**
     * 上级名称
     */
    private String ptext;

    /**
     * 排序号
     */
    private Integer sortNum;

    public static DictDto of(Dict dict) {
        final DictDto dto = new DictDto();
        dto.setId(dict.getId());
        dto.setCode(dict.getCode());
        dto.setText(dict.getText());
        if (dict.getParent()!=null){
            dto.setPid(dict.getParent().getId());
        }
        dto.setPtext(dict.getParent() != null ? dict.getParent().getText() : "");
        dto.setSortNum(dict.getSortNum());
        return dto;
    }
}
