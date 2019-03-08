package createhtml;

import builder.Builder;
import logvis.JavaFiles.JavaFile;

public class Director {

	private Builder builder;
	private static final String OUTPUTDIR="sample/output/";
	private static final String META="<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />";

	//TODO JSとCSSのパス指定,自動でresourcesから取ってくる設定
	private static final String[] JSs= {"../../resources/test.js","../../resources/prettify.js",};
	private static final String[] CSSs = {"../../resources/prettify.css","../../resources/custom.css"};


	// 実際はBuilderのサブクラスを引数に取る
	public Director(Builder builder) {
		this.builder = builder;
	}

	// 文章の中身を作る
	public void construct(JavaFile file) {
		constructHead(file);
		builder.makeBody(file.getFilename()+".java");
		//builder.makeHeading("今日の目標");

		constructCode(file);
		constructDebugView();
		constructOther();


	}


	private void constructOther() {
		// TODO 自動生成されたメソッド・スタブ
		builder.makeScript("<div>");
		//builder.makeHeading("使うもの");
		testadd();
		builder.makeScript("</div>");
		builder.makeScript("<script>prettyPrint();</script>");
		// TODO 出力先の指定
		builder.close(OUTPUTDIR);
	}

	private void constructHead(JavaFile file) {
		builder.makeHead(META);
		builder.makeTitle(file.getFilename()+".java");
		for(String js: JSs) {
			builder.makeJavaScript(js);
		}
		for(String CSS: CSSs) {
			builder.makeStyle(CSS);
		}
	}

	private void constructCode(JavaFile file) {
		int index=0;
		String result="";
		for(String line: file.getLines()) {
			if(index++==0) {
				builder.preMakeCode(line);
			}else {
				String line2="<ul class=\"menu\">" +
						"<li>System.out.println(</li>"+
						"    <li class=\"menu__single\">" +
						"        <a href=\"#\" >var1</a>" +
						"        <ul class=\"menu__second-level\">" +
						 getli(21)+
						 getli(23)+
						 getli(25)+
						 getli(27)+
						 getli("str")+
						"        </ul>" +
						"    </li>" +
						"<li>)</li>"+
						"</ul>";
				builder.makeCode(line2);
				result+=line2;
			}
		}
		//builder.makeCode(result);
		builder.postMakeCode();
	}


	private void constructDebugView() {
		builder.preMakeDebugView();
		builder.makeDebugView("aaa");

		builder.postMakeDebugView();
	}

	private void testadd() {
		String line2="<ul class=\"menu\">\r\n" +
				"<li>System.out.println(</li>\r\n"+
				"    <li class=\"menu__single\">\r\n" +
				"        <a href=\"#\" >var1</a>\r\n" +
				"        <ul class=\"menu__second-level\">\r\n" +
				 getli(21)+
				 getli(23)+
				 getli(25)+
				 getli(27)+
				 getli("str")+
				"        </ul>\r\n" +
				"    </li>\r\n" +
				"<li>)</li>\r\n"+
				"</ul>";
		builder.makeScript(line2);
	}

	private String getli(String val) {
		return "            <li><a href=\"#\"> "+val+" </a></li>";
	}

	private String getli(int val) {
		return "            <li><a href=\"#\"> "+Integer.toString(val)+" </a></li>";
	}











}