package com.boyuan.mySystem.service.impl;

import com.boyuan.mySystem.mapper.UserInfoMapper;
import com.boyuan.mySystem.mapper.UserMapper;
import com.boyuan.mySystem.pojo.User;
import com.boyuan.mySystem.pojo.UserInfo;
import com.boyuan.mySystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

/**
 * @author boyuan
 * @date 2018/8/21
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserInfoMapper userInfoMapper;

    @Override
    public List<User> findUserList() {
        return userMapper.findUserList();
    }

    @Override
    public User checkUser(String username, String password) {
        return userMapper.checkUser(username,password);
    }

    @Override
    public void addUser(User user) {
        user.setUserId(UUID.randomUUID().toString());
        user.getUserInfo().setUserInfoId(user.getUserId());
        user.setLevel("USER");
        user.setState(0);//刚刚验证的是不能給开启状态的
        userMapper.addUser(user);
        UserInfo userInfo=user.getUserInfo();
        userInfoMapper.addUserInfo(userInfo);
    }

    @Override
    public Integer checkUsername(String username) {
        return userMapper.checkUsername(username);
    }

    @Override
    public List<User> searchUser(String keyword) {
        return userMapper.searchUser(keyword);
    }
}
