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
        
        <link href="./managerList.css" rel="stylesheet" type="text/css" />
        <link href="./jQueryAlert/jquery.alerts.css" rel="stylesheet" type="text/css" media="screen" />
    </head>
    <body style="overflow-x:hidden;">
        <?php include_once 'Menu.php'; ?>
        <div id="contents">
            <div id="list_title_div">
                <div class="manager_title">
                    工程项目管理
                </div>
            </div>
            <div id="list_body_title_div" class="list">
                <div class="col_name name_manager">工程名称</div>
                <div class="col_specifications specifications_manager">工程状态</div>
                <div class="col_numbers number_manager" style="border-right: none">操作</div>
            </div>
            <?php 
            $dir_status="";
            $status_class="";
            
            $started_count=0;
            $no_money_count=0;
            $stoped_count=0;
            $ended_count=0;
            foreach($main->getAllTypeFile() as $dir=>$fileArray){ 
                switch ($dir){
                    case "started":
                        $dir_status="已预算未开工";
                        $status_class="started";
                        $started_count=count($fileArray);
                        break;
                    case "no_money":
                        $dir_status="已完工未结清";
                        $status_class="no_money";
                        $no_money_count=count($fileArray);
                        break;
                    case "stoped":
                        $dir_status="已暂停";
                        $status_class="stoped";
                        $stoped_count=count($fileArray);
                        break;
                    case "ended":
                        $dir_status="已结清";
                        $status_class="ended";
                        $ended_count=count($fileArray);
                        break;
                }
                $first=0;
                foreach($fileArray as $filename){
                ?>
                    <div <?php echo $first==0?'id="'.$status_class.'"':''; ?> class="list div_class">
                        <div class="col_name name_manager"><?php echo $filename; ?></div>
                        <div class="col_specifications specifications_manager <?php echo $status_class; ?>"><?php echo $dir_status; ?></div>
                        <div class="col_numbers number_manager" style="border-right: none">
                            <button class="move_to">移动到</button>
                        </div>
                    </div>
            <?php 
                $first++;
                }
            } 
                ?>
        </div>
        
        <div id="fix_add">
            <button id="go_started" style="color:#99ccff">已预算未开工 (<?php echo $started_count; ?>个)</button><br/>
            <button id="go_no_money" style="color:#cccc00">已完工未结清 (<?php echo $no_money_count; ?>个)</button><br/>
            <button id="go_stoped" style="color:red">已暂停 (<?php echo $stoped_count; ?>个)</button><br/>
            <button id="go_ended" style="color:green">已结清 (<?php echo $ended_count; ?>个)</button>
        </div>
        
        <div id="alertcover">
            <div id="moveb">
                <span>移动&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>到</span>
                <button id="cancel_move">取消</button>
                <button id="move1">move1</button>
                <button id="move2">move2</button>
                <button id="move3">move3</button>
            </div>
        </div>
    </body>
    <script type="text/javascript" src="./managerlist.js"></script>
</html>