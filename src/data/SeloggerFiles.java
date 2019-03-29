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

	String recentdata;
	String dataids;
	String methods;
	List<String> linesRecentdata= new ArrayList<>();
	List<String> linesDataids= new ArrayList<>();
	List<String> linesMethods= new ArrayList<>();


	/*ファイル・行に対する変数のリスト*/
	Map<FileLineDataId,DataIdVar> varMap=new HashMap<>();

	private static final int FIELDNAMEINDEX=10;

	public SeloggerFiles(String recentdata, String dataids, String methods) {
		this.recentdata = recentdata;
		this.dataids = dataids;
		this.methods = methods;

		CreateDataIdVarMap();
		try {
			this.linesRecentdata = Files.readAllLines(Paths.get(recentdata), StandardCharsets.UTF_8);
			this.linesDataids = Files.readAllLines(Paths.get(dataids), StandardCharsets.UTF_8);
			this.linesMethods = Files.readAllLines(Paths.get(methods), StandardCharsets.UTF_8);
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
			else {
				fieldname=elemdat[9].substring(FIELDNAMEINDEX);
			}

			/*ファイル・行に対する変数のリストを更新 or 生成*/
			if(varMap.get(new FileLineDataId(elemdat[1],elemdat[3]))!=null) {
				DataIdVar tmpdvar =varMap.get(new FileLineDataId(elemdat[1],elemdat[3]));
				int count = tmpdvar.getCount()+1;
				varMap.put(new FileLineDataId(elemdat[1],elemdat[3]),new DataIdVar(fieldname,count));
			}
			else {
				varMap.put(new FileLineDataId(elemdat[1],elemdat[3]),new DataIdVar(fieldname,1));
			}


		}
	}



}
