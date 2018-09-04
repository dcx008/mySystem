<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" pageEncoding="utf-8"%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>主页</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <link type="text/css" rel="stylesheet" href="css/login.css">
    <script type="text/javascript" src="js/jquery.min.js"></script>
</head>
<body>
<div id="templatemo_menu" class="ddsmoothmenu">
    <c:if test="${userInfo==null}">
        <div style="display:inline-block;margin-top:5px;float: left;width: 100px;text-align: center;font-size: 14px;font-family: initial;">
            <a href="login">登录</a> / <a href="regist">注册</a>
        </div>
    </c:if>
    <c:if test="${userInfo!=null}">
        <div style="display:inline-block;margin-top:5px;float: left;width: 100px;text-align: center;font-size: 14px;font-family: initial;">
                ${userInfo.username}&nbsp;&nbsp;&nbsp;<a href="/logout">退出</a>
        </div>
    </c:if>
</div>
<table border="1px" width="65%" align="center">
    <tr>
        <td colspan="6" align="center"><h3>用户信息</h3></td>
    </tr>
    <tr>
        <th>编号</th>
        <th>姓名</th>
        <th>密码</th>
        <th>级别</th>
        <th></th>
    </tr>

    <c:forEach items="${userList}" var="u">
        <tr>
            <th>${u.userId}</th>
            <th>${u.username}</th>
            <th>${u.password}</th>
            <th>${u.level}</th>
            <th>
                <a href="${pageContext.request.contextPath}/toUpdateUser?id=${u.userId}"><button>修改</button></a>
                <a href="${pageContext.request.contextPath}/deleteUser?id=${u.userId}"><button>删除</button></a>
            </th>
        </tr>
    </c:forEach>
    <tr align="center">
        <td></td>
        <td></td>
        <td><a href="${pageContext.request.contextPath}/toAddUser"><button>添加用户</button></a></td>
        <td><input type="button" id="delUser" value="删除选中用户"/></td>
        <td></td>
    </tr>
</table>

</body>
</html>

