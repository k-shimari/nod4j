package createhtml;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import builder.Builder;
import data.DataID;
import data.DataIdVar;
import data.FileLineDataId;
import data.FileLineVarDataId;
import data.JavaFile;
import data.SeloggerFiles;

public class Director {
	private SeloggerFiles selfiles;
	private Builder builder;
	private String dir;

	//TODO JSとCSSのパス指定,自動でresourcesから取ってくる設定
	private static final String[] JSs = { "resources/jquery.min.js",
			"resources/prettify.js", "resources/time-filter.js" };
	private static final String[] CSSs = { "resources/prettify.css", "resources/custom.css" };

	private String[] pathJSs;
	private String[] pathCSSs;
	private static final int LARGENUM = 99999;

	// 実際はBuilderのサブクラスを引数に取る
	public Director(SeloggerFiles selfiles, Builder builder, String dir, int depth) {
		this.selfiles = selfiles;
		this.builder = builder;
		this.dir = dir;

		this.pathCSSs = new String[CSSs.length];
		this.pathJSs = new String[JSs.length];

		for (int i = 0; i < CSSs.length; i++) {
			this.pathCSSs[i] = getRelativePath(depth) + CSSs[i];
		}
		for (int i = 0; i < JSs.length; i++) {
			this.pathJSs[i] = getRelativePath(depth) + JSs[i];
		}

	}

	private String getRelativePath(int depth) {
		String prefix = "";
		for (int i = 0; i < depth; i++) {
			prefix += "../";
		}
		return prefix;
	}

	// 文章の中身を作る
	public void construct(JavaFile file) {
		constructHead(file);
		constructBody(file);
		constructCode(file);
		constructFooter(file);
		constructOther();
	}

	private void constructHead(JavaFile file) {
		builder.premakeHead();
		builder.makeTitle(file.getFilename() + ".java");
		for (String CSS : pathCSSs) {
			builder.makeStyle(CSS);
		}
		for (String js : pathJSs) {
			builder.makeJavaScript(js);
		}
		builder.postmakeHead();
	}

	private void constructBody(JavaFile file) {
		//TODO jacocoの真似をして作る部分
		builder.makeText("Header?TODO");
		builder.makeBody(file.getFilename() + ".java");

	}

	private void constructFooter(JavaFile file) {
		builder.preMakeFooter();
		//builder.makeBody(file.getFilename() + ".java");
		String removecheck = "<p><input type=\"button\" value=\"Reset\" onclick=\"allcheckoff();\"></p>";
		builder.makeScript(removecheck);
		builder.postMakeFooter();
	}

	private void constructOther() {
		builder.close(dir);
	}

	private void constructCode(JavaFile file) {

		int linenum = 0;
		String filename = file.getFilename() + ".java";
		for (String line : file.getLines()) {
			if (linenum++ == 0) {
				builder.preMakeCode(line);
			} else {
				String htmlline = pregethtmlLine(line, filename, linenum);
				builder.makeCode(htmlline);
			}
		}
		builder.postMakeCode();
	}

	private String pregethtmlLine(String line, String filename, int linenum) {

		Map<String, List<String>> dupfileIDMap = selfiles.getdupFileIDMap();
		Map<String, String> fileIDMap;
		if (dupfileIDMap.containsKey(filename) && dupfileIDMap.get(filename).size() != 0) {
			String htmlLine = "";
			for (String s : dupfileIDMap.get(filename)) {
				String li = gethtmlLine(line, filename, linenum, s);
				if (li.length() >= htmlLine.length()) {
					htmlLine = li;
				}
			}
			return htmlLine;
		} else {
			fileIDMap = selfiles.getFileIDMap();
			return gethtmlLine(line, filename, linenum, fileIDMap.get(filename));
		}

	}

	private String gethtmlLine(String line, String filename, int linenum, String fileID) {
		FileLineDataId fldata = new FileLineDataId(fileID, Integer.toString(linenum));
		/*lineが++とか+=とかを含んでいるとバグるので無理やり対策*/
		Map<FileLineDataId, List<String>> linevarMap = selfiles.getLineVarMap();
		ConvertSpecialOperator cs = new ConvertSpecialOperator();
		line = cs.convertspecialoperators(line, linevarMap, fldata);
		/*空行でなく，変数を含んでいる限りループ*/
		String htmlLine = "";
		boolean isContainsvar = false;
		//System.out.println(linenum + ":" + line);
		try {
			while (line.length() > 0 && linevarMap.get(fldata) != null && !linevarMap.get(fldata).isEmpty()) {
				int minindex = LARGENUM;
				String minvar = "";
				/*その行に登場する変数のうち一番先頭にあるものを検索*/
				for (String var : linevarMap.get(fldata)) {
					int index = line.indexOf(var);
					if (index == -1) {
						break;
					}
					/*文字列から変数名のみを検出する：TODO*/
					while ((index + var.length()) < line.length()
							&& (Character.isLetterOrDigit(line.charAt(index - 1))
									|| Character.isLetterOrDigit(line.charAt(index + var.length())))) {
						index = line.indexOf(var, index + 1);
					}

					if (index < minindex) {
						minindex = index;
						minvar = var;
					}
				}
				DataIdVar dvar = selfiles.getLineVarDetailMap()
						.get(new FileLineVarDataId(fileID, Integer.toString(linenum), minvar));

				if (dvar == null)
					break;
				boolean isPut = dvar.getDataIDList().get(dvar.getDataIDList().size() - 1).isPut();
				htmlLine += addHtmlTag(line, minindex, minvar, dvar, isPut);

				UpdateVarMap(dvar, minvar, linevarMap, fileID, Integer.toString(linenum), isPut);

				line = line.substring(minindex + minvar.length());
				isContainsvar = true;
			}
		} catch (NullPointerException e) {
			e.printStackTrace();
			System.out.println(line);

		}

		htmlLine = addTag(line, htmlLine, isContainsvar);
		return htmlLine;
	}

	private String addHtmlTag(String line, int minindex, String minvar, DataIdVar dvar,
			boolean isPut) {

		CreateVarValue cre = new CreateVarValue(selfiles);
		String replacestr = cre.createReplacestr(minvar, dvar, isPut);
		//System.out.println("-0----"+minvar);
		//System.out.println("-1----"+line);
		//System.out.println("repacestr:"+replacestr);
		//System.out.println(minindex+"+" + minvar.length());

		String str = line.substring(0, minindex + minvar.length());
		StringBuilder sb = new StringBuilder();
		sb.append(str);
		sb.replace(minindex, minindex + minvar.length(), replacestr);
		str = "<li>" + sb.toString();
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

	public void constructIndex(File dir, ArrayList<File> fileList, ArrayList<File> dirList) {
		builder.premakeHead();
		builder.makeTitle(dir.getPath());
		for (String CSS : pathCSSs) {
			builder.makeStyle(CSS);
		}
		for (String js : pathJSs) {
			builder.makeJavaScript(js);
		}
		builder.postmakeHead();
		builder.makeText("Header?TODO");
		builder.makeBody("current" + dir.getPath());

		for (File f : dirList) {
			//@TODO パス名に空白が入るとバグる
			builder.makeBody("<a href=" + f.getPath() + "/index.html" + ">" + f.getPath() + "</a>");
		}

		for (File f : fileList) {
			builder.makeBody("<a href=" + f.getPath() + ">" + f.getPath() + "</a>");
		}

		builder.close(dir.getPath());

	}

}