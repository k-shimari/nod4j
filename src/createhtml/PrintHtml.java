package createhtml;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;

import logvis.SrcFiles;
import logvis.SrcFiles.SrcFile;

public class PrintHtml {

	public void preprint(SrcFiles srcfiles) {
		this.print(srcfiles);

	}


	private void print(SrcFiles srcfiles) {
		ArrayList<SrcFile> files = srcfiles.getSrcFiles();
		for(SrcFile file :files){
			System.out.println("---"+file.getHtmlFilename()+"---");
			try {
				// TODO なんか書く
				printheader();
				Files.write(Paths.get(file.getDir(), file.getHtmlFilename()),file.getLines(),Charset.forName("UTF-8"), StandardOpenOption.CREATE, StandardOpenOption.WRITE);
				printfooter();
			} catch (IOException e) {
				// TODO 自動生成された catch ブロック
				e.printStackTrace();
			}
		}

	}



	private void printheader() {

	}



	private void printfooter() {

	}



}
