package com.micromap.business.oneplatform.system.service.impl;

import com.micromap.business.oneplatform.common.service.impl.BaseServiceImpl;
import com.micromap.business.oneplatform.system.entity.Dict;
import com.micromap.business.oneplatform.system.service.DictService;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * @author limeng 2018/5/25
 */
@Service
public class DictServiceImpl extends BaseServiceImpl<Dict> implements DictService {
    @Override
    public Iterable<Dict> findChildrenByCode(String code) {
        return Collections.emptyList();
    }
}
