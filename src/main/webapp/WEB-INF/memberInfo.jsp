<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>弹窗</title>
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath()%>/css/window.css">
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.min.js"></script>
    <script type="text/javascript">

        var btn = document.getElementById('open_btn');
        var div = document.getElementById('background');
        var close = document.getElementById('close-button');

        btn.onclick = function show(){
            div.style.display = "block";
        };

        close.onclick = function close(){
            div.style.display = "none";
        };
        window.onclick = function close(e){
            if (e.target == div) {
                div.style.display = "none";
            }
        }
    </script>
</head>
<body>
<button id="open_btn" class="btn">弹窗</button>
<!-- 弹窗内容开始 -->
<div id="background" class="back" onclick="">
    <div id="div1" class="content">
        <div id="close">
            <span id="close-button">×</span>
            <h2>弹窗头部</h2>
        </div>
        <div id="div2">
            <h3>弹窗标题</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste, ullam, nisi, enim laboriosam ea cum necessitatibus ipsum cupiditate neque soluta qui autem odit eligendi blanditiis voluptatem repellat suscipit quia perspiciatis.</p>
        </div>
        <h3 id="foot">底部内容</h3>
    </div>
</div>
<!-- 弹窗内容结束 -->
</body>
</html>

