package data;

import java.util.List;

public class Json {

	private String className;
	private String methodName;
	private String var;
	private String linenum;
	//private final String _countcomment = "その行で何回目の出現か(同じ変数が行内にあったときのみカウント+)";
	private int count;
	private List<Recentdata> valueList;

	public Json() {
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

	//	public String get_countcomment() {
	//		return _countcomment;
	//	}

}
