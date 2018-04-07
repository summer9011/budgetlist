<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$documentRoot="D:\\项目资料\\";

if(isset($_POST["type"])){
    if($_POST["status"]!=""){
        $fromLcation="";
        $toLocation="";
        
        switch ($_POST["status"]) {
            case "started":
                $fromLcation="/15年项目/";
                break;
            case "no_money":
                $fromLcation="/已完工未结清/";
                break;
            case "stoped":
                $fromLcation="/";
                break;
            case "ended":
                $fromLcation="/已结清/";
                break;
        }
        
        switch ($_POST["type"]) {
            case "started":
                $toLocation="/15年项目/";
                break;
            case "no_money":
                $toLocation="/已完工未结清/";
                break;
            case "stoped":
                $toLocation="/";
                break;
            case "ended":
                $toLocation="/已结清/";
                break;
        }
        
		$fromLcation=iconv('UTF-8','GBK//IGNORE', $fromLcation);
		$toLocation=iconv('UTF-8','GBK//IGNORE', $toLocation);
		$filename=iconv('UTF-8','GBK//IGNORE', $_POST["name"]);
	
        $fromPath=$documentRoot.$fromLcation.$filename;
        $toPath=$documentRoot.$toLocation.$filename;
        
        $result=copy($fromPath,$toPath);
        if($result){
            $result2=unlink($fromPath); //删除旧目录下的文件
            if($result2){
                echo true;
            }else{
                echo "删除失败";
            }
        }else{
            echo "移动失败";
        }
    }
}