Ein wesentlicher Bestandteil des WollMux sind die sog. "WollMux-Kommandos", die Sie in OOo-Dokumente integrieren können. Die Kommandos sorgen dafür, dass die Inhalte (z.B. Absenderdaten), die der WollMux bereitstellt in das Zieldokument eingefügt werden.

<!-- toc -->

WollMux-Kommandos
=================

Ein WollMux-Kommando ist ein benanntes Bookmark (eine Textmarke), wobei der Name des Bookmarks zugleich das Kommando enthält. Ein WollMux-Kommando hat folgenden Aufbau:

`WM(CMD '<kommando>' <ARGUMENT_1> '<foo1>' ...  <ARGUMENT_N> '<fooN>')<nummer>`

Die Syntax der WM-Kommandos richtet sich nach dem [Format von WollMux-Config-Dateien](Format_von_WollMux-Config-Dateien.md). Jedes WollMux-Kommando beginnt mit dem Schüsselwort "WM" und ist von runden Klammern umgeben. Innerhalb der Klammer werden folgende Schlüssel-Wert-Paare akzeptiert:
* **CMD**: Der Schlüssel CMD &lt;kommando&gt; beschreibt den Namen des einzufügenden Kommandos.
* **&lt;ARGUMENT_1..N&gt;**: Jedes Kommando kann benannte Parameter wie z.B. FRAG_ID besitzen. Die benötigten Argumente werden mit den einzelnen Kommandos individuell festgelegt.

Da Bookmarks eindeutig sein müssen, ist an jedes Kommando, das bereits in der exakt selben Schreibweise definiert worden ist eine natürliche Zahl `<nummer>` anzuhängen. Die Zahl wird bei unterschiedlich geschriebenen Kommandos nicht benötigt.

WollMux-Kommandos in Dokumenten und Textfragmenten verwenden
------------------------------------------------------------

Sowohl Dokumente als auch Textfragmente können WollMux-Kommandos enthalten. Ein Beispiel zur Verwendung der WollMux-Kommandos ist unter [Textfragmente im WollMux](Textfragmente_im_WollMux.md#dokumentkommandos-in-textfragmenten-verwenden) enthalten.

Globale Dokumentkommandos
-------------------------

Die folgenden Dokumentkommandos werden unabhängig vom Dokumenttyp (z.B. Vorlage oder Dokument) immer beachtet.

### Das Kommando `WM(CMD 'setType' TYPE '<type>')`

Über das Kommando 'setType' kann der Typ eines Dokuments oder einer Vorlage fest vorgegeben werden. Enthält ein Dokument oder eine Vorlage dieses Kommando, so hat diese Festlegung Vorrang vor der automatischen Dokumenterkennung (siehe [Verhalten der Dateiendungen .odt und .ott](Textfragmente_im_WollMux.md#verhalten-der-dateiendungen-odt-und-ott)).

Für den Parameter **TYPE** sind folgende Werte zugelassen:
* **normalTemplate** Mit diesem Type können Sie festlegen, dass ein Dokument wie eine Vorlage behandelt wird, auch dann, wenn das Dokument die Dateiendung .odt besitzt. Nach dem Öffnen eines Dokuments oder einer Vorlage, die dieses Kommando enthält, wird der WollMux veranlasst, auch die evtl. weiteren im Dokument enthaltenen Dokumentkommandos auszuführen. Auf diese Weise wird erreicht, dass das so erzeugte Dokument nach dem Speichern nicht wieder als Vorlage, sondern als normales Dokument betrachtet wird.<br>
Bei Erzeugen eines Dokuments aus einer Vorlage, Vorlage bearbeiten und Dokument öffnen wird das WollMux-Kommando einmalig ausgeführt. Der Typ wird festgelegt und danach wird das WollMux-Kommando gelöscht. Bei einem Fehler wird eine Fehlermeldung angezeigt und das WollMux-Kommando wird nicht gelöscht.<br>
**Praktischer Anwendungsbereich**: Öffnen eines Dokuments aus dem Dokumenten Management System (**DMS**). Manche Dokumente des DMS sollen wie Vorlagen behandelt werden, obwohl sie aus technischen Gründen nur als .odt abgespeichert werden können. Um dies zu erreichen wird der Typ 'normalTemplate' gesetzt.
* **templateTemplate** Mit diesem Type können Sie steuern, dass eine Vorlage als "Vorlage für eine Vorlage" betrachtet wird. D.h. Die Vorlage wird als Vorlage geöffnet, die enthaltenen Dokumentkommandos werden jedoch **nicht** ausgeführt.<br>
Auf diese Weise können Sie eine Vorlage erstellen, die als Vorlage für eine neue WollMux-Vorlage benutzt werden kann, ohne dass die in Ihr enthaltenen Dokumentkommandos sofort ausgeführt werden. Nach der Erstellung der Vorlage, d.h. nach dem ersten Abspeichern, kann die Vorlage als vollwertige WollMux-Vorlage benutzt werden, bei der auch (erwartungsgemäß) die enthaltenen Dokumentkommandos interpretiert werden.<br>
Beim Erzeugen eines Dokuments aus einer Vorlage wird das WollMux-Kommando einmalig ausgeführt. Der Typ wird geändert, danach wird das WollMux-Kommando gelöscht. Das Kommando wird nicht entfernt, wenn die Vorlage im Modus "Vorlage bearbeiten" geöffnet wurde. Bei einem Fehler erscheint eine Fehlermeldung, das WollMux-Kommando wird nicht gelöscht.<br>
**Praktischer Anwendungsbereich**: **Mischvorlagen** sind Vorlagen, die jedoch nicht sofort vom WollMux behandelt werden sollen. Erst wenn die Vorlagenerstellerin oder der Vorlagenersteller durch Anpassung der Mischvorlage eine "richtige" Vorlage erzeugt und als &lt;vorlagenname&gt;.ott abgespeichert hat, soll der WollMux nach erneutem Öffnen der Vorlage &lt;vorlagenname&gt;.ott aktiv werden.
* **formDocument** Mit diesem Type können Sie steuern, dass ein Dokument als "Dokument mit Formularfunktionalität" behandelt wird. D.h. außer den [Kommandos des Formularsystems](Dokumentkommandos_des_WollMux.md#kommandos-des-formularsystems) werden keine Dokumentkommandos interpretiert. Nur die grafische Oberfläche des Formularsystems wird angezeigt, der WollMux lässt das Dokument sonst unverändert.<br>
Die Textmarke `'setType' TYPE 'formDocument'` wird zwar bei Dokument öffnen, Dokument aus einer Vorlage erzeugen und Vorlage bearbeiten gelöscht, die Information wird aber in der Datei wollmux.rdf abgelegt. Dadurch wird erreicht, dass ein Formular-Dokument immer als Formular-Dokument betrachtet wird.<br>
**Praktischer Anwendungsbereich**: Bei den sog. **WollMux-Formularen** möchte man erreichen, dass die Formulare auch nach dem Speichern (als .odt) wieder als "Formulardokumente" behandelt werden. D.h. der WollMux öffnet zusätzlich zum Formulardokument den Formulardialog und zeigt ihn links neben diesem an.

### Das Kommando `WM(CMD 'setPrintFunction' FUNCTION '<Bezeichner>')`

In jedem Dokument können Druckfunktionen festgelegt werden, die beim Drucken ausgeführt werden sollen. Dieses Kommando nimmt die Druckfunktion &lt;Bezeichner&gt; in die Liste der Druckfunktionen auf, die für dieses Dokument gesetzt sind. Es zeigt immer dann Wirkung, wenn in LibreOffice der Menüpunkt "Datei&rarr;Drucken..." bzw. der Knopf "Drucken" der Symbolleiste betätigt wird. Die Druckfunktion &lt;Bezeichner&gt; muss global in einem Abschnitt [Druckfunktionen in der Konfigurationsdatei wollmux.conf](Konfigurationsdatei_wollmux_conf.md#druckfunktionen) definiert sein.

**Gültigkeitsbereich und Lebensdauer**: Die Textmarke `setPrintFunction` wird direkt nach dem Öffnen des Dokuments bzw. der Vorlage gelöscht, dabei aber dauerhaft in den Abschnitt 'PrintFunction' der wollmux.rdf übertragen. Dadurch wird erreicht, dass beim Drucken immer diese Druckfunktion ausgeführt wird.

### Das Kommando `WM(CMD 'insertFormValue' ID '<feldId>'[ TRAFO '<Funktionsbezeichner>'])`

Beschreibung: Dieses Kommando erzeugt an der Stelle des Bookmarks einen LibreOffice-*Feldbefehl* vom Typ Eingabefeld (siehe auch Einfügen&rarr;Feldbefehl&rarr;Funktionen/Eingabefeld) und befüllt es stets mit dem Inhalt des Formularfeldes, das den eindeutigen Bezeichner ID besitzt. Falls schon Eingabefelder, Checkboxen, Dropdownfelder oder Datenbankfelder vorhanden sind, werden diese verwendet.

**Gültigkeitsbereich und Lebensdauer**: Das Kommando 'insertFormValue' ist automatisch bei Vorlagen, Dokumenten und Formulardokumenten aktiv und kann über die FormGUI, über den Seriendruckmechanismus (WollMux) und über den Empfägerauswahl-Dialog gefüllt werden.

> **INFO** Datenbankfelder, die über den Datenquellenbrowser (Ansicht/Datenquellen) bzw. über Einfügen/Feldbefehl/Andere.../Datenbank/Seriendruck-Feld eingefügt wurden, werden vom WollMux behandelt als wären es insertFormValue-Kommandos. Als ID wird der Spaltenname herangezogen.

Das Kommando erwartet die Parameter:
* **ID (eindeutiger Bezeichner des Formularfeldes)** ID beschreibt den eindeutigen Bezeichner des Formularfeldes, dessen Inhalt in das Formular eingefügt werden soll. Das entsprechende Formularfeld muss in der [Formularbeschreibung](#beschreibung-der-formular-gui) des Formulars definiert sein.<br>
<br>
Beispiel: Sie haben in Ihrer Formularbeschreibung das Formularfeld (eine Combobox) mit der &lt;fieldId&gt; "Anrede" definiert.
```
WM(
  Formular(
    TITLE "Testformular"
    Fenster(
      Empfaenger(
        TITLE "Empfänger"
        CLOSEACTION "abort"

        Eingabefelder(
          (LABEL "Anrede" TYPE "combobox" VALUES ("Herr", "Frau") '''ID "Anrede" '''
             EDIT "true" AUTOFILL "Frau"'''
          )
        )
      )
    )
  )
)
```
Um den Wert dieses Formularfeldes ins Dokument einzufügen, benötigen Sie folgendes Dokumentkommando: `WM(CMD 'insertFormValue' ID 'Anrede')`

* **TRAFO &lt;Funktionsbezeichner&gt;** Der Parameter TRAFO ist optional und muss nicht angegeben werden. Als `<Funktionsbezeichner>` kann der Name einer Funktion angebeben werden, der in einem Abschnitt [Funktionen](Konfigurationsdatei_wollmux_conf.md#funktionen) entweder in der globalen [Konfigurationsdatei wollmux.conf](Konfigurationsdatei_wollmux.conf) oder in der [Formularbeschreibung](#beschreibung-der-formular-gui) einer Vorlage definiert ist. Anstelle des Wertes, der im Formularfeld steht wird dann der Rückgabewert der Funktion eingefügt. Erwartet die Trafofunktion einen oder mehrere Parameter, so wird für alle Parameter der untransformierte Wert des durch ID spezifizierten Formularfeldes übergeben.<br>
<br>
Beispiel: Der Wert des Formularfeldes mit der ID "Anrede" soll verwendet werden, um im Dokument das Wort "geehrte" bzw. "geehrter" automatisch einzutragen. Dies können Sie wie folgt realisieren: Sie definieren eine Funktion mit der ID "Geehrter", die abhängig vom Geschlecht das entsprechende Wort "geehrte" bzw. "geehrter" zurückliefert. Die Definition der Funktion erfolgt in diesem Fall in der globalen Konfigurationsdatei wollmux.conf, da die Funktion dann auch aus anderen Vorlagen heraus verwendet werden kann. Die benötigte Definition könnte wie folgt aussehen:
```
[...]
Funktionen(
  Geehrter(IF(MATCH(VALUE'Anrede', "Frau") THEN "geehrte" ELSE "geehrter"))
)
[...]
```
Um nun die Transformation anwenden zu können, benötigen Sie nur noch das entsprechende insertFormValue-Kommando im Dokument. Dieses würde wie folgt lauten: `WM(CMD 'insertFormValue' ID 'Anrede' TRAFO 'Geehrter')`

Es ist auch möglich, das Eingabefeld bereits in der Vorlage zu definieren und nicht erst vom "insertFormValue"-Kommando generieren zu lassen. In diesem Fall wird das bereits bestehende Eingabefeld der Vorlage verwendet und kein neues Eingabefeld erzeugt. Das entsprechende Eingabefeld muss dazu jedoch vollständig vom Bookmark des insertFormValue-Kommandos umschlossen sein.

Dabei ist es auch möglich, Eingabefelder vom **Typ "Eingabeliste"** im Dokument zu definieren, die über den Menüpunkt "Einfügen&rarr;Feldbefehl&rarr;Andere.../Funktionen/Eingabeliste" in das Dokument eingefügt werden können.

![So wird eine Checkbox eingefügt|thumb](images/Dokumentkommandos/checkboxes.png "fig:So wird eine Checkbox eingefügt|thumb")

Als eine besondere Form von Eingabefeldern zur Darstellung der Formularwerte werden dabei auch **Checkboxen** unterstützt, die sie über "Ansicht&rarr;Symbolleisten&rarr;Formular-Steuerelemente" und dem Auswählen eines Formularelements vom Typ Checkbox in Ihre Vorlage einfügen können. Auch hier gilt: Findet der WollMux diese Combobox umschlossen von einem "insertFormValue"-Kommando, so wird diese Combobox zur Darstellung des Formularwertes verwendet. Dabei greift folgende Abbildung:
* Der String "true" wird immer auf ein gesetztes Häckchen in der Combobox abgebildet.
* alle anderen Strings (und damit auch "false") werden auf ein nicht gesetztes Häckchen abgebildet.

### Die Kommados `WM(CMD '<mark>'[ HIGHLIGHT_COLOR '<farbe>'])`

Mit den Kommandos wird Text markiert, der nur in einem speziellen Ausdruck gedruckt wird. Die Markierungen werden auch über die Buttons in der OOo-Writer Symbolleiste **Sachleitende Verfügungen (WollMux)** gesetzt.

Es werden 5 verschiedene Markierungen &lt;mark&gt; unterstützt:
* **draftOnly** Der markierte Text wird nur im Entwurf gedruckt.
* **notInOriginal** Der markierte Text wird immer gedruckt außer im Original. Im Falle von internen Schreiben entspricht das Original dem Ausdruck, der nur den ersten Verfügungspunkt (ohne die Ziffer "I.") enthält.
* **originalOnly** Der markierte Text wird ausschließlich im Original gedruckt. Im Falle von internen Schreiben entspricht das Original dem Ausdruck, der nur den ersten Verfügungspunkt (ohne die Ziffer "I.") enthält.
* **copyOnly** Der markierte Text wird ausschließlich in Abdrucken (das sind alle Ausdrucke außer dem Original und dem Entwurf) gedruckt.
* **allVersions** Der markierte Text wird immer gedruckt.

**Der Parameter `HIGHLIGHT_COLOR '<farbe>'`** ist optional und muss nicht angegeben werden. Das Attribut HIGHLIGHT_COLOR wird vom WollMux automatisch in das zugehörigen Dokumentkommando gesetzt, wenn die [Schaltflächen zur Drucksteuerung einzelner Blöcke](Hilfen_fuer_Sachleitende_Verfuegungen_verwenden.md#die-schaltflächen-zur-drucksteuerung-einzelner-blöcke) betätigt werden und im [Abschnitt SachleitendeVerfuegungen](Konfigurationsdatei_wollmux_conf.md#der-abschnitt-sachleitendeverfuegungen) der Konfigurationsdatei entsprechende Farben hinterlegt sind. Das Attribut markiert einen Druckblock, der mit einer Hintergrundfarbe versehen ist und wird dann verwendet, wenn ein Dokument mit Sachleitenden Verfügungen gedruckt wird. Vor dem Druckvorgang hebt der WollMux dabei alle farblichen Markieren der Druckblöcke auf (falls Farben gesetzt wurden) und stellt sie nach dem Druckvorgang wieder her in dem er den Wert von HIGHLIGHT_COLOR liest und auf den entsprechenden Bereich als Hintergrundfarbe anwendet. Die Farbe &lt;farbe&gt; wird als Hex-Zahl in der form AARRGGBB (A=Alpha, R=Rot, G=Grün, B=Blau) beschrieben (z.B. entspricht "00ff0000" der Farbe rot).

**Gültigkeitsbereich und Lebensdauer**: Die Kommandos werden beim Drucken eines geöffneten Dokuments, einer geöffneten Vorlage und einer zur Bearbeitung geöffneten Vorlage mit Sachleitende Verfügungen ausgeführt. Gelöscht wird das Kommando über die Buttons in  der OOo-Writer Symbolleiste **Sachleitende Verfügungen (WollMux)**.

> **WARNING** Die Kommandos "draftOnly", "notInOriginal", "originalOnly", "copyOnly" und "allVersions" dienen zur Drucksteuerung der Sachleitenden Verfügungen und sollten nicht händisch durch das Einfügen entsprechender Textmarken erzeugt werden, sondern über die [Schaltflächen zur Drucksteuerung](Hilfen_fuer_Sachleitende_Verfuegungen_verwenden.md#die-schaltflächen-zur-drucksteuerung-einzelner-blöcke), die in der [Symbolleiste 'Sachleitende Verfügungen'](Hilfen_fuer_Sachleitende_Verfuegungen_verwenden.md#die-LibreOffice-writer-symbolleiste-sachleitende-verfügungen) enthalten sind.

Kommandos des Briefkopfsystems
------------------------------

Die Briefkopfkomponente des WollMux unterstützt folgende Kommandos:

### Das Kommando `WM(CMD 'insertFrag' FRAG_ID '<fragment_id>'[ STYLES ('<style1>' , '<style2>', '<styleN>')][ ARGS('<arg1>', '<arg2>', '<argN>')][ MODE '<modus>'])`

**Beschreibung**: Fügt das in der Konfigurationsdatei unter &lt;fragment_id&gt; definierte Textfragment an dieser Stelle ein. Ein Textfragment kann selbst weitere WollMux-Kommandos enthalten, die sofort ausgewertet werden.

**Gültigkeitsbereich und Lebensdauer**: Das Fragment mit der FRAG_ID '&lt;fragment_id&gt;' wird beim Erzeugen eines Dokuments aus einer Vorlage, eingefügt danach wird das WollMux-Kommando gelöscht. Treten Fehler beim Einfügen auf, wird eine Fehlermeldung ausgegeben und das WollMux-Kommando wird gelöscht.

**Löschen von leeren Absätzen**: Nach dem Einfügen eines Textfragmentes wird der erste und/oder der letzte Absatz des eingefügten Textfragments gelöscht, wenn diese Absätze leer sind. Enthält das Textfragment überhaupt keinen Textinhalt und ist es das einzige Element in einem Absatz, so wird der Absatz nach der Ausführung des Kommandos gelöscht.

Welche Absatzformate werden wann verwendet?: Bitte beachten Sie hierzu den Abschnitt [Übernahme von Absatzformaten beim Einfügen von Textfragmenten](Textfragmente_im_WollMux.md#übernahme-von-absatzformaten-beim-einfügen-von-textfragmenten) in dem festgelegt ist, in welchem Fall welche Absatzformate verwendet werden.

Wenn Sie in ihren Textfragmenten Textfelder von LibreOffice verwenden, beachten Sie bitte auch das Kommando `WM(CMD 'updateFields')`.

Die folgenden Attribute sind optional:
* **ARGS** Optional können beim Einfügen des Textfragments über das Attribut **ARGS** Argumente (&lt;arg1-N&gt;) übergeben werden, die im Textfragement bestehende Platzhalterfelder ersetzt. Die Platzhalterfelder werden in der Reihenfolge der Argumente ersetzt.
* **MODE** Das Attribut MODE ist optional und kann die Werte "**auto**" und "**manual**" annehmen. Ist MODE nicht angegeben, so wird standardmäßig der Wert "auto" verwendet.
  * **auto**: Im Modus "auto" wird das Textfragment automatisch mit dem Öffnen der Vorlage eingefügt. Dabei findet eine Prüfung statt, ob sich ein Textfragment direkt oder indirekt selbst aufruft und damit beim Einfügen eine Endlosschleife entstehen würde. Alle Fehler, die beim Einfügen entstehen können, werden in Notizen hinterlegt, die mit dem roten Text "&lt;Fehler []&gt;" gekennzeichnet sind (normales Fehlerverhalten).
  * **manual**: Der Modus "manual" kennzeichnet Einfügungen, die manuell (z.B. durch Einfügen eines Textbausteines) vorgenommen worden sind. Im Modus "manual" gibt es folgende Abweichungen vom Modus "auto":
    * Es findet keine Prüfung statt, ob sich ein Textfragment direkt oder indirekt selbst aufruft und damit eine Endlosschleife verursachen würde.
    * Treten beim Einfügen Fehler irgendeiner Art auf, so werden diese Fehler in eigenständigen Fehlerdialogen angezeigt und nicht wie im Modus "auto" über die rot markierten "&lt;Fehler []&gt;" Hinweise im Dokument.
    * Sind mehr Argumente angeben als Einfügestellen (Platzhalter) im Dokument vorhanden sind, so erscheint eine Warnmeldung.
* **STYLES** Ist das Attribut STYLES angegeben, so werden nur die Formatvorlagen importiert, die im Textfragment definiert sind, nicht jedoch die Textinhalte des Fragments. Im aktuellen Dokument befindliche Formatvorlagen werden dabei von den Formatvorlagen des Textfragments überschrieben. Über die übergebenen Liste &lt;style1&gt;, ..., &lt;styleN&gt; lässt sich die Auswahl der zu importierenden Formatvorlagen einschränken. Für &lt;style1&gt;, ..., &lt;styleN&gt; kommen folgende Werte in Frage:
  * **All**: importiert alle für die Textverarbeitung notwendigen Formatvorlagen des Fragments, d.h. TextStyles, PageStyles und NumberingStyles.
  * **TextStyles**: importiert nur die Absatz- und Zeichenformate des Textfragments
  * **PageStyles**: importiert nur die Seitenformate des Textfragments
  * **NumberingStyles**: importiert nur die Formate der Nummerierungen und Aufzählungen.

Beispiel 1:

`WM(CMD 'insertFrag' FRAG_ID 'Formate' STYLES 'All')`

Alle für die Textverarbeitung notwendigen Formate werden aus dem Fragment 'Formate' importiert: Die Absatz- und Zeichenformate, die Seitenformate und die Formate für Nummerierung und Aufzählungen. Die Textinhalte werden dabei nicht übernommen.

Beispiel 2:

`WM(CMD 'insertFrag' FRAG_ID 'Formate' STYLES ('TextStyles' 'NumberingStyles'))`

Im diesem Beispiel werden nur die Absatz- und Zeichenformate und die Nummerierungs- und Aufzählungsformate aus dem Textfragment 'Formate' importiert. Die Textinhalte und die Seitenformate werden nicht übernommen.

### Das Kommando `WM(CMD 'overrideFrag' FRAG_ID '<alte_fragment_id>'[ NEW_FRAG_ID '<neue_fragment_id>'])`

**Beschreibung**: Überschreiben von FRAG_IDs: Dieses Kommando sorgt dafuer, dass alle im selben Dokument enthaltenen insertFrag- und insertContent-Befehle, die normalerweise das Textfragment &lt;alte_fragment_id&gt; reinziehen würden, stattdessen das Textfragment &lt;neue_fragment_id&gt; verwenden. Mit diesem Kommando können z.B. Briefkopfvariationen (verschiedene Logos, Fusszeilen,...) realisiert werden.

**Das Attribut FRAG_ID**: Das Attribut FRAG_ID enthält den Namen des Textfragmentes, das innerhalb dieses Dokuments umdefiniert werden soll. Das Attribut FRAG_ID muss immer angegeben werden.

**Das optionale Attribut NEW_FRAG_ID**: Das optionale Attribut NEW_FRAG_ID enthält den neuen FRAG_ID-Namen, der an Stelle des alten FRAG_ID-Names verwendet werden soll. Ist das Attribut nicht vorhanden oder enthält es einen leeren String, so wird an Stelle des ursprünglich einzufügenden Textfragments gar kein Textfragment eingefügt und der Inhalt unter dem Dokumentkommando gelöscht.

**Gültigkeitsbereich und Lebensdauer**: Das Kommando wird beim Erzeugen eines Dokuments aus einer Vorlage ausgewertet und danach gelöscht. Es kann sowohl in der Hauptvorlage (die Vorlage, die auch über den Dateimanager oder die WollMuxLeiste geöffnet wurde) als auch in (Unter-)Fragmenten verwendet werden. Dabei enthält die Festlegung in der Hauptvorlage stets Vorrang vor allen Festlegungen, die in untergeordneten Fragmenten enthalten sind. Generell gilt: Das zuerst gelesene overrideFrag-Kommando hat Vorrang vor den später gelesenen override-Kommandos.

**Ersetzungsketten**: Es ist theoretisch möglich durch zwei oder mehrere overrideFrag-Kommandos Ersetzungsketten zu bilden. Beispiel:
```
WM(CMD 'overrideFrag' FRAG_ID 'A' NEW_FRAG_ID 'B')
WM(CMD 'overrideFrag' FRAG_ID 'B' NEW_FRAG_ID 'C')  <-- FEHLER
```
Das Fragment A wird im ersten Kommando durch B überschrieben. Jetzt wird aber im nächsten Kommando auch das Fragment B durch C überschrieben. Wenn nun im Dokument ein Kommando `WM(CMD 'insertFrag' FRAG_ID 'A')` vorkommt, welches Fragment soll dann tatsächlich eingefügt werden? B oder C? Da bislang kein  praktischer Anwendungsfall für Ersetzungsketten bekannt ist, wurde dies noch nicht spezifiziert. Um mögliche Probleme zu vermeiden, wird daher bei der Ausführung des zweiten Kommandos ein Fehler gemeldet. Sollten Sie einen praktischen Anwendungsfall haben, für den Sie Ersetzungsketten benötigen, stellen Sie bitte einen Änderungsantrag mit dem gewünschten Verhalten.

### Das Kommando `WM(CMD 'updateFields')`
Beschreibung: Beim Einfügen von Textfragmenten, die Textfelder (z.B. das Datum-Feld) enthalten, werden diese Textfelder nicht automatisch von LibreOffice aktualisiert. Dieses Verhalten ist besonders bei der Erzeugung neuer Dokumente unerwünscht, da die Textfelder in diesem Fall natürlich den aktuellen Stand repräsentieren sollen. Das Kommando "updateFields" kann um ein oder mehrere solcher Textfelder gelegt werden und sorgt dafür, dass die enthaltenen Textfelder aktualisiert werden.

**Gültigkeitsbereich und Lebensdauer**: Beim Erzeugen eines Dokuments aus einer Vorlage wird das WollMux-Kommando **updateFields** einmalig ausgeführt. Die Felder werden aktualisiert und danach wird das WollMux-Kommando gelöscht. Damit ist sicher gestellt, dass z.B. das Feld "Datum Fix" nur genau ein mal, nämlich zur Dokumenterstellung aktualisiert wird und danach unverändert bleibt.

### Das Kommando `WM(CMD 'insertValue' DB_SPALTE '<spaltenname>'[ AUTOSEP '<left/right/both>'][ SEPARATOR '<sep>'][ TRAFO '<Funktionsbezeichner>])`

**Beschreibung**: Fügt das Datenfeld &lt;spaltenname&gt; des aktuellen Absenders in das Dokument ein. Die Datenquellen mit ihren Spalten sind in der Datei *datenquellen.conf* definiert.

**Gültigkeitsbereich und Lebensdauer**: Beim Erzeugen eines Dokuments aus einer Vorlage wird das WollMux-Kommando 'insertValue' einmalig ausgeführt. Das Datenfeld wird eingefügt und danach wird das WollMux-Kommando gelöscht. Bei einem Fehler wird eine Fehlermeldung angezeigt und das WollMux-Kommando wird nicht gelöscht.

Die folgenden Parameter sind optional:
* Die Attribute **AUTOSEP** bzw. **SEPARATOR** sind optional und haben folgende Bedeutung: Falls der Spaltenwert in der Datenbank gesetzt ist und einen Inhalt zurückliefert (also nicht den Leerstring ""), besteht die Möglichkeit über AUTOSEP automatisch ein Trennzeichen vor oder nach dem Spaltenwert einfügen zu lassen.
  * **AUTOSEP** bezeichnet dabei die Position, an der der Separator eingefügt wird und kann die Werte 'left', 'right' oder 'both' besitzen.
  * Das Attribut **SEPARATOR** bezeichnet das Zeichen oder den String, der an dieser Position eingefügt werden soll. Ist das Attribut **SEPARATOR** nicht vorhanden, so wird per Voreinstellung ein Leerzeichen " " als Separator verwendet.<br>
Eine sinnvolle Anwendung des AUTOSEP Attributs ist beispielsweise die Ausgabe des akademischen Titels im Briefkopf:<br>
`Herr Meier`<br>
`Frau Dr. Mustermann`<br>
Im Briefkopf soll das Leerzeichen " " rechts neber dem "Dr." nur dann eingefügt werden, wenn die entsprechende Person den Doktortitel besitzt, ansonsten ist kein extra Leerzeichen einzufügen. Das dazugehörige Kommando sieht wie folgt aus: `WM(CMD 'insertValue' DB_SPALTE 'Titel' AUTOSEP 'right')`<br>
Da hier das Attribut SEPARATOR nicht angegeben wurde, wird die Standardeinstellung, das Leerzeichen, als Trenner verwendet.<br>
In dem Kommando können prinzipiell mehrere AUTOSEP- und SEPARATOR-Paare angegeben werden um unterschiedliche Separatoren links bzw. rechts des Spaltenwerts einzustellen. Dazu ein Beispiel: Falls die Person einen akademischen Titel besitzt, soll der Spaltenwert in runde Klammern eingeschlossen und von einem Leerzeichen gefolgt werden. Das zugehörige Kommando würde wie folgt aussehen: `WM(CMD 'insertValue' DB_SPALTE 'Titel' AUTOSEP 'left' SEPARATOR '(' AUTOSEP 'right' SEPARATOR ') ')`
* Das Attribut **TRAFO** verhält sich genau wie das [Attribut TRAFO](Dokumentkommandos_des_WollMux.md#das-kommando-wmcmd-insertformvalue-id-feldid-trafo-funktionsbezeichner) des Dokumentkommandos insertFormValue. Wird **TRAFO** jedoch im Zusammenhang mit dem Dokumentkommando insertValue verwendet, kann der Funktionsbezeichner &lt;Funktionsbezeichner&gt; ausschließlich der Name einer globalen Funktion sein, d.h. einer Funktion die in wollmux.conf definiert ist. Funktionen innerhalb dokumentspezifischer Formularbeschreibungen können hier nicht angesprochen werden.<br>
Beispiel: Das Attribut TRAFO kann hier z.B. verwendet werden, um über eine externe Funktion die im Briefkopf angezeigten Telefonnummern automatisch formatieren zu lassen. Die Konfigurationsdatei wollmux.conf enthält dazu folgenden Funktionen-Abschnitt:
```
Funktionen(
  Telefonnummer(EXTERN(URL "java:de.muenchen.allg.itd51.wollmux.func.Standard.formatiereTelefonnummerDIN5008" PARAMS("nummer")))
)
```
Dabei verweist die URL "java:de.muenchen.allg.itd51.wollmux.func.Standard.formatiereTelefonnummerDIN5008" auf eine externe Java-Methode, die die Formatierung einer internen Telefonnummer gemäß DIN 5008 übernimmt. Das zugehörige insertValue-Dokumentkommando würde wie folgt aussehen: `WM(CMD 'insertValue' DB_SPALTE 'Telefon' TRAFO 'Telefonnummer')`

### Das Kommando `WM(CMD 'insertContent')`

**Beschreibung**: Das Dokumentkommando **insertContent** ist ein Kommando zum Mischen von Textfragmenten. Das Kommando fügt den Inhalt eines weiteren Textfragments in eine über die WollMuxBar "Vorlagen und Formulare" geöffnete Vorlage ein. Das Kommando benötigt dazu eine Liste mit FRAG_ID-Attributen, die Sie in der Menübeschreibung der WollMuxBar festlegen können. Die exakte Funktionsweise von **insertContent** ist daher auch im Abschnitt [Konfigurationsdatei wollmux.conf - Liste mit FRAG_ID-Attributen](Konfigurationsdatei_wollmux_conf.md#liste-mit-fragid-attributen) beschrieben.

**Gültigkeitsbereich und Lebensdauer**: Beim Erzeugen eines Dokuments aus einer Vorlage wird das WollMux-Kommando **insertContent** einmalig ausgeführt. Der Inhalt eines weiteren Textfragment wird eingefügt und danach wird das WollMux-Kommando gelöscht.

> **INFO** Bitte beachten Sie auch den Abschnitt [Übernahme von Absatzformaten beim Einfügen von Textfragmenten](Textfragmente_im_WollMux.md#übernahme-von-absatzformaten-beim-einfügen-von-textfragmenten) in dem festgelegt ist, in welchem Fall welche Absatzformate verwendet werden.

### Das Kommando `WM(CMD 'setJumpMark')`

**Beschreibung**: Diese Marke wird angesprungen, wenn nach dem Einfügen von Textbausteinen kein Platzhalter vorhanden ist. Die OOo-Writer Symbolleiste **Textbausteine** beinhaltet einen Button **Platzhalter anspringen** der den nächste Platzhalter, ab der aktuellen Cursorposition, anspringt. Falls kein Platzhalter vorhanden ist, aber eine Marke 'setJumpMark', wird diese angesprungen.

**Gültigkeitsbereich und Lebensdauer**: Bei Dokument öffnen, Vorlage öffnen und Vorlage bearbeiten wird falls vorhanden die Marke **setJumpMark** über OOo-Writer Symbolleiste **Textbausteine** Button **Platzhalter anspringen** angesprungen. Die Marke wird beim ersten Ansprung gelöscht, so dass danach eine weitere Sprungmarke angesprungen wird, wenn sie im Dokument oder in der Vorlage vorhanden ist.

### Beispiele

Im Beispiel wird davon ausgegangen, dass das Textfragment "test_a" in der [Konfigurationsdatei wollmux.conf](Konfigurationsdatei_wollmux_conf.md#textfragmente) definiert wurde.
```
# Füge an die Stelle des Bookmarks den Inhalt aus dem Textfragment test_a ein
WM(CMD 'insertFrag' FRAG_ID 'test_a')

# Hier wird der selbe Befehl wiederholt. Um die Bookmarks unterscheiden zu können bekommt dieser den Suffix "1".
WM(CMD 'insertFrag' FRAG_ID 'test_a')1

# Füge an die Stelle des Bookmarks den Wert 'Anrede' aus dem aktuellen Absender-Datensatz ein.
WM(CMD 'insertValue' DB_SPALTE 'Anrede')

# Ein normales Bookmark wird vom WollMux ignoriert und bleibt unverändert.
NormalesBookmark13
```

Kommandos des Formularsystems
-----------------------------

### Das Kommando `WM(CMD 'setGroups' GROUPS ('<groupId1>' '<groupId2>' ...))`

**Beschreibung**: Dieses Kommando dient dazu, Gruppen für Ein- und Ausblendungen zu definieren. Das setGroups-Kommando wird üblicherweise verwendet, um die Ein-/Ausblendegruppen eines Blocks zu definieren, der neben normalen Textelementen auch weitere Dokumentkommandos beinhalten kann. Auf den Schlüssel GROUPS folgt eine mit Leerzeichen separierte Liste mit Gruppen-IDs die diesem Kommando zugeordnet werden sollen. Jede Gruppe kann den Status "Sichtbar" oder "Ausgeblendet" enthalten, der von der Formular-GUI anhand der Regeln des [Abschnitts "Sichtbarkeit"](Dokumentkommandos_des_WollMux.md#der-abschnitt-sichtbarkeit) automatisch gesetzt wird. Der Textinhalt eines Dokumentkommandos wird nur dann sichtbar angezeigt, wenn alle Gruppen, die diesem Dokumentkommando zugeordnet sind den Status "Sichtbar" besitzen. Besitzt auch nur eine der zugeordneten Gruppen den Status "Ausgeblendet", so wird der Textinhalt des Dokumentkommandos ausgeblendet. Jedes setGroups-Kommando, das innerhalb eines anderen, umschließenden setGroups-Dokumentkommandos definiert ist, erbt dabei die Gruppenzugehörigkeit des umschließenden Dokumentkommandos.

**Gültigkeitsbereich und Lebensdauer**: Beim Erzeugen eines Dokuments aus einer Vorlage wird das Kommando 'setGroups' ausgeführt und definierte Gruppen werden ausgeblendet.

**Beispiel**:
Angenommen der Beispiel-Text ist wie folgt von Bookmarks mit Dokumentkommandos umgeben:
```
Dies ist ein Beispiel-Textabschnitt, in dem setGroups für Ein- und Ausblendungen definiert wurden.
<--------------------------- WM(CMD 'setGroups' GROUPS'a') -------------------------------------->
             <--- WM(CMD 'setGroups' GROUPS('b' 'c')) ---->
```

in diesem Fall wäre der Textbereich "Dies ist ein Beispiel-Textabschnitt, in dem setGroups für Ein- und Ausblendungen definiert wurden." der Gruppe 'a' zugeordnet und der kleinere Teilbereich "Beispiel-Textabschnitt, in dem setGroups für E" den Gruppen 'a', 'b' und 'c' zugeordnet. Das Ausblenden der Gruppe 'a' führt dazu, dass der Gesamte Beispieltext ausgeblendet wird, wo hingegen das Ausblenden der Gruppen 'b' oder 'c' nur dazu führt, dass der Teilbereich ausgeblendet wird. Der Sichtbare Text würde z.B. nach dem Ausblenden der Gruppe 'b' lauten: "Dies ist ein in- und Ausblendungen definiert wurden.".

**Performance**:
Da SetGroups-Textmarken verschachtelt sein können, muss der WollMux alle SetGroups-Kommandos vor der Ausführung sortieren. Diese Sortierung
kostet Zeit und kann abhängig von der Anzahl enthaltener SetGroups-Kommandos quadratisch steigene Ladezeiten hervorrufen. An allen Stellen, an denen eine Verschachtelung nicht zwingend notwendig ist, oder nur kleine Textbereiche verändert werden müssen, ist daher der Einsatz von [InsertFormValue](#das-kommando-insertformvalue)-Kommandos vorzuziehen - diese müssen nicht sortiert werden.

**Ausblendung problematischer Inhalte**:
Manche Textinhalte (wie z.B. Tabellen mit Rahmen und manuelle Seitenumbrüche) werden unter Verwendung der setGroups-Textmarken aufgrund eines Fehlers in LibreOffice nicht korrekt ausgeblendet. Als Lösung für solche problematischen Textinhalte wurden die [Textbereiche mit der Namenserweiterung GROUPS](#textbereiche-mit-der-namenserweiterung-groups-listemitsichtbarkeitsgruppen) eingeführt. Verpacken Sie problematische Inhalte in einen solchen Bereich und alle Inhalte werden fehlerfrei ausgeblendet. Textbereiche mit GROUPS-Namenserweiterung können beliebig mit SetGroups-Textmarken kombiniert und verschachtelt werden. Auch hier funktioniert die Vererbung von Gruppenzugehörigkeiten wie oben beschrieben.

**Zusammenspiel mit den Hilfen für Sachleitende Verfügungen**:
Das Kommando 'setGroups' ist nicht kompatibel mit den [Hilfen für Sachleitende Verfügungen](Hilfen_fuer_Sachleitende_Verfuegungen_verwenden.md). Innerhalb von Textstellen, an denen bedingt durch Sachleitende Verfügungen oder deren [Kommandos zur Drucksteuerung] (Hilfen_fuer_Sachleitende_Verfuegungen_verwenden.md#die-schaltflächen-zur-drucksteuerung-einzelner-blöcke) bestimmte Textteile aus- und wieder eingeblendet werden, dürfen setGroups-Kommandos nicht zum Einsatz kommen. Die Druckfunktion für Sachleitende Verfügungen nimmt keine Rücksicht auf die Sichtbarkeitszustände von setGroups-Kommandos und kann entsprechende Textbereiche beliebig sichtbar oder unsichtbar setzen.

Problemlos kann das setGroups-Kommando an Textstellen angewandt werden, die durch den Komfortdruck für Sachleitende Verfügungen unberührt bleiben, wie z.B. der gesamte Textbereich vor der Überschrift mit der Ziffer II.

Zur Darstellung variabler Inhalte innerhalb der kritischen Textstellen wird die Verwendung von [InsertFormValue](#das-kommando-insertformvalue)-Kommandos oder die Verwendung von [Textbereichen mit der Namenserweiterung GROUPS](#textbereiche-mit-der-namenserweiterung-groups-listemitsichtbarkeitsgruppen) empfohlen.

## Gültigkeitsbereich und Lebensdauer von Dokumentkommandos
<table border="1">
<tr>
<td>
</td>
<th colspan="3" align="center"> Gültig in folgenden Vorgängen
</th>
<th colspan="2" align="center"> Lebensdauer
</th></tr>
<tr>
<td>
</td>
<th> Bestehendes Dokument bearbeiten
</th>
<th> Dokument neu aus Vorlage erzeugen
</th>
<th> Vorlage bearbeiten
</th>
<th> Wird ausgeführt beim
</th>
<th> Wird nach der Bearbeitung gelöscht
</th></tr>
<tr>
<th style="background-color:#C0C0C0"> Globale Dokumentkommandos
</th>
<td style="background-color:#C0C0C0" colspan="6" align="center">
</td></tr>
<tr>
<th> setType
</th>
<td align="center"> X
</td>
<td align="center"> X
</td>
<td align="center"> X
</td>
<td>
<ul>
<li> Öffnen
</li>
</ul>
</td>
<td align="center"> X
</td></tr>
<tr>
<th> setPrintFunction
</th>
<td align="center"> X
</td>
<td align="center"> X
</td>
<td align="center"> X
</td>
<td>
<ul>
<li> Datei-&gt;Drucken
</li>
<li> Klick auf Druckersymbol
</li>
</ul>
</td>
<td align="center"> X(1)
</td></tr>
<tr>
<th> insertFormValue
</th>
<td align="center"> X
</td>
<td align="center"> X
</td>
<td align="center"> X
</td>
<td>
<ul>
<li> Arbeiten mit der FormGUI
</li>
<li> Aufrufen der Empfängerauswahl
</li>
<li> Ausführen mancher Komfortdruckfunktionen (z.B. Seriendruck)
</li>
</ul>
</td>
<td>
</td></tr>
<tr>
<th> draftOnly
</th>
<td align="center"> X
</td>
<td align="center"> X
</td>
<td align="center"> X
</td>
<td>
<ul>
<li> Drucken von Sachleitenden Verfügungen
</li>
</ul>
</td>
<td>
</td></tr>
<tr>
<th> notInOriginal
</th>
<td align="center"> X
</td>
<td align="center"> X
</td>
<td align="center"> X
</td>
<td>
<ul>
<li> Drucken von Sachleitenden Verfügungen
</li>
</ul>
</td>
<td>
</td></tr>
<tr>
<th> allVersions
</th>
<td align="center"> X
</td>
<td align="center"> X
</td>
<td align="center"> X
</td>
<td>
<ul>
<li> Drucken von Sachleitenden Verfügungen
</li>
</ul>
</td>
<td>
</td></tr>
<tr>
<th style="background-color:#C0C0C0"> Briefkopfsystem
</th>
<td style="background-color:#C0C0C0" colspan="6" align="center">
</td></tr>
<tr>
<th> insertFrag
</th>
<td>
</td>
<td align="center"> X
</td>
<td>
</td>
<td>
<ul>
<li> Öffnen
</li>
<li> Einfügen eines Textbausteins
</li>
</ul>
</td>
<td align="center"> X
</td></tr>
<tr>
<th> updateFields
</th>
<td>
</td>
<td align="center"> X
</td>
<td>
</td>
<td>
<ul>
<li> Öffnen
</li>
<li> Einfügen eines Textbausteins
</li>
</ul>
</td>
<td align="center"> X
</td></tr>
<tr>
<th> insertContent
</th>
<td>
</td>
<td align="center"> X
</td>
<td>
</td>
<td>
<ul>
<li> Öffnen
</li>
<li> Einfügen eines Textbausteins
</li>
</ul>
</td>
<td align="center"> X
</td></tr>
<tr>
<th> setJumpMark
</th>
<td>
</td>
<td align="center"> X
</td>
<td>
</td>
<td>
<ul>
<li> Öffnen
</li>
<li> Einfügen eines Textbausteins
</li>
</ul>
</td>
<td align="center"> X
</td></tr>
<tr>
<th style="background-color:#C0C0C0"> Formularsystem
</th>
<td style="background-color:#C0C0C0" colspan="6" align="center">
</td></tr>
<tr>
<th> setGroup
</th>
<td align="center"> X
</td>
<td align="center"> X
</td>
<td>
</td>
<td>
<ul>
<li> Arbeiten mit der FormGUI
</li>
<li> Ausführen mancher Komfortdruckfunktionen (z.B. Seriendruck)
</li>
</ul>
</td>
<td>
</td></tr>
</table>

Seriendruckfelder
=================

Über die Leiste "Seriendruck (WollMux)" können Felder für den Seriendruck in das Dokument eingefügt werden. Der WollMux unterscheidet die folgenden Felder:

Einfache Seriendruckfelder
--------------------------

Einfache Seriendruckfelder repräsentieren exakt den entsprechenden Wert zu einem Spaltennamen der Serienbriefdatenquelle oder den Wert einer Eingabe in der Formular-GUI. Transformationen werden von diesem Feld nicht unterstützt.

Im Dokument werden einfache Serienbrieffelder durch Felder des Typs `com.sun.star.text.TextField.Database` abgebildet, die auch im OOo-Seriendruck Verwendung finden. Einfache Seriendruckfelder können damit nicht nur über die Sidebar **Seriendruck (WollMux)**, sondern in OOo auch über Einfügen&rarr;Feldbefehl&rarr;Andere.../Datenbank/Seriendruck-Feld oder über die Datenquellen-Ansicht eingefügt werden. Im Gegensatz zum OOo-Seriendruck wertet der WollMux aber nicht die Angaben zur Datenbank und des Tabellennamens aus, die in diesem Seriendruckfeld hinterlegt sind. WollMux verwendet ausschließlich den Spaltennamen, der als dritte Angabe in dem Seriendruckfeld hinterlegt ist. Die Auswahl der aktuellen Tabelle erfolgt in der Seriendruckleiste des WollMux über das Bedienfeld "Datenquelle".

Spezialfelder (InputUser)
-------------------------

Spezialfelder sind Felder, die bestehende Eingabedaten der Serienbriefdatenquelle oder der FormularGUI über eine definierte Logik transformieren können. Jedem Spezialfeld ist genau eine WollMux-Funktion zugeordnet, die zur Ausführung kommt, wenn sich der Wert der darin referenzierten Eingabedaten ändert.

Spezialfelder werden durch Felder vom Typ `com.sun.star.text.TextField.InputUser` abgebildet, die in OOo auch über Einfügen&rarr;Feldbefehl&rarr;Andere.../Variablen/Eingabefeld erzeugt werden können. Diese Felder sind wie normale Eingabefelder bearbeitbar, unterscheiden sich jedoch von normalen Eingabefeldern dadurch, dass sie immer an ein sog. dokumentglobales Benutzerfeld gebunden sind. Im Namen dieses Benutzerfeldes wird die Funktion hinterlegt, die dem Spezialfeld
zugeordnet ist. Der Name eines solchen Benutzerfeldes hat folgenden Aufbau:

`WM(FUNCTION '<Funktionsname>')`

Anmerkung zu Benutzerfeldern: Benutzerfelder können in OOo über Einfügen&rarr;Feldbefehl&rarr;Andere.../Variablen/Benutzerfeld erzeugt werden. Entgegen der ODF-Spezifikation können in der Anwendungsoberfläche von OOo aber leider nur Namen für Benutzerfelder definiert werden, die ausschließlich Buchstaben und Ziffern enthalten. Ein Name nach dem obigen Aufbau kann über diesen Weg also nicht erzeugt werden, womit letztendlich auch die Erstellung von sinnvollen WollMux-Spezialfeldern nur über die Seriendruckleiste des WollMux möglich ist.

**Beispiel:**
Das **Spezialfeld Wenn...Dann...Sonst...** wird repräsentiert durch ein InputUser-Feld und ein zugehöriges dokumentglobales Benutzerfeld mit dem Namen `WM(FUNCTION 'AUTOFUNCTION_1212655388943_0')`. Der Funktionsname wird dabei automatisch vom WollMux erzeugt und setzt sich wie folgt zusammen: `AUTOFUNCTION_<Zufallszahl>_<Seq>`. `<Zufallszahl>` wird zufällig erzeugt, `<Seq>` ist eine Zahl die sicherstellt, dass die selbe Kombination aus `<Zufallszahl>` und `<Seq>` nicht öfters vor kommt. Die zugehörige Funktion `AUTOFUNCTION_1212655388943_0` wird in der Formularbeschreibung des Dokuments angelegt und enthält z.B. folgenden Inhalt:
```
AUTOFUNCTION_1212659067594_0(
       IF(
         STRCMP(VALUE "Vorname" "Felix")
         THEN(CAT "Superheld")
         ELSE(CAT "Normalo")
       )
)
```
Die Funktion in diesem Beispiel hängt von dem Wert der ID "Vorname" ab. Diese Abhängigkeit ist dem WollMux bekannt und sobald sich der Wert des Feldes "Vorname" z.B. durch eine Benutzereingabe in der Formular-GUI oder beim Seriendruck ändert wird, wird die Funktion aufgerufen und der Funktionswert neu berechnet. Da Funktionen auch von mehreren IDs abhängen können, übermittelt der WollMux dazu die Werte aller in der Funktion referenzierten IDs als Parameter an die Funktion.

Textbereiche mit der Namenserweiterung GROUPS &lt;Liste_mit_Sichtbarkeitsgruppen&gt;
====================================================================================

Über den Menüpunkt "Einfügen&rarr;Bereich..." von LibreOffice können Textbereiche erzeugt werden, die den Gesamttext in kleinere Bereiche unterteilen. Jeder so erzeugte Textbereich besitzt einen Namen, der über den Navigator von LibreOffice ("Bearbeiten&rarr;Navigator/Bereiche") eingesehen und verändert werden kann. Der WollMux bietet die Möglichkeit einen solchen Textbereich über einen einfachen Zusatz im Namen des Textbereichs mit Sichtbarkeitsgruppen zu versehen. Analog zum [Dokumentkommando SetGroups](#das-kommando-wmcmd-setgroups-groups-groupid1-groupid2-) können mit dem Namenszusatz Sichtbarkeitsgruppen definiert werden, die die Ein- und Ausblendung dieses Bereichs steuern.

Um von dieser Möglichkeit Gebrauch machen zu können, muss der entsprechende Textbereich nach folgendem Namensschema benannt werden: `<beliebiger Text> GROUPS <Liste_mit_Sichtbarkeitsgruppen><nummer>`

Die Angabe der natürlichen Zahl &lt;nummer&gt; ist dabei optional und wird analog zu den Namen der [WollMux-Kommandos (Textmarken)](#wollmux-kommandos) dazu verwendet um zwei gleichbenannte Textbereiche unterscheiden zu können.

**Beispiele**:

`Lohn, Gehalt, Sozialleistungsansprüche GROUPS 'AbtLohn'` Über diesen Bereichsnamen wird ein Bereich definiert, der nur dann sichtbar ist, wenn die Sichtbarkeitgruppe AbtLohn sichtbar ist.

`Bereich5 GROUPS ('AbtAnteile', 'NochEine', 'AbtKaution')` Über diesen Bereichsnamen wird ein Bereich defineirt, der nur dann sichtbar ist, wenn alle drei Sichtbarkeitsgruppen AbtAnteile, NochEine und AbtKaution sichtbar sind.

**Vererbung von Gruppenzugehörigkeiten**:

Analog zu den [Dokumentkommandos SetGroups](#das-kommando-setgroups) können auch Textbereiche so verschachtelt werden, dass die Gruppenzugehörigkeit des umschließenden Textbereichs auf die eingeschlossenen Textbereiche vererbt wird. Auch das Mischen von SetGroups-Dokumentkommandos und Textbereichen ist möglich. So werden z.B. die in einem Textbereich definierten SetGroups-Dokumentkommandos korrekt erkannt und verarbeitet. Auch können Textbereiche in ein umschließendes setGroups-Dokumentkommando eingebettet werden. In beiden Fällen erben die inneren Elemente die Gruppenzugehörigkeit des umschließenden Elements.

Seitenvorlage Wollmuxseite
==========================

Beim Öffnen einer Vorlage oder eines Dokuments mit WollMux-Kommandos, wird die Seitenvorlage "Wollmuxseite" in das Seitenformat "Standard" übertragen, falls die Seitenvorlage "Wollmuxseite" vorhanden ist. Dadurch wird jede Vorlage oder jedes Dokument an das Visuelle Erscheinungsbild angepasst, dessen Vorgaben in der Seitenvorlage "Wollmuxseite" realisiert wurden. Die Seitenvorlage "Wollmuxseite" kann z.B. über das Kommando [WM(CMD 'insertFrag' FRAG_ID 'Formate')](#das-kommando-insertfrag) eingefügt werden.

WollMux-Metadaten im Dokument
=============================

Jedes Dokument kann Daten enthalten, die der WollMux für seine Arbeit benötigt, die aber nicht sichtbar für Endanwenderinnen und Endanwender in Erscheinung treten sollen. Solche Daten werden Metadaten genannt und vom WollMux abhängig von der Konfigurationseinstellung [PERSISTENT_DATA_MODE](Konfigurationsdatei_wollmux_conf.md#der-persistentdatamode) entweder in Notizen oder in einer eigenen XML-Datei namens "wollmux.rdf" im ODF-Paket abgelegt.

Die Metadaten sind nach Aufgabengebieten strukturiert und über zugehörige Schlüsselwörter abrufbar. Folgende Schlüssel sind möglich:
* **SetType** Das Datum **SetType** beschreibt den Typ eines Dokuments und hat Einfluss auf das Verhalten des WollMux, das bei verschiedenen Dokumenttypen unterschiedlich sein kann. Analog zum Dokumentkommando [ WM(CMD 'setType' TYPE '<Type>')](#das-kommando-wmcmd-settype-type-type) kann das Datum die Inhalte 'normalTemplate', 'templateTemplate' und 'formDocument' besitzen.
* **PrintFunction** Über die **PrintFunction** kann festgelegt werden, welche Komfortdruckfunktionen beim Drucken des Dokuments verwendet werden sollen.
```
WM(
  Druckfunktionen(
    (FUNCTION "<Funktionsname1>")
     ...
    (FUNCTION "<FunktionsnameN>")
  )
)
```
Das Attribut **FUNCTION** beschreibt den Namen einer Druckfunktion, die in der [Datei wollmux.conf in einem Druckfunktionen-Abschnitt](Konfigurationsdatei_wollmux_conf.md#druckfunktionen) definiert sein muss.<br>
Sind in diesem Abschnitt mehr als eine Druckfunktion für das Dokument festgelegt, so werden diese Druckfunktionen zu einer durch das [Attribut ORDER](Konfigurationsdatei_wollmux_conf.md#druckfunktionen) definierten Aufrufreihenfolge verkettet. So ist es beispielsweise möglich, die Druckfunktion "SachleitendeVerfuegung" und "Seriendruck" zu kombinieren.<br>
Anmerkung: Falls nur eine Druckfunktion für das Dokument gesetzt sein soll, kann anstatt des obigen Aufbaus auch nur der Namen der Druckfunktion (z.B. 'SachleitendeVerfuegung') gesetzt sein.
* **FilenameGeneratorFunction** Über die **FilenameGeneratorFunction** kann einer Vorlage eine Funktion hinterlegt werden, über die ein Dateinamensvorschlag zum Speichern generiert wird, wenn ein aus dieser Vorlage erzeugtes Dokument gespeichert werden soll und bislang noch nie gespeichert war (daran zu erkennen, dass der Dateiname z.B. "Unbenannt 1" lautet). Ist eine solche Funktion gesetzt, so erscheint statt des üblichen Speichern-Dialogs von LibreOffice ein Dialog, der mit dem Rückgabewert der FilenameGeneratorFunction voreingestellt ist. Liefert diese Funktion einen Dateinamen mit einem auf dem System erreichbaren Pfad, so wird dieser Pfad in der Voreinstellung verwendet. Enthält der zurückgelieferte Dateiname keine Pfadangabe oder eine auf dem System nicht erreichbare Pfadangabe, so wird die Pfadangabe verworfen und statt dessen der in LibreOffice unter Extras&rarr;Optionen&rarr;Pfade/Arbeitsverzeichnis eingestellte Pfad verwendet.<br>
Diese Funktionalität ist sofort aktiviert wenn die FilenameGeneratorFunction nicht leer ist. Als Funktion kann prinzipiell jede durch den WollMux interpretierbare Funktion gesetzt werden. Über die Benutzeroberfläche des WollMux steht dafür der Menüpunkt ["Formular&rarr;Dateiname vorgeben"](FormularMax_4000.md#formulardateiname-vorgeben) des FM4000 zur Verfügung, bei dem in der Regel immer eine Funktion mit folgendem Aufbau erzeugt wird:
```
BIND(
  FUNCTION "<Nachträgliche global gesetzte Anpassungsfunktion>"

  SET(
    "Filename"
    CAT ("Zusammengesetzter Dateiname" "aus Text und" VALUE "<Variablen>")
  )
)
```
Hängt die Funktion von Parametern (wie z.B. "&lt;Variablen&gt;") ab, so werden diese Parameter soweit möglich aus den Formularwerten des WollMux-Formulars gefüllt.
* **WollMuxFormularwerte** Beim Umgang mit WollMux-Formularen besteht die Notwendigkeit, die von der Anwenderin bzw. vom Anwender eingegebenen Formularwerte im Dokument abzulegen, damit sie nach dem Speichern und erneuten Öffnen des Dokuments wieder zur Verfügung stehen. Diese Informationen sind in **WollMuxFormularwerte** enthalten, die folgenden Aufbau hat:
```
WM(
  Formularwerte(`
    (ID "<id1>" VALUE "<aktueller Wert>")
     ...
    (ID "<idN>" VALUE "<aktueller Wert>")
  )
)
```
* **WollMuxSeriendruck** Mit dem Schlüssel **WollMuxSeriendruck** werden Metadaten der Seriendruckfunktion abgelegt, die beim erneuten Bearbeiten des Dokuments zur Verfügung stehen sollen. Derzeit enthalten diese Daten nur die Verknüpfung des Dokument zu der zuletzt verwendeten Datenquelle und hat folgenden Aufbau, der sich am Aufbau der [Datenquellen der Konfigurationsdatei wollmux.conf](Konfigurationsdatei_wollmux_conf.md#unterstützte-datenquellen-typen) orientiert:
```
WM(
  Seriendruck(
    Datenquelle(TYPE "<type>" ...typspezifische Argumente...)
  )
)
```
Dabei sind für das Attribut TYPE folgende Werte möglich:
  * **calc**: Beschreibt eine von Calc lesbare Tabellenkalkulationsdatei und setzt die Angabe folgender Argumente voraus:
    * `URL "<url>"`: Die URL unter der die Datei geöffnet/gespeichert wurde.
    * `TABLE "<tabelle>"`: Den Namen des Tabellenblattes aus dem die Daten gelesen werden sollen.
  * **ooo**: Beschreibt eine in OOo registrierte Datenbank und setzt die Angabe folgender Argumente voraus:
    * `SOURCE "<Name_der_in_OOo_registrierten_Datenquelle>"`: Name der in OOo registrierten Datenbank.
    * `TABLE "<Name_der_Tabelle_oder_Sicht>"`: Der Namen der Tabelle oder der Sicht aus der die Daten gelesen werden sollen.

> **INFO** Anmerkung: Manche Datenbanken benötigen Angaben zur Benutzerauthentifizierung. Diese Angaben dürfen nicht im Dokument abgelegt werden, da Dokumente auch nach extern verschickt werden. Sie müssen bei Bedarf vom WollMux interaktiv abgefragt werden.

* **WollMuxFormularbeschreibung** In der **WollMuxFormularbeschreibung** sind alle Informationen des WollMuxformulars gespeichert. Die Inhalte der Formularbeschreibung sind im folgenden Abschnitt ausführlich beschrieben und können mit Hilfe des [FormularMax 4000](FormularMax_4000.md) komfortabel gesetzt und verändert werden.

Beschreibung der Formular-GUI
=============================

Die Beschreibung der Formular-GUI erfolgt in einer zusätzlichen XML-Datei namens wollmux.rdf. Im folgenden ist der Aufbau einer Formular-GUI-Beschreibung schematisch dargestellt:
```
WM(
 Formular(
  TITLE "<Titel des Formularfensters>"
  PLAUSI_MARKER_COLOR "<Farbangabe>"
  Fenster( 
    Reiter1(
      TITLE "<Titel des Reiters>"
      CLOSEACTION "<Aktion>"
      TIP "<Tooltip des Reiters>"
      HOTKEY "<Hotkey des Reiters>"
      
      Eingabefelder(
        (<Beschreibung eines Eingabefelds>)
        (<Beschreibung eines Eingabefelds>)
        ...
      )#Eingabefelder
      
      Buttons(
        (<Beschreibung eines Buttons>)
        (<Beschreibung eines Buttons>)
        ...
      )#Buttons
    )#Reiter1
    
    Reiter2(
      ...
    )#Reiter2

    ...
  )#Fenster
  
  Sichtbarkeit
  (
    GroupId1(<Funktion>)
    GroupId2(<Funktion>)
    ...
  )#Sichtbarkeit

  Funktionen
  (
    FunktionsId1(<Funktion>)
    FunktionsId2(<Funktion>)
  )#Funktionen

  Funktionsdialoge(
    FunktionsdialogId1(<Funktionsdialog>)
    FunktionsdialogId2(<Funktionsdialog>)
  )

 )#Formular
)#WM
```
Die Unterabschnitte Reiter1, Reiter2,... (deren Namen beliebige [Bezeichner](Format_von_WollMux-Config-Dateien.md#schlüssel) sein können) beschreiben jeweils einen Reiter (ein Tab) der Formular-GUI. Im jeweiligen Unterabschnitt **Eingabefelder** werden die Formularfelder (z.B. Textfelder oder ComboBoxen) beschrieben, die der Anzeige und Bearbeitung der Formulardaten dienen. Im dazugehörigen Unterabschnitt **Buttons** werden die Buttons spezifiziert, die am unteren Rand des jeweiligen Tabs angezeigt werden sollen. In der wollmux.conf können global bestimmte Buttons aktiviert oder deaktiviert werden.

## PLAUSI_MARKER_COLOR "&lt;Farbangabe&gt;"

Felder, die mit einer Plausibilitätsprüfung hinterlegt sind werden in dieser Farbe eingefärbt, wenn die Plausiberechnung ergibt, dass der eingegebene Wert nicht korrekt ist. Die &lt;Farbangabe&gt; ist eine wie in CSS übliche hexadezimale Beschreibung der Farbe im Format "#RRGGBB", wobei RR, GG und BB die Rot, Grün und Blau-Komponenten angeben (hexadezimal, 00-FF).

## CLOSEACTION "&lt;Aktion&gt;"

Gibt an, welche Aktion ausgeführt werden soll, wenn der Benutzer das Fenster über die Mechanismen des Betriebssystems (z.B. den Schließen-Knopf in der Titelleiste des Fensters) schließt. Derzeit wird nur "abort" unterstützt.

## TITLE "Titel"

Auf Formularebene gibt TITLE den Fenstertitel der Formular-GUI an. Auf Reiterebene gibt TITLE die Beschriftung des Reiters an.

## TIP "Text"

Auf Reiterebene gibt TIP den Text an, der erscheinen soll, wenn der Mauszeiger eine Weile über dem Reiter verharrt. Auf Ebene der einzelnen Eingabeelemente oder Buttons gibt es den Text an, der erscheint, wenn der Mauszeiger über dem entsprechenden Element eine Weile verharrt.

Hinweis: Mehrzeilige Tooltips und Tooltips mir Formatierung sind möglich, indem man HTML-Code als Tooltip verwendet.

Beispiel:

`TIP "<html>Zeile 1<br>Zeile 2</html>"`

## HOTKEY "Buchstabe"

Auf Reiterebene bestimmt dies den Buchstaben, der bei gedrückter Alt-Taste den Reiter direkt anwählt. In einer Button-Beschreibung wird entsprechend ein Tastaturkürzel für den entsprechenden Button festgelegt. Für Buchstabe sind keine Umlaute oder Sonderzeichen erlaubt.

## Beschreibung eines Eingabefelds

Die Beschreibung eines Eingabefeldes besteht aus Schlüssel-Wert-Paaren. Die möglichen Paare werden in den folgenden Abschnitten beschrieben. Dabei ist zu beachten, dass nicht alle für jede Art von Eingabefeld Anwendung finden.

### LABEL "Label"

Der Label-Text wird links (bei Checkboxen rechts) neben dem Eingabeelement angezeigt.

### TYPE "Feldtyp"

Der Feldtyp spezifizert dier Art des GUI-Elements. Die folgenden Feldtypen werden unterstützt:
* **textfield**: Ein einzeiliges Feld zur Eingabe einer Zeichenkette
* **textarea**: Ein mehrzeiliges Feld zur Einhabe eines Textes
* **combobox**: Ein kombiniertes Text/Drop-Down-Feld, das mehrere vordefinierte Werte zur Auswahl anbietet
* **checkbox**: Ein Feld, das entweder aktiviert oder nicht aktiviert sein kann
* **label**: kein Eingabefeld. Wird verwendet, um nur den LABEL-Text anzuzeigen.
* **separator**: eine (je nach Kontext horizontale oder vertikale) Linie zur Gruppierung ohne weitere Funktion
* **glue**: ein unsichtbares Element, das dazu dient, Abstände zwischen 2 Eingabefeldern einzufügen

### VALUES (&lt;Liste&gt;)

Diese Liste von Strings spezifiziert die Werte, die ein Eingabefeld des Typs "combobox" dem Benutzer zur Auswahl anbietet.

### LINES "Anzahl"

Legt die Anzahl der angezeigten Zeilen für ein Element des Typs "textarea" fest. Die Eingabe wird dadurch nicht begrenzt. Es können beliebig viele Zeilen eingegeben werden.

### WRAP "false"

Die Angabe WRAP "false" unterbindet bei Elementen des Typs "textarea" den Umbruch der Zeilen in der Anzeige. Standardeinstellung ist WRAP "true", d.h. lange Zeilen werden am Rand des Feldes umgebrochen. Man beachte, dass dies nur die Anzeige im Dialogfenster betrifft. Es werden keine harten Zeilenumbrüche eingefügt.

### READONLY "true"

Wird dies angegeben, so kann der Benutzer den Wert des Eingabefeldes nicht ändern.

### EDIT "true"

Wird dies bei einem Feld vom Type "combobox" angegeben, so kann der Benutzer nicht nur aus der Liste auswählen, sondern auch freien Text eingeben.

### PLAUSI(&lt;Funktion&gt;)

Dieses Attribut erlaubt das Angeben einer [Funktion](Konfigurationsdatei_wollmux_conf.md#funktionen), die bei jeder Änderung des Feldinhaltes berechnet wird. Liefert diese Funktion *nicht "true"*, wird das Feld [farblich markiert](#plausimarkercolor-farbangabe) und beim Versuch, das Dokument zu Drucken oder in ein PDF umzuwandeln wird [der entsprechende Warnungs-Dialog](Konfigurationsdatei_wollmux_conf.md#plausiwarnung) angezeigt.

### AUTOFILL(&lt;Funktion&gt;)

Die hier angegebene Funktion wird benutzt, um Felder automatisch (vor-)auszufüllen. Ein mit AUTOFILL versehenes Feld wird bei jeder Änderung eines Feldes, von dem die AUTOFILL-Funktion abhängt, neu berechnet. Davon abgesehen kann der Benutzer den Wert manuell ändern (wenn das Feld nicht auf READONLY gesetzt ist).

Anmerkung: Eine AUTOFILL-Funktion sollte nur von Feldern abhängen, die vor dem Feld mit der AUTOFILL-Funktion in der Formularbeschreibung stehen. Da die AUTOFILLs in der Reihenfolge ihres Auftretens berechnet werden, würde ansonsten die AUTOFILL-Funktionen evtl. mit falschen Parametern aufgerufen, nämlich dann wenn auf eines der Felder von denen die Funktion abhängt ebenfalls eine AUTOFILL-Funktion registriert ist, die jedoch noch nicht berechnet wurde.

Auch aus Usability-Sicht ist es nicht wünschenswert, wenn sich Felder, mit denen der Benutzer bei der sequentiellen Bearbeitung des Formulars bereits durch ist, nochmals verändern.

### GROUPS(&lt;Gruppenliste&gt;)

Mit diesem Attribut können eine oder mehrere Gruppen angegeben werden, zu denen das Eingabeelement gehören soll. Gruppen lassen sich über Einträge im [Abschnitt Sichtbarkeit](#der-abschnitt-sichtbarkeit) abhängig von anderen Eingabeelementen ein- oder ausblenden. Auf diese Weise lassen sich Formulare realisieren, die dem Sachbearbeiter nur die Felder anzeigen, die jeweils relevant sind. Zum Beispiel lassen sich so Eingabefelder zum Ehepartner ausblenden, wenn bei Familienstand "ledig" angewählt wurde.

Bemerkung: Das Attribut GROUPS kann auch [in Dokumentkommandos verwendet werden](#Das_Spezial-Attribut_GROUPS_zur_Steuerung_von_Ein-_und_Ausblendungen), um Teile des erzeugten Dokuments ein- oder auszublenden.

## Beschreibung eines Buttons

Die Beschreibung eines Buttons besteht aus einer Liste von Schlüssel-Wert-Paaren. Die möglichen Paare werden in den folgenden Abschnitten beschrieben. Dabei ist zu beachten, dass nicht alle für jedes Element der Button-Leiste Anwendung finden.

### LABEL "Label"

Die Beschriftung des Buttons.

### TYPE "Typ"

Der Typ des Eingabeelements. Folgende Typen werden unterstützt:
* **button**: ein normaler Button
* **separator**: eine Linie zur Gruppierung ohne weitere Funktion
* **glue**: ein unsichtbares Element, das dazu dient, Abstände zwischen 2 Buttons einzufügen

### MINSIZE "Pixelzahl"

Diese Angabe wird nur bei Elementen vom Typ "glue" ausgewertet und gibt die minimale Breite des einzufügenden Leerraumes in Pixeln an.

### HOTKEY "Buchstabe"

Wird dies angegeben, so kann die mit dem Button verknüpfte Aktion über die Tastatur mit der Kombination Alt-Buchstabe aufgerufen werden. Für Buchstabe sind keine Umlaute oder Sonderzeichen erlaubt.

### ACTION "Aktion"

Die Aktion spezifiziert, was passieren soll, wenn der Benutzer den entsprechenden Button aktiviert. Die folgenden Aktionen werden unterstützt:
* **abort**: Das Formular wird geschlossen.
* **nextTab**: Der nächste Reiter wird angezeigt. Falls der aktuelle Reiter der letzte Reiter ist wird wieder der erste Reiter angezeigt.
* **prevTab**: Der vorhergehende Reiter wird angezeigt. Falls der aktuelle Reiter der erste Reiter ist wird der letzte Reiter angezeigt.
* **form2PDF**: Öffnet einen Speichern-Dialog. Unter dem angegebenen Dateinamen wird eine PDF-Version des aktuellen Zustands des Formulars gespeichert. Sollte mindestens eine Plausi anzeigen, dass das Formular fehlerhaft ausgefüllt wurde, so wird der [entsprechende Warnungs-Dialog](Konfigurationsdatei_wollmux.conf#Plausiwarnung) angezeigt.
* **save**: Speichert das Formular. Wurde es bislang noch nicht gespeichert, kommt ein Dialog zur Auswahl des Dateinamens. Sollte mindestens eine Plausi anzeigen, dass das Formular fehlerhaft ausgefüllt wurde, so wird der [entsprechende Warnungs-Dialog](Konfigurationsdatei_wollmux_conf.md#plausiwarnung) angezeigt.
* **saveAs**: Öffnet einen Speichern-Dialog und speichert das Formular unter dem angegebenen Dateinamen. Sollte mindestens eine Plausi anzeigen, dass das Formular fehlerhaft ausgefüllt wurde, so wird der [entsprechende Warnungs-Dialog](Konfigurationsdatei_wollmux_conf.md#plausiwarnung) angezeigt.
* **printForm**: Druckt das Formular
* **funcDialog**: Erfordert die zusätzliche Angabe des Attributs DIALOG. Der angegebene Funktionsdialog wird aufgerufen.
* **closeAndOpenExt**: Speichert das Formular in einer temporären Datei eines beliebigen Formats (z.B. odt oder pdf), schließt dann das Formular ohne Benutzerrückfrage und öffnet die temporäre Datei mit der externen Anwendung, die im EXT-Attribut dieses Buttons angegeben ist. Das Format, in dem die temporäre Datei gespeichert wird, ist davon abhängig, was im [FILTER-Attribut](Konfigurationsdatei_wollmux_conf.md#filter-filtername) für die verwendete externe Anwendung im [Abschnitt "ExterneAnwendungen"](Konfigurationsdatei_wollmux_conf.md#externeanwendungen) der WollMux-Konfiguration angegeben ist.
* **saveTempAndOpenExt**: Speichert das Formular in einer temporären Datei eines beliebigen Formats (z.B. odt oder pdf) und öffnet die temporäre Datei mit der externen Anwendung, die im EXT-Attribut dieses Buttons angegeben ist. Das Format, in dem die temporäre Datei gespeichert wird, ist davon abhängig, was im     [FILTER-Attribut](Konfigurationsdatei_wollmux_conf.md#filter-filtername) für die verwendete externe Anwendung im [Abschnitt    "ExterneAnwendungen"](Konfigurationsdatei_wollmux_conf.md#externeanwendungen) der WollMux-Konfiguration angegeben ist.

### DIALOG "&lt;Funktionsdialog&gt;"

Wird bei Buttons mit [ACTION "funcDialog"](Konfigurationsdatei_wollmux_conf.md#action-aktion) angegeben, um den [Funktionsdialog](Konfigurationsdatei_wollmux_conf.md#funktionsdialoge) auszuwählen, der durch den Button aufgerufen werden soll.

### EXT "&lt;Anwendungsname&gt;"

Wird bei Buttons mit [ACTION](#action-aktion) "closeAndOpenExt" und "saveTempAndOpenExt" benötigt, um die externe Anwendung zu identifizieren, die zum Öffnen der nach Ausführen der Action gespeicherten temporären Datei verwendet werden soll. Als Anwendungsname stehen die Anwendungen zur Verfügung, die im [Abschnitt "ExterneAnwendungen"](Konfigurationsdatei_wollmux_conf.md#externeanwendungen) der WollMux-Konfiguration deklariert wurden. Für die Anwendung muss in der WollMux-Konfiguration mit dem [Attribut FILTER](Konfigurationsdatei_wollmux_conf.md#filter-filtername) ein Export-Filter festgelegt worden sein!

## Der Abschnitt "Sichtbarkeit"

In diesem Abschnitt können Bedingungen definiert werden, unter denen bestimmte Teile der Formular-GUI und des Formulardokuments ausgeblendet bzw. eingeblendet werden. Dies ist besonders nützlich zur Konsolidierung mehrerer Formulare, die größtenteils den gleichen Inhalt haben (z.B. "Abtretungserklärung für ..."). Typischerweise wird die Sichtbarkeit der Formularteile an Checkboxen geknüpft. Der Abschnitt Sichtbarkeit hat folgenden Aufbau:
```
Sichtbarkeit
(
  GroupId1(`<Funktion>`)
  GroupId2(`<Funktion>`)
  ...
)
```
Jeder Eintrag im Abschnitt Sichtbarkeit beginnt mit einem Gruppenbezeichner, wie er einem Eingabeelement mittels [GROUPS-Attribut](Dokumentkommandos_des_WollMux.md#groupsgruppenliste) zugewiesen werden kann. Danach folgt eine [Funktion](Konfigurationsdatei_wollmux_conf.md#funktionen). Diese wird bei jeder Änderung eines der Eingabefelder von denen sie abhängt neu ausgewertet. Liefert sie "true", werden die Mitglieder der Gruppe angezeigt, ansonsten nicht.

## Die Abschnitte "Funktionen" und "Funktionsdialoge"

Diese Abschnitte funktionieren genau wie die Abschnitte [Funktionen](Konfigurationsdatei_wollmux_conf.md#funktionen) und [Funktionsdialoge](Konfigurationsdatei_wollmux_conf.md#funktionsdialoge) in der wollmux.conf und erlauben die Definition formularspezifischer Funktionen und Funktionsdialoge. Wo möglich sollte darauf verzichtet und stattdessen die Definition global in der wollmux.conf gehalten werden.

## Beispiel

```
WM(
 Formular(
  TITLE "08/15 Bescheid"
  Fenster( 
    Empfaenger(
      TITLE "08/15 Bescheid: Empfänger"
      CLOSEACTION "abort"
      TIP "Angabe der Empfängeradresse"
      HOTKEY "E"

      Eingabefelder(
        (LABEL "Anrede"  TYPE "combobox" VALUES ("Herr", "Frau") ID "EmpfaengerAnrede" TIP "Anrede des Empfängers"            
           AUTOFILL(DIALOG("Empfaengerauswahl","Anrede"))
        )
        
        (LABEL "Vorname" TYPE "textfield" ID "EmpfaengerVorname" TIP "Ist doch selbsterklärend"
           AUTOFILL(DIALOG("Empfaengerauswahl","Vorname"))
        )

        (LABEL "Nachname" TYPE "textfield" ID "EmpfaengerNachname" TIP "Ist doch selbsterklärend"
           AUTOFILL(DIALOG("Empfaengerauswahl","Nachname"))
        )
       
        (LABEL "Straße Hausnummer" TYPE "textfield" ID "EmpfaengerStrasse"
           AUTOFILL(DIALOG("Empfaengerauswahl","Strasse"))
        )
        (LABEL "PLZ" TYPE "textfield" ID "EmpfaengerPLZ"
           AUTOFILL(DIALOG("Empfaengerauswahl","PLZ"))
        )
        (LABEL "Ort" TYPE "textfield" ID "EmpfaengerOrt"
           AUTOFILL(DIALOG("Empfaengerauswahl","Ort"))
        )
        
        (TYPE "glue") # ergibt optisch ansprechendere Anordnung der Eingabeelemente

      )#Eingabefelder

      Buttons(
        (LABEL "Abbrechen"  TYPE "button" HOTKEY "A"  ACTION "abort" )
        (TYPE "glue" MINSIZE "20")
        (LABEL "Adressauswahl" TYPE "button" HOTKEY "A"  ACTION "funcDialog" DIALOG "Empfaengerauswahl")
        (LABEL "Weiter->"  TYPE "button" HOTKEY "W"  ACTION "nextTab")
      )#Buttons
    )#Empfaenger
    
    Bescheidtext(
      TITLE "08/15 Bescheid: Bescheidtext"
      CLOSEACTION "abort"
      TIP "Der Inhalt des Bescheids"
      HOTKEY "B"

      Eingabefelder(
        (LABEL "Anrede" TYPE "combobox" VALUES ("Herr", "Frau") ID "Anrede" EDIT "true")
        (LABEL "Vorname" TYPE "textfield" ID "Vorname" )
        (LABEL "Nachname" TYPE "textfield" ID "Nachname")
        (LABEL "wohnhaft in" TYPE "textfield" ID "Adresse"
          PLAUSI(MATCH(VALUE("Adresse"), ".+"))   # erzwinge mindestens 1 Zeichen Eingabe
        )

        (LABEL "Zusatztext einblenden" TYPE "checkbox" ID "ZusatztextCheckbox")

        (LABEL "Zusatztext" TYPE "textarea" LINES "4" GROUPS "Zusatztext" WRAP "true")
  
        (TYPE "glue")

      )#Eingabefelder

      Buttons(
        (LABEL "Abbrechen"  TYPE "button" HOTKEY "A"  ACTION "abort")
        (TYPE "glue" MINSIZE "20")
        (LABEL "<-Zurück"  TYPE "button" HOTKEY "Z"  ACTION "prevTab")
        (LABEL "Weiter->"  TYPE "button" HOTKEY "W"  ACTION "nextTab")
      )#Buttons
    )#Bescheidtext
  )#Fenster
  
  Sichtbarkeit
  (
    Zusatztext(VALUE("ZusatztextCheckbox"))
  )

  Funktionen 
  (
     #können hier definiert werden, sollten aber besser global in wollmux.conf definiert werden
    
  )#Funktionen
  
  Funktionsdialoge(
    #können hier definiert werden, sollten aber besser global in wollmux.conf definiert werden
  )
  
 )#Formular
)#WM
```

<Category:AG-Office> <Category:Eierlegender_WollMux>
<Category:Handbuch_des_WollMux>
<Category:Office_Vorlagenumsteller_Handbuch>
