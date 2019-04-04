package createhtml;

import java.util.Collections;
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
			String replacestr = "</li><li class=\"menu__single\"><a href=\"#\" >" + minvar
					+ "</a><ul class=\"menu__second-level\">";
			replacestr+=addRecentdata(recentdatalist);
			replacestr += "</ul></li>";
			return replacestr;
		}
	}

	private String addRecentdata(List<Recentdata> recentdatalist) {
		String str="";
		Collections.reverse(recentdatalist);
		for (Recentdata r : recentdatalist) {
			str += getli(r.getData());
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

	private String getli(String val) {
		return "<li><a href=\"#\"> " + val + " </a></li>";
	}

	private String getli(int val) {
		return "<li><a href=\"#\"> " + Integer.toString(val) + " </a></li>";
	}
}
