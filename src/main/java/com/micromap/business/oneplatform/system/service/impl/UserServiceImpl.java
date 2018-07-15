package com.micromap.business.oneplatform.system.service.impl;

import com.micromap.business.oneplatform.common.service.impl.BaseServiceImpl;
import com.micromap.business.oneplatform.system.dto.LoginUserDto;
import com.micromap.business.oneplatform.system.entity.QUser;
import com.micromap.business.oneplatform.system.entity.User;
import com.micromap.business.oneplatform.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

/**
 * Create By Charlie高 on 2018/7/5
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {

    private static final String DEF_LOGIN_USER_QUERY = "select u.ID, u.USER_ID, u.USER_NAME, u.LOGIN_NAME, u.STATUS, u.USER_ROLE, d.ID DEPT_ID, d.DEPT_NAME, d.DEPT_CATE, u.PASSWORD from JDP_OU_USER u left join JDP_OU_DEPT d on u.DEPT_ID = d.ID where u.DELETE_STATE = 0 and LOGIN_NAME = ?";
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserServiceImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Cacheable(cacheNames = "loginUser", key = "loginName")
    public LoginUserDto loadUserByLoginName(String loginName) {
        final List<LoginUserDto> users = jdbcTemplate.query(DEF_LOGIN_USER_QUERY
                , new String[]{loginName}
                , (resultSet, i) -> {
                    LoginUserDto loginUserDto = new LoginUserDto();
                    loginUserDto.setId(resultSet.getLong(1));
                    loginUserDto.setUserId(resultSet.getString(2));
                    loginUserDto.setUserName(resultSet.getString(3));
                    loginUserDto.setLoginName(resultSet.getString(4));
                    loginUserDto.setStatus(resultSet.getInt(5));
                    loginUserDto.setUserRole(resultSet.getInt(6));
                    loginUserDto.setDeptId(resultSet.getLong(7));
                    loginUserDto.setDeptName(resultSet.getString(8));
                    loginUserDto.setDeptCate(resultSet.getInt(9));
                    loginUserDto.setPassword(resultSet.getString(10));
                    return loginUserDto;
                });
        if (users.isEmpty()) {
            throw new UsernameNotFoundException("用户名不存在！");
        }
        if (users.size() > 1) {
            throw new RuntimeException("用户名不唯一！");
        }
        return users.get(0);
    }
}
