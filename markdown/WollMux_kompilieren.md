Diese Seite gibt Ihnen Hilfestellung dabei, den Quelltext des WollMux
selbst zu kompilieren.

Allgemein
---------

Ab der Version 16.04 des WollMux wird [Apache Maven](https://maven.apache.org/) als neues Buildsystem
verwendet. Dazu wurde der WollMux in mehrere Maven-Artefakte unterteilt,
die unabhängig voneinander gebaut werden können:

-   wollmux: Alle Klassen der WollMux-Extension und der WollMuxBar
-   wollmux-interfaces: Interfaces für die UNO-Services des WollMux
-   unohelper: Hilfsklassen für die Verwendung von UNO
-   wollmux-support-classes: Hilfsklassen, die beim Start von WollMux
    benötigt werden
-   terminate-ooo: Programm zu Beenden von OpenOffice/LibreOffice; wird
    vom Installer verwendet

Zusätzlich verwendet der WollMux das [maven-ooo-plugin](https://github.com/oboehm/maven-ooo-plugin) zum Kompilieren
der IDL-Dateien. Dieses musste für die Verwendung mit LibreOffice
angepasst werden. Hierzu existieren Forks für zwei Artefakte
(maven-ooo-plugin und ooo-plugin-manager).

In den meisten Fällen ist es ausreichend nur mit dem wollmux-Artefakt zu
arbeiten, da sich die anderen Abhängigkeiten nur sehr selten ändern.
Alle Dependencies, die zum Bauen des WollMux benötigt werden, werden in
einem Maven-Repository vorkompiliert zur Verfügung gestellt.

Voraussetzungen
---------------

Bevor Sie den WollMux kompilieren können, müssen auf Ihrem System
gewisse Programme bzw. Programmbibliotheken installiert sein:

-   **[JAVA JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)**

-   **[Apache Maven](https://maven.apache.org/download.cgi)**

    > **INFO** *Windows:* Die PATH-Umgebungsvariable muss den Ordner
    *<Maven>\\bin* enthalten. Dabei bezeichnet *<Maven>* den Pfad zu dem
    Ordner, in dem Sie Maven installiert haben.

-   **[Git](http://git-scm.com/downloads/)**:
    Git ist ein Sourcecodeverwaltungssystem und wird benötigt, um die
    Sourcen des WollMux von GitHub herunterzuladen (siehe auch
    [Repository](Repository.md "wikilink")).

    > **INFO** Für die Arbeit mit [Eclipse](http://www.eclipse.org) kann das
    [EGit-Plugin](http://eclipse.org/egit/) verwendet werden.

WollMux-Quelltext
-----------------

Der Sourcecode des WollMux und seine Abhängigkeiten liegen auf
[GitHub](http://github.com/WollMux/) zur Verfügung. Mehr dazu erfahren
Sie auch auf der Seite **[Repository](Repository.md "wikilink")**.

Um den WollMux zu kompilieren wird der WollMux-Quelltext folgendermaßen
geklont:

`git clone https://github.com/WollMux/WollMux.git`

Die verfügbaren Releasestände können mit folgendem Befehl aufgelistet
werden:

`git tag`

Um ein bestimmtes Release zu kompilieren, muss auf den jeweilige Tag
gewechselt werden:

`git checkout RELEASE_16.04`

Um den aktuellsten Entwicklerstand zu kompilieren, muss auf den Branch
*review* gewechselt werden:

`git checkout review`

Kompilieren
-----------

Damit die Abhängigkeiten des WollMux, wie z.B. UNOHelper, nicht
kompiliert werden müssen, werden diese in einem eigenen Repository auf
[Bintray](https://bintray.com/wollmux/WollMux) zur Verfügung gestellt.
Um das Maven-Repository zu konfigurieren muss die Datei
[settings.xml](http://www.wollmux.net/files/mvn/settings.xml) im
Benutzerverzeichnis in den Ordner `.m2/` kopiert werden.

Zum Kompilieren des WollMux muss im Ordner `WollMux` das Kommando

`mvn package`

-   Die Extension WollMux.oxt und die Datei WollMuxBar.jar befinden sich
    danach im Ordner `WollMux/dist`.
-   Der Installer liegt unter `WollMux/target` bereit.

Die nächsten Schritte zur Installation sind unter
[WollMux\_installieren](WollMux_installieren "wikilink") und
[WollMux\_manuell\_installieren](WollMux_manuell_installieren "wikilink")
erklärt.

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

    **java\_uno.jar, juh.jar, jurt.jar, ridl.jar, unoloader.jar**
    **unoil.jar** *(im Ordner: `program\classes`)*

Falls der master-Branch gebaut wird und `UNOHelper` bzw. `wollmux-core` dafür nicht in der
passenden Version im Maven-Repository bereitstehen, müssen die beiden Projekte als
Build-Abhängigkeiten eingetragen werden. Dazu in Eclipse das WollMux-Projekt auswählen,
dann im Menü Project&rarr;Properties wählen und im Dialog unter Java Build Path&rarr;Projects
die Projekte `UNOHelper` und `wollmux-core` hinzufügen.

Pfade
-----

Der Pfad zur LibreOffice-Installation, welche zum Testen benutzt wird, lässt sich über
den Schlüssel `OOO_BASE` in der Datei `unix.properties`, bzw. `windows.properties` festlegen.

Debugging
---------

Um WollMux direkt aus Eclipse heraus debuggen zu können, muss zuerst die Extension
`WollMux_ButtonsOnly.oxt` installiert werden.
Diese kann mit folgendem Befehl erstellt werden: `ant WollMux.oxt-ButtonsOnly`.

Nachdem diese Extension in LibreOffice installiert ist, muss in Eclipse eine
Debug-Konfiguration vom Typ "Java Application" angelegt werden. Als Main-Klasse muss
`de.muenchen.allg.itd51.wollmux.DebugExternalWollMux` angegeben werden.

Dann kann die Debug-Konfiguration in Eclipse starten (darauf achten dass kein soffice-Prozess läuft).
Im Anschluss kann LibreOffice gestartet werden.

Ältere Versionen
----------------

siehe [WollMux kompilieren (vor Version 16.04)](WollMux_kompilieren_vor_Version_16.04.md "wikilink")

Siehe auch
----------

-   [Repository](Repository.md "wikilink")
-   [WollMux installieren](WollMux_installieren.md "wikilink")
-   [Wollmux-Debugging](Wollmux-Debugging.md "wikilink")
-   [WollMuxBar](WollMuxBar.md "wikilink")
-   [Konfigurationsdatei wollmux.conf](Konfigurationsdatei_wollmux_conf.md "wikilink")

<Category:Eierlegender_WollMux> <Category:Handbuch_des_WollMux>
