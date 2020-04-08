package jp.ac.osaka_u.ist.sel.nod4j.createjson;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import jp.ac.osaka_u.ist.sel.nod4j.data.fileinfo.FileInfoJson;

/**
 * @author k-simari
 * This class gets the target project information (e.g., lines, structure...).
 */
public class CreateStructure implements ICreateJson {
	private String projectDir;
	private static final String TYPEDIR = "dir";
	private static final String TYPEFILE = "file";
	//	private static final String TYPEJAVAFILE = "javafile";
	//	private static final String _JAVAFILE = ".java";

	public CreateStructure(String projectDir) {
		this.projectDir = projectDir;
	}

	@Override
	public FileInfoJson create() {
		return getDirInfo(new File(projectDir));
	}

	/**
	 * @return file information including its contents(lines)
	 */
	private FileInfoJson getFileInfo(File f) {
		List<String> list = new ArrayList<>();
		System.out.println(f.getPath());
		List<String> tmplist;
		try {
			tmplist = Files.readAllLines(Paths.get(f.getPath()), StandardCharsets.UTF_8);
			for (String s : tmplist) {
				list.add(s.replace("\"", "\\\""));
			}
		} catch (IOException e) {
			try {
				tmplist = Files.readAllLines(Paths.get(f.getPath()), Charset.forName("SHIFT_JIS"));
				for (String s : tmplist) {
					list.add(s.replace("\"", "\\\""));
				}
			} catch (IOException e1) {
				System.err.println("CreateStructure.java getFileInfo: file encoding is not UTF-8 nor SHIFT_JIS.");
				e1.printStackTrace();
			}
		}
		return new FileInfoJson(f.getName(), TYPEFILE, list, new ArrayList<>());
	}

	/**
	 * @return directory information including its contents(structure in this directory)
	 */
	private FileInfoJson getDirInfo(File dir) {
		File[] files = dir.listFiles();
		List<FileInfoJson> list = new ArrayList<>();
		if (files != null) {
			for (File f : files) {
				if (f.isFile()) {
					//						if(f.getName().substring(f.getName().length()-5).equals(_JAVAFILE)) {
					list.add(getFileInfo(f));
					//						}
				} else {
					list.add(getDirInfo(f));
				}
			}
		}
		return new FileInfoJson(dir.getName(), TYPEDIR, new ArrayList<>(), list);
	}

}
