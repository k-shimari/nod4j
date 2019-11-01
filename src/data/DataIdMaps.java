package data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import data.varinfo.VarInfo;

public class DataIdMaps {
	private Map<String, String> classIDClassMap = new HashMap<>();;
	private Map<String, String> methodIDMethodMap = new HashMap<>();
	private Map<String, String> dataidClassMap = new HashMap<>();;
	private Map<String, String> dataidMethodMap = new HashMap<>();
	private Map<String, String> dataidLinenumMap = new HashMap<>();
	private Map<String, List<Recentdata>> dataidRecentdataMap = new HashMap<>();
	private Map<String, VarInfo> dataidVarMap = new HashMap<>();

	public void createMap(List<String> linesDataids, List<String> linesMethods, List<String> linesRecentdata) {
		createIDMap(linesDataids);
		createRecentdataMap(linesRecentdata);
		createVarInfoMap(linesDataids);
	}

	public void createNameMap(List<String> linesMethods) {
		for (String line : linesMethods) {
			String ele[] = line.split(",");
			if (ele.length > 6) {
				classIDClassMap.put(ele[0], ele[2]);
				methodIDMethodMap.put(ele[1], ele[3]);
			} else {

				System.err.println("DataIdMaps.java createNameMap: ele.length < 3 " + line);
			}
		}
	}

	public void createIDMap(List<String> linesDataids) {
		for (String line : linesDataids) {
			String ele[] = line.split(",");
			if (ele.length > 3) {
				dataidClassMap.put(ele[0], classIDClassMap.get(ele[1]));
				dataidMethodMap.put(ele[0], methodIDMethodMap.get(ele[2]));
				dataidLinenumMap.put(ele[0], ele[3]);
			} else {
				System.err.println("DataIdMaps.java createIDMap: ele.length < 3 ");
			}
		}
	}

	/*dataid に recentdata(time,thread,data)のリストを対応付ける*/
	private void createRecentdataMap(List<String> linesRecentdata) {
		for (String line : linesRecentdata) {
			SplitLine s = new SplitLine(line);
			String dataid = s.getElement(0);
			List<Recentdata> list = new ArrayList<>();
			for (int i = 0; i < s.getElements().length / 3 - 1; i++) {
				list.add(new Recentdata(s.getElement(3 * i + 3), s.getElement(3 * i + 4), s.getElement(3 * i + 5)));
			}
			dataidRecentdataMap.put(dataid, list);
		}
	}

	private void createVarInfoMap(List<String> linesDataids) {
		for (String linedat : linesDataids) {
			String elemdat[] = linedat.split(",");
			VarInfo fi = new VarInfo(elemdat);
			if (fi.getisFail())
				continue;
			String dataid = elemdat[0];
			dataidVarMap.put(dataid, fi);
		}
	}

	public Map<String, VarInfo> getDataidVarMap() {
		return dataidVarMap;
	}

	public Map<String, String> getDataidLinenumMap() {
		return dataidLinenumMap;
	}

	public Map<String, String> getDataidClassMap() {
		return dataidClassMap;
	}

	public Map<String, String> getDataidMethodMap() {
		return dataidMethodMap;
	}

	public Map<String, List<Recentdata>> getDataidRecentdataMap() {
		return dataidRecentdataMap;
	}

	public Map<String, String> getMethodIDMethodMap() {
		return methodIDMethodMap;
	}

	public Map<String, String> getClassIDClassMap() {
		return classIDClassMap;
	}

}
