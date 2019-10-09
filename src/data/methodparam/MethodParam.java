package data.methodparam;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MethodParam {
	private String pathSelogger;
	private String pathProject;
	private HashMap<String, List<ParamInfo>> fileMethodParamMap;
	private Map<String, String> methodIDMethodMap;

	public MethodParam(String dir, Map<String, String> methoIDMethodMap) {
		pathSelogger = dir + "/selogger";
		pathProject = dir + "/project";
		this.fileMethodParamMap = new HashMap<String, List<ParamInfo>>();
		this.methodIDMethodMap = methoIDMethodMap;
	}

	public List<String> getLineDataids(String dir) {
		/*add method param line info*/
		getDirInfo(new File(pathProject));
		return getAddedDataids();
	}

	private void getDirInfo(File dir) {
		File[] files = dir.listFiles();
		if (files != null) {
			for (File f : files) {
				try {
					if (f.isFile()) {
						this.fileMethodParamMap.put(f.getName(), getFileInfo(f));
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
		return a.getParamInfo(f.getAbsolutePath());
	}

	private List<String> getAddedDataids() {
		List<String> rewriteList = new ArrayList<String>();
		try {
			List<String> lines = Files.readAllLines(Paths.get(pathSelogger, "dataids.txt"));
			for (String line : lines) {
				String[] elem = line.split(",");
				if (elem[5].equals("METHOD_PARAM")) {
					rewriteLine(elem);
				}
				rewriteList.add(String.join(",", elem));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return rewriteList;
	}

	private void rewriteLine(String[] elem) {
		if (methodIDMethodMap.containsKey(elem[2]) && fileMethodParamMap.containsKey(methodIDMethodMap.get(elem[2]))) {
			List<ParamInfo> list = fileMethodParamMap.get(methodIDMethodMap.get(elem[2]));
			if (list.isEmpty()) {
				elem[3] = String.valueOf(list.get(0).getLine());
				list.remove(0);
			}
		}
	}
}
