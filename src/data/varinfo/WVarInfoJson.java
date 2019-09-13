package data.varinfo;

import java.util.List;

public class WVarInfoJson {

	List<VarInfoJson> recentdata;

	public WVarInfoJson(List<VarInfoJson> recentdata) {
		this.recentdata = recentdata;
	}

	public List<VarInfoJson> getRecentdata() {
		return recentdata;
	}

}
