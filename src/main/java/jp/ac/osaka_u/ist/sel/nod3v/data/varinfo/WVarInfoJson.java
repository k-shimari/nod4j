package jp.ac.osaka_u.ist.sel.nod3v.data.varinfo;

import java.util.List;


/**
 * This class for format of output json.
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
