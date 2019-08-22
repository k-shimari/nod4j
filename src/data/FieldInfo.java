package data;

public class FieldInfo {

	private String fieldname;
	private boolean isPut;
	private boolean isFail;

	/* length of "FIELDNAME=" and "NAME=" */
	private static final int FIELDNAMEINDEX = 10;
	private static final int NAMEINDEX = 5;

	public FieldInfo() {
	}

	public FieldInfo(String fieldname, boolean isPut, boolean isFail) {
		this.fieldname = fieldname;
		this.isPut = isPut;
		this.isFail = isFail;
	}

	public FieldInfo (String elemdat[]) {
		if (elemdat[5].equals("GET_STATIC_FIELD") | elemdat[5].equals("PUT_STATIC_FIELD")) {
			this.fieldname=elemdat[8].substring(FIELDNAMEINDEX);
			this.isPut = elemdat[5].contains("PUT");
			this.isFail=false;
		} else if (elemdat[5].equals("GET_INSTANCE_FIELD_RESULT")
				|| elemdat[5].equals("PUT_INSTANCE_FIELD_VALUE")) {
			this.fieldname = elemdat[9].substring(FIELDNAMEINDEX);
			this.isPut = elemdat[5].contains("PUT");
			this.isFail=false;
		} else if (elemdat[5].equals("LOCAL_STORE") || elemdat[5].equals("LOCAL_LOAD")) {
			this.fieldname = elemdat[8].substring(NAMEINDEX);
			this.isPut = elemdat[5].equals("LOCAL_STORE");
			/*SELoggerの使用で局所変数で名前がないものが取れるので無視*/
			this.isFail=fieldname.equals("(Unavailable)");
		} else {
			/*命令がない時は失敗*/
			this.fieldname = "";
			this.isPut = false;
			this.isFail=true;
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
