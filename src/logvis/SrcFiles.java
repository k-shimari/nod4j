package logvis;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class SrcFiles {


	ArrayList<SrcFile> files = new ArrayList<SrcFile>();

	/**@TODO
	 */
	public SrcFiles(String dirpath) throws IOException {
		//@TODO なんかいい感じにディレクトリをたどってファイル一覧を取得する処理(オプションで実装)
	}


	public SrcFiles(String[] files) throws IOException {
		for(String file : files) {
			this.files.add(new SrcFile(file,Files.readAllLines(Paths.get(file), StandardCharsets.UTF_8)));
		}
	}

	public ArrayList<SrcFile> getSrcFiles() {
		return files;
	}


	public void setSrcFiles(ArrayList<SrcFile> srcFiles) {
		this.files = srcFiles;
	}

	public class SrcFile{
		String dir;
		String file;
		String filename;
		//String htmlfilename;
		List<String> lines;

		public SrcFile(String file, List<String> lines) {
			this.file=file;
			this.dir=file.substring(0,file.lastIndexOf("/")+1);
			this.filename= file.substring(file.lastIndexOf("/")+1,file.lastIndexOf("."));
			//this.htmlfilename= file.substring(file.lastIndexOf("/")+1,file.lastIndexOf("."))+".html";
			this.lines=lines;
		}

		public String getFilename() {
			return filename;
		}

		public void setFilename(String filename) {
			this.filename = filename;
		}

		public List<String> getLines() {
			return lines;
		}

		public void setLines(List<String> lines) {
			this.lines = lines;
		}
		public String getDir() {
			return dir;
		}

		public void setDir(String dir) {
			this.dir = dir;
		}

		public String getFile() {
			return file;
		}

		public void setFile(String file) {
			this.file = file;
		}

		/*public String getHtmlFilename() {
			return htmlfilename;
		}

		public void setHtmlFilename(String htmlfilename) {
			this.htmlfilename = htmlfilename;
		}
*/
	}
}
