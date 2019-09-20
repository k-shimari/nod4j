# Viewer 
## Sample Overview 
This README describes our sample.

Please click `Demo`.

`Demo` directory contains the Target Method (`src/sample/Main.java`) which gets the maximum number from given three numbers and its Test Method (`test/sample/getMaxTest.java`).

You can see the trace about test execution in the Target Method.

## Viewer Usage
1. You can find down and up arrows at right side of each value in `src/sample/Main.java`.
1. The down arrow means the start point and the up arrow means the end point.
1. This interactive view can filter the value based on the execution order of each instruction by setting the start and/or end point.
1. You can check filter information at `TIMESTAMP FILTER` and delete filters by clicking buttons.
1. If no values are contained in the variable during the filtered period, the highlighting of the variable is turned off.

## Debugging Scenario
The target method selects the maximum number from given three numbers.

This method contains a bug which leads to failing the test in getMaxTest.java at line 17.

The bug can be fixed following steps:
1. Hovering your mouse cursor on variable "max" at line 26, you can confirm the last value is "20".
1. To filter the value, clicking on the left button of the sixth value at line 9 as a start point and on the right button of the value "20" at line 26 as an end point.
1. The highlighted variables show that the "max" was incorrectly assigned at line 12.
1. We can fix this bug by changing the variable "num1" to "num2" at line 11.
