Voraussetzungen
---------------

Bevor sie den WollMux installieren können, müssen auf ihrem System
folgende Programme vorhanden sein:

-   **[LibreOffice](http://www.libreoffice.org/download/libreoffice-still/)**
    oder
    **[OpenOffice](http://www.openoffice.org/de/downloads/index.html)**
-   **[JAVA
    JRE (x86)](http://www.oracle.com/technetwork/java/javase/downloads/index.html)**

Vorbereitung
------------

-   Schließen aller offenen Office-Fenster einschließlich dem
    Schnellstarter, sowie der WollMuxBar.
-   Bitte schauen Sie im Systemmonitor bzw. Taskmanager nach, ob auch
    wirklich alle Prozesse mit dem Namen “soffice.bin” beendet sind.
    Falls nicht, schließen Sie bitte alle noch
    laufenden soffice.bin-Prozesse.
-   Unter Linux stellen Sie bitte sicher, dass die Java-Integration für
    LibreOffice installiert ist:

`apt-get install libreoffice-java-common`

Extension installieren
----------------------

-   Root-Shell bzw. Eingabeaufforderung öffnen
-   Wechseln in das Verzeichnis von LibreOffice:

`Unter Linux:`\
`cd /opt/libreoffice5.0/program`\
`Unter Windows:`\
`cd `“`C:\Programme` `(x86)\LibreOffice` `5\program`”

-   Deinstallation der alten Extension mit folgendem Befehl:

`unopkg remove WollMux.oxt --shared`

-   Installation der neuen Extension für **LibreOffice**:

`unopkg add WollMux.oxt --shared`

-   Installation der neuen Extension für **OpenOffice**:

`unopkg add WollMux-AOO.oxt --shared`

Für eine Installation auf Benutzerebene können Sie den Extension-Manager
verwenden, den Sie über Extras-&gt;Extension Manager in
LibreOffice/OpenOffice.org starten können. Allerdings wird dies nicht
empfohlen. Der gleichzeitige Betrieb von WollMux-Installationen auf
Rechnerebene und WollMux-Installationen auf Benutzerebene kann zu
Problemen führen und wird deshalb vom WollMux nicht unterstützt.

Der erste Start
---------------

[thumb|Abbildung 11](datei:wm16.04-erster-start.png) Nach
erfolgreicher Installation der WollMux-Extension
(LibreOffice/OpenOffice) wird beim Start des Writers auf die fehlende
Datei “wollmux.conf” hingewiesen (Abbildung 11).

Das bedeutet, dass der WollMux ohne zentraler Vorlagensammlung
arbeitet.\
Folgende Feature sind nutzbar:

-   [Seriendruckvorlagen mit dem WollMux erstellen](Seriendruckvorlagen_mit_dem_WollMux_erstellen)
-   [WollMux Formulare mit dem FM4000 erstellen](FormularMax_4000)

**Hinweis:** Bei älteren WollMux-Versionen (vor 16.04) muss eine
WollMux-Konfiguration installiert werden.

WollMuxBar installieren
-----------------------

Um die WollMuxBar und eine zentrale Vorlagensammlung nutzen zu können,
wird eine WollMux-Konfiguration benötigt (siehe
[Standardkonfiguration\_des\_WollMux\_installieren\_und\_pflegen](Standardkonfiguration_des_WollMux_installieren_und_pflegen)).

### Unter Linux

-   Kopieren der Datei WollMuxBar.jar in das Verzeichnis
    */usr/share/java*.
-   Kopieren der Datei wollmuxbar; die Datei speichern im Verzeichnis
    */usr/bin*.

Die WollMuxBar lässt sich anschließend einfach über die Konsole mit dem
Befehl */usr/bin/wollmuxbar* aufrufen. Sie können auch eine
entsprechende Verknüpfung auf dem Desktop anlegen.

### Unter Windows

-   Erstellen eines Ordners, in dem die WollMuxBar installiert werden
    soll: z.B. C:\\Programme\\WollMux
-   Kopieren der Dateien *WollMuxBar.jar*, *wollmuxbar.l4j.ini* und
    *wollmuxbar.exe* werden in den soeben erzeugten Ordner kopiert.

Die WollMuxBar lässt sich anschließend einfach über das Ausführen der
Datei *wollmuxbar.exe* starten. Sie können auch eine Verknüpfung zur
*wollmuxbar.exe* auf dem Desktop oder dem Startmenü anlegen.

### DirectDraw Unterstützung der JVM konfigurativ unterbinden

<div style="background-color:#FFFD7A; border:1px dashed gray; padding: 2px 6px; margin-top:1.2em; margin-bottom:1.2em; margin-left:1px; margin-right:auto; font-size:smaller;">
wollmuxbar.exe wird mit launch4j erzeugt. launch4j unterstützt eine
Ini-Datei, über die Parameter an die JVM übergeben werden können.\
Anhand der Beispieldatei wollmuxbar.l4j.ini kann die
DirectDraw-Hardwarebeschleunigung abschalten.

</div>
<Category:Eierlegender_WollMux> <Category:Handbuch_des_WollMux>
