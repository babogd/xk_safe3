package com.micromap.business.oneplatform.utils;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * @author limeng 2018/5/29
 */
@Configuration
@ConfigurationProperties(prefix = "system")
@Data
public class SystemConstants {
    private String uploadPath = "d:/temp";
}
