### Vorbemerkungen zum Dateiformat

WollMux-Konfigurationsdateien sind einfache Textdateien, deren Inhalt
der unten beschriebenen Syntax folgt. Die Dateien müssen im Unicode
Format UTF8 kodiert sein, da ansonsten Umlaute und andere besondere
Zeichen verstümmelt werden. Da die meisten Texteditoren nicht
automatisch erkennen können, ob UTF8-Format vorliegt, und auch beim
Speichern nicht immer den selben Zeichensatz wie beim Lesen verwenden,
empfiehlt es sich, sowohl beim Laden als auch beim Speichern darauf zu
achten, immer explizit das Format anzugeben. Texteditoren, die das nicht
gestatten, sollten für die Bearbeitung von WollMux-Config-Dateien nicht
verwendet werden. Zu beachten ist außerdem, dass “Unicode” nicht
gleichbedeutend mit “UTF8” ist. Zum Beispiel speichert Wordpad bei
Auswahl von “Unicode-Textdokument” *nicht* im UTF8 Format.

### Syntax

Alle Konfigurationsdateien des WollMux haben eine gemeinsame Syntax. Die
zugrundeliegende Struktur ist eine Hierarchie von Schlüsseln und Werten.

#### Schlüssel

Die Syntax für Schlüssel folgt den üblichen Regeln für Bezeichner, d.h.
erlaubte Zeichen sind die Buchstaben a-z und A-Z, sowie Ziffern und der
Unterstrich, wobei das erste Zeichen keine Ziffer sein darf.
Groß-/Klein-Schreibung bei Schlüsseln muss beachtet werden. “KEY” und
“key” sind 2 verschiedene Schlüssel.

#### Werte

Als Werte sind zur Zeit nur Strings erlaubt. Strings sind in
Gänsefüßchen "..." oder Apostrophe '...' eingeschlossene Folgen
beliebiger Zeichen. Die zusammengehörigen Gänsefüßchen/Apostrophe müssen
beide in der selben Zeile stehen. Um Gänsefüßchen in einen von
Gänsefüßchen umschlossenen String bzw. Apostrophe in einen von
Apostrophen umschlossenen String einzubetten wird die in BASIC und
Pascal übliche Doppelung verwendet. Die folgenden Beispiele ergeben
beide einen String aus 3 Zeichen mit einem Gänsefüßchen in der Mitte:

`"X""Y"`

`'X"Y'`

Die folgenden Beispiel ergeben einen String aus 3 Zeichen mit Apostroph
in der Mitte:

`'X''Y'`

`"X'Y"`

##### Zeilenumbrüche und das Sonderzeichen %

Zeilenumbrüche innerhalb von Strings (d.h. schließendes
Anführungszeichen/Apostroph nicht in der selben Zeile wie öffnendes)
sind nicht zugelassen. Das Einbetten von Zeilenumbrüchen innerhalb von
Werten ist mit der Spezialsequenz "%n" möglich. Um das %-Zeichen
einzubetten wird es gedoppelt. Ein beliebiges Unicode-Zeichen kann mit
der Syntax "%uABCD" eingebettet werden, wobei ABCD die Hexnummer des
Unicodes des Zeichens ist (immer 4-stellig).

#### Schlüssel-Wert-Paare

Ein elementares Konstrukt in WollMux-Config-Dateien sind Paare aus einem
Schlüssel gefolgt von einem Wert, z.B.

`NAME "WollMux"`

#### Verschachtelungen

Um die Daten hierarchisch zu organisieren können sie verschachtelt sein.
Ein Verschachtelung beginnt mit einem Schlüssel und wird gefolgt von den
diesem Schlüssel untergeordneten Inhalten in runden Klammern. Beispiel:

```
GUI
(
  Dialoge
  (
    Dialog1(...)
    Dialog2(...)
    ...
  )
)
```

#### Gruppen

Gruppen sind Verschachtelungen ohne einen vorausgehenden Schlüsselnamen.
Sie dienen dazu, Daten zu einer Einheit zusammenzufassen. Beispiel:

`( TYPE "textbox" LABEL "Name" )`

`( TYPE "textbox" LABEL "Vorname" )`

` ( TYPE "textbox" LABEL "Titel" )`

#### Listen

Listen sind Aufzählungen von Werten in runden Klammern. Sie können
benannt sein (durch einen Schlüssel vor den Klammern) oder unbenannt
bleiben. Beispiel:

`Anredevarianten( "Herr", "Frau", "Pinguin")`

`( "Dies", "ist", "eine", "unbenannte", "Liste" )`

#### Kommentare

Kommentare werden eingeleitet durch den Lattenzaun '\#' und erstrecken
sich bis ans Ende der Zeile. Beispiel:

```
# Dies ist ein Beispiel für die Verwendung von Kommentaren

NAME "WollMux"  # Dies setzt den Namen unserer Applikation auf "WollMux"

# An Halloween bitte Kommentarzeichen am Anfang der folgenden Zeile entfernen
# FARBSCHEMA "EkelGrün"
```

#### Whitespace

-   Whitespace-Zeichen (Leerzeichen, Tabulator, Zeilenumbruch) werden
    außerhalb von Strings überall ignoriert, z.B. ist

`NAME "WollMux"`

das selbe wie

`NAME`<BR>
`"WollMux"`

-   Das Komma ',' und der Strichpunkt ';' werden außerhalb von Strings
    überall genau so behandelt wie Whitespace, z.B. ist

`NAME,,,,,;;;;;;;"WollMux"`

das selbe wie

`NAME "WollMux"`

-   Insbesondere dient die Verwendung von Kommas in Wert-Listen nur der
    besseren Lesbarkeit.

#### Steuerbefehle

In WollMux-Config-Dateien können Steuerbefehle enthalten sein, die nicht
Teil der Konfigurationsdaten sind, sondern das Einlesen der Config-Datei
selbst steuern. Steuerbefehle beginnen mit einem Prozentzeichen '%'. Zur
Zeit gibt es nur den Steuerbefehl "%include" (siehe [weiter unten](#include)).

### Steuerbefehle

#### %include

Es ist oft sinnvoll, Konfigurationsdaten auf mehrere Dateien zu
verteilen und diese evtl. sogar an verschiedenen Orten zu speichern. Ein
typischer Anwendungsfall wäre die Aufteilung in referatsweite
Konfigurationsdaten, die auf einem zentralen Netzlaufwerk abgelegt sind
und benutzerspezifische Konfigurationsdaten, die auf dem
Benutzerlaufwerk abgelegt sind. Der WollMux unterstützt dies mit einem
include-Mechanismus.

##### Syntax

Der %include-Steuerbefehl wird gefolgt von einem String. Dieser String
wird als eine URL interpretiert und der Inhalt der durch diese URL
bestimmten Datei an der Stelle des %include-Steuerbefehls in die
Konfigurationsdaten eingefügt. Zu beachten ist dabei, dass es *nicht*
erlaubt ist, zusammengehörige syntaktische Elemente über mehrere Dateien
zu verteilen. Folgendes ist zum Beispiel *nicht* möglich:

```
# FEHLER! Schlüssel-Wert-Paar darf nicht auf mehrere Dateien verteilt werden
SCHLUESSEL %include "wert.txt"

# FEHLER! Zu Verschachtelung gehörige schließende Klammer darf nicht in anderer Datei stehen
SCHLUESSEL(
  ...
%include "klammer_zu.txt"
```

Es ist jedoch z.B. erlaubt, Inhalte von Verschachtelungen über %include
einzufügen. Die generelle Regel ist

1.  Eine Config-Datei muss auch nach Entfernen aller %include
    Steuerbefehle (und der dazugehörigen URL-Strings) noch korrekt gemäß
    der [oben beschriebenen Syntax](Format_von_WollMux-Config-Dateien#Syntax) sein.
2.  Eine via %include eingefügte Datei muss selbst eine syntaktisch
    korrekte Config-Datei sein.

##### URLs

Der %include-Befehl erlaubt alle Arten von URLs, sowohl relativ als auch
absolut. Unterstützt werden verschiedene Protokolle, insbesondere
“file:” und “http:”. Der Kontext für relative URLs ist die URL der
Datei, die den %include-Befehl enthält. Das bedeutet, dass
unvollständige Pfadangaben relativ zum Verzeichnis dieser Datei
aufgelöst werden. Die genaue Spezifikation der URL-Syntax ist zu finden
in [RFC 2396](http://www.ietf.org/rfc/rfc2396.txt). Da das Includen von
Dateien aus dem Dateisystem sicher den wichtigsten Anwendungsfall
darstellt und dabei auch häufig Fehler gemacht werden, sind im folgenden
einige Beispiele für korrekte und inkorrekte “file:” URLs.

-   %include "file://localhost/C:/includes/include.conf"

    KORREKT! Vollständige URL unter Angabe des Pseudo-Rechnernamens "//localhost"

-   %include "file:///C:/includes/include.conf"

    KORREKT! Rechnername "//" bedeutet das selbe wie "//localhost"

-   %include "file:/C:/includes/include.conf"

    KORREKT! Rechnername kann ganz weggelassen werden. Achtung! 2        Slashes "//" fallen dann auch weg, weil sie zum Rechnernamen gehören. Ein Slash bleibt, da absolute Pfade immer mit einem Slash beginnen.

-   %include "file://C:/includes/include.conf"

    FEHLER! Ein '/' zu wenig. "//C" würde als Angabe des
    Rechnernamens interpretiert. Dieser Fehler wird häufig gemacht,
    weil wir es von HTTP-URLs gewöhnt sind, die beiden Slashes
    zu tippen. Sie gehören jedoch *nicht* zum Protokollspezifizierer
    dazu, sondern leiten den Rechnernamen ein.

<!-- -->

-   %include "/C:/includes/include.conf"

    KORREKT! Wenn der folgende %include über das Datei-System
    gelesen wird, dann folgt das “file:” Protokoll aus dem Kontext
    und kann weggelassen werden.

-   %include “C:/includes/include.conf”

    FEHLER! Absoluter Pfad muss mit '/' beginnen (auch unter Windows!)

-   %include “include.conf”

    KORREKT! Unvollständiger Pfad wird im Kontext der includenden
    Datei interpretiert. Die Datei “include.conf” wird also aus dem
    selben Verzeichnis gelesen wie die Datei, die den
    %include-Befehl enthält.

-   %include "file:include.conf"

    KORREKT! Auch bei relativen Pfaden ist die Angabe des Protokolls erlaubt.

-   %include "file://include.conf"

    FEHLER! Wie oben schon erwähnt leitet '//' den Rechnernamen ein,
    hat hier also nichts zu suchen (außer, wir würden tatsächlich
    auf den Rechner “include.conf” zugreifen wollen).

<!-- -->

-   %include "../../include.conf"

    KORREKT! Relative Pfadangaben können mit ".." auf höhere
    Verzeichnisebenen zugreifen. Ausgangspunkt ist dabei wie immer
    das Verzeichnis in dem sich die Datei befindet, die den
    %include-Befehl enthält.

-   %include "file:../../include.conf"

    KORREKT! Auch hier ist das Protokoll erlaubt. Man beachte, dass
    es NICHT "file://.." lautet!

<Kategorie:Office_Admin_Handbuch>

<Category:AG-Office> <Category:Eierlegender_WollMux>
<Category:Handbuch_des_WollMux>
