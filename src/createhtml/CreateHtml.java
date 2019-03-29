package createhtml;

import java.io.File;

import data.JavaFiles;
import data.SeloggerFiles;

public class CreateHtml {
	private SeloggerFiles selfiles;
	private JavaFiles srcfiles;

	public CreateHtml(SeloggerFiles selfiles, JavaFiles srcfiles) {
		this.selfiles=selfiles;
		this.srcfiles=srcfiles;
	}

	public void start() {

		System.out.println("Create html ...");
		init();
		PrintHtml printhtml= new PrintHtml(selfiles,srcfiles);
		printhtml.print();
	}

	private void init() {
		// TODO 自動生成されたメソッド・スタブ
		clean();
		File newdir = new File("sample/output/");
		newdir.mkdir();
	}

	/**
	 * 出力先のファイルを消す
	 */
	private void clean() {
		File file = new File("sample/output/");
		try {
			recursiveDeleteFile(file);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

	private void recursiveDeleteFile(final File file) throws Exception{
		// TODO 自動生成されたメソッド・スタブ
		if (!file.exists()) {
			return;
		}
		// 対象がディレクトリの場合は再帰処理
		if (file.isDirectory()) {
			for (File child : file.listFiles()) {
				recursiveDeleteFile(child);
			}
		}
		// 対象がファイルもしくは配下が空のディレクトリの場合は削除する
		file.delete();
	}
}
