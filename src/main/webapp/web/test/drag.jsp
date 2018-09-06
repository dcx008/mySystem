<%--
  Created by IntelliJ IDEA.
  User: boyuan
  Date: 2018/9/6
  Time: 13:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        #box {
            position: absolute;
            top: 100px;
            left: 200px;
            width: 500px;
        }
        #bar {
            padding-left:50px;
            height: 50px;
            line-height: 50px;
            color: white;
            background-color: #aaa;
            cursor: move;
        }
        #content {
            padding:30px 0 0 50px ;
            height: 300px;
            background-color: #eee;
        }
    </style>
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.js"></script>

</head>

<body>
<div id="box">
    <div id="bar">可拖拽头部</div>
    <div id="content">这里是内容</div>
</div>

</body>
<script type="text/javascript">
    /*
  * zzw.drag 2017-3
  * js实现div可拖拽
  * @params bar 可以点击拖动的元素
  * @params box 拖动的整体元素 必须是position: absolute;
  * 思想：鼠标的clienX/clientY相对值设置为父元素的left/top的相对值
  */

    var dragBox = function (drag, wrap) {

        function getCss(ele, prop) {
            return parseInt(window.getComputedStyle(ele)[prop]);
        }

        var initX,
            initY,
            dragable = false,
            wrapLeft = getCss(wrap, "left"),
            wrapRight = getCss(wrap, "top");

        drag.addEventListener("mousedown", function (e) {
            dragable = true;
            initX = e.clientX;
            initY = e.clientY;
        }, false);

        document.addEventListener("mousemove", function (e) {
            if (dragable === true ) {
                var nowX = e.clientX,
                    nowY = e.clientY,
                    disX = nowX - initX,
                    disY = nowY - initY;
                wrap.style.left = wrapLeft + disX + "px";
                wrap.style.top = wrapRight + disY + "px";
            }
        });

        drag.addEventListener("mouseup", function (e) {
            dragable = false;
            wrapLeft = getCss(wrap, "left");
            wrapRight = getCss(wrap, "top");
        }, false);

    };

    dragBox(document.querySelector("#bar"), document.querySelector("#box"));
</script>
</html>
