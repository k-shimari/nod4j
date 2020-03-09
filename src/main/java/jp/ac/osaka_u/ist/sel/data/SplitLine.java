package jp.ac.osaka_u.ist.sel.data;

import java.util.ArrayList;

public class SplitLine {

	private String line;
	private String[] elements;
	private static final int LoStrPrefix = 27;

	public SplitLine(String line) {
		this.line = line;
		this.elements = splitRecentdata(line);
	}

	public String[] splitRecentdata(String line) {
		String[] tmpsl = line.split(",");
		ArrayList<String> result = new ArrayList<>();
		String storeStr = "";
		for (String s : tmpsl) {
			if (storeStr.equals("")) {
				if (s.startsWith("java.lang.String@")) {
					if (s.endsWith("\"") && !s.endsWith("\\\"") && s.length() != LoStrPrefix) {
						result.add(s);
					} else {
						storeStr = s + ",";
					}
				} else {
					result.add(s);
				}
			} else {
				if (s.endsWith("\"") && !s.endsWith("\\\"")) {
					result.add(storeStr + s);
					storeStr = "";
				} else {
					storeStr = storeStr + s + ",";
				}
			}
		}
		return result.toArray(new String[0]);
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
