package jp.ac.osaka_u.ist.sel.nod4j.data;

/**
 * This data class contains the value at each dataid in recentdata.txt.
 * @author k-simari
 *
 */
public class Recentdata {
	private String data;
	private String timestamp;
	private String thread;

	public Recentdata(String data, String timestamp, String thread) {
		this.data = data;
		this.timestamp = timestamp;
		this.thread = thread;
	}

	public String getData() {
		return data;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public String getThread() {
		return thread;
	}

	public void setData(String data) {
		this.data = data;
	}
}