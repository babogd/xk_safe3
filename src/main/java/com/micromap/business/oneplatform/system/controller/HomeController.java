package com.micromap.business.oneplatform.system.controller;

import com.micromap.business.oneplatform.common.controller.BaseController;
import com.micromap.business.oneplatform.system.dto.LoginUserDto;
import com.micromap.business.oneplatform.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

/**
 * @author limeng 2018/5/29
 */
@Controller
public class HomeController extends BaseController {
    private final UserService userService;

    @Autowired
    public HomeController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String index(Model model, Principal principal) {
        final LoginUserDto user = userService.loadUserByLoginName(principal.getName());
        model.addAttribute("user", user);
        return "index";
    }

    @GetMapping("/export")
    public String export() {
        return "common/export";
    }

    @GetMapping("/exportChart")
    public String exportChart() {
        return "common/exportChart";
    }
}
