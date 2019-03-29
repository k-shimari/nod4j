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


	public JavaFiles(String[] files) throws IOException {
		for(String file : files) {
			this.files.add(new JavaFile(file,Files.readAllLines(Paths.get(file), StandardCharsets.UTF_8)));
		}
	}

	public ArrayList<JavaFile> getSrcFiles() {
		return files;
	}

	public class JavaFile{
		String dir;
		String file;
		String filename;
		//String htmlfilename;
		List<String> lines;

		public JavaFile(String file, List<String> lines) {
			this.file=file;
			this.dir=file.substring(0,file.lastIndexOf("/")+1);
			this.filename= file.substring(file.lastIndexOf("/")+1,file.lastIndexOf("."));
			//this.htmlfilename= file.substring(file.lastIndexOf("/")+1,file.lastIndexOf("."))+".html";
			this.lines=lines;
		}

		public String getFilename() {
			return filename;
		}

		public List<String> getLines() {
			return lines;
		}

		public String getDir() {
			return dir;
		}

		public String getFile() {
			return file;
		}
	}
}
