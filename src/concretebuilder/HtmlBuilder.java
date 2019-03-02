package concretebuilder;



import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;

import builder.Builder;

public class HtmlBuilder extends Builder {

	private String javafilename;
	private String htmlfilename;

	private List<String> lines = new ArrayList<String>();

	public HtmlBuilder(String filename) {
		this.htmlfilename = filename + ".html";
		this.javafilename = filename + ".java";
	}

	@Override
	public void makeHead(String head) {
		lines.add("<html><head>");
		lines.add(head);

	}

	@Override
	public void makeTitle(String title) {
		lines.add("<title>" + title + "</title>");

	}

	@Override
	public void makeStyle(String style) {
		lines.add("<link href="+style + " rel=\"stylesheet\" />");
	}

	@Override
	public void makeJavaScript(String js) {
		lines.add("<script src="+js + "></script>");
	}

	@Override
	public void makeBody(String title) {
		lines.add("</head>");
		lines.add("<body>");
		lines.add("<h1>" + title + "</h1>");
	}

	@Override
	public void makeHeading(String heading) {
		lines.add("<h3>" + heading + "</h3>");
	}

	@Override
	public void makeContents(String contents) {
		lines.add("<pre><p>" + contents + "</p></pre>");
	}

	@Override
	public void makeScript(String script) {
		lines.add(script);
	}

	@Override
	public void close(String dir) {
		lines.add("</body></html>");
		try  {
			Files.write(Paths.get(dir, htmlfilename),lines,Charset.forName("UTF-8"), StandardOpenOption.CREATE_NEW, StandardOpenOption.WRITE);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

	public String gethtmlfilename() {
		return htmlfilename;
	}





}