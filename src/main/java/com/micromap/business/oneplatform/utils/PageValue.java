package com.micromap.business.oneplatform.utils;

/**
 * 非JPA分页配置
 * @Author charlie高  20180702
 */
public class PageValue
{
  private String usePage;
  private int currPage;
  private int endRow;
  private boolean gotoEnd;
  private boolean gotoFirst;
  private boolean gotoSp;
  private int alwaysShowRowNum;
  private boolean nextPage;
  private int pageSize = 15;
  private boolean previouPage;
  private int startRow;
  private int totalPage;
  private int totalRows;
  private String smartPage;
  
  public String getUsePage()
  {
    return this.usePage;
  }
  
  public void setUsePage(String usePage)
  {
    this.usePage = usePage;
  }
  
  public String getSmartPage()
  {
    return this.smartPage;
  }
  
  public void setSmartPage(String smartPage)
  {
    this.smartPage = smartPage;
  }
  
  public int getCurrPage()
  {
    return this.currPage;
  }
  
  public int getEndRow()
  {
    return this.endRow;
  }
  
  public int getPageSize()
  {
    return this.pageSize;
  }
  
  public int getStartRow()
  {
    return this.startRow;
  }
  
  public int getTotalPage()
  {
    return this.totalPage;
  }
  
  public int getTotalRows()
  {
    return this.totalRows;
  }
  
  public boolean isGotoEnd()
  {
    return this.gotoEnd;
  }
  
  public boolean isGotoFirst()
  {
    return this.gotoFirst;
  }
  
  public boolean isGotoSp()
  {
    return this.gotoSp;
  }
  
  public boolean isNextPage()
  {
    return this.nextPage;
  }
  
  public boolean isPreviouPage()
  {
    return this.previouPage;
  }
  
  public void setCurrPage(int currPage)
  {
    this.currPage = currPage;
  }
  
  public void setEndRow(int endRow)
  {
    this.endRow = endRow;
  }
  
  public void setGotoEnd(boolean gotoEnd)
  {
    this.gotoEnd = gotoEnd;
  }
  
  public void setGotoFirst(boolean gotoFirst)
  {
    this.gotoFirst = gotoFirst;
  }
  
  public void setGotoSp(boolean gotoSp)
  {
    this.gotoSp = gotoSp;
  }
  
  public void setNextPage(boolean nextPage)
  {
    this.nextPage = nextPage;
  }
  
  public void setPageSize(int pageSize)
  {
    this.pageSize = pageSize;
  }
  
  public void setPreviouPage(boolean previouPage)
  {
    this.previouPage = previouPage;
  }
  
  public void setStartRow(int startRow)
  {
    this.startRow = startRow;
  }
  
  public void setTotalPage(int totalPage)
  {
    this.totalPage = totalPage;
  }
  
  public void setTotalRows(int totalRows)
  {
    this.totalRows = totalRows;
  }
  
  public String toString()
  {
    String mes = " currPage:(" + this.currPage + ")";
    mes = mes + " totalPage:(" + this.totalPage + ")";
    
    mes = mes + " nextPage:(" + this.nextPage + ")";
    mes = mes + " previouPage:(" + this.previouPage + ")";
    mes = mes + " gotoFirst:(" + this.gotoFirst + ")";
    mes = mes + " gotoEnd:(" + this.gotoEnd + ")";
    mes = mes + " gotoSp:(" + this.gotoSp + ")";
    mes = mes + " pageSize:(" + this.pageSize + ")";
    
    return mes;
  }
  
  public int getAlwaysShowRowNum()
  {
    return this.alwaysShowRowNum;
  }
  
  public void setAlwaysShowRowNum(int alwaysShowRowNum)
  {
    this.alwaysShowRowNum = alwaysShowRowNum;
  }
}
