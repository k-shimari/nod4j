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


