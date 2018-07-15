/**
 * @author limeng
 * @file 基础方法封装类
 */
/*global window parent $ P G qq*/
/* eslint-disable no-unused-vars */
var Base = P(function(base) {
    /**
     * 初始化实例前操作（不可覆盖）
     */
    function install(self) {
        var $formSearch = $('#form_search');
        var $formSubmit = $('#form_submit');
        var $datagridList = $('#datagrid_list');

        if ($formSearch.length === 1) {
            $formSearch.form();
            self.formSearch = $formSearch;
        }

        if ($formSubmit.length === 1) {
            $formSubmit.form();
            self.formSubmit = $formSubmit;
        }

        if ($datagridList.length === 1) {
            self.datagridList = $datagridList;
        }
    }

    /**
     * 格式化1和0为是和否
     * @param value 值
     * @return {string} 结果
     */
    function boolRenderer(value) {
        if (value !== 'undefined') {
            if (value === '1' || value === 1) {
                return '是';
            } else if (value === '0' || value === 0) {
                return '否';
            }
        }

        return '';
    }

    /**
     * 渲染详情为可点击样式，并添加事件
     * @param value 值
     * @param row 单元格参数
     * @return {string} 结果
     */
    function detailRenderer(value, row) {
        return '<a href="javascript:void(0)"' +
            ' onclick="pageModel.view(\'' + row.id +
            '\',\'' + this.title + '详情\')">' + value +
            '</a>';
    }

    /**
     * 跳转的方式打开详情页
     * @param id 主键id
     * @param pageType 页面类型（新增，编辑，查看）
     */
    function navigateDetail(id, pageType) {
        window.location.href = this.viewDetail + '?pageType=' + pageType +
            '&id=' + id;
    }

    /**
     * 弹窗的方式打开详情页
     * @param id 主键id 可为空
     * @param pageType 页面类型（新增，编辑，查看...） 可为空
     * @param title 弹窗标题 可为空
     */
    function showDetail(id, pageType, title) {
        var me = this;
        id = id || '';
        title = title || '详情';
        pageType = pageType || G.PAGE_TYPE.VIEW;
        var url;
        if (me.viewDetail.indexOf('?') >= 0) {
            url = me.viewDetail + '&id=' + id;
        } else {
            url = me.viewDetail + '?id=' + id;
        }
        G.open({
            url: url,
            pageType: pageType,
            title: title
        });
    }

    /**
     * 获取单条记录
     * @return {*} 单条记录
     */
    function getSelected() {
        var selecteds = this.datagridList.datagrid('getSelections');
        if (selecteds.length > 1) {
            G.fail('只能选择一条数据！');
            return false;
        }

        if (selecteds.length === 0) {
            G.fail('请选择一条数据！');
            return false;
        }

        return selecteds[0];
    }

    function radioCheckValid(form) {
        var isValid = true;
        form.find('[required]').each(function() {
            var $this = $(this);
            if ($this.attr('radioboxname')) {
                var radioVal = $('[name="' + $this.attr('radioboxname') +
                    '"]:checked').val();
                if (radioVal == null || radioVal === '') {
                    isValid = false;
                }
            }
            if ($this.attr('checkboxname')) {
                var checkVal = $('[name="' + $this.attr('checkboxname') +
                    '"]:checked').val();
                if (checkVal == null || checkVal === '') {
                    isValid = false;
                }
            }
        });
        return isValid;
    }

    /**
     * 为文件名设置下载链接
     * @param fileItem 文件项
     * @param data 附件数据
     */
    function setFileElHref(fileItem, data) {
        var fileId = data.id;
        var fileEl = qq(fileItem).getByClass('qq-upload-file-selector')[0];
        fileEl.setAttribute('href', G.SERVER_PATH + this.apiFileDownload + '/' +
            fileId);
    }

    /**
     * 初始化附件
     * @param containerId 附件上传容器id
     * @param mark 附件标识（用于多个附件类型）
     * @param busiId 指定业务标识（optional）
     * @param addPage(true|false) 某些情况下需要指定VIEW页面显示上传按钮(optional)
     */
    function initAccessory(containerId, mark, busiId, addPage) {
        var showButton = undefined;
        if (addPage != undefined) {
            showButton = addPage;
        }
        mark = mark || 'default';
        var me = this;
        var token = $('meta[name=\'_csrf\']').attr('content');
        var key = $('meta[name=\'_csrf_header\']').attr('content');
        var csrfHeader = {};
        csrfHeader[key] = token;
        var $accessory = $('#' + containerId);
        var idFromPara = G.getParaStr('id');
        var businessId;
        if (busiId) {
            businessId = busiId;
        } else if (idFromPara) {
            businessId = idFromPara;
        } else {
            businessId = '';
        }
        new qq.FineUploader({
            element: $accessory.get(0),
            template: 'qq-template',
            request: {
                customHeaders: csrfHeader,
                requireSuccessJson: false,
                params: {
                    businessId: businessId,
                    mark: mark
                },
                endpoint: G.SERVER_PATH + me.apiFileUpload
            },
            text: {
                formatProgress: '{percent}%/{total_size}',
                failUpload: '上传失败',
                waitingForResponse: '处理中...',
                defaultResponseError: '上传失败',
                fileInputTitle: '点击选择文件',
                paused: '已暂停'
            },
            messages: {
                tooManyFilesError: '只能选择一个文件！',
                unsupportedBrowser: '浏览器不支持此操作！'
            },
            deleteFile: {
                customHeaders: csrfHeader,
                enabled: true,
                forceConfirm: true,
                endpoint: G.SERVER_PATH + me.apiFileDelete,
                confirmMessage: '确定删除文件 {filename}？删除后无法恢复！',
                deletingStatusText: '正在删除...',
                deletingFailedText: '删除失败！'
            },
            session: {
                customHeaders: csrfHeader,
                endpoint: G.SERVER_PATH + me.apiFileAll,
                params: {
                    businessId: businessId,
                    mark: mark
                }
            },
            validation: {
                allowedExtensions: [
                    'jpeg',
                    'jpg',
                    'gif',
                    'png',
                    'pdf',
                    'doc',
                    'docx',
                    'xls',
                    'xlsx']
            },
            callbacks: {
                onDeleteComplete: function(id, xhr, isError) {
                    if (!isError) {
                        $accessory.find('[name="accessories[' + id + ']"]').
                            remove();
                    }
                },
                onComplete: function(id, name, result) {
                    if (typeof result.status !== 'undefined'
                        && result.status === 'success'
                        && typeof result.data !== 'undefined'
                        && typeof result.data.id !== 'undefined'
                        && result.data.id) {
                        var fileItem = this.getItemByFileId(id);
                        me.setFileElHref(fileItem, result.data);
                        var $input = $(
                            '<input type="hidden" class="mini-hidden"/>');
                        $input.val(result.data.id);
                        $input.attr('name', 'accessories[' + id + ']');
                        $accessory.append($input);
                    }
                },
                onSessionRequestComplete: function(result, success) {
                    var self = this;
                    if (success) {
                        $.each(result, function(indexInArray, value) {
                            var fileItem = self.getItemByFileId(indexInArray);
                            me.setFileElHref(fileItem, value);
                            var $input = $(
                                '<input type="hidden" class="mini-hidden"/>');
                            $input.val(value.id);
                            $input.attr('name', 'accessories[' + indexInArray +
                                ']');
                            $accessory.append($input);
                        });
                        var pageType = G.getParaInt('pageType');
                        if (pageType === G.PAGE_TYPE.VIEW || showButton == false) {
                            $('.qq-upload-button-selector,.qq-btn').remove();
                        }
                    }
                }
            }
        });
    }

    /**
     * 初始化一企一档菜单树
     */
    function initModuleTree() {
        var $el = $('#module_tree');
        var me = this;
        $el.tree({
            url: me.apiAll,
            method: 'get',
            idField: 'id',
            textField: 'text',
            lines: true,
            onClick: function(node) {
                if (typeof node.url !== 'undefined' && node.url) {
                    var enterpriseId = G.getParaInt('enterpriseId');
                    if (!enterpriseId) {
                        G.fail('未获取到企业标识！');
                    }
                    window.location.href = G.SERVER_PATH + node.url +
                        '?enterpriseId=' + enterpriseId;
                }
            }
        });
    }

    /**
     * 查看操作
     * @param id 主键id
     * @param title 标题
     */
    function view(id, title) {
        title = title || '查看';
        this.showDetail(id, G.PAGE_TYPE.VIEW, title);
    }

    /**
     * 编辑操作
     * @param title 标题
     */
    function edit(title) {
        title = title || '修改';
        var id;
        if (!this.getSelected()) {
            return false;
        }

        var selected = this.getSelected();
        if (typeof selected.id !== 'undefined') {
            id = selected.id;
        } else {
            G.fail('获取id失败！');
            return false;
        }
        this.showDetail(id, G.PAGE_TYPE.EDIT, title);
    }

    /**
     * 新增操作
     * @param title 标题
     */
    function add(title) {
        title = title || '新增';
        this.showDetail('', G.PAGE_TYPE.NEW, title);
    }

    /**
     * 删除操作
     */
    function del() {
        var me = this;
        if (!me.getSelected()) {
            return false;
        }
        $.messager.confirm('警告', '确定删除该条记录吗？', function(action) {
            if (action) {
                var selected = me.getSelected();
                var id;
                if (typeof selected.id !== 'undefined') {
                    id = selected.id;
                } else {
                    G.fail('获取id失败！');
                    return false;
                }
                $.messager.progress({
                    text: '正在处理……'
                });
                G.ajax({
                    type: 'POST',
                    url: me.apiDelete + '?id=' + id,
                    success: function() {
                        $.messager.progress('close');
                        G.success('数据删除成功');
                        me.datagridList.datagrid('clearSelections');
                        me.search(null, false);
                    },
                    fail: function(result) {
                        $.messager.progress('close');
                        if (typeof result.message !== 'undefined') {
                            G.fail(result.message);
                        }
                    }
                });
            }
        });
    }

    /**
     * 根据页数和查询表单数据重新查询列表
     * @param title 标题
     * @param isReload true时从当前页数刷新，false从第一页刷新
     */
    function search(title, isReload) {
        isReload = isReload || false;
        var formData = this.formSearch.serializeJSON();
        if (isReload) {
            this.datagridList.datagrid('reload', formData);
        } else {
            this.datagridList.datagrid('load', formData);
        }
    }

    /**
     * 重置查询表单
     */
    function reset() {
        this.formSearch.form('reset');
    }

    function exportExcel() {
        var me = this;
        var json = me.formSearch.serializeJSON();
        var page = me.datagridList.datagrid('getPager').
            pagination('options').pageNumber;
        var rows = me.datagridList.datagrid('getPager').
            pagination('options').pageSize;
        json.page = page;
        json.rows = rows;
        var enterpriseId = G.getParaInt('enterpriseId');
        if (json.enterpriseId == null && enterpriseId != null) {
            json.enterpriseId = enterpriseId;
        }
        G.open({
            url: me.viewExcel,
            width: 300,
            height: 200,
            title: '导出',
            onOpen: function() {
                var iFrame = $(this).find('iframe');
                var data = {
                    form: json,
                    url: G.SERVER_PATH + me.apiExportExcel
                };
                iFrame.on('load', function() {
                    var _ = this.contentWindow.$;
                    var doc = this.contentWindow.document;
                    _(doc).trigger('setData', data);
                });
            }
        });
    }

    function exportChart(data) {
        var me = this;
        var json = me.formSearch.serializeJSON();
        $.extend(json, data);
        G.open({
            url: me.viewChart,
            width: 300,
            height: 200,
            title: '导出',
            onOpen: function() {
                var iFrame = $(this).find('iframe');
                var data = {
                    form: json,
                    url: G.SERVER_PATH + me.apiExportChart
                };
                iFrame.on('load', function() {
                    var _ = this.contentWindow.$;
                    var doc = this.contentWindow.document;
                    _(doc).trigger('setData', data);
                });
            }
        });
    }

    /**
     * 保存入口
     * @param update 当update为真是，强制更新操作，走apiUupdate接口 为真时可防止请求没有提供id参数，导致的更新错误（误入insert操作）
     * @param busiId busiId可选(若不提供则取GET请求的id值)
     * @returns {boolean} 成功返回真，否则假
     */
    function save(update, busiId) {
        var me = this;
        if (this.formSubmit.form('validate') === false
            || radioCheckValid(this.formSubmit) === false) {
            G.fail('表单验证不通过，请检查！');
            return false;
        }
        $.messager.progress({
            text: '正在处理……'
        });
        var data = me.formSubmit.serializeJSON(
            {skipFalsyValuesForTypes: ['string', 'null']});
        var id = G.getParaStr('id');
        var url = me.apiInsert;
        if(update == true){
            data.id = busiId ? busiId : id;
            url = me.apiUpdate;
        }else if (id !== null && id !== '') {
            data.id = id;
            url = me.apiUpdate;
        }
        var $accessory = $('[name^=accessories]');
        if ($accessory.length > 0) {
            data.accessories = [];
            $accessory.each(function(index, element) {
                var elVal = $(element).val();
                data.accessories.push(elVal);
            });
        }
        var json = JSON.stringify(data);
        G.ajax({
            type: 'POST',
            url: url,
            data: json,
            success: function() {
                $.messager.progress('close');
                try {
                    var doc = parent.document;
                    if (!doc) {
                        throw new Error('无法访问父页面！');
                    }
                    parent.G.success('数据保存成功');
                    me.close(null, true);
                } catch (e) {
                    G.fail(e);
                }
            },
            fail: function(result) {
                $.messager.progress('close');
                if (typeof result.message !== 'undefined') {
                    try {
                        var doc = parent.document;
                        if (!doc) {
                            throw new Error('无法访问父页面！');
                        }
                        parent.G.fail(result.message);
                    } catch (e) {
                        G.fail(e);
                    }
                }
            }
        });
    }

    function close(title, action) {
        action = action || false;
        try {
            var doc = parent.document;
            if (!doc) {
                throw new Error('无法访问父页面！');
            }
            if (action === true) {
                var pageType = G.getParaInt('pageType');
                var pageModel = parent.pageModel;
                if (typeof pageModel === 'undefined') {
                    G.fail('未获取到pageModel!');
                    return false;
                }
                if (pageType === G.PAGE_TYPE.NEW) {
                    pageModel.search(null, false);
                }

                if (pageType === G.PAGE_TYPE.EDIT) {
                    if (pageModel.datagridList) {
                        pageModel.search(null, true);
                    }
                    else {
                        pageModel.search(null, false);
                    }
                }
            }
            parent.$('#' + $(window.frameElement).parent().attr('id')).
                dialog('close');
        } catch (e) {
            window.close();
        }
    }

    function clear(el) {
        var $el = $(el);
        $el.validatebox('setValue', '');
        $el.validatebox('setValue', '');
    }

    /**
     * 根据id的后缀绑定相应的方法
     */
    function bindEventByIdName() {
        var me = this;
        $('[id^=btn]').on('click', function(event) {
            var $el = $(event.currentTarget);
            var type = $el.attr('id').replace('btn_', '');
            var text = $el.text();
            if (typeof me[type] === 'function') {
                me[type](text + me.title);
            }
        });
    }

    base.init = function(title) {
        this.title = title;
        install(this);
    };
    base.formSearch = null;
    base.formSubmit = null;
    base.datagridList = null;
    base.boolRenderer = boolRenderer;
    base.detailRenderer = detailRenderer;
    base.navigateDetail = navigateDetail;
    base.showDetail = showDetail;
    base.getSelected = getSelected;
    base.bindEventByIdName = bindEventByIdName;
    base.setFileElHref = setFileElHref;
    base.initAccessory = initAccessory;
    base.initModuleTree = initModuleTree;
    base.add = add;
    base.edit = edit;
    base.del = del;
    base.view = view;
    base.search = search;
    base.reset = reset;
    base.exportExcel = exportExcel;
    base.exportChart = exportChart;
    base.save = save;
    base.close = close;
    base.clear = clear;
});
