<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" pageEncoding="utf-8"%>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>注册页面</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <link type="text/css" rel="stylesheet" href="css/login.css">
    <!-- 引入jQuery库 -->
    <script type="text/javascript" src="js/jquery-1.4.2.js"></script>

    <script>
        /* 文档就绪事件函数 */
        $(function(){

            /* 给所有输入框添加失去输入焦点事件, 当失去输入焦点时检查
            输入框是否为空或者两次密码是否一致或者邮箱格式是否正确 */
            //用户名

            $("input[name='username']").blur(function(){
                var username = $("#username").val();
                if(username){
                    //发送ajax请求
                    $.ajax({
                        type:"POST",
                        url:"/checkUsername",
                        data:{
                            username:$("#username").val()
                        },
                        dataType:"json",
                        error:function(){
                            alert('ajax请求请求错误...')
                        },
                        success:function(data){
                            //清空
                            $("#errorMsg1").empty();
                            if(data.username=="yes"){
                                //将接收到的数据显示到文本框
                                $('#errorMsg1').css("color","green");
                                $('#errorMsg1').html(" *用户名可以注册");
                            } else{
                                $('#errorMsg1').css("color","red");
                                $('#errorMsg1').html(" *用户名已存在");
                            }
                        }
                    })
                }
            });
            $("input[name='password']").blur(function () {
                var pwd = $("#pwd1").val();
                var pwd1 = $("#pwd1").val();
                var pwd2 = $("#pwd2").val();
                if(pwd1 && pwd2 && pwd1!=pwd2){
                    $('#errorMsg3').css("color","red");
                    $('#errorMsg3').html(" *两次密码不一致");
                }else if(pwd1 && pwd2 && pwd1==pwd2){
                    $('#errorMsg3').empty();
                    $('#errorMsg3').css("color","green");
                    $('#errorMsg3').html(" *两次密码一致");
                }
            });
            $("input[name='password2']").blur(function () {
                var pwd1 = $("#pwd1").val();
                var pwd2 = $("#pwd2").val();
                if(pwd1 && pwd2 && pwd1!=pwd2){
                    $('#errorMsg3').css("color","red");
                    $('#errorMsg3').html(" *两次密码不一致");
                }else if(pwd1 && pwd2 && pwd1==pwd2){
                    $('#errorMsg3').empty();
                    $('#errorMsg3').css("color","green");
                    $('#errorMsg3').html(" *两次密码一致");
                }
            });
            $("input[name='email']").blur(function () {

            });
        });


    </script>
</head>
<body class="login_bj" >
<!-- onsubmit事件在表单提交时触发, 该事件会根据返回值决定
			是否提交表单, 如果onsubmit="return true"会继续提交表单
			如果onsubmit="return fasle"表单将不会提交!

			onsubmit=""引号中报错并不是因为代码有问题, 而是myeclipse
			工具在检查语法认为这个代码有问题, 其实没有错误!!
		 -->
<div class="zhuce_body">
    <div class="zhuce_kong">
    	<div class="zc" >
        	<div class="bj_bai">
            <h3 style="font-weight: bold">欢迎注册</h3>
       	  	  <form id="commentForm" onsubmit="return formObj.checkForm()" action="/ToRegist" method="post" style="margin: auto">
                <label><input id="username" name="username" type="text" class="kuang_txt" placeholder="用户名（必填）" value="${user.username}"><b id="errorMsg1"></b></label>
                  <label><input id="pwd1" name="password" type="password" class="kuang_txt" placeholder="密码（必填）"  value="${user.password}"><b id="errorMsg2"></b></label>
                  <label><input id="pwd2" name="password2" type="password" class="kuang_txt" placeholder="确认密码（必填）" value="${password2}"><b id="errorMsg3"></b></label>
                  <label><input id="email" name="userInfo.email" type="text" class="kuang_txt" placeholder="邮箱（必填）" value="${user.userInfo.email}"><b id="errorMsg4"></b></label><br/>
                  <label for="male"><input id="male" type="radio" name="userInfo.gender" value="男" checked="checked" style="margin: 0px 0px 10px 10px;" <c:if test="${user.userInfo.gender=='男'}">checked</c:if>/> 男 </label>
                  <label for="female"><input id="female" type="radio" name="userInfo.gender" value="女" style="margin: 0px 0px 10px 10px;" <c:if test="${user.userInfo.gender=='女'}">checked</c:if>/> 女 </label><br/>
                  <label><input id="name" name="userInfo.name" type="text" class="kuang_txt" placeholder="真实姓名（选填）" value="${user.userInfo.name}"></label>
                  <label><input id="age" name="userInfo.age" type="text" class="kuang_txt" placeholder="年龄（选填）" value="${user.userInfo.age}"></label>
                  <label><input id="address" name="userInfo.address" type="text" class="kuang_txt" placeholder="家庭地址（选填）" value="${user.userInfo.address}"></label>
                  <label><input id="telephone" name="userInfo.telephone" type="text" class="kuang_txt" placeholder="电话号码（选填）" value="${user.userInfo.telephone}"></label>
                <input name="注册" type="submit" class="btn_zhuce" value="注册">
                
                </form>
            </div>
        </div>
    </div>

</div>

</body>
</html>