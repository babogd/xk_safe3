package com.micromap.business.oneplatform.system.controller;

import com.google.common.collect.Lists;
import com.google.common.io.Files;
import com.micromap.business.oneplatform.common.controller.BaseController;
import com.micromap.business.oneplatform.common.entity.UiParam;
import com.micromap.business.oneplatform.system.dto.UploadDto;
import com.micromap.business.oneplatform.system.entity.Accessory;
import com.micromap.business.oneplatform.system.entity.QAccessory;
import com.micromap.business.oneplatform.system.service.AccessoryService;
import com.micromap.business.oneplatform.utils.PageResult;
import com.micromap.business.oneplatform.utils.SystemConstants;
import com.querydsl.core.BooleanBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import static com.micromap.business.oneplatform.utils.ApiResult.error;
import static com.micromap.business.oneplatform.utils.ApiResult.fail;
import static com.micromap.business.oneplatform.utils.ApiResult.success;
import static com.micromap.business.oneplatform.utils.Constants.API_PREFIX;
import static com.micromap.business.oneplatform.utils.Constants.INACTIVE;
import static com.micromap.business.oneplatform.utils.QueryHelper.queryByExample;

/**
 * @author limeng 2018/5/29
 */
@Controller
public class AccessoryController extends BaseController {
    private static final String URL_PATH = "system/accessory";
    private final AccessoryService accessoryService;
    private final SystemConstants systemConstants;

    @Autowired
    public AccessoryController(AccessoryService accessoryService,
                               SystemConstants systemConstants) {
        this.accessoryService = accessoryService;
        this.systemConstants = systemConstants;
    }

    @PostMapping(API_PREFIX + URL_PATH + "/page")
    public ResponseEntity page(Accessory form, UiParam param) {
        final BooleanBuilder where = new BooleanBuilder();
        final QAccessory query = QAccessory.accessory;
        if (StringUtils.isEmpty(form.getBusinessId())) {
            return fail("缺少业务标识！");
        }
        if (!StringUtils.isEmpty(form.getOriginName())) {
            where.and(query.originName.like("%" + form.getOriginName() + "%"));
        }
        final Page<Accessory> page = accessoryService.findAll(where, param.toPageable());
        return ResponseEntity.ok(new PageResult<>(page.getContent(), page.getTotalElements()));
    }

    @PostMapping(API_PREFIX + URL_PATH + "/upload")
    public ResponseEntity upload(@RequestParam("qqfile") MultipartFile file,
                                 @RequestParam("qquuid") String fileId,
                                 @RequestParam(value = "businessId") Long businessId,
                                 @RequestParam(value = "mark") String mark) {
        final Accessory data;
        try {
            final UploadDto uploadDto = new UploadDto(businessId, file, fileId, systemConstants.getUploadPath(), mark);
            data = accessoryService.uploadAndSave(uploadDto);
        } catch (IOException e) {
            return error("上传失败！");
        }
        return success("上传成功！", data);
    }

    @DeleteMapping(API_PREFIX + URL_PATH + "/delete/{id}")
    public ResponseEntity delete(@PathVariable("id") String id) {
        return accessoryService.findOne(QAccessory.accessory.name.eq(id))
                .map((data) -> {
                    data.setDeleteState(INACTIVE);
                    accessoryService.save(data);
                    return success("删除成功！");
                })
                .orElse(error("删除失败！"));
    }

    @GetMapping(API_PREFIX + URL_PATH + "/download/{id}")
    public ResponseEntity download(@PathVariable("id") Long id) {
        return accessoryService.findOne(id)
                .map(data -> {
                    final String pathname = systemConstants.getUploadPath() + "/" + data.getPath();
                    final File file = new File(pathname);
                    final byte[] bytes;
                    try {
                        bytes = Files.toByteArray(file);
                    } catch (IOException e) {
                        return error("获取文件失败！");
                    }
                    String originName;
                    try {
                        originName = URLEncoder.encode(data.getOriginName(), "UTF-8");
                    } catch (UnsupportedEncodingException e) {
                        originName = data.getOriginName();
                    }
                    return ResponseEntity
                            .ok()
                            .contentType(MediaType.parseMediaType(data.getContentType()))
                            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + originName + "\"")
                            .header(HttpHeaders.CONTENT_LENGTH, data.getFileSize().toString())
                            .body(bytes);
                })
                .orElse(fail("获取文件信息失败！"));
    }

    @GetMapping(API_PREFIX + URL_PATH + "/all")
    public ResponseEntity all(Accessory form) {
        if (null == form.getBusinessId()) {
            return ResponseEntity.ok(Lists.newArrayList());
        }
        return ResponseEntity.ok(accessoryService.findAll(queryByExample(form)));
    }
}
