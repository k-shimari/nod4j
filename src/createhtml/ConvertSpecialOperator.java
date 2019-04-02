package createhtml;

import java.util.List;
import java.util.Map;

import data.FileLineDataId;

public class ConvertSpecialOperator {
	public String convertspecialoperators(String line, Map<FileLineDataId, List<String>> linevarMap,
			FileLineDataId fldata) {

		String operator[]= {"++","--","+=","-=","*="};
		for(String ope:operator) {
			if(line.contains(ope)){
				line=convertspecialoperator(line, linevarMap, fldata,ope);
			}
		}
		return line;
	}

	/*++などが入ってる行を,dataidの値の記録数と合わせるため置換する*/
	private String convertspecialoperator(String line, Map<FileLineDataId, List<String>> linevarMap,
			FileLineDataId fldata,String operator){

		if(linevarMap.get(fldata)!=null &&!linevarMap.get(fldata).isEmpty()) {
			int minindex=999;
			/*その行に登場する変数のうち一番先頭にあるものを検索*/
			String replacevar="";
			int index=0;
			for(String var : linevarMap.get(fldata)) {
				if(line.indexOf(var) < line.indexOf(operator) && ((line.indexOf(operator))-line.indexOf(var))<minindex )  {
					replacevar=var;
					index=line.indexOf(var);
				}
			}
			String s = replaceSpecialOperator(replacevar,operator);

			StringBuilder sb = new StringBuilder(line);
			sb.replace(index, line.indexOf(operator)+2 , s);
			line=sb.toString();
		}
		return line;
	}


	private String replaceSpecialOperator(String replacevar, String operator) {
		String s="";
		switch(operator){
		case "++":
			s="$$$ "+replacevar + " = "+ replacevar + " + 1 $$$";
			break;
		case "--":
			s="$$$ "+replacevar + " = "+ replacevar + " - 1 $$$";
			break;
		case "+=":
			s="$$$ "+replacevar + " = "+ replacevar + " +  $$$";
			break;
		case "-=":
			s="$$$ "+replacevar + " = "+ replacevar + " -  $$$";
			break;
		case "*=":
			s="$$$ "+replacevar + " = "+ replacevar + " *  $$$";
			break;
		}
		return s;
	}
}
