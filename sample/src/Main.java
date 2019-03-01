package samplelogvis;

public class Main {
	public static int MethodCallCount=0;
	private static final int TMPNUM1= 5;
	private static final int TMPNUM2= 3;
	private static int TmpSum=0;
	private static int TmpDiff=0;

	public static void main(String args[]){
		Calleee callee =new Calleee();
		UpdateTmpsum(callee);
		UpdateTmpdiff(callee);
		System.out.println("MethodCallCount is" + callee.methodcallcount);

	}

	private static void UpdateTmpsum(Calleee callee) {

		TmpSum=callee.tmpadd(TMPNUM1,TMPNUM2);
		System.out.println(TmpSum);
	}

	private static void UpdateTmpdiff(Calleee callee) {
		TmpDiff=callee.tmpdiff(TMPNUM1,TMPNUM2);
		System.out.println(TmpDiff);
	}
}
