<?php 
include_once 'Main.php'; 
$main=new Main();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <meta charset="UTF-8">
        <title>创建清单</title>
        <link href="./index.css" rel="stylesheet" type="text/css" />
        <script src="./jquery-1.8.3.min.js" type="text/javascript"></script>
        
        <script src="./jQueryAlert/jquery.ui.draggable.js" type="text/javascript"></script>
        <script src="./jQueryAlert/jquery.alerts.js" type="text/javascript"></script>
        <link href="./jQueryAlert/jquery.alerts.css" rel="stylesheet" type="text/css" media="screen" />
        
    </head>
    <body style="overflow-x:hidden;">
        <div id="fix_add">
            <button id="add_group">+标题</button><br/>
            <button id="add_class">+条目</button><br/>
            <button id="add_group_count">+小计</button>
        </div>
        <?php include_once 'Menu.php'; ?>
        <div id="contents">
            <div id="list_title_div">
                <input id="list_name" class="text_input" type="text" value="" placeholder="清单名称" />
                <select id="list_type" class="list_type">
                    <option id="0">请选择</option>
                    <?php foreach ($main->getListType() as $list) {
                        echo '<option id="'.$list['type_id'].'">'.$list['type_name'].'</option>';
                    } ?>
                    <option id="10000">其他标题</option>
                </select>
            </div>
            <div id="list_body_title_div" class="list">
                <div class="col_name">名称</div>
                <div class="col_specifications">规格(cm*cm)</div>
                <div class="col_numbers">数量</div>
                <div class="col_square">平方(m²)</div>
                <div class="col_price">单价</div>
                <div class="col_total_price" style="border-right: none">金额</div>
            </div>
            
            <div id="list_total_price" class="list">
                <div class="col_name">合计</div>
                <div class="col_specifications"></div>
                <div class="col_numbers"></div>
                <div class="col_square"></div>
                <div class="col_price"></div>
                <div class="col_total_price" style="border-right: none">0.00</div>
            </div>
        </div>
        
        <div class="finish_div">
            <button id="dofinish" class="finish_button">保存到项目资料</button>
        </div>
        
        <div id="cover"><img src="./loading.gif" width="32px" height="32px" /></div>
        <div id="lastdiv"></div>
    </body>
    <script type="text/javascript" src="http://localhost/BudgetList/GetData.php?groupName"></script>
    <script type="text/javascript" src="http://localhost/BudgetList/GetData.php?className"></script>
    <script type="text/javascript" src="./index.js"></script>
</html>
