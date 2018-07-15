/*
package com.micromap.business.oneplatform.enterprise.controller;

import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import cn.afterturn.easypoi.excel.entity.enmus.ExcelType;
import com.google.common.collect.Lists;
import com.micromap.business.oneplatform.common.controller.BaseController;
import com.micromap.business.oneplatform.common.entity.UiParam;

import com.micromap.business.oneplatform.enterprise.entity.EnterpriseChemical;

import com.micromap.business.oneplatform.enterprise.service.EnterpriseChemicalService;

import com.micromap.business.oneplatform.system.service.AccessoryService;
import com.micromap.business.oneplatform.utils.ApiResult;
import com.micromap.business.oneplatform.utils.BeanUtils;
import com.micromap.business.oneplatform.utils.PageResult;
import com.querydsl.core.BooleanBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Nonnull;
import javax.validation.Valid;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static com.micromap.business.oneplatform.utils.ApiResult.*;
import static com.micromap.business.oneplatform.utils.Constants.*;
import static com.micromap.business.oneplatform.utils.QueryHelper.queryByExample;
import static org.springframework.http.ResponseEntity.ok;


*/
/**
 * @author limeng 2018/5/21
 *//*

@Controller
public class EnterpriseChemicalController extends BaseController {
    private static final String URL_PATH = "enterprise/enterprise-chemical";

    private final EnterpriseChemicalService enterpriseChemicalService;
    private final EnterpriseInfoService enterpriseInfoService;
    private final AccessoryService accessoryService;

    @Autowired
    public EnterpriseChemicalController(EnterpriseChemicalService enterpriseChemicalService
            , EnterpriseInfoService enterpriseInfoService, AccessoryService accessoryService) {
        this.enterpriseChemicalService = enterpriseChemicalService;
        this.enterpriseInfoService = enterpriseInfoService;
        this.accessoryService = accessoryService;
    }

    */
/**
     * 跳转到选择界面
     *//*

    @GetMapping(VIEW_PREFIX + URL_PATH + "/chemical-list")
    public String toChemicalPage() {
        return URL_PATH + "/chemical-list";
    }

    @GetMapping(VIEW_PREFIX + URL_PATH + "/chemical-detail")
    public String chemicalDetail() {
        return URL_PATH + "/chemical-detail";
    }

    @GetMapping(VIEW_PREFIX + URL_PATH + "/list")
    public String list() {
        return URL_PATH + "/list";
    }

    @GetMapping(VIEW_PREFIX + URL_PATH + "/detail")
    public String detail() {
        return URL_PATH + "/detail";
    }

    @PostMapping(API_PREFIX + URL_PATH + "/page")
    public ResponseEntity page(EnterpriseChemical form, UiParam param) {
        final BooleanBuilder where = getCondition(form);
        final Page<EnterpriseChemical> page = enterpriseChemicalService.findAll(where, param.toPageable());
        return ResponseEntity.ok(new PageResult<>(page.getContent(), page.getTotalElements()));
    }

    @PostMapping(API_PREFIX + URL_PATH + "/insert")
    public ResponseEntity insert(@RequestBody @Valid EnterpriseChemical form) {
        if (!StringUtils.isEmpty(form.getId())) {
            return fail("新增时不能提供id！");
        }
        final EnterpriseChemical data = enterpriseChemicalService.save(form);
        accessoryService.updateAllByBusinessId(data.getId(), form.getAccessories());
        return success("保存成功！", data);
    }

    @PostMapping(API_PREFIX + URL_PATH + "/update")
    public ResponseEntity update(@RequestBody @Valid EnterpriseChemical form) {
        if (StringUtils.isEmpty(form.getId())) {
            return fail("更新时需要提供id！");
        }
        return enterpriseChemicalService.findOne(form.getId())
                .map((data) -> {
                    BeanUtils.copyFormToEntity(form, data);
                    enterpriseChemicalService.save(data);
                    accessoryService.updateAllByBusinessId(data.getId(), form.getAccessories());
                    return success(data);
                })
                .orElse(fail("未获取到所需数据信息！"));
    }

    @GetMapping(API_PREFIX + URL_PATH + "/one")
    public ResponseEntity one(@RequestParam Long id) {
        return enterpriseChemicalService.findOne(id)
                .map(ApiResult::success)
                .orElse(fail("未获取到所需数据信息！"));
    }

    @PostMapping(API_PREFIX + URL_PATH + "/delete")
    public ResponseEntity delete(@RequestParam Long id) {
        return enterpriseChemicalService.findOne(id)
                .map((data) -> {
                    data.setDeleteState(INACTIVE);
                    enterpriseChemicalService.save(data);
                    return success("删除成功！");
                })
                .orElse(fail("未获取到所需数据信息！"));
    }

    @PostMapping(API_PREFIX + URL_PATH + "/all")
    public ResponseEntity all(EnterpriseChemical form) {
        return ResponseEntity.ok(enterpriseChemicalService.findAll(queryByExample(form)));
    }

    @PostMapping(API_PREFIX + URL_PATH + "/export-excel")
    public ResponseEntity export(@RequestParam(value = "type", defaultValue = "0") Integer type
            , EnterpriseChemical form, UiParam param) {
        //type为导出类型，（0为当前页，1为全部）
        if (type == 0) {
            final BooleanBuilder where = getCondition(form);
            final Page<EnterpriseChemical> page = enterpriseChemicalService.findAll(where, param.toPageable());
            final List<EnterpriseChemical> list = page.getContent();
            return listToExcel(list);
        } else {
            final BooleanBuilder where = getCondition(form);
            final List<EnterpriseChemical> list = Lists.newArrayList(enterpriseChemicalService.findAll(where));
            return listToExcel(list);
        }
    }

    @Nonnull
    private ResponseEntity listToExcel(Collection<EnterpriseChemical> list) {
        final List<EnterpriseChemicalExcelDto> excelList = list.stream()
                .map(entity -> {
                    EnterpriseChemicalExcelDto dto = new EnterpriseChemicalExcelDto();
                    dto.setChemicalCName(entity.getChemicalCName());
                    dto.setCasCode(entity.getCasCode());
                    dto.setCatalogNo(entity.getCatalogNo());
                    dto.setChemicalUse(entity.getChemicalUse() != null ? entity.getChemicalUse().getText() : "");
                    dto.setYearUseQty(entity.getYearUseQty());
                    dto.setMaxStorQty(entity.getMaxStorQty());
                    dto.setStorMode(entity.getStorMode());
                    dto.setIsImportChem(entity.getIsImportChem());
                    dto.setIsToxic(entity.getIsToxic());
                    dto.setIsPrecursor(entity.getIsPrecursor());
                    dto.setIsBlast(entity.getIsBlast());
                    return dto;
                })
                .collect(Collectors.toList());
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            ExcelExportUtil.exportExcel(new ExportParams("企业化学品信息", "Sheet1", ExcelType.XSSF), EnterpriseChemicalExcelDto.class, excelList);
            final byte[] bytes = outputStream.toByteArray();
            final int size = outputStream.size();
            outputStream.close();
            final String fileName = URLEncoder.encode("企业化学品信息.xlsx", "UTF-8");
            return ok().contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .header(HttpHeaders.CONTENT_LENGTH, "" + size)
                    .body(bytes);
        } catch (IOException e) {
            e.printStackTrace();
            return error("导出失败！");
        }
    }

    @Nonnull
    private BooleanBuilder getCondition(EnterpriseChemical form) {
        final BooleanBuilder where = new BooleanBuilder();
        final QEnterpriseChemical query = QEnterpriseChemical.enterpriseChemical;
        if (!StringUtils.isEmpty(form.getCasCode())) {
            where.and(query.casCode.like("%" + form.getCasCode() + "%"));
        }
        if (!StringUtils.isEmpty(form.getChemicalCName())) {
            where.and(query.chemicalCName.like("%" + form.getChemicalCName() + "%"));
        }
        if (!StringUtils.isEmpty(form.getDwmc())) {
            final List<EnterpriseInfo> list = Lists.newArrayList(
                    enterpriseInfoService.findAll(
                            QEnterpriseInfo.enterpriseInfo.enterpriseName.like("%" + form.getDwmc() + "%")
                    )
            );
            if (!list.isEmpty()) {
                where.and(query.enterpriseId.in(list));
            }
        }
        if (!StringUtils.isEmpty(form.getIsImportChem())) {
            where.and(query.isImportChem.eq(form.getIsImportChem()));
        }
        if (!StringUtils.isEmpty(form.getEnterpriseId())) {
            where.and(query.enterpriseId.eq(form.getEnterpriseId()));
        }
        return where;
    }
}
*/
