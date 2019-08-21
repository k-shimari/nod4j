package data;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DataIdMaps {
	private Map<String, String> ClassIDClassMap = new HashMap<>();;
	private Map<String, String> MethodIDMethodMap = new HashMap<>();
//	private Map<String, String> dataidClassIDMap = new HashMap<>();;
//	private Map<String, String> dataidMethodIDMap = new HashMap<>();
	private Map<String, String> dataidClassMap = new HashMap<>();;
	private Map<String, String> dataidMethodMap = new HashMap<>();
	private Map<String, String> dataidLinenumMap = new HashMap<>();

	private Map<String, String> dataidVarMap = new HashMap<>();

	public void createMap(List<String> linesDataids, List<String> linesMethods) {
		createNameMap(linesMethods);
		createIDMap(linesDataids);

	}

	public void createNameMap(List<String> linesMethods) {
		for (String line : linesMethods) {
			String ele[] = line.split(",");
			if (ele.length > 6) {
				ClassIDClassMap.put(ele[0], ele[6]);
				MethodIDMethodMap.put(ele[1], ele[3]);
			} else {
				System.err.println("DataIdMaps.java createNameMap: ele.length < 3");
			}
		}
	}

	public void createIDMap(List<String> linesDataids) {
		for (String line : linesDataids) {
			String ele[] = line.split(",");
			if (ele.length > 3) {
		//		dataidClassIDMap.put(ele[0], ele[1]);
		//		dataidMethodIDMap.put(ele[0], ele[2]);
				dataidClassMap.put(ele[0], ClassIDClassMap.get(ele[1]));
				dataidMethodMap.put(ele[0], MethodIDMethodMap.get(ele[2]));
				dataidLinenumMap.put(ele[0], ele[3]);

			} else {
				System.err.println("DataIdMaps.java createIDMap: ele.length < 3");
			}
		}
	}

	public void putDataIDVarMap(String dataid, String var) {
		dataidVarMap.put(dataid, var);
	}

	public Map<String, String> getDataidVarMap() {
		return dataidVarMap;
	}

//	public Map<String, String> getDataidClassIDMap() {
//		return dataidClassIDMap;
//	}
//
//	public Map<String, String> getDataidMethodIDMap() {
//		return dataidMethodIDMap;
//	}

	public Map<String, String> getDataidLinenumMap() {
		return dataidLinenumMap;
	}
	public Map<String, String> getDataidClassMap() {
		return dataidClassMap;
	}



	public Map<String, String> getDataidMethodMap() {
		return dataidMethodMap;
	}


//	public Map<String, String> getClassIDClassMap() {
//		return ClassIDClassMap;
//	}
//
//	public Map<String, String> getMethodIDMethodMap() {
//		return MethodIDMethodMap;
//	}

}
