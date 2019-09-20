# LOGVIS
### How to Use
1. Create jar File (Main class is logvis/Main.java. You can get LOGVIS.jar)
1. Create target directory (e.g., mkdir target_directory)
    1. Create three directories(src, output, and selogger) in the target_directory
1. Execute selogger for your target project and put the logs(e.g., methods.txt, recentdata.txt...) in target_directory/selogger
1. Put the source files of the target project in target_project/src
1. Execute LOGVIS.jar
    1. The arguments are "target_project" and "target files in target_project/src" (e.g., java -jar LOGVIS.jar /path/to/target_project a.java b.java....) 
1. Finally you can get HTML files for checking the program execution in target_project/output






# Trace Recorder
1. Clone the repo
1. Create new dir and put your project source code in `project`
```
mkdir yourProject
cd yourProject
mkdir project
cp yourSrc project/yourSrc
```


1. Record your program execution with the Java Agent
```
java  -jar  -javaagent:/path/to/selogger-0.0.1-SNAPSHOT.jar=output=/path/to/yourProject/selogger,format=latesttime,size=32,keepobj=true yourApp.jar 
```
  1. Options are described at https://github.com/takashi-ishio/selogger/tree/v0.1
  1. In our method using `format=latesttime` option


# Viewer 

## Pre-requirements

* Node.js
* npm

## Getting started


1. Run LOGVIS.jar to format to json
```
java  -jar  LOGVIS.jar /path/to/yourProject
```
1. You can get `fileinfo.json` and `varinfo.json` at /path/to/yourProject

1. Run the commands below 
```
cd frontend
npm install
npm start
```
You can check our sample
## Develop

```
$ npm start
```

> Note: Hot reload is enabled.

## Build and Run

```
$ npm run build
$ npm run server
```

## Open your project

1. Locate `fileinfo.json` and `varinfo.json` at `src/assets/project/<PROJECT_NAME>`
1. Add <PROJECT_NAME> on the main page

![image](https://user-images.githubusercontent.com/7913793/64902108-62c90080-d6dc-11e9-8013-ace20abf0add.png)














