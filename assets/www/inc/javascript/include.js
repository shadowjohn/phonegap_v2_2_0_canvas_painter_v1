//複製URL地址
/*
 var userAgent = navigator.userAgent.toLowerCase();
 var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
 var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
 var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
 var is_safari = (userAgent.indexOf('webkit') != -1 || userAgent.indexOf('safari') != -1);
 */

//String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")};

function getWindowSize() {
	// 取得螢幕大小
	var myWidth = 0, myHeight = 0;
	if (typeof (window.innerWidth) == 'number') {
		// Non-IE
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	} else if (document.documentElement
			&& (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		// IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	} else if (document.body
			&& (document.body.clientWidth || document.body.clientHeight)) {
		// IE 4 compatible
		myWidth = document.body.clientWidth;
		myHeight = document.body.clientHeight;
	}
	var a = new Object();
	a['width'] = parseInt(myWidth);
	a['height'] = parseInt(myHeight);
	return a;
}

function replaceHtml(el, html) {
	var oldEl = typeof el === "string" ? document.getElementById(el) : el;
	/*@cc_on // Pure innerHTML is slightly faster in IE
		oldEl.innerHTML = html;
		return oldEl;
	@*/
	var newEl = oldEl.cloneNode(false);
	newEl.innerHTML = html;
	oldEl.parentNode.replaceChild(newEl, oldEl);
	/* Since we just removed the old element from the DOM, return a reference
	to the new element, which can be used to restore variable references. */
	return newEl;
}


jQuery.fn.outerHTML = function(s) {
	return (s) ? $(this).replaceWith(s) : $(this).clone().wrap('<p>').parent()
			.html();
}

//scroll page to id , 如 #id
function Animate2id(dom) {
	var animSpeed = 800; //animation speed
	var easeType = "easeInOutExpo"; //easing type
	if ($.browser.webkit) { //webkit browsers do not support animate-html
		$("body").stop().animate({
			scrollTop : $(dom).offset().top
		}, animSpeed, easeType, function() {
			$(dom).focus();
		});
	} else {
		$("html").stop().animate({
			scrollTop : $(dom).offset().top
		}, animSpeed, easeType, function() {
			$(dom).focus();
		});
	}
}

function windows_status() {
	// 取得視窗狀態
	$m = new Array();
	$m['scrollTop'] = $(window).scrollTop();
	$m['scrollLeft'] = $(window).scrollLeft();
	$m['clientWidth'] = $(document.body)[0].clientWidth;
	$m['clientHeight'] = $(document.body)[0].clientHeight;
	return $m;
}
function html_multiselect_set_value(domid, value_string) {
	var selected = explode(",", value_string);
	var obj = $('#' + domid);
	for ( var i in selected) {
		var val = selected[i];
		obj.find('option:[value=' + val + ']').attr('selected', 1);
	}
}
function dialogOn(message,functionAction)
{
	$.blockUI({
		message : "<table border='0' cellpadding='0' cellspacing='0'><tr><td><img src='images/busy.gif' align='left'></td><td align='left'>"+message+"</td></tr></table>",
		css : {
			backgroundColor : '#000',
			color : '#fff',
			padding:'15px'
		},		
		onBlock : function() {
			functionAction();
		}						
	});
}
function dialogOff()
{	
	setTimeout(function(){
		$.unblockUI();
	},1000);
}


function size_hum_read($size){
    /* Returns a human readable size */
	$size=parseInt($size);
    var $i=0;
    var $iec = new Array();
    var $iec_kind="B,KB,MB,GB,TB,PB,EB,ZB,YB";
    $iec=explode(',',$iec_kind);
    while (($size/1024)>1) {
      $size=$size/1024;
      $i++;
    }
    return sprintf("%s%s",substr($size,0,strpos($size,'.')+4),$iec[$i]);
}