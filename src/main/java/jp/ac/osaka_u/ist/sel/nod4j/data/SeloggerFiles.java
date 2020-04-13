package jp.ac.osaka_u.ist.sel.nod4j.data;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import jp.ac.osaka_u.ist.sel.nod4j.data.methodparam.MethodParam;

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

	public SeloggerFiles(String projectDir, String traceDir) {
		try {
			this.linesRecentdata = Files.readAllLines(Paths.get(traceDir, "recentdata.txt"));
			this.linesMethods = Files.readAllLines(Paths.get(traceDir, "methods.txt"));
			this.dataidMaps = new DataIdMaps();

			dataidMaps.createNameMap(linesMethods);
			this.linesDataids = setLineDataids(projectDir, traceDir);
			dataidMaps.createMap(linesDataids, linesMethods, linesRecentdata);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private List<String> setLineDataids(String projectDir, String traceDir) throws IOException {
		MethodParam m = new MethodParam(projectDir, traceDir, dataidMaps.getClassIDClassMap());
		List<String> list = m.getLineDataids();
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
