package com.micromap.business.oneplatform.system.service;

import com.micromap.business.oneplatform.common.service.BaseService;
import com.micromap.business.oneplatform.system.entity.Dict;

/**
 * @author limeng 2018/5/25
 */
public interface DictService extends BaseService<Dict> {
    Iterable<Dict> findChildrenByCode(String code);
}
