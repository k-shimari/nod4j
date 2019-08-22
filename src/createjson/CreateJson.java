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

import data.FieldInfo;
import data.Json;
import data.Recentdata;
import data.SeloggerFiles;

public class CreateJson {
	private SeloggerFiles selfiles;
	private String targetDir;
	private static final String FILENAME = "varinfo.json";

	public CreateJson(SeloggerFiles selfiles, String dir) {
		this.selfiles = selfiles;
		this.targetDir = dir;
	}

	public void start() {
		System.out.println("Create json ...");
		List<Json> jsonList = create();
		ObjectMapper mapper = new ObjectMapper();

		//		Files.write(Paths.get(targetDir, FILENAME), jsonList, CREATE, WRITE, APPEND);
		try {
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
		} catch (IOException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
		}
	}

	private List<Json> create() {
		List<Json> jsonList = new ArrayList<>();

		String prevClassName = "";
		String prevMethodName = "";
		String prevLinenum = "";
		List<Json> tmpJsonList = new ArrayList<>();
		Map<String, Boolean> isPutMap = new HashMap<String, Boolean>();
		selfiles.getDataidMaps().getDataidVarMap().keySet()
				.stream()
				.sorted(Comparator.comparing(d -> Integer.parseInt(d)))
				.forEach(d -> {
					String className = selfiles.getDataidMaps().getDataidClassMap().get(d);
					String methodName = selfiles.getDataidMaps().getDataidMethodMap().get(d);
					String linenum = selfiles.getDataidMaps().getDataidLinenumMap().get(d);
					/*for count*/
					if (!(prevClassName.equals(className) && prevMethodName.equals(methodName)
							&& prevLinenum.equals(linenum))) {
						Map<String, Integer> countMap = new HashMap<>();
						tmpJsonList.forEach(json -> {
							if (countMap.containsKey(json.getVar())) {
								if (isPutMap.get(json.getVar())) {

									int isPutShift = isPutMap.get(json.getVar()) ? 1 : 0;
									json.setCount(countMap.get(json.getVar()) + 1 + isPutShift);
									countMap.put(json.getVar(), countMap.get(json.getVar()) + 1);
								}
							} else {
								int isPutShift = isPutMap.get(json.getVar()) ? 1 : 0;
								json.setCount(1 + isPutShift);
								countMap.put(json.getVar(), 1);
							}

							jsonList.add(json);
						});
						tmpJsonList.clear();
						isPutMap.clear();
					}
					FieldInfo fieldInfo = selfiles.getDataidMaps().getDataidVarMap().get(d);
					String var = fieldInfo.getFieldname();

					Json json = new Json();
					json.setDataid(d);
					json.setClassName(className);
					json.setMethodName(methodName);
					json.setVar(var);
					json.setLinenum(linenum);
					setValueList(json, d);
					if (isPutMap.containsKey(var)) {
						isPutMap.put(var, fieldInfo.getisPut() || isPutMap.get(var));

					} else {
						isPutMap.put(var, fieldInfo.getisPut());
					}
					tmpJsonList.add(json);
				});
		tmpJsonList.forEach(json -> {
			jsonList.add(json);
		});
		tmpJsonList.clear();

		return jsonList;
	}

	private void setValueList(Json json, String d) {
		List<Recentdata> valueList = new ArrayList<Recentdata>();
		Map<String, List<Recentdata>> recdatamap = selfiles.getDataidMaps().getDataidRecentdataMap();
		valueList = recdatamap.get(d);
		json.setValueList(valueList);

	}
	//
	//	private class countInfo {
	//		int count;
	//		boolean isContainPut;
	//
	//		public countInfo(int count, boolean isContainPut) {
	//			this.count = count;
	//			this.isContainPut = isContainPut;
	//		}
	//
	//		public int getCount() {
	//			return count;
	//		}
	//
	//		public void setCount(int count) {
	//			this.count = count;
	//		}
	//
	//		public boolean isContainPut() {
	//			return isContainPut;
	//		}
	//
	//		public void setContainPut(boolean isContainPut) {
	//			this.isContainPut = isContainPut;
	//		}
	//	}

}
