package com.micromap.business.oneplatform.daily.controller;

import com.micromap.business.oneplatform.common.controller.BaseController;
import com.micromap.business.oneplatform.common.entity.UiParam;
import com.micromap.business.oneplatform.config.SecurityAuditAware;
import com.micromap.business.oneplatform.daily.entity.*;
import com.micromap.business.oneplatform.daily.mapper.HiddenDangerMapper;
import com.micromap.business.oneplatform.daily.service.HiddenDangerService;
import com.micromap.business.oneplatform.daily.service.MoveInfoService;

import com.micromap.business.oneplatform.daily.service.SuperviseService;
import com.micromap.business.oneplatform.system.dto.TreeJson;
import com.micromap.business.oneplatform.system.entity.*;
import com.micromap.business.oneplatform.system.service.AccessoryService;
import com.micromap.business.oneplatform.system.service.DeptService;
import com.micromap.business.oneplatform.system.service.UserService;
import com.micromap.business.oneplatform.utils.ApiResult;
import com.micromap.business.oneplatform.utils.PageResult;
import com.micromap.business.oneplatform.utils.SecurityUtils;
import com.querydsl.core.BooleanBuilder;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Nonnull;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.validation.Valid;
import java.time.LocalDate;
import java.util.*;

import static com.micromap.business.oneplatform.utils.ApiResult.fail;
import static com.micromap.business.oneplatform.utils.ApiResult.success;
import static org.springframework.http.ResponseEntity.ok;


/**
 *
 * @author gaoliqi 20180619
 * 隐患排查Controller
 *
 */
@Controller
@RequestMapping("/hd")
public class HiddenDangerController extends BaseController {

    @Autowired
    private HiddenDangerService hiddenDangerService;

    @Autowired
    private DeptService deptService;

    @Autowired
    private UserService userService;

    @Autowired
    private HiddenDangerMapper hdMapper;

    @Autowired
    private AccessoryService accessoryService;

    @Autowired
    EntityManager entityManager;

    @Autowired
    private MoveInfoService moveInfoService;

    @Autowired
    private SuperviseService superviseService;

    @Autowired
    private SecurityAuditAware aware;


    protected  User currentUser = null;


    public HiddenDangerController(){
        //param = super.reponseParam;
        //initParam();
    }


    private Map<String, Object> initParam(){
        Map<String, Object> param = new HashMap<>();
        Long currUserId = null;
        if(aware != null && false) {
            Optional<User> userOpt = aware.getCurrentAuditor();
            if (userOpt.isPresent()) {
                currUserId = userOpt.get().getId();
            }
            if (currUserId != null) {
                currentUser = getCurrentUser(currUserId);
                //响应中加入当前用户currentUser
                param.put("currentUser", currentUser);

            }

        }
        param.put("user", initUserInfo());
        param.put("nowDate", new Date());
        return param;
    }

    /**
     * 获取当前用户
     * @return User
     */
    protected User getCurrentUser(Long userId){

        BooleanBuilder where = new BooleanBuilder();
        QUser userQ = QUser.user;
        where.and(userQ.id.eq(userId));
        User user = userService.findOne(where).get();
        return user;
    }

    /**
     * 自查隐患
     * @return
     */
    @RequestMapping("/view/self_inspect")
    public String self_inspect() {
        return  "daily/hiddendanger-assign/self_inspect";
    }


    /**
     * 政府检查隐患入口
     * @return
     */
    @RequestMapping("/view/gov_inspect")
    public Object gov_inspect() {
        return new ModelAndView("daily/hiddendanger-baseinfo/gov_inspect", initParam());
    }


    /**
     * 企业进入企业自查隐患入口
     * @return
     */
    @RequestMapping("/view/enterprise_inspect")
    public Object enterprise_inspect(@RequestParam(name="govHere") String govHere) {
        Map<String, Object> param = initParam();
        param.put("govHere", govHere);
        param.put("hdSrc", "1");
        return new ModelAndView( "daily/hiddendanger-baseinfo/enterprise_inspect", param);
    }

    /**
     * 登记隐患
     * @param hdLevel 1一般隐患  2 严重隐患
     * @param hdSrc  2政府排查  1企业自查
     * @return
     */
    @RequestMapping("/view/add_hd")
    public Object add_hd_page(@RequestParam(name="hdLevel") String hdLevel,
                              @RequestParam(name="hdSrc") String hdSrc,
                              @RequestParam(name="enterpriseSelf") String enterpriseSelf){
        Map<String, Object> param = initParam();
        param.put("hdLevel", hdLevel);
        param.put("hdSrc", hdSrc);
        param.put("enterpriseSelf", enterpriseSelf);
        return new ModelAndView( "daily/hiddendanger-baseinfo/hd_detail", param);
    }

    /**
     * 整改页面
     * @param hd
     * @return
     */
    @RequestMapping("/view/neaten_hd")
    public Object neaten_hd_one(HiddenDanger hd){
        Map<String, Object> param = initParam();
        param.put("hd_id", hd.getId());
        param.put("hd", hd);
        return new ModelAndView("daily/hiddendanger-baseinfo/hd_detail", param);
    }

    /**
     * 查看单个页面
     * @param hd
     * @return
     */
    @RequestMapping("/view/one")
    public Object viewOne(HiddenDanger hd){
        Map<String, Object> param = initParam();
        param.put("hd_id", hd.getId());
        param.put("hd", hd);
        param.put("justShow","1");
        return new ModelAndView("daily/hiddendanger-baseinfo/hd_detail", param);
    }

    /**
     * 查看单个隐患信息（包括移交、核查、挂牌的信息）
     * @param hd
     * @return
     */
    @RequestMapping("/view/hd_info_list")
    public Object hd_info_list(HiddenDanger hd){
        Map<String, Object> param = initParam();
        param.put("hd_id", hd.getId());
        param.put("hd", hd);
        return new ModelAndView("daily/hiddendanger-baseinfo/hd_info_list", param);
    }

    /**
     * 隐患移交
     * @param hd_id 隐患ID
     * @return
     */
    @RequestMapping("/view/move_detail")
    public Object movePage(@RequestParam(name="hd_id") Long hd_id){
        Map<String, Object> param = initParam();
        Optional<HiddenDanger> opt = findOne(hd_id);
        param.put("hiddenDanger", opt.get());
        return new ModelAndView("daily/hiddendanger-moveinfo/move_detail", param);
    }

    /**
     * 隐患管理子页面
     * @param stat all 所有隐患  notyet未整改隐患  finish已完成隐患  delay 延期隐患
     * @param hdSrc 2政府排查  1企业自查
     * @return
     */
    @RequestMapping("/view/inspect_{stat}")
    public Object gov_inspect(@PathVariable(name="stat") String stat, @RequestParam(name="hdSrc") String hdSrc) {
        Map<String, Object> param = initParam();
        param.put("stat", stat);
        param.put("hdSrc", hdSrc);
        return new ModelAndView("daily/hiddendanger-baseinfo/inspect_list", param);
    }

    /**
     *  选择部门页面
     * @param deptType 0 政府 1企业
     * @return
     */
    @RequestMapping("/view/choose_dept")
    public Object choose_comp(@RequestParam(name="deptType") String deptType, @RequestParam(name="onlyOne") String onlyOne) {
        Map<String, Object> param = initParam();
        param.put("deptType", deptType);
        param.put("onlyOne", onlyOne);
        return new ModelAndView( "daily/hiddendanger-common/choose_dept", param);
    }

    /**
     * 受理移交页面
     * @return
     */
    @RequestMapping("/view/assign_detail")
    public Object v_assign_detail(@RequestParam(name = "moveInfoId") Long moveInfoId) {
        MoveInfo moveInfo = moveInfoService.findOne(moveInfoId).get();
        Map<String, Object> param = initParam();
        param.put("moveInfoId", moveInfoId);
        param.put("moveInfo", moveInfo);
        return new ModelAndView("daily/hiddendanger-assign/assign_detail", param);
    }

    /**
     * 交办隐患tabs
     * @return
     */
    @RequestMapping("/view/assign")
    public Object assign() {
        return new ModelAndView( "daily/hiddendanger-assign/assign_list", initParam());
    }

    /**
     * 挂牌督办页面
     *
     */
    @RequestMapping("/view/supervise")
    public Object supervise(@RequestParam(name = "hd_id") Long hd_id){
        HiddenDanger hd = hiddenDangerService.findOne(hd_id).get();
        Map<String, Object> param = initParam();
        param.put("hd_id", hd_id);
        param.put("hiddenDanger", hd);
        return new ModelAndView("daily/hiddendanger-superviseinfo/superviseinfo", param);
    }

    /**
     * 增加挂牌信息
     * @param info
     * @return
     */
    @PostMapping("/api/supervise/add")
    @Transactional
    public ResponseEntity insertSupervise(@RequestBody @Valid SuperviseInfo info) {
        final SuperviseInfo data = superviseService.save(info);
        return success("保存成功！", data);
    }

    /**
     * 判断是否可以挂牌,目前可挂牌的条件是：从未挂过牌
     * @param hd_id
     * @return
     */
    @RequestMapping("/api/judge_ifsupervise")
    @ResponseBody
    public Integer judgeIfSupervise(Long hd_id){
        Map<String, Object> param = new HashMap<>();
        param.put("hd_id", hd_id);
        return hdMapper.judgeIfCanSupervise(param);
    }

    /**
     * 交办隐患页面
     * @param stat notyet 未受理  yet 已受理
     * @return
     */
    @RequestMapping("/view/assign_{stat}")
    public Object assign_state(@PathVariable(name="stat") String stat) {
        Map<String, Object> param = initParam();
        param.put("stat", stat);
        return new ModelAndView( "daily/hiddendanger-assign/assign", param);
    }

    /**
     * 查询交办信息分页列表
     * @param form
     * @param param
     * @return
     */
    @PostMapping("/api/assign/page")
    public ResponseEntity page(MoveInfo form, UiParam param) {
        //查询条件
        final BooleanBuilder where = getCondition(form);
        //开始查询
        Page<MoveInfo> page = moveInfoService.findAll(where, param.toPageable());
        return ResponseEntity.ok(new PageResult<>(page.getContent(), page.getTotalElements()));
    }

    /**
     * 受理逻辑
     * @param move
     * @return
     */
    @PostMapping("/api/assign/save")
    @Transactional
    public ResponseEntity update(@RequestBody MoveInfo move) {
        //final MoveInfo data = moveInfoService.save(move);
        String updateSql = "UPDATE C_HD_MOVE_INFO t set t.accept_psn_name = ?1 , t.accept_date = ?2 , t.accept_result = ?3, t.return_cause_desc = ?4 where t.id = ?5";
        Query query = entityManager.createNativeQuery(updateSql)
            .setParameter(1, move.getAccept_psn_name())
            .setParameter(2, move.getAccept_date())
            .setParameter(3, move.getAccept_result())
            .setParameter(4, move.getReturn_cause_desc())
            .setParameter(5, move.getId());
        int rows = query.executeUpdate();

        hiddenDangerService.updateHiddenDangerByMoveInfo(move);
        return success("保存成功！", move);
    }

    /**
     * 查询隐患列表（按分页）
     * @param form
     * @param param
     * @return
     */
    @PostMapping("/api/page")
    public ResponseEntity page(HiddenDanger form, UiParam param) {
        //查询条件
        final BooleanBuilder where = getCondition(form);
        //开始查询
        Page<HiddenDanger> page = hiddenDangerService.findAll(where, param.toPageable());
        return ResponseEntity.ok(new PageResult<>(page.getContent(), page.getTotalElements()));
    }

    /**
     * 获取单个隐患详细信息
     * @param id
     * @return
     */
    @RequestMapping("/api/one")
    @ResponseBody
    public ResponseEntity one(@RequestParam Long id) {
        ResponseEntity entity = findOne(id).map(ApiResult::success).orElse(fail("未获取到所需数据信息！"));
        return entity;
    }

    public Optional<HiddenDanger> findOne(Long id){
        return hiddenDangerService.findOne(id);
    }

    /**
     * 增加隐患
     * @param danger
     * @return
     */
    @PostMapping("/api/add")
    @Transactional
    public ResponseEntity insert(@RequestBody @Valid HiddenDanger danger) {
        danger.getNeaten().setHd_id(danger.getId());
        final HiddenDanger data = hiddenDangerService.save(danger);
        accessoryService.updateAllByBusinessId(data.getId(), danger.getAccessories());
        return success("保存成功！", data);
    }

    /**
     * 隐患删除
     * @param hd_id
     * @return
     */
    @PostMapping("/api/delete")
    @Transactional
    public ResponseEntity update(@RequestParam(name = "hd_id") Long hd_id){

        //基本信息
        String updateSql = "UPDATE C_HD_HIDDENDANGERINFO T SET T.DELETE_STATE = '1' WHERE T.ID = " + hd_id;
        Query query = entityManager.createNativeQuery(updateSql);
        query.executeUpdate();
        //移交信息
        updateSql = "UPDATE C_HD_MOVE_INFO M SET M.DELETE_STATE = '1' WHERE M.HD_ID = " + hd_id;
        query = entityManager.createNativeQuery(updateSql);
        query.executeUpdate();
        //整改信息
        updateSql = "UPDATE C_HD_NEATEN N SET N.DELETE_STATE = '1' WHERE N.HD_ID = " + hd_id;
        query = entityManager.createNativeQuery(updateSql);
        query.executeUpdate();
        //挂牌信息
        updateSql = "UPDATE C_HD_SUPERVISE_INFO I SET I.DELETE_STATE = '1' WHERE I.HD_ID = " + hd_id;
        query = entityManager.createNativeQuery(updateSql);
        query.executeUpdate();
        //核查信息
        updateSql = "UPDATE C_HD_VERIFY_INFO VI SET VI.DELETE_STATE = '1' WHERE VI.HD_ID = " + hd_id;
        query = entityManager.createNativeQuery(updateSql);
        query.executeUpdate();

        return success("保存成功！", hd_id);
    }

    /**
     * 增加移交
     * @param move
     * @return
     */
    @PostMapping("/api/moveinfo/add")
    @Transactional
    public ResponseEntity insert(@RequestBody @Valid MoveInfo move) {
        final MoveInfo data = moveInfoService.save(move);
        accessoryService.updateAllByBusinessId(data.getId(), move.getAccessories());
        hiddenDangerService.updateHiddenDangerByMoveInfo(move);
        return success("保存成功！", data);
    }

    /**
     * 增加移交
     * @param move
     * @return
     */
    @RequestMapping("/api/moveinfo/one")
    @ResponseBody
    public MoveInfo moveInfoOne(MoveInfo move) {
        MoveInfo moveInfo = moveInfoService.findOne(move.getId()).get();
        return moveInfo;
    }

    /**
     * 判断是否可以被移交
     * @param hd_id
     * @param currDeptId
     * @return
     */
    @RequestMapping("/api/judge_ifmove")
    @ResponseBody
    public Integer judgeIfMove(Long hd_id, Long currDeptId){
        Map<String, Object> param = new HashMap<>();
        param.put("hd_id", hd_id);
        param.put("currDeptId", currDeptId);
        return hdMapper.judgeIfCanMove(param);
    }

    /**
     * 判断隐患是否可删除 1可删除，否则不可
     * @param hd_id
     * @param currDeptId
     * @return
     */
    @RequestMapping("/api/checkIfCanDelete")
    @ResponseBody
    public Integer checkIfCanDelete(Long hd_id, Long currDeptId){
        Map<String, Object> param = new HashMap<>();
        param.put("hd_id", hd_id);
        param.put("currDeptId", currDeptId);
        return hdMapper.checkIfCanDelete(param);
    }

    /**
     * 判断隐患是否可被整改 1可以 0不可以
     * @param hd_id
     * @param currDeptId
     * @return
     */
    @RequestMapping("/api/checkIfCanNeaten")
    @ResponseBody
    public Integer checkIfCanNeaten(Long hd_id, Long currDeptId){
        Map<String, Object> param = new HashMap<>();
        param.put("hd_id", hd_id);
        param.put("currDeptId", currDeptId);
        return hdMapper.checkIfCanNeaten(param);
    }


    @PostMapping("/api/dept/list")
    public ResponseEntity deptListSearch(Dept dept, UiParam param){
        final BooleanBuilder where = new BooleanBuilder();
        final QDept query = QDept.dept;
        if (!StringUtils.isEmpty(dept.getDeptName())) {
            where.and(query.deptName.like("%" + dept.getDeptName() + "%"));
        }
        if (!StringUtils.isEmpty(dept.getTeamLeader())) {
            where.and(query.deptName.like("%" + dept.getTeamLeader() + "%"));
        }
        if (dept.getDeptCate() != null) {
            where.and(query.deptCate.eq(dept.getDeptCate().intValue()));
        }

        final Page<Dept> page = deptService.findAll(where, param.toPageable());
        return ok(new PageResult<>(page.getContent(), page.getTotalElements()));
    }

    @RequestMapping("/api/dict/tree")
    @ResponseBody
    public List<TreeJson> dictTreeList(String dictType){
        List<TreeJson> list = hdMapper.getDictTree(dictType);
        list = TreeJson.formatTree(list);

        return list.get(0).getChildren();
    }

    @RequestMapping("/api/dept/my_gov_tree")
    @ResponseBody
    public List<TreeJson> myGovDeptTree(){
        User user = initUserInfo();
        Map<String, Object> map = new HashMap<>();
        map.put("dept", user.getDept());
        //map.put("showSelf", "0"); //前台判断是否为自己
        List<TreeJson> list = hdMapper.getGovDeptTree(map);
        list = TreeJson.formatTree(list);
        return list.get(0).getChildren();
    }


    /**
     * 隐患交办信息查询条件组合
     * @param form
     * @return
     */
    @Nonnull
    private BooleanBuilder getCondition(MoveInfo form) {
        final BooleanBuilder where = new BooleanBuilder();
        QDept dept = QDept.dept;
        final QMoveInfo query = QMoveInfo.moveInfo;
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        if (null != form.getSys_in_accept_dept_id()) {
            //指定受理部门
            where.and(query.sys_in_accept_dept_id.eq(form.getSys_in_accept_dept_id()));
            //子部门可受理
            /*
            where.and(query.sys_in_accept_dept_id.in(
                queryFactory.from(dept).select(dept.id).where(dept.deptPath.like(
                    queryFactory.from(dept).select(dept.deptPath).where(dept.id.eq(query.sys_in_accept_dept_id))+"%"
                ))
            ));*/
        }
        if(!StringUtils.isEmpty(form.getAccept_result())){
            QHiddenDanger danger = QHiddenDanger.hiddenDanger;
            where.and(query.accept_result.eq(form.getAccept_result()));
        }
        if(!StringUtils.isEmpty(form.getHiddenDanger().getEnterprise_name())){
            QHiddenDanger danger = QHiddenDanger.hiddenDanger;
            where.and(danger.enterprise_id.in(queryFactory.from(dept).select(dept.id).where(dept.deptName.like("%" + form.getHiddenDanger().getEnterprise_name() + "%"))));
        }
        if(!StringUtils.isEmpty(form.getHiddenDanger().getHd_desc())){
            QHiddenDanger danger = QHiddenDanger.hiddenDanger;
            where.and(danger.hd_desc.like(form.getHiddenDanger().getHd_desc() + "%"));
        }
        if(!StringUtils.isEmpty(form.getMoveDept().getDeptName())){
            QHiddenDanger danger = QHiddenDanger.hiddenDanger;
            where.and(query.move_dept_id.in(queryFactory.from(dept).select(dept.id).where(dept.deptName.like("%" + form.getMoveDept().getDeptName() + "%"))));
        }
        return where;
    }


    /**
     * 隐患查询条件组合
     * @param form
     * @return
     */
    @Nonnull
    private BooleanBuilder getCondition(HiddenDanger form) {
        final BooleanBuilder where = new BooleanBuilder();
        QDept dept = QDept.dept;
        final QHiddenDanger query = QHiddenDanger.hiddenDanger;
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        if (!StringUtils.isEmpty(form.getHd_source())) {
            where.and(query.hd_source.eq(form.getHd_source()));
        }
        if (!StringUtils.isEmpty(form.getEnterprise_name())) {
            where.and(query.enterprise_id.in(queryFactory.from(dept).select(dept.id).where(dept.deptName.like("%" + form.getEnterprise_name() + "%"))));
        }

        if (!StringUtils.isEmpty(form.getEnterprise_id())) {
            where.and(query.enterprise_id.eq(form.getEnterprise_id()));
        }

        if(form.getCheck_date_start() != null){
            where.and(query.check_date.goe(form.getCheck_date_start()));
        }

        if(form.getCheck_date_end() != null){
            where.and(query.check_date.loe(form.getCheck_date_end()));
        }
        if(!StringUtils.isEmpty(form.getHd_level())){
            where.and(query.hd_level.eq(form.getHd_level()));
        }
        if(form.getHd_isup() != null){
            where.and(query.hd_isup.eq(form.getHd_isup()));
        }
        //自己提交并或已经移交、回退到本部门的
        if(form.getCheck_dept_id() != null){
            where.and(query.check_dept_id.eq(form.getCheck_dept_id())
                    .or(
                            query.curr_handle_dept_id.eq(form.getCheck_dept_id()).and(
                                    query.neaten.neaten_situation.eq("2").or(query.neaten.neaten_situation.eq("3"))
                             )
                       )
            );
        }

        if("1".equals(form.getNeatenState())){
            where.and(query.neaten.neaten_limit_date.lt(LocalDate.now()));
        }

        if(!StringUtils.isEmpty(form.getNeaten().getNeaten_situation())){
            where.and(query.neaten.neaten_situation.eq(form.getNeaten().getNeaten_situation()));
        }

        if(form.getNeaten() != null){
            Neaten neaten = form.getNeaten();
            if(!StringUtils.isEmpty(neaten.getNeaten_type()) ){
                where.and(query.neaten.neaten_type.eq(neaten.getNeaten_type()));

            }
            if(!StringUtils.isEmpty(neaten.getNeaten_situation()) ){
                where.and(query.neaten.neaten_situation.eq(neaten.getNeaten_situation()));

            }
        }

        return where;
    }

    /*//目前仅供测试使用
    private User initUserInfo(boolean gov){
        //后续使用
        String currentUserName = SecurityUtils.getCurrentUserLogin().get();
        //测试账号根据政府或企业
        String userName = gov?govUserName : enUserName;
        BooleanBuilder where = new BooleanBuilder();
        QUser userQ = QUser.user;
        where.and(userQ.userName.eq(userName));
        User user = userService.findOne(where).get();
        param.put("user", user);
        return user;
    }*/
    //仅供测试使用
    private User initUserInfo(){
        Long currUserId = hdMapper.getCurrentSessionId();
        BooleanBuilder where = new BooleanBuilder();
        QUser userQ = QUser.user;
        where.and(userQ.id.eq(currUserId));
        User user = userService.findOne(where).get();
        return user;

    }
}
