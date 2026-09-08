@echo off
echo Starting Flyff Web MMO servers (SQLite mode)...
echo.

REM Start login server
start "Flyff Login Server" cmd /k "cd /d H:\flyff\v15\web-mmo && npx tsx packages\login-server\src\index.ts"

REM Wait a moment for login server
timeout /t 2 /nobreak >nul

REM Start game server
start "Flyff Game Server" cmd /k "cd /d H:\flyff\v15\web-mmo && npx tsx packages\game-server\src\index.ts"

echo.
echo Servers starting:
echo   Login server: ws://localhost:28000
echo   Game server:  ws://localhost:2000
echo.
echo Close the two windows to stop the servers.
