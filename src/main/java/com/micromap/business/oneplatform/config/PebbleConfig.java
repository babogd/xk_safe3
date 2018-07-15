package com.micromap.business.oneplatform.config;

import com.micromap.business.oneplatform.common.entity.HelperExtension;
import com.mitchellbosecke.pebble.extension.Extension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.resource.ResourceUrlProvider;

/**
 * @author limeng 2018/6/21
 */
@Configuration
public class PebbleConfig {
    private final ResourceUrlProvider resourceUrlProvider;

    @Autowired
    public PebbleConfig(ResourceUrlProvider resourceUrlProvider) {
        this.resourceUrlProvider = resourceUrlProvider;
    }

    @Bean
    public Extension helperExtension() {
        return new HelperExtension(resourceUrlProvider);
    }
}
