package createjson;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
		Json json = create();

		// @TODO print とか
		System.out.println(json);

	}

	private Json create() {
		Json json = new Json();

		setClassName(json);
		setMethodName(json);
		setVar(json);
		setLinenum(json);
		setCount(json);
		setValueList(json);
		return json;
	}

	private void setClassName(Json json) {
		// @TODO
		String className = "hogehoge.java";
		json.setClassName(className);

	}

	private void setMethodName(Json json) {
		// @TODO
		String methodName = "fuga";
		json.setMethodName(methodName);
	}

	private void setVar(Json json) {
		// @TODO
		String var = "var";
		json.setVar(var);
	}

	private void setLinenum(Json json) {
		// @TODO
		int linenum =100;
		json.setLinenum(linenum);

	}

	private void setCount(Json json) {
		// @TODO
		int count = 1;
		json.setCount(count);
	}

	private void setValueList(Json json) {
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
