<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>管理系统</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <link rel="stylesheet" type="text/css" href="ext/resources/css/ext-all-green.css"/>
    <link rel="stylesheet" type="text/css" href="ext/resources/css/ux/ColumnHeaderGroup.css"/>
    <link rel="stylesheet" type="text/css" href="ext/resources/css/ux/GroupHeaderPlugin.css"/>
    <link rel="stylesheet" type="text/css" href="ext/resources/css/ux/GroupSummary.css"/>
    <link rel="stylesheet" type="text/css" href="ext/resources/css/ux/GridSummary.css"/>
    <link rel="stylesheet" type="text/css" href="ext/resources/css/ux/LockingGridView.css"/>
    <link rel="stylesheet" type="text/css" href="css/Spinner.css"/>
    <link rel="stylesheet" type="text/css" href="css/welcome.css"/>
    <link rel="stylesheet" type="text/css" href="font/iconfont.css"/>
    <link rel="stylesheet" type="text/css" href="css/fileuploadfield.css"/>
    <link rel="stylesheet" type="text/css" href="ext/extjs/treegrid/treegrid.css" rel="stylesheet" />

    <script type="text/javascript">
        // IE console.log导致打不开页面兼容
        window.console = window.console || (function () {
            var c ={};
            c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile= c.clear = c.exception = c.trace = c.assert = function(){};
            return c;
        })();

        var is_ie8=false;
        if (navigator.appName === 'Microsoft Internet Explorer') { //判断是否是IE浏览器
            if (navigator.userAgent.match(/Trident/i) && navigator.userAgent.match(/MSIE 8.0/i)) { //判断浏览器内核是否为Trident内核IE8.0
                is_ie8=true;
            }
        }
    </script>

    <script src="js/jquery.js"></script>

    <%--  要在这里引入echarts--%>
    <script src="js/echarts.min.js"></script>
    <%--复制数据功能 此插件只支持IE9+ 暂时去掉<script src="<%=path %>/js/clipboard/clipboard.min.js"></script>--%>
    <%--<script src="<%=path %>/js/chartTheme/theme.js"></script>--%>
    <%--  生产环境使用 --%>
    <%--    <script src="<%=path %>/js/require.js" data-main="js/main" ></script>--%>
    <%--  开发环境使用 --%>
    <script src="js/require.js" defer async="true" data-main="js/main-dev" ></script>

    <script>

    </script>
</head>
<body>
</body>
</html>
