package logvis;

import java.io.IOException;
import java.util.Arrays;

import createhtml.CreateHtml;
import data.JavaFiles;
import data.SeloggerFiles;

public class Main {
	/**
	 * args[0]=recentdata.txt
	 * args[1]=dataids.txt
	 * args[2]=methods.txt
	 * args[3..]=srcFiles or dir
	 */
	public static void main(String args[]){
		try{
			String outputdir=args[0];
			SeloggerFiles selfiles = new SeloggerFiles(args[0]);
			JavaFiles srcfiles = new JavaFiles(outputdir,Arrays.copyOfRange(args, 1, args.length));

			CreateHtml cre = new CreateHtml(selfiles, srcfiles,outputdir);
			cre.start();
		}catch(IOException e){
			System.err.println("Not correct Input");
		}
	}
}
