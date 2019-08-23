package data;

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
		ArrayList<String> l = new ArrayList<String>();
		String storeStr = "";
		for (String s : tmpsl) {
			if (storeStr.equals("")) {
				if (s.startsWith("java.lang.String@")) {
					if (s.endsWith("\"") && !s.endsWith("\\\"") && s.length() != LoStrPrefix) {
						l.add(s);
					} else {
						storeStr = s + ",";
					}
				} else {
					l.add(s);
				}
			} else {
				if (s.endsWith("\"") && !s.endsWith("\\\"")) {
					l.add(storeStr + s);
					storeStr = "";
				} else {
					storeStr = storeStr + s + ",";
				}
			}
		}
		return l.toArray(new String[l.size()]);
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
