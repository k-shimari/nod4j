package data;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DataIdMaps {
	private Map<String, String> dataidClassIDMap = new HashMap<>();;
	private Map<String, String> dataidMethodIDMap = new HashMap<>();
	private Map<String, String> ClassIDClassMap = new HashMap<>();;
	private Map<String, String> MethodIDMethodMap = new HashMap<>();

	public void createMap(List<String> linesDataids, List<String> linesMethods) {
		createIDMap(linesDataids);
		createNameMap(linesMethods);

	}

	public void createIDMap(List<String> linesDataids) {
		for (String line : linesDataids) {
			String ele[] = line.split(",");
			if (ele.length > 3) {
				dataidClassIDMap.put(ele[0], ele[1]);
				dataidMethodIDMap.put(ele[0], ele[2]);
			} else {
				System.err.println("DataIdMaps.java createIDMap: ele.length < 3");
			}
		}
	}

	public void createNameMap(List<String> linesMethods) {
		for (String line : linesMethods) {
			String ele[] = line.split(",");
			if (ele.length > 6) {
				ClassIDClassMap.put(ele[0],ele[6]);
				MethodIDMethodMap.put(ele[1], ele[3]);
			} else {
				System.err.println("DataIdMaps.java createNameMap: ele.length < 3");
			}
		}
	}

	public Map<String, String> getDataidClassIDMap() {
		return dataidClassIDMap;
	}

	public Map<String, String> getDataidMethodIDMap() {
		return dataidMethodIDMap;
	}

	public Map<String, String> getClassIDClassMap() {
		return ClassIDClassMap;
	}

	public Map<String, String> getMethodIDMethodMap() {
		return MethodIDMethodMap;
	}

}