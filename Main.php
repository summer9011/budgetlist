<?php

class Main {
    private $db_host='localhost';
    private $db_port=3306;
    private $db_name='root';
    private $db_pass='';
    private $db_dbname='BudgetList';

    public function __construct() {
        
    }
    
    public function ConnectDB(){
        $connect=mysqli_connect($this->db_host, $this->db_name, $this->db_pass, $this->db_dbname);
        if(!$connect){
            die('数据库连接失败:'.  mysqli_connect_error());
        }
        mysqli_set_charset($connect, 'utf8');
        
        return $connect;
    }
    
    public function result_array($conncet, $query){
        $tempArr=array();
        
        $result=mysqli_query($conncet, $query);
        while($row=mysqli_fetch_array($result)){
            $rowTemp=array();
            foreach ($row as $key => $value) {
                if(!is_numeric($key)){
                    $rowTemp=array_merge($rowTemp, array($key=>$value));
                }
            }
            array_push($tempArr, $rowTemp);
        }
        
        return $tempArr;
    }

    /**
     * 获取清单类型
     * @return array
     */
    public function getListType(){
        $conncet=$this->ConnectDB();
        
        $query="select * from budgetlist_type";
        $result_data=  $this->result_array($conncet, $query);
        mysqli_close($conncet);
        
        return $result_data;
    }
    
    /**
     * 获取组的名称
     * @return array
     */
    public function getGroup(){
        $conncet=$this->ConnectDB();
        
        $query="select * from budgelist_group";
        $result_data=  $this->result_array($conncet, $query);
        mysqli_close($conncet);
        
        return $result_data;
    }
    
    /**
     * 获取每项的名称
     * @return array
     */
    public function getClassName(){
        $conncet=$this->ConnectDB();
        
        $query="select * from budgelist_classname";
        $result_data=  $this->result_array($conncet, $query);
        mysqli_close($conncet);
        
        return $result_data;
    }
    
	
    public function getAllTypeFile(){
        $data=$this->tree('D:\\项目资料\\');
        
        $stop=array();
        foreach ($data as $key => $value) {
            if(is_numeric($key)){
                array_push($stop, $value);
                unset($data[$key]);
            }
        }
        
        $data=array_merge($data, array("已暂停"=>$stop));
        
        $start=array();
        $no_money=array();
        $stoped=array();
        $ended=array();
        
        foreach($data as $key=>$val){
            switch ($key){
                case "15年项目":
                    $start=array("started"=>$val);
                    break;
                case "16年项目":
                    $start=array("started"=>$val);
                    break;
                case "诚浩装饰":
                    $start=array("started"=>$val);
                    break;
                case "公已结清":
                    $start=array("started"=>$val);
                    break;
                case "联合物业":
                    $start=array("started"=>$val);
                    break;
                case "我结清":
                    $start=array("started"=>$val);
                    break;
                case "我已开票":
                    $start=array("started"=>$val);
                    break;
                case "我已完工未结清":
                    $start=array("started"=>$val);
                    break;
                case "志灿":
                    $start=array("started"=>$val);
                    break;
            }
        }
        
        $result=array();
        $result=array_merge($result, $start, $no_money, $stoped, $ended);
		
        return $result;
    }
    
    function tree($directory) {
        $arr=array();
        
		$mydir = dir($directory);
		while($file = $mydir->read()) {
			$tmepfile=iconv('GBK//IGNORE', 'UTF-8', $file);
			if(($file!=".") AND ($file!="..") AND ($file!=".DS_Store") AND ($file!="\$RECYCLE.BIN") AND ($file!="System Volume Information") AND ($file!="KuGouCache") AND ($file!="desktop.ini") AND ($file!="Internet Explorer.lnk")) {
				if((is_dir("$directory/$file"))){
					if($tmepfile=="已结清" || $tmepfile=="已完工未结清" || $tmepfile=="15年项目"){
						$temp_arr=$this->tree("$directory/$file");
						$temp_data=array($tmepfile=>$temp_arr);
						$arr= array_merge($arr, $temp_data);
					}
				}else{
					$fileArr=explode(".", $tmepfile);
					if(count($fileArr)==2&&($fileArr[1]=="xls"||$fileArr[1]=="xlsx")&&$fileArr[0]!="预算单模板"){
						array_push($arr, $tmepfile);
					}
				}
			}
		}
		$mydir->close();
        
        return $arr;
    } 
    
}