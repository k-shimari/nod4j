package createhtml;

import java.util.List;
import java.util.Map;

import builder.Builder;
import data.DataID;
import data.DataIdVar;
import data.FileLineDataId;
import data.FileLineVarDataId;
import data.JavaFiles.JavaFile;
import data.SeloggerFiles;

public class Director {
	private SeloggerFiles selfiles;
	private Builder builder;
	private String outputdir;
	private static final String META = "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />";

	//TODO JSとCSSのパス指定,自動でresourcesから取ってくる設定
	private static final String[] JSs = { "../../resources/test.js", "../../resources/prettify.js", };
	private static final String[] CSSs = { "../../resources/prettify.css", "../../resources/custom.css" };

	// 実際はBuilderのサブクラスを引数に取る
	public Director(SeloggerFiles selfiles, Builder builder,String dir) {
		this.selfiles = selfiles;
		this.builder = builder;
		this.outputdir=dir+"/output/";
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

		builder.makeScript("</div>");
		// TODO 出力先の指定
		builder.close(outputdir);
	}

	private void constructHead(JavaFile file) {
		builder.makeHead(META);
		builder.makeTitle(file.getFilename() + ".java");
		for (String js : JSs) {
			builder.makeJavaScript(js);
		}
		for (String CSS : CSSs) {
			builder.makeStyle(CSS);
		}
	}

	private void constructCode(JavaFile file) {

		int linenum = 0;
		String filename = file.getFilename() + ".java";
		for (String line : file.getLines()) {
			if (linenum++ == 0) {
				builder.preMakeCode(line);
			} else {
				String htmlline = gethtmlLine(line, filename, linenum);
				builder.makeCode(htmlline);
			}
		}
		builder.postMakeCode();
	}

	private String gethtmlLine(String line, String filename, int linenum) {

		Map<String, String> fileIDMap = selfiles.getFileIDMap();
		FileLineDataId fldata = new FileLineDataId(fileIDMap.get(filename), Integer.toString(linenum));
		/*lineが++とか+=とかを含んでいるとバグるので無理やり対策*/
		Map<FileLineDataId, List<String>> linevarMap = selfiles.getLineVarMap();
		ConvertSpecialOperator cs = new ConvertSpecialOperator();
		line = cs.convertspecialoperators(line, linevarMap, fldata);
		line =  line.replace("<", "&lt;");
		line =  line.replace(">", "&gt;");
		/*空行でなく，変数を含んでいる限りループ*/
		String htmlLine = "";
		boolean isContainsvar = false;

		while (line.length() > 0 && linevarMap.get(fldata) != null && !linevarMap.get(fldata).isEmpty()) {
			int minindex = 999;
			String minvar = null;
			/*その行に登場する変数のうち一番先頭にあるものを検索*/
			for (String var : linevarMap.get(fldata)) {
				if (line.indexOf(var) < minindex) {
					minindex = line.indexOf(var);
					minvar = var;
				}
			}
			DataIdVar dvar = selfiles.getLineVarDetailMap().get(new FileLineVarDataId(fileIDMap.get(filename), Integer.toString(linenum), minvar));

			boolean isPut = dvar.getDataIDList().get(dvar.getDataIDList().size() - 1).isPut();
			htmlLine += addHtmlTag(line, minindex, minvar, dvar, isPut);

			UpdateVarMap(dvar, minvar, linevarMap, fileIDMap.get(filename), Integer.toString(linenum), isPut);

			line = line.substring(minindex + minvar.length());
			isContainsvar = true;
		}
		htmlLine = addTag(line, htmlLine, isContainsvar);

		return htmlLine;
	}

	private String addHtmlTag(String line, int minindex, String minvar, DataIdVar dvar,
			boolean isPut) {

		System.out.println(line);
		CreateVarValue cre = new CreateVarValue(selfiles);
		String replacestr = cre.createReplacestr(minvar, dvar, isPut);
		String str = line.substring(0, minindex + minvar.length());
		str = "<li>" + str.replaceFirst(minvar, replacestr);
		return str;
	}

	private String addTag(String line, String htmlLine, boolean isContainsvar) {
		if (isContainsvar) {
			htmlLine = "<ul class=\"menu\">" + htmlLine;
			;
		}
		htmlLine += line;
		if (isContainsvar) {
			htmlLine += "</ul>";
		}
		return htmlLine;
	}






	/*参照した変数の情報を消す*/
	private void UpdateVarMap(DataIdVar dvar, String fieldname, Map<FileLineDataId, List<String>> linevarMap,
			String fileID, String linenum, boolean isPut) {
		Map<FileLineVarDataId, DataIdVar> linevardetailMap = selfiles.getLineVarDetailMap();
		if (dvar.getCount() > 1) {
			List<DataID> dlist = dvar.getDataIDList();
			if (isPut) {
				dlist.remove(dlist.size() - 1);
			} else {
				dlist.remove(0);
			}
			linevardetailMap.put(new FileLineVarDataId(fileID, linenum, fieldname),
					new DataIdVar(dvar.getVar(), dvar.getCount() - 1, dlist));
		} else {
			linevardetailMap.remove(new FileLineVarDataId(fileID, linenum, fieldname));
			List<String> list = linevarMap.get(new FileLineDataId(fileID, linenum));
			list.remove(fieldname);
			linevarMap.put(new FileLineDataId(fileID, linenum), list);
		}
	}

	private void constructDebugView() {
		builder.preMakeDebugView();
		builder.makeDebugView("aaa");

		builder.postMakeDebugView();
	}





}