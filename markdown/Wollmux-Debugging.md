Der WollMux hat als OpenOffice- / LibreOffice-Erweiterung ein paar
Besonderheiten im Vergleich zu einer normalen Java-Anwendung.

Für das Debuggen des WollMux gibt es zwei Möglichkeiten, die trotzdem
ein komfortables Arbeiten ermöglichen: Remote Debugging und Verwendung
eines externen WollMux. Beide Möglichkeiten werden im Folgenden kurz
vorgestellt.

Remote Debugging
================

Bei dieser Methode verbindet man sich aus der Entwicklungsumgebung
heraus mit einer bereits laufenden WollMux-Instanz.

Nachteil dieser Methode ist, dass bei Codeänderungen das Plugin immer
erst neu installiert werden muss. Dafür lässt sich auch eine bereits
laufende WollMux-Instanz auch nachträglich debuggen.

Einstellungen für LibreOffice
-----------------------------

Unter **Extras** &rarr; **Optionen...** &rarr; **LibreOffice** &rarr;
**Erweitert** &rarr; **Parameter...** folgende Werte zuweisen:

`-Xdebug`

`-Xrunjdwp:transport=dt_socket,address=8000,server=y,suspend=n`

Der letzte Parameter *suspend* kann auch auf *y* gesetzt werden -
LibreOffice wartet dann beim Start darauf, dass sich ein Debugger
verbindet, bevor es den Start fortsetzt. Dies kann für eine
Fehleranalyse im Startvorgang des WollMux nützlich sein.

Die folgende Anleitung geht von der Verwendung von LibreOffice und
Eclipse aus, die Schritte funktionieren aber natürlich prinzipiell auch
mit anderen OpenOffice.org-Abkömmlingen und Entwicklungsumgebungen.

Einstellungen für Eclipse
-------------------------

Unter **Run** &rarr; **Debug configurations...** &rarr; **Remote Java
Application** &rarr; **New launch configuration**:

-   Im Reiter **Connect**:
    -   Bei **Project**: Das Projekt *WollMux* auswählen
    -   Bei **Connection Type**: *Standard (Socket Attach)*
    -   Bei **Connection Properties**:
        -   **Host**: *localhost*
        -   **Port**: *8000*
-   Im Reiter **Common**:
    -   Bei Bedarf ein Menü unter **Display in favorites menu**
        auswählen - der WollMux kann dann z.B. über den Debugknopf
        direkt debuggt werden.

Verwendung
----------

Zum Debugging wird die oben erstellte Remote-Debugverbindung verwendet.
LibreOffice muss dazu bereits gestartet worden sein.

Externer WollMux
================

Bei dieser Variante wird das WollMux-Plugin für LibreOffice von extern
geladen, d.h. der WollMux ist nicht in LibreOffice installiert. Das
Nachladen des WollMux geschieht in diesem Fall über eine Main-Klasse,
die direkt aus Eclipse aufgerufen wird und den WollMux zur Laufzeit per
UNO in LibreOffice registriert. Die Registrierung bezieht sich dabei auf
die entsprechenden Event-Handler wie z.B. dem OnOpen-Event das in
LibreOffice beim Öffnen einer Vorlage ausgelöst wird.

Vorteil ist, dass Codeänderungen direkt ohne Neuinstallation übernommen
werden. Mittels “hot code replace” funktioniert das - wie von anderen
Java-Anwendungen gewohnt - auch im laufenden Betrieb. Eine Codeänderung
geht “Medienbruchfrei”. Im Vergleich dazu muss beim Remote-Debugging mit
jeder zu testenden Änderung auch ein neues WollMux.oxt-Paket installiert
werden, was jedes Mal zusätzliche Klicks und Fehlerquellen bedeutet.
Nachteil ist, dass diese Methode nicht in allen Fällen stabil ist und
unter Umständen (je nach Verwendung) zum Absturz von LibreOffice führen
kann.

Vorbereitungen für das Debuggen
------------------------------

Vor dem Debugging des externen WollMux' sollte folgendes Kommando
gestartet werden (entweder von der Kommandozeile oder per ANT-Runconfig
aus Eclipse):

`ant WollMux.oxt-ButtonsOnly`

Hintergrund: Die Extension WollMux.oxt darf nicht im Office installiert sein. Wenn WollMux.oxt nicht installiert ist, sind allerdings auch die Symbolleisten des WollMux (wie z.B. “Werkzeuge für Vorlagenersteller (WollMux)”) nicht verfügbar. Buttons wie z.B. “FM 4000”, die zum Debuggen evtl. benötigt werden, sind damit ebenfalls nicht verfügbar. Daher gibt es seit Februar 2015 ein neues ant target *WollMux.oxt-ButtonsOnly*, welches die aktuelle WollMux.oxt per unopkg deinstalliert und ein neues WollMux.oxt installiert, das ausschließlich die Symbolleisten/Buttons enthält, aber keinen Java-Code oder andere Dinge mit bringt.

Prüfung ob die Vorbereitung erfolgreich war (nicht zwingend erforderlich): Unter **Extras** &rarr; **Extension Manager...** nach der Extension “WollMux” sehen. Die Vorbereitung war erfolgreich, wenn der WollMux in der Liste OHNE weitere Hinweise, wie z.B. “Briefkopfsystem der Landeshauptstadt München” aufgelistet wird.

Verwendung
----------

Das Debuggen erfolgt durch den Start einer der folgenden Main-Klassen im
Debugmodus:

-   **de.muenchen.allg.itd51.wollmux.DebugExternalWollMux**: Erzeugt
    direkt einen externen WollMux über UNO. Das ist der schnellste und
    einfachste Weg, wenn nur Teile des WollMux gedebugged werden müssen.
-   **de.muenchen.allg.itd51.wollmux.dialog.WollMuxBar**: Startet
    die WollMuxBar. Wenn diese sich über UNO mit dem Office verbinden
    möchte und keine WollMux.oxt vorhanden ist, so erzeugt sie selbst
    einen externen WollMux.

    > **INFO** Dies geht nur, wenn folgende Einstellung in der wollmux.conf gesetzt ist:
        ALLOW_EXTERNAL_WOLLMUX "true"

> **WARNING** **Beim Stoppen des Debuggings sollte darauf geachtet werden, dass das Office immer beendet wird, BEVOR der Debugger gestoppt wird**. Wird der WollMux vor dem Office gestoppt, kann das Office die registrierten Handler des WollMux nicht mehr aufrufen und friert ein.

<Category:Eierlegender_WollMux> <Category:Handbuch_des_WollMux>
