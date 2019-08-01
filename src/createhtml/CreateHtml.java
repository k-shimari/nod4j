package createhtml;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import concretebuilder.HtmlBuilder;
import data.JavaFile;
import data.SeloggerFiles;

public class CreateHtml {
	private SeloggerFiles selfiles;
	private String targetDir;

	public CreateHtml(SeloggerFiles selfiles, String dir) {
		this.selfiles = selfiles;
		this.targetDir = dir;
	}

	public void start() {
		System.out.println("Create html ...");
		init();
		File dirFrom = new File(targetDir, "src");
		File dirTo = new File(targetDir, "output");
		System.out.println(targetDir);
		createOutput(dirFrom, dirTo, 1);
	}

	/*dirはtarget_projectへのpath*/
	private void init() {
		FileUtility fu = new FileUtility();
		fu.cleanOutputDir(targetDir);
	}

	public void createOutput(File dirFrom, File dirTo, int depth) {
		File[] fromFile = dirFrom.listFiles();
		if (depth==1) {
			dirTo.mkdir();
		}else {
			dirTo = new File(dirTo.getPath(), dirFrom.getName());
			dirTo.mkdir();
		}
		if (fromFile != null) {
			for (File f : fromFile) {
				System.out.println(dirTo);
				if (f.isFile()) {
					htmlFileGenerate(f, dirTo,depth);
				} else {
					depth++;
					createOutput(f, dirTo, depth);
					depth--;
				}
			}
		}

	}

	public void htmlFileGenerate(File file, File dir, int depth) {
		HtmlBuilder hb = new HtmlBuilder(file.getName().replace(".java", ""));

		try {
			Director director = new Director(selfiles, hb, dir.getPath(),depth);
			JavaFile jf = new JavaFile(file.getName(), Files
					.readAllLines(Paths.get(file.getPath()), StandardCharsets.UTF_8));
			director.construct(jf);
			System.out.println("Create " + hb.gethtmlfilename() + " SUCCESS");
		} catch (IOException e) {
			e.printStackTrace();
			System.err.println("Create " + hb.gethtmlfilename() + " FAILED");
		}
	}
}
