package com.micromap.business.oneplatform.common.entity;

import com.google.common.collect.Maps;
import com.mitchellbosecke.pebble.extension.AbstractExtension;
import com.mitchellbosecke.pebble.extension.Function;
import org.springframework.web.servlet.resource.ResourceUrlProvider;

import java.util.Map;

public class HelperExtension extends AbstractExtension {
    private final ResourceUrlProvider resourceUrlProvider;

    public HelperExtension(ResourceUrlProvider resourceUrlProvider) {
        this.resourceUrlProvider = resourceUrlProvider;
    }

    @Override
    public Map<String, Function> getFunctions() {
        Map<String, Function> functions = Maps.newHashMap();
        functions.put(ResourceFunction.FUNCTION_NAME, new ResourceFunction(resourceUrlProvider));
        functions.put(NvlFunction.FUNCTION_NAME, new NvlFunction());
        return functions;
    }
}