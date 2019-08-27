Auf dieser Seite sind praktische Anwendungsfälle für [WollMux-Funktionen](Konfigurationsdatei_wollmux_conf.md#grundfunktionen) gesammelt.

Tip: Funktionstester
====================

Im [FormularMax 4000](FormularMax_4000.md) lässt sich über **Ansicht/Funktionstester** ein Dialog aufrufen, in dem Funktionen zusammengeklickt und ausprobiert werden können.

Allgemein
=========

### Leere Eingabe für Berechnungen als 0 behandeln

Die Felder a, b und c enthalten Zahlen, die z.B. mit Hilfe der SUM-Funktion addiert werden sollen. Dabei soll eine leere Eingabe eines Feldes als 0 behandelt werden:
```
SUM( SELECT(VALUE "a" ELSE("0"))
     SELECT(VALUE "b" ELSE("0"))
     SELECT(VALUE "c" ELSE("0")) )
```

### Zahlen formatieren mit Tausenderpunkt

Funktion zum Formatieren von positiven oder negativen Zahlen mit Tausenderpunkt, sowohl mit Komma als auch ohne Komma.
```
CAT(
 REPLACE(
   REPLACE(VALUE "Steuerelement" ",\d*" "")
     "(?<=\d)(?=(\d\d\d)+$)"
     "."
   )
 IF(
   MATCH(VALUE "Steuerelement" "-?(\d+)(,\d*)$")
   THEN (REPLACE(VALUE "Steuerelement" "-?(\d+)(,\d*)$" "$2"))
   ELSE ""
 )
)W
```

PLAUSI
======

Plausibilitätsprüfungen dienen dazu, den Benutzer bereits während des Ausfüllens eines Formulars zu warnen, dass seine Eingaben nicht den Vorgaben entsprechen.

### Eingabe muss aus mindestens X und höchstens Y beliebigen Zeichen bestehen

`MATCH(VALUE "<id>", ".{<X>,<Y>}")`

**Beispiel**

`MATCH(VALUE "bearbeitungsnummer", ".{7,10}")`

### Eingabe muss aus mindestens X und höchstens Y Ziffern bestehen

`MATCH(VALUE "<id>", "[0-9]{<X>,<Y>}")`

Beispiel:

`MATCH(VALUE "bearbeitungsnummer", "[0-9]{1,10}")`

### Eingegebene Zahl muss durch X teilbar sein

`NUMCMP(VALUE "Zahl" PRODUCT( DIVIDE( VALUE "Zahl" BY "<X>" MIN "0" MAX "0" ) "<X>"))`

**Beispiel**

`NUMCMP(VALUE "Zahl" PRODUCT( DIVIDE( VALUE "Zahl" BY "100" MIN "0" MAX "0" ) "100"))`

AUTOFILL
========

Summenberechnung mit min. X bis max. Y Kommastellen
---------------------------------------------------

`FORMAT(SUM(VALUE "<id>", VALUE "<id>") MIN "<X>" MAX "<Y>")`

**Beispiel**

`FORMAT(SUM(VALUE "a", VALUE "b") MIN "2" MAX "2")`

### Fehleranzeigen abfangen

Ergänzung &rarr; Die Werte “a” und “b” sollten einen AUTOFILL-Wert von 0 haben. Ist der Wert "", bringt die Funktion einen Fehler.

Ein anderer Lösungsansatz ist, die ONERROR-Funktion dahingehend zu verwenden dass ein Hinweistext ausgegeben wird, z.B.

```
SELECT(
  FORMAT(SUM(VALUE "<id>", VALUE "<id>") MIN "<X>" MAX "<Y>")
  ONERROR("wird automatisch berechnet")

```

Am elegantesten funktioniert diese Lösung, wenn in der Formularbeschreibung zusätzlich beim enstprechenden Feld der Parameter READONLY auf true gesetzt wird:

**Beispiel**

```
(
  LABEL "Gesamt"
  TYPE "textfield"
  ID "Gesamtsumme"
  TIP ""
  READONLY "true"

  AUTOFILL(
    SELECT(
      PRODUCT(VALUE "Betrag" VALUE "Tage")
      ONERROR "wird automatisch berechnet`
    )
  )
)
```

Den Namen auf den ersten Buchstaben (mit anschließendem Punkt) kürzen
---------------------------------------------------------------------

```
CAT(
    REPLACE(VALUE "<ID>", "(.)(.*+)", "<GRUPPE>")
    "."
   )`
```

**Beispiel**

```
CAT(
    REPLACE(VALUE "Nachname", "(.)(.*+)", "$1")
    "."
   )
```

Eine genauere Beschreibung der REPLACE-Funktion und Übersicht zu regulären Ausdrücken finden Sie auf der Wiki-Seite "[Konfigurationsdatei wollmux.conf](Konfigurationsdatei_wollmux_conf.md#replace-argument-regex-repstr)".

**Erklärung**

In diesem regulären Ausdruck wird von der Verwendung von Gruppen Gebrauch gemacht. Jede Klammer stellt eine Gruppe dar. Die erste Gruppe "***(.)***" enthält nur den ersten Buchstaben und die zweite Gruppe "***(.&ast;+)***" enthält den zweiten (falls überhaupt vorhanden) und alle weiteren Buchstaben.

Für die Ausgabe wurde in diesem Fall die erste Gruppe (mit ***\$1*** bezeichnet) gewählt.

Die weiteren möglichen Gruppen enthalten folgende Informationen:

<table border="0" width="200">
<tr>
<th colspan="2" align="center">Nachname = Müller
</th></tr>
<tr>
<td> <b>$0</b>
</td>
<td> Müller
</td></tr>
<tr>
<td> <b>$1</b>
</td>
<td> M
</td></tr>
<tr>
<td> <b>$2</b>
</td>
<td> üller
</td></tr></table>

TRAFO
=====

Transformationen dienen dazu, im Formular einen anderen Wert darzustellen als der Benutzer eingegeben hat. Dies wird typischerweise verwendet, um Werte automatisch auf bestimmte Weise zu formatieren. TRAFOs werden im FormularMax 4000 über den Reiter **Einfügungen** gesetzt.

> **HINT** TRAFOs bekommen immer den Feldwert des Feldes übergeben auf das sie gesetzt sind. Es kann also unabhängig von der ID des Feldes immer `VALUE "param"` verwendet werden (“param” ist hier *kein* Platzhalter für die Feld-ID).

### Zahl mit genau X Nachkommastellen darstellen

`FORMAT(VALUE "param" MIN "<X>" MAX "<X>")`

**Beispiel**

`FORMAT(VALUE "param" MIN "2" MAX "2") `

#### wie oben, nur falls die Eingabe leer ist, nimm Y an

`FORMAT(SELECT(VALUE "param" ELSE("Y")) MIN "<X>" MAX "<X>")`

**Beispiel**

`FORMAT(SELECT(VALUE "param" ELSE("0")) MIN "2" MAX "2")`

Zahl in Worten mit abgeschnittenen Nachkommanstellen
----------------------------------------------------

“13,6” wird zu “dreizehn”

```
BIND(
  FUNCTION(EXTERN(URL "java:de.muenchen.allg.d101.ZahlInWorten.zahlInWorten" PARAMS("Zahl")))
  SET("Zahl"
    REPLACE(VALUE "ZuKonvertierendeZahl", ",\d+", "")
  )
)
```

<Category:Eierlegender_WollMux> <Category:Handbuch_des_WollMux>
