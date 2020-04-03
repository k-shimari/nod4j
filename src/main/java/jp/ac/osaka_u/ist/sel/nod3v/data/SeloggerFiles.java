package jp.ac.osaka_u.ist.sel.nod3v.data;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import jp.ac.osaka_u.ist.sel.nod3v.data.methodparam.MethodParam;

/**
 * create maps by selogger output
 * @author k-simari
 *
 */
public class SeloggerFiles {
	private List<String> linesRecentdata = new ArrayList<>();
	private List<String> linesDataids = new ArrayList<>();
	private List<String> linesMethods = new ArrayList<>();
	private DataIdMaps dataidMaps;

	public SeloggerFiles(String dir) {
		try {
			this.linesRecentdata = Files.readAllLines(Paths.get(dir, "selogger", "recentdata.txt"));
			this.linesMethods = Files.readAllLines(Paths.get(dir, "selogger", "methods.txt"));
			this.dataidMaps = new DataIdMaps();

			dataidMaps.createNameMap(linesMethods);
			this.linesDataids = setLineDataids(dir);
			dataidMaps.createMap(linesDataids, linesMethods, linesRecentdata);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private List<String> setLineDataids(String dir) throws IOException {
		/*TODO
		 * replace line number at method param from 0 to acutal one*/
		MethodParam m = new MethodParam(dir,dataidMaps.getClassIDClassMap());
		List<String> list = m.getLineDataids(dir);
		return list;
	}


	public List<String> getLinesRecentdata() {
		return linesRecentdata;
	}

	public List<String> getLinesDataids() {
		return linesDataids;
	}

	public List<String> getLinesMethods() {
		return linesMethods;
	}

	public DataIdMaps getDataidMaps() {
		return dataidMaps;
	}
}
