package tw.gis.phonegapExample;

import org.apache.cordova.CordovaWebViewClient;
import org.apache.cordova.DroidGap;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class Phonegap_page_v2_2_0Activity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
		super.init();
		super.appView.clearCache(true);
		WebSettings settings = this.appView.getSettings();
		settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
		super.setIntegerProperty("loadUrlTimeoutValue", 60000);
		// setContentView(R.layout.main);
		 super.appView.getSettings().setJavaScriptEnabled(true);
		// getScreenSize(); //取得螢幕大小 暫時好像用不到

		super.appView.setScrollBarStyle(0);
		super.appView.addJavascriptInterface(this, "ez");
		super.appView.setPadding(0, 0, 0, 0);
		super.appView.setInitialScale(100);
		settings.setSupportZoom(false);
		settings.setBuiltInZoomControls(false);
		//2.0.0 好像要寫這行，才看的到debug log
		settings.setNavDump(true);		
				
		super.appView.setDrawingCacheEnabled(false);
		super.appView.setAlwaysDrawnWithCacheEnabled(false);
		// super.appView.setLongClickable(true);
		super.appView.setClipChildren(false);
		super.appView.setScrollContainer(false);

		super.setStringProperty("loadingDialog", "程式開始中...請稍後...");
		
		super.loadUrl("file:///android_asset/www/index.html");
	    // Overide selected methods in  webview client used by phone gap to prevent
	    // iframe replacements from taking over entire web page.
		//見鬼，可以修正android 4.x 版的 iframe fullscreen issue
	    super.appView.setWebViewClient(new CordovaWebViewClient(this, super.appView) {
	        @Override
	        public boolean shouldOverrideUrlLoading(WebView view, String url) {
	            return false;
	        }
	    });  
    }
}