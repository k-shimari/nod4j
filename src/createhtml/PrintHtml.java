package createhtml;

import java.util.ArrayList;

import concretebuilder.HtmlBuilder;
import data.JavaFiles;
import data.SeloggerFiles;
import data.JavaFiles.JavaFile;

public class PrintHtml {
	//private final String OUTPUTDIR="sample/output/";
	private SeloggerFiles selfiles;
	private JavaFiles srcfiles;
	public PrintHtml(SeloggerFiles selfiles,JavaFiles srcfiles) {
		// TODO 自動生成されたコンストラクター・スタブ
		this.selfiles=selfiles;
		this.srcfiles=srcfiles;
	}
	/**
	 * ファイルごとにhtmlを生成
	 */
	public void print() {
		ArrayList<JavaFile> files = srcfiles.getSrcFiles();
		for(JavaFile file :files){
			HtmlBuilder hb = new HtmlBuilder(file.getFilename());
			Director director = new Director(selfiles,hb);
			director.construct(file);
			System.out.println(hb.gethtmlfilename() + "を作成しました。");
		}
	}
}
