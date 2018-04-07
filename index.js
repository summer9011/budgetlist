var deleteHtml='<div class="col_operation" style="position:absolute;right:15%;border-right: none"><button>删除</button></div>';

var groupHtml=function setGroupHtml(){
    var temp='<div class="list div_group">';
    temp+='<div class="col_name">';
    temp+='<select class="col_type col_group_select">';
    temp+='<option id="0">请选择</option>';
    for(var index in groups){
        temp+='<option id="'+groups[index].group_id+'">'+groups[index].group_name+'</option>';
    }
    temp+='<option id="10000">其他名称</option>';
    temp+='</select>';
    temp+='</div>';
    temp+='<div class="col_specifications"></div>';
    temp+='<div class="col_numbers"></div>';
    temp+='<div class="col_square"></div>';
    temp+='<div class="col_price"></div>';
    temp+='<div class="col_total_price" style="border-right: none"></div>';
    temp+=deleteHtml;
    temp+='</div>';
    return temp;
};

var classHtml=function setClassHtml(){
    var temp='<div class="list div_class">';
    temp+='<div class="col_name">';
    temp+='<select class="col_type col_class_select">';
    temp+='<option id="0">请选择</option>';
    for(var index in classes){
        temp+='<option id="'+classes[index].class_name_id+'">'+classes[index].class_name+'</option>';
    }
    temp+='</select>';
    temp+='</div>';
    temp+='<div class="col_specifications"></div>';
    temp+='<div class="col_numbers"></div>';
    temp+='<div class="col_square"></div>';
    temp+='<div class="col_price"></div>';
    temp+='<div class="col_total_price" style="border-right: none"></div>';
    temp+=deleteHtml;
    temp+='</div>';
    return temp;
};

//小计
function setGroupPrice(classObj){
    var price_num=0.00;
    
    //向上小计
    var prev_classes=classObj.prevUntil(".div_group");
    prev_classes.each(function(index,ele){
        if($(ele).attr("id")=="list_body_title_div"){
            return false;
        }else{
            var temp=$(".col_total_price",ele).text();
            price_num+=parseFloat(temp);
        }
    });
    
    var neareast_group=classObj;
    
    //向下小计
    var next_classes=classObj.nextUntil(".div_group");
    next_classes.each(function(index,ele){
        if($(ele).attr("id")=="list_total_price"){
            return false;
        }else{
            var temp=$(".col_total_price",ele).text();
            price_num+=parseFloat(temp);
            
            neareast_group=ele;
        }
    });
    
    //加上自己本身的价格
    var temp=classObj.children(".col_total_price").text();
    price_num+=parseFloat(temp);
    //总的小计
    price_num=(price_num).toFixed(2);
    
    var nearestGroupPirce=$(neareast_group).next();
    
    if(nearestGroupPirce.hasClass("group_price")){
        nearestGroupPirce.children(".col_total_price").html(price_num);
    }
    
}

function setGroupPricePrev(classObj){
    classObj.addClass("group_price");
    var prev_classes=classObj.prevUntil(".div_group");
    var price_num=0.00;

    prev_classes.each(function(index,ele){
        if($(ele).attr("id")=="list_body_title_div"){
            return false;
        }else{
            var temp=$(".col_total_price",ele).text();
            price_num+=parseFloat(temp);
        }
    });

    price_num=(price_num).toFixed(2);
    classObj.children(".col_total_price").html(price_num);
}

//合计
function setTotalPrice(){
    var sum=0;

    $(".div_class").each(function(index,ele){
        var col_price_text=$(".col_total_price",ele).text();
        var col_price=0;
        if(col_price_text!='undefind'&&col_price_text!=''){
            col_price=parseFloat(col_price_text);
        }
        sum+=col_price;
    });
    sum=(sum).toFixed(2);

    $("#list_total_price > .col_total_price").text(sum);
}

//根据平方数、单价计算价格
function calculatePriceWithSquare(obj){
    var parent=$(obj).parent();

    //根据输入情况计算每项的价格
    if(parent.attr("class")=="col_specifications"){     //在输入规格时
        var per_num_text=parent.siblings(".col_numbers").children("input").val();
        var per_price_text=parent.siblings(".col_price").children("input").val();

        var text=$(obj).val();
        //按照*分割字符串
        var strs=new Array();
        strs=text.split("*");

        var square=1;
        if(strs.length>0){
            for(var i=0;i<strs.length;i++){
                var num=parseFloat(strs[i]);
                if(strs[i]=="4面"){
                    num*=100;
                }
                
                //判断是否为数字
                var re = /^[0-9]+.?[0-9]*$/;
                if (re.test(num)){
                    square*=num;
                }else{
                    square*=1;
                }
            }
        }else{
            square=0;
        }

        var per_num=1;
        if(per_num_text!='undefind'&&per_num_text!=''){
            per_num=parseFloat(per_num_text);
        }

        var total_square=square*per_num;

        if(strs.length==1){
            total_square=(total_square/100).toFixed(3);
        }else if(strs.length==2){
            total_square=(total_square/10000).toFixed(3);
        }else if(strs.length==3){
            total_square=(total_square/1000000).toFixed(3);
        }

        var per_price=0;
        if(per_price_text!='undefind'&&per_price_text!=''){
            per_price=parseFloat(per_price_text);
        }

        var price=per_price*total_square;
        price=(price).toFixed(2);

        parent.siblings(".col_square").html(total_square);
        parent.siblings(".col_total_price").html(price);

    }else if(parent.attr("class")=="col_numbers"){      //在输入数量时
        var per_num_text=$(obj).val();
        var per_price_text=parent.siblings(".col_price").children("input").val();

        //先计算出规格的平方数
        var square=1;
        var text=parent.siblings(".col_specifications").children("input").val();
        //按照*分割字符串
        var strs=new Array();
        strs=text.split("*");

        if(strs.length>0){
            for(var i=0;i<strs.length;i++){
                var num=parseFloat(strs[i]);
                if(strs[i]=="4面"){
                    num*=100;
                }
                
                //判断是否为数字
                var re = /^[0-9]+.?[0-9]*$/;
                if (re.test(num)){
                    square*=num;
                }else{
                    square*=1;
                }
            }
        }else{
            square=0;
        }

        var per_price=0;
        if(per_price_text!='undefind'&&per_price_text!=''){
            per_price=parseFloat(per_price_text);
        }

        var per_num=1;
        if(per_num_text!='undefind'&&per_num_text!=''){
            per_num=parseFloat(per_num_text);
        }

        //总的平方数
        var total_square=square*per_num;
        
        if(strs.length==1){
            total_square=(total_square/100).toFixed(3);
        }else if(strs.length==2){
            total_square=(total_square/10000).toFixed(3);
        }else if(strs.length==3){
            total_square=(total_square/1000000).toFixed(3);
        }

        var price=per_price*total_square;
        price=(price).toFixed(2);

        parent.siblings(".col_square").html(total_square);
        parent.siblings(".col_total_price").html(price);
    }else if(parent.attr("class")=="col_price"){        //在输入单价时
        var per_price_text=$(obj).val();

        var per_price=0;
        if(per_price_text!='undefind'&&per_price_text!=''){
            per_price=parseFloat(per_price_text);
        }

        var total_square_text=parent.siblings(".col_square").text();
        var total_square=0;
        if(total_square_text!='undefind'&&total_square_text!=''){
            total_square=parseFloat(total_square_text);
        }

        var col_price=per_price*total_square;
        col_price=(col_price).toFixed(2);
        parent.siblings(".col_total_price").html(col_price);
    }
}

//根据数量、单价计算价格
function calculatePriceWithNumber(obj){
    var parent=$(obj).parent();

    //根据输入情况计算每项的价格
    if(parent.attr("class")=="col_specifications"){     //在输入规格时
        console.log("不处理");
    }else if(parent.attr("class")=="col_numbers"){      //在输入数量时
        var per_num=1;
        var per_num_text=$(obj).val();
        if(per_num_text!='undefind'&&per_num_text!=''){
            per_num=parseFloat(per_num_text);
        }
        
        var per_price=0;
        var per_price_text=parent.siblings(".col_price").children("input").val();
        if(per_price_text!='undefind'&&per_price_text!=''){
            per_price=parseFloat(per_price_text);
        }
        
        var col_price=per_num*per_price;
        col_price=(col_price).toFixed(2);
        parent.siblings(".col_total_price").html(col_price);
    }else if(parent.attr("class")=="col_price"){        //在输入单价时
        var per_price=0;
        var per_price_text=$(obj).val();
        if(per_price_text!='undefind'&&per_price_text!=''){
            per_price=parseFloat(per_price_text);
        }
        
        var per_num=1;
        var per_num_text=parent.siblings(".col_numbers").children("input").val();
        if(per_num_text!='undefind'&&per_num_text!=''){
            per_num=parseFloat(per_num_text);
        }

        var col_price=per_price*per_num;
        col_price=(col_price).toFixed(2);
        parent.siblings(".col_total_price").html(col_price);
    }
}

//将页面上的数据封装成json数据，发送到后台
function submitJsonData(){
    var json_str='{';
    
    $("#contents").children().each(function(index,ele){
        if($(ele).attr("id")=="list_title_div"){            //标题
            json_str+='"title":{';
            //标题名称
            json_str+='"list_name":';
            json_str+='"'+$("#list_name",ele).val()+'",';
            
            var list_type_id;
            var list_type_name;
            
            if($(ele).children().last().is("select")){      //选择标题类型
                list_type_id=$("#list_type",ele).children("option:selected").attr("id");
                list_type_name=$("#list_type",ele).val();
            }else{                                          //自定义标题类型
                list_type_id='10000';
                list_type_name=$(ele).children().last().val();
            }
            
            //标题类型id
            json_str+='"list_type_id":';
            json_str+='"'+list_type_id+'",';
            
            //标题类型名称
            json_str+='"list_type_name":';
            json_str+='"'+list_type_name+'"';
            
            json_str+='},';
        }else if($(ele).attr("id")=="list_body_title_div"){ //头部
            json_str+='"col_top":{';
            
            //遍历标题
            $(ele).children().each(function(subindex,subele){
                json_str+='"'+$(subele).attr("class")+'":';
                json_str+='"'+$(subele).text()+'",';
            });
            
            json_str=json_str.substring(0,json_str.length-1);
            
            json_str+='},';
        }else if($(ele).attr("id")=="list_total_price"){    //合计
            json_str+='"col_total_price":{';
            
            //遍历标题
            $(ele).children().each(function(subindex,subele){
                json_str+='"'+$(subele).attr("class")+'":';
                json_str+='"'+$(subele).text()+'",';
            });
            
            json_str=json_str.substring(0,json_str.length-1);
            
            json_str+='}';
        }else{                                              //每项
            json_str+='"col_per'+index+'":{';
            
            if($(ele).hasClass("div_group")){
                if($(ele).hasClass("group_price")){  //小计
                    var group_price=$(".col_total_price",ele).text();
                    json_str+='"col_type":"group_price","group_price":"'+group_price+'"';
                }else{
                    if($(".col_name",ele).children().last().is("select")){     //选择小标题
                        var col_group_id=$(".col_name",ele).children("select").children("option:selected").attr("id");
                        var col_group_name=$(".col_name",ele).children("select").val();

                        json_str+='"col_type":"group_title","group_id":"'+col_group_id+'","group_name":"'+col_group_name+'"';
                    }else{                                                                  //自定义标题
                        var col_group_name=$(".col_name",ele).children("input.text_input").val();
                        json_str+='"col_type":"group_custom","group_id":"10000","group_name":"'+col_group_name+'"';
                    }
                }
            }else if($(ele).hasClass("div_class")){  //每项内容
                json_str+='"col_type":"class",';
                
                //遍历标题
                $(ele).children().each(function(subindex,subele){
                    switch($(subele).attr("class")){
                        case "col_name":            //名称
                            var col_name_id=$(".col_name",ele).children("select").children("option:selected").attr("id");
                            var col_name=$(".col_name",ele).children("select").val();
                            json_str+='"col_name_id":"'+col_name_id+'","col_name":"'+col_name+'",';
                            break;
                        case "col_specifications":  //规格
                            var col_specifications=$(".col_specifications",ele).children("input").val();
                            json_str+='"col_specifications":"'+col_specifications+'",';
                            break;
                        case "col_numbers":         //数量
                            var col_numbers=$(".col_numbers",ele).children("input").val();
                            json_str+='"col_numbers":"'+col_numbers+'",';
                            break;
                        case "col_square":          //平方
                            var col_square=$(".col_square",ele).text();
                            json_str+='"col_square":"'+col_square+'",';
                            break;
                        case "col_price":           //单价
                            var col_price=$(".col_price",ele).children("input").val();
                            json_str+='"col_price":"'+col_price+'",';
                            break;
                        case "col_total_price":     //金额
                            var col_total_price=$(".col_total_price",ele).text();
                            json_str+='"col_total_price":"'+col_total_price+'"';
                            break;
                    }
                });
            }
            
            json_str+='},';
        }
    });
    json_str+='}';
    
    doPostJosn(json_str);
}

function doPostJosn(json_str){
    $.post('/BudgetList/SaveData.php',{
        json_str:json_str
    },function(result){
        if(result=="1"){
            jAlert("保存成功","");
        }else{
            jAlert("保存失败","");
        }
        $("#cover").css("display","none");
        
    });
}

$(function(){
    $("#add_group").click(function(){
        $("#list_total_price").before(groupHtml);
    });
    
    $("#add_class").click(function(){
        $("#list_total_price").before(classHtml);
    });
    
    $("#add_group_count").click(function(){
        $("#list_total_price").before(groupHtml);
        
        var select=$("#list_total_price").prev().children(".col_name").children("select");
        select.children().each(function(index,ele){
            if(index==6){
                $(ele).attr("selected","selected");
                setGroupPricePrev($("#list_total_price").prev());
                return;
            }
        });
        
    });

    $(".list_type").live('change',function(){
        var index=$("option:selected",this).attr("id");
        var col_title=$(this).parent();
        if(parseInt(index)==10000){
            col_title.children("select").remove();
            col_title.append('<input class="text_input" type="text" placeholder="其他标题" value="">');
        }
    });

    $(".col_group_select").live('change',function(){
        var index=$("option:selected",this).attr("id");
        var col_price=$(this).parents(".div_group");
        switch(parseInt(index)){
            case 0:     //请选择
            case 1:     //东门
            case 2:     //西门
            case 3:     //南门
            case 4:     //北门
            case 5:     //附件
                col_price.removeClass("group_price");
                col_price.children(".col_total_price").html("");
                break;
            case 6:     //小计
                setGroupPricePrev(col_price);
                break;
            case 10000:     //其他名称
                col_price.removeClass("group_price");
                col_price.children(".col_total_price").html("");
                col_price.children(".col_name").html('<input class="text_input col_class" type="text" placeholder="其他名称" value="">');
                break;
        }
    });

    $(".col_class_select").live('change',function(){
        var index=$("option:selected",this).attr("id");
        var col_class=$(this).parents(".div_class");
        
        var col_specifications;
        var col_numbers;
        var col_square;
        var col_price;
        var col_total_price;
        
        switch(parseInt(index)){
            case 0:     //请选择
                col_specifications='';
                col_numbers='';
                col_square='';
                col_price='';
                col_total_price='';
                break;
            case 1:     //大门
            case 2:     //小门
            case 5:     //围栏
                col_specifications='<input class="text_input col_class" type="text" placeholder="请输入" value="">';
                col_numbers='<input class="text_input col_class" type="text" placeholder="1" value="">';
                col_square='0.00';
                col_price='<input class="text_input col_class" type="text" placeholder="0" value="">';
                col_total_price='0.00';
                break;
            case 3:     //大柱
            case 4:     //小柱
                col_specifications='<input class="text_input col_class" type="text" placeholder="请输入" value="4面*">';
                col_numbers='<input class="text_input col_class" type="text" placeholder="1" value="">';
                col_square='0.00';
                col_price='<input class="text_input col_class" type="text" placeholder="0" value="">';
                col_total_price='0.00';
                break;
            case 6:     //方管柱
                col_specifications='<input class="text_input col_class" type="text" placeholder="请输入" value="10*10">';
                col_numbers='<input class="text_input col_class" type="text" placeholder="1" value="">';
                col_square='';
                col_price='<input class="text_input col_class" type="text" placeholder="0" value="">';
                col_total_price='0.00';
                break;
            case 7:     //电机
                col_specifications='<input class="text_input col_class" type="text" placeholder="请输入" value="两个电机两个遥控器一个控制箱">';
                col_numbers='<input class="text_input col_class" type="text" placeholder="1" value="">';
                col_square='';
                col_price='<input class="text_input col_class" type="text" placeholder="0" value="">';
                col_total_price='0.00';
                break;
            case 8:     //电线
                col_specifications='<input class="text_input col_class" type="text" placeholder="请输入" value="含税6%">';
                col_numbers='<input class="text_input col_class" type="text" placeholder="1" value="">';
                col_square='';
                col_price='<input class="text_input col_class" type="text" placeholder="0" value="">';
                col_total_price='0.00';
                break;
            case 9:     //橡胶条
                col_specifications='<input class="text_input col_class" type="text" placeholder="请输入" value="按米计算">';
                col_numbers='<input class="text_input col_class" type="text" placeholder="1" value="">';
                col_square='';
                col_price='<input class="text_input col_class" type="text" placeholder="0" value="">';
                col_total_price='0.00';
                break;
            case 10:    //线管
                col_specifications='<input class="text_input col_class" type="text" placeholder="请输入" value="包括人工费">';
                col_numbers='<input class="text_input col_class" type="text" placeholder="1" value="">';
                col_square='';
                col_price='<input class="text_input col_class" type="text" placeholder="0" value="">';
                col_total_price='0.00';
                break;
            case 11:    //预埋铁
                col_specifications='<input class="text_input col_class" type="text" placeholder="请输入" value="预埋">';
                col_numbers='<input class="text_input col_class" type="text" placeholder="1" value="">';
                col_square='';
                col_price='<input class="text_input col_class" type="text" placeholder="0" value="">';
                col_total_price='0.00';
                break;
            case 12:    //铁板
                col_specifications='<input class="text_input col_class" type="text" placeholder="请输入" value="贴字底板">';
                col_numbers='<input class="text_input col_class" type="text" placeholder="1" value="">';
                col_square='';
                col_price='<input class="text_input col_class" type="text" placeholder="0" value="">';
                col_total_price='0.00';
                break;
            case 13:    //地面开槽
                col_specifications='<input class="text_input col_class" type="text" placeholder="请输入" value="地面开槽，水泥，沙">';
                col_numbers='<input class="text_input col_class" type="text" placeholder="1" value="">';
                col_square='';
                col_price='<input class="text_input col_class" type="text" placeholder="0" value="">';
                col_total_price='0.00';
                break;
        }
        
        col_class.children(".col_specifications").html(col_specifications);
        col_class.children(".col_numbers").html(col_numbers);
        col_class.children(".col_square").html(col_square);
        col_class.children(".col_price").html(col_price);
        col_class.children(".col_total_price").html(col_total_price);

        setGroupPrice(col_class);
        setTotalPrice();
    });

    $(".text_input").live('keyup',function(){
        var parent=$(this).parent();
        
        if(parent.attr("id")!="list_title_div"){
            var select=parent.siblings(".col_name").children("select");
            var option_id=$("option:selected",select).attr("id");
            var index=parseInt(option_id);

            if(index>=1&&index<=5){
                calculatePriceWithSquare(this);
            }else if(index>=6){
                calculatePriceWithNumber(this);
            }

            setGroupPrice($(this).parents(".div_class"));
            setTotalPrice();
        }
    });
    
    $("#dofinish").click(function(){
        if($("#list_name").val()==""){
            jAlert("请输入清单名称","");
            return false;
        }
        
        if($("#list_title_div").children().last().is("select")){      //选择标题类型
            if($("#list_type").val()=="请选择"){
                jAlert("请选择清单类型","");
                return false;
            }
        }else{                                          //自定义标题类型
            if($("#list_title_div").children().last().val()==""){
                jAlert("请输入清单类型","");
                return false;
            }
        }
        
        $("#cover").css({display:"block",height:$(document).height()});
        jConfirm('确定要保存吗？','', function(r) {
            if(r){
                submitJsonData();
                return;
            }else{
                $("#cover").css("display","none");
                return;
            }
        });
    });

    $(".col_operation").live('mouseover',function(){
        var parent=$(this).parent();
        if((parent.hasClass("div_group")||parent.hasClass("div_class"))&&!parent.hasClass("div_selected")){
            $(parent).css("background","rgba(51,153,255,0.3)");
        }
    });
    $(".col_operation").live('mouseout',function(){
        var parent=$(this).parent();
        if((parent.hasClass("div_group")||parent.hasClass("div_class"))&&!parent.hasClass("div_selected")){
            if(parent.hasClass("div_group")){
                parent.css("background-color","#fcf8e3");
            }else if(parent.hasClass("div_class")){
                parent.css("background","#eee");
            }
        }
    });
    $(".col_operation").live('mouseup',function(){
        $(this).parent().remove();
        
        setGroupPrice($(this).parent());
        setTotalPrice();
    });
    
    $("#list_name").blur(function(){
        var pattern="铁艺大门围栏";
        var title=$(this).val();
        
        if(title==""){
            return;
        }
        
        if(title.indexOf(pattern)>0){
            return;
        }else{
            $(this).val(title+pattern);
        }
        
    });
    
});