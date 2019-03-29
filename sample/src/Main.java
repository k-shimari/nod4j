package samplelogvis;

public class Main {
	public static int MethodCallCount=0;
	private static int tmpnum1= 5;
	private static int tmpnum2= 3;
	private static int TmpSum=0;
	private static int TmpDiff=0;

	public static void main(String args[]){
		Calleee callee =new Calleee();
		UpdateTmpsum(callee);
		UpdateTmpdiff(callee);
		System.out.println("MethodCallCount is" + callee.methodcallcount);

	}

	private static void UpdateTmpsum(Calleee calleee) {
		for(int i=0;i<3;i++) {
			Calleee callee =new Calleee();
			TmpSum=callee.tmpadd(tmpnum1,tmpnum2);
			System.out.println(callee.methodcallcount);
			tmpnum1= tmpnum1 + TmpSum;
		}
	}

	private static void UpdateTmpdiff(Calleee callee) {
		TmpDiff=callee.tmpdiff(tmpnum1,tmpnum2);
		System.out.println(TmpDiff);
	}
}
