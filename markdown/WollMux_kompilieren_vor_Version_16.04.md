Diese Seite gibt Ihnen Hilfestellung dabei, den Quelltext des WollMux
selbst zu kompilieren.

Systemvoraussetzungen für das Kompilieren
-----------------------------------------

Bevor Sie den WollMux kompilieren können, müssen auf Ihrem System
gewisse Programme bzw. Programmbibliotheken installiert sein:

-   **[LibreOffice](http://www.libreoffice.org/download/libreoffice-fresh)**

    Beim Kompilieren des WollMux wird auf einige JAR-Dateien im
    Installationsverzeichnis von LibreOffice (kurz: LO) zugegriffen. Der
    WollMux wurde unter LO ab Verion 4.1 getestet. Es wird daher
    empfohlen eine dieser Versionen beim Kompilieren zu verwenden.\

    > **INFO** *Windows:* Stellen Sie nach der Installation von LO sicher, dass die
    PATH-Umgebungsvariable die Ordner
    *<LO-Installationsordner>\\program* und
    *<LO-Installationsordner>\\URE\\bin* enthält. Dabei bezeichnet
    *<LO-Installationsordner>* den Pfad zu dem Ordner, in den Sie
    LibreOffice installiert haben, also z.B. *C:\\Program Files
    (x86)\\LibreOffice 4*.

-   **[LibreOffice
    SDK](http://www.libreoffice.org/download/libreoffice-fresh)**

    Das Buildskript (Skript zum automatischen Kompilieren) des WollMux
    verwendet Dateien und Programme aus dem LO SDK. LibreOffice (siehe
    voriger Punkt) und LibreOffice SDK sollten auf dem System in
    derselben Version vorliegen.

    > **INFO** *Windows:* Stellen Sie nach der Installation des LO SDK sicher, dass
    die PATH-Umgebungsvariable den Ordner
    *<LO SDK-Installationsordner>\\bin* enthält. Dabei bezeichnet
    *<LO SDK-Installationsordner>* den Pfad zu dem Ordner, in den Sie
    das LO SDK installiert haben, also z.B. *C:\\Program Files
    (x86)\\LibreOffice 4\\sdk*.

    <!-- -->
    > **WARNING** Seit LO 4.x kann es zu Problemen mit javamaker kommen.
    Dieser konnte früher nicht mit Leerzeichen in übergebenen Pfaden
    umgehen, was aber schon mal gefixed war. Seit LO 4.x (genau weiß ich
    die Version nicht) wurde dieser Bug wieder reaktiviert. Lösung: Das
    SDK in einen Pfad ohne Leerzeichen installieren lassen, z.B. nach C:\losdk.

-   Alternativ:
    **[OpenOffice.org](http://download.openoffice.org/other.html#tested-full)**
    und
    **[OpenOffice.org\_SDK](http://download.openoffice.org/other.html#tested-sdk)**

-   **[JAVA JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)**
    (32Bit ab Version 7 oder höher)

-   **[Apache Ant](http://ant.apache.org/bindownload.cgi)**

    > **INFO** *Windows:* Die PATH-Umgebungsvariable muss den Ordner
    *<Ant>\\bin* enthalten. Dabei bezeichnet *&lt;Ant&gt;* den Pfad zu dem
    Ordner, in dem Sie Ant installiert haben.

-   **[Git](http://git-scm.com/downloads/)**

    Git ist ein Sourcecodeverwaltungssystem und wird benötigt, um die
    Sourcen des WollMux von GitHub herunterzuladen (siehe auch
    [Repository](Repository.md)).

    > **INFO** Für die Arbeit mit [Eclipse](http://www.eclipse.org) kann das
    [EGit-Plugin](http://eclipse.org/egit/) verwendet werden.

-   **[md5sum.exe](http://etree.org/cgi-bin/counter.cgi/software/md5sum.exe#!md5!eb574b236133e60c989c6f472f07827b)**
    (Optional; nur relevant für Windows!)

    Da unter Windows normalerweise kein md5sum-Tool installiert ist,
    schlägt das md5sum-Target im WollMux-Build dort normalerweise fehl.
    Über obigen Link kann man sich aber eine md5sum.exe herunterladen,
    die man unter Windows verwenden kann. Die PATH-Umgebungsvariable
    muss dann so angepasst werden, dass sie den Ordner enthält, in dem
    sich `md5sum.exe` befindet.

-   **[Nullsoft Scriptable Install System](http://nsis.sourceforge.net/Main_Page)** (Optional; nur
    relevant für Windows bzw. wenn Windows-Install-Bundles unter Linux
    gebaut werden sollen.)

    Die PATH-Umgebungsvariable muss ggf. so angepasst werden, dass sie
    den Ordner enthält, in dem sich `makensis` befindet. Auf
    Debian-basierten Systemen ist NSIS im Paket *nsis* enthalten.

-   **[Ausführung von Powershellskripten muss erlaubt werden](http://go.microsoft.com/fwlink/?LinkID=135170)** (Optional;
    nur relevant für Windows!)

    Die Richtlinie zur Ausführung von Skripten ist standardmäßig nicht
    definiert und somit unterbunden.

    Folgener Befehl (in der Powershell) erlaubt die Ausführung:

    `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`

WollMux-Quelltext und weitere nötige Bibliotheken
-------------------------------------------------

Der Source Code des WollMux steht auf
[GitHub](http://github.com/WollMux/WollMux/) in einem Git-Repository zur
Verfügung. Mehr dazu erfahren Sie auch auf der Seite
**[Repository](Repository.md)**.

Um den WollMux zu kompilieren langt es allerdings nicht, nur den
WollMux-Quelltext herunterzuladen (d.h. aus dem Repository
*auszuchecken*), sondern Sie benötigen insgesamt den Code bzw.
Bibliotheken aus drei Unterprojekten:

-   **[WollMux](http://github.com/WollMux/WollMux/)**:
    Enthält den Code für die WollMux-Extension und die
    [WollMuxBar](WollMuxBar).
-   **[UNOHelper](http://github.com/WollMux/UNOHelper/)**:
    Enthält Hilfsklassen für die Arbeit mit der UNO API von
    LibreOffice/OpenOffice.org, die vom WollMux verwendet wird.
-   **[classes.tar.gz](http://wollmux.net/files/classes.tar.gz)**:
    Enthält JNI-Funktionen für die Arbeit mit der Registry
    unter Windows.

### Herunterladen der benötigten Projekte

Alle drei oben aufgeführte Projekte/Bibliotheken müssen in denselben
Ordner auf Ihrem System heruntergeladen werden. Dies geschieht mit Hilfe
von Git über die im folgenden aufgeführten Kommandos, die in einer
Shell/Kommandozeilenumgebung ausgeführt werden müssen (Mit der
Entwicklungsumgebung [Eclipse](http://www.eclipse.org) können WollMux
und UNOHelper auch direkt in einen Workspace importiert werden):

-   WollMux (mit Git)
        git clone https://github.com/WollMux/WollMux

-   UNOHelper (mit Git)
        git clone https://github.com/WollMux/UNOHelper

-   [classes.tar.gz](http://www.wollmux.net/files/classes.tar.gz):
    Ganz normal per Browser herunterladen und auspacken. (Unter Windows
    kann man mit Hilfe von [7-Zip](http://www.7-zip.org/)
    Tar-Dateien auspacken.)

Kompilieren
-----------

Vor dem Kompilieren müssen die Pfade in der Datei `unix.properties` bzw.
`windows.properties` im Projekt WollMux auf den Installationspfad von
LibreOffice/OpenOffice.org angepasst werden.

Zum Kompilieren des WollMux muss im Ordner `WollMux` das Kommando

`ant all`

aufgerufen werden.

Die fertigen binären Dateien befinden sich danach im Ordner
`WollMux/dist`.

Kurzanleitung für Eclipse
-------------------------

Wenn Sie die Entwicklungsumgebung [Eclipse](http://www.eclipse.org)
verwenden möchten, um mit dem WollMux-Projekt zu arbeiten, hilft Ihnen
zusätzlich zu obigen Informationen evtl. noch folgende Kurzanleitung
weiter:

1.  [EGit-Plugin](http://eclipse.org/egit) installieren
2.  WollMux-Projekt von GitHub mit Eclipse auschecken (Import&rarr;Git)
3.  UNOHelper-Projekt von GitHub mit Eclipse auschecken
    (Import&rarr;Git)
4.  Neue User Library namens “LibreOffice” bzw. “OpenOffice” erstellen,
    welche folgende Jar-Dateien enthält:

    **java\_uno.jar, juh.jar, jurt.jar, ridl.jar, unoloader.jar** *(im
    Ordner: `URE\java\`)*

    **unoil.jar** *(im Ordner: `program\classes`)*
5.  Pfade in `unix.properties` bzw. `windows.properties` im
    WollMux-Projekt anpassen
6.  [classes.tar.gz](http://www.wollmux.net/files/classes.tar.gz) in
    Workspace-Ordner von Eclipse entpacken und in Eclipse dann neues
    Java-Projekt namens “classes” anlegen.

Siehe auch
----------

-   [Repository](Repository.md)
-   [WollMux installieren](WollMux_installieren.md)
-   [Wollmux-Debugging](Wollmux-Debugging.md)
-   [WollMuxBar](18.0/WollMuxBar.md)
-   [Konfigurationsdatei wollmux.conf](18.0/Konfigurationsdatei_wollmux_conf.md)
