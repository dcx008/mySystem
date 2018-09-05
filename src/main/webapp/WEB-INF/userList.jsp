<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>用户列表</title>
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.js"></script>
    <!--使用jQuery简单判定跳转的页数是否合法-->
    <script type="text/javascript">
        $(function(){
            $("#btn").click(function(){
                var pageNum = Number($("#num").val());
                var pages = Number($("#pages").val());
                if(isNaN(pageNum)){
                    alert("请输入数字！");
                    return;
                }
                if(pageNum > pages){
                    alert("输入页码错误！");
                    return;
                }
                location.href = "<%=request.getContextPath()%>/customerAction?pagenum="+pageNum;
            });

        });
        function pageSizeChange() {
            var size = $("#pageSize").val();
            alert(size);
        }
    </script>
</head>
<body>
<h2>用户列表</h2>
<div class="text-c">
    <form action="<%=request.getContextPath()%>/findUserList" method="post">
        <input type="text" class="input-text" style="width:250px" placeholder="输入会员名称、电话、邮箱" id="" name="keyword">
        <button type="submit" name="">搜用户</button>
    </form>
</div>
<table border="1" width="80%">
	<tr>
		<th><input type="checkbox" name="all" value=""></th>
		<th>用户ID</th>
		<th>用户名</th>
		<th>用户等级</th>
		<th>地址</th>
		<th>电话</th>
		<th>操作</th>
	</tr>
	<c:forEach items="${page.list}" var="ct" varStatus="status">     <!--使用迭代标签库 -->
		<tr style="background-color: ${status.index%2==0? '#E0FFFF':'#EEE685'}">  <!--'#E0FFFF':'#EEE685'-->
			<td style="text-align: center"><input type="checkbox" value="1" name="check"></td>
			<td style="text-align: center">${ct.userId}</td>
			<td style="text-align: center">${ct.username}</td>
			<td style="text-align: center">${ct.level}</td>
			<td style="text-align: center">${ct.userInfo.address}</td>
			<td style="text-align: center">${ct.userInfo.telephone}</td>
			<td style="text-align: center">
				<a title="编辑" id="bian" href="javascript:" onclick="" style="text-decoration:none"><i class="" style="color: #00c800">编辑</i></a>
				<a title="删除" href="javascript:" id="${ct.userId}" onclick="" class="ml-5" style="text-decoration:none"><i class="t" style="color:#aa5500">删除</i></a>
			</td>
		</tr>
	</c:forEach>
</table>
<p>

	<a href="<%=request.getContextPath()%>/findUserList?pagenum=1">首页</a>
	<a href="<%=request.getContextPath()%>/findUserList?pagenum=${page.currentPage-1<1? 1 : page.currentPage-1}">上一页</a>
	<a href="<%=request.getContextPath()%>/findUserList?pagenum=${page.currentPage+1<page.totalPages? page.currentPage+1 : page.totalPages}">下一页</a>
	<a href="<%=request.getContextPath()%>/findUserList?pagenum=${page.totalPages}">尾页</a>
    <input type="button" id="btn"  value="跳转至"/>&nbsp;<input id="num"style="width: 20px" />&nbsp;页
	<input id="pages" value="${page.totalPages }" type="hidden">
    总记录数：${page.totalRecords }条
    当前第${page.currentPage }页/共${page.totalPages }页
    每页&nbsp;<select onchange="pageSizeChange()" id="pageSize"><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>&nbsp;条
</p>


</body>
</html>