This pages describe how to create and use our viewer on sample.

If you want to know only how to use our viewer, jump <a href="#Viewer">Viewer</a>

# Trace Recorder Usage
### Collect Execution Trace 
```
// run junit test
$ java -jar -javaagent:/path/to/selogger-0.2.jar=output=/path/to/sample/demo/selogger,weave=ALL,format=near-omni,size=32,keepobj=true /path/to/sample/demo/sample.jar
```
 *  Options are described at https://github.com/takashi-ishio/selogger/tree/v0.2
 *  In our method using `format=near-omni` option

You can find the execution trace in /path/to/sample/demo/selogger.
## Post Processor Usage
### Convert in the Format of JSON
Run nod3v.jar, which is in the project root, to convert the execution trace in the format of JSON.

```
$ java -jar nod3v.jar /path/to/sample/demo
```

You can get `fileinfo.json` and `varinfo.json` at /path/to/sample/demo.

`fileinfo.json` contains the information of source code.

`varinfo.json` contains the information of values of variable.



# Viewer Generator Usage

## Pre-requirements

* Node.js
* npm

## Getting started

1. Run the commands below. You can check our sample.
```
$ cd nod3v/frontend
$ npm install
$ npm start
```

## Develop

```
$ npm start
```

> Note: Hot reload is enabled.

## Build and Run

1. Locate `fileinfo.json` and `varinfo.json` at `frontend/src/assets/project/demo`
```
$ npm run build
$ npm run server
```

## Open your project

1. Add <PROJECT_NAME> on the main page

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
