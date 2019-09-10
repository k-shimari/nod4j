export const rawProjectJsonData = `{
    "name": "project",
    "type": "dir",
    "content": [],
    "children": [
        {
            "name": "src",
            "type": "dir",
            "content": [],
            "children": [
                {
                    "name": "sample",
                    "type": "dir",
                    "content": [],
                    "children": [
                        {
                            "name": "Main.java",
                            "type": "file",
                            "content": [
                                "package sample;",
                                "",
                                "public class Main {",
                                "    public static void main(String args[]) {",
                                "    }",
                                "",
                                "    private static int[] intarray = new int[100];",
                                "    public static int getMax(int num1, int num2, int num3) {",
                                "        int max = 0;",
                                "        if (num1 < num2) {",
                                "            if (num1 < num3) {",
                                "                max = num3;",
                                "            } else {",
                                "                max = num2;",
                                "            }",
                                "        } else {",
                                "            if (num1 < num3) {",
                                "                max = num3;",
                                "            } else {",
                                "                max = num1;",
                                "            }",
                                "        }",
                                "        for (int i = 0; i < 100; i++) {",
                                "            intarray[i] = max;",
                                "        }",
                                "        return max;",
                                "    }",
                                "}"
                            ],
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "name": "test",
            "type": "dir",
            "content": [],
            "children": [
                {
                    "name": "testsample",
                    "type": "dir",
                    "content": [],
                    "children": [
                        {
                            "name": "getMaxTest.java",
                            "type": "file",
                            "content": [
                                "package testsample;",
                                "",
                                "import static org.junit.Assert.*;",
                                "",
                                "import org.junit.Test;",
                                "",
                                "import sample.Main;",
                                "",
                                "public class getMaxTest {",
                                "    @Test",
                                "    public void getMaxTest1() {",
                                "        assertEquals(30, Main.getMax(30, 10, 20));",
                                "        assertEquals(30, Main.getMax(30, 20, 10));",
                                "        assertEquals(30, Main.getMax(20, 10, 30));",
                                "        assertEquals(30, Main.getMax(20, 30, 10));",
                                "        assertEquals(30, Main.getMax(10, 20, 30));",
                                "        assertEquals(30, Main.getMax(10, 30, 20));",
                                "    }",
                                "}"
                            ],
                            "children": []
                        }
                    ]
                }
            ]
        }
    ]
}`;