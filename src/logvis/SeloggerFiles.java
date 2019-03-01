package logvis;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class SeloggerFiles {

	String recentdata;
	String dataids;
	String methods;
	List<String> linesRecentdata= new ArrayList<>();;
	List<String> linesDataids= new ArrayList<>();;
	List<String> linesMethods= new ArrayList<>();;

	public SeloggerFiles(String recentdata, String dataids, String methods) {
		this.recentdata = recentdata;
		this.dataids = dataids;
		this.methods = methods;
	}

	/**
	 * SELoggerファイルをStringのリストにする
	 * @param recentdata
	 * @param dataids
	 * @param methods
	 * @throws IOException
	 */
	public void getAllFileLines(String recentdata, String dataids, String methods) throws IOException {
		this.linesRecentdata = Files.readAllLines(Paths.get(recentdata), StandardCharsets.UTF_8);
		this.linesDataids = Files.readAllLines(Paths.get(dataids), StandardCharsets.UTF_8);
		this.linesMethods = Files.readAllLines(Paths.get(methods), StandardCharsets.UTF_8);
	}

	public void getRecentdataLines(String recentdata) throws IOException {
		this.linesRecentdata = Files.readAllLines(Paths.get(recentdata), StandardCharsets.UTF_8);
	}

	public void getDataidsLines(String dataids) throws IOException {
		this.linesDataids = Files.readAllLines(Paths.get(dataids), StandardCharsets.UTF_8);
	}

	public void getMethodsLines(String methods) throws IOException {
		this.linesMethods = Files.readAllLines(Paths.get(methods), StandardCharsets.UTF_8);
	}



}
