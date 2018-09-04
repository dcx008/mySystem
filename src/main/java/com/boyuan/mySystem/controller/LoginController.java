package com.boyuan.mySystem.controller;

import com.boyuan.mySystem.pojo.User;
import com.boyuan.mySystem.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.URLEncoder;

/**
 * @author boyuan
 * @date 2018/8/21
 */
@Controller
public class LoginController {
    @Autowired
    private UserService userService;

    @RequestMapping("/toLogin")
    public String ToLogin(String username, String password, String valicode, String remname, String autologin, Model model, HttpSession session, HttpServletResponse response, HttpServletRequest request){

        Boolean flag = false;
        if(StringUtils.isEmpty(username)){
            model.addAttribute("errorMsg1","*用户名不能为空");
            flag = true;
        }
        if(StringUtils.isEmpty(password)){
            model.addAttribute("errorMsg2","*密码不能为空");
            flag = true;
        }
        if(StringUtils.isEmpty(valicode)){
            model.addAttribute("errorMsg3","*验证码不能为空");
            flag = true;
        }

        String code = (String) session.getAttribute("valicode");
        if(!StringUtils.isEmpty(valicode) && !valicode.equals(code)){
            model.addAttribute("errorMsg3","*验证码错误");
            flag = true;
        }

        if(flag){
           return "login";
        }
        try{
            User user=userService.checkUser(username,password);
            if(user!=null){
                //判断是否记住用户名
                if ("true".equals(remname)) {
                    Cookie cookie = new Cookie("remname", URLEncoder.encode(
                            username, "utf-8"));
                    cookie.setPath(request.getContextPath() + "/");
                    cookie.setMaxAge(3600 * 24 * 30);
                    response.addCookie(cookie);
                } else {// 取消记住用户名(删除Cookie)
                    Cookie cookie = new Cookie("remname", "");
                    cookie.setPath(request.getContextPath() + "/");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }

                // 判断是否需要30天内自动登陆
                if ("true".equals(autologin)) {// 实现30天自动登陆
                    // 将用户名和密码保存进Cookie中
                    Cookie c = new Cookie("autologin", URLEncoder.encode(username, "utf-8") + ":" + password);
                    c.setMaxAge(60 * 60 * 24 * 30);// 保存Cookie30天
                    c.setPath(request.getContextPath() + "/");
                    // 将Cookie发送给浏览器
                    response.addCookie(c);
                } else {// 取消30天自动登陆
                    Cookie c = new Cookie("autologin", "");
                    c.setMaxAge(0);// 设置为0立即删除
                    c.setPath(request.getContextPath() + "/");
                    response.addCookie(c);
                }
                // 6.进行登陆
                request.getSession().setAttribute("userInfo", user);
                return "redirect:/";
            }else {
                model.addAttribute("errorMsg1","*用户名或密码错误");
                return "login";
            }
        }catch (Exception e){
            model.addAttribute("errorMsg1","*用户名或密码错误");
            return "login";
        }

    }

    @RequestMapping("/logout")
    public String logout(HttpSession session){
        session.removeAttribute("userInfo");
        return "redirect:/";
    }
}
