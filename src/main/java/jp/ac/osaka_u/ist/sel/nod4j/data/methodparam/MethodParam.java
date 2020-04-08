package jp.ac.osaka_u.ist.sel.nod4j.data.methodparam;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * add method parameter information to dataids
 * @author k-simari
 */
public class MethodParam {
	private String pathSelogger;
	private String pathProject;
	private Map<String, List<ParamInfo>> fileMethodParamMap;
	private Map<String, String> classIDClassMap;

	public MethodParam(String dir, Map<String, String> classIDClassMap) {
		/* when path finish /or\ */
		//if (dir.endsWith(System.getProperty("file.separator")))
		if (dir.endsWith("\\") || dir.endsWith("/"))
			dir = dir.substring(0, dir.length() - 1);
		pathSelogger = dir + "/selogger";
		pathProject = dir + "/project";
		this.fileMethodParamMap = new HashMap<>();
		this.classIDClassMap = classIDClassMap;
	}

	/**
	 * Add method param line info
	 * @param dir
	 * @return
	 */
	public List<String> getLineDataids(String dir) {
		getDirInfo(new File(pathProject));
		return getrewrittenDataids();
	}

	/**
	 * map filepath to file.
	 * @param dir
	 */
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
								.replaceFirst("^tests\\/main\\/java\\/", "")
								.replaceFirst("^source\\/", "")
								.replaceFirst("^sources\\/", "")
								.replaceFirst("^src\\/", "")
								.replaceFirst("^test\\/", "")
								.replaceFirst("^tests\\/", "")
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

	/**
	 * add method param inforamtion to dataids.txt
	 * @return
	 */
	private List<String> getrewrittenDataids() {
		List<String> rewriteList = new ArrayList<>();
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

	/**
	 * Add parameter Name to dataids
	 * @param elem
	 */
	private void rewriteLine(String[] elem) {
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
	}
}
