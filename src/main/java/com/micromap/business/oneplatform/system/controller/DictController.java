package com.micromap.business.oneplatform.system.controller;

import com.google.common.collect.Lists;
import com.micromap.business.oneplatform.common.controller.BaseController;
import com.micromap.business.oneplatform.common.entity.UiParam;
import com.micromap.business.oneplatform.system.dto.DictDto;
import com.micromap.business.oneplatform.system.entity.Dict;
import com.micromap.business.oneplatform.system.entity.QDict;
import com.micromap.business.oneplatform.system.service.DictService;
import com.micromap.business.oneplatform.utils.ApiResult;
import com.micromap.business.oneplatform.utils.BeanUtils;
import com.micromap.business.oneplatform.utils.PageResult;
import com.querydsl.core.BooleanBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static com.micromap.business.oneplatform.utils.ApiResult.fail;
import static com.micromap.business.oneplatform.utils.ApiResult.success;
import static com.micromap.business.oneplatform.utils.Constants.*;
import static com.micromap.business.oneplatform.utils.QueryHelper.queryByExample;
import static org.springframework.http.ResponseEntity.ok;

/**
 * @author limeng 2018/5/25
 */
@Controller
public class DictController extends BaseController {
    private static final String URL_PATH = "system/dict";

    private final DictService dictService;

    @Autowired
    public DictController(DictService dictService) {
        this.dictService = dictService;
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
    public ResponseEntity page(DictDto form, UiParam param) {
        final BooleanBuilder where = new BooleanBuilder();
        final QDict query = QDict.dict;
        if (!StringUtils.isEmpty(form.getCode())) {
            where.and(query.code.eq(form.getCode()));
        }
        if (!StringUtils.isEmpty(form.getText())) {
            where.and(query.text.like("%" + form.getText() + "%"));
        }
        if (!StringUtils.isEmpty(form.getPid())) {
            where.and(query.parent.id.eq(form.getPid()));
        }

        final Page<Dict> page = dictService.findAll(where, param.toPageable());
        return ok(new PageResult<>(page.getContent(), page.getTotalElements()));
    }

    @PostMapping(API_PREFIX + URL_PATH + "/insert")
    public ResponseEntity insert(@RequestBody @Valid Dict form) {
        if (!StringUtils.isEmpty(form.getId())) {
            return fail("新增时不能提供id！");
        }
        if (dictService.exists(QDict.dict.code.eq(form.getCode()))) {
            return fail("当前code已存在！");
        }
        final Dict data = dictService.save(form);
        return success("保存成功！", data);
    }

    @PostMapping(API_PREFIX + URL_PATH + "/update")
    public ResponseEntity update(@RequestBody @Valid Dict form) {
        if (StringUtils.isEmpty(form.getId())) {
            return fail("更新时需要提供id！");
        }
        return dictService.findOne(form.getId())
                .map((data) -> {
                    if (!StringUtils.isEmpty(form.getCode())
                            && !data.getCode().equals(form.getCode())
                            && dictService.exists(QDict.dict.code.eq(form.getCode()))) {
                        return fail("当前code已存在！");
                    }
                    BeanUtils.copyFormToEntity(form, data);
                    dictService.save(data);
                    return success(data);
                })
                .orElse(fail("未获取到所需数据信息！"));
    }

    @GetMapping(API_PREFIX + URL_PATH + "/one")
    public ResponseEntity one(@RequestParam Long id) {
        return dictService.findOne(id)
                .map(ApiResult::success)
                .orElse(fail("未获取到所需数据信息！"));
    }

    @PostMapping(API_PREFIX + URL_PATH + "/delete")
    public ResponseEntity delete(@RequestParam Long id) {
        return dictService.findOne(id)
                .map((data) -> {
                    data.setDeleteState(INACTIVE);
                    dictService.save(data);
                    return success("删除成功！");
                })
                .orElse(fail("未获取到所需数据信息！"));
    }

    @PostMapping(API_PREFIX + URL_PATH + "/all")
    public ResponseEntity all(Dict form) {
        final List<DictDto> dto = Lists.newArrayList();
        dictService.findAll(queryByExample(form))
                .forEach(d -> dto.add(DictDto.of(d)));
        return ok(dto);
    }

    @RequestMapping(API_PREFIX + URL_PATH + "/children")
    @ResponseBody
    public ResponseEntity children(String code) {
        return ok(dictService.findAll(QDict.dict.code.likeIgnoreCase(code + "_%")));
    }
}
