//====================================================================================================
// [插件名称] jQuery Jmagazine
//----------------------------------------------------------------------------------------------------
// [描    述] jQuery Jmagazine电子杂志插件，它是基于jQuery类库，实现了js脚本于页面的分离。
//           你只能写一行代码就可以快速生成一本基于图片的电子杂志，同时对每一页能够单独的添加html代码
//----------------------------------------------------------------------------------------------------
// [作者网名] AriesJia	
// [邮    箱] ariesjia00@hotmail.com
// [作者博客] http://ariesjia.cnblogs.com/
// [更新日期] 2009-11-24
// [版 本 号] 0.2.0beta
//====================================================================================================
(function($) {
	$.JMag = 0;
	var methods = {
		  JMag:function(setting) {
	        var ps =$.fn.extend({
	        	MagMod:'narmal',         //默认为正常模式，另外还有演示测试模式,演示模式4张图片不停轮换
				MagJson:false,           //Jmag杂志配置文件
				LeftPage:false,          //左页杂志
				RightPage:false,         //右页杂志
				ViewPage:false,            //详细查看页面
				Recommended:false,       //杂志推荐信息
				StarPageNum:0,           //初始页数
				PageCount:false,         //总页数
				PageWidth:"100%",
				PageHeight:"100%",
				ZoomNum:2,
				DefaultPageSpeed:800,       //默认翻书运动速度(单位：毫秒)
				BeforeLoad:function(e){},   //加载前动作
				AfterLoad:function(e){},  	//加载后动作
				PageEvent:false,		    //自定义翻页动画
				PageFirst:false,			//翻到第一页的动作
				PageLast:false,			    //翻到最后一页的动作
				PageError:function(e){}     //翻页错误统一函数
	        }, setting);
	       var ErrorMessage ={
	       		PageFast:"翻頁速度太快...",
	       		PageFirst:"已在首頁",
	       		PageLast:"已在頁尾",
	       		PageMoving:"正在翻頁中...",
	       		AutoTimesNull:"未自動播放",
	       		ViewPageVisible:"請先右鍵關閉放大再翻頁"
	        };
	       var DefaultPageEasing = ["easeInSine","easeOutSine"];
			var $self = $(this);
			if(!ps.PageCount)
			ps.PageCount = ps.MagJson.MagPage.length|ps.MagJson.MagIfo.PageCount;
			$self.data("Jmag config",MagJson).data("MagTitle",MagJson.MagIfo.MagName).data("PageNum",ps.StarPageNum).data("PageCount",MagJson.MagIfo.PageCount);
			var MagPage= MagJson.MagPage;
			var $img = $(' <img  />');
			$self.data("ViewPageHtml",ps.ViewPage.find(".viewContanier").html());
			var $bookimg = $("<div class='contain'><div style='width:100%;height:100%;position:absolute;top:0px;left:0px;'></div><img /></div>")
			if(ps.Recommended)
			   $.each(MagPage, function(i){
					if(MagPage[i].Title != "" && MagPage[i].Title != undefined && MagPage[i].Title != null)   //加载推荐栏目
						ps.Recommended.html(ps.Recommended.html()+"<a href='#' class='RecA' page='i' onclick='TurnPage("+i+")'>"+MagPage[i].Title+"</a>");
				});
			var AutoTimes;
			var events ={
				SetDefaultPageSpeed:function(e,n)
				{
					ps.DefaultPageSpeed = n;
				},
				ChangeSetting:function(e,setting)
				{
					ps = $.fn.extend(ps,setting);
				},
				ChangeDefaultPageEasing:function(e,n)  //变换默认翻书动画
				{
					switch(n){
						case 0:DefaultPageEasing = ['swing','swing'];break;
						case 1:DefaultPageEasing = ['easeInQuad','easeOutQuad'];break;
						case 2:DefaultPageEasing = ['easeInCubic','easeOutCubic'];break;
						case 3:DefaultPageEasing = ['easeInQuart','easeOutQuart'];break;
						case 4:DefaultPageEasing = ['easeInQuint','easeOutQuint'];break;
						case 5:DefaultPageEasing = ['easeInSine','easeOutSine'];break;
						case 6:DefaultPageEasing = ['easeInExpo','easeOutExpo'];break;
						case 7:DefaultPageEasing = ['easeInCirc','easeOutCirc'];break;
						case 8:DefaultPageEasing = ['easeInElastic','easeOutElastic'];break;
						case 9:DefaultPageEasing = ['easeInBack','easeOutBack'];break;
						case 10:DefaultPageEasing = ['easeInBounce','easeOutBounce'];break;
						default:DefaultPageEasing = ['swing','swing'];break;
					}
				},
				StarJmag:function(e){
					var inf = new Object();
					inf.inf = "star";
					this.preload(inf,[MagPage[$self.data("PageNum")],MagPage[$self.data("PageNum")+1]]);
				},
			    CheakIsOk:function(){     //检测函数,是否可行运动
					this.ComClickTime = new Date();
					if(ps.ViewPage.is("div:visible"))
					{
				    	this.errMessage = ErrorMessage.ViewPageVisible;
				    	ps.PageError(this);
				    	return false;
					}
				    if(ps.LeftPage.find(".contain").is(":animated") || ps.RightPage.find(".contain").is(":animated") || (this.clickDate && this.ComClickTime-this.clickDate<500) )
				    {
				    	this.errMessage = ErrorMessage.PageFast;
				    	ps.PageError(this);
				    	return false;
				    } 
					if($self.data('style') == "PageBack" && $self.data("PageNum") <= 1)
					{	
						this.errMessage = ErrorMessage.PageFirst;
						ps.PageFirst?ps.PageFirst(this):ps.PageError(this);
						events.StopAuto(AutoTimes);
						return false;
					}
					if($self.data('style') == "PageGo" && $self.data("PageNum")>=ps.PageCount-2)
					{
						this.errMessage = ErrorMessage.PageLast;
						ps.PageLast?ps.PageLast(this):ps.PageError(this);
						events.StopAuto(AutoTimes);
						return false;
					}
					this.clickDate = new Date();
					return true;
			    },
				PageGo:function(){
					if(events.CheakIsOk())
					{
						if($self.data('style') == "PageGo"){
						$self.trigger("JMag.preload",[[MagPage[$self.data("PageNum")+2],MagPage[$self.data("PageNum")+3]]]);
						$self.data("PageNum",$self.data("PageNum")+2);
						}
						else if($self.data('style') == "PageBack"){
						$self.trigger("JMag.preload",[[MagPage[$self.data("PageNum")-2],MagPage[$self.data("PageNum")-1]]]);
						$self.data("PageNum",$self.data("PageNum")-2);
						}
					}
				},
				ifmusic:function(){
					
				
				},
				preload:function(e,ImageArr){
					var imgAr = new   Array();
					ps.BeforeLoad();
					for(i=0;i<ImageArr.length;i++) //预读图片 
		    		{ 
		    			(function(n){
		    				imgAr[n] = new Image();
	            			imgAr[n].src = ImageArr[n].Page;
	            			if (imgAr[n].complete) // 如果图片已经存在于浏览器缓存，直接调用回调函数
							{
								if(e.inf !="star" && ($self.data('style') == "PageGo"||$self.data('style') == undefined))
									events.ComLeftPage(n,imgAr[n],ImageArr[n]);
								else if(e.inf !="star" && $self.data('style') == "PageBack")
									events.ComRightPage(n,imgAr[n],ImageArr[n]);
								else if(e.inf =="star")
									events.ComFirstPage(n,imgAr[n],ImageArr[n]);
								return;
							}
							$(imgAr[n]).load(function(){
								if(e.inf !="star" && ($self.data('style') == "PageGo"||$self.data('style') == undefined))
									events.ComLeftPage(n,imgAr[n],ImageArr[n]);
								else if(e.inf !="star" && $self.data('style') == "PageBack")
									events.ComRightPage(n,imgAr[n],ImageArr[n]);
								else if(e.inf =="star")
								{
									events.ComFirstPage(n,imgAr[n],ImageArr[n]);
								}
							});
		    			})(i); 
		    		}
				},
				ComFirstPage:function(n,imgObj,PageCon,x){
					if(n==0&&imgObj)
					{
				     var newIMG = $bookimg.clone().find("img").attr("src",imgObj.src).end().css({"width":ps.PageWidth});
				     newIMG.appendTo(ps.LeftPage);
				     ps.LeftPage.find("div.contain").eq(0).prepend(PageCon.PageHtml).find("*").not("img").css({"position":"absolute"});
				    }
				    else if(n==1&&imgObj)
				    {
				     var newIMG = $bookimg.clone().find("img").attr("src",imgObj.src).end().css({"width":ps.PageWidth});
				     newIMG.appendTo(ps.RightPage);
				     ps.RightPage.find(".contain").eq(0).prepend(PageCon.PageHtml).find("div").eq(0).find("*").not("img").css({"position":"absolute"});
				     ps.AfterLoad();
				    }
				},
				ComLeftPage:function(n,imgObj,PageCon,x){
					if(n==0&&imgObj)
					{
				     var newIMG = $bookimg.clone().find("img").attr("src",imgObj.src).end().css({"width":0});
				     ps.LeftPage.find(".contain").after(newIMG);
				     ps.LeftPage.find(".contain").eq(1).prepend(PageCon.PageHtml).find("*").not("img").css({"position":"absolute"});
				    }
				    else if(n==1&&imgObj)
				    {
				     var newIMG = $bookimg.clone().find("img").attr("src",imgObj.src).end().css({"width":ps.PageWidth});
				     ps.RightPage.find(".contain").before(newIMG);
				     ps.RightPage.find(".contain").eq(0).prepend(PageCon.PageHtml).find("*").not("img").css({"position":"absolute"});
				     ps.AfterLoad();
				     if(!ps.PageEvent)
				    	 events.Page();
				     else
				    	 ps.PageEvent();
				    }
				},
				ComRightPage:function(n,imgObj,PageCon){
					if(n==0&&imgObj)
					{
				     var newIMG = $bookimg.clone().find("img").attr("src",imgObj.src).end().css({"width":ps.PageWidth});
				     ps.LeftPage.find(".contain").before(newIMG)
				     ps.LeftPage.find(".contain").eq(0).prepend(PageCon.PageHtml).find("*").not("img").css({"position":"absolute"});
				    }
				    else if(n==1&&imgObj)
				    {
				     var newIMG = $bookimg.clone().find("img").attr("src",imgObj.src).end().css({"width":0});
				     ps.RightPage.find(".contain").after(newIMG);
				     ps.RightPage.find(".contain").eq(1).prepend(PageCon.PageHtml).find("*").not("img").css({"position":"absolute"});
				     ps.AfterLoad();
				     if(!ps.PageEvent)
				    	 events.Page();
				     else
				     	ps.PageEvent();
				    }
				},
				Page:function(){
					var obj1 = $self.data('style')=="PageGo"?ps.RightPage:ps.LeftPage ;
					var obj2 = obj1 == ps.LeftPage ? ps.RightPage : ps.LeftPage;
						  //obj1.find("div").eq(1).find("*").not("img").css({"visibility":"hidden"});
					obj1.find(".contain").eq(1).animate({width:8},ps.DefaultPageSpeed,DefaultPageEasing[0],function(){$(this).remove();obj2.find(".contain").eq(1).animate({width:ps.PageWidth},ps.DefaultPageSpeed,DefaultPageEasing [1],function(){$(this).prev().remove();});});   
				},
				Zoom:function(e,n,b){   //n即将放大的书页的偏移量
					if(ps.LeftPage.find("img").is(":animated") || ps.RightPage.find("img").is(":animated") )
					{
						this.errMessage = ErrorMessage.PageMoving;
						ps.PageError(this);
						return false;
					}
					ps.ViewPage.find(".viewBigIMG").css({"top":0});
					ps.ViewPage.show(); 
					ps.ViewPage.find(".viewContanier").prepend(MagPage[$self.data("PageNum")+n].PageHtml).find("*").not("img.viewBigIMG").each(function(){
						events.BigImgHtml(null,$(this));
					})
					if(ps.ViewPage.find("img").length)
						ps.ViewPage.find("img").attr("src",MagPage[$self.data("PageNum")+n].Page)
					else
						ps.ViewPage.html($img.clone().attr("src",MagPage[$self.data("PageNum")+n].Page).css({'height':ps.PageHeight*b,'width':ps.PageWidth*b}))
				},
				AutoPlay:function(e,f){
					if(AutoTimes!=null)
						return false;
					if($self.data('style') == undefined)
						$self.data("style","PageGo");
					AutoTimes = setInterval(function(){
						$self.trigger("JMag.PageGo");
					},f)
				},
				StopAuto:function(e,f)
				{
					if(AutoTimes!=null)
					{
						clearInterval(AutoTimes);
						AutoTimes=null;
					}
					else{
					}
				},
				BigImgHtml:function(e,f)
				{	
					f.css({'position':'absolute'});
					if(f.css("width")!= 'auto')
					f.css({'width':parseInt(f.css('width'))*ps.ZoomNum});
					else
					f.width(f.width()*ps.ZoomNum);
					if(f.css("height")!= 'auto')
					f.css({'height':parseInt(f.css('height'))*ps.ZoomNum});
					else
					f.height(f.height()*ps.ZoomNum);
					f.css({'fontSize':parseInt(f.css('fontSize'))*ps.ZoomNum+"px"});
					if(f.css("top")!= 'auto')
					f.css({'top':parseInt(f.css('top'))*ps.ZoomNum});
					if(f.css("left")!= 'auto')
					f.css({'left':parseInt(f.css('left'))*ps.ZoomNum});
					if(f.css("right")!= 'auto')
					f.css({'right':parseInt(f.css('right'))*ps.ZoomNum});
					if(f.css("bottom")!= 'auto')
					f.css({'bottom':parseInt(f.css('bottom'))*ps.ZoomNum});
				},
				StopZoom:function(e){
					ps.ViewPage.find(".viewContanier").html($self.data("ViewPageHtml"));
					ps.ViewPage.hide();
					return;
				}
			}
			events.StarJmag();
			for(var event in events) {
				var e = "JMag." + event;
				$(this).unbind(e);
				$(this).bind(e, events[event]);
			}
		},
	StopAuto:function(f){
		$(this).trigger("JMag.StopAuto", f);
	},
	Zoom:function(f,b){
		b= b == undefined?2:b;
		$(this).trigger("JMag.Zoom",[f,b]);
	},
	AutoPlay:function(f){
		$(this).trigger("JMag.AutoPlay", f);
	},
	PageGo:function(f){
		if(f)
			this.jumpTo(f);
		else
		{
			$(this).data("style","PageGo");
			$(this).trigger("JMag.PageGo");
		}
	},
	PageBack:function(f){
		if(f)
			this.JumpTo(f)
		else
		{
			$(this).data("style","PageBack");
			$(this).trigger("JMag.PageGo");
		}
	},
	getPageNum:function(){
		return $(this).data("PageNum");
	},
	getTotalNum:function(){
		return $(this).data("PageCount");
	},
	getMagConfig:function(){
		return $(this).data("Jmag config");
	},
	jumpTo:function(n){
		if(n%2!=0)
			n=n-1;
		if(n==$(this).getPageNum())
			return false;
		$(this).data('style','PageGo');
		if($(this).getPageNum()>n)
			$(this).data('style','PageBack');
		$(this).trigger("JMag.preload",[[$(this).data('Jmag config').MagPage[n],$(this).data('Jmag config').MagPage[n+1]]]);
		$(this).data("PageNum",n);
	},
	StopZoom:function()
	{
		$(this).trigger("JMag.StopZoom");
	},
	ChangeSpeed:function(n)
	{
		$(this).trigger("JMag.SetDefaultPageSpeed",n);
	},
	ChangeDefaulf:function(setting){
		$(this).trigger("JMag.ChangeSetting",setting);
	}
	};
	$.each(methods, function(i) {
		$.fn[i] = this;
	});
})(jQuery);
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});
