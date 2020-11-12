# nod4j
This tool shows the values of variables in the execution.

Each variable contains the values at most "k" times. (You can set "k" when you execute logger named [selogger](https://github.com/takashi-ishio/selogger/tree/v0.2.1))

You can read the detail Implementation [here](http://sel.ist.osaka-u.ac.jp/lab-db/betuzuri/archive/1172/1172.pdf) .



## Sample

Try our sample and viewer following [wiki page](https://github.com/k-shimari/nod4j/wiki/Try-our-viewer-in-a-debugging-sample).


## Requirements
* Apache Maven (>= 3.5.4)
* JDK 1.8
* Node.js (12.16.1 LTS)
* npm (>= 6.14.4)

### Build
Our tool comprises three components: trace recorder, post-processor, and interactive view. 

  * The trace recorder component records an execution trace of a Java program in storage. 
  * The post-processor component links the recorded trace to the source files of the program. 
  * The interactive view shows the source code contents annotated with trace information. 

First, Build the recorder component following the [selogger](https://github.com/takashi-ishio/selogger/tree/v0.2.1)) page.
(We have already prepared selogger-0.2.1.jar in this directory, so you can use this .jar file instead of doing build process.)

Second, Build a post-processor component with Maven.
```
mvn package
```
You can find `nod4j.jar` in `target/` directory.

The interactive view can be built by npm so you do not have to build in this step.

The following sections explain the usage of each component in detail.


## Trace Recorder Usage
### Setup 
Clone our repository.

```
$ git clone https://github.com/k-shimari/nod4j.git
```

### Collect Execution Trace 

At first, you record the execution trace with our tool.

For example, using the following option, you can collect information about the execution of your program.

```
$ java -jar -javaagent:/path/to/selogger-0.2.1.jar=output=/path/to/<Directory you want to output> <YOUR_APP.jar>
```

 *  Options are described at https://github.com/takashi-ishio/selogger/tree/v0.2.1

You can find the execution trace in `/path/to/<Directory you want to output>`.

## Post Processor Usage
### Convert in the Format of JSON
Run `nod4j.jar`, which is in the project root, to convert the execution trace in the format of JSON.

```
$ java -jar nod4j.jar /path/to/<YOUR_PROJECT_DIRECTORY> /path/to/<Directory you want to output> src/main/frontend/src/assets/project/<YOUR_PROJECT_NAME>
```
  * `/path/to/<YOUR_PROJECT_DIRECTORY>` is the your project directory which contains the source code.
  * `/path/to/<Directory you want to output>` is the same directory you specify in the previous step, which contains the execution trace.
  * `src/main/frontend/src/assets/project/<YOUR_PROJECT_NAME>` is the output destination for this command.


You can find `fileinfo.json` and `varinfo.json` at `src/main/frontend/src/assets/project/<YOUR_PROJECT_NAME>`.

`fileinfo.json` contains the information of source code.

`varinfo.json` contains the information of values of variable.

## Viewer Usage

### Getting started

Run the following commands to install the packages.
```
$ cd src/main/frontend
$ npm install
```

### Build and Run
Run the following commands to build the project and start the server.
```
$ npm run build
$ npm run server
```

### Open your project
1. Access localhost:8070
1. Open your project in the list of "Open project"

![toppage2](https://user-images.githubusercontent.com/31942441/98491528-79370180-2278-11eb-840f-e3a13d6d7661.png)

### Viewer 
1. You can find down and up arrows at right side of each value.
1. The down arrow means the start point and the up arrow means the end point.
1. This interactive view can filter the value based on the execution order of each instruction by setting the start and/or end point.
1. You can check filter information at `INSTRUCTION FILTER` and delete filters by clicking buttons.
1. If no values are contained in the variable during the filtered period, the highlighting of the variable is turned off.

![traceviews](https://user-images.githubusercontent.com/31942441/78317041-2c7da080-759c-11ea-8d27-13e6cf4fb998.png)

### Raw logs Viewer 
Clicking `ALL LOGS` button, you can see all raw execution trace.
  * `ID` is a unique ID for each source code location.
  * `Line` means the line number of the variable and `Variable` means the variable name.
  * `Seqnum` is the sequence number of the instruction and `Data` is the value of variable.

## Limitation
  * This tool does not display the following variables in the current implementation, or does not display them correctly.
    * Method return value at caller method
    * Related to some kinds of operand correctly
      * ++, +=, --, -=
    * multiple lines expression 
  * You can confirm these invisible values clicking `ALL LOGS` button in view.
