package jp.ac.osaka_u.ist.sel.nod4j.data.varinfo;

import java.util.List;


/**
 * This is the class for specifying the format of output json.
 * @author k-simari
 *
 */
public class WVarInfoJson {
	List<VarInfoJson> recentdata;

	public WVarInfoJson(List<VarInfoJson> recentdata) {
		this.recentdata = recentdata;
	}

	public List<VarInfoJson> getRecentdata() {
		return recentdata;
	}
}
