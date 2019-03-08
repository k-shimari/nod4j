package createhtml;

import builder.Builder;
import logvis.SrcFiles.SrcFile;

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
	public void construct(SrcFile file) {
		constructHead(file);
		builder.makeBody(file.getFilename()+".java");
		builder.makeHeading("今日の目標");
		constructCode(file);

		builder.makeHeading("使うもの");

		testadd();

		builder.makeScript("<script>prettyPrint();</script>");
		// TODO 出力先の指定
		builder.close(OUTPUTDIR);
	}

	private void constructHead(SrcFile file) {
		builder.makeHead(META);
		builder.makeTitle(file.getFilename()+".java");
		for(String js: JSs) {
			builder.makeJavaScript(js);
		}
		for(String CSS: CSSs) {
			builder.makeStyle(CSS);
		}
	}

	private void constructCode(SrcFile file) {
		int index=0;
		for(String line: file.getLines()) {
			if(index++==0) {
				builder.preMakeCode(line);
			}else {
				builder.makeCode(line);
			}
		}
		builder.postMakeCode();
	}


	private void testadd() {
	/*pulldown
		String line="      <select id=\"sample\" name=\"nanika\">"+
				"<option> - - - - </option>"
				+ "</select>歳\r\n"
				+ "<script>addOption()</script>";
		builder.makeScript(line);
*/
		String beforestr="\"var1\"";
		String afterstr="var2"+"\r\n";
		for (int i=0;i<10;i++) {
			afterstr+=Integer.toString(i)+"\r\n";
		}
		String line2="<ul class=\"menu\">\r\n" +
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
				"</ul>";
		builder.makeScript(line2);
	}

	private String getli(String val) {
		return "            <li><a href=\"#\">"+val+"</a></li>\r\n";
	}

	private String getli(int val) {
		return "            <li><a href=\"#\">"+Integer.toString(val)+"</a></li>\r\n";
	}










}