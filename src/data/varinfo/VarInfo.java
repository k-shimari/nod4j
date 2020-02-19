package data.varinfo;

public class VarInfo {

	private String fieldname;
	private String inst;
	private boolean isFail;

	/* length of "FIELDNAME=" and "NAME=" */
	private static final int FIELDNAMEINDEX = 10;
	private static final int PARAMNAMEINDEX = 10;
	private static final int NAMEINDEX = 5;
	private static final String NAMERETURN = "_return";
	private static final String ARRAYLOAD = "_arrayLoad";
	private static final String ARRAYSTORE = "_arrayStore";

	public VarInfo() {
	}

	public VarInfo(String fieldname, String inst, boolean isFail) {
		this.fieldname = fieldname;
		this.inst = inst;
		this.isFail = isFail;
	}

	public VarInfo(String[] elemdat) {
		switch(elemdat[5]) {
			case "GET_STATIC_FIELD":
			case "PUT_STATIC_FIELD":
				this.fieldname = elemdat[8].substring(FIELDNAMEINDEX);
				this.inst = elemdat[5].equals("PUT_STATIC_FIELD") ? "P" : "G";
				this.isFail = false;
				break;
			case "GET_INSTANCE_FIELD_RESULT":
			case  "PUT_INSTANCE_FIELD_VALUE":
				this.fieldname = elemdat[9].substring(FIELDNAMEINDEX);
				this.inst = elemdat[5].equals("PUT_INSTANCE_FIELD_VALUE") ? "P" : "G";
				this.isFail = false;
				break;
			case "LOCAL_STORE":
			case "LOCAL_LOAD":
				this.fieldname = elemdat[8].substring(NAMEINDEX);
				this.inst = elemdat[5].equals("LOCAL_STORE") ? "P" : "G";
				/*SELoggerの使用で局所変数で名前がないものが取れるので無視*/
				this.isFail = fieldname.equals("(Unavailable)");
				break;
			case "LOCAL_INCREMENT":
				/*TODO var=var+1の場合に記録命令が一つとなる*/
				this.fieldname = elemdat[9].substring(NAMEINDEX);
				this.inst = "I";
				/*SELoggerの使用で局所変数で名前がないものが取れるので無視*/
				this.isFail = fieldname.equals("(Unavailable)");
				break;
			case "METHOD_PARAM":
				if(elemdat[6].startsWith("ParamName=")) {
					/*use value processed in MethodParam.java*/
					this.fieldname = elemdat[6].substring(PARAMNAMEINDEX);
					this.inst = "G";
					this.isFail = false;
				}
				break;
		/*not for view but for logs*/
			case "ARRAY_LOAD_RESULT":
				this.fieldname = ARRAYLOAD;
				this.inst = "G";
				this.isFail = false;
				break;
			case "ARRAY_STORE_VALUE":
				/*use value processed in MethodParam.java*/
				this.fieldname = ARRAYSTORE;
				this.inst = "P";
				this.isFail = false;
				break;
			case "ARRAY_LENGTH_RESULT":
			case "CALL_RETURN":
				/*use value processed in MethodParam.java*/
				this.fieldname = NAMERETURN;
				this.inst = "G";
				this.isFail = false;
				break;
			default:
				/*命令がない時は失敗*/
				this.fieldname = "";
				this.inst = "";
				this.isFail = true;
		}
	}

	public String getFieldname() {
		return fieldname;
	}

	public String getInst() {
		return inst;
	}

	public boolean getisFail() {
		return isFail;
	}

}
