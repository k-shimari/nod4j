package createjson;

import java.io.IOException;
import java.util.List;

import data.Json;
import data.SeloggerFiles;

public class StartJson {
	private SeloggerFiles selfiles;
	private String targetDir;
	private static final String VARINFO_FILENAME = "varinfo.json";
	private static final String FILEINFO_FILENAME = "fileinfo.json";

	public StartJson(SeloggerFiles selfiles, String dir) {
		this.selfiles = selfiles;
		this.targetDir = dir;
	}

	public void start() {
		System.out.println("Create json ...");

		startJson(new CreateVarInfo(selfiles), VARINFO_FILENAME);
		startJson(new CreateStructure(selfiles), FILEINFO_FILENAME);
	}

	private void startJson(ICreateJson cj, String filename) {
		List<Json> jsonList = cj.create();
		print(jsonList, filename);
	}

	private void print(List<Json> jsonList, String filename) {
		try {
			PrintJson pj = new PrintJson(targetDir, filename);
			pj.printJsonForDebug(jsonList);
			System.out.println("Create json SUCCESS at " + targetDir);
		} catch (IOException e) {
			System.err.println("Create json FAILED");
			e.printStackTrace();
		}
	}

}
