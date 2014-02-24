package tw.gis.john.utils;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

public class utils {	
	public static String implode(String delim, String[] ary) {
		// 陣列轉成字串，delim 是組成間隔之符號
		StringBuilder out = new StringBuilder("");
		for (int i = 0, max = ary.length; i < max; i++) {
			if (i != 0) {
				out.append(delim);
			}
			out.append(ary[i]);
		}
		return out.toString();
	}

	public static void logs(String input) {
		System.out.println("GIS WATER DEBUG: " + input);
	}
	public static byte[] image2byte(String path) throws IOException{
		Bitmap bitmapOrg = BitmapFactory.decodeFile(path);
		ByteArrayOutputStream bao = new ByteArrayOutputStream();
		bitmapOrg.compress(Bitmap.CompressFormat.PNG, 80, bao);
		byte [] buffer = bao.toByteArray();
		bitmapOrg.recycle();
        return buffer;
	}
	public static String addSlashes(String s) {
		// java將資料要放到 javascript 時常會因為跳脫符號造成塞不下或斷行，可以用這個解決
		s = s.replaceAll("\\\\", "\\\\\\\\");
		s = s.replaceAll("\\n", "\\\\n");
		s = s.replaceAll("\\r", "\\\\r");
		s = s.replaceAll("\\00", "\\\\0");
		s = s.replaceAll("'", "\\\\'");
		return s;
	}

	public static String mainname(String filename) {
		File theFile = new File(filename);
		return theFile.getName().replace("." + subname(filename), "");
	}

	public static String subname(String filename) {
		int dot = filename.lastIndexOf('.');
		return filename.substring(dot + 1);
	}

	public static String str_replace(String search, String replace,
			String subject) {
		StringBuffer result = new StringBuffer(subject);
		int pos = 0;
		while (true) {
			pos = result.indexOf(search, pos);
			if (pos != -1)
				result.replace(pos, pos + search.length(), replace);
			else
				break;
		}
		return result.toString();
	}
	public static void file_put_contents(String filename, byte[] data)
			throws IOException {
        FileOutputStream stream = new FileOutputStream(filename); 
        stream.write(data);
        stream.close();
	}

	public static void file_put_contents(String filename, String data)
			throws IOException {
		BufferedWriter out = new BufferedWriter(new FileWriter(filename));
		try {
			out.write(data);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		out.close();
	}

	/**
	 * @param filePath
	 *            the name of the file to open. Not sure if it can accept URLs
	 *            or just filenames. Path handling could be better, and buffer
	 *            sizes are hardcoded
	 */
	public static String readFileAsString(String filePath)
			throws java.io.IOException {
		/*
		 * FileReader fr = new FileReader(file); BufferedReader br = new
		 * BufferedReader(fr); StringBuilder tmp=new StringBuilder(""); String
		 * s;
		 * 
		 * while((s = br.readLine()) != null) { tmp.append(s); } br.close();
		 * fr.close();
		 */
		StringBuffer fileData = new StringBuffer("");
		BufferedReader reader = new BufferedReader(new FileReader(filePath));
		char[] buf = new char[8192];
		int numRead = 0;
		while ((numRead = reader.read(buf)) != -1) {
			// String readData = String.valueOf(buf, 0, numRead);
			fileData.append(String.valueOf(buf, 0, numRead));
			buf = new char[8192];
		}
		reader.close();
		return fileData.toString();
	}

	public static String file_get_contents_old(String filename) throws IOException {
		File file = new File(filename);
		if (!file.exists()) {
			return "";
		} else {
			BufferedReader reader = new BufferedReader(new FileReader(filename));
			StringBuffer buffer = new StringBuffer("");
			String line = null;

			// For every line in the file, append it to the string builder
			while ((line = reader.readLine()) != null) {
				buffer.append(line);
			}
			// String output=buffer.toString();
			// buffer.delete(0, buffer.length());
			// line=null;
			reader.close();
			return buffer.toString();
		}
	}
	public static String convertStreamToString(InputStream is) throws Exception {
	    BufferedReader reader = new BufferedReader(new InputStreamReader(is));
	    StringBuilder sb = new StringBuilder();
	    String line = null;
	    while ((line = reader.readLine()) != null) {
	      sb.append(line).append("\n");
	    }
	    return sb.toString();
	}
	public static String file_get_contents(String filename) throws Exception {
		File fl = new File(filename);
		
	    FileInputStream fin = new FileInputStream(fl);
	    String ret = utils.convertStreamToString(fin);
	    //utils.logs("filename output:"+ret);
	    //Make sure you close all streams.
	    fin.close();        
	    return ret;
	}	
	public static String base64_encode(byte[] data)
	{
		return Base64.encodeToString(data,Base64.NO_WRAP);
	}
	public static byte[] base64_decode(String data)
	{
		return Base64.decode(data,Base64.DEFAULT);
	}
	public static boolean twoRectCross(double x1_left, double y1_top,
			double x1_right, double y1_bottom, double x2_left, double y2_top,
			double x2_right, double y2_bottom) {
		double tmp_left = max(x1_left, x2_left);
		double tmp_top = max(y1_top, y2_top);
		double tmp_right = min(x1_right, x2_right);
		double tmp_bottom = min(y1_bottom, y2_bottom);
		return (tmp_right >= tmp_left && tmp_bottom >= tmp_top);
	}

	public static double min(double a, double b) {
		if (a < b)
			return a;
		else
			return b;
	}

	public static double max(double a, double b) {
		if (a > b)
			return a;
		else
			return b;
	}

	public static void fileCopy(String srFile, String dtFile) throws IOException {
		  File f1 = new File(srFile);
		  File f2 = new File(dtFile);
		  InputStream in = new FileInputStream(f1);
		  
		  //For Append the file.
		//  OutputStream out = new FileOutputStream(f2,true);

		  //For Overwrite the file.
		  OutputStream out = new FileOutputStream(f2);

		  byte[] buf = new byte[1024];
		  int len;
		  while ((len = in.read(buf)) > 0){
			  out.write(buf, 0, len);
		  }
		  in.close();
		  out.close();
		  System.out.println("File copied.");
		  utils.logs("file copy :"+srFile+","+dtFile);
	}

	public static boolean fileMove(String srcFile, String destPath) {
		// File (or directory) to be moved
		File file = new File(srcFile);

		// Destination directory
		File dir = new File(destPath);

		// Move file to new directory
		boolean success = file.renameTo(new File(dir, file.getName()));
		utils.logs("file move :"+srcFile+","+destPath);
		return success;
	}
}
