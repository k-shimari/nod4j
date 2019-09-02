package data.fileinfo;

import java.util.ArrayList;

public class FileInfoJson {
	//private String project;
	private String name;
	private String type;
	private ArrayList<String> content;
	private FileInfoJson children;

	public FileInfoJson() {
	}

	public FileInfoJson(String name, String type, ArrayList<String> content, FileInfoJson children) {
		super();
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

	public ArrayList<String> getContent() {
		return content;
	}

	public void setContent(ArrayList<String> content) {
		this.content = content;
	}

	public FileInfoJson getChildren() {
		return children;
	}

	public void setChildren(FileInfoJson children) {
		this.children = children;
	}

}
