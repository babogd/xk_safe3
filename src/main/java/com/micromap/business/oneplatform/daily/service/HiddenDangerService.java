package com.micromap.business.oneplatform.daily.service;

import com.micromap.business.oneplatform.common.service.BaseService;
import com.micromap.business.oneplatform.daily.entity.HiddenDanger;
import com.micromap.business.oneplatform.daily.entity.MoveInfo;

/**
 * @author gaoliqi 20180622
 */
public interface HiddenDangerService extends BaseService<HiddenDanger> {
    HiddenDanger updateHiddenDangerByMoveInfo(MoveInfo info);
}
