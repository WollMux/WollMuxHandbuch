In bestimmten Anwendungszenarien kann ein “Rebranding” des
WollMux erwünscht sein. Das heißt im Wesentlichen,
dass der WollMux nicht unter dem Namen “WollMux” auf den Systemen der
Anwender erscheinen soll, sondern unter einer anderen
Anwendungsbezeichnung, und auch WollMux-Icons etc. ausgetauscht werden
sollen. So ist z.B. bereits heute der WollMux in privaten Unternehmen
unter anderem Namen im Einsatz.

Das Rebranding des WollMux ist allerdings kein triviales Unterfangen, da
insbesondere der WollMux-Programmcode nicht wirklich daraufhin ausgelegt
ist, alle Vorkommen des Namens “WollMux” austauschbar zu machen und der
Begriff “WollMux” an vielen Stellen hardcodiert ist. Mit ein wenig Mühe
und unter Verwendung von Hilfsskripten, die zu diesem Zwecke entwickelt
wurden, ist es allerdings trotzdem möglich weitestgehend alle
Benutzer-sichtbaren Vorkommen des Namens “WollMux” zu ändern.

Auf dieser Wiki-Seite wird dokumentiert, welche Schritte dafür
auszuführen sind. Voraussetzung für die hier beschriebenen Anpassungen
ist auf jeden Fall eine korrekt eingerichtete WollMux-Buildumgebung Nähere
Informationen dazu finden Sie auf [GitHub](https://github.com/WollMux/WollMux).

### Anpassung der WollMux-Konfiguration

Innerhalb der [Konfigurationsdatei wollmux.conf](Konfigurationsdatei_wollmux.conf) (die in der
Praxis meist mit Hilfe des
[%include-Mechanismus](Format_von_WollMux-Config-Dateien.md#include)
auf mehrere Dateien verteilt ist) gibt es diverse Einstellungen, die
Auswirkungen auf Benutzer-sichtbare Meldungen oder Dialog-Fenster des
WollMux haben. Innerhalb der in diesen Einstellungen definierten Strings
kommt in der Default-Konfiguration häufiger auch der Name “WollMux” vor.
Für ein Rebranding müssen Sie die Strings in der wollmux.conf so ändern,
dass statt WollMux der von Ihnen gewünschte Name verwendet wird.

Auf alle betroffenen Einstellungen innerhalb der wollmux.conf hier im
Detail einzugehen würde zu weit führen. Von besonderem Interesse sind
aber sicherlich die Abschnitte
[“Fenster”](Konfigurationsdatei_wollmux_conf.md#fenster)
(insbesondere das Attribut “TITLE”, das den Fenstertitel für die
[WollMuxBar](WollMuxBar.md) festlegt) und
[“Dialoge”](Konfigurationsdatei_wollmux_conf.md#dialoge).

Es empfiehlt sich einfach eine Suche über die gesamte wollmux.conf (und
alle darin includierte Einzeldateien) durchzuführen und nach dem String
“WollMux” zu suchen. Wichtig ist allerdings, dass dabei ausschließlich
Vorkommen von “WollMux” innerhalb von Strings ersetzt werden! Ein
Ersetzen des Namens des [Abschnitts “WollMuxBar-Fenster”](Konfigurationsdatei_wollmux.conf#WollMuxBar-Fenster)
würde z.B. zu einem Fehler führen.

### Notwendige Anpassungen vor Kompilieren des WollMux

Bevor der WollMux unter seinem neuen Namen kompiliert werden kann,
müssen einige manuelle Anpassungen an diversen Dateien durchgeführt
werden. Diese Anpassungen sind im Folgenden beschrieben.

#### Anpassung von `misc/makeversion[.bat]`

Die Datei `makeversion` (bzw. `makeversion.bat` wenn Sie den WollMux mit
einem Windows-System bauen), die innerhalb des `misc/`-Unterordners des
WollMux-Projekts liegt, dient einerseits dazu beim Kompilieren des
WollMux die aktuelle Versionsnummer zu berechnen, andererseits generiert
dieses Skript aber auch die Datei `description.xml`, die für die
WollMux-Extension verwendet wird und u.a. den Namen festlegt, unter dem
die WollMux-Extension im Extension Manager von
OpenOffice.org/LibreOffice auftaucht. Wenn Sie diesen Namen ändern
wollen, führen Sie folgende Änderungen innerhalb der `makeversion` bzw.
`makeversion.bat`-Datei durch:

-   Im unteren Teil, wo im Skript die `description.xml` generiert wird,
    muss der Inhalt des &lt;display-name&gt;-Tags (sowie in der Regel der
    Inhalt des &lt;publisher&gt;-Tags) angepasst werden.
-   Ebenfalls in der `description.xml` sollte der
    &lt;update-information&gt;-Teil am besten ganz auskommentiert/gelöscht
    werden
-   Die `update.xml`-Datei, die ebenfalls vom `makeversion`-Skript
    erzeugt wird, enthält zwar auch Referenzen auf den Namen “WollMux”,
    ist aber ohnehin uninteressant, weswegen eine Änderung daran
    überflüssig ist.

#### Anpassung von `oxt/WriterWindowState.xcu`

In dieser Datei einfach jedes Vorkommen von “WollMux” entsprechend durch
den neuen Namen ersetzen. Aber Vorsicht: NICHT das kleingeschriebene
“wollmux” in dieser Datei ersetzen!

#### Anpassung von `oxt/help/component*.txt`

In diesen Textdateien steht die (lokalisierte) Kurzbeschreibung der
WollMux-Extension, die im Extension Manager von
OpenOffice.org/LibreOffice angezeigt wird. Einfach die Dateien nach
Bedarf anpassen.

#### Anpassung von `oxt/META-INF/manifest.xml`

In dieser Datei die Vorkommen von “WollMux.uno.jar” und “WollMux.rdb”
entsprechend anpassen. Soll der WollMux nach dem Rebranding also z.B.
“SuperOffice” heißen, dann entsprechend ein “SuperOffice.uno.jar” und
“SuperOffice.rdb” daraus machen (wie immer hier sehr genau auf
Groß-/Kleinschreibung achten!).

> **WARNING** Die Vorkommen von “basic/WollMux/” NICHT anpassen!

#### Anpassung der WollMux-Icons

Wenn die WollMux-Icons ersetzt werden sollen, dann müssen entsprechend
vor dem Kompilieren die Icon-Dateien im `src/data`-Verzeichnis des
WollMux-Projekts ausgetauscht werden.

### Kompilieren mit Hilfe von `rename_and_build.bat` (nur Windows!)

Nachdem die oben beschriebenen manuellen Anpassungen durchgeführt
wurden, gilt es nun vor allem noch die zahlreichen hardcodierten
Ausgabestrings im Java-Quelltext des WollMux anzupassen und dann den
WollMux zu kompilieren. Die Quelltext-Anpassungen manuell durchzuführen
oder durch ein simples Suchen&Ersetzen zu probieren, ist allerdings
relativ aussichtslos. Daher wurde (momentan nur für Windows!) ein
Batch-Skript entwickelt, das diesen Vorgang mit Hilfe eines Java-Tools
namens WollMuxStringReplacer (das theoretisch auch manuell unter Linux
ausgeführt werden kann) automatisiert.

Das Batch-Skript `rename_and_build.bat` befindet sich im
`misc/`-Unterordner des WollMux-Projekts. Bei Ausführung des Skripts
über die Kommandozeile wird dem Skript als Parameter der neue Name des
WollMux sowie die Namen der für den WollMux-Build auszuführenden
Ant-Targets übergeben (wobei das Ant-Target “wollmuxbar.exe” auf jeden
Fall immer ausgeführt wird, damit eine entsprechend neu benannte
WollMux-Executable generiert wird).

Beispielausführung:

`rename_and_build.bat SuperOffice all wininstaller`

Das Skript macht darauf eine Sicherungskopie des `src`-Ordners des
WollMux-Projekts und ruft dann das Java-Tool `WollMuxStringReplacer`
auf, welches die Vorkommen von “WollMux” in den Ausgabestrings des
WollMux-Quelltextes ersetzt. Darauf wird `ant` mit den übergebenen
Targets gestartet und nach Abschluss des Ant-Builds die Sicherungskopie
des `src`-Ordners wieder hergestellt, so dass die Umbenennung keine
permanenten “Schäden” am Zustand des WollMux Source Codes im
Projektverzeichnis hinterlässt.

Das Ergebnis des Ant-Builds befindet sich nach Ausführung des Skripts
dann wie gewohnt im `dist`-Unterordner. Die erzeugten Dateien
(Extension, Windows-Installer etc.) tragen den gewünschten neuen Namen.

### Offene Punkte

Nach Durchführung der obigen Anweisungen hat man zwar einen umbenannten
WollMux kompiliert, an einigen Stellen bleibt aber dennoch noch der Name
“WollMux” bestehen. Diese Stellen sind allerdings relativ gut versteckt,
weshalb sich der Aufwand einer Anpassung in der Regel nicht lohnt. Der
Vollständigkeit halber seien sie aber hier aufgeführt:

- Die WollMux-Uninstaller-Datei, die vom Windows-Installer des WollMux
    generiert wird, heißt auch nach der Umbenennung immer noch
    “wollmux\_uninstall.exe”.
- Die Windows-Registrierungseinträge des WollMux werden immer noch
    unter einem Registrierungsschlüssel namens “WollMux” gespeichert.
- Die WollMux-Makrobibliothek heißt immer noch “WollMux”.
- Der Name der Standardbenutzerin für neue Einträge in der
    Persönlichen Absenderliste ist immer noch “Tinchen WollMux”. Um dies
    zu Ändern kann vor dem Compilieren leicht die Java-Klasse
    `de.muenchen.allg.itd51.wollmux.dialog.PersoenlicheAbsenderlisteVerwalten`
    angepasst werden.

<Category:Eierlegender_WollMux> <Category:Handbuch_des_WollMux>
