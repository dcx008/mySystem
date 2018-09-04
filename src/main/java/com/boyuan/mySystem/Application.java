package com.boyuan.mySystem;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author boyuan
 * @date 2018/8/21
 */
@SpringBootApplication
@MapperScan("com.boyuan.mySystem.mapper")  //扫描接口 为接口创建代理对象
public class Application {
    public static void main(String[] args){
        SpringApplication.run(Application.class,args);
    }
}
