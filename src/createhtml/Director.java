package createhtml;

import builder.Builder;
import data.JavaFiles.JavaFile;
import data.SeloggerFiles;

public class Director {
	private SeloggerFiles selfiles;
	private Builder builder;
	private static final String OUTPUTDIR="sample/output/";
	private static final String META="<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />";

	//TODO JSとCSSのパス指定,自動でresourcesから取ってくる設定
	private static final String[] JSs= {"../../resources/test.js","../../resources/prettify.js",};
	private static final String[] CSSs = {"../../resources/prettify.css","../../resources/custom.css"};


	// 実際はBuilderのサブクラスを引数に取る
	public Director(SeloggerFiles selfiles,Builder builder) {
		this.selfiles = selfiles;
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
		// TODO 出力先の指定
		test();
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
		for(String line: file.getLines()) {
			if(index++==0) {
				builder.preMakeCode(line);
			}else{
				String htmlline = gethtmlLine(line);

				builder.makeCode(htmlline);
				//result+=line2;
			}
		}
		builder.postMakeCode();
	}

	private String gethtmlLine(String line) {






		String htmlline="<ul class=\"menu\">" +
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
		return htmlline;
	}



	private void constructDebugView() {
		builder.preMakeDebugView();
		builder.makeDebugView("aaa");

		builder.postMakeDebugView();
	}

	private void testadd() {
		String line2="<ul class=\"menu\">" +System.lineSeparator() +
				"<li>System.out.println(</li>"+System.lineSeparator() +
				"    <li class=\"menu__single\">" +System.lineSeparator() +
				"        <a href=\"#\" >var1</a>" +System.lineSeparator() +
				"        <ul class=\"menu__second-level\">" +System.lineSeparator() +
				getli(21)+
				getli(23)+
				getli(25)+
				getli(27)+
				getli("str")+
				"        </ul>" +System.lineSeparator()+
				"    </li>" +System.lineSeparator()+
				"<li>)</li>"+System.lineSeparator()+
				"</ul>";
		builder.makeScript(line2);
	}

	private String getli(String val) {
		return "            <li><a href=\"#\"> "+val+" </a></li>";
	}

	private String getli(int val) {
		return "            <li><a href=\"#\"> "+Integer.toString(val)+" </a></li>";
	}




	private void test() {
		// TODO 自動生成されたメソッド・スタブ
		for(String line: selfiles.getLinesDataids()) {

		}
	}







}