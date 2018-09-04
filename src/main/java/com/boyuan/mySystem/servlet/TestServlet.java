package com.boyuan.mySystem.servlet;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author boyuan
 * @date 2018/8/23
 */
@WebServlet("/test.htm")
public class TestServlet extends HttpServlet {

    private Logger logger = LogManager.getLogger(TestServlet.class.getName());
    public TestServlet(){
        super();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html");
        req.getRequestDispatcher("/web/test/index.jsp").forward(req, resp);
    }
}
