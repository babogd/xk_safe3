/**
 * @author limeng
 * @file 全局方法和变量、公共类
 */
/*global window document $*/
(function(global) {
    var DEFAULT_ID_FIELD_KEY = 'id';
    var DEFAULT_TEXT_FIELD_KEY = 'text';
    var DEFAULT_PARENT_FIELD_KEY = 'pid';
    var DEFAULT_ROOT_VALUE = 'root';
    var DEFAULT_ROOT_TEXT = '根节点';
    var DEFAULT_NULL_ITEM_VALUE = '';
    var DEFAULT_NULL_ITEM_TEXT = '&nbsp;';
    var PAGE_TYPE = {
        NEW: 1,
        EDIT: 2,
        VIEW: 3,
        AUDIT: 4
    };

    /**
     * 根据URL获取查询字符串
     * @param {String} name  参数名称
     * @param {String} url url地址 [可选]
     * @return {*} 参数值 [不存在返回null，存在如?foo=&bar返回空]
     */
    function getParaStr(name, url) {
        if (typeof url === 'undefined') {
            if (typeof global === 'undefined') {
                throw Error('需要window对象！');
            }

            url = global.location.href;
        }

        name = name.replace(/[[]]/g, '\\$&');
        var regex;
        var results;
        regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        results = regex.exec(url);
        if (!results) {
            return null;
        }

        if (!results[2]) {
            return '';
        }

        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    /**
     * 根据URL获取查询整数
     * @param {String} name 参数名称
     * @param {String} url url地址 [可选]
     * @return {*} 参数值 [不存在返回null，存在如?foo=&bar返回null]
     */
    function getParaInt(name, url) {
        if (!url) {
            if (typeof global === 'undefined') {
                throw Error('需要window对象！');
            }

            url = global.location.href;
        }

        name = name.replace(/[[]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        var results = regex.exec(url);
        if (!results) {
            return null;
        }

        if (!results[2]) {
            return null;
        }

        var result = decodeURIComponent(results[2].replace(/\+/g, ' '));
        if (!result.replace(' ', '')) {
            return null;
        }

        return parseInt(result, 10);
    }

    /**
     * 处理符合格式的扁平数据到树形数据
     * @param items 扁平数据
     * @param config 设置
     * @return {Array} 树形数据
     */
    function arrayToTree(items, config) {
        if (typeof config === 'undefined') {
            config = {
                inId: DEFAULT_ID_FIELD_KEY,
                inText: DEFAULT_TEXT_FIELD_KEY,
                parentId: DEFAULT_PARENT_FIELD_KEY
            };
        }
        // 处理后的树形数据
        var rootItems = [];
        // 存储已处理的数据项，以便快速访问
        var lookup = {};
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var itemId = item[config.inId];
            var parentId = item[config.parentId];
            // 检查是否在lookup中存在
            if (!Object.prototype.hasOwnProperty.call(lookup, itemId)) {
                // lookup不存在时，先暂存，后面填充它
                lookup[itemId] = {data: null, children: []};
            }
            // 填充data
            lookup[itemId].data = item;
            var TreeItem = lookup[itemId].data;
            TreeItem.children = lookup[itemId].children;
            TreeItem[DEFAULT_ID_FIELD_KEY] = TreeItem[config.inId];
            TreeItem[DEFAULT_TEXT_FIELD_KEY] = TreeItem[config.inText];
            if (typeof parentId === 'undefined') {
                //属于根节点
                rootItems.push(TreeItem);
            }
            else {
                // 存在父节点时
                // 检查是否在lookup中存在
                if (!Object.prototype.hasOwnProperty.call(lookup, parentId)) {
                    // lookup不存在时，先暂存，后面填充它
                    lookup[parentId] = {data: null, children: []};
                }
                // 添加到children
                lookup[parentId].children.push(TreeItem);
            }
        }
        return rootItems;
    }

    /**
     * 成功时显示提示消息，3秒自动消失
     * @param msg 消息
     */
    function showSuccess(msg) {
        $.messager.show({
            msg: msg,
            showType: 'slide',
            timeout: 2000,
            height: 0,
            style: {
                right: '',
                top: document.body.scrollTop +
                document.documentElement.scrollTop,
                bottom: ''
            }
        });
    }

    /**
     * 失败时显示alert消息，需要手动关闭
     * @param msg 消息
     */
    function showFail(msg) {
        $.messager.alert({
            title: '错误',
            msg: msg,
            icon: 'error',
            style: {
                right: '',
                top: document.body.offsetHeight / 2,
                bottom: ''
            }
        });
    }

    /**
     * 显示普通消息，需要手动关闭
     * @param msg 消息
     */
    function showInfo(msg) {
        $.messager.alert({
            msg: msg,
            icon: 'info'
        });
    }

    /**
     * 封装Ajax，增加失败时的提示
     * @param options
     * @return {JQuery.jqXHR}
     */
    function ajaxWithFail(options) {
        var _options = $.extend({}, options);
        _options.contentType = 'application/json;charset=UTF-8';
        _options.success = function(resultData) {
            if (resultData.status === 'success') {
                if (typeof options.success === 'function') {
                    options.success(resultData);
                }
            } else if (typeof options.fail === 'function') {
                options.fail(resultData);
            } else if (typeof resultData.message !== 'undefined') {
                showFail(resultData.message);
            }
        };
        return $.ajax(_options);
    }

    /**
     * 打开iFrame窗口
     * @param options
     */
    function openWindow(options) {
        var opt = $.extend({}, options);
        var url = contextPath + opt.url;
        var pageType = opt.pageType || PAGE_TYPE.VIEW;
        if (url && url.indexOf('?') >= 0) {
            url += '&pageType=' + pageType;
        } else {
            url += '?pageType=' + pageType;
        }
        var $dialog = $('#dialog').css('overflow', 'hidden');
        if (typeof opt.width === 'undefined') {
            opt.width = '50%';
        }
        if (typeof opt.height === 'undefined') {
            opt.height = '80%';
        }
        if (typeof opt.url !== 'undefined' && typeof opt.ifrmId !==
            'undefined') {
            opt.content = '<iframe src="' + url + '" id="' + opt.ifrmId +
                '" width="100%" height="100%" frameborder="0"></iframe>';
        }
        if (typeof opt.url !== 'undefined' && typeof opt.ifrmId ===
            'undefined') {
            opt.content = '<iframe src="' + url +
                '" width="100%" height="100%" frameborder="0"></iframe>';
        }
        if (typeof opt.modal === 'undefined') {
            opt.modal = true;
        }
        var windowHeight = $(window).height();
        if (typeof opt.height === 'string' && opt.height.indexOf('%') > 0) {
            var num = parseInt(opt.height, 10) / 100;
            opt.height = windowHeight * num;
        }
        $dialog.dialog(opt).dialog('center');
    }

    function openDialog(opts) {
        var win;
        var defaults = {
            width: '50%',
            height: '80%',
            minimizable: false,
            maximizable: true,
            collapsible: false,
            resizable: false,
            isFrame: true, //是否使用iframe
            self: false, //用于框架页面，如果值为true则不跨框架，否则跨框架弹出在框架最顶层页面
            data: null, //iframe方式下用来父页面向弹出窗体中子页面传递数据
            pageType: PAGE_TYPE.VIEW,
            ifrmId: 'ifrm_default',
            content: '',
            url: '',
            onLoad: null,
            onClose: function(){
                win.dialog('destroy');
            }
        };

        var options = $.extend({}, defaults, opts);

        //取顶层页面
        var _doc, _top = (function(w){
            try{
                _doc = w['top'].document;
                _doc.getElementsByTagName('body');
            }catch(e){
                _doc = w.document;
                return w;
            }

            if(options.self || _doc.getElementsByTagName('frameset').length >0){
                _doc = w.document;
                return w;
            }

            return w['top'];
        })(window);


        //如填写ID属性，则窗体唯一
        var winId;
        if(options.ifrmId){
            winId = options.ifrmId;
            delete options.ifrmId;

            //检查创建窗口是否已经存在，存在则不在创建
            if($('#'+winId).length>0){
                return;
            }
        }

        if(typeof options.url !== 'undefined'){
            var url = contextPath + options.url;
            var pageType = options.pageType;
            if (url && url.indexOf('?') >= 0) {
                url += '&pageType=' + pageType;
            } else {
                url += '?pageType=' + pageType;
            }
            //构建iframe加载方式
            if(options.isFrame){
                var iframe = $('<iframe></iframe>')
                .attr('height', '100%')
                .attr('width', '100%')
                .attr('marginheight', '0')
                .attr('marginwidth', '0')
                .attr('frameborder','0');

                window.setTimeout(function(){
                    iframe.attr('src', url);
                }, 1);


                var _this = this;
                var frameOnLoad = function(){
                    _this.content = iframe.get(0).contentWindow;
                    options.onLoad && options.onLoad.call(_this, {
                        data: options.data,
                        close: function(){
                            win.dialog('close');
                        }
                    });
                };

                delete options.content;

            }else{//使用默认页面加载方式
                options.href = url;
            }
        }

        //加工toolbar和buttons中定义的handler方法，使其可以接收给定参数，用于iframe方式下的父子页面传值和窗口关闭
        var warpHandler = function(handler){
            var args = {data: options.data, close: function(){win.dialog('close')}};
            if(typeof handler === 'function'){
                return function(){
                    handler(args);
                }
            }

            if(typeof handler === 'string' && options.isFrame){
                return function(){
                    iframe.get(0).contentWindow[handler](args);
                }
            }
        };

        //处理toolbar数组事件定义,选择器形式不做处理
        if(options.toolbar && Array.isArray(options.toolbar)){
            for(var i in options.toolbar){
                options.toolbar[i].handler = warpHandler(options.toolbar[i].handler);
            }
        }

        //处理buttons数组事件定义,选择器形式不做处理
        if(options.buttons && Array.isArray(options.buttons)){
            for(var j in options.buttons){
                options.buttons[j].handler = warpHandler(options.buttons[j].handler);
            }
        }


        if(options.isFrame && iframe){
            iframe.on('load', frameOnLoad);
            win = _top.$('<div>', {id: winId}).css('overflow','hidden').append(iframe).dialog(options);
        }else{
            win = _top.$('<div>', {id: winId}).css('overflow','hidden').dialog(options);
        }

    }

    // 服务器端上下文路径
    var contextPath = $('base').attr('href');

    // 设置默认Ajax
    $.ajaxSetup({
        type: 'GET',
        dataType: 'json',
        beforeSend: function(jqXHR, settings) {
            var token = $('meta[name=\'_csrf\']').attr('content');
            var header = $('meta[name=\'_csrf_header\']').attr('content');
            jqXHR.setRequestHeader(header, token);
            settings.url = contextPath + settings.url;
        },
        error: function(jqXHR) {
            var resultData = JSON.parse(jqXHR.responseText);
            if (typeof resultData.message !== 'undefined') {
                showFail(resultData.message);
            } else {
                showFail('内部错误，请联系管理员！');
            }
            $.messager.progress('close');
        }
    });

    /**
     * 增加formbox功能，用以给input添加标签
     */
    $.parser.plugins.push('formbox');
    $.fn.formbox = function() {
        $(this).each(function() {
            var $dom;
            var $el = $(this);
            var label = $el.attr('label') || '';
            var labelAlign = $el.attr('labelAlign') || 'left';
            var labelWidth = $el.attr('labelWidth');
            if (labelWidth) {
                $dom = $('<label></label>').
                    addClass('textbox-label').
                    text(label).
                    css({
                        'text-align': labelAlign,
                        'width': labelWidth
                    });
            } else {
                $dom = $('<label></label>').
                    addClass('textbox-label').
                    text(label).
                    css({
                        'text-align': labelAlign
                    });
            }
            $el.prepend($dom).contents().unwrap();
        });
    };

    /**
     * 扩展easy ui tree，增加idField（默认id），textField（默认text）参数，
     * 增加可以接收扁平数据的树，增加parentField（默认pid）即可,
     * 增加rootNode（默认false）,rootValue（默认root）,rootText（默认根节点）以显示根节点显示
     * @param {Object} data 数据
     * @return {Array} 结果
     */
    $.fn.tree.defaults.loadFilter = function(data) {
        var opt = $(this).data().tree.options;

        var idField = DEFAULT_ID_FIELD_KEY;
        var textField = DEFAULT_TEXT_FIELD_KEY;
        var parentField = DEFAULT_PARENT_FIELD_KEY;
        var rootValue = DEFAULT_ROOT_VALUE;
        var rootText = DEFAULT_ROOT_TEXT;

        if (typeof opt.idField !== 'undefined') {
            idField = opt.idField;
        }
        if (typeof opt.textField !== 'undefined') {
            textField = opt.textField;
        }
        if (typeof opt.dataField !== 'undefined') {
            data = data[opt.dataField];
        }
        if (typeof opt.rootText !== 'undefined') {
            rootText = opt.rootText;
        }
        if (typeof opt.rootValue !== 'undefined') {
            rootValue = opt.rootValue;
        }
        if (typeof opt.rootNode !== 'undefined' && opt.rootNode) {
            var tmp = {};
            tmp[idField] = rootValue;
            tmp[textField] = rootText;
            data.push(tmp);
        }

        if (typeof opt.parentField !== 'undefined') {
            parentField = opt.parentField;
            var config = {
                inId: idField,
                inText: textField,
                parentId: parentField
            };
            return arrayToTree(data, config);
        } else {
            var treeData = [];
            for (var i = 0; i < data.length; i++) {
                data[i][DEFAULT_TEXT_FIELD_KEY] = data[i][textField];
                data[i][DEFAULT_ID_FIELD_KEY] = data[i][idField];
                treeData.push(data[i]);
            }
            return treeData;
        }
    };

    $.fn.combobox.defaults.formatter = function(row) {
        var opt = $(this).data().combo.options;
        var nullItemText = DEFAULT_NULL_ITEM_TEXT;
        if (typeof opt.nullItemText !== 'undefined') {
            nullItemText = opt.nullItemText;
        }
        var text = row[opt.textField];
        if (text === '') {
            return nullItemText;
        } else {
            return text;
        }
    };

    $.fn.combobox.defaults.loadFilter = function(data) {
        var opt = $(this).data().combo.options;
        var showNullItem = false;
        var nullItemValue = DEFAULT_NULL_ITEM_VALUE;
        if (typeof opt.showNullItem !== 'undefined') {
            showNullItem = opt.showNullItem;
        }
        if (typeof opt.nullItemValue !== 'undefined') {
            nullItemValue = opt.nullItemValue;
        }
        if (showNullItem) {
            var tmp = {};
            tmp[opt.valueField] = nullItemValue;
            tmp[opt.textField] = '';
            data.unshift(tmp);
        }
        return data;
    };

    $.extend($.fn.form.methods, {
        setData: function(jq, param) {
            return jq.each(function() {
                load(this, param);
            });

            function load(target, param) {
                if (!$.data(target, 'form')) {
                    $.data(target, 'form', {
                        options: $.extend({}, $.fn.form.defaults)
                    });
                }
                var options = $.data(target, 'form').options;
                if (typeof param == 'string') {
                    var params = {};
                    if (options.onBeforeLoad.call(target, params) == false) {
                        return;
                    }
                    $.ajax({
                        url: param,
                        data: params,
                        dataType: 'json',
                        success: function(rsp) {
                            loadData(rsp);
                        },
                        error: function() {
                            options.onLoadError.apply(target, arguments);
                        }
                    });
                } else {
                    loadData(param);
                }

                function loadData(dd) {
                    var form = $(target);
                    var formFields = form.find(
                        'input[name],select[name],textarea[name]');
                    formFields.each(function() {
                        var name = this.name;
                        var value;
                        if (name.indexOf('[') >= 0) {
                            value = $.proxy(function() {
                                try {
                                    return eval('this.' +
                                        name.replace(/\[/g, '.').
                                            replace(']', ''));
                                } catch (e) {
                                    return '';
                                }
                            }, dd)();
                        } else if (name.indexOf('.') >= 0) {
                            value = $.proxy(function() {
                                try {
                                    return eval('this[' +
                                        name.replace(/\./g, '\'][\'') + ']');
                                } catch (e) {
                                    return '';
                                }
                            }, dd)();
                        } else {
                            value = $.proxy(function() {
                                try {
                                    return eval('this.' + name);
                                } catch (e) {
                                    return '';
                                }
                            }, dd)();
                        }
                        var rr = setNormalVal(name, value);
                        if (!rr.length) {
                            var n = form.find('input[numberboxName="' + name +
                                '"]');
                            var t = form.find('input[textboxName="' + name +
                                '"]');
                            if (t.length) {
                                t.textbox('setValue', value);
                            }
                            if (n.length) {
                                n.numberbox('setValue', value);
                            }

                            if (!t.length && !n.length) {
                                $('input[name="' + name + '"]', form).
                                    val(value);
                                $('textarea[name="' + name + '"]', form).
                                    val(value);
                                $('select[name="' + name + '"]', form).
                                    val(value);
                            }
                        }
                        setPlugsVal(name, value);
                    });
                    options.onLoadSuccess.call(target, dd);
                    $(target).form('validate');
                }

                function setNormalVal(key, val) {
                    var $target = $(target);
                    var rr = $target.find('input[name="' + key +
                        '"][type=radio], input[name="' + key +
                        '"][type=checkbox]');
                    rr.each(function() {
                        var rd = $target.find('input[radioboxName="' + key +
                            '"]');
                        var ch = $target.find('input[checkboxName="' + key +
                            '"]');
                        if (rd.length) {
                            rd.radiobox('checked', val);
                        }
                        if (ch.length) {
                            ch.checkbox('checked', val);
                        }
                    });
                    return rr;
                }

                function setPlugsVal(key, val) {
                    var form = $(target);
                    var cc = [
                        'combobox',
                        'combotree',
                        'combogrid',
                        'datetimebox',
                        'datebox',
                        'combo'];
                    var c = form.find('[comboName="' + key + '"]');
                    if (c.length) {
                        for (var i = 0; i < cc.length; i++) {
                            var combo = cc[i];
                            if (c.hasClass(combo + '-f')) {
                                if (c[combo]('options').multiple) {
                                    c[combo]('setValues', val);
                                } else {
                                    c[combo]('setValue', val);
                                }
                                return;
                            }
                        }
                    }
                }
            }
        }
    });

    $.extend($.fn.validatebox.defaults.rules, {
        ip: {// 验证IP地址
            validator: function(value) {
                return /\d+\.\d+\.\d+\.\d+/.test(value);
            },
            message: 'IP地址格式不正确'
        }
    });
    // 分配到全局对象（global）
    global.G = {
        PAGE_TYPE: PAGE_TYPE,
        SERVER_PATH: contextPath,
        getParaStr: getParaStr,
        getParaInt: getParaInt,
        ajax: ajaxWithFail,
        success: showSuccess,
        fail: showFail,
        info: showInfo,
        open: openWindow
    };
})(window);