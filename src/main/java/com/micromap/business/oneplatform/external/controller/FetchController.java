package com.micromap.business.oneplatform.external.controller;

import com.micromap.business.oneplatform.external.service.FetchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author limeng 2018/5/28
 */
@Controller
public class FetchController {
    private final FetchService fetchService;

    @Autowired
    public FetchController(FetchService fetchService) {
        this.fetchService = fetchService;
    }

    @GetMapping("test/json")
    public ResponseEntity getJson() {
        return ResponseEntity.ok(fetchService.getQuotes());
    }

}
