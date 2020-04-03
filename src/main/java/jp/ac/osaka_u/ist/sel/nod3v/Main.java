package jp.ac.osaka_u.ist.sel.nod3v;

import jp.ac.osaka_u.ist.sel.nod3v.createjson.StartJson;
import jp.ac.osaka_u.ist.sel.nod3v.data.SeloggerFiles;

public class Main {

	/**
	 * @param args[0] = target directory of near-omniscient debugging
	 */
	public static void main(String[] args) {
		if(args.length==0) {
			System.err.println("Set target dircetory as argument.");
			System.exit(1);
		}
		String dir = args[0];
		SeloggerFiles selFiles = new SeloggerFiles(args[0]);
		StartJson cre = new StartJson(selFiles, dir);
		cre.start();
	}
}
