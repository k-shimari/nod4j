package jp.ac.osaka_u.ist.sel.nod4j.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jp.ac.osaka_u.ist.sel.nod4j.data.varinfo.VarInfo;

/**
 * This class has the maps dataid to much information.
 * @author k-simari
 *
 */
public class DataIdMaps {
	private Map<String, String> classIDClassMap = new HashMap<>();
	private Map<String, String> methodIDMethodMap = new HashMap<>();
	private Map<String, String> dataidClassMap = new HashMap<>();
	private Map<String, String> dataidMethodMap = new HashMap<>();
	private Map<String, String> dataidLinenumMap = new HashMap<>();
	private Map<String, List<Recentdata>> dataidRecentdataMap = new HashMap<>();
	private Map<String, VarInfo> dataidVarMap = new HashMap<>();

	/**
	 * This constructor calls methods to create the maps.
	 */
	public void createMap(List<String> linesDataids, List<String> linesMethods, List<String> linesRecentdata) {
		createIDMap(linesDataids);
		createRecentdataMap(linesRecentdata);
		createVarInfoMap(linesDataids);
	}

	/**
	 * This method map classID to className and methodID to methodName.
	 * @param linesMethods is the set of lines in dataids.txt
	 */
	public void createNameMap(List<String> linesMethods) {
		for (String line : linesMethods) {
			String[] ele = line.split(",");
			if (ele.length > 6) {
				classIDClassMap.put(ele[0], ele[2]);
				methodIDMethodMap.put(ele[1], ele[3]);
			} else {
				System.err.println("DataIdMaps.java createNameMap: ele.length <= 6 " + line);
			}
		}
	}

	/**
	 * This method maps dataID to className, dataID to methodName and dataID to line number.
	 * @param linesDataids is the set of lines in dataids.txt
	 */
	public void createIDMap(List<String> linesDataids) {
		for (String line : linesDataids) {
			String[] ele = line.split(",");
			if (ele.length > 3) {
				dataidClassMap.put(ele[0], classIDClassMap.get(ele[1]));
				dataidMethodMap.put(ele[0], methodIDMethodMap.get(ele[2]));
				dataidLinenumMap.put(ele[0], ele[3]);
			} else {
				System.err.println("DataIdMaps.java createIDMap: ele.length <= 3 ");
			}
		}
	}

	/**
	 * This method maps dataID to value information (recentdata: time, thread, data)
	 * @param linesDataids is the set of lines in dataids.txt
	 */
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

	/**
	 * This method maps dataid to variable information (field name, assignment or reference...)
	 * @param linesDataids is the set of lines in dataids.txt
	 */
	private void createVarInfoMap(List<String> linesDataids) {
		for (String linedat : linesDataids) {
			String[] elemdat = linedat.split(",");
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
