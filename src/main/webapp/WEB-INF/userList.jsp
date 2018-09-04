<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>您好Springboot</title>
</head>
<body>
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