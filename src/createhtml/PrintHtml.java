package createhtml;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import concretebuilder.HtmlBuilder;
import logvis.SrcFiles;
import logvis.SrcFiles.SrcFile;

public class PrintHtml {
	private final String OUTPUTDIR="sample/output/";
	private final String CSS = "../../custom.css";
	private SrcFiles srcfiles;

	public PrintHtml(SrcFiles srcfiles) {
		// TODO 自動生成されたコンストラクター・スタブ
		this.srcfiles=srcfiles;
	}





	public void print() {
		ArrayList<SrcFile> files = srcfiles.getSrcFiles();
		for(SrcFile file :files){

			HtmlBuilder hb = new HtmlBuilder(file.getFilename());
			Director director = new Director(hb);
			director.construct(OUTPUTDIR,CSS,file);
			System.out.println(hb.gethtmlfilename() + "を作成しました。");
		}

	}







	private void printheader(SrcFile file) throws IOException {
		List<String> list = new ArrayList<String>();


		//Files.write(Paths.get(file.getDir(), file.getHtmlFilename()),list,Charset.forName("UTF-8"), StandardOpenOption.CREATE, StandardOpenOption.WRITE);
	}



	private void printfooter(SrcFile file) throws IOException{
		List<String> list = new ArrayList<String>();


		//Files.write(Paths.get(file.getDir(), file.getHtmlFilename()),list,Charset.forName("UTF-8"), StandardOpenOption.CREATE, StandardOpenOption.WRITE);

	}




}
