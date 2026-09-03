@echo off

echo.
echo ========================================
echo [1/5] Wechsle in das Projektverzeichnis
echo ========================================
cd /d C:\_Projects\Projekt\dashboard

echo.
echo ========================================
echo [2/5] Starte das Python-Skript
echo ========================================
python download.py

echo.
echo ========================================
echo [3/5] Loesche das generierte PDF
echo ========================================
del "C:\_Projects\Projekt\dashboard\menuplan-1.pdf"

echo.
echo ========================================
echo [4/5] Kopiere das generierte PNG
echo ========================================
copy "C:\_Projects\Projekt\dashboard\menuplan-1.png" "C:\_Projects\Projekt\dashboard\generated\"

echo.
echo ========================================
echo [5/5] Loesche das generierte PNG
echo ========================================
del "C:\_Projects\Projekt\dashboard\menuplan-1.png"

echo.
echo ========================================
echo Vorgang erfolgreich abgeschlossen!
echo ========================================
pause