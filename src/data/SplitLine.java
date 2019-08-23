package data;

public class SplitLine {

	private String line;
	private String[] elements;

	public SplitLine(String line) {
		this.line = line;
		this.elements = splitRecentdata();
	}

	public String[] splitRecentdata() {
		String[] s = line.split(",");


		return s;
	}

	public String getLine() {
		return line;
	}

	public String[] getElements() {
		return elements;
	}

	public String getElement(int index) {
		return elements[index];
	}


}
