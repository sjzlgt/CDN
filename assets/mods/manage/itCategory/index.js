var CategoryInfoDlg = {
    data: {
        pid: "",
        pcodeName: ""
    }
};

layui.config({
    base: '/assets/mods/',
    version: true,
}).extend({
    treetable: 'treetable-lay/treetable'
}).use(['layer', 'form', 'laydate', 'table', 'treetable'], function () {
    var $ = layui.jquery;
    var form = layui.form;
    var laydate = layui.laydate;
    var layer = layui.layer;
    //var $ax = layui.ax;
    //var admin = layui.admin;
    var table = layui.table;
    var treetable = layui.treetable;

    /**
     * 系统管理--菜单管理
     */
    var Menu = {
        tableId: "categoryTable",    //表格id
        condition: {
            menuId: "",
            menuName: "",
            level: ""
        }
    };

    Menu.initColumn = function () {
        return [[
            {type: 'numbers'},
            {field: 'id', hide: true, title: 'id'},
            {field: 'categoryName', title: '分类名称', width: 250},
            //{field: 'code', title: '菜单编号', width: 120},
            {field: 'parentCategoryName', title: '父级分类', align: 'center', width: 250},
            /*{
                field: 'status', title: "状态", width: 100, align: 'center',
                templet: function (d) {
                    if (d.status == 0) {
                        return "禁用";
                    }
                    if (d.status == 1) {
                        return "启用";
                    }
                }
            },*/
            {field: 'sortIndex', title: '排序值', align: 'center', width: 80},
            {field: 'websiteCount', title: '网站数量', align: 'center', width: 100},
            {align: 'center', toolbar: '#tableBar', title: '操作', width: 188}
        ]];
    };

    /**
     * 初始化表格
     */
    Menu.initTable = function (menuId, data) {
        return treetable.render({
            elem: '#' + menuId,
            url: '/category/queryCategoryTree',
            where: data,
            page: false,
            //method: 'post',
            autoSort: false,
            height: "full-98",
            cellMinWidth: 100,
            cols: Menu.initColumn(),
            treeColIndex: 2,
            treeSpid: "",
            treeIdName: 'id',
            treePidName: 'parentId',
            treeDefaultClose: false,
            treeLinkage: true
        });
    };

    // 渲染表格
    var tableResult = Menu.initTable(Menu.tableId);

    $('#expandAll').click(function () {
        treetable.expandAll('#' + Menu.tableId);
    });
    $('#foldAll').click(function () {
        treetable.foldAll('#' + Menu.tableId);
    });

    /**
     * 点击查询按钮
     */
    Menu.search = function () {
        var queryData = {};
        queryData['categoryName'] = $("#txtCategoryName").val();
        queryData['status'] = $("#sltStatus").val();
        Menu.initTable(Menu.tableId, queryData);
    };

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Menu.search();
    });

    // 搜索添加点击事件
    $('#btnAdd').click(function () {
        console.log('点击了添加顶级网站分类按钮：')
        layer.open({
            type: 2,
            title: '添加网站分类',
            area: ['500px', '400px'],
            content: '/wsi/addCategory?pid=',
            end: function () {
                Menu.search();
            }
        });
    });

    // 工具条点击事件
    table.on('tool(' + Menu.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'add') {
            Menu.onAddCategory(data);
        } else if (layEvent === 'edit') {
            Menu.onEditCategory(data);
        } else if (layEvent === 'delete') {
            layer.confirm('确定要删除此网站分类吗？', {
                btn: ['是','否'] //按钮
            }, function(){
                Menu.onDeleteCategory(data);
            }, function(){});
        }
    });

    // 添加网站分类（非顶级）
    Menu.onAddCategory = function (data) {
        console.log('添加非顶级网站分类：');
        console.log(data);
        layer.open({
            type: 2,
            title: '添加网站分类',
            area: ['500px', '400px'],
            content: '/wsi/addCategory?pid='+data.id,
            end: function () {
                Menu.search();
            }
        });
    };

    // 编辑网站分类
    Menu.onEditCategory = function (data) {
        console.log('编辑网站分类：');
        console.log(data);
        layer.open({
            type: 2,
            title: '编辑网站分类',
            area: ['500px', '400px'],
            content: '/wsi/editCategory?id='+data.id,
            end: function () {
                Menu.search();
            }
        });
    };

    // 删除网站分类
    Menu.onDeleteCategory = function (data) {
        console.log('删除网站分类：');
        console.log(data);
        $.ajax({
            url: "/category/delete/"+data.id,
            type: 'GET',
            dataType: "json",
            success: function (res, status, xhr) {
                if (res.code == 200) {
                    parent.layer.alert(res.msg);
                    Menu.search();
                } else {
                    parent.layer.alert(res.msg);
                }
            }
        });
    };
});