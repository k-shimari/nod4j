package createjson;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import data.Json;
import data.Recentdata;
import data.SeloggerFiles;
import data.VarInfo;

public class CreateJson {
	private SeloggerFiles selfiles;
	private String targetDir;
	private static final String FILENAME = "sample2-varinfo.json";

	public CreateJson(SeloggerFiles selfiles, String dir) {
		this.selfiles = selfiles;
		this.targetDir = dir;
	}

	public void start() {
		System.out.println("Create json ...");
		List<Json> jsonList = create();
		try {
			PrintJson pj = new PrintJson(targetDir, FILENAME);
			pj.printJson(jsonList);
			System.out.println("Create json SUCCESS at " + targetDir);
		} catch (IOException e) {
			System.err.println("Create json FAILED");
			e.printStackTrace();
		}
	}

	private List<Json> create() {
		List<Json> jsonList = new ArrayList<>();
		String[] prevClassName = { "" };
		String[] prevMethodName = { "" };
		String[] prevLinenum = { "" };

		Map<String, Integer> varCountinLineMap = new HashMap<>();
		List<Json> tmpJsonList = new ArrayList<>();
		selfiles.getDataidMaps().getDataidVarMap().keySet()
				.stream()
				.sorted(Comparator.comparing(d -> Integer.parseInt(d)))
				.forEach(d -> {
					String className = selfiles.getDataidMaps().getDataidClassMap().get(d);
					String methodName = selfiles.getDataidMaps().getDataidMethodMap().get(d);
					String linenum = selfiles.getDataidMaps().getDataidLinenumMap().get(d);
					if (!(prevClassName[0].equals(className) && prevMethodName[0].equals(methodName)
							&& prevLinenum[0].equals(linenum))) {
						if (tmpJsonList.size() != 0) {
							addJsonList(jsonList, tmpJsonList, varCountinLineMap);
						}
						varCountinLineMap.clear();
					}
					VarInfo fieldInfo = selfiles.getDataidMaps().getDataidVarMap().get(d);
					String var = fieldInfo.getFieldname();
					Json json = setJson(d, className, methodName, var, linenum, fieldInfo.getInst());
					tmpJsonList.add(json);
					if (fieldInfo.getInst().equals("P")) {
						addJsonList(jsonList, tmpJsonList, varCountinLineMap);
					}
					updatePrev(prevClassName, prevMethodName, prevLinenum, className, methodName, linenum);
				});
		if (tmpJsonList.size() != 0)
			addJsonList(jsonList, tmpJsonList, varCountinLineMap);

		return jsonList;
	}

	private void setVarCountinLineMap(Map<String, Integer> varCountinLineMap, String var) {
		if (varCountinLineMap.containsKey(var)) {
			varCountinLineMap.put(var, varCountinLineMap.get(var) + 1);
		} else {
			varCountinLineMap.put(var, 1);
		}
	}

	private Json setJson(String d, String className, String methodName, String var, String linenum, String inst) {
		Json json = new Json(d, className, methodName, var, linenum, inst);
		setValueList(json, d);
		return json;
	}

	private void updatePrev(String[] prevClassName, String[] prevMethodName, String[] prevLinenum, String className,
			String methodName, String linenum) {
		prevClassName[0] = className;
		prevMethodName[0] = methodName;
		prevLinenum[0] = linenum;
	}

	private void addJsonList(List<Json> jsonList, List<Json> tmpJsonList, Map<String, Integer> varCountinLineMap) {
		Map<String, Integer> thisVarCountMap = new HashMap<>();
		boolean isLastPut;
		String lastPutVar = "";
		isLastPut = tmpJsonList.get(tmpJsonList.size() - 1).getInst().equals("P");
		if (isLastPut)
			lastPutVar = tmpJsonList.get(tmpJsonList.size() - 1).getVar();
		for (Json json : tmpJsonList) {
			setCount(varCountinLineMap, thisVarCountMap, json, isLastPut, lastPutVar);
			jsonList.add(json);
		}
		for (Json json : tmpJsonList) {
			setVarCountinLineMap(varCountinLineMap, json.getVar());
		}
		tmpJsonList.clear();
	}

	/*set appearances count */
	private void setCount(Map<String, Integer> varCountinLineMap, Map<String, Integer> thisVarCountMap, Json json,
			boolean isLastPut, String lastPutVar) {
		int prevCount = varCountinLineMap.containsKey(json.getVar()) ? varCountinLineMap.get(json.getVar()) : 0;
		int inc = (isLastPut && lastPutVar.equals(json.getVar())) ? 1 : 0;
		if (thisVarCountMap.containsKey(json.getVar())) {
			if (json.getInst().equals("P")) {
				json.setCount(1 + prevCount);
			} else {
				json.setCount(1 + inc + thisVarCountMap.get(json.getVar()) + prevCount);
			}
			thisVarCountMap.put(json.getVar(), thisVarCountMap.get(json.getVar()) + 1);
		} else {
			if (json.getInst().equals("P")) {
				json.setCount(1 + prevCount);
			} else {
				json.setCount(1 + inc + prevCount);
			}
			thisVarCountMap.put(json.getVar(), 1);
		}
	}

	private void setValueList(Json json, String d) {
		List<Recentdata> valueList = new ArrayList<Recentdata>();
		Map<String, List<Recentdata>> recdatamap = selfiles.getDataidMaps().getDataidRecentdataMap();
		valueList = recdatamap.get(d);
		json.setValueList(valueList);
	}
}
