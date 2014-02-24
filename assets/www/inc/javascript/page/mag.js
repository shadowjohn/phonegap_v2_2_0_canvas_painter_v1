//全局设置 变量
function Request(name)  //获取当前页面参数
 {
   new RegExp("(^|&)"+name+"=([^&]*)").exec(window.location.search.substr(1));
   return RegExp.$2
 }
var AnimateStyle;    // NULL为标准动画 如果为1为无动画版
var AnimateSpeed;    // NULL为默认运动速度 
var Volume;          // NULL为默认音量
var MagJson;         // 杂志信息
$(function(){


//禁止右键功能,单击右键将无反应
//document.oncontextmenu=new Function("event.returnValue=false;"); 
document.onselectstart  =  function(){return  false;}
//document.ondragstart  =  function(){return  false;}
document.oncontextmenu  =  function(){
var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
var is_safari = (userAgent.indexOf('webkit') != -1 || userAgent.indexOf('safari') != -1);
  if (is_ie!=false){
    // IE
    window.event.returnValue=false;
  }
  return  false;
}



MagJson = json; 
document.title=json.MagIfo.MagName;  //修改该页的title
var MagPage= json.MagPage;
var starPage;
   if(Request("page"))          //有Page参数分配当前页数
    {
	    var reqPage = Request("page");
	    if(isEven(reqPage ))
	    	starPage=reqPage-2;   //偶数Page定义出现在右边
	    else
	    	starPage=reqPage-1;   //奇数Page定义出现在左边
    }  
   else
    starPage=0;   //定义第当然页数默认为第一页
$(".MainBook").JMag({
    MagJson:MagJson,
    MagMain:$("#MagMain"),
    LeftPage:$("#LeftMag"),
    RightPage:$("#RightMag"),
    ViewPage:$("#ViewMag"),
    PageHeight:450,
    PageWidth:360,
    StarPageNum:starPage,
    DefaultPageSpeed:200,
    BeforeLoad:function(e){
	    $.fn.JTooltips({
	    isCenter:true,
	    content:'<p>載入中...</p>',
	    newClass:'perGirl',
	    initWidth:150,
	    showTime:1000
	    }); 
	},
    AfterLoad:function(e){
 		$.fn.JTooltipsRmove();
    },
    PageCount:json.MagIfo.PageCount,
    PageError:function(e){
	    $.fn.JTooltips({
	    isCenter:true,
	    content:'<p>'+e.errMessage+'</p>',
	    newClass:'perGirl',
	    initWidth:92,
	    showTime:1000
	    });
    }
});

 	  
	$("#Copy_bttn").click(function(){
		window.clipboardData.setData("text",$(".MainBook").data("MagTitle")+"\n"+window.location+"?page="+$(".MainBook").getPageNum())
		alert("已複製到您的剪貼簿!!");
	})
	
	$("#R_bttn").add("#RightMag").click(function(){
		 $(".MainBook").PageGo();
	})
	
	$("#L_bttn").add("#LeftMag").click(function(){	
		 $(".MainBook").PageBack();
	})

	$("#StopAuto_bttn").click(function(){
		 $(".MainBook").StopAuto();
	})

	$("#Music_bttn").click(function(){
		$this = $(this)
		if(!$("#player_container").is(":visible"))
		{
			$("#player_container").css({"zIndex":99,"left":$this.offset().left-430/2,"top":$this.offset().top-140}).show();
		}
		else
		{
			$("#player_container").hide();
		}
	})

	
	$("#Auto_bttn").click(function(){
		$.fn.JTooltips({
			buttonText:["確定","取消"],
			buttonEvent:['確定',function(e) { 
				$(".MainBook").AutoPlay(4000);
				$.fn.JTooltipsRmove();
			},"取消",function(e){
				$.fn.JTooltipsRmove();
			}],
			newClass:'perGirl',
			isCenter:true,
			initWidth:300,
			content:"確定開啟自動翻頁嗎？",
			postion:[parseInt($(".CenterBook").width())/2+$(".CenterBook").offset().left,parseInt($(".MagMain").height())/2+$(".MagMain").offset().top]            
		});
	})





	$("#LeftMag").bind("mousedown",function(e){
		if(e.which == "3")
		{	
			$(".MainBook").StopAuto();
			$(".MainBook").Zoom(0,2);
		}
	});
	$("#RightMag").bind("mousedown",function(e){
		if(e.which == "3")
		{
			$(".MainBook").StopAuto();
			$(".MainBook").Zoom(1,2);
		}
	});
	

		

	$("#ViewMag").bind("mousedown",function(e){
		if(e.which == "3")
			$(".MainBook").StopZoom();
	});
		var oY;
		var mY; 
	$(".viewContanier").draggable({axis:'y',containment:[0,-512,0,0]}); 
	
	$("#ViewMag").mousewheel(function(objEvent, intDelta){
		var bigpic =$("#ViewMag .viewContanier")
		if(parseInt(bigpic.css('top'),10)+intDelta*120/3 >-530)
		{
			if(parseInt(bigpic.css('top'),10)+intDelta*120/5 < 0)
			{
				if(parseInt(bigpic.css('top'),10)+intDelta*120/5 > -intDelta*120/5)
				{
					bigpic.css({'top':0})
				}
				else
				{
		  		bigpic.css({'top': parseInt(bigpic.css('top'),10)+intDelta*120/5});
		  		}
	  		}
	  		else
	  		{
	  			bigpic.css({'top':0})
	  		}
	    }
	    else
	    {
	    bigpic.css({'top':-530})
	    }
	});

});
function isEven(num)  //检查奇偶数 (偶数 True 奇数 False)
 {
  if(num%2==0)    
    return true;   
  else      
    return false; 
 }

 
 
 
 
 
 
 
 
 
 
 
 
 
 