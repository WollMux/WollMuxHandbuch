Der FormularMax 4000 ist eine integrierte Entwicklungsumgebung für die
Erstellung und Pflege von WollMux-Formularen und Vorlagen.

<!-- toc -->

Handbuch für WollMux-Vorlagenumsteller
======================================

Unter Mithilfe von Teilnehmern der Umsteller-Kurse und eOS-Mitarbeitern
ist **[ein Handbuch (PDF)](http://www.wollmux.net/files/FormularMax_Handbuch.pdf)**
entstanden, das die Verwendung des FormularMax 4000 ausführlicher
beschreibt, als es diese Wiki-Seite tut. Dieses Handbuch wird jedoch (im
Gegensatz zu dieser Wiki-Seite) nicht aktuell gehalten.

Button einrichten
=================

Um den FormularMax 4000 aufrufen zu können muss zuerst der Symbolleiste
ein entsprechender Button hinzugefügt werden. Wenn Sie über
Ansicht/Symbolleisten die Leiste "Werkzeuge für Vorlagenersteller
(WollMux) aktivieren, so haben Sie einen entsprechenden Button.
Ansonsten können Sie sich auch einen Button manuell in eine Symbolleiste
einfügen wie folgt:

1.  Extras/Anpassen.../Reiter "Symbolleisten"
2.  Oben bei Symbolleiste "Standard" auswählen
3.  Unten bei Speichern in "OpenOffice.org Writer" auswählen
4.  Button "Hinzufügen..." anklicken
5.  Links bei "Bereich" auswählen OpenOffice.org Makros/Meine
    Makros/WollMux/Call
6.  Rechts bei Befehle auswählen FormularMax4000
7.  Button "Hinzufügen"
8.  Button "Schließen"
9.  Button "OK"

FormularMax 4000 verwenden
==========================

> **HINT** Die jeweilige Instanz des FormularMax 4000 hängt dauerhaft an dem Dokument, das im Vordergrund war zum Zeitpunkt des Aufrufs des FormularMax 4000. Der FM4000 schließt sich automatisch wenn dieses Dokument geschlossen wird. Das heißt für jede zu bearbeitende Vorlage muss ein neuer FormularMax4000 geöffnet werden.

Menüleiste
----------

Im folgenden werden die Funktionen in der FM4000 Menüleiste in der
Reihenfolge des typischen Arbeitsablaufs vorgestellt.

### Formular/Formularfelder aus Dokument einlesen

Erfasst alle Eingabefelder, Dropdowns und Checkboxen, *die noch nicht
von WollMux-Kommandos umschlossen sind* (d.h. nur die seit dem letzten
Mal neu hinzugekommenen) und integriert sie in die Formularbeschreibung.
Des weiteren werden die entsprechenden Formularfelder des Dokuments mit
passenden WollMux-Textmarken umschlossen.

Hinweis: Derzeit werden Checkboxen nur erfasst, wenn sie am Zeichen oder als Zeichen verankert sind oder wenn sie aus Word-Dokumenten importiert sind (und damit keine Standardverankerung haben).

Beim Erfassen der Felder schaut der FormularMax4000 nach speziellen
Hinweisen/Namen/Einträgen, die diesem Muster entsprechen

`Text1<<Text2>>`

Diese Zusatzinformationen werden herangezogen um Labels, IDs und andere
Informationen zu bestimmen. Folgende Fälle werden unterschieden:

-   *Eingabefeld*: Als "Hinweis" kann "Label&lt;&lt;ID&gt;&gt;" angegeben
    werden und wird beim Import entsprechend berücksichtigt um Label und
    ID des Feldes in der Formular-GUI zu liefern. Wird nur
    "&lt;&lt;ID&gt;&gt;" angegeben, so markiert das Feld eine reine
    Einfügestelle (insertValue oder insertContent) und es wird kein
    Formularsteuerelement in der Formular-GUI erzeugt.
-   *Eingabeliste/Dropdown*: Als "Name" kann "Label&lt;&lt;ID&gt;&gt;"
    angegeben werden und wird wie oben berücksichtigt. Als
    Spezialeintrag in der Liste kann "&lt;&lt;Freitext&gt;&gt;" eingetragen
    werden und signalisiert dem FM4000, dass die ComboBox in der
    Formular-GUI auch die Freitexteingabe erlauben soll. Wie bei
    Eingabefeldern auch ist die Angabe "&lt;&lt;ID&gt;&gt;" ohne Label möglich
    und signalisiert, dass es sich um eine reine Einfügestelle handelt,
    die keine ComboBox in der Formular-GUI erzeugen soll. Falls
    vorhanden werden bis zu N-1 Leerzeichen am Ende der Einträge in der
    Dropdown-Liste entfernt, wobei N die Anzahl der Einträge ist, die
    bis auf folgende Leerzeichen identisch zu diesem Eintrag sind. Dies
    ermöglicht es, das selbe Wort mehrfach in die Liste aufzunehmen.
-   *Checkbox*: Bei Checkboxen kann als "Hilfetext" "Label&lt;&lt;ID&gt;&gt;"
    angegeben werden und wird beim Import entsprechend berücksichtigt.
-   Bei Eingabefeldern und Eingabelisten ist auch die Angabe
    "&lt;&lt;ID&gt;&gt;" ohne Label möglich. Dies signalisiert eine reine
    Einfügestelle an der der Wert des Formularfelds ID eingefügt wird.
    Dies wird verwendet, um den selben Wert an mehreren Stellen einfügen
    zu können ohne dass der Benutzer ihn mehrmals eingeben muss.
-   Bei Eingabefeldern und Eingabelisten ist auch die Angabe
    "&lt;&lt;glob:ID&gt;&gt;" ohne Label möglich. Dies signalisiert eine
    insertValue-Einfügestelle, an der globale Daten (normalerweise die
    Absenderdaten des Sachbearbeiters) eingefügt werden.
-   Bei Eingabelisten/Dropdows ist die Angabe
    "&lt;&lt;gender:ID&gt;&gt;" erlaubt. Diese erzeugt eine reine
    Einfügestelle, die mit einer Gender-TRAFO versehen wird, die
    abhängig vom Formularfeld ID einen der Werte des Dropdowns auswählt,
    und zwar bei "Herr" oder "Herrn" den ersten Eintrag, bei "Frau" den
    zweiten Eintrag und bei allem sonstigen den dritten Eintrag. Hat das
    Dropdown nur 2 Einträge, so wird im sonstigen Fall das Feld ID
    untransformiert übernommen. Falls vorhanden werden ein bis 2 Spaces
    am Ende eines Eintrages der Dropdown-Liste entfernt. Dies ermöglicht
    es, das selbe Wort mehrfach in die Liste aufzunehmen.

### Formular/Formulartitel setzen

Erlaubt es, den Fenstertitel der Formular-Eingabemaske zu editieren.

### Formular/Druckfunktionen setzen

In der erscheinenden Maske können eine oder mehrere Druckfunktionen aus
einer DropDown-Liste ausgewählt und für dieses Dokument gesetzt werden.
In der DropDown-Liste werden alle Druckfunktionen angezeigt, die im
globalen
[Druckfunktionen-Abschnitt](Konfigurationsdatei_wollmux_conf.md#druckfunktionen)
der WollMux-Konfiguration konfiguriert sind. Von den mit dem WollMux und
der Standardkonfiguration ausgelieferten Funktionen, können nur die
folgenden hier sinnvoll verwendet werden:

-   **SeriendruckMitAuswahl**: Diese Funktion kann verwendet werden, um
    dem Benutzer eine Auswahl von vorher festgelegten Adressen zu
    präsentieren (z.B. Krankenkassen) und für jede vom Benutzer
    selektierte eine Ausfertigung zu drucken. Zusätzlich zum Setzen
    dieser Funktion muss die Vorlage mit einer OpenOffice-Datenquelle
    verbunden werden (über den Menüpunkt
    *Bearbeiten/Datenbank austauschen...*). Beim Drucken präsentiert
    diese Funktion dem Benutzer eine Auswahlliste in der er die
    Datensätze wählen kann, für die eine Ausfertigung gedruckt
    werden soll. Angezeigt wird in dieser Liste für jeden Datensatz der
    Inhalt der Spalte "WollMuxDescription". Ist eine Spalte
    "WollMuxSelected" vorhanden und enthält "1", "ja" oder "true", so
    ist der entsprechende Datensatz in der Auswahlliste
    bereits vorselektiert.
-   **SeriendruckOhneAuswahl**: Druckt für jeden Datensatz der über den
    Menüpunkt *Bearbeiten/Datenbank austauschen...* gewählten
    Datenquelle eine Ausfertigung, ohne Benutzerrückfrage. Kann
    verwendet werden, wenn immer für eine vorher bekannte Liste von
    Empfängern mehrere Ausfertigungen gedruckt werden sollen.

Achtung: Die folgenden Druckfunktionen lassen sich **nicht** sinnvoll mit dem FormularMax 4000 verwenden. Wenn Sie hier eine dieser Druckfunktionen setzen, so wird es nicht das tun, was sie vielleicht erwarten.

1. PDFGesamtdokumentOutput
1. SachleitendeVerfuegung
1. MailMergeNewSetFormValue
1. OOoMailMergeToOdtFile
1. MailMergeNewToEMail
1. Seriendruck
1. PDFGesamtdokument
1. Gesamtdokument
1. MailMergeNewToSingleODT
1. SachleitendeVerfuegungOutput
1. OOoMailMergeToPrinter

### Formular/Dateiname vorgeben

Über diesen Menüpunkte kann der Vorlage eine Logik hinterlegt werden,
die den Dateinamen vorschlägt unter dem ein neu aus der Vorlage
erzeugtes Dokument abgespeichert werden soll, wenn es bislang noch nicht
abgespeichert wurde (was daran zu erkennen ist, dass z.B. "Unbenannt 1"
in der Titelzeile angezeigt wird). Dabei kann sich der vorgeschlagene
Dateiname aus fest definierten Bestandteilen und aus Inhalten von
Formularfeldern zusammen setzen.

Nach Betätigen des Menüpunktes erscheint ein Dialog in dem folgende
Einstellungen getroffen werden können:

#### Das Feld "Dateiname"

In dieses Feld wird der zu vergebende Dateiname eingetragen, der sich
aus Text und Inhalten von Formularfeldern zusammen setzen kann, die über
einen Button "ID" eingefügt werden können. Ist die angegebene Datei mit
einem absoluten Pfad hinterlegt (wie z.B.
/mnt/share/mein\_verz/schreiben<UnserZeichen>\_<Datum>.odt oder
U:\\gemeinsameSchreiben\\schreiben<UnserZeichen>\_<Datum>.odt), so wird
dieser Pfad verwendet. Ist die Datei mit einem relativen Pfad hinterlegt
(wie z.B. brief<UnserZeichen>.odt), so wird diese Datei relativ zu dem
in OpenOffice.org/LibreOffice unter Extras&rarr;Optionen/Pfade
definierten Arbeitsverzeichnis aufgelöst. Ein evtl. angegebenes aber
noch nicht existierendes Verzeichnis wird durch den WollMux nicht
angelegt, sondern ignoriert.

Enthält das Feld Dateiname keinen Inhalt, so ist die Funktion zum
Vorschlagen eines Dateinamens deaktiviert.

#### Das Feld "Nachträgliche Anpassung"

Über dieses Feld kann eine Funktion ausgewählt werden, die den sich aus
dem obigen Feld "Dateiname" ergebenen Dateinamen nachträglich anpasst.
Damit kann z.B. eine in Ihrem Unternehmen gesetzte Dateinamenskonvention
umgesetzt werden (wie z.B. das Ersetzen aller Umlaute ä, ö, ü durch ae,
oe und ue). In diesem Feld werden alle in Ihrer WollMux-Konfiguration
definierten Funktionen zur Auswahl angezeigt, die einen Parameter namens
"Filename" erwarten. Eine solche Funktion könnte z.B. wie folgt
aussehen:

```
# Diese Funktion bring einen Dateinamen in eine garantiert bei der LHM zulässige Form.
# Dazu werden mehrere Anpassungen vorgenommen:
#
# 1) Die Umlautzeichen ö, ä, ü, ß werden durch oe, ae, ue, ss ersetzt
#    (in Groß- und Kleinschreibung)
# 2) alle anderen Zeichen außer a-z, A-Z, 0-9, _ und / werden durch _ ersetzt
# 3) Der Dateinamensteil ohne Suffix wird nach 236 Zeichen abgeschnitten
#
# Die Funktion verarbeitet Dateinamen mit und ohne Suffix.
Funktionen(
  LHMDateinamensanpassung(
    CAT(
      REPLACE( REPLACE( REPLACE( REPLACE( REPLACE( REPLACE( REPLACE( REPLACE( REPLACE( REPLACE(
        VALUE "Filename"
        "^(.*)\.\w+$" "$1") "ö" "oe") "ä" "ae") "ü" "ue") "Ö" "OE") "Ä" "AE") "Ü" "UE") "ß" "ss") "[^a-zA-Z_0-9\/]", "_") "(.{0,236}).*" "$1")
      IF(MATCH(VALUE "Filename", "^(.*)(\.\w+)$")
        THEN(REPLACE( VALUE "Filename", "^(.*)(\.\w+)$", "$2"))
        ELSE("")
      )
    )
  )
)
```

Die Angabe einer Funktion für die nachträgliche Anpassung ist optional.

> **INFO** Die Funktion "Formular/Dateiname vorgeben" kann erst verwendet werden,
wenn das Formular einen Namen hat. Deshalb muss das Formular erst unter
einem beliebigen Namen gespeichert werden und dann die Funktion
angewandt werden. Ansonsten kann das Formular nicht mehr als Vorlage
gespeichert werden!

### Bearbeiten/Checkboxen zu ComboBox

Viele Formulare verwenden Reihen von Checkboxen in denen genau eine
anzukreuzen ist (z.B. `[ ] Ja [ ] Nein [ ] keine Angabe`). Werden solche
Checkboxen mit dem FM4000 erfasst, entstehen dadurch WollMux-Formulare
die mit Checkboxen (die in der WollMux-FormularGUI immer vertikal
angeordnet werden) überladen und nicht vernünftig bedienbar sind. Statt
mehrerer Checkboxen sollte in solchen Fällen eine ComboBox verwendet
werden, die je nach im Pull-Down-Menü ausgewählten Wert die passende
Checkbox im Dokument aktiviert. Dies von Hand umzusetzen ist zwar
möglich, aber sehr mühsam. Die Funktion *Checkboxen zu ComboBox*
erledigt dies automatisch und kann dadurch bei Formularen, die derartige
Checkbox-Reihen verwenden, stark zur Verbesserung der Usability
beitragen.

Die Funktion wird wie folgt verwendet:

1.  Checkboxen erfassen
2.  Alle Checkboxen mit Labels versehen. Die Labels der Checkboxen
    ergeben später die Einträge des Auswahlmenüs der ComboBox. Da sich
    diese später nicht mehr so leicht ändern lassen sollte auf diesen
    Schritt besondere Sorgfalt verwendet werden.
3.  Die Checkboxen in die richtige Reihenfolge bringen. Die Einträge im
    Menü der ComboBox entsprechen nachher der Reihenfolge
    der Checkboxen. Da sich die Reihenfolge der Einträge der ComboBox
    derzeit nicht einfach ändern lässt, sollte auch dieser Schritt
    sorgsam überlegt sein.
4.  Die Checkboxen bei gedrückter Strg-Taste mit der linken Maustaste
    markieren, so dass alle zu kombinierenden Checkboxen gleichzeitig
    markiert sind.
5.  Menüpunkt *Bearbeiten/Checkboxen zu ComboBox* aufrufen. Wenn Sie
    alles richtig gemacht haben, dann werden die Checkboxen gelöscht und
    durch eine ComboBox ersetzt.

Technischer Hinweis: Dass je nach Auswahl des Eintrages in der ComboBox die richtige Checkbox aktiviert wird, wird durch TRAFOs auf den Einfügestellen (siehe Reiter *Einfügungen* im FM4000) realisiert, die die folgende Form haben:

```
MATCH(
  VALUE "ComboBoxWert"
  "<Eintrag in der ComboBox>"
)
```

:Hieraus ist ersichtlich, dass ein nachträgliches Ändern der Werteliste der ComboBox eine Anpassung der entsprechenden TRAFOs auf den Einfügestellen erfordert, da ansonsten die entsprechenden Checkboxen nicht mehr schalten. Der FM4000 versucht, bei Änderungen an der Werteliste die TRAFOs automatisch anzupassen. Dies funktioniert jedoch nur solange, wie zu jedem Zeitpunkt maximal ein Eintrag der Werteliste fehlt oder zuviel ist. D.h. wenn sie einen Eintrag zur Werteliste hinzufügen und dann einen alten Eintrag entfernen, so wird der FM4000 korrekt die entsprechenden TRAFOs, die vorher auf den entfernten Eintrag verwiesen haben so umbiegen, dass sie sich nun auf den neuen Eintrag beziehen. Wenn sie dagegen 2 Einträge zur Werteliste hinzufügen und dann 2 alte Einträge löschen, ist es sehr wahrscheinlich, dass der FM4000 die TRAFOs falsch anpasst. Sollte dies geschehen müssen die TRAFOs manuell angepasst werden.

### Bearbeiten/Standardelemente einfügen/Empfängerauswahl-Tab

Fügt am Anfang der Formularbeschreibung ein Standard-Tab ein zum
Ausfüllen des Empfängerfeldes des externen Briefkopfes. Diese Funktion
muss ausgeführt werden bei Dokumenten, die mit einem externen Briefkopf
versehen sind (d.h. die auf Basis der Mischvorlage externer Briefkopf
erstellt werden).

> **INFO** Seit WollMux-5.10.2 ist das *Standardelemente einfügen* Menü konfigurierbar, kann also von den hier vorgestellten Funktionalitäten abweichen.

### Bearbeiten/Standardelemente einfügen/Abbrechen, &lt;-Zurück, Weiter-&gt;

Fügt ganz unten auf dem aktuell sichtbaren Tab die Standardbuttons
"Abbrechen", "&larr;Zurück" und "Weiter&rarr;" ein. Dies sind die
korrekten Buttons für ein mittleres Tab (d.h. ein Tab dem noch ein Tab
vorangeht und eines folgt).

Hinweis: Seit WollMux-5.10.2 ist das *Standardelemente einfügen* Menü konfigurierbar, kann also von den hier vorgestellten Funktionalitäten abweichen.

### Bearbeiten/Standardelemente einfügen/Abbrechen, &lt;-Zurück, PDF, Drucken

Fügt ganz unten auf dem aktuell sichtbaren Tab die Standardbuttons
"Abbrechen", "&larr;Zurück", "PDF" und "Drucken" ein. Dies sind die
korrekten Buttons für das letzte Tab. Gibt es nur ein einziges Tab
sollte der Button "&larr;Zurück" gelöscht werden.

Hinweis: Seit WollMux-5.10.2 ist das *Standardelemente einfügen* Menü konfigurierbar, kann also von den hier vorgestellten Funktionalitäten abweichen.

### Formular/Formularbeschreibung editieren

Schaltet um auf eine Texteditor-Ansicht zum manuellen Bearbeiten der
Formularbeschreibung. Wird in der Menüleiste dieser Ansicht
Datei/Speichern gewählt, so werden die Änderungen übernommen. Wichtig
ist dabei zu beachten, dass die Beschreibung dabei neu geparst und in
die internen Strukturen übertragen wird, d.h. alles was der FM4000
derzeit nicht versteht (z.B. Kommentare, Sichtbarkeitsregeln,...) geht
dabei verloren.

### Formular/WollMux-Formularmerkmale aus Dokument entfernen

Entfernt alle formularspezifischen WollMux-Befehle und Daten aus dem
Dokument. Sonstige WollMux-Befehle, die nicht im Zusammenhang mit den
WollMux-Formularfunktionen stehen, bleiben davon unberührt.

### Datei/Speichern

Identisch zu Datei/Speichern des Writer-Fensters.

### Datei/Speichern unter...

Identisch zu Datei/Speichern unter... des Writer-Fensters.

### Datei/Beenden

Schließt den FormularMax4000. Das Writer-Dokument bleibt geöffnet.

Das Ansicht-Menü
----------------

Über das Menü *Ansicht* können Sie diverse Teile des FormularMax 4000
ein- bzw. ausblenden.

### Ansicht/ID, LABEL, TYPE

Blendet im FormularGUI-Reiter die Bedienelemente zum Bearbeiten der
Felder ID, LABEL bzw. TYPE ein oder aus.

### Ansicht/Elementspezifische Felder

Manche Formularelemente erlauben neben ID, LABEL und TYPE zusätzliche
Angaben. Zum Beispiel kann man bei Elementen des Typs "combobox" die im
Pull-Down-Menü auswählbaren Werte festlegen und, ob die ComboBox direkte
Eingaben erlauben soll. Bei Elementen des Typs "textarea" dagegen kann
man die Anzahl der anzuzeigenden Zeilen spezifizieren. Ist
*Ansicht/Elementspezifische Felder* angeschaltet, so werden die
Bedienelemente für derartige Zusatzangaben eingeblendet.

### Ansicht/TRAFO, PLAUSI, AUTOFILL, GROUPS

Blendet ein Zusatzpanel (die sog. Extra-View) zum Bearbeiten von TRAFOs,
PLAUSIs, AUTOFILLs, sowie der GROUPS-Liste und der
Sichtbarkeitsfunktionen ein bzw. aus.

### Ansicht/Funktionstester

Öffnet ein weiteres Fenster, in dem WollMux-Funktionen erstellt und
getestet werden können.

Reiter "Formular-GUI"
---------------------

Alle Steuerelemente, die später in der Formular-GUI des Formulars
angezeigt werden sollen, werden (evtl. über mehrere Tabs verteilt) in
der Steuerelementanzeige auf dem Reiter "Formular-GUI" angezeigt.

-   Tabs werden mit einem dicken Rand dargestellt und sind jeweils der
    erste Eintrag auf ihrem Tab,
-   Buttons sind daran zu erkennen, dass sie grau hinterlegt sind und
    3D-Ränder haben
-   Beim Anklicken eines Steuerelements wird es ausgewählt, was durch
    eine blaue Umrandung dargestellt wird.
-   Mehrfachauswahl sowie das Abwählen von Elementen sind bei gedrückter
    Strg-Taste möglich.
-   Im ersten Textfeld einer Zeile lässt sich die ID, im zweiten das
    Label des entsprechenden Steuerlements bearbeiten.
-   Beim Auswählen einer combobox (Eingabeliste) erscheint rechts neben
    dem Label ein Eingabefeld, eine Checkbox und zwei Buttons mit "N"
    und "X".
    -   In das Eingabefeld kann Text eingegeben werden, der in der
        Vorlage als Eintrag der Eingabeliste übernommen wird
        -   Der eingegebene Text wird mit dem Button "N" übernommen
        -   Durch Anklicken des "X" wird der im Eingabefeld ausgewählte
            Listeneintrag wieder gelöscht
    -   Wenn die Checkbox aktiv gesetzt ist, kann in der Vorlage
        zusätzlich zu den Listeneinträgen Freitext eingeben werden. Ist
        die Checkbox deaktiv, kann nur zwischen den vorgegebenen
        Einträgen gewählt werden.
-   Beim Auswählen einer textarea erscheint ein zusätzliches
    Eingabefeld, in dem eine Zahl eingegeben werden kann. Diese gibt die
    Anzahl der darzustellenden Zeilen an. Daneben ist eine Checkbox.
    Falls diese aktiviert ist, so wird Text am rechten Rand der Textarea
    umgebrochen (d.h. horizontales Scrollen ist nicht notwendig).
    Beachten Sie, dass es sich dabei nur um die Darstellung handelt.
    Zeilenumbrüche werden nie automatisch eingefügt.

### Buttons

Im folgenden werden die Funktionen in der Buttonleiste des Reiters
"Formular-GUI" vorgestellt.

#### Hoch

Verschiebt die aktuelle ausgewählten Elemente um eins nach oben.
Elemente die bereits ganz am Anfang ihres Tabs sind wandern dabei auf
das vorhergehende Tab, falls es eines gibt.

#### Runter

Wie der Button "Hoch", aber nach unten :-)

#### Löschen

Löscht die aktuell ausgewählten Elemente. Durch Auswählen des
dick-umrandeten Tab-Elements ist es möglich das entsprechende Tab zu
löschen. Dies löscht *nicht* die enthaltenen Bedienelemente. Stattdessen
werden diese an das Ende des vorhergehenden Tabs angehängt.

#### Neuer Tab

Schiebt das markierte Element sowie alle Folgeelemente des aktuellen
Tabs auf einen neu erzeugten Tab.

#### Neues Label

Fügt vor der markierten Position ein Label ein. Das Label wird in der
Formular-GUI auf einer eigenen Zeile angezeigt ohne zugehöriges
Eingabefeld. Dies ist nützlich, um kleine Hilfetexte in ein Formular
einzubauen oder um Kontext herzustellen für die folgenden
Eingabeelemente. Im folgenden Beispiel ist der Text "Der Antrag" ein
Label, das den Satzanfang für die folgenden Checkboxen liefert. Labels
wie dieses erleichtern das Ausfüllen eines Formulars wesentlich.

```
Der Antrag
[x] wurde geprüft
[x] ist vollständig
[x] wurde zu den Akten gelegt
```

Reiter "AUTOFILL", "PLAUSI", "TRAFO" und "GROUPS"
-------------------------------------------------

Um AUTOFILLs, PLAUSIs und TRAFOs zu bearbeiten muss zuerst über
*Ansicht/TRAFO,PLAUSI,AUTOFILL* die Extra-View aktiviert werden (ein
Zusatzpanel an der rechten Seite des FM4000).

Der Reiter AUTOFILL wird in der rechten Hälfte des FM4000-Fensters
angezeigt, wenn in der linken der Reiter "Formular-GUI" angezeigt wird
und dort *genau ein* Eintrag selektiert ist. Wenn das ausgewählte
Element weder PLAUSI noch AUTOFILL noch GROUPS gesetzt hat, so muss erst
der Button "Aktivieren" in der Extra-View gedrückt werden, um die Reiter
PLAUSI, AUTOFILL und GROUPS einzublenden. Die als AUTOFILL spezifizierte
Funktion (falls nicht "&lt;keine&gt;") legt die automatische Vobelegung des
Formularfeldes fest.

Der Reiter PLAUSI wird in der rechten Hälfte des FM4000-Fensters
angezeigt, wenn in der linken der Reiter "Formular-GUI" angezeigt wird
und dort *genau ein* Eintrag selektiert ist. Wenn das ausgewählte
Element noch weder PLAUSI noch AUTOFILL noch GROUPS gesetzt hat, so muss
erst der Button "Aktivieren" in der Extra-View gedrückt werden, um die
Reiter PLAUSI, AUTOFILL und GROUPS einzublenden. Die als PLAUSI
spezifizierte Funktion (falls nicht "&lt;keine&gt;") bestimmt eine
Prüffunktion, die die Eingabe auf Korrektheit testet.

Der Reiter GROUPS wird in der rechten Hälfte des FM4000-Fensters
angezeigt, wenn in der linken der Reiter "Formular-GUI" oder "Bereiche"
angezeigt wird und dort *genau ein* Eintrag selektiert ist. Wenn das
ausgewählte Element noch weder PLAUSI noch AUTOFILL noch GROUPS gesetzt
hat, so muss erst der Button "Aktivieren" in der Extra-View gedrückt
werden, um die Reiter PLAUSI, AUTOFILL und GROUPS einzublenden. Auf dem
Reiter GROUPS sind alle definierten Sichtbarkeitsgruppen aufgeführt und
können durch Anklicken bei gedrückter Ctrl/Strg-Taste dem ausgewählten
Formularsteuerelement zugewiesen werden, so dass die Sichtbarkeit des
Elements von der entsprechenden Sichtbarkeitsfunktion abhängt.

Der Reiter TRAFO wird in der rechten Hälfte des FM4000-Fensters
angezeigt, wenn in der linken der Reiter "Einfügungen" angezeigt wird
und dort *genau ein* Eintrag selektiert ist. Ist für das ausgewählte
Element noch keine TRAFO gesetzt, so muss der Reiter TRAFO erst durch
den "Aktivieren" Button in der Trafo-View freigeschaltet werden. Die als
TRAFO spezifizierte Funktion (falls nicht "&lt;keine&gt;") gibt an, wie ein
einzufügender Wert vor dem Einfügen umgewandelt werden soll.

Im folgenden sind die Möglichkeiten beschrieben, Funktionen zu
spezifizieren.

> **HINT** Verwenden Sie die über *Ansicht/Funktionstester* aktivierbare GUI, um Ihre Funktionen einzugeben und zu testen.

### &lt;Wert&gt;

Die Auswahl von "&lt;Wert&gt;" in der Funktion-ComboBox erlaubt die Eingabe
eines (evtl. mehrzeiligen) Textes mit dem das Feld vorbelegt wird.
Handelt es sich bei dem Feld um eine Checkbox, so wird der Text "true"
als gesetzt und alles andere als nicht gesetzt interpretiert.

### &lt;Code&gt;

Die Auswahl von "&lt;Code&gt;" in der Funktion-ComboBox erlaubt die
Direkteingabe einer
[Funktion](Konfigurationsdatei_wollmux_conf.md#funktionen) (ohne
umschließenden Funktionsbezeichner). Die Funktion muss vollständig
spezifiziert sein und alle Formularfelder auf die Bezug genommen wird
müssen mit ihrer korrekten ID referenziert werden. Im folgenden ein
Beispiel für eine PLAUSI, die testet, ob das Feld "Nachname" nicht leer
ist.

`MATCH(VALUE('Nachname'), ".+")`

Zu beachten ist, dass "Nachname" hier wirklich die ID des entsprechenden
Eingabefeldes ist. Ist die ID des Eingabefeldes z.B. "nachname" (man
beachte die Kleinschreibung), so wird die obige PLAUSI nicht
funktionieren.

### Globale Funktion

Der [Funktionen-Abschnitt der wollmux.conf](Konfigurationsdatei_wollmux_conf.md#funktionen)
erlaubt das Angeben von globalen Funktionen. Alle dort angegebenen
Funktionen werden vom FM4000 zur Auswahl angeboten. Erwartet eine
Funktion Parameter, so können diese in den entsprechenden ComboBoxen
gesetzt werden, entweder auf einen festen String oder als Referenz auf
ein Formularfeld. Die Auswahl von "\[nicht fest verdrahtet\]" lässt den
entsprechenden Parameter-Wert offen. Je nach Kontext werden offen
gelassene Parameter-Werte verschieden behandelt:

-   Bei AUTOFILLs sollte nie ein Parameter unbelegt bleiben. Je nach
    Funktion können unbelegte Parameter zu Fehlern führen.
-   Bei TRAFOs werden alle unbelegten Parameter mit dem jeweils zu
    transformierenden Wert belegt. Deshalb hat eine TRAFO fast immer
    mindestens einen unbelegten Parameter.
-   Bei PLAUSIs werden alle unbelegten Parameter mit dem Wert des
    Formularfeldes zu dem die PLAUSI gehört belegt. Deshalb hat eine
    PLAUSI fast immer mindestens einen unbelegten Parameter.

### Referatsspezifische Plugins

Der WollMux erlaubt den Referaten, [eigene Plugins](Konfigurationsdatei_wollmux_conf.md#einbinden-referatseigener-pluginsclasspath) einzubinden. Es gibt grundsätzlich zwei Möglichkeiten, eine Plugin-Funktion im FormularMax 4000 zu verwenden:

#### Global registrierte Plugin-Funktionen

Achtung: Wird eine global registrierte Plugin-Funktion (siehe Abschnitt weiter oben) für ein Formular verwendet, so muss diese bei jedem Anwender, der die Vorlage verwenden möchte global registriert sein. D.h. es ist *nicht* möglich, Funktionen temporär global zu registrieren, damit der Vorlagenersteller diese im FormularMax 4000 verwenden kann, und sie anschließend aus dem globalen *Funktionen*-Abschnitt zu entfernen. Wenn eine Funktion nicht dauerhaft im globalen *Funktionen*-Abschnitt erscheinen soll, so muss eine [nicht registrierte Plugin-Funktion](#nicht-registrierte-plugin-funktionen) verwendet werden.

#### Nicht registrierte Plugin-Funktionen

Manchmal ist es nicht erwünscht, Plugin-Funktionen im globalen
*Funktionen*-Abschnitt zu registrieren. Gründe hierfür können zum
Beispiel folgende sein:

-   Eine Funktion wird nur in einer oder zwei Vorlagen verwendet. Es
    kann störend sein, wenn solche Funktionen in jeder
    Funtionsauswahl-Kombobox des FormularMax 4000 angezeigt werden.
-   Soll eine Vorlage an ein anderes Referat weitergegeben werden und
    die Vorlage verwendet eine global registrierte Plugin-Funktion, so
    muss das empfangende Referat die Plugin-Funktion ebenfalls
    global registrieren. Dabei sind schwer auflösbare Namenskonflikte
    möglich und die Funktion erscheint in jedem FormularMax 4000 des
    empfangenden Referats. Beides ist ungünstig.

In solchen Fällen ist es günstiger, auf das globale registrieren einer
Plugin-Funktion zu verzichten. Um diese dennoch verwenden zu können,
kann eine Kombination von BIND und EXTERN direkt eingegeben werden. Zu
diesem Zweck wird als Funktion "&lt;Code&gt;" ausgewählt und im
Eingabefeld ein Code eingegeben wie z.B. der folgende

```
BIND(
 FUNCTION(
   EXTERN(
     URL "java:de.muenchen.kvr.FormularFunktionen.resturlaub"
     PARAMS("p1", "p2", "p3")
   )
 )

 SET(
   "p1"
   VALUE "urlaubsanspruch1"
 )

 SET(
   "p2"
   VALUE "bereitsbeantragt1"
 )

 SET(
   "p3"
   VALUE "jetztbeantragt1"
 )
)
```

In diesem Beispiel wird die Plugin-Funktion
de.muenchen.kvr.FormularFunktionen.resturlaub verwendet. Diese erwartet
3 Parameter. Die Bezeichner *p1*, *p2* und *p3* sind willkürliche
Platzhalter für diese 3 Parameter. In den SET-Abschnitten werden den 3
Parametern entsprechende Aufrufwerte zugewiesen. *urlaubsanspruch1*,
*bereitsbeantragt1* und *jetztbeantragt1* sind *nicht* willkürlich
gewählt, sondern sind die IDs von den 3 Eingabefeldern des
WollMux-Formulars aus denen der Resturlaub berechnet werden soll. Es ist
wichtig, darauf zu achten, dass das Wort "VALUE" nicht vergessen wird.
Ansonsten würden "urlaubsanspruch1" etc. direkt als Strings übergeben
anstatt der Werte der Eingabefelder.

Funktionstester
---------------

Der Funktionstester lässt sich über *Ansicht/Funktionstester* aufrufen.
In dieser GUI können Sie
[WollMux-Funktionen](Konfigurationsdatei_wollmux_conf.md#grundfunktionen)
eingeben und testen, bevor Sie sie über die Zwischenablage in die
Code-Ansicht von TRAFO, PLAUSI oder AUTOFILL kopieren. Die einzelnen
Buttons des Funktionstesters fügen jeweils ein typisches Code-Muster für
die entsprechende Funktion ein. Die VALUE-Buttons im oberen Teil des
Testers nehmen die in den links daneben stehenden ComboBoxen
eingegebenen bzw. ausgewählten Strings als Bezeichner. Die Eingabefelder
rechts neben den VALUE-Buttons erlauben es, die Werte zu spezifizieren,
die für die Auswertung der Funktion für die entsprechenden
VALUE-Statements angenommen werden sollen.

Reiter "Einfügungen"
--------------------

Der Reiter "Einfügungen" bietet eine Übersicht und erlaubt die
Manipulation aller Einfügestellen im Dokument. Einfügestellen sind
sowohl Stellen an denen Formularwerte eingefügt werden als auch Stellen
an denen Daten aus der globalen Datenquelle (z.B. Sachbearbeiterdaten
wie das Dienstgebäude) eingefügt werden.

Das Auswählen und Markieren von Einträgen funktioniert wie im Reiter  "Formular-GUI".

### Buttons

Im folgenden werden die Funktionen in der Buttonleiste des Reiters
"Einfügungen" vorgestellt.

#### Entfernen (DeMux)

Entfernt die WollMux-Befehle der ausgewählten Einfügestellen aus dem
Dokument, d.h. der Feldbefehl bleibt erhalten, aber er ist keine
WollMux-Einfügestelle mehr. Durch *Formular/Formularfelder aus Dokument
einlesen* kann der Feldbefehl wieder erfasst werden.

Reiter "Sichtbarkeiten"
-----------------------

Auf diesem Reiter sind alle Sichtbarkeitsgruppen zu finden, die im
Formular definiert sind. Wird eine Sichtbarkeitsgruppe durch anklicken
ausgewählt, so wird in der rechten Hälfte der GUI des FM4000 die
zugehörige Sichtbarkeitsfunktion angezeigt und kann bearbeitet werden.
Im Ansicht-Menü muss dazu der Punkt "TRAFO, PLAUSI, AUTOFILL, GROUPS"
aktiviert sein.

Die Festlegung einer Sichtbarkeitsfunktion erfolgt analog zu PLAUSIs,
TRAFOs und AUTOFILLs. Siehe Beschreibung weiter oben.

Reiter "Bereiche"
-----------------

Auf diesem Reiter sind alle im Dokument definierten Textbereiche
aufgeführt (vgl. *Format/Bereiche...*). Für jeden Bereich existiert ein
Textfeld in dem der Name des Bereichs angezeigt wird und bearbeitet
werden kann. Im Unterschied zur Anzeige im Navigator bzw. dem Dialog
*Format/Bereiche...* wird eine eventuell vorhandene GROUPS-Angabe in
diesem Feld nicht angezeigt. Der GROUPS-Teil des Bereichsnamens wird
automatisch verwaltet.

Neben dem Textfeld für den Bereichsnamen befindet sich eine Checkbox mit
der sich der Bereich sichtbar und unsichtbar schalten lässt. Dies ist
nützlich, um zu überprüfen, ob der Bereich im Dokument korrekt plaziert
wurde.

Wird im *Ansicht*-Menü der Punkt "TRAFO, PLAUSI, AUTOFILL, GROUPS"
aktiviert, so lassen sich in der rechten Hälfte des FM4000 die
Sichtbarkeitsgruppen auswählen, zu denen der Bereich gehören soll.

### Button "Aufheben"

Entfernt den Bereich aus dem Dokument, jedoch nicht seinen Inhalt.

### Button "Neu"

Legt einen neuen Bereich an, der den momentan mit der Maus selektierten
Text umschließt. Beachten Sie, dass Bereiche nur ganze Absätze enthalten
können. Diese Funktion fügt also falls nötig neue Absatzumbrüche am
Anfang und/oder Ende der Selektion ein.

### Button "Neu (ganze Seiten)"

Legt einen neuen Bereich an, der den momentan mit der Maus selektierten
Text umschließt und an einem manuellen Seitenumbruch (oder dem Anfang
des Dokuments) beginnt und an einem manuellen Seitenumbruch (oder dem
Ende des Dokuments) endet. Diese Funktion ist z.B. nützlich, wenn in
einem größeren Formular komplette von manuellen Seitenumbrüchen
eingefasste Teildokumente eingebettet sind, die im ganzen ein- bzw.
ausgeblendet werden sollen. In diesem Fall setzt man einfach den
Mauscursor irgendwo in so ein Teildokument und ruft diese Funktion auf.

Hinweis: Derzeit versteht diese Funktion nur manuelle Seitenumbrüche mit Position "Davor" (siehe Absatzeigenschaften/Reiter "Textfluss"/Abschnitt "Umbrüche". Dies ist der Standardtyp, der durch *Einfügen/Manueller Umbruch.../Seitenumbruch* eingefügt wird.

<Kategorie:Office_Vorlagenumsteller_Handbuch>

<Category:AG-Office> <Category:Eierlegender_WollMux>
<Category:Handbuch_des_WollMux>
