# nod3v
This tool shows the values of variables in the execution.

Each variable contains the values at most "k" times. (You can set "k" when you execute logger named [selogger](https://github.com/takashi-ishio/selogger/tree/v0.1))

You can read the detail Implementation [here](http://sel.ist.osaka-u.ac.jp/lab-db/betuzuri/archive/1172/1172.pdf) .

## Sample
You can try our viewer at http://sel-nod3v.ics.es.osaka-u.ac.jp

Try our viewer following [sample/README](/sample/README.md).


## Trace Recorder Usage
### Setup 
1. Clone the repo
1. Create new dir and put your project source code in `project`
```
$ mkdir <PROJECT_NAME>
$ mkdir <PROJECT_NAME>/project
$ cp -r /path/to/<YOUR_SOURCE_CODE_DIR> <PROJECT_NAME>/project/<YOUR_SOURCE_CODE_DIR>
```
### Collect Execution Trace 
```
$ java -jar -javaagent:/path/to/selogger-0.2.jar=output=/path/to/<PROJECT_NAME>/selogger,weave=ALL,format=near-omni,size=32,keepobj=true <YOUR_APP.jar>
```
 *  Options are described at https://github.com/takashi-ishio/selogger/tree/v0.2
 *  In our method using `format=near-omni` option

You can find the execution trace in /path/to/<PROJECT_NAME>/selogger.
## Post Processor Usage
### Convert in the Format of JSON
Run nod3v.jar, which is in the project root, to convert the execution trace in the format of JSON.

```
$ java -jar nod3v.jar /path/to/yourProject
```

You can get `fileinfo.json` and `varinfo.json` at /path/to/<PROJECT_NAME>.

`fileinfo.json` contains the information of source code.

`varinfo.json` contains the information of values of variable.

## Viewer Usage

### Pre-requirements

* Node.js
* npm

### Getting started

1. Run the commands below. You can check our sample.
```
$ cd src/main/frontend
$ npm install
$ npm start
```

### Develop

```
$ npm start
```

> Note: Hot reload is enabled.

### Build and Run

1. Make directory `src/main/frontend/src/assets/project/<PROJECT_NAME>`
1. Locate `fileinfo.json` and `varinfo.json` at `src/main/frontend/src/assets/project/<PROJECT_NAME>`
```
$ npm run build
$ npm run server
```

### Open your project

1. Add <PROJECT_NAME> on the main page

![image](https://user-images.githubusercontent.com/31942441/65929436-17973900-e3d0-11e9-99ad-14ac83bf491b.png)

### Viewer 
1. You can find down and up arrows at right side of each value.
1. The down arrow means the start point and the up arrow means the end point.
1. This interactive view can filter the value based on the execution order of each instruction by setting the start and/or end point.
1. You can check filter information at `TIMESTAMP FILTER` and delete filters by clicking buttons.
1. If no values are contained in the variable during the filtered period, the highlighting of the variable is turned off.

## Limitation
  * This tool does not show following variables in current implementation but we can confirm them clicking the `ALL LOGS` button in view.
    * Method return value at caller method
    * Related to some kinds of operand correctly
      * ++, +=, --, -=
    * multiple lines expression 

