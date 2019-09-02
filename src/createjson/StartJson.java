package createjson;

import java.io.IOException;
import java.util.List;

import data.Json;
import data.SeloggerFiles;

public class StartJson {
	private SeloggerFiles selfiles;
	private String targetDir;
	private static final String FILENAME = "varinfo.json";

	public StartJson(SeloggerFiles selfiles, String dir) {
		this.selfiles = selfiles;
		this.targetDir = dir;
	}

	public void start() {
		System.out.println("Create json ...");
		CreateVarInfo cvi =new CreateVarInfo(selfiles);
		List<Json> jsonList = cvi.create();
		print(jsonList);




	}


	private void print(List<Json> jsonList) {
		try {
			PrintJson pj = new PrintJson(targetDir, FILENAME);
			pj.printJsonForDebug(jsonList);
			System.out.println("Create json SUCCESS at " + targetDir);
		} catch (IOException e) {
			System.err.println("Create json FAILED");
			e.printStackTrace();
		}
	}


}
