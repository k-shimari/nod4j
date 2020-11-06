package jp.ac.osaka_u.ist.sel.nod4j.data.varinfo;

import java.util.List;

import jp.ac.osaka_u.ist.sel.nod4j.data.Recentdata;

/**
 * The data for varinfo.json.
 * @author k-simari
 *
 */
public class VarInfoJson {
	/**
	 * The id of the instruction in the source code, which is unique each location.
	 */
	private String dataid;
	/**
	 * Filename which contains the specific instrcution
	 */
	private String className;
	/**
	 * Methodname which contains the specific instrcution
	 */
	private String methodName;
	/**
	 * The variable name
	 */
	private String var;
	/**
	 * The line number of the variable
	 */
	private String linenum;
	/**
	 * The instruction (assignment or reference) of the varibale
	 */
	private String inst;
	/**
	 * This is the counter which shows how many times the specific variable appears in a line.
	 */
	private int count;
	/**
	 * The valueList of the specific variable
	 */
	private List<Recentdata> valueList;

	public VarInfoJson(String dataid, String className, String methodName, String var, String linenum, String inst) {
		this.dataid = dataid;
		this.className = className;
		this.methodName = methodName;
		this.var = var;
		this.linenum = linenum;
		this.inst = inst;
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

	public String getInst() {
		return inst;
	}

	public void setInst(String inst) {
		this.inst = inst;
	}
}
