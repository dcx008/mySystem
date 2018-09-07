<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();

    Object username = request.getSession(false).getAttribute("username");
%>
<script type="text/javascript">
    var userName = "<%=username%>"
</script>
<link rel="stylesheet" type="text/css" href="<%=path%>/ext/resources/css/ext-all.css"><link>
<script type="text/javascript" src="<%=path%>/ext/extjs/ext-base.js"></script>
<script type="text/javascript" src="<%=path%>/ext/extjs/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/ext/extjs/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=path%>/js/jquery.js"></script>
<script type="text/javascript" src="<%=path%>/js/common.js"></script>
