package createhtml;

import java.util.List;
import java.util.Map;

import builder.Builder;
import data.DataIdVar;
import data.FileLineDataId;
import data.FileLineVarDataId;
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

		int linenum=0;
		String filename=file.getFilename()+".java";
		for(String line: file.getLines()) {
			if(linenum++==0) {
				builder.preMakeCode(line);
			}else{
				String htmlline = gethtmlLine(line,filename,linenum);
				builder.makeCode(htmlline);
			}
		}
		builder.postMakeCode();
	}

	private String gethtmlLine(String line, String filename, int linenum) {
		/*dataids.txtのファイル・行に対する変数と出現回数*/
		Map<FileLineDataId, List<String>> linevarMap= selfiles.getLineVarMap();

		Map<String,String>fileIDMap = selfiles.getFileIDMap();
		System.out.println(fileIDMap.get(filename) +" " +Integer.toString(linenum));
		String htmlLine="";
		FileLineDataId fldata =new FileLineDataId(fileIDMap.get(filename),Integer.toString(linenum));
		/*空行でなく，変数を含んでいる限りループ*/
		while(line.length()>0 && linevarMap.get(fldata)!=null &&!linevarMap.get(fldata).isEmpty()) {
			int minindex=999;
			String minvar=null;
			/*その行に登場する変数のうち一番先頭にあるものを検索*/
			for(String var : linevarMap.get(fldata)) {
				if(line.indexOf(var) < minindex) {
					minindex=line.indexOf(var);
					minvar=var;
				}
			}
			/*先頭の変数の終端までを切り出して，変数部を出力用に置換*/
			System.out.println(minvar);
			System.out.println(minindex +" a "+minvar.length());
			String tmpstr=line.substring(0, minindex+minvar.length());
			tmpstr = tmpstr.replaceFirst(minvar, "<b>"+minvar+"</b>");
			htmlLine+=tmpstr;
			UpdateVarMap(minvar,linevarMap,fileIDMap.get(filename),Integer.toString(linenum));

			line=line.substring(minindex+minvar.length());
		}
		htmlLine+=line;




/*
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
		*/
		return htmlLine;
	}



	/*参照した変数の情報を消す*/
	private void UpdateVarMap(String fieldname, Map<FileLineDataId, List<String>> linevarMap, String fileID, String linenum) {

		Map<FileLineVarDataId,DataIdVar> linevardetailMap=selfiles.getLineVarDetailMap();

		DataIdVar dvar =linevardetailMap.get(new FileLineVarDataId(fileID, linenum, fieldname));
		if(dvar.getCount()>1) {
			linevardetailMap.put(new FileLineVarDataId(fileID, linenum, fieldname),new DataIdVar(dvar.getVar(),dvar.getCount()-1));
		}
		else{
			linevardetailMap.remove(new FileLineVarDataId(fileID, linenum, fieldname));
			List<String> list=linevarMap.get(new FileLineDataId(fileID,linenum));
			list.remove(fieldname);
			linevarMap.put(new FileLineDataId(fileID, linenum),list);

		}
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