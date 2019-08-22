package data;

public class FieldInfo {

	private String fieldname;
	private boolean isPut;
	private boolean isFail;

	public FieldInfo(String fieldname, boolean isPut, boolean isFail) {
		this.fieldname = fieldname;
		this.isPut = isPut;
		this.isFail = isFail;
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
