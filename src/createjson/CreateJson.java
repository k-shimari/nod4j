package createjson;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

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
			printJson(jsonList);
			System.out.println("Create json SUCCESS at " + targetDir);
		} catch (IOException e) {
			System.err.println("Create json FAILED");
			e.printStackTrace();
		}
	}

	private void printJson(List<Json> jsonList) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		List<String> lines = jsonList.stream()
				.map(s -> {
					try {
						return mapper.writeValueAsString(s);
					} catch (JsonProcessingException e) {
						e.printStackTrace();
						return "";
					}
				})
				.collect(Collectors.toList());
		if (Files.exists(Paths.get(targetDir, FILENAME))) {
			Files.delete(Paths.get(targetDir, FILENAME));
		}
		Files.createFile(Paths.get(targetDir, FILENAME));
		Files.write(Paths.get(targetDir, FILENAME), lines, Charset.forName("UTF-8"), StandardOpenOption.WRITE);
	}

	private List<Json> create() {
		List<Json> jsonList = new ArrayList<>();
		String[] prevClassName = { "" };
		String[] prevMethodName = { "" };
		String[] prevLinenum = { "" };

		Map<String, Integer> isPutMap = new HashMap<String, Integer>();
		List<Json> tmpJsonList = new ArrayList<>();
		selfiles.getDataidMaps().getDataidVarMap().keySet()
				.stream()
				.sorted(Comparator.comparing(d -> Integer.parseInt(d)))
				.forEach(d -> {
					String className = selfiles.getDataidMaps().getDataidClassMap().get(d);
					String methodName = selfiles.getDataidMaps().getDataidMethodMap().get(d);
					String linenum = selfiles.getDataidMaps().getDataidLinenumMap().get(d);
					/*for count*/
					if (!(prevClassName[0].equals(className) && prevMethodName[0].equals(methodName)
							&& prevLinenum[0].equals(linenum))) {
						addJsonList(jsonList, tmpJsonList, isPutMap);
					}
					VarInfo fieldInfo = selfiles.getDataidMaps().getDataidVarMap().get(d);
					String var = fieldInfo.getFieldname();
					Json json = setJson(d, className, methodName, var, linenum, fieldInfo.getisPut());
					tmpJsonList.add(json);
					setIsPutMap(isPutMap, fieldInfo, var);
					updatePrev(prevClassName, prevMethodName, prevLinenum, className, methodName, linenum);
				});
		addJsonList(jsonList, tmpJsonList, isPutMap);

		return jsonList;
	}

	private void setIsPutMap(Map<String, Integer> isPutMap, VarInfo fieldInfo, String var) {
		if (isPutMap.containsKey(var)) {
			isPutMap.put(var, isPutMap.get(var) + (fieldInfo.getisPut() ? 1 : 0));
		} else {
			isPutMap.put(var, fieldInfo.getisPut() ? 1 : 0);
		}
	}

	private Json setJson(String d, String className, String methodName, String var, String linenum, boolean isPut) {
		Json json = new Json(d, className, methodName, var, linenum, isPut);
		setValueList(json, d);
		return json;
	}

	private void updatePrev(String[] prevClassName, String[] prevMethodName, String[] prevLinenum, String className,
			String methodName, String linenum) {
		prevClassName[0] = className;
		prevMethodName[0] = methodName;
		prevLinenum[0] = linenum;
	}

	private void addJsonList(List<Json> jsonList, List<Json> tmpJsonList, Map<String, Integer> isPutMap) {
		Map<String, Integer> countMap = new HashMap<>();
		int putIndex = 0;
		for (Json json : tmpJsonList) {
			putIndex = setCount(isPutMap.get(json.getVar()), countMap, json, putIndex);
			jsonList.add(json);
		}
		tmpJsonList.clear();
		isPutMap.clear();
	}

	/*set appearances count */
	private int setCount(int putCount, Map<String, Integer> countMap, Json json, Integer putIndex) {
		if (countMap.containsKey(json.getVar())) {
			if (json.getIsPut() && ++putIndex == putCount) {
				json.setCount(1);
			} else {
				json.setCount(countMap.get(json.getVar()) + 1 + (putCount > 0 ? 1 : 0));
			}
			countMap.put(json.getVar(), countMap.get(json.getVar()) + 1);
		} else {
			if (json.getIsPut() && ++putIndex == putCount) {
				json.setCount(1);
			} else {
				json.setCount(1 + (putCount > 0 ? 1 : 0));
			}
			countMap.put(json.getVar(), 1);
		}
		return putIndex;
	}

	private void setValueList(Json json, String d) {
		List<Recentdata> valueList = new ArrayList<Recentdata>();
		Map<String, List<Recentdata>> recdatamap = selfiles.getDataidMaps().getDataidRecentdataMap();
		valueList = recdatamap.get(d);
		json.setValueList(valueList);
	}
}
