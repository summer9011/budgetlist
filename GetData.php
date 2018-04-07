<?php
include_once 'Main.php';

$main=new Main();

if(isset($_GET["groupName"])){
    $group_arr=$main->getGroup();
    echo "var groups=".json_encode($group_arr).";";
}

if(isset($_GET["className"])){
    $class_arr=$main->getClassName();
    echo "var classes=".json_encode($class_arr).";";
}