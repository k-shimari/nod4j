# LOGVIS
# Trace Recorder
1. Clone the repo
1. Create new dir and put your project source code in `project`
```
$ mkdir yourProject
$ cd yourProject
$ mkdir project
$ cp yourSrc project/yourSrc
```
1. Record your program execution with the Java Agent
```
java  -jar  -javaagent:/path/to/selogger-0.0.1-SNAPSHOT.jar=output=/path/to/yourProject/selogger,format=latesttime,size=32,keepobj=true yourApp.jar 
```
  1. Options are described at https://github.com/takashi-ishio/selogger/tree/v0.1
  1. In our method using `format=latesttime` option
1. Run LOGVIS.jar to format to json
```
$ java -jar LOGVIS.jar /path/to/yourProject
```
1. You can get `fileinfo.json` and `varinfo.json` at /path/to/yourProject

# Viewer 

## Pre-requirements

* Node.js
* npm

## Getting started


1. Run the commands below 
```
$ cd LOGVIS/frontend
$ npm install
$ npm start
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




