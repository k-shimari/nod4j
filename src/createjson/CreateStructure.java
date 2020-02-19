package createjson;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import data.fileinfo.FileInfoJson;

public class CreateStructure implements ICreateJson {
	private String targetDir;
	private static final String TYPEDIR = "dir";
	private static final String TYPEFILE = "file";
	//	private static final String TYPEJAVAFILE = "javafile";
	//	private static final String _JAVAFILE = ".java";

	public CreateStructure(String dir) {
		this.targetDir = dir;
	}

	@Override
	public FileInfoJson create() {
		return getDirInfo(new File(targetDir));
	}


	private FileInfoJson getFileInfo(File f) {
		ArrayList<String> list = new ArrayList<>();
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

	private FileInfoJson getDirInfo(File dir) {
		File[] files = dir.listFiles();
		ArrayList<FileInfoJson> list = new ArrayList<>();
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
