@echo off
title CNAS — Application Prise en Charge
echo Démarrage de l'application CNAS PEC...
cd /d "%~dp0"
start "" "http://localhost:5173"
npm run dev
pause
