package jp.ac.osaka_u.ist.sel.nod4j.data.fileinfo;

import java.util.ArrayList;
import java.util.List;

/**
 * The data for fileinfo.json.
 * @author k-simari
 *
 */
public class FileInfoJson {
	private String name;
	private String type;
	private List<String> content;
	private List<FileInfoJson> children;


	public FileInfoJson(String name, String type, List<String> content, List<FileInfoJson> children) {
		this.name = name;
		this.type = type;
		this.content = content;
		this.children = children;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<String> getContent() {
		return content;
	}

	public void setContent(ArrayList<String> content) {
		this.content = content;
	}

	public List<FileInfoJson> getChildren() {
		return children;
	}

	public void setChildren(ArrayList<FileInfoJson> children) {
		this.children = children;
	}

}
