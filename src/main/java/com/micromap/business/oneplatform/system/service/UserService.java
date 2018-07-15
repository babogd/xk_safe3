package com.micromap.business.oneplatform.system.service;

import com.micromap.business.oneplatform.common.service.BaseService;
import com.micromap.business.oneplatform.system.dto.LoginUserDto;
import com.micromap.business.oneplatform.system.entity.User;

/**
 * Create By Charlie高 on 2018/7/05
 */
public interface UserService extends BaseService<User> {
    LoginUserDto loadUserByLoginName(String loginName);
}
