package data;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SeloggerFiles {

	private List<String> linesRecentdata = new ArrayList<>();
	private List<String> linesDataids = new ArrayList<>();
	private List<String> linesMethods = new ArrayList<>();

	/*ファイル・行・変数に対する変数のリスト*/
	private Map<FileLineDataId, List<String>> linevarMap = new HashMap<>();
	/*ファイル・行・変数に対する変数・出現回数・のリスト*/
	private Map<FileLineVarDataId, DataIdVar> linevardetailMap = new HashMap<>();

	private Map<String, String> fileIDMap = new HashMap<>();
	private Map<String, List<String>> dupfileIDMap = new HashMap<>();
	private List<String> fieldIDList = new ArrayList<>();


	private DataIdMaps dataidMaps;



	public SeloggerFiles(String dir) {
		try {
			this.linesRecentdata = Files.readAllLines(Paths.get(dir, "selogger", "recentdata.txt"));
			this.linesDataids = Files.readAllLines(Paths.get(dir, "selogger", "dataids.txt"));
			this.linesMethods = Files.readAllLines(Paths.get(dir, "selogger", "methods.txt"));
			this.dataidMaps = new DataIdMaps();
			CreateMap();

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void CreateMap() {
		CreateFileIDMap();
		dataidMaps.createMap(linesDataids, linesMethods,linesRecentdata);
	}



	/**methods.txtをもとに，ファイルに対するそのIDを返すMapを作成
	 *
	 */
	private void CreateFileIDMap() {
		for (String line : this.linesMethods) {
			String ele[] = line.split(",");
			if (ele.length > 6) {
				if (fileIDMap.containsKey(ele[6])) {
					/* internal class indicates same file, so separate*/
					List<String> list = new ArrayList<String>();
					if (dupfileIDMap.containsKey(ele[6])) {
						list = dupfileIDMap.get(ele[6]);
						list.add(ele[0]);
						dupfileIDMap.put(ele[6], list);
					} else {
						list.add(fileIDMap.get(ele[6]));
						list.add(ele[0]);
						dupfileIDMap.put(ele[6], list);
					}
				} else {
					fileIDMap.put(ele[6], ele[0]);
				}
			}
		}
	}





//	private void createlinevardetailMap(String fieldname, boolean isPut, String dataid, String fileID,
//			String linenum) {
//		fieldIDList.add(dataid);
//		/* ファイル・行に対する変数のリスト,変数の詳細リストを更新 or 生成*/
//		if (linevarMap.get(new FileLineDataId(fileID, linenum)) != null) {
//			/* 変数がすでにその行にあるかどうか確認*/
//			if (linevardetailMap.containsKey(new FileLineVarDataId(fileID, linenum, fieldname))) {
//				DataIdVar dvar = linevardetailMap.get(new FileLineVarDataId(fileID, linenum, fieldname));
//				Integer count = new Integer(dvar.getCount().intValue() + 1);
//				List<DataID> dataidlist = dvar.getDataIDList();
//				dataidlist.add(new DataID(dataid, isPut));
//				linevardetailMap.put(new FileLineVarDataId(fileID, linenum, fieldname),
//						new DataIdVar(fieldname, count, dataidlist));
//			} else {
//				List<String> varlist = linevarMap.get(new FileLineDataId(fileID, linenum));
//				varlist.add(fieldname);
//				linevarMap.put(new FileLineDataId(fileID, linenum), varlist);
//				List<DataID> dataidlist = new ArrayList<>();
//				dataidlist.add(new DataID(dataid, isPut));
//				linevardetailMap.put(new FileLineVarDataId(fileID, linenum, fieldname),
//						new DataIdVar(fieldname, 1, dataidlist));
//			}
//		} else {
//			List<String> varlist = new ArrayList<>();
//			varlist.add(fieldname);
//			linevarMap.put(new FileLineDataId(fileID, linenum), varlist);
//			List<DataID> dataidlist = new ArrayList<>();
//			dataidlist.add(new DataID(dataid, isPut));
//
//			linevardetailMap.put(new FileLineVarDataId(fileID, linenum, fieldname),
//					new DataIdVar(fieldname, 1, dataidlist));
//		}
//	}



	public List<String> getLinesRecentdata() {
		return linesRecentdata;
	}

	public List<String> getLinesDataids() {
		return linesDataids;
	}

	public List<String> getLinesMethods() {
		return linesMethods;
	}

	public Map<FileLineDataId, List<String>> getLineVarMap() {
		return linevarMap;
	}

	public Map<FileLineVarDataId, DataIdVar> getLineVarDetailMap() {
		return linevardetailMap;
	}

	public Map<String, String> getFileIDMap() {
		return fileIDMap;
	}

	public Map<String, List<String>> getdupFileIDMap() {
		return dupfileIDMap;
	}

	public DataIdMaps getDataidMaps() {
		return dataidMaps;
	}

}
