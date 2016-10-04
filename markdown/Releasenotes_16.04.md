### WollMux 16.04

#### Bugfixes

-   Anstelle sich darauf zu verlassen, dass das überschreiben des
    Inhalts eines Bookmarks auch die darin enthaltenen Formffelder
    löscht, wird das Formfeld jetzt explizit gelöscht, bevor der neue
    Text eingetragen wird.
-   Beim Einlesen eines Formularfelds in die Formularbeschreibung wurde
    zum Setzen der Checkbox das 'editable'-Attribut verwendet, anstelle
    des readonly-Attributs. Dadurch war die Checkbox in einem
    falschen Status.
-   Einige Debugausgaben sind ohne Konfiguration mit einer
    NullPointerException fehlgeschlagen. Dadurch wurde der
    NoConfig-Modus nicht korrekt eingeschalten.
-   Es stellte sich heraus, dass die WollMux.uno.jar “kaputt” ist.
    Zumindest insofern, dass LO die Versionsnummer von “version to
    extract” im “local file”- und “central directory”-Header-Einträgen
    im ZIP immer gleich erwartet und ansonsten mit Fehler abbricht. Im
    “local file” (0x504B 0x0304) steht als Version 0x000a = 1.0, im
    “central directory” (0x504B 0x0102) als Version 0x0014 = 2.0 für den
    Eintrag META-INF/MANIFEST.MF. Zum Beheben wird einfach das
    WollMux.uno.jar re-packetiert.
-   FM4000: Ausgewählte Spalten im Menü “Ansicht” werden auch bei neuen
    Formularelementen (Button “Neues Label”) berücksichtigt
-   Mit der Vorschau des WollMux-Seriendrucks können die Daten aus der
    Seriendruckdatenquelle (einzeln) pro Datensatz in das aktuelle
    Seriendruckdokument übertragen werden.
-   Seriendruck als Gesamtdruck-PDF: Dialog beim Überschreiben der
    bereits existierenden Zieldatei wird nicht mehr vom
    Hauptdialog verdeckt.

#### Neue Features

-   Eine Änderung der Sepzifikation für Addons.xcu in Apache OpenOffice
    hat es nötig gemacht zwei Versionen der WollMux.oxt zu erzeugen -
    eine für LibreOffice und eine für Apache OpenOffice. Die Datei für
    Apache OpenOffice unterscheidet sich durch eine leicht geänderte
    Addons.xcu, wodurch die Toolbars wieder richtig angezeigt werden.
    Als Nebeneffekt funktioniert dadurch auch der Menüeintrag für den
    Seriendruck wieder. Der Installer wurde so angepasst, dass der
    Benutzer auswählen kann, welche Version der WollMux.oxt
    installiert wird.
-   Das Startskript für die WollMuxBar ist LHM-spezifisch und für
    externe Anwender nutzlos. Das Shellskript wollmuxbar wurde nach
    lhmdeb verschoben und durch ein neues Skript ersetzt, dass die
    WollMuxBar.jar aus dem Installationsevrzeichnis aufruft.
-   In WollMux Dialogen gibt es ein Kontextmenü, das “Ausschneiden”,
    “Kopieren”, “Einfügen” und “Alles markieren” ermöglich.
-   Im FM4000 kann man nun auch “Tooltip” und “Readonly” von
    Formularelementen bearbeiten (Menü “Ansicht” -&gt; “Tooltip” bzw.
    “Readonly”).
-   Eine Blacklist und eine Whitelist wurden zum
    WollMuxClassLoader hinzugefügt. Alle Klassen aus java.\* und
    com.sun.\* werden nicht mehr über den WollMux-Classloader, sondern
    über den Standard-Classloader geladen. Sollte es doch nötig sein,
    Klassen aus diesen Paketen über den Server zu laden, gibt es ein
    neues Conf-Kommando CPWHITELIST über das Pakete und Klassen
    angegeben werden können, die von der Blacklist ausgenommen
    werden sollen. Im Moment ist die Blacklist hardcodiert.
    -   Der Paketname 'com.sun.star.lib.loader' wurde in die Whitelist
        des ClassLoaders hardcodiert aufgenommen.
-   NoConfig Erweiterung: Sofern keine wollmux.conf gefunden wird
    wechselt wollmux in den NoConfig-Modus. Intern wird dabei das schema
    “noconfig” gesetzt. Unter 'Hilfe/Infos? über Vorlagen und Formulare
    (WollMux)' wird angezeigt, dass keine Konfiguration geladen wurde.
    Beim Start von LibreOffice wird eine Meldung angezigt, dass der
    WollMux ohne Konfiguration läuft.
-   Im FM4000 wird die automatische Beschriftung von ID und Label bei
    Klick auf das jeweilige Feld markiert.
-   wollmuxbar.exe wird jetzt mit launch4j erzeugt. Die Datei
    wollmuxbar.l4j.ini kann dazu verwendet werden, um Parameter an die
    JVM zu übergeben. Als Nebeneffekt startet die WollMuxBar
    deutlich schneller.
-   WollMux wird mit Maven gebaut.
-   Seit LibreOffice 4.2 gibt es die Klasse UnoInfo nicht mehr.
    Stattdessen wird ein Programm unoinfo aufgerufen, dass die Pfade der
    LO-Jar-Dateien liefert. Die Klasse Loader wurde dahingehend
    geändert, dass ebenfalls unoinfo verwendet wird, falls UnoInfo nicht
    vorhanden ist. Dass führt dazu, dass bei LibreOffice-Versionen vor
    4.2 und OpenOffice vor 4.0 die bisherige Methode verwendet wird und
    ab LibreOffice 4.2 die neue.
-   Die Funktion zum Suchen der Datei wollmux.conf wurde verändert, so
    dass Windows-Pfade über das Betriebssystem abgefragt werden und
    nicht mehr hardcodiert sind. Die Suchreihenfolge ist:
    -   Environmentvariable WOLLMUX\_CONF\_PATH
    -   /home/<user>/.wollmux oder <Laufwerk>:\\Users\\<user>\\.wollmux
    -   /etc/wollmux
    -   Registry Current User
    -   Registry Local Machine
    -   APPDATA
    -   Programme (x86)
    -   Programme
-   NSIS wird durch izPack ersetzt.
    -   Die Absicht hinter der Änderung ist, die Pflege des
        WollMux-Installers deutlich zu vereinfachen. Notwendige
        Änderungen und Erweiterungen können dann wesentlich schneller
        umgesetzt werden. Zusätzlich wird der Installer auch unter Linux
        und MacOSX zur Verfügung stehen.

### WollMux-Konfiguration 16.04

#### Bugfixes

-   Das Plugin PDFMailMerge in der wollmux-standard-config wurde so
    geändert, dass der Abbruchbutton die Schleife zum Erstellen der
    Einzel-PDFs beendet. Außerdem wurde in die Schleife ein sleep
    eingebaut, um die Auslastung des Prozessors zu verringern.
-   Ergänzung fehlender SET\_DESCRIPTION-Angaben für Seriendruck
    nach PDF.
-   Warndialoge werden jetzt mit JDialog.toFront() nach vorne geschoben.

