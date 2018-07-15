/*global window echarts document G P Base $*/
$(function() {
    var PageModel = new P(Base, function() {

        function exportChart() {
            var me = this;
            var myChart = echarts.getInstanceByDom(
                document.getElementById('pie'));
            var imgData = myChart.getDataURL({
                type: 'png',
                backgroundColor: '#fff',
                excludeComponents: ['toolbox', 'title']
            });
            $('#form_export').
                empty().
                append($('#csrf_token').clone()).
                append(me.formSearch.find('[name]').clone()).
                append('<input type="hidden" name="imgData" value="' + imgData +
                    '">').
                trigger('submit');
        }

        /**
         * 初始化数据表格
         */
        function initDatagridList() {
            var me = this;

            me.datagridList.datagrid({
                url: me.apiPage,
                queryParams: {
                    startTime: $('#startTime').textbox('getValue'),
                    endTime: $('#endTime').textbox('getValue')
                },
                singleSelect: false,
                rownumbers: true,
                pagination: true,
                autoRowHeight: true,
                fit: true,
                remoteSort: true,
                idField: 'id',
                frozenColumns: [
                    [
                        {
                            field: 'enterpriseName',
                            title: '企业',
                            halign: 'center',
                            align: 'left',
                            width: 350,
                            sortable: true
                        },
                        {
                            field: 'amount',
                            title: '重大危险源数',
                            halign: 'center',
                            align: 'left',
                            width: 200,
                            sortable: true
                        }
                    ]],
                columns: [
                    [
                        {title: '一级重大危险源', colspan: 2},
                        {title: '二级重大危险源', colspan: 2},
                        {title: '三级重大危险源', colspan: 2},
                        {title: '四级重大危险源', colspan: 2}
                    ], [
                        {
                            field: 'amount1',
                            title: '数量',
                            halign: 'center',
                            align: 'left',
                            width: 130,
                            sortable: true
                        },
                        {
                            field: 'proportion1',
                            title: '占比',
                            halign: 'center',
                            align: 'left',
                            width: 130,
                            sortable: true
                        }, {
                            field: 'amount2',
                            title: '数量',
                            halign: 'center',
                            align: 'left',
                            width: 130,
                            sortable: true
                        },
                        {
                            field: 'proportion2',
                            title: '占比',
                            halign: 'center',
                            align: 'left',
                            width: 130,
                            sortable: true
                        }, {
                            field: 'amount3',
                            title: '数量',
                            halign: 'center',
                            align: 'left',
                            width: 130,
                            sortable: true
                        },
                        {
                            field: 'proportion3',
                            title: '占比',
                            halign: 'center',
                            align: 'left',
                            width: 130,
                            sortable: true
                        }, {
                            field: 'amount4',
                            title: '数量',
                            halign: 'center',
                            align: 'left',
                            width: 130,
                            sortable: true
                        },
                        {
                            field: 'proportion4',
                            title: '占比',
                            halign: 'center',
                            align: 'left',
                            width: 130,
                            sortable: true
                        }
                    ]]
            });
        }

        function initPieCharData() {

            var me = this;
            G.ajax({
                url: me.apiPieStatistic,
                data: {
                    startTime: $('#startTime').textbox('getValue'),
                    endTime: $('#endTime').textbox('getValue')
                },
                success: function(result) {
                    var resultData = result.data;
                    var legendData = [];
                    var seriesData = [];
                    for (var i = 0; i < resultData.length; i++) {
                        legendData[i] = resultData[i]['dangsrcLevelName'];
                        seriesData[i] = {
                            name: resultData[i]['dangsrcLevelName'],
                            value: resultData[i]['count']
                        };
                    }
                    initPieChar(legendData, seriesData);
                }
            });
        }

        function initPieChar(legendData, seriesData) {

            var myChart = echarts.init(document.getElementById('pie'));

            var option = {
                title: {
                    text: '重大危险源级别占比分析',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(data) {
                        return data.name + ':数量' + data.value + ',占比' +
                            data.percent.toFixed(1) + '%';
                    }
                },
                legend: {
                    orient: 'vertical',
                    right: '30%',
                    bottom: '20%',
                    data: legendData
                },
                series: [
                    {
                        name: '占比',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: seriesData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            normal: {
                                formatter: function(data) {
                                    return data.name + ':' +
                                        data.percent.toFixed(1) + '%';
                                }
                            }
                        }
                    }
                ],
                color: ['#9F041B', '#F76B1C', '#F7AA1C', '#008CEE']
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        function initSearch() {
            var date = new Date();
            var year = date.getFullYear();
            $('#startTime').textbox('setValue', year + '-01-01');
            $('#endTime').textbox('setValue', year + '-12-31');
        }

        function search() {
            this.datagridList.datagrid('load', {
                startTime: $('#startTime').textbox('getValue'),
                endTime: $('#endTime').textbox('getValue')
            });
            this.initPieCharData();
        }

        return {
            apiPage: '/api/statistic/danger-source-level/page',
            apiPieStatistic: '/api/statistic/danger-source-level/statistic',
            apiExportChart: '/api/statistic/danger-source-level/exportChart',
            initSearch: initSearch,
            initDatagridList: initDatagridList,
            initPieCharData: initPieCharData,
            search: search,
            exportChart: exportChart
        };
    });
    var pageModel = window.pageModel = new PageModel('重大危险源级别占比分析');
    pageModel.initSearch();
    pageModel.initDatagridList();
    pageModel.initPieCharData();
    pageModel.bindEventByIdName();

});
