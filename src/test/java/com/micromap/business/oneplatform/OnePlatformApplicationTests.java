package com.micromap.business.oneplatform;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OnePlatformApplicationTests {
    private static final Logger logger = LoggerFactory.getLogger(OnePlatformApplicationTests.class);

    @Test
    public void contextLoads() {
        logger.info(new BCryptPasswordEncoder().encode("123456"));
    }

}
