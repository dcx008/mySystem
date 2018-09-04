<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ext/resources/css/ext-all.css"><link>
    <script type="text/javascript" src="<%=request.getContextPath()%>/ext/extjs/ext-base.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/ext/extjs/ext-all.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/ext/extjs/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.min.js"></script>
    <script type="text/javascript">
        function employee(name,job,born)
        {
            this.name=name;
            this.job=job;
            this.born=born;
        }

        var bill=new employee("Bill Gates","Engineer",1985);

        employee.prototype.salary=null;
        bill.salary=20000;

        document.write(bill.job);

        var myImage = (function(){
            var imgNode = document.createElement("img");
            document.body.appendChild(imgNode);
            return function(src){
                imgNode.src = src;
            }
        })();
        // 代理模式
        var ProxyImage = (function(){
            var img = new Image();
            img.onload = function(){
                myImage(this.src);
            };
            return function(src) {
                // 占位图片loading
                myImage("http://img.lanrentuku.com/img/allimg/1212/5-121204193Q9-50.gif");
                img.src = src;
            }
        })();
        // 调用方式

        ProxyImage("https://img.alicdn.com/tps/i4/TB1b_neLXXXXXcoXFXXc8PZ9XXX-130-200.png"); // 真实要展示的图片


        // 补打卡事件
        var fillOut = function (lateDate) {

            this.lateDate = lateDate;
        };

        // 这是bigBoss
        var bigBoss = function (fillOut) {

            this.state = function (isSuccess) {
                console.log("忘记打卡的日期为：" + fillOut.lateDate + ", 补打卡状态：" + isSuccess);
            }
        };
        // 助理代理大boss 完成补打卡审批
        var proxyAssis = function (fillOut) {

            this.state = function (isSuccess) {
                (new bigBoss(fillOut)).state(isSuccess); // 替bigBoss审批
            }
        };

        // 调用方法：
        var proxyAssis = new proxyAssis(new fillOut("2016-9-11"));
        proxyAssis.state("补打卡成功");

        // 忘记打卡的日期为：2016-9-11, 补打卡状态：补打卡成功

        var Interview = function(){};
        // 笔试
        Interview.prototype.writtenTest = function(){
            console.log("这里是前端笔试题");
        };
        // 技术面试
        Interview.prototype.technicalInterview = function(){
            console.log("这里是技术面试");
        };
        // 领导面试
        Interview.prototype.leader = function(){
            console.log("领导面试");
        };
        // 领导面试
        Interview.prototype.HR = function(){
            console.log("HR面试");
        };
        // 等通知
        Interview.prototype.waitNotice = function(){
            console.log("等通知啊，不知道过了没有哦");
        };
        // 代码初始化
        Interview.prototype.init = function(){
            this.writtenTest();
            this.technicalInterview();
            this.leader();
            this.HR();
            this.waitNotice();
        };

        // 阿里巴巴的笔试和技术面不同，重写父类方法，其他继承父类方法。
        var AliInterview = function(){};
        AliInterview.prototype = new Interview();

        // 子类重写方法 实现自己的业务逻辑
        AliInterview.prototype.writtenTest = function(){
            console.log("阿里的技术题就是难啊");
        }
        AliInterview.prototype.technicalInterview = function(){
            console.log("阿里的技术面就是叼啊");
        }
        var AliInterview = new AliInterview();
        AliInterview.init();

        // 阿里的技术题就是难啊
        // 阿里的技术面就是叼啊
        // 领导面试
        // HR面试
        // 等通知啊，不知道过了没有哦
    </script>
</head>
<body>

</body>
</html>
