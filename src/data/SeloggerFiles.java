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
	private Map<String, List<Recentdata>> recentdataMap = new HashMap<>();

	private DataIdMaps dataidMaps;

	private static final int FIELDNAMEINDEX = 10;
	private static final int NAMEINDEX = 5;

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
		CreateDataIdVarMap();
		dataidMaps.createMap(linesDataids, linesMethods);
		CreateRecentDataMap();
	}

	/*

	*/
	/*dataid に recentdata(time,thread,data)のリストを対応付ける*/
	//TODO dataにStringで,が入った時の例外処理を作る
	private void CreateRecentDataMap() {
		for (String line : this.linesRecentdata) {
			String element[] = line.split(",");
			String dataid = element[0];
			List<Recentdata> list = new ArrayList<>();
			for (int i = 0; i < element.length / 3 - 1; i++) {
				list.add(new Recentdata(element[3 * i + 3], element[3 * i + 4], element[3 * i + 5]));
			}
			recentdataMap.put(dataid, list);
		}
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

	/**dataids.txtのファイルと行をキーとして，変数とその登場回数(CreateVarList)が入ったMapを作成
	 *
	 */
	private void CreateDataIdVarMap() {
		System.out.println(this.linesDataids.size());
		for (String linedat : this.linesDataids) {
			String elemdat[] = linedat.split(",");

			if (!linedat.contains("Name"))
				continue;
			/* fieldnameとそれがPUT命令かどうかを取得 */
			FieldInfo fi = getfi(elemdat);
			if (fi.getisFail())
				continue;
			String dataid = elemdat[0];
			dataidMaps.putDataIDVarMap(dataid, fi.getFieldname());
		}
	}

	private FieldInfo getfi(String elemdat[]) {
		FieldInfo fi;
		if (elemdat[5].equals("GET_STATIC_FIELD") | elemdat[5].equals("PUT_STATIC_FIELD")) {
			String fieldname = elemdat[8].substring(FIELDNAMEINDEX);
			boolean isPut = elemdat[5].contains("PUT");
			fi = new FieldInfo(fieldname, isPut, false);
		} else if (elemdat[5].equals("GET_INSTANCE_FIELD_RESULT")
				|| elemdat[5].equals("PUT_INSTANCE_FIELD_VALUE")) {
			String fieldname = elemdat[9].substring(FIELDNAMEINDEX);
			boolean isPut = elemdat[5].contains("PUT");
			fi = new FieldInfo(fieldname, isPut, false);
		} else if (elemdat[5].equals("LOCAL_STORE") || elemdat[5].equals("LOCAL_LOAD")) {
			String fieldname = elemdat[8].substring(NAMEINDEX);
			/*SELoggerの使用で局所変数で名前がないものが取れるので無視*/
			boolean isPut = elemdat[5].equals("LOCAL_STORE");
			fi = new FieldInfo(fieldname, isPut, fieldname.equals("(Unavailable)"));

		} else {
			/*命令がない時は失敗*/
			fi = new FieldInfo("", false, true);
		}
		return fi;
	}
//
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
//
	private class FieldInfo {
		private String fieldname;
		private boolean isPut;
		private boolean isFail;

		public FieldInfo(String fieldname, boolean isPut, boolean isFail) {
			this.fieldname = fieldname;
			this.isPut = isPut;
			this.isFail = isFail;
		}

		public String getFieldname() {
			return fieldname;
		}

		public boolean getisPut() {
			return isPut;
		}

		public boolean getisFail() {
			return isFail;
		}

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

	public Map<String, List<Recentdata>> getRecentDataMap() {
		return recentdataMap;
	}

	public DataIdMaps getDataidMaps() {
		return dataidMaps;
	}

}
