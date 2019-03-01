package logvis;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

public class SrcFiles {

	List <String> files;
	List<List <String>> linesOfFiles;

	/**
	 */
	public SrcFiles(String dirpath) throws IOException {
		//@TODO なんかいい感じにディレクトリをたどってファイル一覧を取得する処理(オプションで実装)
	}


	public SrcFiles(String[] files) throws IOException {
		this.files=Arrays.asList(files);
		for(String file : files)
			this.linesOfFiles.add(Files.readAllLines(Paths.get(file), StandardCharsets.UTF_8));
	}


}
