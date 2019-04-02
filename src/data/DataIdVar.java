package data;

import java.util.ArrayList;
import java.util.List;

public class DataIdVar {
//	private String filename;
//	private Integer linenum;

	private String var;
	private Integer count;
	private List<String> dataidlist=new ArrayList<>();;
/*
	public DataIdVar(String filename, Integer linenum, String var, Integer count) {
		this.filename = filename;
		this.linenum = linenum;
		this.var = var;
		this.count = count;
	}
*/
	public DataIdVar(String var, Integer count, List<String> dataidlist) {
		this.var = var;
		this.count = count;
		this.dataidlist= dataidlist;
	}

/*
	public String getFilename() {
		return filename;
	}

	public Integer getLinenum() {
		return linenum;
	}
*/

	public String getVar() {
        return var;
    }

    public Integer getCount() {
        return count;
    }

    public List<String> getDataIDList() {
        return dataidlist;
    }
}
