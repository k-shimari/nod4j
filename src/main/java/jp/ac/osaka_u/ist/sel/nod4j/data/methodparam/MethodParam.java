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
	/**
	 * The path to the target directory of near-omniscient debugging
	 */
	private String projectDir;
	/**
	 * The directory which contains the execution trace of the project
	 */
	private String traceDir;

	private Map<String, List<ParamInfo>> fileMethodParamMap;
	private Map<String, String> classIDClassMap;

	public MethodParam(String projectDir, String traceDir, Map<String, String> classIDClassMap) {
		//if (dir.endsWith(System.getProperty("file.separator")))
		/* when path finish /or\ remove it.*/
		if (projectDir.endsWith("\\") || projectDir.endsWith("/"))
			projectDir = projectDir.substring(0, projectDir.length() - 1);
		if (traceDir.endsWith("\\") || traceDir.endsWith("/"))
			traceDir = traceDir.substring(0, traceDir.length() - 1);
		this.traceDir = traceDir;
		this.projectDir = projectDir;
		this.fileMethodParamMap = new HashMap<>();
		this.classIDClassMap = classIDClassMap;
	}

	/**
	 * This method adds method param line info
	 * @param dir
	 * @return
	 */
	public List<String> getLineDataids() {
		getDirInfo(new File(projectDir));
		return getrewrittenDataids();
	}

	/**
	 * This fuction maps the actual filepath to filepath recorded in the trace.
	 * This method replaces the path (e.g., src/main/java) because recorded path omits such part of the path.
	 * @param dir is the specific directory of the target project.
	 */
	private void getDirInfo(File dir) {
		File[] files = dir.listFiles();
		if (files != null) {
			for (File f : files) {
				try {
					if (f.isFile()) {
						if (f.getName().length() >= 6
								&& f.getName().substring(f.getName().length() - 5).equals(".java")) {
							//@TODO edit hashmap key
							String packageName = f.getParent().replace("\\", "/");
							String filePath = packageName.replace(projectDir.replace("\\", "/") + "/", "")
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
						}
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
	 * This method adds method param inforamtion to dataids.txt and return updated one.
	 */
	private List<String> getrewrittenDataids() {
		List<String> rewriteList = new ArrayList<>();
		try {
			List<String> lines = Files.readAllLines(Paths.get(traceDir, "dataids.txt"));
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
	 * This method adds parameter name to dataids element.
	 * @param elem is the parsing result of "dataids.txt"
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
