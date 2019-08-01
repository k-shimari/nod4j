package createhtml;

import java.io.File;

public class FileUtility {
	/**
	 * 出力先のファイル・ディレクトリを消す(dir/output以下)
	 */
	void cleanOutputDir(String dir) {
		File file = new File(dir + "/output");
		try {
			recursiveDeleteFile(file);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void recursiveDeleteFile(final File file) throws Exception {
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