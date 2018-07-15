package com.micromap.business.oneplatform.system.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.type.Alias;

/**
 *
 * Tree的实体类
 * @Author	gaoliqi
 *
 *
 */
@Alias("treeJson")
public class TreeJson implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    private String id ; 
    private String pid ; 
    private String text ; 
    private String iconCls ;
    private String state ; 
    private boolean checked ; 
    private String isLeaf;
    private String ifCheck;
    private Map<String, Object> attributes;
    private Object WrapObject;
    private Integer treeLevel;
    private List<TreeJson> children = new ArrayList<TreeJson>() ;
    

    public static List<TreeJson> formatTree(List<TreeJson> list) {

        TreeJson root = new TreeJson();
        TreeJson node = new TreeJson();
        List<TreeJson> treelist = new ArrayList<TreeJson>();// 拼凑好的json格式的数据
        List<TreeJson> parentnodes = new ArrayList<TreeJson>();// parentnodes存放所有的父节点
        
        if (list != null && list.size() > 0) {
            root = list.get(0) ;
            //循环遍历oracle树查询的所有节点
            for (int i = 1; i < list.size(); i++) {
                node = list.get(i);
                if(node.getPid().equals(root.getId())){
                    //为tree root 增加子节点
                    parentnodes.add(node);
                    root.getChildren().add(node);
                }else{//获取root子节点的孩子节点
                    getChildrenNodes(parentnodes, node);
                    parentnodes.add(node);
                }
            }    
        }
        treelist.add(root);
        return treelist;
    }
    
    public static List<TreeJson> format(List<TreeJson> list, String topId) {

        TreeJson root = new TreeJson();
        List<TreeJson> treelist = new ArrayList<TreeJson>();// 拼凑好的json格式的数据
        List<TreeJson> addNodeList = new ArrayList<TreeJson>();// parentnodes存放所有的父节点
        
        if (list != null && list.size() > 0) {
            for(int index = 0; index < list.size(); index ++){
            	TreeJson json = list.get(index);
            	
            	if(topId != null && topId.equals(json.getPid())){
            		addNodeList.add(json);
            		treelist.add(json);
            	}else{
            		getChildrenNodes(addNodeList, json);
            		addNodeList.add(json);
            	}
            }
        }
        return treelist;
    }
    
    public static List<TreeJson> formatAsTree(List<TreeJson> list, int openLevel) {

        TreeJson root = new TreeJson();
        List<TreeJson> treelist = new ArrayList<TreeJson>();// 拼凑好的json格式的数据
        List<TreeJson> addNodeList = new ArrayList<TreeJson>();// parentnodes存放所有的父节点
        
        if (list != null && list.size() > 0) {
            for(int index = 0; index < list.size(); index ++){
            	TreeJson json = list.get(index);
            	if(json.getTreeLevel() <= openLevel){
            		json.setState("open");
            	}else if("N".equalsIgnoreCase(json.getIsLeaf())){
            		json.setState("closed");
            	}
            	if(json.getTreeLevel() == 1){
            		addNodeList.add(json);
            		treelist.add(json);
            	}else{
            		getChildrenNodes(addNodeList, json);
            		addNodeList.add(json);
            	}
            }
        }
        return treelist;
    }

    private static void getChildrenNodes(List<TreeJson> parentnodes, TreeJson node) {
        //循环遍历所有父节点和node进行匹配，确定父子关系
        for (int i = parentnodes.size() - 1; i >= 0; i--) {
            
            TreeJson pnode = parentnodes.get(i);
            //如果是父子关系，为父节点增加子节点，退出for循环
            if (pnode.getId().equals(node.getPid())) {
                pnode.getChildren().add(node) ;
                return ;
            } else {
                //如果不是父子关系，删除父节点栈里当前的节点，
                //继续此次循环，直到确定父子关系或不存在退出for循环
                parentnodes.remove(i) ;
            }
        }
    }

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public List<TreeJson> getChildren() {
		return children;
	}

	public void setChildren(List<TreeJson> children) {
		this.children = children;
	}

	public Object getWrapObject() {
		return WrapObject;
	}

	public void setWrapObject(Object wrapObject) {
		WrapObject = wrapObject;
	}

	public Integer getTreeLevel() {
		return treeLevel;
	}

	public void setTreeLevel(Integer treeLevel) {
		this.treeLevel = treeLevel;
	}

	public String getIfCheck() {
		return ifCheck;
	}

	public void setIfCheck(String ifCheck) {
		this.ifCheck = ifCheck;
		if("Yes".equalsIgnoreCase(ifCheck) ||"1".equalsIgnoreCase(ifCheck)||"true".equalsIgnoreCase(ifCheck)){
			checked = true;
		}else{
			checked = false;
		}
	}
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public String getIsLeaf() {
		return isLeaf;
	}

	public void setIsLeaf(String isLeaf) {
		this.isLeaf = isLeaf;
	}
}