package jp.ac.osaka_u.ist.sel.nod4j.createjson;

import java.io.IOException;

import jp.ac.osaka_u.ist.sel.nod4j.data.SeloggerFiles;

/**
 * This class calls the module which creates varInfo.json and fileInfo.json, and prints them.
 * @author k-simari
 */
public class StartJson {
	/**
	 * information about execution trace
	 */
	private SeloggerFiles selFiles;
	/**
	 * The target directory of near-omniscient debugging.
	 */
	private String projectDir;
	/**
	 * The name of the output directory of the json file.
	 */
	private String outputDir;
	/**
	 * The name of output files.
	 */
	private static final String VARINFO_FILENAME = "varinfo.json";
	private static final String FILEINFO_FILENAME = "fileinfo.json";

	public StartJson(SeloggerFiles selFiles, String projectDir, String outputDir) {
		this.selFiles = selFiles;
		this.projectDir = projectDir;
		this.outputDir = outputDir;
	}

	/**
	 * This method calls startJson to create "fileinfo.json" and "varinfo.json".
	 */
	public void start() {
		System.out.println("Create json ...");
		startJson(new CreateStructure(projectDir), FILEINFO_FILENAME);
		startJson(new CreateVarInfo(selFiles), VARINFO_FILENAME);
	}

	/**
	 *
	 * @param cj is the function to create the json object from the execution trace.
	 * @param filename is the name of the output json file (varinfo.json or fileinfo.json).
	 */
	private void startJson(ICreateJson cj, String filename) {
		Object json = cj.create();
		print(json, filename);
	}

	/**
	 * This function calls a method to output json file.
	 * @param json is json object to print the result.
	 * @param filename is the name of the output json file (varinfo.json or fileinfo.json).
	 */
	private void print(Object json, String filename) {
		try {
			PrintJson pj = new PrintJson(outputDir, filename);
			pj.printJson(json);
			//pj.printJsonForDebug(jsonList);
			System.out.println("Create json SUCCESS at " + outputDir);
		} catch (IOException e) {
			System.err.println("Create json FAILED");
			e.printStackTrace();
		}
	}

}
