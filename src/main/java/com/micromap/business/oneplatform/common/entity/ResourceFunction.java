package com.micromap.business.oneplatform.common.entity;

import com.google.common.collect.Lists;
import com.mitchellbosecke.pebble.extension.Function;
import com.mitchellbosecke.pebble.spring.util.ViewUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.resource.ResourceUrlProvider;

import java.util.List;
import java.util.Map;

public class ResourceFunction implements Function {
    private final ResourceUrlProvider resourceUrlProvider;

    static final String FUNCTION_NAME = "urls";
    private static final String PARAM_URL = "url";

    private List<String> argumentNames;
    private String contextPath;

    ResourceFunction(ResourceUrlProvider resourceUrlProvider) {
        this.argumentNames = Lists.newArrayList();
        this.argumentNames.add(PARAM_URL);
        this.resourceUrlProvider = resourceUrlProvider;
    }

    @Override
    public Object execute(Map<String, Object> args) {
        StringBuffer result = new StringBuffer();

        result.append(this.getContextPath());
        this.addUrlParameter(args, result);

        return result.toString();
    }

    private void addUrlParameter(Map<String, Object> args, StringBuffer result) {
        String url = (String) args.get(PARAM_URL);
        if (StringUtils.hasText(url)) {
            final String path = resourceUrlProvider.getForLookupPath(url);
            if (StringUtils.hasText(path)) {
                result.append(path);
            }
        }
    }

    private String getContextPath() {
        if (this.contextPath == null) {
            this.contextPath = ViewUtils.getRequest().getContextPath();
        }

        return this.contextPath;
    }

    @Override
    public List<String> getArgumentNames() {
        return this.argumentNames;
    }
}