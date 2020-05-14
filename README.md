# nod4j
This tool shows the values of variables in the execution.

Each variable contains the values at most "k" times. (You can set "k" when you execute logger named [selogger](https://github.com/takashi-ishio/selogger/tree/v0.2.1))

You can read the detail Implementation [here](http://sel.ist.osaka-u.ac.jp/lab-db/betuzuri/archive/1172/1172.pdf) .

## Build
Build a jar file with Maven.
```
mvn package
```


## Sample
You can try our viewer at http://sel-nod3v.ics.es.osaka-u.ac.jp

Try our viewer following [wiki page](https://github.com/k-shimari/nod4j/wiki/Try-our-viewer-in-a-debugging-sample).


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

You can find `fileinfo.json` and `varinfo.json` at `src/main/frontend/src/assets/project/<YOUR_PROJECT_NAME>`.

`fileinfo.json` contains the information of source code.

`varinfo.json` contains the information of values of variable.

## Viewer Usage

### Pre-requirements

* Node.js (12.16.1 LTS)
* npm (6.14.4)

### Getting started

Run the following commands to install the packages.
```
$ cd nod4j/src/main/frontend
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
1. Add <PROJECT_NAME> on the main page

![toppage2](https://user-images.githubusercontent.com/31942441/78315256-77e18000-7597-11ea-9035-0ed23ad908ea.png)

### Viewer 
1. You can find down and up arrows at right side of each value.
1. The down arrow means the start point and the up arrow means the end point.
1. This interactive view can filter the value based on the execution order of each instruction by setting the start and/or end point.
1. You can check filter information at `TIMESTAMP FILTER` and delete filters by clicking buttons.
1. If no values are contained in the variable during the filtered period, the highlighting of the variable is turned off.

![traceviews](https://user-images.githubusercontent.com/31942441/78317041-2c7da080-759c-11ea-8d27-13e6cf4fb998.png)

### Raw logs Viewer 
Clicking `ALL LOGS` button, you can see all raw execution trace.
  * `ID` is unique ID each source code location.
  * `Line` means line number and `Variable` means variable name.
  * `Timestamp` is the timestamp and `Data` is the value of variable.

## Limitation
  * This tool does not display the following variables in the current implementation, or does not display them correctly.
    * Method return value at caller method
    * Related to some kinds of operand correctly
      * ++, +=, --, -=
    * multiple lines expression 
  * You can confirm these invisible values clicking `ALL LOGS` button in view.
