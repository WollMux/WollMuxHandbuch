Auf dieser Seite werden bekannte Probleme mit den diversen
WollMux-Releases protokolliert. In mehreren Versionen vorhandene
Probleme werden bei allen betroffenen Versionen aufgeführt. Ist bei
einer Version ein Problem nicht erwähnt, so ist diese Version nicht
betroffen.

Alle Versionen
==============

-   WollMux Kill-Button funktioniert nur, wenn zuvor ein Dokument
    geöffnet wurde.
    -   Die Ursache ist der Quickstarter der WollMuxBar. Dieser
        verhindert explizit das Beenden von Office, wenn kein Dokument
        offen ist oder nur Dokumente offen sind die nicht
        verändert wurden.

Version 16.04
=============

-   Bei Installation des WollMux über den Java-Installer werden
    standardmäßig keine Desktop-Verknüpfungen angelegt.
    -   Die Erstellung der Verknüpfungen kann im Java-Installer manuell
        aktiviert werden.
-   Die Erstellung der Datei *auto-install.xml* muss über den
    Java-Installer erfolgen. Eine manuelle Anpassung der Datei führt
    meist nicht zu dem gewünschten Ergebnis.

Version 11.10b
==============

-   Wird der WollMux mit Java 5 eingesetzt, muss zum Versand von E-Mails
    mit Hilfe des WollMux-Seriendrucks das [Java Activation
    Framework](http://www.oracle.com/technetwork/java/javase/index-jsp-136939.html)
    manuell installiert werden. Die benötigten Klassen sind in Java 6
    bereits enthalten.
-   Es ist derzeit nicht möglich, E-Mails per WollMux-Seriendruck über
    einen Server zu versenden, der eine Authentifizierung benötigt.
    Innerhalb der Stadt wird dies allerdings auch nicht benötigt.

Version 11.2d
=============

-   Unter Windows mit OpenOffice.org 3.0.1 funktioniert der WINDOW\_MODE
    “minimize” nicht mehr korrekt.

Version 10.8a
=============

-   Unter Windows mit OpenOffice.org 3.0.1 funktioniert der WINDOW\_MODE
    “minimize” nicht mehr korrekt.
-   Die Anzeige der nicht synchronisierbaren Datensätze aus der
    persönlichen Absenderliste bei der WollMux-Initialisierung erfolgt
    nicht nach der in SENDER\_DISPLAYTEMPLATE definierten Formatierung.
-   Der Serienbrief-Assistent von OpenOffice.org 3.2.1 (nicht
    der WollMux-Seriendruck) wird durch den WollMux stark ausgebremst.
    In manchen Fällen kann es zu benutzersichtbaren
    WollMux-Fehlermeldungen kommen.
-   Beim Durchscrollen der Formular-GUI mittels Tabulatortaste bzw. beim
    Wechseln eines Reiters in der Formular-GUI kann es vorkommen, dass
    innerhalb einer Formular-GUI, die nicht groß genug ist um den
    kompletten Inhalt auf einmal anzuzeigen, automatisch nach rechts
    gescrollt wird, so dass die Labels für die Formularfelder nicht mehr
    zu sehen sind. (R115666)

Version 10.8
============

-   Datenverlust bei WollMux-Formularen: Bei der Bearbeitung eines
    WollMux-Formulars mit aktivierter Änderungsverfolgung kann es zum
    Verlust des WollMuxFormularwerte-Abschnitts kommen. Wird ein
    WollMux-Formular ohne WollMuxFormularwerte-Abschnitt geöffnet, so
    löscht die FormularGUI sämtliche Formulardaten.
-   Seit WollMux 6.4.0 bleiben die Trefferlisten von Funktionsdialogen
    (wie z.B. der Empfängerauswahldialogs) initial leer, auch wenn sie
    so konfiguriert sind, dass sie per Eingabe eines Leerstrings
    sämtliche Datensätze als Suchergebnis anzeigen sollen.
-   Sichtbarkeiten können nicht direkt an den Rückgabewert von
    Funktionen gebunden werden. Andernfalls kann die
    Formularbeschreibung nicht mehr geöffnet werden.
-   Unter Windows mit OpenOffice.org 3.0.1 funktioniert der WINDOW\_MODE
    “minimize” nicht mehr korrekt.
-   Das Drucken-Menü der WollMux-Seriendruckleiste verhält sich nicht
    intuitiv, wenn in die Von-Bis-Felder der Datensatzauswahl kein
    Inhalt eingetragen wird.
-   Die Auswahlliste der Senderbox und der Searchbox wird manchmal
    weiterhin angezeigt wenn sich die WollMux-Leiste minimiert.
-   Die Anzeige der nicht synchronisierbaren Datensätze aus der
    persönlichen Absenderliste bei der WollMux-Initialisierung erfolgt
    nicht nach der in SENDER\_DISPLAYTEMPLATE definierten Formatierung.
-   Der Serienbrief-Assistent von OpenOffice.org 3.2.1 (nicht
    der WollMux-Seriendruck) wird durch den WollMux stark ausgebremst.
    In manchen Fällen kann es zu benutzersichtbaren
    WollMux-Fehlermeldungen kommen.
-   Beim Durchscrollen der Formular-GUI mittels Tabulatortaste bzw. beim
    Wechseln eines Reiters in der Formular-GUI kann es vorkommen, dass
    innerhalb einer Formular-GUI, die nicht groß genug ist um den
    kompletten Inhalt auf einmal anzuzeigen, automatisch nach rechts
    gescrollt wird, so dass die Labels für die Formularfelder nicht mehr
    zu sehen sind. (R115666)

Version 6.3.0/6.3.0a/6.3.0b
===========================

-   Datenverlust bei WollMux-Formularen: Bei der Bearbeitung eines
    WollMux-Formulars mit aktivierter Änderungsverfolgung kann es zum
    Verlust des WollMuxFormularwerte-Abschnitts kommen. Wird ein
    WollMux-Formular ohne WollMuxFormularwerte-Abschnitt geöffnet, so
    löscht die FormularGUI sämtliche Formulardaten.
-   Sichtbarkeiten können nicht direkt an den Rückgabewert von
    Funktionen gebunden werden. Andernfalls kann die
    Formularbeschreibung nicht mehr geöffnet werden.
-   Fehler im WollMux-Seriendruck: Spezialfelder des
    WollMux-Seriendrucks (z.B. “Gender” oder “Wenn...Dann...Sonst...”)
    erhalten beim Drucken mit der Option “in neues Dokument
    schreiben” (Gesamtdokument) für alle Datensätze den selben Wert.
    Andere Druckoptionen (z.B. “auf dem Drucker ausgeben” oder “in
    einzelne Dateien schreiben”) sind von diesem Fehler nicht betroffen.
    **(Nur 6.3.0 und 6.3.0a betroffen)**
-   Nur Windows: Schwebt der Mauszeiger über einer Symbolleiste von
    OpenOffice.org Writer, während die Fenstergröße geändert wird, so
    friert OpenOffice.org manchmal vollständig ein. Da bei jedem
    WollMux-Formular die Fenstergröße geändert wird, um die
    WollMux-FormularGUI und das Writer-Fenster nebeneinander anzuordnen,
    ist das Auftreten des Problems sehr wahrscheinlich. Da die
    WollMux-FormularGUI weiterhin bearbeitet werden kann, bemerkt der
    Benutzer das Problem oft erst später, was dazu führt, dass Benutzer
    über Abstürze in ganz verschiedenen Situationen klagen. **(Nur
    6.3.0 betroffen)**
-   Unter Windows mit OpenOffice.org 3.0.1 funktioniert der WINDOW\_MODE
    “minimize” nicht mehr korrekt. **(Nur 6.3.0a und 6.3.0b betroffen)**
-   Vorlagen, die Spezialfelder des WollMux-Seriendrucks verwenden,
    werden immer als WollMux-Formulare interpretiert, so dass sich beim
    Erzeugen von Dokumenten aus diesen Vorlagen immer eine Formular-GUI
    öffnet (selbst wenn diese leer ist, da es sich nicht wirklich um ein
    WollMux-Formular handelt).
-   Unter OOo 3.2 wird der OpenOffice.org Standard-Seriendruck (nicht
    der WollMux-Seriendruck) vom WollMux ausgebremst und
    manchmal instabil. Andere OOo-Versionen als 3.2 sind
    nicht betroffen.
-   Bei WollMux-Formularen mit einer sehr langen Formularbeschreibung
    kann es aufgrund eines Speicherlecks in OpenOffice.org bei längerer
    Arbeit mit diesen Formularen zu sehr hohem Speicherverbrauch kommen,
    der letztlich sogar zu Abstürzen führen kann. Betroffen von diesem
    Problem ist ausschließlich OOo 3.0.1 (das OOo 3.0.1, das mit dem
    LiMux-Basisclient 2.4 ausgeliefert wird, enthält außerdem einen
    Patch für dieses Problem und ist ebenfalls nicht betroffen).
-   Bei der Weiterverwendung eines OpenOffice.org-Fensters, in dem zuvor
    ein Textdokument geöffnet war, das über den kleinen “X”-Knopf
    geschlossen wurde, kann es zu Problemen kommen. Wird in diesem
    Fenster ein neues Dokument (z.B. ein Calc-Dokument) aufgemacht, so
    kann dieses unter Umständen Dokument nicht mit Datei-&gt;Drucken
    ausgedruckt werden.
-   Das Drucken-Menü der WollMux-Seriendruckleiste verhält sich nicht
    intuitiv, wenn in die Von-Bis-Felder der Datensatzauswahl kein
    Inhalt eingetragen wird.
-   Die Auswahlliste der Senderbox wird manchmal weiterhin angezeigt
    wenn sich die WollMux-Leiste minimiert.
-   Der Serienbrief-Assistent von OpenOffice.org 3.2.1 (nicht
    der WollMux-Seriendruck) wird durch den WollMux stark ausgebremst.
    In manchen Fällen kann es zu benutzersichtbaren
    WollMux-Fehlermeldungen kommen.

Version 5.9.3
=============

-   Sichtbarkeiten können nicht direkt an den Rückgabewert von
    Funktionen gebunden werden. Andernfalls kann die
    Formularbeschreibung nicht mehr geöffnet werden.
-   Diverse Probleme beim Einsatz des WollMux mit OpenOffice.org
    3.2 (z.B. startet der FormularMax 4000 nicht und das Kommando
    “updateFields” funktioniert nicht). Von einem Einsatz dieser
    WollMux-Version mit OOo 3.2 wird abgeraten.
-   Der FormularMax 4000 akzeptiert illegale Namen
    für Sichtbarkeitsgruppen. Durch eine falsche Benennung einer
    Sichtbarkeitsgruppe kann die Formularbeschreibung
    zerschossen werden.
-   Bei der Arbeit im FormularMax 4000 an sehr großen Formularen kann es
    zu einem Speicherüberlauf kommen.
-   Werden unter OOo 3.x in eine Textarea eines WollMux-Formulars mehr
    als 16400 Zeichen eingegeben, so werden alle Formulardaten beim
    nächsten Einladen des Dokuments gelöscht.
-   Vorlagen, die Spezialfelder des WollMux-Seriendrucks verwenden,
    werden immer als WollMux-Formulare interpretiert, so dass sich beim
    Erzeugen von Dokumenten aus diesen Vorlagen immer eine Formular-GUI
    öffnet (selbst wenn diese leer ist, da es sich nicht wirklich um ein
    WollMux-Formular handelt).
-   Bei WollMux-Formularen mit einer sehr langen Formularbeschreibung
    kann es aufgrund eines Speicherlecks in OpenOffice.org bei längerer
    Arbeit mit diesen Formularen zu sehr hohem Speicherverbrauch kommen,
    der letztlich sogar zu Abstürzen führen kann. Betroffen von diesem
    Problem ist ausschließlich OOo 3.0.1 (das OOo 3.0.1, das mit dem
    LiMux-Basisclient 2.4 ausgeliefert wird, enthält außerdem einen
    Patch für dieses Problem und ist ebenfalls nicht betroffen).
-   Bei der Weiterverwendung eines OpenOffice.org-Fensters, in dem zuvor
    ein Textdokument geöffnet war, das über den kleinen “X”-Knopf
    geschlossen wurde, kann es zu Problemen kommen. Wird in diesem
    Fenster ein neues Dokument (z.B. ein Calc-Dokument) aufgemacht, so
    kann dieses unter Umständen Dokument nicht mit Datei-&gt;Drucken
    ausgedruckt werden.
-   Nur Windows: Schwebt der Mauszeiger über einer Symbolleiste von
    OpenOffice.org Writer, während die Fenstergröße geändert wird, so
    friert OpenOffice.org manchmal vollständig ein. Da bei jedem
    WollMux-Formular die Fenstergröße geändert wird, um die
    WollMux-FormularGUI und das Writer-Fenster nebeneinander anzuordnen,
    ist das Auftreten des Problems sehr wahrscheinlich. Da die
    WollMux-FormularGUI weiterhin bearbeitet werden kann, bemerkt der
    Benutzer das Problem oft erst später, was dazu führt, dass Benutzer
    über Abstürze in ganz verschiedenen Situationen klagen.
-   Das Drucken-Menü der WollMux-Seriendruckleiste verhält sich nicht
    intuitiv, wenn in die Von-Bis-Felder der Datensatzauswahl kein
    Inhalt eingetragen wird.
-   Die Auswahlliste der Senderbox wird manchmal weiterhin angezeigt
    wenn sich die WollMux-Leiste minimiert.
-   Der Serienbrief-Assistent von OpenOffice.org 3.2.1 (nicht
    der WollMux-Seriendruck) wird durch den WollMux stark ausgebremst.
    In manchen Fällen kann es zu benutzersichtbaren
    WollMux-Fehlermeldungen kommen.

Version 5.7.1
=============

-   Sichtbarkeiten können nicht direkt an den Rückgabewert von
    Funktionen gebunden werden. Andernfalls kann die
    Formularbeschreibung nicht mehr geöffnet werden.
-   Diverse Probleme beim Einsatz des WollMux mit OpenOffice.org
    3.2 (z.B. startet der FormularMax 4000 nicht und das Kommando
    “updateFields” funktioniert nicht). Von einem Einsatz dieser
    WollMux-Version mit OOo 3.2 wird abgeraten.
-   Der OpenOffice.org Standard-Seriendruck (nicht
    der WollMux-Seriendruck) wird ausgebremst und manchmal instabil.
-   Ein-/Ausblendungen innerhalb von SLVs funktionieren
    nicht zuverlässig.
-   Formulare mit sehr langen Standard-Texten funktionieren unter
    Umständen nicht korrekt. Bisher wurde dieser Fehler vor allem mit
    Java 6 beobachtet.
-   Der FormularMax 4000 akzeptiert illegale Namen
    für Sichtbarkeitsgruppen. Durch eine falsche Benennung einer
    Sichtbarkeitsgruppe kann die Formularbeschreibung
    zerschossen werden.
-   Bei der Arbeit im FormularMax 4000 an sehr großen Formularen kann es
    zu einem Speicherüberlauf kommen.
-   Werden unter OOo 3.x in eine Textarea eines WollMux-Formulars mehr
    als 16400 Zeichen eingegeben, so werden alle Formulardaten beim
    nächsten Einladen des Dokuments gelöscht.
-   Vorlagen, die Spezialfelder des WollMux-Seriendrucks verwenden,
    werden immer als WollMux-Formulare interpretiert, so dass sich beim
    Erzeugen von Dokumenten aus diesen Vorlagen immer eine Formular-GUI
    öffnet (selbst wenn diese leer ist, da es sich nicht wirklich um ein
    WollMux-Formular handelt).
-   Bei WollMux-Formularen mit einer sehr langen Formularbeschreibung
    kann es aufgrund eines Speicherlecks in OpenOffice.org bei längerer
    Arbeit mit diesen Formularen zu sehr hohem Speicherverbrauch kommen,
    der letztlich sogar zu Abstürzen führen kann. Betroffen von diesem
    Problem ist ausschließlich OOo 3.0.1 (das OOo 3.0.1, das mit dem
    LiMux-Basisclient 2.4 ausgeliefert wird, enthält außerdem einen
    Patch für dieses Problem und ist ebenfalls nicht betroffen).
-   Bei der Weiterverwendung eines OpenOffice.org-Fensters, in dem zuvor
    ein Textdokument geöffnet war, das über den kleinen “X”-Knopf
    geschlossen wurde, kann es zu Problemen kommen. Wird in diesem
    Fenster ein neues Dokument (z.B. ein Calc-Dokument) aufgemacht, so
    kann dieses unter Umständen Dokument nicht mit Datei-&gt;Drucken
    ausgedruckt werden.
-   Nur Windows: Schwebt der Mauszeiger über einer Symbolleiste von
    OpenOffice.org Writer, während die Fenstergröße geändert wird, so
    friert OpenOffice.org manchmal vollständig ein. Da bei jedem
    WollMux-Formular die Fenstergröße geändert wird, um die
    WollMux-FormularGUI und das Writer-Fenster nebeneinander anzuordnen,
    ist das Auftreten des Problems sehr wahrscheinlich. Da die
    WollMux-FormularGUI weiterhin bearbeitet werden kann, bemerkt der
    Benutzer das Problem oft erst später, was dazu führt, dass Benutzer
    über Abstürze in ganz verschiedenen Situationen klagen.
-   Das Drucken-Menü der WollMux-Seriendruckleiste verhält sich nicht
    intuitiv, wenn in die Von-Bis-Felder der Datensatzauswahl kein
    Inhalt eingetragen wird.
-   Die Auswahlliste der Senderbox wird manchmal weiterhin angezeigt
    wenn sich die WollMux-Leiste minimiert.

Version 5.6.1a
==============

-   Sichtbarkeiten können nicht direkt an den Rückgabewert von
    Funktionen gebunden werden. Andernfalls kann die
    Formularbeschreibung nicht mehr geöffnet werden.
-   Diverse Probleme beim Einsatz des WollMux mit OpenOffice.org
    3.2 (z.B. startet der FormularMax 4000 nicht und das Kommando
    “updateFields” funktioniert nicht). Von einem Einsatz dieser
    WollMux-Version mit OOo 3.2 wird abgeraten.
-   Ein-/Ausblendungen innerhalb von SLVs funktionieren
    nicht zuverlässig.
-   Dokumente mit Ausblendungen oder SLVs, die mit dieser
    WollMux-Version erstellt/bearbeitet werden, werden evtl. falsch
    dargestellt, wenn sie unter einem OOo mit einer anderen Major
    Version (d.h. 2.x vs 3.x) geöffnet werden. Da die Ursache ein
    OOo-Bug ist, der in verschiedenen Versionen (auch innerhalb der
    2er bzw. 3er Linie) unterschiedlich ausgeprägt ist, sind genaue
    Angaben schwierig.
-   Textmarken können sich bei direkter Bearbeitung des Dokuments
    unbemerkt um Nutztext legen, der dadurch später unter Umständen
    unerwartet gelöscht wird.
-   Der OpenOffice.org Standard-Seriendruck (nicht
    der WollMux-Seriendruck) wird ausgebremst und manchmal instabil.
-   Formulare mit sehr langen Standard-Texten funktionieren unter
    Umständen nicht korrekt. Bisher wurde dieser Fehler vor allem mit
    Java 6 beobachtet.
-   Der FormularMax 4000 akzeptiert illegale Namen
    für Sichtbarkeitsgruppen. Durch eine falsche Benennung einer
    Sichtbarkeitsgruppe kann die Formularbeschreibung
    zerschossen werden.
-   Bei der Arbeit im FormularMax 4000 an sehr großen Formularen kann es
    zu einem Speicherüberlauf kommen.
-   Werden unter OOo 3.x in eine Textarea eines WollMux-Formulars mehr
    als 16400 Zeichen eingegeben, so werden alle Formulardaten beim
    nächsten Einladen des Dokuments gelöscht.
-   Vorlagen, die Spezialfelder des WollMux-Seriendrucks verwenden,
    werden immer als WollMux-Formulare interpretiert, so dass sich beim
    Erzeugen von Dokumenten aus diesen Vorlagen immer eine Formular-GUI
    öffnet (selbst wenn diese leer ist, da es sich nicht wirklich um ein
    WollMux-Formular handelt).
-   Bei WollMux-Formularen mit einer sehr langen Formularbeschreibung
    kann es aufgrund eines Speicherlecks in OpenOffice.org bei längerer
    Arbeit mit diesen Formularen zu sehr hohem Speicherverbrauch kommen,
    der letztlich sogar zu Abstürzen führen kann. Betroffen von diesem
    Problem ist ausschließlich OOo 3.0.1 (das OOo 3.0.1, das mit dem
    LiMux-Basisclient 2.4 ausgeliefert wird, enthält außerdem einen
    Patch für dieses Problem und ist ebenfalls nicht betroffen).
-   Bei der Weiterverwendung eines OpenOffice.org-Fensters, in dem zuvor
    ein Textdokument geöffnet war, das über den kleinen “X”-Knopf
    geschlossen wurde, kann es zu Problemen kommen. Wird in diesem
    Fenster ein neues Dokument (z.B. ein Calc-Dokument) aufgemacht, so
    kann dieses unter Umständen Dokument nicht mit Datei-&gt;Drucken
    ausgedruckt werden.
-   Nur Windows: Schwebt der Mauszeiger über einer Symbolleiste von
    OpenOffice.org Writer, während die Fenstergröße geändert wird, so
    friert OpenOffice.org manchmal vollständig ein. Da bei jedem
    WollMux-Formular die Fenstergröße geändert wird, um die
    WollMux-FormularGUI und das Writer-Fenster nebeneinander anzuordnen,
    ist das Auftreten des Problems sehr wahrscheinlich. Da die
    WollMux-FormularGUI weiterhin bearbeitet werden kann, bemerkt der
    Benutzer das Problem oft erst später, was dazu führt, dass Benutzer
    über Abstürze in ganz verschiedenen Situationen klagen.
-   Das Drucken-Menü der WollMux-Seriendruckleiste verhält sich nicht
    intuitiv, wenn in die Von-Bis-Felder der Datensatzauswahl kein
    Inhalt eingetragen wird.
-   Die Auswahlliste der Senderbox wird manchmal weiterhin angezeigt
    wenn sich die WollMux-Leiste minimiert.

Version 5.4.2
=============

-   Sichtbarkeiten können nicht direkt an den Rückgabewert von
    Funktionen gebunden werden. Andernfalls kann die
    Formularbeschreibung nicht mehr geöffnet werden.
-   Diverse Probleme beim Einsatz des WollMux mit OpenOffice.org
    3.2 (z.B. startet der FormularMax 4000 nicht und das Kommando
    “updateFields” funktioniert nicht). Von einem Einsatz dieser
    WollMux-Version mit OOo 3.2 wird abgeraten.
-   Textmarken können sich bei direkter Bearbeitung des Dokuments
    unbemerkt um Nutztext legen, der dadurch später unter Umständen
    unerwartet gelöscht wird.
-   Der OpenOffice.org Standard-Seriendruck (nicht
    der WollMux-Seriendruck) wird ausgebremst und manchmal instabil.
-   Ein-/Ausblendungen innerhalb von SLVs funktionieren
    nicht zuverlässig.
-   Dokumente mit Ausblendungen oder SLVs, die mit dieser
    WollMux-Version erstellt/bearbeitet werden, werden evtl. falsch
    dargestellt, wenn sie unter einem OOo mit einer anderen Major
    Version (d.h. 2.x vs 3.x) geöffnet werden. Da die Ursache ein
    OOo-Bug ist, der in verschiedenen Versionen (auch innerhalb der
    2er bzw. 3er Linie) unterschiedlich ausgeprägt ist, sind genaue
    Angaben schwierig.
-   Ein Fehler in OpenOffice.org führt dazu, dass beim Speichern und
    Wiedereinladen von Dokumenten Textteile verschwinden können (z.B.
    der erste Buchstabe einer Empfängeradresse). Dies betrifft nur
    Arbeitsabläufe, bei denen Vorlagen oder Dokumente mit
    WollMux-Formularfeatures manuell bearbeitet werden, z.B. manuelles
    Einfügen der Empfängeradresse direkt im Writer unter Umgehung
    der WollMux-Dialoge. Die Arbeit mit WollMux-Formularen, die
    vollständig über die WollMux-Dialoge ausgefüllt werden, ist
    nicht betroffen.
-   Textmarken mit Dokumentkommando “insertFormValue” werden, wenn sie
    nicht entweder ein Formularfeld enthalten oder einen von &lt;&gt;,
    \[\] oder {} eingefassten Text gleich nach Öffnen des Dokuments bzw.
    der Vorlage durch den leeren String ersetzt. Dies kann in
    *fehlerhaften* Formularen dazu führen, dass wichtige Teile des
    Texts verschwinden. Aus diesem Grund gibt der WollMux eine
    Warnmeldung in der wollmux.log aus (mit Priorität LOG), wannimmer er
    einen Text löscht. Potentiell betroffen sind alle Formulare, die nur
    mit WollMux-Versionen ab 3.11.1 getestet wurden, da diese
    WollMux-Versionen den Fehler meist verbergen. Um für eine bestimmte
    Vorlage sicherzustellen, dass sie den Fehler nicht enthält, muss
    diese nur mit dem neuen WollMux geöffnet und danach die Log-Datei
    kontrolliert werden. Ist dort kein Eintrag, ist die Vorlage
    in Ordnung.
-   Formulare mit sehr langen Standard-Texten funktionieren unter
    Umständen nicht korrekt. Bisher wurde dieser Fehler vor allem mit
    Java 6 beobachtet.
-   Der FormularMax 4000 akzeptiert illegale Namen
    für Sichtbarkeitsgruppen. Durch eine falsche Benennung einer
    Sichtbarkeitsgruppe kann die Formularbeschreibung
    zerschossen werden.
-   Bei der Arbeit im FormularMax 4000 an sehr großen Formularen kann es
    zu einem Speicherüberlauf kommen.
-   Werden unter OOo 3.x in eine Textarea eines WollMux-Formulars mehr
    als 16400 Zeichen eingegeben, so werden alle Formulardaten beim
    nächsten Einladen des Dokuments gelöscht.
-   Vorlagen, die Spezialfelder des WollMux-Seriendrucks verwenden,
    werden immer als WollMux-Formulare interpretiert, so dass sich beim
    Erzeugen von Dokumenten aus diesen Vorlagen immer eine Formular-GUI
    öffnet (selbst wenn diese leer ist, da es sich nicht wirklich um ein
    WollMux-Formular handelt).
-   Bei WollMux-Formularen mit einer sehr langen Formularbeschreibung
    kann es aufgrund eines Speicherlecks in OpenOffice.org bei längerer
    Arbeit mit diesen Formularen zu sehr hohem Speicherverbrauch kommen,
    der letztlich sogar zu Abstürzen führen kann. Betroffen von diesem
    Problem ist ausschließlich OOo 3.0.1 (das OOo 3.0.1, das mit dem
    LiMux-Basisclient 2.4 ausgeliefert wird, enthält außerdem einen
    Patch für dieses Problem und ist ebenfalls nicht betroffen).
-   Bei der Weiterverwendung eines OpenOffice.org-Fensters, in dem zuvor
    ein Textdokument geöffnet war, das über den kleinen “X”-Knopf
    geschlossen wurde, kann es zu Problemen kommen. Wird in diesem
    Fenster ein neues Dokument (z.B. ein Calc-Dokument) aufgemacht, so
    kann dieses unter Umständen Dokument nicht mit Datei-&gt;Drucken
    ausgedruckt werden.
-   Nur Windows: Schwebt der Mauszeiger über einer Symbolleiste von
    OpenOffice.org Writer, während die Fenstergröße geändert wird, so
    friert OpenOffice.org manchmal vollständig ein. Da bei jedem
    WollMux-Formular die Fenstergröße geändert wird, um die
    WollMux-FormularGUI und das Writer-Fenster nebeneinander anzuordnen,
    ist das Auftreten des Problems sehr wahrscheinlich. Da die
    WollMux-FormularGUI weiterhin bearbeitet werden kann, bemerkt der
    Benutzer das Problem oft erst später, was dazu führt, dass Benutzer
    über Abstürze in ganz verschiedenen Situationen klagen.
-   Das Drucken-Menü der WollMux-Seriendruckleiste verhält sich nicht
    intuitiv, wenn in die Von-Bis-Felder der Datensatzauswahl kein
    Inhalt eingetragen wird.
-   Die Auswahlliste der Senderbox wird manchmal weiterhin angezeigt
    wenn sich die WollMux-Leiste minimiert.

Version 5.4.0
=============

-   Sichtbarkeiten können nicht direkt an den Rückgabewert von
    Funktionen gebunden werden. Andernfalls kann die
    Formularbeschreibung nicht mehr geöffnet werden.
-   Diverse Probleme beim Einsatz des WollMux mit OpenOffice.org
    3.2 (z.B. startet der FormularMax 4000 nicht und das Kommando
    “updateFields” funktioniert nicht). Von einem Einsatz dieser
    WollMux-Version mit OOo 3.2 wird abgeraten.
-   Nach Speichern und Wiederöffnen von Formularen können Werte in der
    Formular-GUI verloren gehen.
-   Nach Schließen von OOo funktioniert die WollMux-Leiste nicht mehr.
-   Ein-/Ausblendungen innerhalb von SLVs funktionieren
    nicht zuverlässig.
-   Textmarken können sich bei direkter Bearbeitung des Dokuments
    unbemerkt um Nutztext legen, der dadurch später unter Umständen
    unerwartet gelöscht wird.
-   Der OpenOffice.org Standard-Seriendruck (nicht
    der WollMux-Seriendruck) wird ausgebremst und manchmal instabil.
-   Dokumente mit Ausblendungen oder SLVs, die mit dieser
    WollMux-Version erstellt/bearbeitet werden, werden evtl. falsch
    dargestellt, wenn sie unter einem OOo mit einer anderen Major
    Version (d.h. 2.x vs 3.x) geöffnet werden. Da die Ursache ein
    OOo-Bug ist, der in verschiedenen Versionen (auch innerhalb der
    2er bzw. 3er Linie) unterschiedlich ausgeprägt ist, sind genaue
    Angaben schwierig.
-   Formulare mit sehr langen Standard-Texten funktionieren unter
    Umständen nicht korrekt. Bisher wurde dieser Fehler vor allem mit
    Java 6 beobachtet.
-   Der FormularMax 4000 akzeptiert illegale Namen
    für Sichtbarkeitsgruppen. Durch eine falsche Benennung einer
    Sichtbarkeitsgruppe kann die Formularbeschreibung
    zerschossen werden.
-   Bei der Arbeit im FormularMax 4000 an sehr großen Formularen kann es
    zu einem Speicherüberlauf kommen.
-   Werden unter OOo 3.x in eine Textarea eines WollMux-Formulars mehr
    als 16400 Zeichen eingegeben, so werden alle Formulardaten beim
    nächsten Einladen des Dokuments gelöscht.
-   Vorlagen, die Spezialfelder des WollMux-Seriendrucks verwenden,
    werden immer als WollMux-Formulare interpretiert, so dass sich beim
    Erzeugen von Dokumenten aus diesen Vorlagen immer eine Formular-GUI
    öffnet (selbst wenn diese leer ist, da es sich nicht wirklich um ein
    WollMux-Formular handelt).
-   Bei WollMux-Formularen mit einer sehr langen Formularbeschreibung
    kann es aufgrund eines Speicherlecks in OpenOffice.org bei längerer
    Arbeit mit diesen Formularen zu sehr hohem Speicherverbrauch kommen,
    der letztlich sogar zu Abstürzen führen kann. Betroffen von diesem
    Problem ist ausschließlich OOo 3.0.1 (das OOo 3.0.1, das mit dem
    LiMux-Basisclient 2.4 ausgeliefert wird, enthält außerdem einen
    Patch für dieses Problem und ist ebenfalls nicht betroffen).
-   Bei der Weiterverwendung eines OpenOffice.org-Fensters, in dem zuvor
    ein Textdokument geöffnet war, das über den kleinen “X”-Knopf
    geschlossen wurde, kann es zu Problemen kommen. Wird in diesem
    Fenster ein neues Dokument (z.B. ein Calc-Dokument) aufgemacht, so
    kann dieses unter Umständen Dokument nicht mit Datei-&gt;Drucken
    ausgedruckt werden.
-   Nur Windows: Schwebt der Mauszeiger über einer Symbolleiste von
    OpenOffice.org Writer, während die Fenstergröße geändert wird, so
    friert OpenOffice.org manchmal vollständig ein. Da bei jedem
    WollMux-Formular die Fenstergröße geändert wird, um die
    WollMux-FormularGUI und das Writer-Fenster nebeneinander anzuordnen,
    ist das Auftreten des Problems sehr wahrscheinlich. Da die
    WollMux-FormularGUI weiterhin bearbeitet werden kann, bemerkt der
    Benutzer das Problem oft erst später, was dazu führt, dass Benutzer
    über Abstürze in ganz verschiedenen Situationen klagen.
-   Das Drucken-Menü der WollMux-Seriendruckleiste verhält sich nicht
    intuitiv, wenn in die Von-Bis-Felder der Datensatzauswahl kein
    Inhalt eingetragen wird.
-   Die Auswahlliste der Senderbox wird manchmal weiterhin angezeigt
    wenn sich die WollMux-Leiste minimiert.

Version 5.2.0
=============

-   Sichtbarkeiten können nicht direkt an den Rückgabewert von
    Funktionen gebunden werden. Andernfalls kann die
    Formularbeschreibung nicht mehr geöffnet werden.
-   Nicht einsetzbar mit OOo 3.x.
-   Braucht für den Aufbau von Vorlagen teilweise doppelt so lang wie
    ältere Versionen.
-   Ein-/Ausblendungen innerhalb von SLVs funktionieren
    nicht zuverlässig.
-   Textmarken können sich bei direkter Bearbeitung des Dokuments
    unbemerkt um Nutztext legen, der dadurch später unter Umständen
    unerwartet gelöscht wird.
-   Der OpenOffice.org Standard-Seriendruck (nicht
    der WollMux-Seriendruck) wird ausgebremst und manchmal instabil.
-   Dokumente mit Ausblendungen oder SLVs, die mit dieser
    WollMux-Version erstellt/bearbeitet werden, werden evtl. falsch
    dargestellt, wenn sie unter OOo 3.x geöffnet werden. Da die Ursache
    ein OOo-Bug ist, der in verschiedenen Versionen (auch innerhalb der
    2er bzw. 3er Linie) unterschiedlich ausgeprägt ist, sind genaue
    Angaben schwierig.
-   Formulare mit sehr langen Standard-Texten funktionieren unter
    Umständen nicht korrekt. Bisher wurde dieser Fehler vor allem mit
    Java 6 beobachtet.
-   Bei der Arbeit im FormularMax 4000 an sehr großen Formularen kann es
    zu einem Speicherüberlauf kommen.
-   Vorlagen, die Spezialfelder des WollMux-Seriendrucks verwenden,
    werden immer als WollMux-Formulare interpretiert, so dass sich beim
    Erzeugen von Dokumenten aus diesen Vorlagen immer eine Formular-GUI
    öffnet (selbst wenn diese leer ist, da es sich nicht wirklich um ein
    WollMux-Formular handelt).
-   Das Drucken-Menü der WollMux-Seriendruckleiste verhält sich nicht
    intuitiv, wenn in die Von-Bis-Felder der Datensatzauswahl kein
    Inhalt eingetragen wird.
-   Die Auswahlliste der Senderbox wird manchmal weiterhin angezeigt
    wenn sich die WollMux-Leiste minimiert.

Version 5.1.0
=============

-   Sichtbarkeiten können nicht direkt an den Rückgabewert von
    Funktionen gebunden werden. Andernfalls kann die
    Formularbeschreibung nicht mehr geöffnet werden.
-   Nicht einsetzbar mit OOo 3.x.
-   Textmarken können sich bei direkter Bearbeitung des Dokuments
    unbemerkt um Nutztext legen, der dadurch später unter Umständen
    unerwartet gelöscht wird.
-   Der OpenOffice.org Standard-Seriendruck (nicht
    der WollMux-Seriendruck) wird ausgebremst und manchmal instabil.
-   Ein-/Ausblendungen innerhalb von SLVs funktionieren
    nicht zuverlässig.
-   Dokumente mit Ausblendungen oder SLVs, die mit dieser
    WollMux-Version erstellt/bearbeitet werden, werden evtl. falsch
    dargestellt, wenn sie unter OOo 3.x geöffnet werden. Da die Ursache
    ein OOo-Bug ist, der in verschiedenen Versionen (auch innerhalb der
    2er bzw. 3er Linie) unterschiedlich ausgeprägt ist, sind genaue
    Angaben schwierig.
-   Formulare mit sehr langen Standard-Texten funktionieren unter
    Umständen nicht korrekt. Bisher wurde dieser Fehler vor allem mit
    Java 6 beobachtet.
-   Bei der Arbeit im FormularMax 4000 an sehr großen Formularen kann es
    zu einem Speicherüberlauf kommen.
-   Vorlagen, die Spezialfelder des WollMux-Seriendrucks verwenden,
    werden immer als WollMux-Formulare interpretiert, so dass sich beim
    Erzeugen von Dokumenten aus diesen Vorlagen immer eine Formular-GUI
    öffnet (selbst wenn diese leer ist, da es sich nicht wirklich um ein
    WollMux-Formular handelt).
-   Das Drucken-Menü der WollMux-Seriendruckleiste verhält sich nicht
    intuitiv, wenn in die Von-Bis-Felder der Datensatzauswahl kein
    Inhalt eingetragen wird.
-   Die Auswahlliste der Senderbox wird manchmal weiterhin angezeigt
    wenn sich die WollMux-Leiste minimiert.

Version 4.11.0
==============

-   Sichtbarkeiten können nicht direkt an den Rückgabewert von
    Funktionen gebunden werden. Andernfalls kann die
    Formularbeschreibung nicht mehr geöffnet werden.
-   Nicht einsetzbar mit OOo 3.x.
-   Textmarken können sich bei direkter Bearbeitung des Dokuments
    unbemerkt um Nutztext legen, der dadurch später unter Umständen
    unerwartet gelöscht wird.
-   Ein-/Ausblendungen innerhalb von SLVs funktionieren
    nicht zuverlässig.
-   Wenn Formulare transformierte Felder enthalten, so werden diese nach
    dem Speichern und erneuten Öffnen des Formulars in der FormularGUI
    immer mit "!!!PRÜFEN!!!" markiert.
-   Der OpenOffice.org Standard-Seriendruck (nicht
    der WollMux-Seriendruck) wird ausgebremst und manchmal instabil.
-   Dokumente mit Ausblendungen oder SLVs, die mit dieser
    WollMux-Version erstellt/bearbeitet werden, werden evtl. falsch
    dargestellt, wenn sie unter OOo 3.x geöffnet werden. Da die Ursache
    ein OOo-Bug ist, der in verschiedenen Versionen (auch innerhalb der
    2er bzw. 3er Linie) unterschiedlich ausgeprägt ist, sind genaue
    Angaben schwierig.
-   Formulare mit sehr langen Standard-Texten funktionieren unter
    Umständen nicht korrekt. Bisher wurde dieser Fehler vor allem mit
    Java 6 beobachtet.
-   Bei der Arbeit im FormularMax 4000 an sehr großen Formularen kann es
    zu einem Speicherüberlauf kommen.
-   Vorlagen, die Spezialfelder des WollMux-Seriendrucks verwenden,
    werden immer als WollMux-Formulare interpretiert, so dass sich beim
    Erzeugen von Dokumenten aus diesen Vorlagen immer eine Formular-GUI
    öffnet (selbst wenn diese leer ist, da es sich nicht wirklich um ein
    WollMux-Formular handelt).
-   Das Drucken-Menü der WollMux-Seriendruckleiste verhält sich nicht
    intuitiv, wenn in die Von-Bis-Felder der Datensatzauswahl kein
    Inhalt eingetragen wird.
-   Die Auswahlliste der Senderbox wird manchmal weiterhin angezeigt
    wenn sich die WollMux-Leiste minimiert.

Version 4.8.0
=============

-   Sichtbarkeiten können nicht direkt an den Rückgabewert von
    Funktionen gebunden werden. Andernfalls kann die
    Formularbeschreibung nicht mehr geöffnet werden.
-   Nicht einsetzbar mit OOo 3.x.
-   Textmarken können sich bei direkter Bearbeitung des Dokuments
    unbemerkt um Nutztext legen, der dadurch später unter Umständen
    unerwartet gelöscht wird.
-   Wenn Formulare transformierte Felder enthalten, so werden diese nach
    dem Speichern und erneuten Öffnen des Formulars in der FormularGUI
    immer mit "!!!PRÜFEN!!!" markiert.
-   Der OpenOffice.org Standard-Seriendruck (nicht
    der WollMux-Seriendruck) wird ausgebremst und manchmal instabil.
-   Ein-/Ausblendungen innerhalb von SLVs funktionieren
    nicht zuverlässig.
-   Dokumente mit Ausblendungen oder SLVs, die mit dieser
    WollMux-Version erstellt/bearbeitet werden, werden evtl. falsch
    dargestellt, wenn sie unter OOo 3.x geöffnet werden. Da die Ursache
    ein OOo-Bug ist, der in verschiedenen Versionen (auch innerhalb der
    2er bzw. 3er Linie) unterschiedlich ausgeprägt ist, sind genaue
    Angaben schwierig.
-   Formulare mit sehr langen Standard-Texten funktionieren unter
    Umständen nicht korrekt. Bisher wurde dieser Fehler vor allem mit
    Java 6 beobachtet.
-   Bei der Arbeit im FormularMax 4000 an sehr großen Formularen kann es
    zu einem Speicherüberlauf kommen.
-   Vorlagen, die Spezialfelder des WollMux-Seriendrucks verwenden,
    werden immer als WollMux-Formulare interpretiert, so dass sich beim
    Erzeugen von Dokumenten aus diesen Vorlagen immer eine Formular-GUI
    öffnet (selbst wenn diese leer ist, da es sich nicht wirklich um ein
    WollMux-Formular handelt).
-   Das Drucken-Menü der WollMux-Seriendruckleiste verhält sich nicht
    intuitiv, wenn in die Von-Bis-Felder der Datensatzauswahl kein
    Inhalt eingetragen wird.
-   Die Auswahlliste der Senderbox wird manchmal weiterhin angezeigt
    wenn sich die WollMux-Leiste minimiert.

<Category:Eierlegender_WollMux> <Category:Handbuch_des_WollMux>
