package com.micromap.business.oneplatform.daily.mapper;

import com.micromap.business.oneplatform.daily.entity.HiddenDanger;
import com.micromap.business.oneplatform.system.dto.TreeJson;
import com.micromap.business.oneplatform.system.entity.Dept;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface HiddenDangerMapper {
    List<TreeJson> getDictTree(String dictType);
    List<TreeJson> getGovDeptTree(Map<String, Object> map);
    Integer judgeIfCanMove(Map<String, Object> param);
    Integer judgeIfCanSupervise(Map<String, Object> param);
    Integer checkIfCanDelete(Map<String, Object> param);
    Integer checkIfCanNeaten(Map<String, Object> param);
    Long getCurrentSessionId();
}
