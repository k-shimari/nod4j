package jp.ac.osaka_u.ist.sel.nod4j.data;

import java.util.ArrayList;

/**
 * This class split each line in recentdata.txt.
 * @author k-simari
 */
public class SplitLine {
	/**
	 * The line in recentdata.txt
	 */
	private String line;
	/**
	 * The parsing result of the line in recentdata.txt, which contains dataid, repeated count, recorded count, value, timestamp and threadid.
	 */
	private String[] elements;
	/**
	 * The length of "java.lang.String;@xxxxxxxx"
	 */
	private static final int LoStrPrefix = 27;

	public SplitLine(String line) {
		this.line = line;
		this.elements = splitRecentdata(line);
	}

	/**
	 * This method splits line by comma unless the String contains comma in its value.
	 * @param line: line for spilt
	 * @return The list splitted by the comma.
	 */
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
