Installation
============

Voraussetzungen
---------------

Um den WollMux mit LibreOffice Portable benutzen zu können sind folgende Dateien nötig:

- LibreOffice Portable (Download von [PortableApps.com)](http://portableapps.com/apps/office/libreoffice_portable)
- ein **portables 32-Bit Java** (Download von [PortableApps.com](http://portableapps.com/apps/utilities/java_portable)), da LibreOffice derzeit die 64-Bit-Variante von Java noch nicht unterstützt.
- eine spezielle Extension mit der WollMux-Konfiguration, die in LibreOffice Portable **systemweit** installiert wird (Beispiel **WollMux-Config-11.11a-portable.oxt** [Download](http://www.wollmux.net/files/WollMux_LibO_portable/wollmux-config-11.11a-portable.oxt))
- **WollMux.oxt** und **WollMuxBar.jar**, die bereits die Umgebungsvariable %WOLLMUX\_CONF\_PATH% abprüft (ab Revision "abb199cbecbf" - Download z.B. aus den [Daily Builds](Download.md#daily-builds))
- eine angepasste **wollmuxbar.bat**, die die Umgebungsvariable **"WOLLMUX\_CONF\_PATH"** setzt.

Beispielhafte *wollmuxbar.bat*:

``` bash
@echo off
set UNO_PATH=%cd%\App\libreoffice\program
set OXT_PATH=%cd%\App\libreoffice\share
REM #wenn die Config-Extension nur benutzerweit installiert wurde, muss der Pfad geändert werden:
REM set OXT_PATH=%cd%\Data\settings
for /R %OXT_PATH%\.. %%i in (wollmux.conf) do if exist %%i set WOLLMUX_CONF_PATH=%%i
set JAR_FILE=%cd%\WollMuxBar.jar
start %cd%\Java\bin\javaw.exe -jar %JAR_FILE%
```

Installationshinweise
---------------------

Nach der Installation von LibreOffice Portable werden die o.g. Dateien in das oberste Verzeichnis der LibreOffice-Installation kopiert (standardmäßig "LibreOfficePortable"). Für die Installation von Java Portable bietet sich ebenfalls das oberste Verzeichnis der Libreoffice-Installation an.

### Bekannte Probleme

#### Deinstallation einer Extension führt zu einem defekten LibreOffice Portable

Hier lohnt es sich eine Kopie einer blanken LibreOffice-Portable-Installation vor der Extension-Installation zu machen.

#### WollMuxBar bleibt bei "Bitte warten" stehen

Dieses Problem tritt auf, wenn der WollMux auf einem 64-Bit Windows mit einem Java für 64-Bit-Systeme gestartet wird.

<Category:Eierlegender_WollMux> <Category:Handbuch_des_WollMux>
