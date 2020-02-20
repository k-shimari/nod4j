package createjson;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import data.Recentdata;
import data.SeloggerFiles;
import data.varinfo.VarInfo;
import data.varinfo.VarInfoJson;
import data.varinfo.WVarInfoJson;

public class CreateVarInfo implements ICreateJson {

	private SeloggerFiles selFiles;
	private static final String NAMERETURN = "_return";
	private static final String ARRAYLOAD = "_arrayLoad";
	private static final String ARRAYSTORE = "_arrayStore";

	public CreateVarInfo(SeloggerFiles selFiles) {
		this.selFiles = selFiles;
	}

	@Override
	public WVarInfoJson create() {
		return new WVarInfoJson(createJsonList());
	}

	private List<VarInfoJson> createJsonList() {
		List<VarInfoJson> jsonList = new ArrayList<>();
		String prevClassName = "";
		String prevMethodName = "";
		String prevLinenum = "";

		//Map<String, Integer> varCountinLineMap = new HashMap<>();
		List<VarInfoJson> tmpJsonList = new ArrayList<>();
		List<String> sortedKeyList = getSortedKeyList();

		for(String d : sortedKeyList){
			String className = selFiles.getDataidMaps().getDataidClassMap().get(d)
					//.substring(selfiles.getDataidMaps().getDataidClassMap().get(d).lastIndexOf("/")+1)
					+ ".java";
			String methodName = selFiles.getDataidMaps().getDataidMethodMap().get(d);
			String linenum = selFiles.getDataidMaps().getDataidLinenumMap().get(d);
			/*when entering next line*/
			if (!(prevClassName.equals(className) && prevMethodName.equals(methodName)
					&& prevLinenum.equals(linenum))) {
				if (tmpJsonList.size() != 0) {
					jsonList.addAll(setCountToJsonList(tmpJsonList));
					tmpJsonList.clear();
				}
			}
			VarInfo fieldInfo = selFiles.getDataidMaps().getDataidVarMap().get(d);
			String var = fieldInfo.getFieldname();
			VarInfoJson json = setJson(d, className, methodName, var, linenum, fieldInfo.getInst());
			if (!json.getValueList().isEmpty()) {
				tmpJsonList.add(json);
			}
			prevClassName = className;
			prevMethodName = methodName;
			prevLinenum = linenum;
		}
		if (!tmpJsonList.isEmpty()) {
			jsonList.addAll(setCountToJsonList(tmpJsonList));
		}

		return jsonList;
	}

	/*sorting by linenum*/
	private List<String> getSortedKeyList() {
		List<String> list = new ArrayList<>();
		List<String> methodVarList = new ArrayList<>();
		String[] prevMethodName = {""};
		selFiles.getDataidMaps().getDataidVarMap().keySet()
				.stream()
				.sorted(Comparator.comparing(Integer::parseInt))
				.forEachOrdered(d -> {
					String methodName = selFiles.getDataidMaps().getDataidMethodMap().get(d);
					if (methodName != null) {
						if (!(prevMethodName[0].equals(methodName))) {
							if (methodVarList.size() != 0) {
								methodVarList.sort(Comparator.comparing(e -> Integer.parseInt(
										selFiles.getDataidMaps().getDataidLinenumMap().get(e))));
								list.addAll(methodVarList);
								methodVarList.clear();
							}
						}
						methodVarList.add(d);
						prevMethodName[0] = methodName;
					}
				});
		methodVarList.sort(Comparator.comparing(e -> selFiles.getDataidMaps().getDataidLinenumMap().get(e)));
		list.addAll(methodVarList);
		return list;
	}

	private VarInfoJson setJson(String d, String className, String methodName, String var, String linenum,
								String inst) {
		VarInfoJson json = new VarInfoJson(d, className, methodName, var, linenum, inst);
		setValueList(json, d);
		return json;
	}

	private List<VarInfoJson> setCountToJsonList(List<VarInfoJson> tmpJsonList) {
		List<VarInfoJson> result = new ArrayList<>();
		Map<String, Integer> varCountinLineMap = new HashMap<>();
		boolean isLastPut = tmpJsonList.get(tmpJsonList.size() - 1).getInst().equals("P");
		String lastPutVar = "";

		if (isLastPut) {
			lastPutVar = tmpJsonList.get(tmpJsonList.size() - 1).getVar();
		}
		//int idx = 0;
		for (VarInfoJson json : tmpJsonList) {
			//	if (json.getInst().equals("G") || json.getInst().equals("I") || idx == tmpJsonList.size() - 1) {
			if (!(json.getVar().equals(NAMERETURN) || json.getVar().equals(ARRAYLOAD) || json.getVar().equals(ARRAYSTORE))) {
				setCount(varCountinLineMap, json, isLastPut, lastPutVar);
			}
			/*for variable only recording as json*/
			else {
				json.setCount(-1);
			}
			result.add(json);
			//	}
			//	idx++;
		}
		return result;
	}

	/*set appearances count */
	private void setCount(Map<String, Integer> varCountInLineMap,
						  VarInfoJson json, boolean isLastPut, String lastPutVar) {
		int inc = (isLastPut && lastPutVar.equals(json.getVar())) ? 1 : 0;
		if (varCountInLineMap.containsKey(json.getVar())) {
			if (json.getInst().equals("P")) {
				json.setCount(1);
			} else {
				json.setCount(1 + inc + varCountInLineMap.get(json.getVar()));
			}
			varCountInLineMap.put(json.getVar(), varCountInLineMap.get(json.getVar()) + 1);
		} else {
			if (json.getInst().equals("P")) {
				json.setCount(1);
			} else {
				json.setCount(1 + inc);
			}
			varCountInLineMap.put(json.getVar(), 1);
		}
	}

	private void setValueList(VarInfoJson json, String d) {
		Map<String, List<Recentdata>> recDataMap = selFiles.getDataidMaps().getDataidRecentdataMap();
		List<Recentdata> valueList = new ArrayList<>();
		if (recDataMap.containsKey(d)) {
			for (Recentdata r : recDataMap.get(d)) {
				r.setData(r.getData()
						.replace("\"", "\\\"")
						.replace("\u2028", "\\u2028")
						.replace("\u2029", "\\u2029")
				);
				valueList.add(r);
			}
		}
		json.setValueList(valueList);
	}
}
