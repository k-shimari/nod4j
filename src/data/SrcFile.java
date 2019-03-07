package data;

public class SrcFile {
	private Line[] lines;
	private String filepath;

	public SrcFile(Line[] lines) {
		this.lines = lines;
	}

	public Line[] getLines() {
		return lines;
	}

	public void setLines(Line[] lines) {
		this.lines = lines;
	}

	public String getFilepath() {
		return filepath;
	}

	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}

	public class Line{
		private Bytecodes bytecodes;

		public Line(Bytecodes bytecodes) {
			this.bytecodes = bytecodes;
		}

		public Bytecodes getBytecodes() {
			return bytecodes;
		}

		public void setBytecodes(Bytecodes bytecodes) {
			this.bytecodes = bytecodes;
		}
	}
}
