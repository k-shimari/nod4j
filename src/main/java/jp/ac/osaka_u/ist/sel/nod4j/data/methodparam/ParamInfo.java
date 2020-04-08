package jp.ac.osaka_u.ist.sel.nod4j.data.methodparam;

class ParamInfo {
	private String methodName;
	private String argumentName;
	private String type;
	private int line;

	public ParamInfo(String methodName, String argumentName, String type, int line) {
		this.methodName = methodName;
		this.argumentName = argumentName;
		this.type = type;
		this.line = line;
	}

	public String getMethodName() {
		return methodName;
	}

	public String getArgumentName() {
		return argumentName;
	}

	public String getType() {
		return type;
	}

	public int getLine() {
		return line;
	}
}