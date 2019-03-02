package createhtml;

import builder.Builder;
import logvis.SrcFiles.SrcFile;

public class Director {

	private Builder builder;
	private static final String OUTPUTDIR="sample/output/";
	// 実際はBuilderのサブクラスを引数に取る
	public Director(Builder builder) {
		this.builder = builder;
	}

	// 文章の中身を作る
	public void construct(String css,SrcFile file) {
		builder.makeTitle(file.getFilename()+".java");
		builder.makeStyle(css);
		builder.makeBody(file.getFilename()+".java");
		builder.makeHeading("今日の目標");
		int index=0;
		for(String line: file.getLines()) {

			builder.makeContents(Integer.toString(++index) +": "+  line);
		}
		builder.makeHeading("使うもの");
		builder.makeContents("Java言語で学ぶデザインパターン入門");

		// TODO 出力先の指定
		//builder.close();
		builder.close(OUTPUTDIR);
	}
}