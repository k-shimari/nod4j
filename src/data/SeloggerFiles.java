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
	private List<String>fieldIDList = new ArrayList<>();
	private Map<String,List<Recentdata>>recentdataMap = new HashMap<>();



	private static final int FIELDNAMEINDEX=10;

	public SeloggerFiles(String recentdata, String dataids, String methods) {
		try {
			this.linesRecentdata = Files.readAllLines(Paths.get(recentdata), StandardCharsets.UTF_8);
			this.linesDataids = Files.readAllLines(Paths.get(dataids), StandardCharsets.UTF_8);
			this.linesMethods = Files.readAllLines(Paths.get(methods), StandardCharsets.UTF_8);
			CreateDataIdVarMap();
			CreateFileIDMap();


			CreateRecentDataMap();



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



	/*dataid に recentdata(time,thread,data)のリストを対応付ける*/
	private void CreateRecentDataMap() {
		for(String line :this.linesRecentdata) {
			String element[]=line.split(",");
			String dataid=element[0];
			List<Recentdata> list =new ArrayList<>();
			for (int i = 0; i < element.length / 3-1 ; i++) {
				list.add(new Recentdata(element[3*i+3], element[3*i+4], element[3*i+5]));
			}
			recentdataMap.put(dataid,list);
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
	public Map<String,List<Recentdata>> getRecentDataMap() {
		return recentdataMap;
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
			else if(elemdat[5].contains("GET_INSTANCE_FIELD_RESULT")||elemdat[5].contains("PUT_INSTANCE_FIELD_VALUE")){
				fieldname=elemdat[9].substring(FIELDNAMEINDEX);
			}
			else {
				continue;
			}

			/**/
			String dataid=elemdat[0];
			String filename=elemdat[1];
			String linenum=elemdat[3];

			fieldIDList.add(dataid);
			/*ファイル・行に対する変数のリスト,変数の詳細リストを更新 or 生成*/
			if(linevarMap.get(new FileLineDataId(filename,linenum))!=null) {
				/*変数がすでにその行にあるかどうか確認*/
				if(linevardetailMap.containsKey(new FileLineVarDataId(filename,linenum,fieldname))) {
					DataIdVar dvar =linevardetailMap.get(new FileLineVarDataId(filename,linenum,fieldname));
					Integer count=new Integer(dvar.getCount().intValue()+1);
					List<String> dataidlist= dvar.getDataIDList();
					dataidlist.add(dataid);
					linevardetailMap.put(new FileLineVarDataId(filename,linenum,fieldname),new DataIdVar(fieldname,count,dataidlist));
				}
				else {
					List<String> varlist=linevarMap.get(new FileLineDataId(filename,linenum));
					varlist.add(fieldname);
					linevarMap.put(new FileLineDataId(filename,linenum),varlist);
					List<String> dataidlist = new ArrayList<>();
					dataidlist.add(dataid);
					linevardetailMap.put(new FileLineVarDataId(filename,linenum,fieldname),new DataIdVar(fieldname,1,dataidlist));
				}
			}
			else {
				List<String> varlist = new ArrayList<>();
				varlist.add(fieldname);
				linevarMap.put(new FileLineDataId(filename,linenum),varlist);
				List<String> dataidlist = new ArrayList<>();
				dataidlist.add(dataid);
				linevardetailMap.put(new FileLineVarDataId(filename,linenum,fieldname),new DataIdVar(fieldname,1,dataidlist));
			}


		}
	}



}
