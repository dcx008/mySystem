package com.boyuan.mySystem.mapper;

import com.boyuan.mySystem.pojo.UserInfo; /**
 * @author boyuan
 * @date 2018/8/21
 */
public interface UserInfoMapper {
    /**
     * 用户信息注册
     * @param userInfo
     */
    void addUserInfo(UserInfo userInfo);
}
