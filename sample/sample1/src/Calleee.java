package samplelogvis;

public class Calleee {
	int methodcallcount=0;

	public Calleee() {

	}

	public int tmpadd(int addnum1, int addnum2){
		methodcallcount++;
		return addnum1+addnum2;
	}


	public int tmpdiff(int diffnum1, int diffnum2){
		methodcallcount++;
		return diffnum1-diffnum2;
	}
}
