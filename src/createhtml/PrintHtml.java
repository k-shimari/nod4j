package createhtml;

import java.util.ArrayList;

import concretebuilder.HtmlBuilder;
import logvis.SrcFiles;
import logvis.SrcFiles.SrcFile;

public class PrintHtml {
	//private final String OUTPUTDIR="sample/output/";

	private SrcFiles srcfiles;
	public PrintHtml(SrcFiles srcfiles) {
		// TODO 自動生成されたコンストラクター・スタブ
		this.srcfiles=srcfiles;
	}
	/**
	 * ファイルごとにhtmlを生成
	 */
	public void print() {
		ArrayList<SrcFile> files = srcfiles.getSrcFiles();
		for(SrcFile file :files){
			HtmlBuilder hb = new HtmlBuilder(file.getFilename());
			Director director = new Director(hb);
			director.construct(file);
			System.out.println(hb.gethtmlfilename() + "を作成しました。");
		}
	}
}
