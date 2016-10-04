### WollMux 15.04

#### Bugfixes

-   FM4000: Funktionstester sortiert Comboboxen alphabetisch
-   Skalierung der FormularGUI bleibt auch mit mehreren Elementen stabil

#### Neue Features

-   FM4000: Der Funktionstester bietet nun eine Funktion an, mit dem man
    den Tausenderpunkt formatiert.
-   FM4000: Optische Unterscheidung zwischen insertValues und
    insertFormValues
    -   insertValues (Textmarken) werden im Reiter “Einfügungen” leicht
        gräulich dargestellt
    -   insertFormValues (Feldern) bleiben weiss, da diese Elemente
        primär für die Formular-GUI verwendet werden.
-   Optionen-Menü und MenüManager konfigurativ steuerbar
    -   ALLOW\_USER\_CONFIG standardmäßig aktiviert (damit das
        Optionen-Menü standardmäßig nutzbar ist)
    -   Der Button Menümanager ist über eine weitere
        Konfigurationsoption ALLOW\_MENUMANAGER aktivierbar.
    -   ALLOW\_MENUMANAGER is dabei standardmäßig deaktiviert (Feature
        aktuell als experimentell eingestuft)
    -   Ist aufgrund ALLOW\_USER\_CONFIG oder ALLOW\_MENUMANAGER ein
        Button deaktiviert, wird er gar nicht erst in die WollMuxBar
        eingefügt
    -   Die neuen Optionen sind unter
        <http://www.wollmux.net/wiki/Konfigurationsdatei_wollmux.conf> dokumentiert.
-   Zoomfaktor in der WollMuxBar über Optionen-Menü einstellbar
    -   Benutzern wird es ermöglicht einen eigenen Wert für den
        Font-Zoom zu definieren (wollmuxbar.conf).
    -   Eine lokale wollmuxbar.conf-Datei hat immer Vorrang zu
        den (zentralen) Einstellungen aus der wollmux.conf.
    -   Der Button “Standard wiederherstellen” setzt alle
        Benutzereinstellungen zurück und die (zentralen) Einstellungen
        greifen wieder.
-   Es wird nun vor dem OOoBasedMailMerge (Druck nach ODT) geprüft, ob
    mehr Datensätze gedruckt werden sollen, als es Office
    verarbeiten kann.
    -   In diesem Fall erfolgt eine Fehlermeldung.
-   Mittels Sichtbarkeiten können Elemente in der FormularGUI
    aus-/eingeblendet werden.
    -   Dies gilt nun auch für Elemente vom Typ Button
    -   Somit können Standardelemente, wie z.B. Weiter, Drucken, etc.
        deaktiviert werden, solange die entsprechende Sichtbarkeit nicht
        gültig ist.
-   Neuer Windows-Installer mit besserer Benutzerfuehrung
    -   Der WollMux-Installer unter Windows enthält nun eine
        Willkommensseite, in der auch z.B. die
        Installationsvoraussetzungen beschrieben sind.
    -   Alle bisherigen Prüfungen auf JAVA und LO/OOo werden nach der
        Willkommensseite durchgeführt.
    -   Der Installer ist in Deutsch und in Englisch (je
        nach Systemsprache) verfügbar
-   WollMux-ODT-Seriendruck direkt als Fenster
    anzeigen (MailMergeType.SHELL)
    -   Damit das neue Feature funktioniert, muss mindestens LO 4.4.3
        installiert sein. Bei älteren Versionen wird automatisch auf den
        alten Modus (=Dokument wird nach der Generierung neu geladen)
        gewechselt.
    -   Mit den Versionen LO 4.4.0 bis LO 4.4.2 ist KEIN Seriendruck in
        ein ODT-Gesamtdokument möglich. Hier wird das Gesamtdokument
        zwar generiert, kann aber aufgrund eines LibreOffice-Bugs nicht
        angezeigt werden.
-   Tooltips in FM4000
    -   Sobald der Cursor über einer Spalte steht, werden nun
        Tooltips angezeigt.
    -   Beim Klicken auf “Neues Label”, werden die Spalten mit “ID” und
        “Label” vorbefüllt.
    -   Beim Klicken in Feld “ID” oder “Label” wird der Text gelöscht
        und erwartet eine Eingabe.
    -   Bei mehrfach eingefügten Label wird der Name “ID”
        hochgezählt (ID2,ID3,ID4,...)
    -   Ein Label sollte selbst nicht den Namen “Label” bekommen
    -   Eine ID sollte selbst nicht den Namen “ID” bekommen

### WollMux-Konfiguration 15.04

#### Bugfixes

-   Zoomfaktor für die WollMuxbar kann wieder zentral vorgegeben werden

#### Neue Features

-   Zustellvermerk wurde mit “Einwurfeinschreiben” ergänzt
    -   Für bestehende Vorlagen muss in der
        WM-Config (conf/referat.conf) der Eintrag \#%include
        “formularanpassung.conf” wieder einkommentiert werden, damit der
        Zustellvermerk auch in Bestandsformularen verfügbar ist.
    -   Bei eigenen Änderungen (innerhalb einer Vorlage) am
        Empfängerauswahltab, werden diese nach der
        Einkommentierung überschrieben.
-   Standardprogramm für PDF-Dateien unter Linux ist xdg-open
-   Firefox-Pfad für Windows-7-Installationen erweitert.
-   Optionen-Menü und MenüManager konfigurativ steuerbar (referat.conf)
    -   Über die Option ALLOW\_USER\_CONFIG kann gesteuert werden, dass
        die Konfigurationsdatei wollmuxbar.conf nicht eingelesen und
        verwendet werden darf.
        -   Damit werden dann zwangsweise auch die Buttons mit den
            Actions “options” und “menuManager” deaktiviert (sie
            speichern ihre Änderungen in der Datei wollmuxbar.conf).
        -   Sie stellen so außerdem sicher, dass ausschließlich die
            Einstellungen der wollmux.conf greifen und Benutzer nicht
            versehentlich zentrale Vorgaben überschreiben können.
        -   Die Verwendung der wollmuxbar.conf ist standardmäßig aktiv.
    -   Über die Option ALLOW\_MENUMANAGER kann das bislang als
        experimentell eingestufte Feature “Menü-Manager” zu Testzwecken
        aktiviert werden.
        -   Der Menü-Manager ist bislang noch nicht für die Verwendung
            freigegeben und daher standardmäßig deaktiviert.
-   Umstellung des Archivformats der wollmux-standard-config für windows
    von zip auf 7z
    -   Somit gibt es mit dem Zeichensatz weniger Probleme beim
        Entpacken

