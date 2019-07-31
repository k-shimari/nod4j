package data;

public class FileLineDataId {
	private String fileID;
	private String linenum;

	public FileLineDataId(String fileID, String linenum) {
		this.fileID = fileID;
		this.linenum = linenum;
	}

	/*https://qiita.com/nogitsune413/items/76a6e900e58ef949cc06
	 *
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((fileID == null) ? 0 : fileID.hashCode());
		result = prime * result + ((linenum == null) ? 0 : linenum.hashCode());
		return result;
	}

	/* https://qiita.com/nogitsune413/items/76a6e900e58ef949cc06
	 *
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;

		FileLineDataId other = (FileLineDataId) obj;

		if (fileID == null) {
			if (other.fileID != null)
				return false;
		} else if (!fileID.equals(other.fileID))
			return false;

		if (linenum == null) {
			if (other.linenum != null)
				return false;
		} else if (!linenum.equals(other.linenum)) {
			return false;
		}
		return true;
	}
}