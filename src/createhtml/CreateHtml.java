package createhtml;

import logvis.SeloggerFiles;
import logvis.SrcFiles;

public class CreateHtml {


	private SeloggerFiles selfiles;
	private SrcFiles srcfiles;

	public CreateHtml(SeloggerFiles selfiles, SrcFiles srcfiles) {
		this.selfiles=selfiles;
		this.srcfiles=srcfiles;
	}

	public void start() {
		System.out.println("Create html ...");
		PrintHtml printhtml= new PrintHtml();
		printhtml.preprint(srcfiles);




	}
}
