package data;

public class VarInfo {

	private String fieldname;
	private String inst;
	private boolean isFail;

	/* length of "FIELDNAME=" and "NAME=" */
	private static final int FIELDNAMEINDEX = 10;
	private static final int NAMEINDEX = 5;

	public VarInfo() {
	}

	public VarInfo(String fieldname, String inst, boolean isFail) {
		this.fieldname = fieldname;
		this.inst = inst;
		this.isFail = isFail;
	}

	public VarInfo(String elemdat[]) {
		if (elemdat[5].equals("GET_STATIC_FIELD") | elemdat[5].equals("PUT_STATIC_FIELD")) {
			this.fieldname = elemdat[8].substring(FIELDNAMEINDEX);
			this.inst = elemdat[5].equals("PUT_STATIC_FIELD") ? "P" : "G";
			this.isFail = false;
		} else if (elemdat[5].equals("GET_INSTANCE_FIELD_RESULT")
				|| elemdat[5].equals("PUT_INSTANCE_FIELD_VALUE")) {
			this.fieldname = elemdat[9].substring(FIELDNAMEINDEX);
			this.inst = elemdat[5].equals("PUT_INSTANCE_FIELD_VALUE") ? "P" : "G";
			this.isFail = false;
		} else if (elemdat[5].equals("LOCAL_STORE") || elemdat[5].equals("LOCAL_LOAD")) {
			this.fieldname = elemdat[8].substring(NAMEINDEX);
			this.inst = elemdat[5].equals("LOCAL_STORE") ? "P" : "G";
			/*SELoggerの使用で局所変数で名前がないものが取れるので無視*/
			this.isFail = fieldname.equals("(Unavailable)");
		} else if (elemdat[5].equals("LOCAL_INCREMENT")) {
			/*TODO var=var+1の場合に記録命令が一つとなる*/
			this.fieldname = elemdat[9].substring(NAMEINDEX);
			this.inst = "I";
			/*SELoggerの使用で局所変数で名前がないものが取れるので無視*/
			this.isFail = fieldname.equals("(Unavailable)");
		} else {
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
