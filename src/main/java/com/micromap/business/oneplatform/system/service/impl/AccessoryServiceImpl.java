package com.micromap.business.oneplatform.system.service.impl;

import com.google.common.io.Files;
import com.micromap.business.oneplatform.common.service.impl.BaseServiceImpl;
import com.micromap.business.oneplatform.system.dto.UploadDto;
import com.micromap.business.oneplatform.system.entity.Accessory;
import com.micromap.business.oneplatform.system.service.AccessoryService;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.annotation.Nonnull;
import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * @author limeng 2018/5/29
 */
@Service
public class AccessoryServiceImpl extends BaseServiceImpl<Accessory> implements AccessoryService {

    @Override
    @Modifying
    @Transactional
    public Accessory uploadAndSave(UploadDto uploadDto) throws IOException {
        Objects.requireNonNull(uploadDto.getFile());
        final Long size = uploadDto.getFile().getSize();
        final String originName = uploadDto.getFile().getOriginalFilename();
        if (StringUtils.isEmpty(originName)) {
            throw new IllegalArgumentException("上传的文件名不能为空！");
        }
        final String ext = Files.getFileExtension(originName);
        final String path = "/" + uploadDto.getFileId() + "." + ext;
        final String contentType = uploadDto.getFile().getContentType();
        final File dest = new File(uploadDto.getUploadPath() + path);
        Files.createParentDirs(dest);
        uploadDto.getFile().transferTo(dest);
        final Accessory accessory = new Accessory();
        accessory.setBusinessId(uploadDto.getBusinessId());
        accessory.setName(uploadDto.getFileId());
        accessory.setOriginName(originName);
        accessory.setPath(path);
        accessory.setFileSize(size);
        accessory.setContentType(contentType != null ? contentType : MediaType.APPLICATION_OCTET_STREAM_VALUE);
        accessory.setMark(uploadDto.getMark());
        return baseRepository.save(accessory);
    }

    @Override
    public List<Accessory> updateAllByBusinessId(@Nonnull Long businessId, @Nonnull List<Long> ids) {
        if (ids.isEmpty()){
            return Collections.emptyList();
        }
        final List<Accessory> accessories = baseRepository.findAllById(ids)
                .stream()
                .filter(accessory -> ! businessId.equals(accessory.getBusinessId()))
                .peek(accessory -> accessory.setBusinessId(businessId))
                .collect(Collectors.toList());
        return baseRepository.saveAll(accessories);
    }
}
