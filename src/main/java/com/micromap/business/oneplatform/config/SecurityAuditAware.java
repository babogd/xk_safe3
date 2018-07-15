package com.micromap.business.oneplatform.config;

import com.micromap.business.oneplatform.system.dto.LoginUserDto;
import com.micromap.business.oneplatform.system.entity.User;
import com.micromap.business.oneplatform.system.service.UserService;
import com.micromap.business.oneplatform.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import javax.annotation.Nonnull;
import java.util.Optional;


/**
 * @author limeng 2018/5/21
 */
@Component
public class SecurityAuditAware implements AuditorAware<User> {
    private final UserService userService;

    @Autowired
    public SecurityAuditAware(UserService userService) {
        this.userService = userService;
    }

    @Nonnull
    @Override
    public Optional<User> getCurrentAuditor() {
        final LoginUserDto loginUser = SecurityUtils.getCurrentLoginUser(userService);
        final User user = new User();
        user.setId(loginUser.getId());
        return Optional.of(user);
    }
}
