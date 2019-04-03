package data;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class JavaFiles {


	ArrayList<JavaFile> files = new ArrayList<JavaFile>();

	/**@TODO
	 */
	public JavaFiles(String dirpath) throws IOException {
		//@TODO なんかいい感じにディレクトリをたどってファイル一覧を取得する処理(オプションで実装)
	}


	public JavaFiles(String dir, String[] files) throws IOException {
		for(String file : files) {
			this.files.add(new JavaFile(file,Files.readAllLines(Paths.get(dir+"/src/"+file), StandardCharsets.UTF_8)));
		}
	}

	public ArrayList<JavaFile> getSrcFiles() {
		return files;
	}

	public class JavaFile{
		String filename;
		List<String> lines;

		public JavaFile(String file, List<String> lines) {
			this.filename= file.substring(0, file.length()-5);
			this.lines=lines;
		}

		public String getFilename() {
			return filename;
		}

		public List<String> getLines() {
			return lines;
		}


	}
}
