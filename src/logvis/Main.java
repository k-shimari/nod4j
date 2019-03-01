package logvis;

import java.io.IOException;
import java.util.Arrays;

import createhtml.CreateHtml;

public class Main {
	/**
	 * args[0]=recentdata.txt
	 * args[1]=dataids.txt
	 * args[2]=methods.txt
	 * args[3..]=srcFiles or dir
	 */
	public static void main(String args[]){
		try{
			SeloggerFiles selfiles = new SeloggerFiles(args[0], args[1], args[2]);
			SrcFiles srcfiles = new SrcFiles(Arrays.copyOfRange(args, 3, args.length));
			CreateHtml cre = new CreateHtml(selfiles, srcfiles);

			cre.start();


			System.out.println("MethodCallCount is" );

		}catch(IOException e){
			System.err.println("Not correct Input");
		}
	}




}
