package tetettst;

public class Main {
	private static int fieldaaa = 100;

	public static void main(String args[]) {
		int localbbb = 10;
		int tmp = fieldaaa + fieldaaa + localbbb + localbbb + fieldaaa; //OK
		fieldaaa += 10; //OK
		localbbb += 10; //OK PUT1‰ñ‚Ì‚Ý
		fieldaaa *= 10; //OK
		localbbb *= 10; //OK

		fieldaaa = fieldaaa + 10; //OK
		localbbb = localbbb + 10; //NG PUT1‰ñ‚Ì‚Ý
		fieldaaa = fieldaaa * 10; //OK
		localbbb = localbbb * 10; //OK

		fieldaaa++; //OK
		localbbb++; //OK PUT1‰ñ‚Ì‚Ý
		++fieldaaa; //OK
		++localbbb; //OK PUT1‰ñ‚Ì‚Ý

		/*all GGP*/
		fieldaaa += tmp; //OK
		localbbb += tmp; //OK
		fieldaaa *= tmp; //OK
		localbbb *= tmp; //OK

		/*all GGP*/
		fieldaaa = fieldaaa + tmp; //OK
		localbbb = localbbb + tmp; //OK
		fieldaaa = fieldaaa * tmp; //OK
		localbbb = localbbb * tmp; //OK

		/*all GGP*/
		fieldaaa += fieldaaa;
		localbbb += localbbb;
		fieldaaa *= fieldaaa;
		localbbb *= localbbb;

		/*all GGP*/
		fieldaaa = fieldaaa + fieldaaa;
		localbbb = localbbb + localbbb;
		fieldaaa = fieldaaa * fieldaaa;
		localbbb = localbbb * localbbb;

		fieldaaa = fieldaaa + fieldaaa++ + ++fieldaaa; //NG
		fieldaaa += fieldaaa++ + ++fieldaaa;//NG
		localbbb = localbbb + localbbb++ + ++localbbb;
		localbbb += localbbb++ + ++localbbb;

		tmp = ++fieldaaa;//NG
		tmp = fieldaaa++;//NG
		tmp = ++localbbb;//OK
		tmp = localbbb++;//OK

		tmp = localbbb + tmp++;
		tmp = tmp + tmp++;

		fieldaaa=
				fieldaaa
				+
				fieldaaa;

		tmp =
				tmp
				+
				fieldaaa;

		tmp =
				tmp
				+
				localbbb;

		tmp =
				localbbb
				+
				localbbb;

		tmp =
				tmp
				+
				tmp;

		tmp =
				tmp
				+
				tmp++;

	}
}
