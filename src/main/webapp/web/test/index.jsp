<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    <link rel="stylesheet" type="text/css" href="ext/resources/css/ext-all.css"><link>
    <script type="text/javascript" src="ext/extjs/ext-base.js"></script>
    <script type="text/javascript" src="ext/extjs/ext-all.js"></script>
    <script type="text/javascript" src="ext/extjs/ext-lang-zh_CN.js"></script>
    <script type="text/javascript">
        Ext.onReady(function(){
            var d = new Date();
            var time = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
            Ext.MessageBox.alert('报时','现在的时间是'+time)})
    </script>
</head>
<body>

</body>
</html>