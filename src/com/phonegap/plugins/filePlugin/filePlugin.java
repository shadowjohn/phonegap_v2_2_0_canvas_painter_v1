package com.phonegap.plugins.filePlugin;


//import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
//import java.io.FileInputStream;


import org.json.*;


//import android.graphics.Bitmap;
//import android.graphics.BitmapFactory;
//import android.annotation.SuppressLint;
//import android.annotation.SuppressLint;
//import android.util.Base64;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;

import tw.gis.john.utils.utils;


public class filePlugin extends Plugin {
	//@SuppressLint("NewApi")
	public PluginResult execute(String action, JSONArray args,
			String callinglbackId) {
		// PluginResult
		try {
			if (action.equals("file_get_contents")) {
				//讀出檔案內容
				//args[0]=檔名
				return new PluginResult(PluginResult.Status.OK,  utils.file_get_contents(args.getString(0)));
			}
			else if (action.equals("file_to_base64")){
				/*String filename=args.getString(0).trim();
				Bitmap bm = BitmapFactory.decodeFile(filename);
				ByteArrayOutputStream baos = new ByteArrayOutputStream();  
				bm.compress(Bitmap.CompressFormat.JPEG, 60, baos); //bm is the bitmap object   
				byte[] b = baos.toByteArray(); 
				//原本 Base64.DEFAULT
				//改成不要斷行的應該較好
				String encodedImage = Base64.encodeToString(b, Base64.NO_WRAP);*/
			    //FileInputStream in = new FileInputStream(args.getString(0).trim());
			    //File file = new File(args.getString(0));
	            //byte[] buffer = new byte[(int) file.length()];
				//Bitmap bitmapOrg = BitmapFactory.decodeFile(args.getString(0));
				//ByteArrayOutputStream bao = new ByteArrayOutputStream();
				//bitmapOrg.compress(Bitmap.CompressFormat.PNG, 80, bao);
				//byte [] buffer = bao.toByteArray();
	            //int length = in.read(buffer);    
	            //String data = Base64.encodeToString(buffer, 0, length, Base64.NO_WRAP);
	            //String data = Base64.encodeToString(buffer, 0, length,Base64.NO_WRAP);
				//byte[] buffer = utils.image2byte(args.getString(0));
	            //String data = utils.base64_encode(buffer);	           
	            //buffer=null;
	            //in.close();
				return new PluginResult(PluginResult.Status.OK, utils.base64_encode(utils.image2byte(args.getString(0))));
			}
			else if(action.equals("get_file_from_asset_to_base64"))
			{
				//目錄會從 www 開始
				String filename=args.getString(0).trim();
				InputStream stream = cordova.getActivity().getAssets().open("www/"+filename);
		        int size = stream.available();
		        byte[] buffer = new byte[size];
		        stream.read(buffer);
		        stream.close();
		        //tContents = new String(buffer);
		        return new PluginResult(PluginResult.Status.OK, utils.base64_encode(buffer));
			}
			else if (action.equals("file_move"))
			{
				utils.fileMove(args.getString(0).trim(), args.getString(1).trim());
				return new PluginResult(PluginResult.Status.OK, "");				
			}
			else if (action.equals("file_copy"))
			{
				utils.fileCopy(args.getString(0).trim(), args.getString(1).trim());
				return new PluginResult(PluginResult.Status.OK, "");				
			}			
			else if (action.equals("file_put_contents")) {
				//將資料寫入檔案
				// args[0]=檔名
				// args[1]=datas...
				utils.file_put_contents(args.getString(0).trim(), args.getString(1).trim());
				return new PluginResult(PluginResult.Status.OK, "");

			}else if (action.equals("file_put_contents_from_base64")) {
				//將資料寫入檔案
				// args[0]=檔名
				// args[1]=datas...
				utils.file_put_contents(args.getString(0).trim(), utils.base64_decode(args.getString(1)));
				return new PluginResult(PluginResult.Status.OK, "");

			}else if(action.equals("file_exists")){
				//檢查檔案是否存在
				File f = new File(args.getString(0).trim());
				if(f.exists()){					
					return new PluginResult(PluginResult.Status.OK,
							"true");
				}else
				{
					return new PluginResult(PluginResult.Status.OK,
							"false");
				}					
			} else if(action.equals("unlink")){
				//檔案移除
				File f = new File(args.getString(0).trim());
				f.delete();				
				return new PluginResult(PluginResult.Status.OK, "");
			}else if(action.equals("mkdir")){
				//建立目錄
				boolean status;
				status = new File(args.getString(0).trim()).mkdirs();
				if(status)
				{
					return new PluginResult(PluginResult.Status.OK, "true");
				}
				else
				{
					return new PluginResult(PluginResult.Status.OK, "false");
				}
			} else {
				return new PluginResult(PluginResult.Status.INVALID_ACTION,
						"File Open False...: unknow file action.");
			}
		} catch (Exception e) {
			return new PluginResult(PluginResult.Status.INVALID_ACTION,
					"File Open False...:" + e.getMessage());
		}
	}

	public boolean isSynch(String action) {
		return true; // always do async...
	}


}