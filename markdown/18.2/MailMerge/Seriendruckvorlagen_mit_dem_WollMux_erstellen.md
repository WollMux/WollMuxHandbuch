# {{ page.title }}

Dieser Artikel erklärt an praktischen Anwendungsbeispielen, wie Seriendruckvorlagen für den WollMux erstellt werden.

## Einfache Serienbriefvorlage erstellen

Dieses Beispiel dient vorrangig der Demonstration. Die durchzuführenden Schritte werden beschrieben, detaillierte Erklärungen fehlen jedoch. Das später folgende Beispiel für eine komplexe Serienbriefvorlage ist in diesem Punkt ausführlicher und sollte nach diesem einfachen Beispiel durchgearbeitet werden.

Wir wollen einen einfachen Serienbrief mit externem Briefkopf verschicken. Die Exemplare des Serienbriefs werden direkt gedruckt. Der Serienbrief soll folgenden Inhalt haben:

```
Sehr <Anrede>,

wir laden Sie herzlich zu unserer Jubiläumsveranstaltung anlässlich des 10-jährigen
Bestehens unserer Abteilung ein.

Mit freundlichen Grüßen

Sach Bearbeiter
```

Dabei soll “Sach Bearbeiter” durch den Namen des Sachbearbeiters und &lt;Anrede&gt; jeweils durch “geehrter Herr Soundso” bzw. “geehrte Frau Soundso” ersetzt werden. Das Empfängerfeld des externen Briefkopfs soll die entsprechende Adresse enthalten:

```
Zeile 1  Herrn Soundso                  Frau Soundso
Zeile 2  Irgendwostr. 10       bzw.     Nirgendgasse. 31
Zeile 3  99999 Nirgendheim              77777 Woauchimmer
```

### Durchführung

#### Vorbereitung

1. Rufen Sie die WollMux-Sidebar auf
2. Fügen Sie Felix Wollmux zur Absenderliste hinzu
3. Wählen Sie Felix Wollmux als Absender aus

#### Serienbriefvorlage erstellen

1. Wählen Sie in der WollMux-Leiste Standard/Mischvorlagen/Mischvorlage externer Briefkopf
2. Lesen Sie den Erklärungstext
3. Löschen Sie den Erklärungstext und fügen Sie dann den obigen Serienbrieftext ein.
4. Selektieren Sie den Brieftext und ändern Sie das Absatzformat auf “Fließtext”.
5. Selektieren Sie das Wort "<Anrede>"
6. Rufen Sie den Dialog *Einfügen/Feldbefehl/Andere...* auf. Wählen Sie den Reiter *Funktionen*
7. Wählen Sie *Eingabefeld*. Geben Sie bei *Hinweis* folgenden Text ein: "&lt;&lt;Anrede&gt;&gt;" (ohne die Anführungszeichen; beachten Sie die doppelten Größer- und Kleinerzeichen)
8. Klicken Sie auf *Einfügen*. Das folgende Pop-Up bestätigen Sie mit OK, ohne etwas einzugeben. Anstelle von "&lt;Anrede&gt;" ist jetzt im Text ein leeres Eingabefeld, erkennbar an einem kleinen grauen Kasten.
9. Blenden Sie über das Menü *Ansicht/Symbolleisten* die Leiste *Werkzeuge für Vorlagenersteller (WollMux)* ein.
10. Starten Sie über den Button *FormularMax 4000* den FormularMax 4000 (FM4000).
11. Aktivieren Sie im FM4000 den Menüpunkt *Formular/Formularfelder aus Dokument einlesen*
12. Schließen Sie den FormularMax 4000.
13. Selektieren Sie das Wort “Sach”. Wählen Sie *Einfügen/Textmarke*
14. Geben Sie folgenden Text ein: `WM(CMD 'insertValue' DB\_SPALTE 'Vorname')` und bestätigen Sie mit OK.
15. Selektieren Sie das Wort “Bearbeiter”. Wählen Sie *Einfügen/Textmarke*
16. Geben Sie folgenden Text ein: `WM(CMD 'insertValue' DB\_SPALTE 'Nachname')` und bestätigen Sie mit OK.
17. Speichern Sie die Vorlage als “OpenDocument Textdokumentvorlage (.ott)”

#### Vorlage öffnen

1. Öffnen Sie die Vorlage (z.B. Doppelklick im Dateimanager oder über Datei/Öffnen)
2. Wenn ein Pop-Up erscheint für das Eingabefeld "&lt;&lt;Anrede&gt;&gt;" brechen Sie es einfach ab.
3. Es wird nun der externe Briefkopf aufgebaut und mit den ausgewählten Sachbearbeiterdaten (wenn Sie obiger Vorbereitung gefolgt sind, dann sind dies die von Felix Wollmux) befüllt. Die Worte “Sach Bearbeiter” werden durch “Felix Wollmux” ersetzt.

Achtung: Unter *keinen* Umständen dürfen Sie dieses Dokument als Vorlage speichern. Wenn Sie das Dokument in dieser Form speichern, so sind darin der Briefkopf und die Sachbearbeiterdaten fest verdrahtet. Falls sich die Standard-Briefköpfe oder Ihre Daten ändern oder wenn eine andere Person die Vorlage verwendet, dann wird der Inhalt nicht automatisch angepasst.\
Um die Vorlage zu bearbeiten, müssen Sie sie im Bearbeitungsmodus öffnen. Auf dem Basisclient gibt es im Rechts-Klick Menü des Dateimanagers dafür den Punkt “Vorlage bearbeiten”. Sie können die Vorlage auch in LibreOffice über *Datei/Dokumentvorlage/Bearbeiten...* öffnen. Dass Sie die Vorlage korrekt zum Bearbeiten geöffnet haben erkennen Sie daran, dass Sie keinen fertigen Briefkopf sehen, sondern nur den Platzhalter "&lt;externer Briefkopf&gt;".

#### Empfängerdaten für den Seriendruck bereitstellen

Öffnen Sie die Beispieldatei [Serienbriefdatentabelle.ods](http://limux.tvc.muenchen.de/ablage/sonstiges/wollmux/schulung/beispiele/Serienbriefdatentabelle.ods).

Sie sehen, dass die Tabelle neben Spalten *EmpfaengerZeileX*, die die Daten für das Adressfeld links oben im Brief angeben, auch eine Spalte *Anrede* besitzt, in der der Anrede-Text genau in der Form enthalten ist, in der er hinter dem “Sehr” im Brief eingefügt werden muss.

#### Seriendruck durchführen

1. Wechseln Sie von der Tabellenkalkulation zurück zum Writer-Fenster mit dem Serienbrief (dem “UnbenanntX” Dokument mit fertig ausgefülltem Briefkopf). Halten Sie jedoch die Tabelle mit den Daten für den Seriendruck weiter offen!
2. Öffnen Sie die Seriendruck-Sidebar. Sie sehen, dass Ihnen neben den bei LibreOffice registrierten Datenquellen auch alle offenen Calc-Tabellendokumente als Quelle für den Seriendruck angeboten werden. Die Tabellen müssen nicht einmal gespeichert werden.
3. Wählen Sie die *Serienbriefdatentabelle* als Datenquelle aus.
4. Drücken Sie den Button *Start*. Die Serienbriefe werden nun gedruckt.

## Komplexe Serienbriefvorlage erstellen

Diesmal wollen wir eine komplexe Serienbriefvorlage erstellen. Die Vorlage soll Felder enthalten, die abhängig von der Anrede des Empfängers mit den korrekten geschlechtsspezifischen Begriffen befüllt werden. Zu unseren Empfängern gehören auch Firmen, so dass auch Mehrzahlformen vorkommen können. Des weiteren wollen wir, dass bestimmte Abschnitte nur in den an Firmen adressierten Exemplaren erscheinen. Der Serienbrief soll folgenden Inhalt haben (exemplarisch für den Mehrzahl-Fall):

```
Sehr geehrte Damen und Herren,
wie Sie aus der Presse sicher erfahren haben, möchte die Landeshauptstadt München die Love Parade in unsere schöne
Heimatstadt holen. Wie in vielen Berichten ebenfalls angesprochen wurde hat die Stadt dafür leider nicht das nötige
Kleingeld. Für die Finanzierung der Veranstaltung müssen also neue Geldquellen erschlossen werden. Die Stadt hat sich
daher dazu entschlossen, passend zum Anlass eine einmalige Liebesabgabe zu erheben. Betroffen von der neuen Abgabe
sind all diejenigen Münchner Bürgerinnen und Bürger sowie in München ansässige Firmen, die `“`Liebe`”` im Namen tragen.
Die Höhe der Abgabe richtet sich danach, wie viel Liebe Sie im Herzen tragen. Um Sie korrekt einstufen zu können,
möchten wir Sie daher bitten, den unten stehenden Abschnitt auszufüllen, abzutrennen und schnellstmöglichst an uns
zurück zu senden.

Mit freundlichen Grüßen
Felix WollMux
-----------------------------------------------------------------------------------------------------------------
Wir, Liebeskind Schrauben GmbH und Co. KG, erklären hiermit, im vergangenen Jahr
____ EUR für wohltätige Zwecke gespendet
____ Bäume gepflanzt
____ Kuschelrock-CDs gekauft
____ neue Jobs geschaffen

zu haben.

Als in München ansässige Firma sind wir Stolz darauf, das Projekt `“`Love`
Parade@München`”` zu unterstützen.

München, den __________________________________________ (Unterschrift des Geschäftsführers)
```

### Durchführung

#### Mischvorlage erstellen

1. Rufen Sie die WollMux-Sidebar auf (falls sie nicht läuft)
2. Wählen Sie Standard/Mischvorlagen/Mischvorlage externer Briefkopf
3. Lesen Sie den Erklärungstext
4. Löschen Sie den Erklärungstext und fügen Sie dann den obigen Serienbrieftext ein.
5. Speichern Sie die Vorlage als “OpenDocument Textdokumentvorlage (.ott)”
6. Doppelklicken Sie auf die neu gespeicherte Vorlage im Dateimanager. Es wird ein neues “UnbenanntX” Dokument geöffnet und der externe Briefkopf wird automatisch mit dem Brieftext gemischt.
7. Schließen Sie das gerade geöffnete “UnbenanntX” Dokument.
8. Falls Sie die Vorlage nicht mehr geöffnet haben, so öffnen Sie sie erneut zum Bearbeiten (Datei/Dokumentvorlage/Bearbeiten oder (auf dem Basisclient) Rechts-Klick im Dateimanager und “Vorlage bearbeiten”. Dass Sie eine Mischvorlage zum Bearbeiten geöffnet haben sehen Sie daran, dass zuoberst "&lt;externer Briefkopf&gt;" steht. Sehen Sie dagegen einen fertig ausgefüllten externen Briefkopf, haben Sie die Datei im falschen Modus geöffnet.

> **WARNING** Speichern Sie unter keinen Umständen eine Datei mit fertig ausgefülltem Briefkopf als Vorlage!

#### Formularfelder einfügen

##### Arbeitserleichterung

Jeder WollMux-Serienbrief ist gleichzeitig auch ein WollMux-Formular. Die Erstellung einer WollMux-Serienbriefvorlage entspricht also dem Erstellen einer Formularvorlage. Um das Einfügen von Formularfeldern zu erleichtern, sollten Sie sich das Icon zum Menüpunkt *Einfügen/Feldbefehl/Andere...* direkt in die Standardsymbolleiste einfügen. Sie tun dies wie folgt:

1. Öffnen Sie das Menü *Extras/Anpassen...* und dort den Reiter *Symbolleisten*.
2. Wählen Sie die Symbolleiste *Standard* aus.
3. Über *Hinzufügen...* fügen Sie die Aktion *Einfügen/Feldbefehle einfügen* zur Symbolleiste hinzu.

Durch einen Klick auf das neue Icon (nicht den kleinen Pfeil daneben!) können Sie nun direkt das Menü *Einfügen/Feldbefehl/Andere...* aufrufen. Wenn Sie lieber mit Tastenkürzeln arbeiten können Sie natürlich auch das Tastenkürzel Strg-F2 verwenden.

##### Anredeabhängige Felder

1. Selektieren Sie das Wort “geehrte”. (Tip: Ein einzelnes Wort lässt sich durch Doppelklick mit der Maus einfach selektieren.)
2. Rufen Sie *Einfügen/Feldbefehl/Andere...* auf (z.B. über das oben hinzugefügte Icon).
3. Wählen Sie den Reiter *Funktionen*
4. Wählen Sie *Eingabeliste*
5. Geben Sie im Textfeld *Eintrag* “geehrter” ein und klicken Sie auf *Hinzufügen* (oder drücken Sie ENTER).
6. Geben Sie im Textfeld *Eintrag* “geehrte” ein und klicken Sie auf *Hinzufügen* (oder drücken Sie ENTER).
7. Geben Sie im Textfeld *Eintrag* “geehrte” ein. Beachten Sie, dass nach dem letzten Buchstaben ein Leerzeichen eingegeben wird. Dies umgeht die Beschränkung, dass die Eingabeliste nicht 2 mal den selben Eintrag enthalten kann. Klicken Sie auf *Hinzufügen* (oder drücken Sie ENTER).
8. Geben Sie im Textfeld *Name* folgenden String ein: "&lt;&lt;gender:EmpfaengerAnrede&gt;&gt;". Dies ist eine magische Syntax, die angibt, dass der Wert dieser Eingabeliste automatisch in Abhängigkeit vom Feld “EmpfaengerAnrede” gesetzt werden soll. Wenn im Anredefeld (das wir gleich anlegen werden) “Herr” oder “Herrn” ausgewählt wurde, wird der erste Eintrag gewählt, bei “Frau” der zweite und in jedem sonstigen Fall (typischerweise Mehrzahl) wird der dritte Eintrag gewählt. Der dritte Eintrag ist dabei optional. Wenn ihr Formular/Serienbrief den Mehrzahlfall nicht behandeln muss, kann der dritte Eintrag weggelassen werden.
9. Klicken Sie auf *Einfügen* (oder Drücken Sie Strg-ENTER). Das selektierte Wort wurde nun durch ein Auswahlfeld ersetzt.
10. Selektieren Sie nun die ganze Phrase “Damen und Herren”.
11. Sofern Sie ihn nicht mehr offen haben, rufen Sie wieder den Dialog *Einfügen/Feldbefehl/Andere...* auf.
12. Fügen Sie (in dieser Reihenfolge) die Einträge “Herr”, “Frau”, “Damen und Herren” zur Liste hinzu.
13. Geben Sie im Textfeld *Name* folgenden String ein: “Anrede&lt;&lt;EmpfaengerAnrede&gt;&gt;”. Dies ist eine magische Syntax, die angibt, dass zu dieser Eingabeliste in der Formular-GUI eine Combobox erscheinen soll, die mit dem Label “Anrede” versehen wird. Dieser Aspekt ist im Fall einer reinen Serienbriefvorlage natürlich unwichtig, für ein manuelles Ausfüllen von Einzelexemplaren aber nützlich.

    Des weiteren gibt diese Syntax an, dass der Wert dieses Feldes die ID “EmpfaengerAnrede” haben soll. Diese ID findet zum Beispiel Anwendung bei der bereits verwendeten "&lt;&lt;gender:...&gt;&gt;" Syntax. Alle mit "&lt;&lt;gender:EmpfaengerAnrede&gt;&gt;" versehenen Eingabelisten werden  in Abhängigkeit des Feldes mit "&lt;&lt;EmpfaengerAnrede&gt;&gt;" Angabe befüllt.

    Bei IDs ist darauf zu achten, dass Gross-/Kleinschreibung von Bedeutung ist, und dass die Regeln für Bezeichner eingehalten werden (also z.B. keine enthaltenen Leerzeichen oder Umlaute). Für das Label (den Teil vor dem &lt;&lt;...&gt;&gt;) gelten diese Einschränkungen nicht.
14. Beim Erstellen eines Formulars, das von Hand ausgefüllbar sein soll (und da von Serienbriefen manchmal Einzelexemplare erforderlich sind ist dies auch bei Serienbriefvorlagen meist der Fall), sollten Sie für das neue Formularfeld eine sinnvolle Voreinstellung wählen. Klicken Sie zu diesem Zweck mit der linken Maustaste auf das neue Formularfeld und wählen Sie den gewünschten Standardwert aus.

    Bei vielen Schreiben gibt es aufgrund der Sache den Fall, dass sie nicht gleich häufig an Männer und Frauen verschickt werden. Überlegen Sie sich, ob der Ansprechpartner meistens eine Frau, ein Mann oder eine Gruppe ist und wählen Sie die Voreinstellung entsprechend.

    Eine sinnvolle Voreinstellung spart den Sachbearbeiterinnen und Sachbearbeitern später unnütze Klicks und Frustration.

     > **INFO** Die aktuelle Anzeige des Formularfelds ist *nicht automatisch* die Voreinstellung. Eine frisch eingefügte Eingabeliste hat *keine Voreinstellung*, auch wenn standardmäßig der erste Eintrag der Liste angezeigt wird. Eine Voreinstellung ist daran zu erkennen, dass im Poppup-Menü, das bei Links-Klick auf das Feld erscheint, ein Eintrag farblich hervorgehoben ist.<br>
Bei abgeleiteten Feldern, deren Inhalt der WollMux automatisch setzt (wie z.B. das weiter oben eingefügte “geehrte/r” Feld) ist das setzen einer Voreinstellung unnötig.

15. Im Abschnitt unter der gestrichelten Linie, selektieren Sie das Wort “Wir” und ersetzen Sie es durch eine Eingabeliste mit den Einträgen “Ich”, “Ich” und “Wir”. Als *Name* wird wieder "&lt;&lt;gender:EmpfaengerAnrede&gt;&gt;" eingetragen.
16. Ersetzen sie das Wort “erklären” durch eine Eingabeliste “erkläre”, “erkläre”, “erklären”, wieder mit Hinweis "&lt;&lt;gender:EmpfaengerAnrede&gt;&gt;".

##### Weitere Felder

1. Fügen Sie hinter dem Anredefeld mit der Liste “Herr”,“Frau”,“Damen und Herren” ein Leerzeichen ein. Mit dem Cursor hinter diesem Leerzeichen stehend wählen Sie im *Einfügen/Feldbefehl/Andere...* Dialog den Feldttyp *Eingabefeld*. Geben Sie bei Hinweis den folgenden String ein: “Nachname&lt;&lt;EmpfaengerNachname&gt;&gt;”. Klicken Sie dann auf *Einfügen*. Im dann erscheinenden Fenster geben Sie “Mustermann” ein und bestätigen mit OK (bzw. Strg-ENTER).
2. Markieren Sie den Text “Liebeskind Schrauben GmbH und Co. KG”.
3. Fügen Sie an dessen Stelle ein Eingabefeld ein mit *Hinweis* “Firma&lt;&lt;EmpfaengerFirma&gt;&gt;”. Geben Sie im Popup-Fenster “Musterfirma” ein.
4. Platzieren Sie den Cursor direkt hinter dem Wort “Musterfirma”. Fügen Sie an dieser Stelle ein Eingabefeld mit *Hinweis* "Vorname&lt;&lt;EmpfaengerVorname&gt;&gt;” ein. Im Popup-Fenster geben Sie “Hans” ein. Achten Sie darauf, dass zwischen dem Wort “Musterfirma” und dem Wort “Hans” *kein* Leerzeichen steht.
5. Platzieren Sie den Cursor direkt hinter dem Wort “Hans”. Fügen Sie ein Leerzeichen ein. Fügen Sie dann ein Eingabefeld ein mit *Hinweis* "&lt;&lt;EmpfaengerNachname&gt;&gt;".

    Beachten Sie den Unterschied zum weiter oben eingefügten Feld mit Hinweis “Nachname&lt;&lt;EmpfaengerNachname&gt;&gt;”. Die Label-Angabe vor dem &lt;&lt;...&gt;&gt; fehlt dieses Mal, da das Feld eine Kopie des anderen Nachnamefeldes sein soll. Würde man dieses Mal wieder ein Label vergeben würde dies dazu führen, dass beim manuellen Ausfüllen dem Bearbeiter 2 Felder zur Eingabe des Nachnames angeboten werden. Wegen der identischen ID-Angabe &lt;&lt;EmpfaengerNachname&gt;&gt; könnten beide Felder aber nicht unabhängig voneinander befüllt werden. Es käme zu Ungereimtheiten in der Darstellung.

    **Regel**: In einem Formular darf es für jede ID nur genau ein Feld (egal ob Eingabefeld oder Eingabeliste) geben mit der magischen Angabe “Label&lt;&lt;ID&gt;&gt;”. Bei allen anderen Feldern darf nur "&lt;&lt;ID&gt;&gt;" ohne Label vorkommen.

##### Formularfelder in WollMux-Felder umwandeln

Damit die in den obigen Schritten eingefügten Formularfelder vom WollMux erkannt werden, müssen entsprechende WollMux-Merkmale hinzugefügt werden. Verwenden Sie dazu den FormularMax 4000 wie im folgenden beschrieben.

1. Blenden Sie über das Menü *Ansicht/Symbolleisten* die Leiste *Werkzeuge für Vorlagenersteller (WollMux)* ein.
2. Starten Sie über den Button *FormularMax 40000* den FormularMax 4000 (FM4000).
3. Aktivieren Sie im FM4000 den Menüpunkt *Formular/Formularfelder aus Dokument einlesen*.

    Sie sehen, dass für jedes Element, das mit der magischen Syntax “Label&lt;&lt;ID&gt;&gt;” versehen wurde ein entsprechendes Eingabeelement hinzugekommen ist. Für die Elemente, die mit der Syntax "&lt;&lt;ID&gt;&gt;" versehen wurden, ist kein Eingabeelement erzeugt worden, jedoch finden sich diese Stellen auf dem Reiter *Einfügungen* wieder.

##### Formular für das händische Ausfüllen nachbearbeiten

Obwohl unser Ziel die Erstellung einer Serienbriefvorlage ist, ist es durchaus wahrscheinlich, dass die Vorlage auch einmal von Hand ausgefüllt werden muss, um Einzelexemplare zu generieren. Deswegen wollen wir im folgenden die Vorlage so nachbearbeiten, dass sie auch als eigenständige Formularvorlage verwendbar ist. Die folgenden Handlungsanweisungen beziehen sich, wenn nichts anderes erwähnt ist, auf den FM4000.

1. Klicken Sie auf das Wort “Vorname”. Die entsprechende Zeile wird blau markiert. Klicken Sie 2 mal auf den Button *Hoch*, damit das Element “Vorname” vor das Element “Nachname” wandert.
2. Wenn Sie auf der linken Seite die entsprechenden Eingabeelemente auswählen, können Sie auf der rechten Seite des FM4000 auf dem AUTOFILL Reiter sehen, dass “Hans”, “Mustermann” und “Musterfirma” als Vorgabewerte für “EmpfaengerVorname”, “EmpfaengerNachname” und “EmpfaengerFirma” übernommen wurden. Löschen Sie auf dem AUTOFILL-Reiter diese Vorgabe, indem Sie bei *Funktion* auf *&lt;keine&gt;* umstellen (der oberste Eintrag in der Funktionen-Liste. Evtl. müssen Sie das Pull-Down-Menü scrollen, um ihn angezeigt zu bekommen).
3. Wählen Sie *Einfügen/Empfängerauswahl-Tab*.
4. Aktivieren Sie den Reiter namens “Reiter”. Klicken Sie dort in das erste Textfeld mit dem Text “Reiter” und geben Sie dort “Ansprechpartner” ein. Klicken Sie dann in das Textfeld daneben, das ebenfalls das Wort “Reiter” enthält und geben Sie ebenfalls “Ansprechpartner” ein.
5. Rufen Sie *Formular/Formulartitel setzen* auf und geben Sie als Titel “Love Parade@München” ein
6. Wählen Sie den Reiter *Ansprechpartner* aus. Rufen Sie dann *Einfügen/Abbrechen,&lt;-Zurück,PDF,Drucken* auf.
7. Speichern Sie die Vorlage und öffnen Sie sie (nicht zum Bearbeiten, sondern normal). Wenn der Popup-Dialog mit Titel “Eintrag auswählen: &lt;&lt;gender:EmpfaengerAnrede&gt;&gt;” erscheint, drücken Sie einfach Abbrechen (bzw. ESC). Der Briefkopf wird mit Ihren Sachbearbeiterdaten befüllt und die WollMux-Formular-GUI erscheint zum Ausfüllen des Formulars. Durch das Umschalten der Anrede können Sie überprüfen, dass die abgeleiteten Felder sich korrekt ändern.

#### Einfügestellen für Sachbearbeiterdaten markieren

An der Stelle wo im Text im Moment noch “Felix Wollmux” steht, soll wie im Briefkopf der Name des Sachbearbeiters automatisch eingefügt werden. Derzeit bietet der FormularMax 4000 leider noch keine bequeme Möglichkeit, entsprechende Markierungen zu setzen. Deswegen werden wir die entsprechende Markierung manuell einfügen.

1. Wenn Sie die Vorlage nicht mehr zum Bearbeiten geöffnet haben, dann tun Sie dies bitte wieder. Schließen Sie alle “UnbenanntX” Dokumente, die von vorherigen Tests noch offen sind, um zu vermeiden, dass Sie Änderungen im falschen Fenster durchführen und evtl. aus Versehen Ihre Vorlage mit einem Dokument überschreiben, das einen bereits ausgefüllten Briefkopf enthält.
2. Schließen Sie den FormularMax 4000, falls Sie ihn noch offen haben.
3. Selektieren Sie das Wort “Felix”. Wählen Sie *Einfügen/Textmarke*
4. Geben Sie folgenden Text ein: `WM(CMD 'insertValue' DB\_SPALTE 'Vorname')` und bestätigen Sie mit OK (oder Strg-ENTER).
5. Selektieren Sie das Wort “WollMux”. Wählen Sie *Einfügen/Textmarke*
6. Geben Sie folgenden Text ein: `WM(CMD 'insertValue' DB\_SPALTE 'Nachname')` und bestätigen Sie mit OK (oder Strg-ENTER).
7. Speichern Sie die geänderte Vorlage und öffnen Sie sie zum Testen normal. Statt “Felix WollMux” sollte dort nun der selbe Name stehen wie im Briefkopf.

#### Ein-/Ausblendungen

Die Angabe "(Unterschrift des Geschäftsführers)" und der Satz "Als in München ansässige Firma sind wir Stolz darauf, das Projekt “Love Parade@München” zu unterstützen." sollen nur dann erscheinen, wenn der Empfänger eine Firma ist. Dies ließe sich zwar durch einen Missbrauch der "&lt;&lt;gender:EmpfaengerAnrede&gt;&gt;" Funktionalität realisieren, indem Eingabelisten verwendet werden, die nur für den Mehrzahlfall einen nicht-leeren Text enthalten, jedoch gibt es mit den Ein-/Ausblendungen eine bessere Funktionalität für diesen Zweck.

##### Ein-/Ausblendungen von Textfetzen

Für die Ausblendung des Textes "(Unterschrift des Geschäftsführers)" nutzen wir die WollMux-Funktion zum Ausblenden von Textfetzen.

1. Öffnen Sie die Vorlage wieder zum Bearbeiten und schließen Sie alle anderen Fenster.
2. Selektieren Sie den Text "(Unterschrift des Geschäftsführers)".
3. Fügen Sie eine Textmarke ein mit folgender Bezeichnung: `WM(CMD 'setGroups' GROUPS 'Firma')`
4. Öffnen Sie den FM4000.
5. Rufen Sie *Formular/Formularbeschreibung editieren* auf.
6. Scrollen Sie nach unten bis Sie das Wort “Sichtbarkeit” in Anführungszeichen gefunden haben.
7. Entfernen Sie die Anführungszeichen um das Wort “Sichtbarkeit” und fügen Sie eine öffnende und schließende Klammer dahinter ein:
   `Sichtbarkeit()`
   Da fehlende Klammern zu sehr schwierig zu findenden Fehlern führen können, ist es generell immer ratsam, Klammern nur paarig einzufügen oder zu löschen.
8. Platzieren Sie den Cursor zwischen die neu gesetzten Klammern und fügen Sie folgenden Text ein:

   `Firma(MATCH(VALUE(“EmpfaengerAnrede”), “Damen und Herren”))`

   Dies gibt an, dass die Gruppe “Firma” (siehe oben erzeugte *setGroups*-Textmarke) nur sichtbar sein soll, wenn als Anrede “Damen und Herren” ausgewählt wurde.
9. Wählen Sie *Datei/Speichern* (im “Formularbeschreibung bearbeiten” Fenster!). Dies speichert in diesem Fall *nicht* die Vorlage, sondern bestätigt nur die geänderte Formularbeschreibung.
10. Speichern und testen Sie die Vorlage. Bei der Auswahl von “Herr” oder “Frau” in der Anrede-Combobox sollte der Text "(Unterschrift des Geschäftsführers)" nun nicht mehr erscheinen.

##### Ein-/Ausblendungen von Bereichen

Für das Ausblenden des Satzes “Als in München...” verwenden wir die WollMux-Funktionalität zum Ausblenden von Bereichen. Diese sollte grundsätzlich immer zum Einsatz kommen, wenn größere Textteile auszublenden sind. Nur diese Funktionalität ist zum Beispiel in der Lage auch Tabellen korrekt auszublenden.

1. Öffnen Sie die Vorlage wieder zum Bearbeiten und schließen Sie alle anderen Fenster.
2. Selektieren Sie den Satz “Als in München...”
3. Wählen Sie *Einfügen/Bereich...*. Geben Sie bei *Name* folgenden Text an:

    `Als in München... GROUPS 'Firma'`

    Bestätigen Sie mit dem *Einfügen* Button.
4. Speichern und testen Sie die Vorlage. Wie der Text "(Unterschrift des Geschäftsführers)" sollte der Satz “Als in München...” nur noch sichtbar sein, wenn die Anrede “Damen und Herren” eingestellt ist.

##### Kompatibilität mit dem Adressauswahl-Dialog

1. die Standardspaltennamen verwenden (siehe unten)
2. DIALOG-AUTOFILL setzen

> **INFO** Der Adressauswahl-Dialog wird von den Referaten angepasst. Welche Standardspalten durch ihn befüllt werden, ist also nicht einheitlich.<br>
Nicht alle Daten, die der Adressauswahl-Dialog einfügen kann, sind in der Form-GUI vorhanden.

<Category:Eierlegender_WollMux> <Category:Handbuch_des_WollMux>
<Category:Office_Vorlagenumsteller_Handbuch>
