package testsample;

import static org.junit.Assert.*;

import org.junit.Test;

import sample.Main;

public class getMaxTest {
    @Test
    public void getMaxTest1() {
        assertEquals(30, Main.getMax(30, 10, 20));
        assertEquals(30, Main.getMax(30, 20, 10));
        assertEquals(30, Main.getMax(20, 10, 30));
        assertEquals(30, Main.getMax(20, 30, 10));
        assertEquals(30, Main.getMax(10, 20, 30));
        assertEquals(30, Main.getMax(10, 30, 20));
    }
}
