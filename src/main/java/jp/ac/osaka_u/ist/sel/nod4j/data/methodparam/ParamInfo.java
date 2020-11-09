package jp.ac.osaka_u.ist.sel.nod4j.data.methodparam;

class ParamInfo {
	/**
	 * The method name which the parameter contains.
	 */
	private String methodName;
	/**
	 * The name of parameter variable
	 */
	private String argumentName;
	/**
	 * The type of the variable
	 */
	private String type;
	/**
	 * The line number of the variable
	 */
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