package data;

public class VarInfo {

	private String fieldname;
	private boolean isPut;
	private boolean isFail;

	public VarInfo() {
	}

	public VarInfo(String fieldname, boolean isPut, boolean isFail) {
		this.fieldname = fieldname;
		this.isPut = isPut;
		this.isFail = isFail;
	}

	public VarInfo(String elemdat[]) {
		if (elemdat[5].equals("GET_STATIC_FIELD") | elemdat[5].equals("PUT_STATIC_FIELD")) {
			this.fieldname = elemdat[8].substring("FieldName=".length());
			this.isPut = elemdat[5].equals("PUT_STATIC_FIELD");
			this.isFail = false;
		} else if (elemdat[5].equals("GET_INSTANCE_FIELD_RESULT")
				|| elemdat[5].equals("PUT_INSTANCE_FIELD_VALUE")) {
			this.fieldname = elemdat[9].substring("FieldName=".length());
			this.isPut = elemdat[5].equals("PUT_INSTANCE_FIELD_VALUE");
			this.isFail = false;
		} else if (elemdat[5].equals("LOCAL_STORE") || elemdat[5].equals("LOCAL_LOAD")) {
			this.fieldname = elemdat[8].substring("Name=".length());
			this.isPut = elemdat[5].equals("LOCAL_STORE");
			/*SELoggerの使用で局所変数で名前がないものが取れるので無視*/
			this.isFail = fieldname.equals("(Unavailable)");
		} else if (elemdat[5].equals("LOCAL_INCREMENT")) {
			/*TODO var=var+1の場合に記録命令が一つとなる*/
			this.fieldname = elemdat[9].substring("Name=".length());
			this.isPut = true;
			/*SELoggerの使用で局所変数で名前がないものが取れるので無視*/
			this.isFail = fieldname.equals("(Unavailable)");
		} else {
			/*命令がない時は失敗*/
			this.fieldname = "";
			this.isPut = false;
			this.isFail = true;
		}
	}

	public String getFieldname() {
		return fieldname;
	}

	public boolean getisPut() {
		return isPut;
	}

	public boolean getisFail() {
		return isFail;
	}
}
