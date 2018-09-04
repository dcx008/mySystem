<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>登录页面</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <link type="text/css" rel="stylesheet" href="css/login.css">
    <!-- 引入jQuery库 -->
    <script type="text/javascript" src="<%= request.getContextPath() %>/js/jquery-1.4.2.js"></script>


</head>
<body class="login_bj" >
<div class="zhuce_body">
    <div class="zhuce_kong login_kuang">
    	<div class="zc">
        	<div class="bj_bai">
            <h3>登录</h3>
       	  	  <form id="commentForm" action="/toLogin" method="post" style="margin: auto;margin-left:160px">
                  <label><input name="username" type="text" class="kuang_txt" placeholder=" 用户名"></label> <label class="errorMsg"  value="${cookie.remname.value}">${errorMsg1}</label><br/>
                  <label><input name="password" type="password" class="kuang_txt" placeholder=" 密码"></label> <label class="errorMsg">${errorMsg2}</label><br/>
                  <label><input id="valicode" name="valicode" type="text" class="kuang_txt_valicode" placeholder="验证码"></label>
                  <span class="maPic"><img height=30 style="cursor:pointer;border-radius:10px"
                                           src="/image.htm" onclick="this.src='/image.htm?'+(new Date()).getTime();"
                                           width=84 align=absMiddle border=1></span>  <label class="errorMsg">${errorMsg3}</label><br>
                  <label ><input style="margin-top: 5px;margin-bottom: 10px" type="checkbox" name="remname" value="true" ${ empty cookie.remname ? "":"checked='checked'" }/>记住用户名&nbsp;&nbsp;&nbsp;
                      <input type="checkbox" name="autologin" value="true"/>30天内自动登陆</label>
                    <input name="登录" type="submit" class="btn_zhuce" value="登录"><br>
                    <a href="/regist" style="float: left;margin-top: 5px;">还没有帐号？立即注册 >></a>
                </form>
            </div>
        </div>
    </div>

</div>
    
</body>
</html>