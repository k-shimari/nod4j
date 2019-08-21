package createjson;

import java.util.List;
import java.util.Map;

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
