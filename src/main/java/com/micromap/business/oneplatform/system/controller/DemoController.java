package com.micromap.business.oneplatform.system.controller;

import com.micromap.business.oneplatform.common.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import static com.micromap.business.oneplatform.utils.Constants.VIEW_PREFIX;

/**
 * @author limeng 2018/6/23
 */
@Controller
public class DemoController extends BaseController {

    @GetMapping(VIEW_PREFIX + "demo/complex-editable-table")
    public String index() {
        return "/demo/complex-editable-table";
    }

    @GetMapping(VIEW_PREFIX + "demo/enterprise-list")
    public String enterpriseList() {
        return "/demo/enterprise-list";
    }
}
