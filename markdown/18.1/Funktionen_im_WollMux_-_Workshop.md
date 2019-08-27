Hier entstehen die Inhalte eines Workshops zu den Funktionen die definiert werden können, um den WollMux auf eigene Bedürfnisse anzupassen:

Wozu werden Funktionen benötigt?
================================

Der WollMux führt an vielen Stellen sog. Funktionen aus, in denen Geschäftslogik enthalten sein kann. Funktionen werden z.B. in folgenden Elementen verwendet:
- Im Dokumentkommando [insertValue](Dokumentkommandos_des_WollMux.md#das-kommando-insertvalue):

  `WM(CMD 'insertValue' DB\_SPALTE '<spaltenname>' TRAFO '<Funktionsbezeichner>')`
- Im Dokumentkommando [insertFormValue](Dokumentkommandos_des_WollMux.md#das-kommando-insertformvalue2):

  `WM(CMD 'insertFormValue' ID '<feldId>' TRAFO '<Funktionsbezeichner>')`
- In Formularen als Plausis
- In Formularen als Autofill

Funktionen sind ein zentrales Mittel zur Steuerung des WollMux.

Wo befindet sich die Dokumentation zu den Funktionen?
=====================================================

Da Funktionen in der wollmux.conf definiert werden, befindet sich die Dokumentation aller möglichen Funktionen in einem Unterabschnitt der Dokumentation von wollmux.conf: [Funktionen](Konfigurationsdatei_wollmux_conf.md#funktionen)

Einen guten Überblick über alle Funktionen erhält man über das [Inhaltsverzeichnis der Beschreibung der wollmux.conf] (Konfigurationsdatei_wollmux_conf.md) in Kapitel 12.

Übung: Sachbearbeiterdaten transformieren 1
===========================================

Demonstriert die Möglichkeit, eine Funktion mit einem Parameter mit den Hausmitteln des WollMux zu schreiben.
- Editieren der wollmux.conf des aktuellen Benutzers und Hinzufügen einer neuen Funktion:
```
Funktionen(
  MyFirstTrafo(CAT("X" VALUE "arg1" "Y"))
)
```
- Erstellen einer neuen Vorlage und Einbinden der soeben geschriebenen Funktion als TRAFO für insertValue:

  `WM(CMD 'insertValue' DB_SPALTE 'Vorname' TRAFO 'MyFirstTrafo')`
- Testen der Funktion durch Öffnen der Vorlage

> **INFO** Die Funktion erwartet genau einen Parameter, der innerhalb der Funktion “arg1” genannt wird. Beim Ausführen des insertValue-Befehls wird das Sachbearbeiterfeld “Vorname” als Argument “arg1” übergeben.

Übung: Sachbearbeiterdaten transformieren 2
===========================================

Demonstriert die Mächtigkeit der bereits in WollMux verfügbaren Funktionen:
- Editieren der wollmux.conf des aktuellen Benutzers und Hinzufügen einer neuen Funktion:
```
Funktionen(
  DerSachbearbeiterDieSachbearbeiterin(IF(MATCH(VALUE "Anrede" "Herr") THEN "Der Sachbearbeiter" ELSE "Die Sachbearbeiterin"))
)
```
- Erstellen einer neuen Vorlage und Einbinden der soeben geschriebenen Funktion als TRAFO für insertValue:

  `WM(CMD 'insertValue' DB_SPALTE 'Anrede' TRAFO 'DerSachbearbeiterDieSachbearbeiterin')`
- Testen der Funktion durch Öffnen der Vorlage


> **INFO**
- Die Funktion erwartet genau einen Parameter, der innerhalb der Funktion “Anrede” genannt wird. Beim Ausführen des insertValue-Befehls wird das Sachbearbeiterfeld “Anrede” als Argument “Anrede” übergeben.
- **Bevor man zu externen Funktionen greift, sollte man sich immer überlegen, ob die Mittel des WollMux die Anforderung nicht bereits abdecken können.**
  - Bisher wurden nur 5 von 12 möglichen internen Funktionen genutzt.

<!-- -->
> **HINT**
- Der FormularMax 4000 (FM4000) zeigt die soeben definierten Funktionen auch an!
  - Externen Briefkopf öffnen, FM4000 starten, auf Reiter “Einfügungen” wechseln und schauen, welche Funktionen bei Trafos angeboten werden.

Übung: Erste einfache Arithmetik in Basic
=========================================

Demonstriert, wie eine externe Funktion in Basic geschrieben werden kann, die Berechnungen vornimmt und dazu ein Argument erwartet.
- Schreiben einer Funktion in Basic unter MeineMakros&rarr;Standard/Module1:
```vbscript
Sub isOlderThan21(alter as Integer) as String
   result = "false"
     if(alter >= 21) then
       result = "true"
     end if
   isOlderThan21 = result
End Sub
```
- Bekanntmachen der Funktion im WollMux (Editieren der wollmux.conf)
```
Funktionen(
  IsOlderThan21(EXTERN(URL "vnd.sun.star.script:Standard.Module1.isOlderThan21?language=Basic&location=application"
        PARAMS("alter")))
)
```
- Öffnen einer Mischvorlage (z.B. für den internen Briefkopf)
- Einfügen von zwei Eingabefeldern: “Alter &lt;&lt;alter&gt;&gt;” und “AlterOk &lt;&lt;alter&gt;&gt;” mit der Vorbelegung “Alter” bzw. “Alter Ok?”
- Starten des FM4000
- Formular&rarr;Formularfelder aus Dokument einlesen
- Umbenennen der Einfügung “alter1” in “alter” und setzen der Trafo “IsOlderThan21”
- Speichern der Vorlage und Testen der Funktion durch Öffnen der Vorlage

> **INFO**
- Die Funktion erwartet einen Parameter, der dem WollMux im Schlüssel PARAMS bekannt gemacht wird.
- Über den FM4000 erzeugen wir (indirekt) ein Dokumentkommando der Form `WM(CMD 'insertFormValue' TRAFO 'IsOlderThan21')`
- Die Funktion bekommt damit automatisch den Wert als Parameter übergeben, der im Formularfeld angezeigt würde, wenn es keine Trafo gäbe.

Übung: BasicMakro am Dokument
=============================

- Kopieren des vorher erstellten Basic-Makros in eine gleichnamige Bibliothek in der Vorlage selbst.
- Umbenennen der bisherigen Funktion im globalen Bereich, so dass nicht ausversehen die globale Funktion angesprungen wird.

Beobachtungen:
- Es erscheint beim Öffnen der Vorlage die Abfrage “Makros aktivieren?”
- **Das Makro wird erkannt! Makros am Dokument funktionieren nicht zusammen mit dem WollMux!**

Fazit:
- Basic-Makros müssen immer global bekannt sein!
- Offene Frage: Wie können Funktionen geschrieben werden, die auf allen Rechnern global bekannt sind?

Übung: Erstellung eines Uno-Paketes
===================================

- Unter Extras&rarr;Makros&rarr;OOo Basic: Über “Verwalten” eine neue Bibliothek mit dem Namen “POR” erstellen.
- unter POR ein Modul “WollMuxFunctions” erstellen.
- Die Funktion isOlderThan21 dort hin kopieren.
- Über “Verwalten/Bibliotheken/Export” die Bibliothek POR exportieren und danach POR löschen.
- Über den Extension-Manager die neue Extension importieren.
- in der wollmux.conf unter Funktionen alle die externe Funktion an die neuen Bibliotheksnamen anpassen.
- Vorlage testen

Fazit:
- Uno-Pakete haben viele Vorteile:
  - Sie ermöglichen eine zentrale Pflege aller Makros
  - Sie sind strategiekonform und vermeiden Wildwuchs durch Makros am Dokument.
  - Sie sind innerhalb eines Referats einfach zu installieren.
- Nachteile:
  - Keine einfache stadtübergreifende Installation, da nicht jedes Referat einen geeigneten Verteilmechanismus besitzt.
  - **Nicht zu gebrauchen für stadtweit genutzte Vorlagen**

Übung: Mehrere Parameter über BIND verwenden
============================================

-   Basic-Makro:
```vbscript
Sub is6MoreThanY(x as Integer, y as Integer) as String
     result = "false"
     if(x = y+6) then
       result = "true"
     end if
     is6MoreThanY = result
End Sub
```
-   wollmux.conf:

  `Is6MoreThanY(EXTERN(URL "vnd.sun.star.script:POR.WollMuxFunctions.is6MoreThanY?language=Basic&location=application" PARAMS("x" "y")))`
- Vorlage bearbeiten und FM4000 starten
- Bind wird vom FormularMax 4000 automatisch erzeugt.
- Über die Anpassung der Formularbeschreibung kann man Verknüpfung mit anderen Feldern herstellen

<Kategorie:Wollmuxpraxis> [Kategorie:Handbuch des WollMux](Kategorie:Handbuch_des_WollMux)
