package data;

import java.util.ArrayList;
import java.util.List;

public class DataIdVar {
	private String var;
	private Integer count;
	private List<DataID> dataidlist = new ArrayList<>();;

	public DataIdVar(String var, Integer count, List<DataID> dataidlist) {
		this.var = var;
		this.count = count;
		this.dataidlist = dataidlist;
	}

	public String getVar() {
		return var;
	}

	public Integer getCount() {
		return count;
	}

	public List<DataID> getDataIDList() {
		return dataidlist;
	}

}
