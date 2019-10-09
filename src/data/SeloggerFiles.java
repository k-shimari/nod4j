package data;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import data.methodparam.MethodParam;

public class SeloggerFiles {

	private List<String> linesRecentdata = new ArrayList<>();
	private List<String> linesDataids = new ArrayList<>();
	private List<String> linesMethods = new ArrayList<>();
	private DataIdMaps dataidMaps;

	public SeloggerFiles(String dir) {
		try {
			this.linesRecentdata = Files.readAllLines(Paths.get(dir, "selogger", "recentdata.txt"));
			this.linesDataids = setLineDataids(dir);
			this.linesMethods = Files.readAllLines(Paths.get(dir, "selogger", "methods.txt"));
			this.dataidMaps = new DataIdMaps();
			CreateMap();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private List<String> setLineDataids(String dir) throws IOException {
		/*TODO
		 * replace line number at method_param from 0 to acutal one*/

		MethodParam m = new MethodParam(dir);

		List<String> list = m.getLineDataids(dir);
		// List<String> list = Files.readAllLines(Paths.get(dir, "selogger", "dataids.txt"));

		return list;
	}

	private void CreateMap() {
		dataidMaps.createMap(linesDataids, linesMethods, linesRecentdata);
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
