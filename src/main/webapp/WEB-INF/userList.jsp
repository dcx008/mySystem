<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>用户列表</title>
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.js"></script>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.drag.js"></script>
    <style type="text/css">
        .window{
            width:50%;
            background-color:#d0def0;
            position:absolute;
            padding:2px;
            margin:5px;
            display:none;
        }
        .content{
            height:150px;
            background-color:#FFF;
            font-size:14px;
            overflow:auto;
        }
        .title{
            padding:2px;
            color:#0CF;
            font-size:14px;
        }
        .title img{
            float:right;
        }
    </style>
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
            $("#center").myDrag({
                randomPosition:false,
                direction:'all',
                handler:'.handler',
                dragStart:function(x,y){
                    $('#huidiao span').html('').eq(0).html('开始拖动了! — 坐标 x：'+x+' y：'+y);
                },
                dragEnd:function(x,y){
                    $('#huidiao span').html('').eq(1).html('停止拖动了! — 坐标 x：'+x+' y：'+y);
                },
                dragMove:function(x,y){
                    $('#huidiao span').html('').eq(2).html('拖动中! — 坐标 x：'+x+' y：'+y);
                }
            });
        });
        function pageSizeChange(size) {
            $.ajax({
				url:"<%=request.getContextPath()%>/findUserList",
				type:"post",
                async:false,
				data:{pagesize:size},
				success:function (data) {
                    window.open(data);
                },
				error:function (e) {
					
                }
			})
        }

        //获取窗口的高度
        var windowHeight;
        //获取窗口的宽度
        var windowWidth;
        //获取弹窗的宽度
        var popWidth;
        //获取弹窗高度
        var popHeight;
        function init(){
            windowHeight=$(window).height();
            windowWidth=$(window).width();
            popHeight=$(".window").height();
            popWidth=$(".window").width();
        }
        //关闭窗口的方法
        function closeWindow(){
            $(".title img").click(function(){
                $(this).parent().parent().hide("slow");
            });
        }
        //定义弹出居中窗口的方法
        function popCenterWindow(){
            init();
            //计算弹出窗口的左上角Y的偏移量
            var popY=(windowHeight-popHeight)/2;
            var popX=(windowWidth-popWidth)/2;
            //alert('jihua.cnblogs.com');
            //设定窗口的位置
            $("#center").css("top",popY).css("left",popX).slideToggle("slow");
            closeWindow();
        }
        function popLeftWindow(){
            init();
            //计算弹出窗口的左上角Y的偏移量
            var popY=windowHeight-popHeight;
            //var popX=-(windowWidth-popWidth);
            //alert(popY);
            //设定窗口的位置
            $("#left").css("top",popY-50).css("left",50).slideToggle("slow");
            closeWindow();
        }
        function popRightWindow(){
            init();
            //计算弹出窗口的左上角Y的偏移量
            var popY=windowHeight-popHeight;
            var popX=windowWidth-popWidth;
            //alert(www.cnblogs.com/jihua);
            //设定窗口的位置
            $("#right").css("top",popY-50).css("left",popX-50).slideToggle("slow");
            closeWindow();
        }

        $(document).ready(function () {
            $("#btn_center").click(function () {
                popCenterWindow();
            });
        });


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
				<a title="编辑" id="bian" href="javascript:" onclick="popCenterWindow()" style="text-decoration:none"><i class="" style="color: #00c800">编辑</i></a>
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
    每页&nbsp;<select onchange="pageSizeChange(this.value)" id="pageSize"><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>&nbsp;条
</p>
<div class="window" id="center">
    <div id="title" class="title"><img src="" alt="关闭" />居中窗口</div>
    <div class="content">
        <form action="/member-save" method="post" class="form form-horizontal" id="form-member-add" target="_parent">
            <div class="row cl">
                <label class=""><span class="c-red">*</span>用户名：</label>
                <input type="text" class="input-text" value="${user.username}" placeholder="" id="username" name="username">
            </div>
            <div class="row cl">
                <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>性别：</label>
                <div class="radio-box">
                    <input name="userInfo.gender" type="radio" id="sex-1" checked value="男"
                           <c:if test="${user.userInfo.gender=='男'}">checked="checked"</c:if>>
                    <label for="sex-1">男</label>
                </div>
                <div class="radio-box">
                    <input type="radio" id="sex-2" name="userInfo.gender" value="女"
                           <c:if test="${user.userInfo.gender=='女'}">checked="checked"</c:if>>
                    <label for="sex-2">女</label>
                </div>
                <div class="radio-box">
                    <input type="radio" id="sex-3" name="userInfo.gender" value="保密"
                           <c:if test="${user.userInfo.gender=='保密'}">checked="checked"</c:if>>
                    <label for="sex-3">保密</label>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>手机：</label>
                <input type="text" class="input-text" value="${user.userInfo.telephone}" placeholder="" id="mobile" name="userInfo.telephone">
            </div>
            <div class="row cl">
                <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>邮箱：</label>
                <input type="text" class="input-text" placeholder="@" name="userInfo.email" id="" value="${user.userInfo.email}">
            </div>

            <div class="row cl">
                <input class="" type="submit" value="&nbsp;&nbsp;提交&nbsp;&nbsp;">
            </div>
        </form>
    </div>

</div>

</body>
</html>