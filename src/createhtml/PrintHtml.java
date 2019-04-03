package createhtml;

import java.util.ArrayList;

import concretebuilder.HtmlBuilder;
import data.JavaFiles;
import data.JavaFiles.JavaFile;
import data.SeloggerFiles;

public class PrintHtml {
	//private final String OUTPUTDIR="sample/output/";
	private SeloggerFiles selfiles;
	private JavaFiles srcfiles;
	private String dir;
	public PrintHtml(SeloggerFiles selfiles,JavaFiles srcfiles, String dir) {
		// TODO 自動生成されたコンストラクター・スタブ
		this.selfiles=selfiles;
		this.srcfiles=srcfiles;
		this.dir=dir;
	}
	/**
	 * ファイルごとにhtmlを生成
	 */
	public void print() {
		ArrayList<JavaFile> files = srcfiles.getSrcFiles();
		for(JavaFile file :files){
			HtmlBuilder hb = new HtmlBuilder(file.getFilename());
			Director director = new Director(selfiles,hb,dir);
			director.construct(file);
			System.out.println(hb.gethtmlfilename() + "を作成しました。");
		}
	}
}
