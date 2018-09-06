package com.boyuan.mySystem.pojo;

import java.util.List;

/**
 * @author boyuan
 * @date 2018/9/5
 */
public class Page {
    private Integer totalRecords;//总记录数   从数据库查询
    private Integer pageSize=5;//每页显示多少条
    private Integer totalPages;//总页数    计算出来
    private Integer currentPage;//当前页码
    private List<?> list; //每页存放的数据   从数据库查询
    private Integer startIndex;//每页开始查询的索引 计算出来

    public Page(Integer currentPage,Integer totalRecords){
        this.currentPage = currentPage;
        this.totalRecords = totalRecords;
        this.totalPages = (totalRecords%pageSize==0?  totalRecords/pageSize : totalRecords/pageSize+1);
        this.startIndex = (currentPage-1)*pageSize;
    }

    public Page(Integer currentPage,Integer totalRecords,Integer pageSize){
        this.currentPage = currentPage;
        this.totalRecords = totalRecords;
        this.pageSize = pageSize;
        this.totalPages = (totalRecords%pageSize==0?  totalRecords/pageSize : totalRecords/pageSize+1);
        this.startIndex = (currentPage-1)*pageSize;
    }

    public Integer getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(Integer totalRecords) {
        this.totalRecords = totalRecords;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public List<?> getList() {
        return list;
    }

    public void setList(List<?> list) {
        this.list = list;
    }

    public Integer getStartIndex() {
        return startIndex;
    }

    public void setStartIndex(Integer startIndex) {
        this.startIndex = startIndex;
    }
}
