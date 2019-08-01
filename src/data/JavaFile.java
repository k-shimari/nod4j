package data;

import java.util.List;

public class JavaFile {
	String filename;
	List<String> lines;

	public JavaFile(String file, List<String> lines) {
		this.filename = file.substring(0, file.length() - 5);
		this.lines = lines;
	}

	public String getFilename() {
		return filename;
	}

	public List<String> getLines() {
		return lines;
	}
}
