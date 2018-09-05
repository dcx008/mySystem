package com.boyuan.mySystem.service;

import com.boyuan.mySystem.pojo.Page;
import com.boyuan.mySystem.pojo.User;

import java.util.List;

/**
 * @author boyuan
 * @date 2018/8/21
 */
public interface UserService {
    public List<User> findUserList();

    /**
     * 校验用户密码
     * @param username
     * @param password
     * @return
     */
    User checkUser(String username, String password);

    /**
     * 用户注册
     * @param user
     */
    void addUser(User user);

    /**
     * 校验用户名
     * @param username
     * @return
     */
    Integer checkUsername(String username);

    /**
     * 用户列表
     * @param keyword
     * @return
     */
    List<User> searchUser(String keyword);

    /**
     * 用户列表分页
     * @param currentPage
     * @return
     */
    Page findPage(int currentPage);
}
