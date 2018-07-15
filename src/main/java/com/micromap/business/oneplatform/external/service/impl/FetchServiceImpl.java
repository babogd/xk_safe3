package com.micromap.business.oneplatform.external.service.impl;

import com.micromap.business.oneplatform.external.dto.Quote;
import com.micromap.business.oneplatform.external.service.FetchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * @author limeng 2018/5/28
 */
@Service
public class FetchServiceImpl implements FetchService {
    private final RestTemplate restTemplate;

    @Autowired
    public FetchServiceImpl(RestTemplateBuilder restTemplateBuilder) {
        restTemplateBuilder.setConnectTimeout(15000);
        restTemplateBuilder.setReadTimeout(5000);
        this.restTemplate = restTemplateBuilder.build();
    }

    @Override
    public List<Quote> getQuotes() {
        final ResponseEntity<List<Quote>> responseEntity = restTemplate.exchange("https://gturnquist-quoters.cfapps.io/api",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Quote>>() {
                });
        final List<Quote> body = responseEntity.getBody();
        if (body == null) {
            return new ArrayList<>();
        } else {
            return body;
        }
    }
}
