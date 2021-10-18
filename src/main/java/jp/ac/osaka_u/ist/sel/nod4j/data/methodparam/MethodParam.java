package jp.ac.osaka_u.ist.sel.nod4j.data.methodparam;

import jp.ac.osaka_u.ist.sel.nod4j.data.methodparam.ParamInfo.ParamInfoInner;

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
 *
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

	private Map<String, ParamInfo> fileMethodParamMap;
	private Map<String, String> classIDClassMap, methodIDMethodMap;

	public MethodParam(String projectDir, String traceDir, Map<String, String> classIDClassMap, Map<String, String> methodIDMethodMap) {
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
		this.methodIDMethodMap = methodIDMethodMap;
	}

	/**
	 * This method adds method param line info
	 */
	public List<String> getLineDataids() {
		getDirInfo(new File(projectDir));
		return getrewrittenDataids();
	}

	/**
	 * This fuction maps the actual filepath to filepath recorded in the trace.
	 * This method replaces the path (e.g., src/main/java) because recorded path omits such part of the path.
	 *
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
							this.fileMethodParamMap.putAll(getFileInfo(f, filePath));
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

	private Map<String, ParamInfo> getFileInfo(File f, String filePath) throws IOException {
		AddParam a = new AddParam();
		return a.getParamInfo(f, filePath);
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
	 *
	 * @param elem is the parsing result of "dataids.txt"
	 */
	private void rewriteLine(String[] elem) {
		if (classIDClassMap.containsKey(elem[1])) {
			String classname = classIDClassMap.get(elem[1]);
			System.out.println("class:::" + classname);
			if (fileMethodParamMap.containsKey(classname)) {
				ParamInfo paramInfo = fileMethodParamMap.get(classname);
				String methodName = methodIDMethodMap.get(elem[2]);
				/* note: overridden method will appear right after overriding method
				 (... overriding method id is younger than overridden method id ...)
				 so maybe here is safe.
				 */
				// parameters are stored in order of appearance
				ParamInfoInner params = paramInfo.get(methodName);
				if (params != null) {
					System.out.println(params.getArgumentName() + " " + params.getLine());
					elem[3] = String.valueOf(params.getLine());
					elem[5] += ",ParamName=" + params.getArgumentName();
				}
			}
		}
	}
}
