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
	private Map<String, String> classIDClassMap;

	public MethodParam(String dir, Map<String, String> classIDClassMap) {
		pathSelogger = dir + "/selogger";
		pathProject = dir + "/project";
		this.fileMethodParamMap = new HashMap<String, List<ParamInfo>>();
		this.classIDClassMap = classIDClassMap;
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
					if (f.isFile() && f.getName().length() >= 6
							&& f.getName().substring(f.getName().length() - 5).equals(".java")) {
						//@TODO edit hashmap key
						String packageName = f.getParent().replace("\\", "/");
						String filePath = packageName.replace(pathProject + "/", "")
								.replaceFirst("^src\\/main\\/java\\/", "")
								.replaceFirst("^src\\/test\\/java\\/", "")
								.replaceFirst("^test\\/main\\/java\\/", "")
								.replaceFirst("^src\\/", "")
								.replaceFirst("^test\\/", "")
								+ "/" + f.getName().replace(".java", "");
						System.out.println("filePath:::" + filePath);
						this.fileMethodParamMap.put(filePath, getFileInfo(f));
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
					elem = rewriteLine(elem);
				}
				rewriteList.add(String.join(",", elem));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return rewriteList;
	}

	private String[] rewriteLine(String[] elem) {
		if (classIDClassMap.containsKey(elem[1])) {
			String classname = classIDClassMap.get(elem[1]);
			System.out.println("class:::" + classname);
			if (fileMethodParamMap.containsKey(classname)) {
				List<ParamInfo> list = fileMethodParamMap.get(classname);
				if (!list.isEmpty()) {
					elem[3] = String.valueOf(list.get(0).getLine());
					elem[5] += ",ParamName=" + list.get(0).getArgumentName();
					list.remove(0);
				}
			}
		}
		return elem;
	}
}
