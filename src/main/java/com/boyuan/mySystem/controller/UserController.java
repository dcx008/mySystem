package com.boyuan.mySystem.controller;

import com.boyuan.mySystem.pojo.Page;
import com.boyuan.mySystem.pojo.User;
import com.boyuan.mySystem.service.UserService;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.Random;

/**
 * @author boyuan
 * @date 2018/8/21
 */
@Controller
public class UserController {
    private static Logger logger = LogManager.getLogger(UserController.class.getName());


    @Autowired
    private UserService userService;

    @RequestMapping("/memberInfo")
    public String userInfo(){
        return "memberInfo";
    }

    @RequestMapping("/searchUser")
    public String searchUser(String keyword, Model model){
        List<User> list = userService.searchUser(keyword);
        model.addAttribute("userList",list);
        return "memberList";
    }

    @RequestMapping("/findUserList")
    //@ResponseBody    //需要页面跳转时，不需要添加该注解
    public String findUserList(Model model,HttpServletRequest request ){

        String currentPageStr = request.getParameter("pagenum"); //从网页上获取跳转的页数
        String currentPageSizeStr = request.getParameter("pagesize");
        int currentPage = 1;  //默认显示第一页
        int currentPageSize = 3;
        if(currentPageStr!=null){
            currentPage = Integer.parseInt(currentPageStr);
        }
        if(currentPageSizeStr!=null){
            currentPageSize = Integer.parseInt(currentPageSizeStr);
        }
        Page page = userService.findPage(currentPage,currentPageSize);//显示与页码相对应的列表
        request.setAttribute("page", page);
        //跳转回用户列表页面
        return "userList";
    }
    @RequestMapping("/findUserList2")
    @ResponseBody    //需要页面跳转时，不需要添加该注解
    public String findUserList2(Model model,HttpServletRequest request ){

        String currentPageStr = request.getParameter("pagenum"); //从网页上获取跳转的页数
        String currentPageSizeStr = request.getParameter("pagesize");
        int currentPage = 1;  //默认显示第一页
        int currentPageSize = 3;
        if(currentPageStr!=null){
            currentPage = Integer.parseInt(currentPageStr);
        }
        if(currentPageSizeStr!=null){
            currentPageSize = Integer.parseInt(currentPageSizeStr);
        }
        Page page = userService.findPage(currentPage,currentPageSize);//显示与页码相对应的列表
        request.setAttribute("page", page);
        //跳转回用户列表页面
        return "userList";
    }

    @RequestMapping("/image.htm")
    public void valiCodeImg(HttpServletResponse response, HttpSession session) throws IOException {
        // 禁止图像缓存。
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires",0);

        int width = 60, height = 20;
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

        Graphics g = image.getGraphics();

        Random random = new Random();

        g.setColor(getRandColor(200, 250));
        g.fillRect(0, 0, width, height);

        g.setFont(new Font("Times New Roman", Font.PLAIN, 18));

        g.setColor(getRandColor(160, 200));
        for (int i = 0; i < 155; i++) {
            int x = random.nextInt(width);
            int y = random.nextInt(height);
            int xl = random.nextInt(12);
            int yl = random.nextInt(12);
            g.drawLine(x, y, x + xl, y + yl);
        }

        String sRand = "";
        for (int i = 0; i < 4; i++) {
            String rand = String.valueOf(random.nextInt(10));
            sRand += rand;

            g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));
            g.drawString(rand, 13 * i + 6, 16);
        }
        g.dispose();


        session.setAttribute("valicode",sRand);


        ImageIO.write(image, "JPEG", response.getOutputStream());
    }

    Color getRandColor(int fc, int bc) {
        Random random = new Random();
        if (fc > 255)
            fc = 255;
        if (bc > 255)
            bc = 255;
        int r = fc + random.nextInt(bc - fc);
        int g = fc + random.nextInt(bc - fc);
        int b = fc + random.nextInt(bc - fc);
        return new Color(r, g, b);
    }

}
