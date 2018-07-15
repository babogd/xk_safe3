package com.micromap.business.oneplatform.external.service;

import com.micromap.business.oneplatform.external.dto.Quote;

import java.util.List;


/**
 * @author limeng 2018/5/28
 */
public interface FetchService {
    List<Quote> getQuotes();
}
