package data;

public class SrcFile {
	private Bytecodes bytecodes;
	private String filepath;

	public SrcFile(Bytecodes bytecodes) {
		this.bytecodes = bytecodes;
	}

	public Bytecodes getBytecodes() {
		return bytecodes;
	}

	public void setBytecodes(Bytecodes bytecodes) {
		this.bytecodes = bytecodes;
	}

	public String getFilepath() {
		return filepath;
	}

	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}
}
