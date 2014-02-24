	/*修正滑鼠事件 Start*/
	function touchHandler(event)
	{
		var touches = event.changedTouches,
		first = touches[0],
		type = "";	
		var touches_length=touches.length;
		if(touches_length>=3)
		{			
			return;			
		}
		switch(event.type) 
		{
			case "touchdown":
					window['mouseDistinct']=new Array();
				break;
		}
		if(touches_length==2)
		{
			switch(event.type) 
			{
				case "touchmove":
					array_push(window['mouseDistinct'],Math.sqrt(
							Math.pow(touches[1]["clientX"]-touches[0]["clientX"],2)+
							Math.pow(touches[1]["clientY"]-touches[0]["clientY"],2)
					));
					window['doubleFinger']=true;
					break;
			}
		}
		switch(event.type) 
		{
			case "touchend":
				
				if(window['doubleFinger']==true)
				{
					window.parent.debug("0:"+window['mouseDistinct'][0]);
					window.parent.debug("LAST:"+window['mouseDistinct'][window['mouseDistinct'].length-1]);
					if(window['mouseDistinct'][0]>=window['mouseDistinct'][window['mouseDistinct'].length-1])
					{
						if(window['mouseWaitTime']==false)
						{	
							window['mouseWaitTime']=true;
							window.parent.dialogOn("地圖縮小中...",function(){
								window.parent.tt.zoomOut();
								window.parent.$("iframe").eq(0).contents().find("*[name='ecw_img[]']").remove();
								window.parent.tt.clearMarker();
								window.parent.tt.clearDraw();									
								window.parent.show_me_place_icon();		
								window.parent.dialogOff();
							});
						}
						setTimeout(function(){
							window['mouseWaitTime']=false;
						},800);
					}
					else
					{
						if(window['mouseWaitTime']==false)
						{	
							window['mouseWaitTime']=true;
							window.parent.dialogOn("地圖放大中...",function(){
								window.parent.tt.zoomIn();								
								window.parent.$("iframe").eq(0).contents().find("*[name='ecw_img[]']").remove();
								window.parent.tt.clearMarker();
								window.parent.tt.clearDraw();									
								window.parent.show_me_place_icon();
								window.parent.dialogOff();
							});
						}							
						setTimeout(function(){
							window['mouseWaitTime']=false;
						},800);
					}
					window['mouseDistinct']=new Array();
					window['doubleFinger']=false;
				}
				
			break;
		}			
		

		if(touches_length>=2)
		{
			event.preventDefault();
			return;			
		}
			
	    switch(event.type)
		{
		    case "touchstart": type = "mousedown"; break;
		    case "touchmove":  type="mousemove"; break;        
		    case "touchend":   type="mouseup"; break;
		    default: return;
		}
		var simulatedEvent = document.createEvent("MouseEvent");
		simulatedEvent.initMouseEvent(type, true, true, window, 1,
		                          first.screenX, first.screenY,
		                          first.clientX, first.clientY, false,
		                          false, false, false, 0/*left*/, null);
	
		first.target.dispatchEvent(simulatedEvent);
		event.preventDefault();
	}
	function mouse_init()
	{
	   window['doubleFinger']=false;
	   window['mouseWaitTime']=false;
	   window['mouseDistinct']=new Array();		
	   document.addEventListener("touchstart", touchHandler, true);
	   document.addEventListener("touchmove", touchHandler, true);
	   document.addEventListener("touchend", touchHandler, true);
	   document.addEventListener("touchcancel", touchHandler, true);    
	}	
	/*修正滑鼠事件 End*/
	function is_touch_x_y_over_doms(x,y)
	{
		//當有該css_name，收集這些dom的 「x,y,x+width,y+height」 ,作為不能touch的區域
		//css name 暫定應該為 cantTouch
		//return 陣列，內容為「陣列，lx,ly,rx,ry」
		//此數值要讓 java 的 onTouch 去避開
		//回傳 true or false
		var m=new Array();
		$(".cantTouch").each(function(){			
			var offset = $(this).offset();			
			array_push(m,							
			              	{
								'lx':offset.left,
				              	'ly':offset.top,
				              	'rx':($(this).width()+offset.left),
				              	'ry':($(this).height()+offset.top),
				              	'dom_id':$(this).attr('id')
			              	}			              	
					);			
		});
		var check=false;
		for(var i=0,max=m.length;i<max;i++)
		{
				if(x>=m[i]['lx'] && x<=m[i]['rx'] && y>=m[i]['ly']&&y<=m[i]['ry'])
				{
					check=true;
					break;
				}
		}
		return check;
	}	