# {{ page.title }}

<!-- toc -->

Allgemeines
-----------

Ab der Version 16.04 des WollMux wird ein platformunabhägiger Java-Installer (izPack) mitgeliefert, welcher die empfohlene Installationsvariante ist. Allgemeine Information zur Verwendung von izPack-Installern finden sich [hier](https://izpack.atlassian.net/wiki/display/IZPACK/Launching+an+IzPack+Installation).

Voraussetzungen
---------------

Bevor sie den WollMux installieren können, müssen auf ihrem System folgende Programme vorhanden sein:

- **[LibreOffice](http://www.libreoffice.org/download/libreoffice-still/)** oder **[OpenOffice](http://www.openoffice.org/de/downloads/index.html)**
- **[JAVA JRE (x86)](http://www.oracle.com/technetwork/java/javase/downloads/index.html)**

Java Installer
--------------

Die Installation kann mit einem Doppelklick auf die Jar-Datei oder manuell gestartet werden:

`java -jar wollmux-16.04-installer.jar`

Folgender Aufruf ermöglicht eine zusätzliche Debugausgabe des Installers:

`java -DDEBUG=true -jar wollmux-16.04-installer.jar`

### Installationsverlauf

- Sprachauswahl (Abbildung 1)

![thumb|Abbildung 1](images/Wm16.04-java-installer-01.png)

- Willkommensdialog (Abbildung 2)

![thumb|Abbildung 2](images/180px-Wm16.04-java-installer-02.png)

- Zielverzeichnis (Abbildung 3)
  - Unter Windows wird der Installationspfad *C:\\Program Files* bzw. *C:\\Program Files (x86)* vorgegeben.
  - Unter Linux wird das Benutzerverzeichnis vorgeschlagen.

![thumb|Abbildung 3](images/180px-Wm16.04-java-installer-03.png)

- Komponenten (Abbildung 4)
  - Im Dialog “Auswahl Installationspakete” kann die Installation der WollMux.oxt deaktiviert werden.
  - Die Extension liegt im Installationsverzeichnis und kann jederzeit über den Extension-Manager manuell nachinstalliert werden.

![thumb|Abbildung 4](images/180px-Wm16.04-java-installer-04.png)

- Registry Eintrag (Abbildung 5)
  - Hier wird ein Registry Eintrag (HKEY\_LOCAL\_MACHINE//Software/WollMux bzw. HKEY\_LOCAL\_MACHINE//Software/WOW6432Node/WollMux für 32-Bit Java) angelegt, der den Pfad zur WollMux Konfiguration hat (siehe. [Konfigurationsdatei wollmux.conf](18.0/Konfigurationsdatei_wollmux_conf.md)

![thumb|Abbildung 5](images/installerRegKey.png)

- Systemweite Installation (Abbildung 6)
  - WollMux.oxt kann für alle Benutzer (“shared”) installiert werden.
  - Standardmäßig ist die Option nicht aktiv.
  - Für eine Shared-Installation unter Linux muss der Installer als sudo aufgerufen werden.
  - Unter Windows verlangt der Installer automatisch Admin-Rechte.

![thumb|Abbildung 6](images/180px-Wm16.04-java-installer-05.png)

- Zusammenfassung (Abbildung 7)

![thumb|Abbildung 7](images/180px-Wm16.04-java-installer-06.png)

- Installation (Abbildung 8)

![thumb|Abbildung 8](images/180px-Wm16.04-java-installer-07.png)

- Desktop-Icons und Startmenü (Abbildung 9)
  - Desktop-Verknüpfungen können nur unter Windows angelegt werden.
  - Standardmäßig werden keine Desktop-Verknüpfungen erstellt

![thumb|Abbildung 9](images/180px-Wm16.04-java-installer-08.png)

- Abschluß (Abbildung 10)
  - Die Datei **auto-install.xml** kann über den Button *“Automatisches Installationsskript generieren”* erstellt werden. Dabei werden alle getroffenen Einstellungen gespeichert.

![thumb|Abbildung 10](images/180px-Wm16.04-java-installer-09.png)

### Unbeaufsichtigte Installation

Die Installation kann auch über die Konsole ohne GUI ausgeführt werden ([Unattended Installation](https://izpack.atlassian.net/wiki/display/IZPACK/Unattended+Installations)).\ Folgende Szenarien sind denkbar:
- Aufruf des Installers mit Standardeinstellungen und zusätzlicher Debugausgabe

` java -DDEBUG=true -jar wollmux-16.04-installer.jar -options-system`

- Aufruf des Installers mit Standardeinstellungen für eine systemweite Installation

` java -Dlocal=false -jar wollmux-16.04-installer.jar -options-system`

- Aufruf des Installers mit Standardeinstellungen für eine systemweite Installation mit Vorgabe des Zielordners

` java "-DINSTALL_PATH=C:\Program Files (x86)\WollMux" "-Dlocal=false" -jar wollmux-16.04-installer.jar -options-system`

Sobald eine Änderung an den Standardeinstellungen benötigt wird, muss man einmalig die Installation manuell mit GUI durchführen und (wie in Abbildung 9 beschrieben) ein Installationsskript erstellen.

Dieses Installationsskript kann nun für alle weiteren Installationen verwendet werden:

`java -jar wollmux-16.04-installer.jar auto-install.xml`

Uninstaller
-----------

![thumb|Abbildung 10](images/180px-Wm16.04-java-uninstaller.png)

Der Java-Uninstaller liegt im WollMux-Installationsverzeichnis unter dem Ordner “Uninstaller”, welcher die Deinstallation mit eigener GUI erleichtert (Abbildung 10).

- Der Uninstaller kann ebenfalls Unattended ausgeführt werden:

`java -jar "`<WollMux-Pfad>`\Uninstaller\uninstaller.jar“ -c -f`

Der erste Start
---------------

![thumb|Abbildung 11](images/180px-Wm16.04-erster-start.png)

Nach erfolgreicher Installation der WollMux-Extension (LibreOffice/OpenOffice), wird beim Start des Writers auf die fehlende Datei “wollmux.conf” hingewiesen (Abbildung 11).

Das bedeutet, dass der WollMux ohne zentraler Vorlagensammlung arbeitet. Folgende Feature sind nutzbar:

-   [ Seriendruckvorlagen mit dem WollMux erstellen](18.0/Seriendruckvorlagen_mit_dem_WollMux_erstellen.md)
-   [ WollMux Formulare mit dem FM4000 erstellen](18.0/FormularMax_4000.md)

Um die WollMuxBar und eine zentrale Vorlagensammlung nutzen zu können, wird eine WollMux-Konfiguration benötigt (siehe [Standardkonfiguration des WollMux installieren und pflegen](18.0/Standardkonfiguration_des_WollMux_installieren_und_pflegen.md)).

<Category:Eierlegender_WollMux> <Category:Handbuch_des_WollMux>
