package data.methodparam;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class MethodParam {
	private String pathSelogger;
	private String pathProject;
	private HashMap<String, List<ParamInfo>> map;

	public MethodParam(String dir) {
		pathSelogger = dir + "/selogger";
		pathProject = dir + "/project";
		this.map = new HashMap<String, List<ParamInfo>>();
	}

	public List<String> getLineDataids(String dir) {
		getDirInfo(new File(pathProject));
		return getRewriteDataids();
	}

	private void getDirInfo(File dir) {
		File[] files = dir.listFiles();
		if (files != null) {
			for (File f : files) {
				System.out.println(dir);
				try {
					if (f.isFile()) {
						this.map.put(f.getName(), getFileInfo(f));
					} else {
						getDirInfo(f);
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	private List<ParamInfo> getFileInfo(File f) throws IOException {
		AddParam a = new AddParam();
		return a.getParamInfo(f.getName());
	}

	private List<String> getRewriteDataids() {
		try {
			List<String> list = Files.readAllLines(Paths.get(pathSelogger, "dataids.txt"));
			List<String> returnList= new ArrayList<String>();
			for (String line : list) {

			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}
}
