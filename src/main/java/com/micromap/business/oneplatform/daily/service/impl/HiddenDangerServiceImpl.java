package com.micromap.business.oneplatform.daily.service.impl;

import com.micromap.business.oneplatform.common.service.impl.BaseServiceImpl;
import com.micromap.business.oneplatform.daily.entity.HiddenDanger;
import com.micromap.business.oneplatform.daily.entity.MoveInfo;
import com.micromap.business.oneplatform.daily.service.HiddenDangerService;
import org.springframework.stereotype.Service;

/**
 * @author gaoliqi on 20180622
 */

@Service
public class HiddenDangerServiceImpl extends BaseServiceImpl<HiddenDanger> implements HiddenDangerService {

    /**
     * 根据移交信息更新隐患信息
     * @param moveInfo
     * @return
     */
    @Override
    public HiddenDanger updateHiddenDangerByMoveInfo(MoveInfo moveInfo) {
        HiddenDanger hd = baseRepository.getOne(moveInfo.getHd_id());
        hd.setMove_info_id(moveInfo.getId());
        Long currDeptId = null;
        if("1".equals(moveInfo.getMove_type())){
            switch(moveInfo.getAccept_result()){
                case "1":
                        currDeptId = moveInfo.getSys_in_accept_dept_id();
                    break;
                case "2":
                        currDeptId = moveInfo.getSys_in_accept_dept_id();
                    break;
                case "3":
                        currDeptId = moveInfo.getMove_dept_id();
                    break;
            }
        }
        hd.setCurr_handle_dept_id(currDeptId);
        hd.setMove_info_id(moveInfo.getId());
        return baseRepository.save(hd);
    }
}
