# nod4j
This tool shows the values of variables in the execution.

Each variable contains the values at most "k" times. (You can set "k" when you execute logger named [selogger](https://github.com/takashi-ishio/selogger/tree/v0.2.2))

You can read the detail Implementation [here](http://sel.ist.osaka-u.ac.jp/lab-db/betuzuri/archive/1172/1172.pdf) .

Our tool comprises three components: trace recorder, post-processor, and interactive view. 

  * The **trace recorder** component records an execution trace of a Java program in storage. 
  * The **post-processor** component links the recorded trace to the source files of the program. 
  * The **interactive view** shows the source code contents annotated with trace information. 

## Sample

Interactive view demo is available at http://sel-nod3v.ics.es.osaka-u.ac.jp and
instructions are described in [the viewer section of wiki page](https://github.com/k-shimari/nod4j/wiki/Try-our-viewer-in-a-debugging-sample#viewer).

Try our sample and viewer following [wiki page](https://github.com/k-shimari/nod4j/wiki/Try-our-viewer-in-a-debugging-sample).

## Requirements
* JDK 1.8
* Node.js (12.16.1 LTS)
* npm (>= 6.14.4)
* (for build jar files) Apache Maven (>= 3.5.4)

## Usage
### Setup 
Clone our repository.

```
$ git clone https://github.com/k-shimari/nod4j.git
```

After cloning, prepare `nod4j.jar` and `selogger-0.2.2.jar` in this project root.

* `nod4j.jar` is available on [releases](https://github.com/k-shimari/nod4j/releases) page.
* `selogger-0.2.2.jar` is already included in this project root.

If you want to build them by yourself, follow the next section.

### (optional) Build jar files

To build `nod4j.jar`, a post-processor component, run Maven and you can find it in `target/` directory.
```
$ mvn package
```

To build `selogger-0.2.2.jar`, a recorder component, follow the [selogger](https://github.com/takashi-ishio/selogger/tree/v0.2.2)) page.

### Trace Recorder Usage

Run the following command to collect information about the execution of your program.

```
$ (prepare something to run your program)
$ java -jar -javaagent:/path/to/selogger-0.2.2.jar=output=/path/to/<EXECUTION_TRACE_OUT> <YOUR_APP.jar>
```

 *  Options are described at https://github.com/takashi-ishio/selogger/tree/v0.2.2

`/path/to/<EXECUTION_TRACE_OUT>` is the directory that you want to output the execution trace.
After running your program for a while, you can get the execution trace in `/path/to/<EXECUTION_TRACE_OUT>`.

If you are using a build tool like maven to run the target program, pass the same option to java.
(A sample in the project wiki contains an example of running with maven.)

### Post Processor Usage

Change directory back to the cloned project root and run `nod4j.jar` to convert the execution trace in the format of JSON.

```
$ cd /path/to/nod4j
$ java -jar nod4j.jar /path/to/<YOUR_PROJECT_DIRECTORY> /path/to/<EXECUTION_TRACE_OUT> <PROJECT_ROOT>/src/main/frontend/src/assets/project/<YOUR_PROJECT_NAME>
```
  * `/path/to/<YOUR_PROJECT_DIRECTORY>` is your project directory which contains the source code.
  * `/path/to/<EXECUTION_TRACE_OUT>` is the directory contains the execution trace where you specified in the previous step.
  * `src/main/frontend/src/assets/project/<YOUR_PROJECT_NAME>` is the output destination for this command.
    * If you are runninng this command other than the cloned project root, point the output destination to the assets directory in the frontend (interactive view).


You can find `fileinfo.json` and `varinfo.json` at `src/main/frontend/src/assets/project/<YOUR_PROJECT_NAME>`.

`fileinfo.json` contains the information of source code.

`varinfo.json` contains the information of values of variable.

### Interactive View Usage

#### Getting started

Run the following commands to install the packages.
```
$ cd src/main/frontend
$ npm install
```

#### Build and Run
Run the following commands to build the project and start the server.
If the execution trace in the assets directory has changed, re-run from here.
```
$ npm run build
$ npm run server
```

#### Open your project
1. Access localhost:8070
1. Open your project in the list of "Open project"

![toppage2](https://user-images.githubusercontent.com/31942441/98491528-79370180-2278-11eb-840f-e3a13d6d7661.png)

#### Viewer 
1. You can find down and up arrows at right side of each value.
1. The down arrow means the start point and the up arrow means the end point.
1. This interactive view can filter the value based on the execution order of each instruction by setting the start and/or end point.
1. You can check filter information at `INSTRUCTION FILTER` and delete filters by clicking buttons.
1. If no values are contained in the variable during the filtered period, the highlighting of the variable is turned off.

![traceviews](https://user-images.githubusercontent.com/31942441/78317041-2c7da080-759c-11ea-8d27-13e6cf4fb998.png)

#### Raw logs Viewer 
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
