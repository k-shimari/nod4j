package createjson;

import java.io.IOException;

import data.SeloggerFiles;

public class StartJson {
	private SeloggerFiles selFiles;
	private String targetDir;
	private static final String VARINFO_FILENAME = "varinfo.json";
	private static final String FILEINFO_FILENAME = "fileinfo.json";

	public StartJson(SeloggerFiles selFiles, String dir) {
		this.selFiles = selFiles;
		this.targetDir = dir;
	}

	public void start() {
		System.out.println("Create json ...");
		startJson(new CreateStructure(targetDir + "/project"), FILEINFO_FILENAME);
		startJson(new CreateVarInfo(selFiles), VARINFO_FILENAME);
	}

	private void startJson(ICreateJson cj, String filename) {
		Object json = cj.create();
		print(json, filename);
	}

	private void print(Object json, String filename) {
		try {
			PrintJson pj = new PrintJson(targetDir, filename);
			pj.printJson(json);
			//pj.printJsonForDebug(jsonList);
			System.out.println("Create json SUCCESS at " + targetDir);
		} catch (IOException e) {
			System.err.println("Create json FAILED");
			e.printStackTrace();
		}
	}

}
