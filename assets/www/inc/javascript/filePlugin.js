/*function filePlugin() {	
}*/

function file_get_contents(filename){
	//取得檔案內容
	var data="";
	cordova.exec(function(win) {
		data=win;
	}, function(err) {
	}, "filePlugin", "file_get_contents", [ filename ]);	
	return data;
}
function file_get_contents_async(filename,win_func,fail_func){
	//取得檔案內容	
	cordova.exec(function(win) {
		win_func(win);		
	}, function(err) {
		fail_func(err);
	}, "filePlugin", "file_get_contents", [ filename ]);	
}
function file_to_base64(filename)
{
	//輸入檔案路徑，取回base64字串
	var data="";
	cordova.exec(function(win) {
		data=win;
	}, function(err) {
	}, "filePlugin", "file_to_base64", [ filename ]);
	return data;
}
function file_put_contents(filename,data){
	//Todo：寫入失敗也有所回應～
	cordova.exec(function(win) {		
	}, function(err) {
	}, "filePlugin", "file_put_contents", [ filename,data ]);		
}
function file_put_contents_from_base64(filename,data){
	//Todo：寫入失敗也有所回應～
	cordova.exec(function(win) {		
	}, function(err) {
	}, "filePlugin", "file_put_contents_from_base64", [ filename,data ]);		
}
function file_copy(src_filename,dest_filename)
{
	cordova.exec(function(win) {
	}, function(err) {
	}, "filePlugin", "file_copy", [ src_filename,dest_filename ]);	
}
function file_move(src_filename,dest_filename)
{
	cordova.exec(function(win) {
	}, function(err) {
	}, "filePlugin", "file_move", [ src_filename,dest_filename ]);	
}
function file_exists(filename){
	//檢查檔案是否存在
	//回傳 true or false
	var data="";
	cordova.exec(function(win) {
		data=win;
	}, function(err) {
	}, "filePlugin", "file_exists", [ filename ]);	
	return (data=="true")?true:false;
}
function mkdir(dirpath){
	//建立目錄
	//移除檔案
	var data="";
	cordova.exec(function(win) {
		data=win;
	}, function(err) {
	}, "filePlugin", "mkdir", [ dirpath ]);		
	return (data=="true")?true:false;
}
function unlink(filename){
	//移除檔案	
	cordova.exec(function(win) {		
	}, function(err) {

	}, "filePlugin", "unlink", [ filename ]);		
}



function get_file_from_asset_to_base64_data(filename)
{
	//輸入asset檔案路徑，取回base64字串	
	var data='';
	cordova.exec(function(win) {		
		data="data:image/jpeg;base64,"+win;		
	}, function(err) {
	}, "filePlugin", "get_file_from_asset_to_base64", [ filename ]);
	return data;
}
function get_file_from_asset_to_base64(dom,filename)
{
	//輸入asset檔案路徑，直接設定dom元件	
	cordova.exec(function(win) {				
		$(dom).attr('src',"data:image/jpeg;base64,"+win);
	}, function(err) {
	}, "filePlugin", "get_file_from_asset_to_base64", [ filename ]);
}
