package jp.ac.osaka_u.ist.sel.nod3v.createjson;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jp.ac.osaka_u.ist.sel.nod3v.data.Recentdata;
import jp.ac.osaka_u.ist.sel.nod3v.data.SeloggerFiles;
import jp.ac.osaka_u.ist.sel.nod3v.data.varinfo.VarInfo;
import jp.ac.osaka_u.ist.sel.nod3v.data.varinfo.VarInfoJson;
import jp.ac.osaka_u.ist.sel.nod3v.data.varinfo.WVarInfoJson;

/**
 * This class creates varInfo.json and return it in the format of JSON.
 * @author k-simari
 */

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

	/**
	 * Mapping variable information in source code and execution trace(variable information at recentdata.txt)
	 * @return The contents of varInfo.json
	 */
	private List<VarInfoJson> createJsonList() {
		List<VarInfoJson> jsonList = new ArrayList<>();
		String prevClassName = "";
		String prevMethodName = "";
		String prevLinenum = "";
		List<VarInfoJson> tmpJsonList = new ArrayList<>();
		List<String> sortedKeyList = getSortedKeyList();

		for (String d : sortedKeyList) {
			String className = selFiles.getDataidMaps().getDataidClassMap().get(d) + ".java";
			String methodName = selFiles.getDataidMaps().getDataidMethodMap().get(d);
			String linenum = selFiles.getDataidMaps().getDataidLinenumMap().get(d);
			/* when entering next line */
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

	/**
	 * sort variable information of dataids.txt in ascending order by line number.
	 * @return sorted list
	 */
	private List<String> getSortedKeyList() {
		List<String> list = new ArrayList<>();
		List<String> methodVarList = new ArrayList<>();
		String[] prevMethodName = { "" };
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

	/**
	 * Set the variable information to Json
	 */
	private VarInfoJson setJson(String d, String className, String methodName, String var, String linenum,
			String inst) {
		VarInfoJson json = new VarInfoJson(d, className, methodName, var, linenum, inst);
		setValueList(json, d);
		return json;
	}

	/**
	 * Set appearance count in each line to jsonList
	 * @param jsonList
	 * @return json List(count is set)
	 */
	private List<VarInfoJson> setCountToJsonList(List<VarInfoJson> jsonList) {
		List<VarInfoJson> result = new ArrayList<>();
		Map<String, Integer> varCountinLineMap = new HashMap<>();
		boolean isLastPut = jsonList.get(jsonList.size() - 1).getInst().equals("P");
		String lastPutVar = "";

		if (isLastPut) {
			lastPutVar = jsonList.get(jsonList.size() - 1).getVar();
		}
		for (VarInfoJson json : jsonList) {
			/* The variable which is assignment or reference */
			if (!(json.getVar().equals(NAMERETURN) || json.getVar().equals(ARRAYLOAD)
					|| json.getVar().equals(ARRAYSTORE))) {
				setCount(varCountinLineMap, json, isLastPut, lastPutVar);
			}
			/* The variable only showing on Log Window */
			else {
				json.setCount(-1);
			}
			result.add(json);
		}
		return result;
	}

	/**
	 * Set how many times the json.getVar() appears to var Count in LineMap
	 * @param varCountInLineMap: How many times each variable appears in this line
	 * @param json: The information containing one dataid
	 * @param isLastPut: Is the previous variable processing in this line Put(e.g., PUT_STATIC_FIELD)?
	 * @param lastPutVar: The previous Put variable processing in this line
	 */
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

	/**
	 * Set the variable values to json and format some character (e.g., line separator) for json
	 * @param json
	 * @param dataid
	 */
	private void setValueList(VarInfoJson json, String dataid) {
		Map<String, List<Recentdata>> recDataMap = selFiles.getDataidMaps().getDataidRecentdataMap();
		List<Recentdata> valueList = new ArrayList<>();
		if (recDataMap.containsKey(dataid)) {
			for (Recentdata r : recDataMap.get(dataid)) {
				r.setData(r.getData()
						.replace("\"", "\\\"")
						.replace("\u2028", "\\u2028")
						.replace("\u2029", "\\u2029"));
				valueList.add(r);
			}
		}
		json.setValueList(valueList);
	}
}
