package com.micromap.business.oneplatform.system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Nonnull;

@Data
@AllArgsConstructor
public class UploadDto {
    private Long businessId;
    private MultipartFile file;
    private String fileId;
    private String uploadPath;
    private String mark;
}
