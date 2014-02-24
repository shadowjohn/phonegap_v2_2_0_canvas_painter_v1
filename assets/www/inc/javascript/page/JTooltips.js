jQuery.fn.extend({
  JTooltips: function(setting) {
        var ps =$.fn.extend({
            buttonText:false,
            buttonEvent:['Ok',function(e) { }],
            dropsheet:false,  
            initWidth:false,
            postion:[$(window).width()/2,$(window).height()/2],
            fixed: false,
            isCenter:false,
            showTime:null,
	        newClass:null,
            content: 'This is a jquery plugin powered by ariesjia!'
        }, setting);
       if($("#JTooltips #JTooltipsContent").length?$("#JTooltips #JTooltipsContent").html().replace(/<.*?>/g,'')==ps.content.replace(/<.*?>/g,''):false)
		return false;
	   if(($.browser.msie&&$.browser.version=='6.0'))  
	   	ps.fixed =false;
       if(ps.dropsheet)
       {
       ps.dropsheet = $.fn.extend({
           color:'black',
           opacityTO : 0.5
       }, ps.dropsheet);
       var $dropsheet = $('<div class="dropsheet"></div>'); 
       	   $dropsheet.css({"width":$(window).width(),
       	   				   'height':$(window).height(),
       	   				   'position':'absolute' , 
       	   				   'top':0,
       	   				   'left':0,
       	   				   'background':ps.dropsheet.color,
       	   				   opacity: 0,
       	   				   'display':'block',
       	   				   'zIndex':999
       	   				  }).prependTo("body").animate({opacity:ps.dropsheet.opacityTO});
       }
	   var $JTooltips = $("<div id='JTooltips' class='"+ps.newClass+"'><span class='rc-tp'><span></span></span><div id='JTooltipsTitle'></div><div id='JTooltipsContent'></div><div id='JTooltipsBottom'></div><span class='rc-bt'><span></span></span></div>");
	   if(typeof ps.content == 'string')
	   {
	   	$JTooltips.find("#JTooltipsContent").html(ps.content)
	   }
	   if (typeof ps.content == 'function') 
	   {
            var e = $JTooltips.find("#JTooltipsContent");
            e.holder =$JTooltips;
            ps.content(e)
       	   }
	   $JTooltips.prependTo("body").css({'width':ps.initWidth ? ps.initWidth : $JTooltips.find("#JTooltipsContent").width(),'position':(ps.fixed ? 'fixed' : 'absolute')})
	   					           .css({'left':ps.postion[0],'top':ps.postion[1]})
	   	     if(ps.isCenter)
	   	     $JTooltips.css({"margin-left":ps.initWidth?-ps.initWidth/2:-$JTooltips.find("#JTooltipsContent").width()/2,'margin-top':-$JTooltips.height()/2});
	          var scrollPos = $(window).scrollTop()+($(window).height()/2);
	          $JTooltips.css("position","absolute").css("top",scrollPos);
	   if(ps.buttonText)
	   {
	   	var $button = $('<input name="Button" type="button" value="按钮" />');
		$.each(ps.buttonText, function(i, n){
			$button.clone().prependTo("#JTooltipsBottom").attr("value",n).css('float','right');
			var numText = n;	
				$.each(ps.buttonEvent, function(i, n){
					if(n == numText)
						$("#JTooltips #JTooltipsBottom input[value="+numText+"]").bind("click",function(){ps.buttonEvent[i+1]();});	
				});
		});	  
	   }      
	   if(ps.showTime)
	   var times = setTimeout($.fn.JTooltipsRmove,ps.showTime);
  }, 
  JTooltipsRmove:function() {
     $("#JTooltips").remove();
     $(".dropsheet").remove();
  }
}); 