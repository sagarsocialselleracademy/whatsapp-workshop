@echo off
SET "GH_BIN=%LOCALAPPDATA%\Programs\gh\bin"
SET "GIT_CMD=%LOCALAPPDATA%\Programs\MinGit\cmd"
SET "PATH=%GH_BIN%;%GIT_CMD%;%LOCALAPPDATA%\Programs\nodejs;%PATH%"
cd /d "%~dp0"

echo ========================================================
echo   Publishing WhatsApp Workshop updates to GitHub...
echo   Domain: https://whatsapp.aischoolraipur.com
echo ========================================================

node deploy-dist.cjs

echo.
echo ========================================================
echo   Done! Changes sent to GitHub and live site will update.
echo ========================================================
pause
