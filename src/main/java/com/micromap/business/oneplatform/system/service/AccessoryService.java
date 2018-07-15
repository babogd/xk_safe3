package com.micromap.business.oneplatform.system.service;


import com.micromap.business.oneplatform.common.service.BaseService;
import com.micromap.business.oneplatform.system.dto.UploadDto;
import com.micromap.business.oneplatform.system.entity.Accessory;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.util.List;


/**
 * @author limeng 2018/5/29
 */
public interface AccessoryService extends BaseService<Accessory> {

    Accessory uploadAndSave(UploadDto uploadDto) throws IOException;

    List<Accessory> updateAllByBusinessId(@Nonnull Long businessId, List<Long> ids);
}
