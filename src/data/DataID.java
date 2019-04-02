package data;

public class DataID {
	private String dataid;
	private boolean isPut;

	public DataID(String dataid, boolean isPut) {
		this.dataid = dataid;
		this.isPut = isPut;
	}
	public String getDataid() {
		return dataid;
	}
	public boolean isPut() {
		return isPut;
	}

}