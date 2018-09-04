<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>用户管理</title>
    <link type="text/css" rel="stylesheet" href="<%= request.getContextPath() %>/css/table.css">
</head>
<body>
<div class="page-container">
    <div class="text-c">
        <form action="/searchUser" method="post">
            <input type="text" class="input-text" style="width:250px" placeholder="输入会员名称、电话、邮箱" id="" name="keyword">
            <button type="submit" name="">搜用户</button>
        </form>
    </div>
    <div class=""> <span class="l"><a href="javascript:;" onclick="" class=""> 批量删除</a> <a href="javascript:;" onclick="" class="">添加用户</a></span> <span class="r">共有数据：<strong></strong> 条</span> </div>
    <div class="mt-20">
        <table id="table2" style="text-align: center;border:1px solid #ddd;margin: 0;border-left:1px solid #ddd;">
            <thead>
            <tr class="table-head" style="padding: 8px">
                <th width="25"><input type="checkbox" name="all" value=""></th>
                <th width="80">用户ID</th>
                <th width="100">用户名</th>
                <th width="100">用户等级</th>
                <th width="90">地址</th>
                <th width="70">电话</th>
                <th width="100">操作</th>
            </tr>
            </thead>
            <tbody>
            <c:set var="sum" value="0"></c:set>
            <c:forEach items="${userList}" var="u">
                <tr class="head-body">
                    <td><input type="checkbox" value="1" name="check"></td>
                    <td  name="user">${u.userId}</td>
                    <td><a style="cursor:pointer" class="" onclick="">${u.username}</a></td>
                    <td>${u.level}</td>
                    <td>${u.userInfo.address}</td>
                    <td class=""><span class="">${u.userInfo.telephone}</span></td>
                    <td class="td-manage">
                        <a title="编辑" id="bian" href="javascript:" onclick="" style="text-decoration:none"><i class="" style="color: #00c800">编辑</i></a>
                        <a title="删除" href="javascript:" id="${u.userId}" onclick="" class="ml-5" style="text-decoration:none"><i class="t" style="color:#aa5500">删除</i></a>
                    </td>
                </tr>
                <c:set var="sum" value="${sum+1}"/>
            </c:forEach>
            </tbody>
            <td hidden="hidden">${sum}</td>
        </table>
    </div>
</div>

</body>
</html>
