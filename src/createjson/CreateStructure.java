package createjson;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import data.SeloggerFiles;
import data.fileinfo.FileInfoJson;

public class CreateStructure implements ICreateJson {
	private SeloggerFiles selfiles;
	private String targetDir;
	private static final String TYPEFILE = "file";
	private static final String TYPEDIR = "dir";

	public CreateStructure(SeloggerFiles selfiles, String dir) {
		this.selfiles = selfiles;
		this.targetDir = dir;
	}

	@Override
	public List<FileInfoJson> create() {
		List<FileInfoJson> jsonList = new ArrayList<>();
		createOutput(new File(targetDir), jsonList);
		return jsonList;
	}

	public void createOutput(File dir, List<FileInfoJson> jsonList) {
		File[] files = dir.listFiles();
		if (files != null) {
			//	ArrayList<File> fileList = new ArrayList<File>();
			//	ArrayList<File> dirList = new ArrayList<File>();
			for (File f : files) {
				System.out.println(dir);
				try {
					if (f.isFile()) {
						//			fileList.add(f);
						getFileInfo(f);
					} else {
						getDirInfo(f);
					}
				} catch (IOException e) {
					// TODO 自動生成された catch ブロック
					e.printStackTrace();
				}

			}

			//			jsonList.add(e);
		}

	}

	private FileInfoJson getFileInfo(File f) throws IOException {
		return new FileInfoJson(f.getName(), TYPEFILE, (ArrayList<String>) Files.readAllLines(Paths.get(f.getPath())),
				new FileInfoJson());

	}

	private FileInfoJson getDirInfo(File d) {
		return new FileInfoJson(d.getName(), TYPEDIR, new ArrayList<String>(), new FileInfoJson());
	}

}
