package data;

public class Recentdata {
	private String timestamp;
	private String thread;
	private String data;

	public Recentdata(String timestamp, String thread, String data) {
		this.timestamp = timestamp;
		this.thread = thread;
		this.data = data;
	}

	public String getTimestamp() {
		return timestamp;
	}
	public String getThread() {
		return thread;
	}
	public String getData() {
		return data;
	}
}
