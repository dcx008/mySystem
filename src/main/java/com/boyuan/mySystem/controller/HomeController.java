package com.boyuan.mySystem.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author boyuan
 * @date 2018/8/21
 */
@Controller
public class HomeController {

    @RequestMapping("/")
    public String index(){
        return "index";
    }

    @RequestMapping("login")
    public String login(){
        return "login";
    }

    @RequestMapping("regist")
    public String regist(){
        return "regist";
    }
}
