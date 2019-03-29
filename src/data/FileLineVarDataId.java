package data;

public class FileLineVarDataId {
	private String fileID;
	private String linenum;
	private String fieldname;

	public FileLineVarDataId(String fileID, String linenum, String fieldname) {
		this.fileID=fileID;
		this.linenum=linenum;
		this.fieldname=fieldname;
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
		result = prime * result + ((fieldname == null) ? 0 : fieldname.hashCode());
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

		FileLineVarDataId other = (FileLineVarDataId) obj;
		if (fileID == null) {
			if (other.fileID != null) return false;
		}
		else if (!fileID.equals(other.fileID)) return false;

		if (linenum == null) {
			if (other.linenum != null) return false;
		}
		else if (!linenum.equals(other.linenum)) return false;

		if (fieldname == null) {
			if (other.fieldname != null) return false;
		}
		else if (!fieldname.equals(other.fieldname)) return false;
		return true;
	}
}
