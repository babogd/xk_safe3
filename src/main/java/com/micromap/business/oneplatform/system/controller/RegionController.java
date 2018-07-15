package com.micromap.business.oneplatform.system.controller;

import com.micromap.business.oneplatform.common.controller.BaseController;
import com.micromap.business.oneplatform.system.entity.QRegion;
import com.micromap.business.oneplatform.system.entity.Region;
import com.micromap.business.oneplatform.system.service.RegionService;
import com.querydsl.core.BooleanBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

import static com.micromap.business.oneplatform.utils.Constants.API_PREFIX;
import static com.micromap.business.oneplatform.utils.Constants.VIEW_PREFIX;

/**
 * Create By Fighting on 2018/6/19 0019
 */
@Controller
public class RegionController extends BaseController {
    private static final String URL_PATH = "region";

    private final RegionService regionService;

    @Autowired
    public RegionController(RegionService regionService) {
        this.regionService = regionService;
    }

    /**
     * 跳转到行政区树实例界面
     */
    @GetMapping(VIEW_PREFIX + "demo/region-tree")
    public String detail() {
        return "demo/region-tree";

    }

    /**
     * 该方法暂时不用，一次查询出树前台界面会卡顿
     * @param request
     * @param response
     * @return
     */
   /* @GetMapping(API_PREFIX + URL_PATH + "/tree")
    @ResponseBody
    public Object queryAllRegionTree(HttpServletRequest request, HttpServletResponse response) {
        Iterator<Region> regionIterator = regionService.findAll().iterator();
        Map<String, Map<String, Object>> lookup = new HashMap<>();
        List<Map<String, Object>> provinceList = new ArrayList<>();
        while (regionIterator.hasNext()) {
            Region region = regionIterator.next();
            String regionCode = region.getRegionCode();
            String parentCode = region.getParentCode();
            String regionName = region.getRegionName();
            //System.out.println(regionCode);
            //System.out.println(region.getRegionName());
            //判断lookup中是否先存在该元素
            if (lookup.get(regionCode) == null) {
                lookup.put(regionCode, new HashMap<>());
                lookup.get(regionCode).put("children",  new ArrayList<>());
            }
            lookup.get(regionCode).put("id", regionCode);
            lookup.get(regionCode).put("text", regionName);
            lookup.get(regionCode).put("state", "closed");
            Map<String,Object> treeItem = lookup.get(regionCode);
            System.out.println(lookup.get(regionCode).get("id").toString());
            //判断是否为跟节点
            if ("000000000000".equals(parentCode)) {
                provinceList.add(treeItem);
            } else {
                //将节点放入父节点的children
                if (lookup.get(parentCode) == null) {
                    // List<Map<String, Object>> childList = (ArrayList)lookup.get(parentCode).get("children");
                    Map<String,Object> item2 = new HashMap<>();
                    item2.put("id", parentCode);
                    //item.put("text", regionName);
                    item2.put("children", new ArrayList<>());
                    lookup.put(parentCode, item2);
                }
                ((ArrayList)lookup.get(parentCode).get("children")).add(treeItem);
            }

        }
        return provinceList;
    }*/

    /**
     * 查询行政区树，分别查询各个级别
     *
     * @param request
     * @param response
     * @return
     */
    @GetMapping(API_PREFIX + URL_PATH + "/tree")
    @ResponseBody
    public Object selectRegionByParentId(HttpServletRequest request, HttpServletResponse response) {
        final BooleanBuilder where = new BooleanBuilder();
        final QRegion query = QRegion.region;
        if (!StringUtils.isEmpty(request.getParameter("id"))) {
            where.and(query.parentCode.eq(request.getParameter("id")));
        } else {
            where.and(query.parentCode.eq("000000000000"));
        }
        Sort sort = new Sort(Sort.Direction.ASC, "regionCode");
        Iterator<Region> regionIterator = regionService.findAll(where, sort).iterator();
        List<Map<String, Object>> resultList = new ArrayList<>();
        while (regionIterator.hasNext()) {
            Region region = regionIterator.next();
            Map<String, Object> item = new HashMap<>();
            item.put("id", region.getRegionCode());
            item.put("text", region.getRegionName());
            //省级，市级显示子节点
            if (region.getCountyCode().equals(region.getCityCode())) {
                item.put("state", "closed");
                item.put("children", new ArrayList<>());
            }
            resultList.add(item);
        }
        return resultList;
    }

}
