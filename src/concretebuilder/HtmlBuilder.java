package concretebuilder;

import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;

import builder.Builder;

public class HtmlBuilder extends Builder {
	private static final String META = "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />";
	private String htmlfilename;

	private List<String> lines = new ArrayList<String>();

	public HtmlBuilder(String filename) {
		this.htmlfilename = filename + ".html";
	}

	@Override
	public void premakeHead() {
		lines.add("<html><head>");
		lines.add(META);
	}

	@Override
	public void postmakeHead() {
		lines.add("</head>");
		lines.add("<body onLoad=\"prettyPrint()\">");
	}

	@Override
	public void makeTitle(String title) {
		lines.add("<title>" + title + "</title>");

	}

	@Override
	public void makeStyle(String style) {
		lines.add("<link href=" + style + " rel=\"stylesheet\" />");
	}

	@Override
	public void makeJavaScript(String js) {
		lines.add("<script src=" + js + "></script>");
	}

	@Override
	public void makeBody(String title) {
		lines.add("<h3>" + title + "</h3>");
	}

	@Override
	public void makeText(String text) {
		lines.add(text);
	}

	@Override
	public void preMakeCode(String code) {
		lines.add(
				"<form name=\"codeview\" id=\"codeview\" class=\"codeform\"><pre class=\"prettyprint language-java linenums\"  style=\"box-sizing: border-box; word-break: break-all; overflow-wrap: break-word;\">"
						+ code);
	}

	@Override
	public void makeCode(String code) {
		lines.add(code);
	}

	@Override
	public void postMakeCode() {
		lines.add("</pre>");
		lines.add("</form>");
	}

	@Override
	public void preMakeFooter() {
		lines.add("<footer class=\"site-footer\">");
	}

	@Override
	public void postMakeFooter() {
		lines.add("</footer>");
	}

	@Override
	public void makeScript(String script) {
		lines.add(script);
	}

	@Override
	public void close(String dir) {
		lines.add("</body></html>");
		try {
			Files.write(Paths.get(dir, htmlfilename), lines, Charset.forName("UTF-8"), StandardOpenOption.CREATE_NEW,
					StandardOpenOption.WRITE);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public String gethtmlfilename() {
		return htmlfilename;
	}

}