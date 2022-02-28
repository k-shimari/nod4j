package jp.ac.osaka_u.ist.sel.nod4j.data.methodparam;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

class ParamInfo {

	private Map<String, Queue<ParamInfoInner>> methods = new HashMap<>();

	public void put(String methodName, String argumentName, String type, int line) {
		Queue<ParamInfoInner> params = methods.getOrDefault(methodName, new LinkedList<>());
		params.add(new ParamInfoInner(argumentName, type, line));
		methods.put(methodName, params);
	}

	public ParamInfoInner get(String methodName) {
		Queue<ParamInfoInner> params = methods.get(methodName);
		if (params != null) {
			return params.poll();
		} else {
			return null;
		}
	}

	class ParamInfoInner {
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

		public ParamInfoInner(String argumentName, String type, int line) {
			this.argumentName = argumentName;
			this.type = type;
			this.line = line;
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
}