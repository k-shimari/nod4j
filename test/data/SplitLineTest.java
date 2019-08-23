package data;

import static org.junit.Assert.*;

import org.junit.jupiter.api.Test;

public class SplitLineTest {

	@Test
	public void splitRecentdataTest() {
		SplitLine s1 = new SplitLine("1,0,0,2,0,1");
		SplitLine s2 = new SplitLine("1,0,0,aa\"aa\",0,1");
		SplitLine s3 = new SplitLine("1,0,0,aa\"a,,a\",0,1");

		assertArrayEquals("Error", new String[] { "1", "0", "0", "2", "0", "1" }, s1.getElements());
		assertArrayEquals("Error", new String[] { "1", "0", "0", "aa\"aa\"", "0", "1" }, s2.getElements());
		assertArrayEquals("Error", new String[] { "1", "0", "0", "aa\"a,,a\"", "0", "1" }, s3.getElements());

	}
}
