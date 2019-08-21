package createjson;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import data.Json;
import data.Recentdata;
import data.SeloggerFiles;

public class CreateJson {
	private SeloggerFiles selfiles;
	private String targetDir;

	public CreateJson(SeloggerFiles selfiles, String dir) {
		this.selfiles = selfiles;
		this.targetDir = dir;
	}

	public void start() {
		System.out.println("Create json ...");
		List<Json> jsonList = create();
		ObjectMapper mapper = new ObjectMapper();
		// @TODO print とか
		jsonList.forEach(s -> {
			try {
				String json = mapper.writeValueAsString(s);
				System.out.println(json);
			} catch (JsonProcessingException e) {
				// TODO 自動生成された catch ブロック
				e.printStackTrace();
			}

		});

	}

	private List<Json> create() {
		List<Json> jsonList = new ArrayList<>();

		selfiles.getDataidMaps().getDataidVarMap().keySet()
				.stream()
				.sorted(Comparator.comparing(d -> Integer.parseInt(d)))
				.forEach(d -> {
					Json json = new Json();
					setDataid(json, d);
					setClassName(json, d);
					setMethodName(json, d);
					setVar(json, d);
					setLinenum(json, d);
					setCount(json, d);
					setValueList(json, d);
					jsonList.add(json);
				});
		return jsonList;
	}

	private void setDataid(Json json, String d) {
		json.setDataid(d);
	}

	private void setClassName(Json json, String d) {
		String className = selfiles.getDataidMaps().getDataidClassMap().get(d);
		json.setClassName(className);

	}

	private void setMethodName(Json json, String d) {
		String methodName = selfiles.getDataidMaps().getDataidMethodMap().get(d);
		json.setMethodName(methodName);
	}

	private void setVar(Json json, String d) {
		String var = selfiles.getDataidMaps().getDataidVarMap().get(d);
		json.setVar(var);
	}

	private void setLinenum(Json json, String d) {
		String linenum = selfiles.getDataidMaps().getDataidLinenumMap().get(d);
		json.setLinenum(linenum);

	}

	private void setCount(Json json, String d) {
		int count = 1;

		json.setCount(count);
	}

	private void setValueList(Json json, String d) {
		// @TODO
		List<Recentdata> valueList = new ArrayList<Recentdata>();

		json.setValueList(valueList);

	}

	private void getRecentdata() {
		Map<String, List<Recentdata>> recdatamap = selfiles.getRecentDataMap();
		recdatamap.keySet()
				.stream()
				.sorted()
				.forEach(s -> {
					System.out.println(s + ":");
					recdatamap.get(s).forEach(
							t -> System.out.println(t.getData() + "," + t.getThread() + "," + t.getTimestamp()));
					System.out.println();
				});

	}

}
