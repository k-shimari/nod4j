package jp.ac.osaka_u.ist.sel.nod4j;

import jp.ac.osaka_u.ist.sel.nod4j.createjson.StartJson;
import jp.ac.osaka_u.ist.sel.nod4j.data.SeloggerFiles;

public class Main {

	/**
	 * This is the main function of this project.
	 * @param args[0]: The path to the target directory of near-omniscient debugging
	 * @param args[1]: The directory which contains the execution trace of the project
	 * @param args[2]: output destination
	 */
	public static void main(String[] args) {
		if (args.length == 0) {
			System.err.println("Set target dircetory as argument.");
			System.exit(1);
		}

		String projectDir = args[0];
		String traceDir = args[1];
		String outputDir = args[2];
		SeloggerFiles selFiles = new SeloggerFiles(projectDir, traceDir);
		StartJson cre = new StartJson(selFiles, projectDir, outputDir);
		cre.start();
	}
}
