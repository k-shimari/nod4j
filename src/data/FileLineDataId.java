package data;

public class FileLineDataId {
	private String filename;
	private String linenum;

	public FileLineDataId(String filename, String linenum) {
		this.filename=filename;
		this.linenum=linenum;
	}

	/*https://qiita.com/nogitsune413/items/76a6e900e58ef949cc06
	 *
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((filename == null) ? 0 : filename.hashCode());
		result = prime * result + ((linenum == null) ? 0 : linenum.hashCode());
		return result;
	}

	/* https://qiita.com/nogitsune413/items/76a6e900e58ef949cc06
	 *
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj) return true;
		if (obj == null) return false;
		if (getClass() != obj.getClass()) return false;

		FileLineDataId other = (FileLineDataId) obj;
		if (filename == null) {
			if (other.filename != null) return false;
		}
		else if (!filename.equals(other.filename)) return false;
		if (linenum == null) {
			if (other.linenum != null) return false;
		}
		else if (!linenum.equals(other.linenum)) return false;
		return true;
	}
}
