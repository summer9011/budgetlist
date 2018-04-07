<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
header("Content-type: text/html; charset=utf-8");

/** PHPExcel */
require_once './Lib/Classes/PHPExcel.php';

$documentRoot="D:\\项目资料\\";

if(isset($_GET["type"])){
    switch ($_GET["type"]) {
        case "started":
            $location="/项目预算/";
            break;
        case "no_money":
            $location="/我已完工未结清/";
            break;
        case "stoped":
            $location="/";
            break;
        case "ended":
            $location="/我结清/";
            break;
    }
    $location=iconv('UTF-8', 'GBK//IGNORE', $location);
    $filename=iconv('UTF-8', 'GBK//IGNORE', $_GET["name"]);
    $filePath=$documentRoot.$location.$filename;
    
    //PHPExcel读取xls
    $PHPExcel = new PHPExcel();     
    $PHPReader = new PHPExcel_Reader_Excel5(); 
    
    $PHPExcel = $PHPReader->load($filePath);
    
    //预览
    $phpWritherHTML=new PHPExcel_Writer_HTML($PHPExcel);
    $phpWritherHTML->save("php://output");
}