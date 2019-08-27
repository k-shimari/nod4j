package data;

import java.util.List;

public class Json {

	private String dataid;
	private String className;
	private String methodName;
	private String var;
	private String linenum;
	private boolean isPut;
	/*appearance count of each var in a line*/
	private int count;
	private List<Recentdata> valueList;

	public Json() {
	}

	public Json(String dataid, String className, String methodName, String var, String linenum, boolean isPut) {
		this.dataid = dataid;
		this.className = className;
		this.methodName = methodName;
		this.var = var;
		this.linenum = linenum;
		this.isPut = isPut;
	}

	public String getDataid() {
		return dataid;
	}

	public void setDataid(String dataid) {
		this.dataid = dataid;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	public String getVar() {
		return var;
	}

	public void setVar(String var) {
		this.var = var;
	}

	public String getLinenum() {
		return linenum;
	}

	public void setLinenum(String linenum) {
		this.linenum = linenum;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public List<Recentdata> getValueList() {
		return valueList;
	}

	public void setValueList(List<Recentdata> valueList) {
		this.valueList = valueList;
	}

	public boolean getIsPut() {
		return isPut;
	}

	public void setIsPut(boolean isPut) {
		this.isPut = isPut;
	}
}
