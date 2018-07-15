$(function () {
    var PageModel = new P(Base, function () {
        //当前操作元素
        var selectEl;

        //获取选中的MSDS数据
        function getMSDS(data) {
            msdsData = data;
            //显示数据
            $(selectEl.data.target).textbox('setValue', msdsData['sid']);
            $(selectEl.data.target).textbox('setText', msdsData['msdsNameCh']);
        }

        function openChemicalList(e) {
            G.open({
                url: '/view/enterprise/chemical/chemical-select',
                title: 'MSDS信息选择'
            });
            selectEl = e;
        }

        function setValue(e) {
            console.log(msdsData);
            $(e.data.target).textbox('setValue', msdsData['sid']);
        }

        return {
            getMSDS: getMSDS,
            openChemicalList: openChemicalList
        };
    });
    var pageModel = window.pageModel = new PageModel('MSDS');
});
var editIndex = undefined;

function endEditing() {
    if (editIndex == undefined) {
        return true
    }
    if ($('#dg').datagrid('validateRow', editIndex)) {
        var ed = $('#dg').datagrid('getEditor', {index: editIndex, field: 'productid'});
        var productname = $(ed.target).combobox('getText');
        $('#dg').datagrid('getRows')[editIndex]['productname'] = productname;
        $('#dg').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

function onClickRow(index) {
    if (editIndex != index) {
        if (endEditing()) {
            $('#dg').datagrid('selectRow', index)
                .datagrid('beginEdit', index);
            editIndex = index;
        } else {
            $('#dg').datagrid('selectRow', editIndex);
        }
    }
}

function append() {
    if (endEditing()) {
        var $dg = $('#dg');
        $dg.datagrid('appendRow', {status: 'P'});
        editIndex = $dg.datagrid('getRows').length - 1;
        $dg.datagrid('selectRow', editIndex)
            .datagrid('beginEdit', editIndex);
    }
}

function removeit() {
    if (typeof editIndex === 'undefined') {
        return
    }
    $('#dg').datagrid('cancelEdit', editIndex)
        .datagrid('deleteRow', editIndex);
    editIndex = undefined;
}

function accept() {
    if (endEditing()) {
        $('#dg').datagrid('acceptChanges');
    }
}

function reject() {
    $('#dg').datagrid('rejectChanges');
    editIndex = undefined;
}

function getChanges() {
    var rows = $('#dg').datagrid('getChanges');
    alert(rows.length + ' rows are changed!');
}

