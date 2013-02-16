@ECHO OFF

REM cd into project dir
cd %~dp0\..\

REM package app
@node.exe ./cordova/lib/bbwp.js ./www -o ./build

REM run app
./cordova/run.bat
