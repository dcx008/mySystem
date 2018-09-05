package com.boyuan.mySystem.mapper;

import com.boyuan.mySystem.pojo.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author boyuan
 * @date 2018/8/21
 */
public interface UserMapper {
    public List<User> findUserList();

    /**
     * 校验用户名密码
     * @param username
     * @param password
     * @return
     */
    User checkUser(@Param("username") String username,@Param("password") String password);

    /**
     * 用户注册
     * @param user
     */
    void addUser(User user);

    /**
     * 校验用户名
     */
    Integer checkUsername(@Param("username") String username);

    /**
     * 用户列表
     * @param keyword
     * @return
     */
    List<User> searchUser(@Param("keyword")String keyword);

    /**
     * 用户列表分页
     * @param startIndex
     * @param pageSize
     * @return
     */
    List<User> findUserListPage(@Param("startIndex")Integer startIndex,@Param("pageSize")Integer pageSize);

    /**
     * 用户总数
     * @return
     */
    Integer findUserCount();
}
