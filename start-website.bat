@echo off
SET "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"
cd /d "%~dp0"
echo Starting Lakshit Sethiya Website on http://localhost:5173 ...
start "" "http://localhost:5173"
node dev-server.mjs
pause
