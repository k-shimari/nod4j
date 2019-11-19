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

	private SeloggerFiles selfiles;
	private static final String NAMERETURN = "_return";
	private static final String ARRAYLOAD = "_arrayLoad";
	private static final String ARRAYSTORE = "_arrayStore";

	public CreateVarInfo(SeloggerFiles selfiles) {
		this.selfiles = selfiles;
	}

	@Override
	public WVarInfoJson create() {
		return new WVarInfoJson(createjsonList());
	}

	private List<VarInfoJson> createjsonList() {
		List<VarInfoJson> jsonList = new ArrayList<>();
		String[] prevClassName = { "" };
		String[] prevMethodName = { "" };
		String[] prevLinenum = { "" };

		//Map<String, Integer> varCountinLineMap = new HashMap<>();
		List<VarInfoJson> tmpJsonList = new ArrayList<>();
		List<String> sortedKeyList = getSortedKeyList();

		sortedKeyList.forEach(d -> {
			String className = selfiles.getDataidMaps().getDataidClassMap().get(d)
					//.substring(selfiles.getDataidMaps().getDataidClassMap().get(d).lastIndexOf("/")+1)
					+ ".java";
			String methodName = selfiles.getDataidMaps().getDataidMethodMap().get(d);
			String linenum = selfiles.getDataidMaps().getDataidLinenumMap().get(d);
			/*when entering next line*/
			if (!(prevClassName[0].equals(className) && prevMethodName[0].equals(methodName)
					&& prevLinenum[0].equals(linenum))) {
				if (tmpJsonList.size() != 0) {
					addJsonList(jsonList, tmpJsonList);
				}

			}
			VarInfo fieldInfo = selfiles.getDataidMaps().getDataidVarMap().get(d);
			String var = fieldInfo.getFieldname();
			VarInfoJson json = setJson(d, className, methodName, var, linenum, fieldInfo.getInst());
			if(!json.getValueList().isEmpty())
				tmpJsonList.add(json);

			updatePrev(prevClassName, prevMethodName, prevLinenum, className, methodName, linenum);
		});
		if (!tmpJsonList.isEmpty())
			addJsonList(jsonList, tmpJsonList);

		return jsonList;
	}

	/*sorting by linenum*/
	private List<String> getSortedKeyList() {
		List<String> list = new ArrayList<String>();
		List<String> methodVarList = new ArrayList<String>();
		String[] prevMethodName = { "" };
		selfiles.getDataidMaps().getDataidVarMap().keySet()
				.stream()
				.sorted(Comparator.comparing(d -> Integer.parseInt(d)))
				.forEach(d -> {
					String methodName = selfiles.getDataidMaps().getDataidMethodMap().get(d);
					if (methodName != null) {
						if (!(prevMethodName[0].equals(methodName))) {
							if (methodVarList.size() != 0) {
								methodVarList.stream()
										.sorted(Comparator
												.comparing(e -> Integer
														.parseInt(
																selfiles.getDataidMaps().getDataidLinenumMap().get(e))))
										.forEach(e -> {
											list.add(e);
										});
								methodVarList.clear();
							}
						}
						methodVarList.add(d);
						prevMethodName[0] = methodName;
					}
				});
		methodVarList.stream()
				.sorted(Comparator
						.comparing(e -> selfiles.getDataidMaps().getDataidLinenumMap().get(e)))
				.forEach(e -> {
					list.add(e);
				});
		return list;
	}

	private VarInfoJson setJson(String d, String className, String methodName, String var, String linenum,
			String inst) {
		VarInfoJson json = new VarInfoJson(d, className, methodName, var, linenum, inst);
		setValueList(json, d);
		return json;
	}

	private void updatePrev(String[] prevClassName, String[] prevMethodName, String[] prevLinenum, String className,
			String methodName, String linenum) {
		prevClassName[0] = className;
		prevMethodName[0] = methodName;
		prevLinenum[0] = linenum;
	}

	private void addJsonList(List<VarInfoJson> jsonList, List<VarInfoJson> tmpJsonList) {
		Map<String, Integer> varCountinLineMap = new HashMap<>();
		boolean isLastPut = tmpJsonList.get(tmpJsonList.size() - 1).getInst().equals("P");
		String lastPutVar = "";

		if (isLastPut)
			lastPutVar = tmpJsonList.get(tmpJsonList.size() - 1).getVar();
		//int idx = 0;
		for (VarInfoJson json : tmpJsonList) {
			//	if (json.getInst().equals("G") || json.getInst().equals("I") || idx == tmpJsonList.size() - 1) {
			if(!(json.getVar().equals(NAMERETURN)||json.getVar().equals(ARRAYLOAD)||json.getVar().equals(ARRAYSTORE))) {
				setCount(varCountinLineMap, json, isLastPut, lastPutVar);
			}
			/*for variable only recording as json*/
			else {
				json.setCount(-1);
			}
			jsonList.add(json);
			//	}
			//	idx++;
		}
		tmpJsonList.clear();
	}

	/*set appearances count */
	private void setCount(Map<String, Integer> varCountinLineMap,
			VarInfoJson json, boolean isLastPut, String lastPutVar) {
		int inc = (isLastPut && lastPutVar.equals(json.getVar())) ? 1 : 0;
		if (varCountinLineMap.containsKey(json.getVar())) {
			if (json.getInst().equals("P")) {
				json.setCount(1);
			} else {
				json.setCount(1 + inc + varCountinLineMap.get(json.getVar()));
			}
			varCountinLineMap.put(json.getVar(), varCountinLineMap.get(json.getVar()) + 1);
		} else {
			if (json.getInst().equals("P")) {
				json.setCount(1);
			} else {
				json.setCount(1 + inc);
			}
			varCountinLineMap.put(json.getVar(), 1);
		}
	}

	private void setValueList(VarInfoJson json, String d) {
		Map<String, List<Recentdata>> recdatamap = selfiles.getDataidMaps().getDataidRecentdataMap();
		List<Recentdata> valueList = new ArrayList<Recentdata>();
		if (recdatamap.containsKey(d)) {
			for (Recentdata r : recdatamap.get(d)) {
				r.setData(r.getData().replace("\"", "\\\"").replace("\u2028","\\u2028").replace("\u2029","\\u2029"));

				valueList.add(r);
			}
		}
		json.setValueList(valueList);
	}
}
