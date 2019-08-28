package logvis;

import createjson.CreateJson;
import data.SeloggerFiles;

public class Main {
	/**
	 * args[0] = targetdir
	 */
	public static void main(String args[]) {
		String dir = args[0];
		SeloggerFiles selfiles = new SeloggerFiles(args[0]);
		CreateJson cre = new CreateJson(selfiles, dir);
		cre.start();
	}
}
