package createhtml;

import java.util.ArrayList;

import concretebuilder.HtmlBuilder;
import logvis.JavaFiles;
import logvis.JavaFiles.JavaFile;

public class PrintHtml {
	//private final String OUTPUTDIR="sample/output/";

	private JavaFiles srcfiles;
	public PrintHtml(JavaFiles srcfiles) {
		// TODO 自動生成されたコンストラクター・スタブ
		this.srcfiles=srcfiles;
	}
	/**
	 * ファイルごとにhtmlを生成
	 */
	public void print() {
		ArrayList<JavaFile> files = srcfiles.getSrcFiles();
		for(JavaFile file :files){
			HtmlBuilder hb = new HtmlBuilder(file.getFilename());
			Director director = new Director(hb);
			director.construct(file);
			System.out.println(hb.gethtmlfilename() + "を作成しました。");
		}
	}
}
