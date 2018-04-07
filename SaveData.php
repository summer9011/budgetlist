<?php

date_default_timezone_set('Asia/Shanghai');

/** PHPExcel */
include './Lib/Classes/PHPExcel.php';

require_once './Lib/Classes/PHPExcel/Writer/Excel5.php';

if(isset($_POST["json_str"])){
    $data=json_decode($_POST["json_str"], TRUE);
    
    $title=$data['title'];
    $top=$data['col_top'];
    $total=$data['col_total_price'];
    
    //初始化
    $objPHPExcel = new PHPExcel();
    $objWriter = new PHPExcel_Writer_Excel5($objPHPExcel);
    
	$temptitleName=iconv('UTF-8','GBK//IGNORE', $title['list_name']);
	$temptitleType=iconv('UTF-8','GBK//IGNORE', $title['list_type_name']);
	
    //获取文档基本属性
    $objPHPProps=$objPHPExcel->getProperties();
    $objPHPProps->setCreator('Zhao');
    $objPHPProps->setLastModifiedBy('Zhao');
    $objPHPProps->setTitle($temptitleName);
    $objPHPProps->setSubject($temptitleName.$temptitleType);
    $objPHPProps->setDescription($temptitleName.$temptitleType);
    $objPHPProps->setKeywords($temptitleType);
    $objPHPProps->setCategory($temptitleType);
    
    //设置当前的sheet索引
    $objPHPExcel->setActiveSheetIndex(0);
    
    //设置当前活动sheet
    $objActSheet=$objPHPExcel->getActiveSheet();
    $objActSheet->setTitle($title['list_type_name']);
    
    //布局Excel
    $objActSheet->mergeCells('A1:F2');
    
    //设置每列的宽度
    $offset=1.5;
    $objActSheet->getColumnDimension('A')->setWidth(11.25+$offset);
    $objActSheet->getColumnDimension('B')->setWidth(28.50+$offset);
    $objActSheet->getColumnDimension('C')->setWidth(8.25+$offset);
    $objActSheet->getColumnDimension('D')->setWidth(10.63+$offset);
    $objActSheet->getColumnDimension('E')->setWidth(10.63+$offset);
    $objActSheet->getColumnDimension('F')->setWidth(11.25+$offset);
    
    $objStyleA1=$objActSheet->getStyle('A1');
    
    //设置字体   
    $objFontA1=$objStyleA1->getFont();  
    $objFontA1->setName('宋体');
    $objFontA1->setSize(28);
    $objFontA1->setBold(true);
    
    //设置对齐方式   
    $objAlignA1 = $objStyleA1->getAlignment();
    $objAlignA1->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);   
    $objAlignA1->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);    
    
    //设置标题
    $objActSheet->setCellValue('A1',$title['list_name'].$title['list_type_name']);
    
    //设置每行的高度
    for($i=1;$i<4;$i++){
        $objActSheet->getRowDimension($i)->setRowHeight(24.00+$offset);
    }
    
    for($i=65;$i<71;$i++){
        //设置每行标题的样式
        $objStyle=$objActSheet->getStyle(chr($i).'3');
        
        $objBorder=$objStyle->getBorders();
        $objBorder->getTop()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objBorder->getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objBorder->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objBorder->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        
        $objFont=$objStyle->getFont();  
        $objFont->setName('宋体');
        $objFont->setSize(11);
        $objFont->setBold(true);
        
        $objAlign = $objStyle->getAlignment();
        $objAlign->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);   
        $objAlign->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER); 
    }
    
    //设置每行行的标题
    $objActSheet->setCellValue('A3',$top['col_name']);
    $objActSheet->setCellValue('B3',$top['col_specifications']);
    $objActSheet->setCellValue('C3',$top['col_numbers']);
    $objActSheet->setCellValue('D3',$top['col_square']);
    $objActSheet->setCellValue('E3',$top['col_price']);
    $objActSheet->setCellValue('F3',$top['col_total_price']);
    
    //设置数据
    $groupPriceIndexArr=array();
    $totalPriceIndexArr=array();
    
    $row=4;
    foreach ($data as $k => $v) {
        if(strstr($k, 'col_per')){
            $objActSheet->getRowDimension($row)->setRowHeight(24.00+$offset);
            
            for($i=65;$i<71;$i++){
                //设置每行标题的样式
                $objStyle=$objActSheet->getStyle(chr($i).$row);

                $objBorder=$objStyle->getBorders();
                $objBorder->getTop()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
                $objBorder->getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
                $objBorder->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
                $objBorder->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

                $objFont=$objStyle->getFont();  
                $objFont->setName('宋体');
                $objFont->setSize(11);

                $objAlign = $objStyle->getAlignment();
                $objAlign->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);   
                $objAlign->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER); 
            }
            
            //根据type设置每行的数据
            switch ($v['col_type']){
                case "group_price":     //小计
                    $objActSheet->setCellValue('A'.$row,'小计');
                    
                    $group_str='=';
                    foreach($groupPriceIndexArr as $per_row){
                        $group_str.='F'.$per_row.'+';
                    }
                    
                    $str=substr($group_str,0,strlen($group_str)-1);
                    
                    $objActSheet->setCellValue('F'.$row,$str);
                    
                    $groupPriceIndexArr=array();
                    break;
                case "group_title":     //选择小标题
                    $objActSheet->setCellValue('A'.$row,$v['group_name']);
                    break;
                case "group_custom":    //自定义小标题
                    $objActSheet->setCellValue('A'.$row,$v['group_name']);
                    break;
                case "class":           //每项
                    $objActSheet->setCellValue('A'.$row,$v['col_name']);
                    $objActSheet->setCellValue('B'.$row,$v['col_specifications']);
                    $objActSheet->setCellValue('C'.$row,$v['col_numbers']);
                    $objActSheet->setCellValue('D'.$row,$v['col_square']);
                    $objActSheet->setCellValue('E'.$row,$v['col_price']);
                    
                    if($v['col_name_id']>=1&&$v['col_name_id']<=5){
                        $objActSheet->setCellValue('F'.$row,'=D'.$row.'*E'.$row);
                    }else if($v['col_name_id']>=6){
                        $objActSheet->setCellValue('F'.$row,'=C'.$row.'*E'.$row);
                    }
                    
                    array_push($groupPriceIndexArr, $row);
                    array_push($totalPriceIndexArr, $row);
                    
                    break;
            }
            
            $row++;
        }else if($k=="col_total_price"){
            $objActSheet->getRowDimension($row)->setRowHeight(24.00+$offset);
            
            for($i=65;$i<71;$i++){
                //设置每行标题的样式
                $objStyle=$objActSheet->getStyle(chr($i).$row);

                $objBorder=$objStyle->getBorders();
                $objBorder->getTop()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
                $objBorder->getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
                $objBorder->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
                $objBorder->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

                $objFont=$objStyle->getFont();  
                $objFont->setName('宋体');
                $objFont->setSize(11);

                $objAlign = $objStyle->getAlignment();
                $objAlign->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);   
                $objAlign->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER); 
            }
            
            $objActSheet->setCellValue('A'.$row,$v['col_name']);
            
            $group_str='=';
            foreach($totalPriceIndexArr as $per_row){
                $group_str.='F'.$per_row.'+';
            }

            $str=substr($group_str,0,strlen($group_str)-1);
            
            $objActSheet->setCellValue('F'.$row,$str);
            
            $row++;
        }
    }
	
    ob_end_clean();//清除缓冲区,避免乱码
	header('Content-Type:application/csv;charset=UTF-8');
	header('Content-Disposition: attachment;filename="'.$title['list_name'].  date('Ymd', time()).'.xls"');
	header('Cache-Control: No-cache');  
	
	
    //保存到文件
    $outputFileName='D:\\项目资料\\项目预算\\'.$title['list_name'].  date('Ymd', time()).'.xls';
	$outputFileName=iconv('UTF-8', 'GBK//IGNORE', $outputFileName);
    $objWriter->save($outputFileName);
    
    echo true;
}
