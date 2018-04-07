var current_status="";

function doMovePost(type, name){
    $.post("/BudgetList/moveFile.php",{
        type:type,
        name:name,
        status:current_status
    },function(data){
        if(data==true){
            jAlert("移动成功","",function(){
                window.location.reload();
            });
        }else{
            jAlert(data,"");
        }
    });
}

function doPreview(type, name){
    window.open("/BudgetList/Preview.php?type="+type+"&name="+name);
}

$(function(){
    $("#fix_add > button").click(function(e){
        var type=$(this).attr("id");
        var typeArr=new Array();
        typeArr=type.split("_");
        
        var temp=typeArr[1];
        if(typeArr.length>2){
            temp=typeArr[1]+"_"+typeArr[2];
        }
        
        window.location.hash="#"+temp;
    });
    
    $(".move_to").click(function(){
        var filename=$(this).parent().siblings(".name_manager").text();
        
        var filestatus="";
        var btnArr=new Array();
        var status_div=$(this).parent().siblings(".specifications_manager");
        if(status_div.hasClass("started")){
            filestatus="started";
            btnArr=["no_money","stoped","ended"];
        }else if(status_div.hasClass("no_money")){
            filestatus="no_money";
            btnArr=["started","stoped","ended"];
        }else if(status_div.hasClass("stoped")){
            filestatus="stoped";
            btnArr=["started","no_money","ended"];
        }else if(status_div.hasClass("ended")){
            filestatus="ended";
            btnArr=["started","no_money","stoped"];
        }
        
        current_status=filestatus;
        
        var left=$(window).width()/2-250;
        
        $("#alertcover").css({display:"block"});
        $("#moveb").css({left:left+"px"});
        $("#cancel_move").css({left:left+420+"px"});
        
        $("#moveb span:eq(1)").remove();
        $("#moveb span:eq(1)").remove();
        $("#moveb span:first").after("<span style='color:"+$("#go_"+filestatus).css("color")+"'>"+filename+"</span><span>&nbsp;&nbsp;&nbsp;&nbsp;到</span>");
        
        $("#move1").css({left:left+9+"px",color:$("#go_"+btnArr[0]).css("color")});
        $("#move2").css({left:left+7*2+150+9+"px",color:$("#go_"+btnArr[1]).css("color")});
        $("#move3").css({left:left+7*3+150*2+16+"px",color:$("#go_"+btnArr[2]).css("color")});
        
        var temp=new Array();
        
        temp=$("#go_"+btnArr[0]).text().split(" ");
        $("#move1").text(temp[0]);
        $("#move1").attr("class",btnArr[0]);
        temp=$("#go_"+btnArr[1]).text().split(" ");
        $("#move2").text(temp[0]);
        $("#move2").attr("class",btnArr[1]);
        temp=$("#go_"+btnArr[2]).text().split(" ");
        $("#move3").text(temp[0]);
        $("#move3").attr("class",btnArr[2]);
    });
    
    $("#cancel_move").click(function(){
        $("#alertcover").css({display:"none"});
    });
    
    $("button[id^=move]").click(function(){
        $("#alertcover").css({display:"none"});
        
        var move_to_type=$(this).attr("class");
        var file_name=$(this).parent().children("span:eq(1)").text();
        
        doMovePost(move_to_type,file_name);
    });
    
    $("div.name_manager").click(function(){
        var filename=$(this).text();
        
        var filestatus="";
        var status_div=$(this).siblings(".specifications_manager");
        if(status_div.hasClass("started")){
            filestatus="started";
        }else if(status_div.hasClass("no_money")){
            filestatus="no_money";
        }else if(status_div.hasClass("stoped")){
            filestatus="stoped";
        }else if(status_div.hasClass("ended")){
            filestatus="ended";
        }
        
        doPreview(filestatus,filename);
    });
    
    $("div.name_manager").mouseover(function(){
        $(this).css("background","rgba(51,153,255,0.3)");
    });
    
    $("div.name_manager").mouseout(function(){
        $(this).css("background-color","white");
    });
    
});