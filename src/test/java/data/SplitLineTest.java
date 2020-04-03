package data;

import static org.junit.Assert.*;

import jp.ac.osaka_u.ist.sel.nod3v.data.SplitLine;

public class SplitLineTest {
	public void splitRecentdataTest() {
		SplitLine s1 = new SplitLine("1,0,0,2,0,1");
		SplitLine s2 = new SplitLine("1,0,0,java.lang.String@11111111:\"abc\",0,1");
		SplitLine s3 = new SplitLine("1,0,0,java.lang.String@11111111:\"a,b,c\",0,1");
		SplitLine s4 = new SplitLine("1,0,0,java.lang.String@11111111:\"a,b,c,\\\"\",0,1");
		SplitLine s5 = new SplitLine("1,0,0,java.lang.String@11111111:\",,,,,\",0,1");

		assertArrayEquals("Error", new String[] { "1", "0", "0", "2", "0", "1" }, s1.getElements());
		assertArrayEquals("Error", new String[] { "1", "0", "0", "java.lang.String@11111111:\"abc\"", "0", "1" }, s2.getElements());
		assertArrayEquals("Error", new String[] { "1", "0", "0", "java.lang.String@11111111:\"a,b,c\"", "0", "1" }, s3.getElements());
		assertArrayEquals("Error", new String[] { "1", "0", "0", "java.lang.String@11111111:\"a,b,c,\\\"\"", "0", "1" }, s4.getElements());
		assertArrayEquals("Error", new String[] { "1", "0", "0", "java.lang.String@11111111:\",,,,,\"", "0", "1" }, s5.getElements());
	}
}
