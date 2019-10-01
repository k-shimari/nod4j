package createjson;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;

import data.fileinfo.FileInfoJson;

public class CreateStructure implements ICreateJson {
	private String targetDir;
	private static final String TYPEFILE = "file";
	private static final String TYPEDIR = "dir";

	public CreateStructure(String dir) {
		this.targetDir = dir;
	}

	@Override
	public FileInfoJson create() {
		return getDirInfo(new File(targetDir));
	}

	private FileInfoJson getFileInfo(File f) throws IOException {
		ArrayList<String> tmplist=(ArrayList<String>) Files.readAllLines(Paths.get(f.getPath()));
		ArrayList<String> list= new ArrayList<String>();
		for(String s: tmplist) {
			list.add(s.replace("\"", "\\\""));
		}
		return new FileInfoJson(f.getName(), TYPEFILE, list, new ArrayList<FileInfoJson>());

	}

	private FileInfoJson getDirInfo(File dir) {
		File[] files = dir.listFiles();
		ArrayList<FileInfoJson> list = new ArrayList<FileInfoJson>();
		if (files != null) {
			for (File f : files) {
				System.out.println(dir);
				try {
					if (f.isFile()) {
						list.add(getFileInfo(f));
					} else {
						list.add(getDirInfo(f));
					}
				} catch (IOException e) {
					e.printStackTrace();
				}

			}
		}
		ArrayList<String> a = new ArrayList<String>();

		return new FileInfoJson(dir.getName(), TYPEDIR, a, list);
	}

}
