/*global window P Base $*/
$(function () {
    var PageModel = new P(Base, function () {

        var compareAsc = function (prop) {
            return function (obj1, obj2) {
                var val1 = obj1[prop];
                var val2 = obj2[prop];
                if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                    val1 = Number(val1);
                    val2 = Number(val2);
                }
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }
            }
        };
        var compareDesc = function (prop) {
            return function (obj1, obj2) {
                var val1 = obj1[prop];
                var val2 = obj2[prop];
                if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                    val1 = Number(val1);
                    val2 = Number(val2);
                }
                if (val1 < val2) {
                    return 1;
                } else if (val1 > val2) {
                    return -1;
                } else {
                    return 0;
                }
            }
        };

        function getLastDay(year, month) {
            var new_year = year;  //取当前的年份
            var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
            if (month > 12)      //如果当前大于12月，则年份转到下一年
            {
                new_month -= 12;    //月份减
                new_year++;      //年份增
            }
            var new_date = new Date(new_year, new_month, 1);        //取当年当月中的第一天
            return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期
        }

        function pagerFilter(data) {
            if (typeof data.length === 'number' && typeof data.splice === 'function') {    // is array
                data = {
                    total: data.length,
                    rows: data
                }
            }
            var dg = $(this);
            var opts = dg.datagrid('options');
            var pager = dg.datagrid('getPager');
            pager.pagination({
                onSelectPage: function (pageNum, pageSize) {
                    opts.pageNumber = pageNum;
                    opts.pageSize = pageSize;
                    pager.pagination('refresh', {
                        pageNumber: pageNum,
                        pageSize: pageSize
                    });
                    dg.datagrid('loadData', data);
                }
            });
            if (!data.originalRows) {
                data.originalRows = (data.rows);
            }
            var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
            var end = start + parseInt(opts.pageSize);
            data.rows = (data.originalRows.slice(start, end));
            return data;
        }

        /**
         * 初始化数据表格
         */
        function initDatagridList(data) {
            var me = this;

            me.datagridList.datagrid({
                data: data,
                singleSelect: false,
                rownumbers: true,
                pagination: true,
                autoRowHeight: true,
                fit: true,
                remoteSort: false,
                idField: 'id',
                loadFilter: pagerFilter,
                onSortColumn: function (sort, order) {
                    if (order === 'asc') {
                        tempData.sort(compareAsc(sort))
                    } else {
                        tempData.sort(compareDesc(sort))
                    }
                    me.initDatagridList(tempData);
                },
                columns: [
                    [
                        {
                            field: 'text',
                            title: '监测时间',
                            halign: 'center',
                            align: 'left',
                            width: 300,
                            sortable: true
                        }, {
                        field: 'value',
                        title: '是否超标',
                        halign: 'center',
                        align: 'left',
                        width: 300,
                        sortable: true,
                        formatter: function (v, r, i) {
                            if (r.value1 > r.value2) {
                                return '是'
                            }else {
                                return '否'
                            }

                        }
                    }, {
                        field: 'value1',
                        title: '液位(m)',
                        halign: 'center',
                        align: 'left',
                        width: 300,
                        sortable: true
                    }, {
                        field: 'value2',
                        title: '预警值(m)',
                        halign: 'center',
                        align: 'left',
                        width: 300,
                        sortable: true
                    }, {
                        field: 'value3',
                        title: '报警值(m)',
                        halign: 'center',
                        align: 'left',
                        width: 300,
                        sortable: true
                    }
                    ]]
            });
        }

        var resultData = [];

        var tempData = [];

        // 初始化数据
        function initData() {

            var me = this;
            var dataSource = $('#dataSource').combobox('getValue');
            var url = me.apiAll;
            if (dataSource === '2') {
                url = me.apiAll2;
            }
            G.ajax({
                url: url,
                async: false,
                data: {
                    startTime: $('#startTime').textbox('getValue') + " 00:00",
                    endTime: $('#endTime').textbox('getValue') + " 23:00",
                    dataSource: dataSource
                },
                success: function (result) {
                    resultData = tempData = result.data;
                    me.initDatagridList(resultData);

                }
            });
        }

        function initGridData(me, startTime, endTime) {
            var startIndex = 0;
            var endIndex = 0;
            for (var i = 0; i < resultData.length; i++) {
                if (resultData[i].text === startTime) {
                    startIndex = i;
                }
                if (resultData[i].text === endTime) {
                    endIndex = i;
                }
            }
            tempData = resultData.slice(startIndex, endIndex + 1);
            me.initDatagridList(tempData);

        }

        //初始化 echarts
        function initChar(me, xData, yData) {
            var myChart = echarts.init(document.getElementById('line'));

            var option = {
                title: {
                    text: '重大危险源监测数据变化趋势分析',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                toolbox: {
                    feature: {
                        magicType: {type: ['line', 'bar']},
                        saveAsImage: {}
                    },
                    right: '50',
                    top: '100',
                    orient: 'vertical'
                },
                xAxis: {
                    name: '监测时间',
                    type: 'category',
                    data: xData
                },
                yAxis: {
                    name: '液位(m)',
                    type: 'value'
                },
                dataZoom: [{
                    type: 'slider',
                    start: 0
                }, {
                    start: 0,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],

                series: [{
                    data: yData,
                    type: 'line',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                color: '#9F041B'
                            }
                        }
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ],
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#F76B1C'
                                }
                            }
                        }
                    }
                }],
                color: ['#008CEE']
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            myChart.on('datazoom', function (params) {
                var option = myChart.getModel().option;
                var startValue = option.xAxis[0].data[option.dataZoom[0].startValue];
                var endValue = option.xAxis[0].data[option.dataZoom[0].endValue];
                initGridData(me, startValue, endValue);

            })
        }

        // 初始化日期组件的默认值
        function initDateBox(id) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var lastDay = getLastDay(year, month);
            if (month < 10) {
                month = '0' + month
            }
            var startTime = year + '-' + month + '-01';
            var endTime = year + '-' + month + '-' + lastDay;


            if (id === 2) {
                startTime = year + '-01-01';
                endTime = year + '-12-31';
            }

            $('#startTime').textbox('setValue', startTime);
            $('#endTime').textbox('setValue', endTime);
        }

        // 查询按钮事件
        function search() {

            this.initData();
            var changeValue = $('input[name="item"]:checked ').val();
            var xData = [];
            var yData = [];
            for (var i = 0; i < resultData.length; i++) {
                xData[i] = resultData[i]['text'];
                yData[i] = resultData[i][changeValue];
            }
            initChar(this, xData, yData);
        }

        //初始化下拉组件
        function initAssembly() {
            // 数据源
            $('#dataSource').combobox({
                data: [{id: 1, text: '小时数据'}, {id: 2, text: '日数据'}],
                valueField: 'id',
                textField: 'text',
                value: '2',
                reversed: true,
                showNullItem: false,
                onSelect: function (record) {
                    var id = record.id;
                    initDateBox(id);
                }
            });

            $('#dangsrcId').combobox({
                url: '/api/enterprise/enterprise-dangsrc/all',
                method: 'get',
                valueField: 'id',
                textField: 'text',
                reversed: true,
                loadFilter: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i]['text'] = data[i]['enterpriseId']['enterpriseName'] + '-' + data[i]['dangsrcName'];
                    }
                    return data;
                },
                onLoadSuccess: function () {
                    var val = $(this).combobox('getData');
                    for (var item in val[0]) {
                        if (item === 'id') {
                            $(this).combobox('select', val[0][item]);
                        }
                    }

                },
                onSelect: function (record) {
                    $('#jarId').combobox('clear');
                    initJar(record.id);
                }
            });
        }

        function initJar(dangsrcId) {
            $('#jarId').combobox({
                url: '/api/enterprise/enterprise-tank/all?dangsrcId=' + dangsrcId,
                method: 'get',
                valueField: 'id',
                textField: 'jarName',
                reversed: true,
                onLoadSuccess: function () {
                    var val = $(this).combobox('getData');
                    for (var item in val[0]) {
                        if (item === 'id') {
                            $(this).combobox('select', val[0][item]);
                        }
                    }

                },
            });

        }

        // 初始化radiobox组件点击事件
        function initEvent() {
            var me = this;
            $("input[name=item]").radiobox({

                onChange: function () {
                    var xData = [];
                    var yData = [];
                    for (var i = 0; i < resultData.length; i++) {
                        xData[i] = resultData[i]['text'];
                        yData[i] = resultData[i][$(this).val()];
                    }
                    initChar(me, xData, yData);
                }
            })
        }

        return {
            apiAll: '/api/statistic/danger-source-data-change/all',
            apiAll2: '/api/statistic/danger-source-data-change/all2',
            initAssembly: initAssembly,
            initDatagridList: initDatagridList,
            initData: initData,
            search: search,
            initEvent: initEvent
        };
    });
    var pageModel = window.pageModel = new PageModel('重大危险源级别占比分析');
    pageModel.initAssembly();
    pageModel.initData();
    pageModel.bindEventByIdName();
    pageModel.initEvent();


});
