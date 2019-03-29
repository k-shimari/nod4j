package data;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SeloggerFiles {


	private List<String> linesRecentdata= new ArrayList<>();
	private List<String> linesDataids= new ArrayList<>();
	private List<String> linesMethods= new ArrayList<>();

	/*ファイル・行・変数に対する変数のリスト*/
	private Map<FileLineDataId,List<String>> linevarMap=new HashMap<>();
	/*ファイル・行・変数に対する変数・出現回数・のリスト*/
	private Map<FileLineVarDataId,DataIdVar> linevardetailMap=new HashMap<>();

	private Map<String,String>fileIDMap = new HashMap<>();




	private static final int FIELDNAMEINDEX=10;

	public SeloggerFiles(String recentdata, String dataids, String methods) {
		try {
			this.linesRecentdata = Files.readAllLines(Paths.get(recentdata), StandardCharsets.UTF_8);
			this.linesDataids = Files.readAllLines(Paths.get(dataids), StandardCharsets.UTF_8);
			this.linesMethods = Files.readAllLines(Paths.get(methods), StandardCharsets.UTF_8);
			CreateDataIdVarMap();
			CreateFileIDMap();

			for (FileLineDataId key : linevarMap.keySet()) {
			    System.out.println(key + " => " + linevarMap.get(key));
			}
		/*
		  	for (String key : fileIDMap.keySet()) {
			    System.out.println(key + " => " + fileIDMap.get(key));
			}

			for (FileLineVarDataId key : linevardetailMap.keySet()) {
			    System.out.println(key + " => " + linevardetailMap.get(key));
			}
*/

		}
		catch (IOException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
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

	public Map<String,String> getFileIDMap() {
		return fileIDMap;
	}


	/**methods.txtをもとに，ファイルに対するそのIDを返すMapを作成
	 *
	 */
	private void CreateFileIDMap() {
		for(String line :this.linesMethods) {
			String ele[]=line.split(",");
			fileIDMap.put(ele[6], ele[0]);
		}
	}




	/**dataids.txtのファイルと行をキーとして，変数とその登場回数(CreateVarList)が入ったMapを作成
	 *
	 */
	private void CreateDataIdVarMap() {
		for(String linedat :this.linesDataids) {
			if(!linedat.contains("FieldName")) continue;
			String elemdat[]=linedat.split(",");
			String fieldname;
			if(elemdat[5].contains("STATIC")) {
				fieldname=elemdat[8].substring(FIELDNAMEINDEX);
			}
			else if(elemdat[5].contains("INSTANCE_FIELD_RESULT")){
				fieldname=elemdat[9].substring(FIELDNAMEINDEX);
			}
			else {
				continue;
			}

			/*ファイル・行に対する変数のリスト,変数の詳細リストを更新 or 生成*/
			if(linevarMap.get(new FileLineDataId(elemdat[1],elemdat[3]))!=null) {
				/*変数がすでにその行にあるかどうか確認*/
				if(linevardetailMap.containsKey(new FileLineVarDataId(elemdat[1],elemdat[3],fieldname))) {
					DataIdVar tmpdvar =linevardetailMap.get(new FileLineVarDataId(elemdat[1],elemdat[3],fieldname));
					Integer count=new Integer(tmpdvar.getCount().intValue()+1);
					linevardetailMap.put(new FileLineVarDataId(elemdat[1],elemdat[3],fieldname),new DataIdVar(fieldname,count));
				}
				else {

					List<String> tmplist=linevarMap.get(new FileLineDataId(elemdat[1],elemdat[3]));
					tmplist.add(fieldname);
					linevarMap.put(new FileLineDataId(elemdat[1],elemdat[3]),tmplist);
					linevardetailMap.put(new FileLineVarDataId(elemdat[1],elemdat[3],fieldname),new DataIdVar(fieldname,1));
				}
			}
			else {
				List<String> tmplist = new ArrayList<>();
				tmplist.add(fieldname);
				linevarMap.put(new FileLineDataId(elemdat[1],elemdat[3]),tmplist);
				linevardetailMap.put(new FileLineVarDataId(elemdat[1],elemdat[3],fieldname),new DataIdVar(fieldname,1));
			}


		}
	}



}
