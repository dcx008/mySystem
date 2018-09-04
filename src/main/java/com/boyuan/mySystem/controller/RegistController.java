package com.boyuan.mySystem.controller;

import com.boyuan.mySystem.expection.MyException;
import com.boyuan.mySystem.pojo.User;
import com.boyuan.mySystem.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * @author boyuan
 * @date 2018/8/21
 */
@Controller
public class RegistController {
    @Autowired
    private UserService userService;

    @RequestMapping("/ToRegist")
    public String addUser(User user, String password2, String valicode, String agree, Model model, HttpSession session){

        if(user != null){

        }

        userService.addUser(user);
        model.addAttribute("user",user);
        return "forward:/login";
    }

    @RequestMapping("/checkUsername")
    @ResponseBody
    public Map<String,String> checkUsername(String username, Model model, HttpSession session){
        Map<String,String> map = new HashMap<>();
        Integer num = userService.checkUsername(username);
        if(num>0){
            map.put("username","no");
        }else {
            map.put("username","yes");
        }
        return map;

    }
}
