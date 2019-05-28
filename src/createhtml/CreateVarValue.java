package createhtml;

import java.util.List;

import data.DataIdVar;
import data.Recentdata;
import data.SeloggerFiles;

public class CreateVarValue {
	private SeloggerFiles selfiles;

	public CreateVarValue(SeloggerFiles selfiles) {
		this.selfiles = selfiles;
	}

	public String createReplacestr(String minvar, DataIdVar dvar, boolean isPut) {
		String dataid = setDataID(dvar, isPut);
		List<Recentdata> recentdatalist = selfiles.getRecentDataMap().get(dataid);
		if(recentdatalist==null) {
			return "<span style=\"background-color:#ffcc99\">"+minvar+"</span>";
		}
		else {
			String replacestr = "</li><li class=\"menu__single\">"
					+ "<a class=\"var\">"
					+ minvar
					+ "</a>"
					+ "<ul class=\"menu__second-level\">";
			replacestr+=addRecentdata(recentdatalist);
			replacestr += "</ul></li>";

			//replacestr =  replacestr.replace("<", "&lt;");
			//replacestr =  replacestr.replace(">", "&gt;");
			//replacestr =  replacestr.replace("&", "&amp;");
			//replacestr =  replacestr.replace("\"", "&quot;");
			//replacestr =  replacestr.replace("'", "&#39;");
			replacestr =  replacestr.replace("$", "&#36;");
			return replacestr;
		}
	}

	private String addRecentdata(List<Recentdata> recentdatalist) {
		String str="";
		/*上を古くするか新しくするか*/
		//Collections.reverse(recentdatalist);
		for (Recentdata r : recentdatalist) {
			str += getli(r.getData(), r.getTimestamp());
		}
		return str;
	}



	private String setDataID(DataIdVar dvar, boolean isPut) {
		String dataid;
		if (isPut) {
			dataid = dvar.getDataIDList().get(dvar.getDataIDList().size() - 1).getDataid();
		} else {
			dataid = dvar.getDataIDList().get(0).getDataid();
		}
		return dataid;
	}

	private String getli(String val, String timestamp) {
		return "<li class=\"varvalue\" id=\""+ timestamp+ "\">"
				+"<input name=\"start\" class=\"filterstart\" id=\"" + timestamp + "\" type=\"radio\" onclick=\"changefilterstart(this)\">"
				//	+ "<a href=\"#\"> "
				+ val
				//	+ " </a>"
				+"<input name=\"end\" class=\"filterend\" id=\"" + timestamp + "\" type=\"radio\" onclick=\"changefilterend(this)\">"
				+ "</li>";
	}
}
