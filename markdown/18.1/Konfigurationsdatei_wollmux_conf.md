<!-- toc -->

Der [WollMux](../Eierlegender_WollMux.md) hat
konzeptuell nur eine einzige Konfigurationsdatei, im Folgenden als
*wollmux.conf* bezeichnet. In der Praxis wird diese meist mit Hilfe des
[%include-Mechanismus](Format_von_WollMux-Config-Dateien.md#include)
auf mehrere Dateien verteilt (siehe [Format vonWollMux-Config-Dateien](Format_von_WollMux-Config-Dateien.md)).
Die *wollmux.conf* wird vom WollMux an folgenden Stellen in der
angegebenen Reihenfolge gesucht:

**Unter Windows:**

1.  über die Umgebungsvariable %WOLLMUX\_CONF\_PATH% (Pfad inklusive
    Dateiname, Beispiel: *C:\\Programme\\wollmux\\wollmux.conf*)
2.  *&lt;Profilverzeichnis&gt;/.wollmux/wollmux.conf*, wobei
    &lt;Profilverzeichnis&gt; auf einem deutschen Windows das Verzeichnis
    "C:\\Benutzer\\&lt;Benutzername&gt;" bezeichnet
3.  unter dem Dateipfad (inkl. Dateiname), der im Wert "ConfigPath" im
    Registrierungsschlüssel *HKEY\_CURRENT\_USER\\Software\\WollMux*
    festgelegt ist
4.  unter dem Dateipfad (inkl. Dateiname), der im Wert "ConfigPath" im
    Registrierungsschlüssel *HKEY\_LOCAL\_MACHINE\\Software\\WollMux*
    festgelegt ist
5.  *%APPDATA%/.wollmux/wollmux.conf*, wobei %APPDATA% auf einem deutschen Windows das Verzeichnis "C:\\Benutzer\\&lt;Benutzername&gt;\\AppData\\Roaming" bezeichnet
6.  *%COMMON_APPDATA/.wollmux/wollmux.conf*, wobei %COMMON_APPDATA% auf einem deutschen Windows das Verzeichnis "C:\\ProgramData" bezeichnet
7.  *C:\\Programme (x86)\\.wollmux\\wollmux.con*
8.  *C:\\Programme\\.wollmux\\wollmux.conf*

**Unter Linux:**

1.  über die Umgebungsvariable \$WOLLMUX\_CONF\_PATH (Pfad inklusive
    Dateiname, Beispiel: */etc/wollmux/wollmux.conf*)
2.  *`$HOME`/.wollmux/wollmux.conf*
3.  *&lt;Startverzeichnis&gt;/.wollmux/wollmux.conf*, wobei &lt;Startverzeichnis&gt; den Ordner bezeichnet, in dem die Anwendung aufgerufen wird.
4.  */etc/wollmux/wollmux.conf*

Sobald die Konfigurationsdatei gefunden wurde, wird vom WollMux nicht
mehr an den übrigen Stellen weitergesucht. Wenn also unter Linux eine
Datei *`$HOME`/.wollmux/wollmux.conf* existiert, ist das eventuelle
Vorhandensein einer Konfigurationsdatei unter
*/etc/wollmux/wollmux.conf* irrelevant und wird vom WollMux ignoriert.

Bitte achten Sie beim Editieren der wollmux.conf immer auf die
**korrekte Gross-/Kleinschreibung**! Verwenden Sie bitte insbesondere
alle Schlüssel (bzw. Attribute) ausschließlich wie in der hier
beschriebenen Form.

Seit WollMux 13.5 wird für die WollMuxBar neben der Datei *wollmux.conf*
auch die Datei *wollmuxbar.conf* ausgewertet. Dies ist ausführlicher
beschrieben auf der Seite
[WollMuxBar](WollMuxBar.md#konfiguration).

Der DEFAULT\_CONTEXT
====================

Der DEFAULT\_CONTEXT beschreibt einen Verzeichnis-Pfad in
[URL-Notation](Format_von_WollMux-Config-Dateien.md#urls), an
dem zentrale WollMux-Daten (z.B. Textfragmente, Benutzerdaten) abgelegt
sind. An verschiedenen Stellen der wollmux.conf wird der
DEFAULT\_CONTEXT als Basis zur Auflösung relativer URLs verwendet. Dies
ist an den entsprechenden Stellen vermerkt. Die Syntax zur Festlegung
des DEFAULT\_CONTEXT ist wie folgt:

`DEFAULT_CONTEXT "<url>"`

Dazu ein kleines Beispiel:

`DEFAULT_CONTEXT "[file:///L:/WollMuxDaten](file:///L:/WollMuxDaten)" # WollMux-Daten werden im zentralen Verzeichnis L:/WollMuxDaten vorgehalten.`

Der DEFAULT\_CONTEXT kann überall auf oberster Ebene der
Konfigurationsdatei außerhalb aller Abschnitte definiert werden. Der
DEFAULT\_CONTEXT kann an einer späteren Stelle in der
Konfigurationsdatei redefiniert werden. Die letzte Definition hat
Gültigkeit für die *gesamte* wollmux.conf.

Wird der DEFAULT\_CONTEXT nicht angegeben, so wird das Verzeichnis als
DEFAULT\_CONTEXT verwendet, in dem die wollmux.conf [gefunden wurde](#top).

Wird ein relativer Pfad als DEFAULT\_CONTEXT angegeben (z.B.
../netzlaufwerke/fileserver/wollmux), so wird dieser relativ zu dem
Verzeichnis ausgewertet, in dem die wollmux.conf [gefunden wurde](#top).

Einbinden referatseigener Plugins/CLASSPATH
===========================================

Der WollMux erlaubt den Referaten an verschiedenen Stellen das Einbinden
eigener Plugins, z.B. zur Transformation von aus einer Datenquelle
eingefügten Werten oder um Komfortdruckfunktionen zur Verfügung zu
stellen. Das Einbinden derartiger externer Funktionen erfolgt mittels
[EXTERN-Grundfunktion](#extern-url--params--). Dies kann global in den Abschnitten [Druckfunktionen](#druckfunktionen)
und [Funktionen](#funktionen)
erfolgen, oder direkt in einer Vorlage. Siehe hierzu die [entsprechende Dokumentation zum FormularMax 4000](FormularMax_4000.md#referatsspezifische-plugins).

Der eigentliche Programmcode der externen Funktion muss als statische
Methode einer beliebigen Klasse realisiert sein. Damit der WollMux die
entsprechende Klasse auch findet, muss das Verzeichnis bzw. die
JAR-Datei in der die Klasse enthalten ist dem WollMux über
CLASSPATH-Direktiven bekannt gemacht werden. Im folgenden einige
Beispiele für erlaubte CLASSPATH-Angaben:

```
CLASSPATH( "file:///usr/share/wollmux/" "http://foo.bar.muenchen.de/funktionen.jar")
CLASSPATH "file:///usr/share/wollmux/"
```

Zu beachten ist:

-   CLASSPATH-Angaben müssen auf oberster Verschachtelungsebene der
    wollmux.conf stehen.
-   Die angebenen Werte sind immer URLs.
-   Es wird *nicht* das Verzeichnis angegeben, in dem sich die .class
    Datei befindet, sondern das Oberverzeichnis der Package-Hierarchie.
    Die .class-Datei muss sich in einer ihrem Package entsprechendem
    Unterverzeichnis befinden. Beispiel: Die
    Funktion de.muenchen.sozref.Druck.komfortDruck() ist in der .class
    Datei Druck.class zu finden. Diese Datei liegt im
    Verzeichnis /usr/share/wollmux/de/muenchen/sozref/. Dann ist die
    CLASSPATH Angabe dazu "&lt;file:///usr/share/wollmux/&gt;".
-   Relative URLs werden relativ zum DEFAULT\_CONTEXT aufgelöst.

Logging und Debugging
=====================

Der WollMux schreibt jede auszugebende Meldung an das Ende der Log-Datei
*\$HOME/.wollmux/wollmux.log*, die mit der ersten auszugebenden Meldung
automatisch erzeugt wird. Der WollMux kann in den verschiedensten
Situationen Meldungen erzeugen, die jedoch nicht alle protokolliert
werden müssen. Über den LOGGING\_MODE können Sie steuern, in welchem
Detailgrad die Informationen des WollMux protokolliert werden. Die Datei
wird nie automatisch gelöscht. In der Standardeinstellung schreibt der
WollMux jedoch nur Meldungen in die Datei wollmux.log, um über kritische
Fehler oder Meldungen zu informieren. Ein unnötiges Anwachsen der
Log-Datei wird dadurch verhindert.

Der LOGGING\_MODE
-----------------

Syntax

`LOGGING_MODE "<modus>"`

Beispiel

```
LOGGING_MODE "ERROR"
oder
LOGGING_MODE "DEBUG"
```

Beschreibung: Steuert den Detaillierungsgrad in dem **Ausgaben des WollMux (und der WollMuxBar) in der Datei wollmux.log** erfolgen.

Dabei kennt der WollMux folgende Modi:

<table>
<thead>
<tr class="header">
<th><p><modus></p></th>
<th><p>Beschreibung</p></th>
<th><p>Debugmodus</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>NONE</p></td>
<td><p>Im Logging-Modus NONE werden in keinem Fall Nachrichten ausgegeben.</p></td>
<td><p>Nein</p></td>
</tr>
<tr class="even">
<td><p>ERROR</p></td>
<td><p>Der Logging-Modus ERROR zeigt nur dann Nachrichten an, wenn bei der Ausführung des WollMux Fehler auftreten. Darin sind u.A. enthalten</p>
<ul>
<li>Meldungen über Fehler in den Konfigurationsdateien,</li>
<li>Meldungen über Fehler in Vorlagen,</li>
<li>Meldungen über Fehler beim Zugriff auf die konfigurierten Datenbanken,</li>
<li>Meldungen über interne Fehler des WollMux.</li>
</ul></td>
<td><p>Nein</p></td>
</tr>
<tr class="odd">
<td><p>LOG</p></td>
<td><p>Im Logging-Modus LOG werden alle Meldungen ausgegeben, die für den täglichen Einsatz des WollMux interessant und nützlich sein können, ohne jedoch die Logdatei wollmux.log sinnlos anwachsen zu lassen. Dazu zählen alle Fehlermeldungen (wie im Logging-Modus ERROR) und zusätzlich wichtige Warnungen oder Informationen im laufenden Betrieb. <strong>Der Logging-Modus LOG ist standardmäßig gesetzt</strong>, wenn die Konfigurationsdatei wollmux.conf keine andere Festlegung enthält.</p></td>
<td><p>Nein</p></td>
</tr>
<tr class="even">
<td><p>DEBUG</p></td>
<td><p>Der Logging-Modus DEBUG wird genutzt, um ergänzend zum Logging-Modus LOG detaillierte Informationen über den Status des Programmablaufs auszugeben, mit denen die Fehlersuche bei der Entwicklung und Pflege der Konfigurationsdateien, der Textfragmente und Vorlagen und bei der internen Programmentwicklung erleichtert werden kann. Im Logging-Modus DEBUG werden sehr viele Meldungen erzeugt, von denen nicht alle für den täglichen Einsatz bei Anwenderinnen und Anwendern notwendig sind. Durch die vielen Ausgaben kann sich die Logdatei wollmux.log unnötig aufblähen und sollte von Zeit zu Zeit manuell wieder gelöscht werden. Ist der Logging-Modus DEBUG gesetzt, so reduziert sich die Bearbeitungsgeschwindigkeit des WollMux spürbar!</p>
<p>Erwähnenswert sind außerdem die ersten drei Ausgaben beim Starten des WollMux im Logging-Modus DEBUG, wie in folgendem Beispiel:</p>
<p><code>2006-07-13 11:14 DEBUG2(Logger:162): =========== Logger::init(): LoggingMode = 7 ==========</code><br />
<br />
<code>2006-07-13 11:14 DEBUG(WollMuxSingleton:146): StartupWollMux</code><br />
<br />
<code>2006-07-13 11:14 DEBUG(WollMuxSingleton:147): </code><strong><code>Build-Info:</code> <code>Paketversion:</code> <code>1.2.1,</code> <code>Revision:</code> <code>986</code></strong></p>
<p>Sie enthalten Informationen über die eingesetzte WollMux-Version, die Sie insbesondere bei Rückfragen zum WollMux oder bei der Meldung von Problemen stets angegeben sollten.</p></td>
<td><p>Ja</p></td>
</tr>
<tr class="odd">
<td><p>ALL</p></td>
<td><p>Der Logging-Modus ALL gibt uneingeschränkt alle Nachrichten des WollMux aus. Er liefert zusätzlich zum Logging-Modus DEBUG interne Statusinformationen zurück, die selbst für normale DEBUG-Zwecke zu detailliert sind und im Regelfall nur von den Entwicklern des WollMux benötigt werden. Für die reine Fehlersuche bei der Pflege von Konfigurationsdateien, Textfragmenten und Vorlagen ist dieser Modus nicht zu empfehlen.</p></td>
<td><p>Ja</p></td>
</tr>
</tbody>
</table>

Der Debugmodus
--------------

Neben dem Logging-Modus, der festlegt welche Meldungen in die
wollmux.log-Datei geschrieben werden, gibt es ausserdem eine Betriebsart
des WollMux, in der die Fehlersuche für Vorlagenersteller,
Systemverwalter und Entwickler erleichtert werden soll, den sog.
Debugmodus. Der Debugmodus ist automatisch eingeschalten, wenn der
LOGGING\_MODE "DEBUG" oder "ALL" gesetzt ist (siehe auch obige Tabelle).

Im Debugmodus verhält sich der WollMux in folgenden Punkten anders als
bei nicht gesetztem Debugmodus:

-   Beim Öffnen einer Vorlage führt der WollMux alle darin enthaltenen
    Dokumentkommandos aus. Im Normalfall werden danach alle Bookmarks
    der vollständig abgearbeiteten Dokumentkommandos aus dem
    Dokument entfernt. Im Debugmodus bleiben die Bookmarks der
    Dokumentkommandos erhalten. Auf diese Weise können Fehler in
    Dokumentkommandos leichter gefunden werden, ohne die entsprechende
    Vorlage zum Bearbeiten öffnen zu müssen.

Das SENDER\_DISPLAYTEMPLATE
===========================

Syntax

`SENDER_DISPLAYTEMPLATE "<Anzeigeschema>"`

Beispiel

```
SENDER_DISPLAYTEMPLATE "%{Nachname}, %{Vorname} (%{Rolle})"
oder
SENDER_DISPLAYTEMPLATE "%{Vorname} %{Nachname} (Mailadresse: %{Mail})"
```

Über das Setzen von SENDER\_DISPLAYTEMPLATE kann gesteuert werden wie
die Einträge der persönlichen Absenderliste (PAL) angezeigt werden
sollen (und auch intern über das XPALProvider-Interface ausgegeben
werden, siehe [Schnittstellen des WollMux für Experten](Schnittstellen_des_WollMux_fuer_Experten.md#einbinden-einer-senderbox)).
Neben statischen Textteilen kann das Anzeigemuster Platzhalter der Form
`%{Spaltenname}` enthalten, die für den jeweiligen Datensatz durch den
entsprechenden Datenbankspaltenwert ersetzt werden.

Die Einstellung von SENDER\_DISPLAYTEMPLATE hat insbesondere
Auswirkungen auf die Darstellung der Absenderliste in
[Menü-Elementen](#menue-elemente) vom Typ "senderbox" in der
WollMuxBar. Die Einstellung hat allerdings keinerlei Auswirkung auf den
Dialog "[Persönliche Absenderliste Verwalten](#persönliche-absenderliste-verwalten)" oder
den Dialog "[Absender Auswählen](#absender_auswählen)".
Die Darstellung in den dort verwendeten Elementen vom Typ "listbox" mit
ID "suchergebnis" oder "pal" können über das DISPLAY-Attribut gesteuert
werden, das dort genauer beschrieben ist.

Der PERSISTENT\_DATA\_MODE
==========================

Ab WollMux 11.9 wird das globale Attribut PERSISTENT\_DATA\_MODE
ausgewertet.

Syntax

`PERSISTENT_DATA_MODE "<modus>"`

Beispiel

```
PERSISTENT_DATA_MODE "transition"
oder
PERSISTENT_DATA_MODE "rdfReadLegacy"
```

Für mehrere Zwecke speichert der WollMux bestimmte Informationen über
interne Zustände (sog. Metadaten) im Dokument ab. Über das Setzen von
PERSISTENT\_DATA\_MODE kann gesteuert werden wie und wo der WollMux
diese Daten hinterlegt. Folgende Werte stehen zur Auswahl:

<table>
<thead>
<tr class="header">
<th><p><modus></p></th>
<th><p>Beschreibung</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>annotation<br />
<em>(deprecated)</em></p></td>
<td><p>Im Modus &quot;annotation&quot; werden Metadaten wie standardmäßig in allen Vorgängerversionen von WollMux 11.9 in versteckten Notizen im Dokument hinterlegt. Dieser Mechanismus hat sich in der Vergangenheit als Fehleranfällig erwiesen, da Notizen (oder &quot;Kommentare&quot;, wie sie ab OpenOffice.org 3.2.1 heißen) nicht für die Speicherung von Metadaten vorgesehen sind. Seit OpenOffice.org 3.0 wurde das Benutzerkonzept für Notizen/Kommentare komplett überarbeitet und vereinfacht, so dass sich die Speicherung von WollMux-Metdaten in Notizen für Anwenderinnen und Anwender zunehmend störend auswirkt. So kam es z.B. vor, dass Metadaten ungewollt für Anwenderinnen und Anwender sichtbar wurden.</p>
<p><strong>Von einer Verwendung dieses Modus wird ausdrücklich abgeraten</strong>. Der Modus kann in Einzelfällen eingesetzt werden, um im Fehlerfall das Verhalten von WollMux-Versionen älter als 11.9 nachzubilden.</p></td>
</tr>
<tr class="even">
<td><p>rdf</p></td>
<td><p>Im Modus &quot;rdf&quot; werden Metadaten in einer eigenen XML-Datei namens &quot;wollmux.rdf&quot; im ODF-Paket des Dokuments abgelegt. Dieser Modus sorgt dafür, dass WollMux-Metadaten und das eigentliche Dokument sauber getrennt sind und keine störenden Effekte möglich sind. Da der RDF-Modus explizit eine <a href="http://wiki.services.openoffice.org/wiki/Documentation/DevGuide/OfficeDev/RDF_metadata">UNO-Schnittstelle für Metadaten</a> verwendet, ist davon auszugehen, dass der Modus &quot;rdf&quot; dauerhaft stabil und zuverlässig bleiben wird.</p>
<p>Der Modus &quot;rdf&quot; ist aus konzeptioneller Sicht der sauberste Weg zur Speicherung von WollMux-Metadaten. In diesem Modus werden Metadaten ausschließlich in die XML-Datei geschrieben und ausschließlich von dort gelesen. Das macht den Modus in der Praxis ungeeignet, wenn bereits WollMux-Dokumente im Modus &quot;annotation&quot; (also mit älteren WollMux-Versionen) erzeugt wurden und diese sich noch im Umlauf befinden.</p>
<p><strong>Von einer Verwendung dieses Modus wird abgeraten, wenn Ihr Dokumentenbestand Dokumente enthält, die mit WollMux-Versionen älter als 11.9 erzeugt wurden, oder Austausch mit solchen Dokumenten besteht.</strong> Der Modus ist empfohlen und geeignet für alle Unternehmen/Kommunen, die ab WollMux 11.9 eine Neueinführung des WollMux planen und bisher noch keine WollMux-Dokumente im Einsatz haben.</p></td>
</tr>
<tr class="odd">
<td><p>transition</p></td>
<td><p>Im Modus &quot;transition&quot; werden Metadaten sowohl im Modus &quot;annotation&quot; als auch im Modus &quot;rdf&quot; geschrieben. Beim Lesen von Metadaten haben immer die in den Notizen verfügbaren Werte den Vorrang, so dass die Abwärtskompatibilität in der Phase eines Mischbetriebs von WollMux 11.9 und älter problemfrei sichergestellt ist.</p>
<p><strong>Dieser Modus ermöglicht mittelfristig die Überführung des Dokumentenbestands in die XML-Metadaten (siehe Modus &quot;rdf&quot;), ohne den Mischbetrieb mit alten WollMux-Versionen (im Modus &quot;annotation&quot;) zu gefährden.</strong></p></td>
</tr>
<tr class="even">
<td><p>rdfReadLegacy</p></td>
<td><p>Im Modus &quot;rdfReadLegacy&quot; werden Metadaten ausschließlich wie in Modus &quot;rdf&quot; gespeichert. Befinden sich im Dokument noch mit &quot;annotation&quot; geschriebene Notizen, so werden sie aus Gründen der Abwärtskompatibilität vorrangig gelesen, jedoch anschließend sofort gelöscht und durch entsprechende Einträge in den RDF-Daten ersetzt.</p>
<p><strong>Dieser Modus ist für den langfristigen Einsatz</strong> in allen Unternehmen/Kommunen <strong>vorgesehen</strong>, die bereits WollMux-Dokumente mit in Notizen hinterlegten Metadaten im Einsatz haben und flächendeckend ältere WollMux-Versionen (im Modus &quot;annotation&quot;) abgelöst haben.'''</p></td>
</tr>
<tr class="odd">
</tr>
</tbody>
</table>

Ist die Einstellung PERSISTENT\_DATA\_MODE nicht angegeben, so gilt:

-   Für Alle WollMux-Versionen &lt; Version 11.9 ist implizit der Modus
    "annotation" gesetzt.
-   Ab WollMux-Version 11.9 ist der Modus "transition" voreingestellt.

Desweiteren gilt, dass die Einstellungen **"rdf", "transition" und
"rdfReadLegacy" erst ab OpenOffice.org 3.2.1 unterstützt** werden. Beim
Einsatz des WollMux mit älteren Versionen von OpenOffice.org wird
automatisch auf den Modus "annotation" gewechselt.

Weitere Informationen zu WollMux-Metadaten sind auf der Seite
[Dokumentkommandos des WollMux](Dokumentkommandos_des_WollMux.md#wollmux-metadaten-im-dokument)
beschrieben.

Der Abschnitt OOoEinstellungen
==============================

Für die korrekte Funktionsfähigkeit des WollMux ist es notwendig, dass
bestimmte Konfigurationsoptionen in OpenOffice eingestellt sind. Um das
zu erreichen, können im Abschnitt "OOoEinstellungen" Werte für
Konfigurationseinstellungen vorgegeben werden, die bei jedem Start des
WollMux neu gesetzt werden.

Hier ein Beispiel eines solchen Abschnitts:

```
OOoEinstellungen (

  (NODE "/org.openoffice.Office.Writer/AutoFunction/Format/ByInput/ApplyNumbering"
   PROP "Enable" TYPE "boolean"
   VALUE "false")

  (NODE "/org.openoffice.Office.Writer/Content/NonprintingCharacter"
   PROP "HiddenCharacter" TYPE "boolean"
   VALUE "false")

  (NODE "/org.openoffice.Inet/Settings"
   PROP "ooInetProxyType" TYPE "integer"
   VALUE "0")

)
```

Wie im Beispiel gezeigt enthält der Abschnitt eine Liste mit
Konfigurationsoptionen und den zugehörigen Werten. Jedes Element der
Liste hat den Aufbau

`(NODE "<Pfad/Knotenname>" PROP "<NameDerProperty>" TYPE "<DatentypDerProperty>" VALUE "<zuSetzenderWert>")`

- NODE: Beschreibt den Pfad und den Knotennamen unter dem die Konfigurationseinstellung im OOo-Konfigurationsbaum liegt. (Anmerkung: Technisch gesehen ist dies der HierarchicalName)
- PROP: Beschreibt den Namen der Property und damit die zu verändernde Einstellung selbst.
- TYPE: Beschreibt den Datentyp, in dem der Wert VALUE in die Property übertragen werden soll. Folgende Typen stehen zur Auswahl: "string", "boolean", "integer" und "float".
- VALUE: Enthält den zu setzenden Wert, der vom Typ TYPE sein muss. Entspricht der Wert nicht dem angegebenen Typ, so erscheint eine Fehlermeldung in der wollmux.log und die Einstellung wird nicht gesetzt.

Innerhalb der Konfigurationsdatei wollmux.conf können mehrere Abschnitte
OOoEinstellungen definiert werden, wobei alle darin enthalten
Einstellungen der Reihe nach gesetzt werden. So ist es z.B. möglich
zentrale Vorgaben über die WollMux-Standard-Config zu machen, die dann
in der Datei referat.conf bei Bedarf erweitert werden können.

Bestimmung von NODE, PROP und TYPE
----------------------------------

Wenn bereits eine Konfigurationsdatei (\*.xcu) vorliegt, so können die
Namen aus dem Inhalt dieser Datei abgeleitet werden. Z.B.

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<oor:component-data xmlns:oor="http://openoffice.org/2001/registry" xmlns:xs="http://www.w3.org/2001/XMLSchema" oor:name="Inet" oor:package="org.openoffice">
  <node oor:name="Settings">
    <prop oor:name="ooInetProxyType" oor:type="xs:int">
      <value>0</value>
   </prop>
  </node>
</oor:component-data>
```

-   NODE = /org.openoffice.Inet/Settings
-   PROP = ooInetProxyType
-   TYPE = integer

Also in etwa nach der Regel:

-   NODE = "/" + <oor:component-data/oor:package> + "." +
    <oor:component-data/oor:name> + "/" + <node/oor:name> \[ + "/" +
    <node/oor:name> \](für jeden Unterknoten)
-   PROP = <prop/oor:name>
-   TYPE = Abgeleitet aus <prop/oor:type> (z.B. xs:int &rarr; integer)

Look And Feel Konfiguration
===========================

Ab WollMux 11.9 wird das globale Attribut LAF\_CLASS\_NAME ausgewertet.

Syntax

`LAF_CLASS_NAME "<package.class>"`

Beispiel

`LAF_CLASS_NAME "com.sun.java.swing.plaf.nimbus.NimbusLookAndFeel"`

Über das Setzen des LAF\_CLASS\_NAME wird somit die Oberfläche aller
WollMux-Dialoge an das vorgegebene LookAndFeel angepasst. Diese Option
ist besonders für Anwendungen interessant, die den WollMux einbetten
möchten. Bei unterschiedlichen LookAndFeels des WollMux und der
Anwendung kommt es ansonsten sehr wahrscheinlich zu Problemen.

Wird diese Option nicht verwendet, bleibt das Metal-LAF
(javax.swing.plaf.metal.MetalLookAndFeel) die Standardeinstellung.

Dialoge
=======

Der WollMux hat verschiedene Dialoge, die sich konfigurativ beeinflussen
und auf die Bedürfnisse der Referate maßschneidern lassen.

FONT\_ZOOM
----------

Durch die Direktive FONT\_ZOOM auf der obersten Verschachtelungsebene
des Dialoge-Abschnitts kann für alle WollMux-Eingabemasken die
Schriftgröße verändert werden. Hinter FONT\_ZOOM wird eine
Gleitkommazahl angegeben, mit der alle Schriftgrößen multipliziert
werden. Beispiel

```
Dialoge(
  FONT_ZOOM "2.0"  # alle Schriften doppelt so groß wie normal.
)
```

> **INFO** Die Einstellung Font-Zoom in den Optionen der WollMuxBar setzt
derzeit nur den Font-Zoom in der WollMuxBar)

Absenderdaten Bearbeiten
------------------------

Dieser Dialog dient dazu, den Benutzer die Daten für Einträge aus seiner
persönlichen Absenderliste (und damit insbesondere seine eigenen
Benutzerdaten) überprüfen und bei Bedarf ändern zu lassen. Die
Beschreibung dieses Dialogs befindet sich innerhalb der
Konfigurationsdatei in einem Abschnitt *Dialoge/AbsenderdatenBearbeiten*
und hat folgende Struktur:

```
Dialoge(
  AbsenderdatenBearbeiten(
    MODIFY_MARKER_COLOR "<Farbangabe>"
    Fenster(
      Person(
        TITLE "<Titel>"
        CLOSEACTION "<Aktion>"
       
        Eingabefelder(
          (<Beschreibung Eingabefeld 1>)
          (<Beschreibung Eingabefeld 2>)
          ...
        )
       
        Buttons(
          (<Beschreibung von Button 1>)
          (<Beschreibung von Button 2>)
          ...
        )
      )
     
      Orga(
        TITLE "<Titel>"
        CLOSEACTION "<Aktion>"
       
        Eingabefelder(    
          ...
        )
       
        Buttons(
          ...
        )
      )
     
      Fusszeile(
        TITLE "<Titel>"
        CLOSEACTION "<Aktion>"
       
        Eingabefelder(    
          ...
        )
       
        Buttons(
          ...
        )
      )
    )
  )
)
```

Die 3 Unterabschnitte Person, Orga und Fusszeile beschreiben jeweils ein
Dialogfenster. Im jeweiligen Unterabschnitt Eingabefelder werden die
Benutzerlemente (z.B. Textfelder oder ComboBoxen) beschrieben, die der
Anzeige und Bearbeitung der Absenderdaten dienen. Im dazugehörigen
Unterabschnitt Buttons werden die Buttons der Dialogseite mit ihrer
Beschriftung und Funktion spezifiziert. Im Folgenden werden die
einzelnen Spezifikationselemente erläutert:

### MODIFY\_MARKER\_COLOR "&lt;Farbangabe&gt;"

Wenn der Benutzer einen Wert der Absenderdaten ändert, so wird diese
Änderung aus offensichtlichen Gründen nicht in die zugrundeliegende
Datenbank (z.B. LDAP) zurückgeschrieben. Stattdessen wird für den
geänderten Wert benutzerspezifischer Override angelegt. Der Wert ist ab
diesem Zeitpunkt von der Datenbank abgekoppelt. Damit solchermaßen
abgekoppelte Felder deutlich erkennbar sind, werden sie farblich
markiert. Die Farbe, die dafür verwendet wird, wird durch
MODIFY\_MARKER\_COLOR angegeben. Die <Farbangabe> ist eine wie in CSS
übliche hexadezimale Beschreibung der Farbe im Format "\#RRGGBB", wobei
RR, GG und BB die Rot, Grün und Blau-Komponenten angeben (hexadezimal,
00-FF).

### TITLE "&lt;Titel&gt;"

Der Titel ist der im Rahmen des Fensters angezeigte Titel, wenn die
entsprechende Dialogseite angezeigt wird. Im Titel eingebettet können
Direktiven der Form "%{Spalte}" sein, die durch den Wert der
entsprechenden Spalte des bearbeiteten Datensatzes ersetzt werden.
Typischerweise wird hier in den Titel "%{Name} %{Vorname} (%{Rolle})"
eingebaut.

### CLOSEACTION "&lt;Aktion&gt;"

Gibt an, welche Aktion ausgeführt werden soll, wenn der Benutzer das
Fenster über die Mechanismen des Betriebssystems (z.B. den
Schließen-Knopf in der Titelleiste des Fensters) schließt. Erlaubte
Aktionen sind [weiter unten](Konfigurationsdatei_wollmux.conf#ACTION_.22Aktion.22)
beschrieben.

### (&lt;Beschreibung Eingabefeld 1&gt;)

Die Beschreibung eines Eingabefeldes besteht aus Schlüssel-Wert-Paaren.
Die möglichen Paare werden in den folgenden Abschnitten beschrieben.
Dabei ist zu beachten, dass nicht alle für jede Art von Eingabefeld
Anwendung finden.

#### LABEL "Label"

Der Label-Text wird links neben dem Eingabeelement angezeigt.

#### TYPE "Feldtyp"

Der Feldtyp spezifiziert die Art des GUI-Elements. Die folgenden
Feldtypen werden unterstützt:

-   textfield: Ein einzeiliges Feld zur Eingabe einer Zeichenkette
-   textarea: Ein mehrzeiliges Feld zur Einhabe eines Textes
-   combobox: Ein kombiniertes Text/Drop-Down-Feld, das mehrere
    vordefinierte Werte zur Auswahl anbietet
-   label: kein Eingabefeld. Wird verwendet, um nur den
    LABEL-Text anzuzeigen.
-   separator: eine horizontale Linie zur Gruppierung ohne weitere
    Funktion

#### DB\_SPALTE "Spalte"

Dies gibt die Spalte an, deren Daten in den Eingabefeldern angezeigt und
damit bearbeitet werden. Die Spaltennamen beziehen sich dabei auf die
mittels
[SENDER\_SOURCE](#sendersource)
festgelegte
[Datenquelle](#datenquellen).
Der bearbeitete Datensatz ist der im Dialog [Persönliche Absenderliste Verwalten](#persönliche-absenderliste-verwalten)
ausgewählte.

#### VALUES (&lt;Liste&gt;)

Diese Liste von Strings spezifiziert die Werte, die ein Eingabefeld des
Typs "combobox" dem Benutzer zur Auswahl anbietet.

#### LINES "Anzahl"

Legt die Anzahl der angezeigten Zeilen für ein Element des Typs
"textarea" fest. Die Eingabe wird dadurch nicht begrenzt. Es können
beliebig viele Zeilen eingegeben werden.

#### WRAP "false"

Die Angabe WRAP "false" unterbindet bei Elementen des Typs "textarea"
den Umbruch der Zeilen in der Anzeige. Standardeinstellung ist WRAP
"true", d.h. lange Zeilen werden am Rand des Feldes umgebrochen. Man
beachte, dass dies nur die Anzeige im Dialogfenster betrifft. Es werden
keine harten Zeilenumbrüche eingefügt.

#### READONLY "true"

Wird dies angegeben, so kann der Benutzer den Wert des Eingabefeldes
nicht ändern.

#### EDIT "true"

Wird dies bei einem Feld vom Type "combobox" angegeben, so kann der
Benutzer nicht nur aus der Liste auswählen, sondern auch freien Text
eingeben.

### (&lt;Beschreibung von Button 1&gt;)

Die Beschreibung eines Buttons besteht aus einer Liste von
Schlüssel-Wert-Paaren. Die möglichen Paare werden in den folgenden
Abschnitten beschrieben. Dabei ist zu beachten, dass nicht alle für
jedes Element der Button-Leiste Anwendung finden.

#### LABEL "Label"

Die Beschriftung des Buttons.

#### TYPE "Typ"

Der Typ des Eingabeelements. Folgende Typen werden unterstützt:

-   button: ein normaler Button
-   glue: ein unsichtbares Element, das dazu dient, Abstände zwischen 2
    Buttons einzufügen

#### MINSIZE "Pixelzahl"

Diese Angabe wird nur bei Elementen vom Typ "glue" ausgewertet und gibt
die minimale Breite des einzufügenden Leerraumes in Pixeln an. Wird
diese Angabe weggelassen wird 0 angenommen.

#### MAXSIZE "Pixelzahl"

Diese Angabe wird nur bei Elementen vom Typ "glue" ausgewertet und gibt
die maximale Breite des einzufügenden Leerraumes in Pixeln an. Wird
diese Angabe weggelassen wird unendlich angenommen.

#### PREFSIZE "Pixelzahl"

Diese Angabe wird nur bei Elementen vom Typ "glue" ausgewertet und gibt
die bevorzugte Breite des einzufügenden Leerraumes in Pixeln an. Wird
diese Angabe weggelassen wird 0 angenommen.

#### HOTKEY "Buchstabe"

Wird dies angegeben, so kann die mit dem Button verknüpfte Aktion über
die Tastatur mit der Kombination Alt-Buchstabe aufgerufen werden. Für
Buchstaben sind keine Umlaute oder Sonderzeichen erlaubt. ACHTUNG: Mit
Windows 2000 wurde in "Eigenschaften von Anzeige" (Rechts-Click auf
Desktop &rarr; Eigenschaften) auf dem Reiter "Effekte" die Option
hinzugefügt "Tastaturnavigationsanzeiger ausblenden (mit ALT-Taste
einblenden)". Wenn diese Option aktiviert ist, dann werden die
Hotkey-Buchstaben im Button-Text nur unterstrichen, wenn die Alt-Taste
gedrückt wird. Dieses Verhalten weicht vom gewohnten Standardverhalten
der meisten Applikationen ab, da diese die entsprechende
Windows-Funktion nicht unterstützen.

#### ACTION "Aktion"

Die Aktion spezifiziert, was passieren soll, wenn der Benutzer den
entsprechenden Button aktiviert. Die folgenden Aktionen werden
unterstützt:

-   *abort*: Der Dialog wird abgebrochen. Änderungen werden
    *nicht* gespeichert.
-   *back*: Kehrt zum vorherigen Dialog zurück. Änderungen werden
    *nicht* gespeichert.
-   *restoreStandard*: Nach Bestätigung einer Sicherheitsabfrage werden
    alle vom Benutzer geänderten Felder auf der angezeigten Dialogseite
    (und nur auf dieser) wieder an die Werte aus der entsprechenden
    Datenbank (z.B. LDAP) gekoppelt.
-   *switchWindow*: bringt die durch WINDOW angegebene Dialogseite in
    den Vordergrund
-   *save*: die durch den Benutzer geänderten Werte werden als lokale
    Overrides gespeichert und überdecken von da an die Werte
    der Ursprungsdatenbank. Durch restoreStandard kann dies wieder
    aufgehoben werden.
-   *saveAndExit*: wie "save", jedoch wird der Dialog danach
    automatisch geschlossen.
-   *saveAndBack*: wie "save", jedoch wird danach zum vorherigen
    Dialog zurückgekehrt.

Wird die ACTION gar nicht angegeben oder wird ein leerer String als
Aktion spezifiziert, so wird der Button ausgegraut und hat keine
Funktion.

#### WINDOW "Fenster"

Gibt für die "switchWindow" Aktion das zu aktivierende Dialogfenster an.
Der Name entspricht dem Schlüssel des Unterabschnitts von Fenster(...),
also "Person", "Orga" oder "Fusszeile".

Persönliche Absenderliste Verwalten
-----------------------------------

Dieser Dialog erlaubt dem Benutzer, Einträge zu seiner persönlichen
Absenderliste hinzuzufügen oder von ihr zu entfernen. Der Dialog bietet
Suchfelder, über die der Benutzer bequem auf die Absenderdaten aus
vorhandenen Verzeichnissen (insbes. LDAP) zugreifen kann, um diese in
seine Absenderliste zu übernehmen. Die Beschreibung dieses Dialogs
befindet sich innerhalb der Konfigurationsdatei in einem Abschnitt
*Dialoge/PersoenlicheAbsenderliste*, der im Auslieferungszustand
folgenden Inhalt hat:

```
Dialoge(
  PersoenlicheAbsenderliste(
    Suchfelder(
      (LABEL "Nachname" DB_SPALTE "Nachname" SORT "1")
      (LABEL "Vorname" DB_SPALTE "Vorname" SORT "2")
      (LABEL "Email" DB_SPALTE "Mail" SORT "3")
      (LABEL "Orga" DB_SPALTE "OrgaKurz" SORT "4")
    )
  )
)
```

### (&lt;Beschreibung GUI-Element&gt;)

#### Suchfelder
Dies ist eine Liste der Suchfelder, die im Dialog angezeigt werden. Jeder Eintrag beschreibt ein Texteingabefeld mit Beschriftung. Andere Feldtypen werden nicht unterstützt.

- LABEL ist der Name des Suchfelds, der vor dem Texteingabefeld angezeigt wird.
- DB_SPALTE ist die Spalte in der Datenquelle, die durchsucht werden soll.
- SORT gibt eine Sortierreihenfolge an, in der die Eingabefelder im Dialog angezeigt werden.

Suchfelder werden paarweise untereinander angezeigt.

Absender Auswählen
------------------

Dieser Dialog dient dem Benutzer dazu, den Absender für seine Briefköpfe
auszuwählen. Er stellt die persönliche Absenderliste dar und erlaubt es,
darin einen Eintrag zu selektieren. Die Beschreibung dieses Dialogs
befindet sich innerhalb der Konfigurationsdatei in einem Abschnitt
*Dialoge/AbsenderAuswaehlen*, der im Auslieferungszustand folgenden
Inhalt hat:

```
 Dialoge(
  AbsenderAuswaehlen(
    Fenster(
      Auswaehlen(
        TITLE "Absender Auswählen"

        Absenderliste(
          (LABEL "Welchen Absender möchten Sie für Ihre Briefköpfe verwenden ?" TYPE "label" )
          (TYPE "listbox" ID "pal" LINES "10" ACTION "abort" DISPLAY "%{Nachname}, %{Vorname} (%{Rolle})")
        )
        
        Buttons(
          (LABEL "Bearbeiten..."  TYPE "button" HOTKEY "B"  ACTION "editList")
          (TYPE "glue")
          (LABEL "Schließen"  TYPE "button" HOTKEY "C"  ACTION "abort")
        )
      )
    )
  ) 
)
```

Im Normalfall sollten an diesem Dialog keine Änderungen seitens der
Referate erforderlich sein. In Ausnahmefällen kann es jedoch notwendig
sein, bestimmte Funktionen zu deaktivieren. Da die Struktur sowie die
Spezifikationselemente dieses Dialogs vollkommen analog zu denen des
[Absenderdaten Bearbeiten](Konfigurationsdatei_wollmux.conf#Absenderdaten_Bearbeiten)
Dialogs sind, werden im Folgenden nur einige Elemente herausgegriffen,
die dort nicht erwähnt oder die von besonderem Interesse sind.

Hinweis: Die ähnliche Struktur der Konfigurationsabschnitte für den [Absenderdaten Bearbeiten](Konfigurationsdatei_wollmux.conf#Absenderdaten_Bearbeiten) Dialog und den [Absender Auswählen](Konfigurationsdatei_wollmux.conf#Absender_Ausw.C3.A4hlen) Dialog dient dazu, den Lernaufwand für die Administratoren zu reduzieren. Die real verfügbaren Möglichkeiten der Anpassung beschränken sich jedoch auf die für den jeweiligen Dialog vorgesehenen Funktionalitäten. Zum Beispiel ist es *nicht* möglich, dem Absender Auswählen Dialog neue Fenster hinzuzufügen, indem weitere Unterabschnitte im Abschnitt *Fenster* und Buttons mit *ACTION "switchWindow"* erstellt werden.

### (&lt;Beschreibung GUI-Element&gt;)

#### ID "Identifikator"

Für diesen Dialog ist nur der Identifikator *pal* von Interesse. Er muss
für das Listbox-Element angegeben werden, das die Persönliche
Absenderliste darstellt.

#### ACTION "Aktion"

Der Dialog unterstützt die folgenden Aktionen:

-   *abort*: Der Dialog wird geschlossen. Wurde die Auswahl geändert, so
    bleibt die neue Auswahl gültig.
-   *editList*: Ruft den Dialog zum Bearbeiten der Persönlichen
    Absenderliste auf.

Wird bei einem Button die Aktion gar nicht angegeben oder wird ein
leerer String als Aktion spezifiziert, so wird der Button ausgegraut und
hat keine Funktion.

#### DISPLAY "Anzeigeschema"

Kann beim Listbox-Element mit ID "pal" angegeben werden. Über das
DISPLAY-Attribut kann gesteuert werden, wie die Einträge der
Absenderliste dargestellt werden. Neben statischen Textteilen kann das
Anzeigemuster Platzhalter der Form `%{Spaltenname}` enthalten, die für
den jeweiligen Datensatz durch den entsprechenden Datenbankspaltenwert
ersetzt werden.

*Beispiel:* Es wird eine [LDAP-Datenquelle](#TYPE_.22ldap.22)
verwendet, in deren
[Spalten-Beschreibung](#Spalten-Beschreibung) mit dem
DB\_SPALTE-Attribut die Spaltennamen "Nachname", "Vorname" und "Rolle"
definiert sind. Dann führt die Angabe von `DISPLAY` `"%{Nachname},`
`%{Vorname}` `(%{Rolle})"` z.B. zu einer Anzeige der Form "`Meier,`
`Hans` `(Abteilungsleiter)`".

Sachleitende Verfügungen Druckdialog
------------------------------------

Über diesen Dialog wird die Komfortdruckfunktion zu den Sachleitenden
Verfügungen angesteuert. Die Beschreibung dieses Dialogs befindet sich
innerhalb der Konfigurationsdatei in einem Abschnitt
*Dialoge/SachleitendeVerfuegungenDruckdialog*, der im
Auslieferungszustand folgenden Inhalt hat:

```
Dialoge(
 SachleitendeVerfuegungenDruckdialog(
   Fenster(
     Drucken(
       TITLE "Wollmux Komfortdruck"
       CLOSEACTION "abort"

       Headers(
         (LABEL "Ausfertigung" TYPE "label")
         (LABEL "Kopien" TYPE "label")
         (TYPE "glue")
       )

       Verfuegungspunkt( # werden pro Verfügungspunkt in einer Zeile angezeigt
         (TYPE "combobox" ID "element")
         (TYPE "spinner" ID "elementCount")
         (TYPE "glue")
         (TYPE "button" LABEL "Drucken" ACTION "printElement")
       )

       AllElements( # wird als weitere Zeile nach einem Trennstrich angezeigt
         (LABEL "Summe aller Ausfertigungen" TYPE "label")
         (TYPE "textfield" ID "allElementCount")
         (TYPE "glue")
       )

       Buttons(
         (LABEL "Abbrechen"  TYPE "button" HOTKEY "A" ACTION "back")
         (TYPE "glue")
         (LABEL "Alle Ausfertigungen drucken"  TYPE "button" HOTKEY "D" ACTION "printAll")
       )
     )
   )
 )
)
```

Im Normalfall sollten an diesem Dialog keine Änderungen seitens der
Referate erforderlich sein. In Ausnahmefällen kann es jedoch notwendig
sein, bestimmte Funktionen zu deaktivieren. Da die Struktur sowie die
Spezifikationselemente dieses Dialogs vollkommen analog zu denen des
[Absenderdaten Bearbeiten](#absenderdaten-bearbeiten)
Dialogs sind, werden im Folgenden nur einige Elemente herausgegriffen,
die dort nicht erwähnt oder die von besonderem Interesse sind.

> ***INFO*** Die ähnliche Struktur der Konfigurationsabschnitte für diesen Dialog und den [Absenderdaten Bearbeiten](#absenderdaten-bearbeiten) Dialog dient dazu, den Lernaufwand für die Administratoren zu reduzieren. Die real verfügbaren Möglichkeiten der Anpassung beschränken sich jedoch auf die für den jeweiligen Dialog vorgesehenen Funktionalitäten.

### Beschreibung der Unterabschnitte von Fenster/Drucken

Der Dialog besitzt genau ein Fensterbereich in dem alle Elemente des
Dialogs wie in einer Tabelle in Spaltenform angezeigt werden. Dazu
werden vier getrennte Bereiche/Unterabschnitte definiert:

-   *Headers*: Der Abschnitt "Headers" enthält die Spaltenüberschriften
    für diesen Dialog.
-   *Verfuegungspunkt*: Für jeden Verfügungspunkt wird beim Aufbauen des
    Dialogs ein eigener Eintrag erzeugt, der die in diesem Abschnitt
    enthaltenen Elemente als Vorlage nimmt.
-   *AllElements*: Enthält die Zusammenfassung mit dem Zähler
    aller Ausfertigungen.
-   *Buttons*: Enthält die Schaltflächen, die in diesem Dialog
    verfügbar sind.

### (&lt;Beschreibung GUI-Element&gt;)

#### ID "Identifikator"

Dieser Dialog unterstützt die folgenden Identifikatoren:

-   *element*: Dieser Identifikator wird in Zusammenhang mit dem
    Combobox-Element angegeben, in dem die Überschrift des
    Verfügungspunktes und ggf. die Zuleitungszeilen aufgeführt sind.
-   *elementCount*: Dieser Identifikator wird in Zusammenhang mit dem
    Spinner-Element angegeben, über das die Anzahl der Kopien eines
    Verfügungspunktes festgelegt werden kann.
-   *allElementCount*: Dieser Identifikator wird in Zusammenhang mit dem
    Textfeld angegeben, in dem die Gesamtkopienzahl aller Ausfertigungen
    angezeigt wird.

#### ACTION "Aktion"

Der Dialog unterstützt die folgenden Aktionen:

-   *printElement*: Erstellt alle Kopien des *einen*,
    zugehörigen Verfügungspunktes.
-   *printAll*: Druckt alle Ausfertigungen aller Verfügungspunkte aus.

Warndialog bei mehrfacher Installation des WollMux
--------------------------------------------------

Eine häufige Quelle für Ärger und zeitaufendige Fehlersuchen sind sog.
Mehrfachinstallationen des WollMux. Sie entstehen üblicherweise dann,
wenn ein WollMux-Paket installiert wird, während noch ein offener
soffice-Prozess läuft. Dadurch kann die alte Version des WollMux-Pakets
u.U. nicht fehlerfrei deinstalliert werden und es bleibt eine alte,
nicht funktionierende WollMux-Installation übrig. Eine
Mehrfachinstallation kann auch dann auftreten, wenn eine systemweite
Installation und eine benutzerspezifische Installation des WollMux
gleichzeitig vorliegen. Als Folge kann es sein, dass der WollMux nicht
fehlerfrei arbeitet und unverhersehbare Fehler produziert.

Um die Ursache derartiger Fehler frühzeitig erkennen zu können, wurde
folgender Warndialog eingeführt. Beim Starten von OpenOffice.org oder
beim Öffnen der WollMux-Leiste erfolgt eine Prüfung, ob der WollMux
mehrfach installiert ist. Dabei werden sowohl die systemweiten als auch
die benutzerspezifischen Installationsziele von OpenOffice.org
untersucht. Wird mehr als eine WollMux-Installation erkannt oder ändert
sich das Datum der jüngsten Installation, so wird der Warndialog und
eine entsprechende Fehlermeldung in der Datei wollmux.log ausgegeben.

Der angezeigte Text des Warndialogs kann wie im folgenden Beispiel über
den Konfigurationsabschnitt Dialoge/MehrfachinstallationWarndialog frei
konfiguriert werden:

```
Dialoge(
  MehrfachinstallationWarndialog(
    TITLE "Mehrfachinstallation des WollMux"
    MSG( 
         "Der WollMux ist mehrfach auf Ihrem System installiert.%n"
         "Dieser Zustand kann zu unerklärbaren Effekten führen%n"
         "und sollte daher dringend bereinigt werden.%n"
         "%n"
         "Die jüngste Installation liegt unter:%n"
         "- ${RECENT_INST_PATH}%n"
         "%n"
         "Außerdem wurden folgende Installationen gefunden:%n"
         "${OTHER_INSTS_LIST}"
       )
    )
)
```

Der gesamte Abschnitt MehrfachinstallationWarndialog ist optional. Fehlt
er, so wird im Fehlerfall ein Warndialog mit den voreingestellten
Inhalten des WollMux angezeigt. Ist der Abschnitt definiert, so können
folgende Werte gesetzt werden:

Das Attribut 'TITLE': Das Attribut enthält die Kopfzeile des Warndialogs. Die Angabe von TITLE ist optional. Wenn TITLE nicht angebeben ist, wird die entsprechende Voreinstellungen des WollMux verwendet.

Das Attribut 'MSG': Das Attribut enthält den eigentlichen Textinhalt des Warndialogs. Innerhalb des Abschnitts MehrfachinstallationWarndialog ist die Angabe von MSG immer notwendig. Fehlt MSG, so wird die Anzeige des Dialogs dadurch deaktiviert.
Innerhalb von MSG können folgende Variablen verwendet werden, die
mit den zur Laufzeit bestimmten Werten des WollMux gefüllt werden:
-   **${RECENT\_INST\_PATH}**: Enthält den Pfad der jüngsten
    WollMux-Installation, die auf dem System gefunden wurde.
-   **${RECENT\_INST\_LAST\_MODIFIED}**: Enthält das Datum der
    letzten Änderung der jüngsten WollMux-Installation, die auf dem
    System gefunden wurde.
-   **${OTHER\_INSTS\_LIST}**: Enthält eine Liste mit den Pfaden
    aller anderen konkurrierenden WollMux-Installation, die auf dem
    System gefunden wurden.

### Warndialog deaktivieren

Zum Deaktivieren des Warndialogs genügt es, einen leeren
Dialoge/MehrfachinstallationWarndialog-Abschnitt in der wollmux.conf zu
definieren:

```
Dialoge(
  MehrfachinstallationWarndialog(
  )
)
```

Der Warndialog wird damit nicht mehr angezeigt. Die entsprechende
Fehlermeldung in der Datei wollmux.log erscheint aber trotzdem.

Seriendruckdialog
-----------------

Über den Abschnitt Dialoge/Seriendruckdialog kann der Seriendruckdialog
spezifiziert und konfiguriert werden, der beim Klicken auf den Button
"Drucken" in der Seriendruckleiste des WollMux erscheint. Die
Seriendruckdialogkonfiguration teilt sich auf in zwei Unterabschnitte
"Fenster" und "Regeln". Im Unterabschnitt "Fenster" sind die Elemente
spezifiziert, die abhängig von Sichtbarkeitsregeln im Dialog angezeigt
oder ausgeblendet werden. Im Unterabschnitt "Regeln" sind die Regeln
aufgeführt die die Sichtbarkeiten steuern und festlegen, welche
Druckfunktionen in einem bestimmten Druckszenario verwendet werden.

```
Dialoge(
  Seriendruckdialog(
    TITLE "Seriendruck"

    Fenster(
      
      Aktionen(TITLE "Aktionen"
     (LABEL "Gesamtdokument erstellen" TYPE "radio" ACTION "setActionType" VALUE "gesamtdok")
     (LABEL "Direkt Drucken" TYPE "radio" ACTION "setActionType" VALUE "drucken")
     (LABEL "E-Mails verschicken" TYPE "radio" ACTION "setActionType" VALUE "emails")
     (LABEL "Einzeldateien erzeugen" TYPE "radio" ACTION "setActionType" VALUE "einzel")
      ) 

      Druckbereich(TITLE "Folgende Datensätze verwenden"
     (LABEL "Alle" TYPE "radio" ACTION "selectAll")
     (LABEL_FROM "Von" LABEL_TO "Bis" TYPE "fromtoradio" ACTION "selectRange")
      )

      Output(TITLE "Ausgabeformat"
     (LABEL "ODT-Datei" TYPE "radio" GROUP "odt" ACTION "setOutput" VALUE "odt")
     (LABEL "ODT-Datei / WollMux-Formular" TYPE "radio" GROUP "odtwm" ACTION "setOutput" VALUE "odt")
     (LABEL "PDF-Datei" TYPE "radio" GROUP "pdf" ACTION "setOutput" VALUE "pdf")
      )

      EMailOptionen1(
          (LABEL "Absenderadresse" TYPE "emailfrom" GROUP "emails")
          (LABEL "Feld für Empfängeradresse" TYPE "emailtofieldname" GROUP "emails")
          (LABEL "Betreff" TYPE "emailsubject" GROUP "emails")
      )

      EMailOptionen2(TITLE "E-Mail Nachricht"
        (TYPE "emailtext" GROUP "emails")
      )

      Zielverzeichnis(TITLE "Zielverzeichnis"
          (LABEL "Suchen..." TYPE "targetdirpicker" GROUP "einzel")
      )

      Dateinamensmuster(TITLE "Dateinamensmuster"
          (TYPE "filenametemplatechooser" GROUP "einzel")
      )

      DateinamensmusterMail(TITLE "Dateinamensmuster für den Anhang"
          (TYPE "filenametemplatechooser" GROUP "emails")
      )

      Druckereinstellungen(
        (LABEL "Drucker:" TYPE "printersettings" GROUP "drucken")
      )

      Description(
          (TYPE "glue")
          (TYPE "description")
      )

      Buttons(ORIENTATION "horizontal"
          (LABEL "Abbrechen" TYPE "button" ACTION "abort")
          (TYPE "glue")
          (LABEL "Los geht's!" TYPE "button" ACTION "submit")
      )
      
    ) # Fenster

    Regeln(
      (ON_ACTION_TYPE "gesamtdok" SHOW_GROUPS("odt" "pdf" "gesamtdok"))

      (ON_ACTION_TYPE "gesamtdok" ON_OUTPUT "odt"
        USE_PRINTFUNCTIONS ("OOoMailMergeToOdtFile")
        SET_DESCRIPTION("Erzeugt das Gesamtdokument als eine ODT-Datei ...")
      )

      (ON_ACTION_TYPE "gesamtdok" ON_OUTPUT "pdf"
        USE_PRINTFUNCTIONS ("MailMergeNewSetFormValue" "PDFGesamtdokument" "PDFGesamtdokumentOutput")
        SET_DESCRIPTION("Erzeugt das Gesamtdokument als eine PDF-Datei ...")
      )

      (ON_ACTION_TYPE "drucken" SHOW_GROUPS("drucken")
        USE_PRINTFUNCTIONS ("OOoMailMergeToPrinter")
        SET_DESCRIPTION("Druckt den Serienbrief direkt auf einem Drucker aus ...")
      )

      (ON_ACTION_TYPE "emails" SHOW_GROUPS("emails")
        USE_PRINTFUNCTIONS ("MailMergeNewSetFormValue" "MailMergeNewToEMail") IGNORE_DOC_PRINTFUNCTIONS "true"
        SET_DESCRIPTION ("Verschickt E-Mails mit einzelnen ODT-Dateien als Anhang ...")
      )

      (ON_ACTION_TYPE "einzel" SHOW_GROUPS("einzel")
        USE_PRINTFUNCTIONS ("MailMergeNewSetFormValue" "MailMergeNewToSingleODT") IGNORE_DOC_PRINTFUNCTIONS "true"
        SET_DESCRIPTION("Erzeugt einzelne ODT-Dateien mit konfigurierbaren Namen in einem ...")
      )
    ) # Regeln
  ) # Seriendruckdialog
) # Dialoge
```

Im Normalfall sollten an diesem Dialog keine Änderungen seitens der
Referate erforderlich sein. In Ausnahmefällen kann es jedoch notwendig
sein, bestimmte Voreinstellungen von häufig benötigten Druckszenarion zu
ändern.

Hinweis: Die ähnliche Struktur des Konfigurationsabschnitts für diesen Dialog und anderen Dialog-Abschnitten dient dazu, den Lernaufwand für die Administratoren zu reduzieren. Die real verfügbaren Möglichkeiten der Anpassung beschränken sich jedoch auf die für den jeweiligen Dialog vorgesehenen Funktionalitäten.

### Der Unterabschnitt Fenster

Der Dialog besitzt genau ein Fensterbereich in dem alle Elemente des
Dialogs in sog. *Sections* aufgeführt werden (wie z.B. die Section mit
dem Schlüsselnamen EMailOptionen2). Der Schlüsselname einer Section kann
frei vergeben werden und hat auf die Darstellung durch den WollMux keine
Auswirkung - er dient nur der besseren Lesbarkeit. Jede Section
verwaltet die in ihr enthaltenen Radio-Button-Elemente und ist nur dann
sichtbar, wenn mindestens ein Element innerhalb der Section sichtbar
ist. Folgende Attribute können direkt auf Sections angewandt werden:

-   *TITLE*: Ist ein Titel gesetzt, so wird die Section mit einem Rahmen
    versehen und dem Text TITLE als Überschrift. Fehlt TITLE, so
    entfällt auch der Rahmen und die Überschrift.
-   *ORIENTATION*: Kann "horizontal" oder "vertical" sein und ordnet die
    Elemente horizontal oder vertikal an (Default ist vertical)

Innerhalb einer Section können folgende Elemente enthalten sein, die
über das obligatorische TYPE-Attribut unterschieden werden:

-   **TYPE "radio":** erzeugt ein Radio-Button mit der Beschriftung von
    LABEL, der bei Aktivierung die in ACTION beschriebene Aktion
    ausführt
-   **TYPE "label":** erzeugt ein Label mit der Beschriftung von LABEL
-   **TYPE "description":** erzeugt das Beschreibungsfeld, das die
    entsprechenden Infos über die ausgewählten Druckoptionen anzeigt
-   **TYPE "fromToRadio":** erzeugt das Radio-Element zur Auswahl des
    Druckbereichs mit den Beschriftungen LABEL\_FROM und LABEL\_TO.
    Wertet bei Aktivierung die Angabe von ACTION aus
-   **TYPE "targetDirPicker":** erzeugt ein Element zur Auswahl eines
    Zielverzeichnisses für den Einzeldokumentdruck
-   **TYPE "filenameTemplateChooser":** erzeugt ein Eingabefeld zur
    Angabe des Musters für den Ausgabedateinamen mit DB-Feldreferenzen
-   **TYPE "emailFrom":** erzeugt ein Textfeld zur Eingabe der
    E-Mail-Absenderadresse mit der Beschriftung LABEL
-   **TYPE "emailToFieldname":** erzeugt eine Combobox mit der
    Beschriftung LABEL zur Auswahl des Datenbankfeldes, das den
    Empfänger beschreibt.
-   **TYPE "emailText":** erzeugt ein Eingabefeld für E-Mail-Text mit
    Felder-Referenzen
-   **TYPE "emailSubject":** erzeugt ein Textfeld zur Auswahl des E-Mail
    Betreffs
-   **TYPE "printerSettings":** erzeugt einen Button zur Auswahl /
    Eigenschaftenbearbeitung von Druckern
-   **TYPE "glue":** erzeugt einen vertikalen oder horizontalen Abstand
    (abhängig von der ORIENTATION-Einstellung der Section)
-   **TYPE "button":** erzeugt einen Button mit der Beschriftung LABEL,
    der die in ACTION angegebene Aktion ausführt bei Betätigung

Desweitere wertet jedes Element die Angabe von GROUP aus in der eine
Sichtbarkeitsgruppe angegeben werden kann. Ist diese Sichtbarkeitsgruppe
sichtbar, so wird das Element angezeigt, ansonsten nicht. Enthält ein
Element keine GROUP-Angabe so wird es immer angezeigt.

Als Actions für ACTION-Attribute können folgende Werte angegeben werden:

-   *setActionType*: Veranlasst eine Neuauswertung der ON\_ACTION-Regeln
    mit der in VALUE angegebenen Aktion
-   *setOutput*: Veranlasst eine Neuauswertung der ON\_OUTPUT-Regeln mit
    der in VALUE angegebenen Output-Option
-   *selectAll*: setzt den Status "Alle Datensätze sollen ausgedruckt
    werden"
-   *selectRange*: setzt den Status zum Druck von über einen Bereich
    angegebenen Datensätzen
-   *abort*: Schließt den Seriendruckdialog (bzw. macht ihn unsichtbar)
-   *submit*: Startet den Seriendruck

### Der Unterabschnitt Regeln

Über die Regeln kann gesteuert werden, welche Elemente des
Fensterabschnitts sichtbar sind und welche Druckfunktionen im Falle
einer submit-Aktion ausgeführt werden sollen.

Folgende Schlüsselwörter können innerhalb von Regeln verwendet und
kombiniert werden:

-   *ON\_ACTION "&lt;aktion&gt;"*: Regel trifft zu, wenn zuletzt eine ACTION
    setActionType mit VALUE gleich &lt;aktion&gt; ausgeführt wurde
-   *ON\_OUTPUT "&lt;output&gt;"*: Regel trifft zu, wenn zuletzt eine ACTION setOutput mit VALUE gleich &lt;output&gt; ausgeführt wurde
-   *SHOW\_GROUPS (&lt;liste&gt;)*: Setzt alle Sichtbarkeitsgruppen auf
    unsichtbar ausßer die in <liste> angegebenen, die sichtbar werden
-   *USE\_PRINTFUNCTIONS(&lt;liste&gt;)*: Im Fall einer submit-Aktion werden
    die in &lt;liste&gt; angegebenen Druckfunktionen verwendet. Alle hier
    angegebenen Druckfunktionen müssen in einem
    [Druckfunktionen](#druckfunktionen)-Abschnitt definiert
    sein (ansonsten bleiben die zugehörigen Radio-Buttons ausgegraut)
-   *IGNORE\_DOC\_PRINTFUNCTIONS "true|false"*: Gibt an, ob Bereits im
    Dokument gesetzte Druckfunktionen (wie z.B. SachleitendeVerfuegung)
    beim Seriendruck ignoriert werden oder ausgeführt werden sollen
-   *SET\_DESCRIPTION "&lt;text&gt;"*: Zeigt im Feld vom Type description den
    in <text> angegebenen Inhalt an

Textfragmente
=============

Der WollMux unterstützt sog. "Textfragmente". Ein Textfragment ist ein
Teil des Inhalts eines Gesamtdokuments. Textfragmente können in eigene
Dokumentdateien ausgelagert und über den WollMux zu einem Gesamtdokument
zusammengefügt werden. So können Sie Ihre Vorlagen beliebig
strukturieren und in flexibel zusammensetzbare Module unterteilen. Das
Konzept ist im Artikel [Textfragmente im WollMux](Textfragmente_im_WollMux.md) detailliert beschrieben.

Der Abschnitt Textfragmente
---------------------------

Die Liste der im WollMux verfügbaren Textfragmente kann in der
Konfigurationsdatei durch die Referate gepflegt werden. Dazu gibt es die
Abschnitte *Textfragmente* mit folgendem Aufbau:

```
Textfragmente(

   (<Fragmentbeschreibung1>)
   ...
   (<FragmentbeschreibungN>)

)
```

Der Abschnitt Textfragmente darf innerhalb der Konfigurationsdatei
mehrfach auftreten. In jedem Textfragmente-Abschnitt können Sie
Textfragmente definieren. Der WollMux erkennt die Textfragmente, die in
der Gesamtheit aller Textfragment-Abschnitte definiert wurden. Dabei
haben Textfragmente die in späteren Textfragment-Abschnitten definiert
sind Vorrang vor Textfragmenten, die in früheren Abschnitten definiert
sind. Die entsprechende Beschreibung sieht wie folgt aus:

### <FragmentbeschreibungN>

Eine Fragmentbeschreibung besteht aus Schlüssel-Wert-Paaren. Sie hat
folgenden Aufbau:

`(FRAG_ID "<regEx>" URL "<URL_der_Textfragment-Datei>")`

`(FRAG_ID "<regEx>" URL ("<url1>" "<url2>" "<urlN>"))`

Folgende Werte müssen dabei in jeder Fragmentbeschreibung angegeben
werden:

#### FRAG\_ID "&lt;regex&gt;"

Die FRAG\_ID enthält einen Kurzbezeichner, der das Textfragment für die
interne Verarbeitung durch den WollMux auszeichnet. Der Bezeichner muss
den [Syntax-Regeln für Schlüssel](Format_von_WollMux-Config-Dateien.md#schlüssel)
folgen und eindeutig sein. Das bedeutet, dass zwei verschiedene
Textfragmente nicht die selbe FRAG\_ID besitzen dürfen. Es ist jedoch
erlaubt, ein bereits definiertes Textfragment neu zu definieren. Wurde
ein Textfragment mehrfach definiert, so gewinnt stets die zuletzt in der
Konfigurationsdatei aufgeführte Definition. FRAG\_ID unterstützt auch
[Reguläre Ausdrücke](http://java.sun.com/j2se/1.4.2/docs/api/java/util/regex/Pattern.html).

#### URL "&lt;URL_der_Textfragment-Datei&gt;"

Die URL beschreibt die Datei des entsprechenden Textfragment-Dokuments.
Der Aufbau von URLs ist unter
[Format\_von\_WollMux-Config-Dateien](Format_von_WollMux-Config-Dateien.md#urls)
beschrieben. Relative URLs gelten relativ zu dem Pfad der in
[DEFAULT\_CONTEXT](#der-defaultcontext)
festgelegt wurde. Sie können aber auch einen absoluten Pfad angeben ohne
den DEFAULT\_CONTEXT zu verwenden. Werden mehrere URLs angegeben, wird
die erste URL verwendet, die sich fehlerfrei auflösen lässt.

Wenn innerhalb des regulären Ausdrucks in der FRAG\_ID eine sog.
[Capturing-Group](http://java.sun.com/j2se/1.4.2/docs/api/java/util/regex/Pattern.html#cg)
definiert wurde, dann kann diese Gruppe in der URL mit der Notation
"$n" referenziert werden, wobei n die Nummer der Gruppe ist. Die Gruppe
$0 ist dabei standardmäßig definiert und enthält immer den Inhalt der
vollständigen FRAG\_ID. So können abhängig von der FRAG\_ID verschiedene
URLs angesprochen werden.

**Beispiel**

```
Textfragmente(
   (FRAG_ID "Abt.*" URL "./vorlagen/fragmente/beispiele/$0.ott")
)
```

Dieser Ausdruck definiert alle Textfragmente, die mit "Abt" anfangen und
leitet sie auf die jeweils entsprechende Datei im Verzeichnis
./vorlagen/fragmente/beispiele/\*.ott um. Ein gültiges Textfragment ist
daher z.B. "AbtKopf", und die zugehörige Datei wird unter
./vorlagen/fragmente/beispiele/AbtKopf.ott gesucht.

### Variablen

Durch die Verwendung von Variablen lässt sich die Konfigurationsdatei
leichter pflegen. Sie können Variablen z.B. verwenden, um häufig
verwendete Pfade in den obigen URL-Werten nicht mehrfach pflegen zu
müssen.

#### Variablen-Definition mit VAR

Eine Variable wird wie folgt definiert:

`VAR(NAME "Variablenname" VALUE "Inhalt")`

Eine Variable kann an verschiedenen Stellen der Konfigurationsdatei
definiert werden. Dazu folgendes Beispiel:

```
VAR(NAME "Variable1" VALUE "Inhalt")             # im Hauptabschnitt am Anfang der Konfigurationsdatei.

Textfragmente(
   VAR(NAME "Variable2" VALUE "Inhalt")          # innerhalb eines Textfragmente-Abschnitts.
   ...
)

VAR(NAME "Variable3" VALUE "Inhalt")             # oder im Hauptabschnitt irgendwo anders in der Konfigurationsdatei.

Textfragmente(
   ...
   VAR(NAME "Variable4" VALUE "noch ein Inhalt") # oder irgendwo in einem weiteren Textfragmente-Abschnitt
   ...
)

VAR(NAME "Variable5" VALUE "noch ein Inhalt")    # oder im Hauptabschnitt am Ende der Konfigurationsdatei.
```

Kurzbeschreibung der Elemente:

NAME: Mit dem Schlüssel "NAME" wird der Name der Variable festgelegt. Die Syntax für den Namen folgt den üblichen Regeln für Bezeichner, d.h. erlaubte Zeichen sind Buchstaben, Ziffern und der Unterstrich, wobei das erste Zeichen keine Ziffer sein darf.\
VALUE: Mit dem Schlüssel "VALUE" wird der Variable ein Inhalt gegeben.

Variablen können an einer späteren Stelle in der Konfigurationsdatei
redefiniert werden. Prinzipiell hat immer die letzte Definition
Gültigkeit. Beispiel:

```
VAR(NAME "Foo" VALUE "Inhalt")       # Ursprüngliche Definition der Variable Foo

Irgendwelche_Abschnitte(
   ...
)

Irgendwelche_Abschnitte2(
   ...
)

VAR(NAME "Foo" VALUE "neuer Inhalt") # Eine spätere Redefinition überschreibt die alte Definition
```

Variablen können in zwei verschiedenen Verschachtelungsebenen definiert
werden: Im Hauptabschnitt der Konfigurationsdatei und in einem
Textfragmente-Abschnitt. Eine Definition in einer höheren Ebene
überschreibt eine Definition aus einer tieferen Ebene.

```
VAR(NAME "Foo" VALUE "Inhalt")          # Definition irgendwo im Hauptabschnitt der Konfigurationsdatei 
                                        # (Verschachtelungsebene 0)

Textfragmente(
   VAR(NAME "Foo" VALUE "neuer Inhalt") # Die Redefinition in einem Textfragmente-Abschnitt 
                                        # (Verschachtelungsebene 1)
   ...
)
```

Variablen selbst können auf andere Variablen verweisen (siehe [Variablen referenzieren](Konfigurationsdatei_wollmux.conf#Variablen_referenzieren)).
Dazu ein kleines Beispiel:

`VAR(NAME "Variable_A" VALUE "Mein Inhalt A")`

`VAR(NAME "Variable_B" VALUE "${Variable_A} und mein zusätzlicher Inhalt B")`

#### Variablen referenzieren

Variablen werden innerhalb eines Wertes wie folgt referenziert:

`${Variablenname}`

Jede Variablen-Referenz beginnt mit einem "$"-Zeichen und ist zwingend
in geschweifte Klammern einzuschließen.

Folgendes Beispiel veranschaulicht die Verwendung von Variablen in
URL-Werten:

```
VAR(NAME "Abteilungslaufwerk" VALUE "file:/L:/unsereVorlagen")

Textfragmente(
   (FRAG_ID "fragment_a" URL "${Abteilungslaufwerk}/Fragment_a.odt")
   (FRAG_ID "fragment_b" URL "${Abteilungslaufwerk}/Fragment_b.odt")
)
```

Da Variablen in verschiedenen Verschachtelungsebenen (Ebene 0 und Ebene
1) definiert werden können, wird jeweils die nächste aus der Ebene der
Referenz sichtbaren Variablen-Definition verwendet. Dazu ein Beispiel:

```
VAR(NAME "Variable A" VALUE "nieSichtbar")  # Erste Definition der "Variable A" (in Ebene 0)

Textfragmente(
  VAR(NAME "Variable A" VALUE "bar")        # redefiniert "Variable A" in einer höheren Ebene 1
  (FRAG_ID "frag1" URL "${Variable A}")     # URL --> "bar"
)

Textfragmente(
  (FRAG_ID "frag1" URL "${Variable A}")     # URL --> "foo" 
)

VAR(NAME "Variable A" VALUE "foo")          # Letzte gültige (Re)Definition von "Variable A" in Ebene 0
```

Die Variablenersetzung findet erst bei der Verwendung der Variable
statt, nicht bereits zum Zeitpunkt der Variablendefinition.

Textbausteine
=============

Das Textbausteinsystem ermöglicht es, in einem aktuell bearbeiteten
Dokument Textfragmente interaktiv nach zu laden. Jedes Textfragment kann
wiederum weitere Textfragmente automatisch hinzuladen. Ein Textbaustein
wird geladen, in dem im Dokument ein Textbausteinbezeichner und evtl.
Argumente angegeben werden. Durch eine konfigurierbare Tastenkombination
wird ein Ereignis ausgelöst, welches den zuvor eingegebenen
Textbausteinbezeichner (+Argumente) erkennt und das damit verknüpfte
Textfragment lädt.

Über den Abschnitt "Textbausteine" kann das Textbausteinsystem
konfiguriert werden. Es können mehrere Abschnitte dieser Form in der
Konfigurationsdatei wollmux.conf vorkommen, wobei die Festlegungen in
späteren Textbaustein-Abschnitten immer Vorrang haben vor Festlegungen,
die in früheren Textbaustein-Abschnitten getroffen wurden.

Hier ein Beispiel eines Textbausteine-Abschnittes:

```
  Textbausteine(
    SEPARATOR "#"
    Warnungen(
      MSG_TOO_MANY_ARGS "true"  #oder on oder 1
    )
    Kuerzel(
     (MATCH(<listeMitRegExStrings>) FRAG_ID '<replacementString>')
     (MATCH("NOST", "NSOT") FRAG_ID "TBS_nostalgie")
     (MATCH("UNT") FRAG_ID "Unterschrift")
     (MATCH("IB") FRAG_ID "internerBriefkopf" )
     (MATCH "(NOST)|(NSOT)" FRAG_ID "TBS_nostalgie2")
     (MATCH "\$(.+)" FRAG_ID "$1")                                    # Eingabe $Test1 --> FRAG_ID "Test1"
     (MATCH "SF(\d{4})" FRAG_ID "SF$1")                               # Eingabe SF2400 --> FRAG_ID "SF2400"
     (MATCH "(BS\d+)" FRAG_ID "TBS_$1")                               # Eingabe BS10 --> FRAG_ID "TBS_BS10"
     (MATCH (...) FRAG_ID "TBS_$1")                                  
   )
 )
```

SEPARATOR &lt;Separator&gt;
---------------------

Über das optionale Attribut SEPARATOR kann ein Separator spezifiziert
werden, der für die Abgrenzung der einzelnen Parameter beim Einfügen von
Textbausteinen verwendet wird. Die übergebenen Parameter werden
automatisch in freie Platzhalter des eingefügten Textbausteins
eingetragen. Ist kein SEPARATOR angegeben, so wird "\#" als
Standardeinstellung verwendet. Beispiel $BB0815\#eins\#zwei.

Soll ein Platzhalter beim Einfügen nicht ausgefüllt werden, so ist der
Bereich zwischen zwei Separatoren an dieser Stelle leer zu lassen (z.B.
"$BB0815\#eins\#\#drei"). Der zweite Platzhalter würde in diesem Fall
nicht ausgefüllt werden und unverändert bleiben.

Soll ein Platzhalter beim Einfügen entfernt werden (also ohne Inhalt),
so muss ein Leerzeichen zwischen den beiden Separatoren angegeben werden
(z.B. $BB0815\#eins\# \#drei). Der zweite Platzhalter würde in diesem
Fall gelöscht werden.

Warnungen
---------

In diesem optionalen Abschnitt kann definiert werden, welche Warnungen
des Textbausteinsystems dem Benutzer als Dialoge angezeigt werden
sollen.

### MSG\_TOO\_MANY\_ARGS <Argument>

Mit dem Attribut MSG\_TOO\_MANY\_ARGS kann die Fehlermeldung "Es sind
mehr Parameter als Einfügestellen vorhanden" über *true*, *on* oder *1*
eingeschalten werden. Die Fehlermeldung erscheint dann, wenn mehr
Parameter beim Aufruf eines Textbausteins übergeben wurde, als
Platzhalter im eingefügten Textbaustein vorhanden sind. Ist das Attribut
nicht angegeben oder enthält es nicht true, on oder 1, so wird der
Warndialog nicht angezeigt.

Kuerzel
-------

Im Abschnitt Kuerzel kann definiert werden, welche
Textbausteinbezeichner der WollMux erkennen soll. Hier findet eine
Zuordnung von MATCH auf FRAG\_ID statt, die beschreibt, welches
Textfragment eingefügt werden soll, wenn ausgehend vom Cursor rückwärts
gesucht wird ein MATCH greift. Wird z.B in OOo-Writer $BB0815
eingegeben und mit einem Button/Tastenkombination *Textbaustein
einfügen* gestartet, dann wird der eingegebene Textbausteinbezeichner
mit dem Textbausteinbezeichner im MATCH verglichen. Falls er
übereinstimmt wird die dazugehörige FRAG\_ID mit der FRAG\_ID aus dem
Abschnitt Textfragmente verknüpft. In Abschnitt Textfragmente wird die
FRAG\_ID dann in URLs aufgelöst und der erste Textbaustein der aufgelöst
werden kann eingefügt.

### MATCH(<listeMitRegExStrings> )

Syntax:

`MATCH "<regex>"`

`MATCH ("<regex1>" "<regex2>" ...)`

Mit MATCH wird der Textbausteinbezeichner festgelegt. Über [Reguläre Ausdrücke](http://java.sun.com/j2se/1.4.2/docs/api/java/util/regex/Pattern.html)
können mehrere Textbausteinbezeichner auf einmal behandelt werden.

### FRAG\_ID '&lt;replacementString&gt;'

Mit der FRAG\_ID wird die
[FRAG\_ID](#fragid-regex.3E.22)
aus dem [Abschnitt Textfragmente](Konfigurationsdatei_wollmux.conf#Der_Abschnitt_Textfragmente)
verknüpft in der wiederum die
[URLs](#url-urldertextfragment-datei)
aufgeführt werden.

Wenn innerhalb des regulären Ausdrucks von MATCH eine sog.
[Capturing-Group](http://java.sun.com/j2se/1.4.2/docs/api/java/util/regex/Pattern.html#cg)
definiert wurde, dann kann diese Gruppe in der FRAG\_ID mit der Notation
"\$n" referenziert werden, wobei n die Nummer der Gruppe ist. Die Gruppe
\$0 ist dabei standardmäßig definiert und enthält immer den Inhalt des
vollständigen MATCH-Ausdrucks. So können abhängig von MATCH verschiedene
FRAG\_IDs angesprochen werden.

Beispiel:

`Textbausteine(
`  Kuerzel(
`    (MATCH "Abt.*" FRAG_ID "$0")
`  )
`)`

Dieser Ausdruck sorgt dafür, dass alle Strings, die mit "Abt" anfangen
als Textbausteinbezeichner betrachtet werden. Um die entsprechenden
Textbausteine aufzulösen, wird nach Textfragmenten mit gleichnamigen
FRAG\_IDs gesucht. Ein gültiger Textbausteinbezeichner ist daher z.B.
"AbtKopf", für den nach dem gleichnamigen Textfragment "AbtKopf" gesucht
wird.

Achtung: Die dadurch entstehende FRAG\_ID muss den [Syntax-Regeln für Schlüssel und Bezeichner](Format_von_WollMux-Config-Dateien.md#schlüssel) folgen. FRAG\_IDs, die nicht diesen Kriterien entsprechen, werden nicht oder nicht zuverlässig aufgelöst.

Tastenkuerzel
=============

Der Abschnitt Tastenkuerzel ermöglicht es eine Tastenkombination für ein
[Dispatch Kommandos des WollMux](Schnittstellen_des_WollMux_fuer_Experten.md#die-dispatch-kommandos-des-wollmux)
(z.B. wollmux:TextbausteinEinfuegen) festzulegen. Beim Starten des
WollMux werden erst alle Tastenkombinationen die einem Dispatch Kommando des WollMux zugeordnet sind, gelöscht und dann nach den Angaben im Abschnitt
Tastenkuerzel neu gesetzt. Es können mehrere Abschnitte dieser Form in
der Konfigurationsdatei wollmux.conf vorkommen, wobei die Festlegungen
in späteren Tastenkuerzel-Abschnitten immer Vorrang haben vor
Festlegungen, die in früheren Tastenkuerzel-Abschnitten getroffen
wurden. Es können für ein Dispatch Kommando des  WollMux
mehrere Tastenkuerzel vergeben werden.

Beispiel eines Tastenkuerzel Abschnitts:

```
Tastenkuerzel(
   (SHORTCUT "<Tastenkombination>" URL "<WollMux_Dispatch_Kommando>")
   (SHORTCUT "strg+t" URL "wollmux:TextbausteinEinfuegen") 
)
```

SHORTCUT "&lt;Tastenkombination&gt;"
------------------------------

Eine <Tastenkombination> besteht aus den Namen der gleichzeitig zu
drückenden Tasten, verbunden mit +. Groß- und Kleinschreibung wird nicht
beachtet. Bisher vergebene Tastenkombinationen können im OOo-Writer
unter Extra &rarr; Anpassen &rarr; Reiter Tastatur nachgeschaut werden.
Tastenkombinationen die in der Liste nicht aufgeführt sind, können
trotzdem gesetzt werden, diese sind danach in der Liste nicht sichtbar
(z.B. alt+umschalt+strg+t oder alt+\*).

Folgende Tasten können verwendet werden:

*Jeweils eine Taste aus*

-   Ziffern von 0-9

*oder*

-   Buchstaben von a-z

*oder*

-   Funktionstasten von F1-F12

*oder*

-   Sonderzeichen: Unten , Oben, Links, Rechts, Pos1, Ende, Bildauf,
    Bildab, Eingabe, Esc, Tabulator, Rückschritt oder Rueckschritt,
    Leertaste, Einfg, Entf, Plus,Minus mit "-", Sternchen mit
    "\*",Schrägstrich mit "/", Punkt mit ".", Komma mit ",", kleiner als
    mit "&lt;", Größer als mit "&gt;" und gleich mit "="

*optional kombiniert mit einer oder mehreren der folgenden Tasten*

-   alt, umschalt oder shift und strg oder ctrl

Beispiel:

`SHORTCUT "a+alt+umschalt"`

> **INFO** Bei Verwendung von Sonderzeichen, die nur durch Drücken von
Umschalt/Shift erreichbar sind (z.B. "/") muß die Taste "umschalt" bzw.
"shift" auch in der Tastenkombination angegeben werden.

URL "&lt;Dispatch_Kommando&gt;"
-------------------------

Die URL beschreibt ein [Dispatch Kommando des WollMux](Schnittstellen_des_WollMux_fuer_Experten.md#die-dispatch-kommandos-des-wollmux)
z.B. wollmux:TextbausteinEinfuegen

Datenquellen
============

Der WollMux kann Informationen aus verschiedenen Datenquellen
zusammenführen und nutzen. Es ist zum Beispiel möglich, Name, Vorname,
Orga-Einheit, Telefonnummer und Büroanschrift aus einem LDAP-Verzeichnis
lesen, die zur Büroanschrift passende ÖPNV-Verbindung aus einer
Textdatei auf einem Netzlaufwerk ergänzen und mit diesen Informationen
automatisch einen Briefkopf befüllen zu lassen.

Der Abschnitt *Datenquellen*
----------------------------

Damit der WollMux eine Datenquelle benutzen kann, muss sie in der
*wollmux.conf* definiert werden. Dies geschieht in
*Datenquellen*-Abschnitten mit folgendem Aufbau:

```
Datenquellen(

  Registriere(
    NAME "<Name_der_OOo_Datenquelle>"
    URL "<URL_der_odb_Datei>"
    REFRESH "<true_oder_false>"
  )

  ...
 
  Datenquelle(
    NAME "<Name_der_Datenquelle>"
    TYPE "<Typ>"
   
    <Datenquellen_Definition>
  )

  ...

)
```

Innerhalb eines *Datenquellen*-Abschnitts können 2 verschiedene Arten
von Unterabschnitten verwendet werden. *Registriere*-Abschnitte
registrieren eine Datenquelle in OpenOffice (jedoch nicht im WollMux).
*Datenquelle*-Abschnitte definieren eine Datenquelle für die Verwendung
durch den WollMux (nicht OpenOffice). Der Abschnitt *Datenquellen* darf
innerhalb der Konfigurationsdatei mehrfach auftreten. In jedem
*Datenquellen*-Abschnitt können Datenquellen registriert/definiert
werden. Der WollMux erkennt die Datenquellen, die in der Gesamtheit
aller *Datenquellen*-Abschnitte definiert wurden.

Registriere
-----------

OpenOffice-Datenquellen haben verschiedene Aufgaben, insbesondere werden
sie für den Seriendruck verwendet. Damit eine Gruppe von Benutzern auf
eine zentral gepflegte Datenbasis zugreifen kann ist eine Verteilung
entsprechender Datenquellen erforderlich. Da zu jeder Datenbank eine
.odb-Datei gehört, die alle Parameter der Datenbank wie z.B. den Server
speichert, ist die Verteilung im Prinzip sehr einfach. Es genügt, die
.odb Datei dem Benutzer zur Verfügung zu stellen. Leider ist es damit
noch nicht ganz getan. Bevor eine .odb Datei verwendet werden kann, muss
sie in OpenOffice registriert werden. *Registriere*-Abschnitte bieten
eine einfache Methode, dies ohne manuelle Eingriffe an den betroffenen
Rechnern zentral administriert durchzuführen.

Jeder *Registriere*-Abschnitt kann folgende Attribute enthalten:

- **NAME**: Gibt den Namen an, den die Datenquelle in OpenOffice haben soll. Man beachte, dass *nicht* automatisch eine WollMux-Datenquelle mit diesem Namen eingerichtet wird. Wird eine WollMux-Datenquelle benötigt, so muss zusätzlich zum *Registriere*-Abschnitt ein *Datenquelle*-Abschnitt mit [TYPE "ooo"](#type-ooo) angelegt werden.

- **URL**: Gibt die URL der .odb-Datei an. Relative URLs werden relativ zum [DEFAULT\_CONTEXT](#der-defaultcontext) aufgelöst.

> **WARNING** ODB-Datenbanken, die ihre Daten direkt in der ODB-Datei speichern, werden derzeit von OOo auf HTTP-Servern nicht richtig unterstützt. Sie lassen sich zwar registrieren, jedoch sind keine Zugriffe auf die enthaltenen Tabellen möglich. Andere Orte (z.B. Netzlaufwerk) sollten jedoch funktionieren. Schreibrechte des Benutzers auf die Datei sind nicht erforderlich. Andere Datenbanktypen sind von diesem Problem nach derzeitigem Kenntnisstand nicht betroffen.

- **REFRESH (optional)**: Ist bereits eine Datenquelle mit dem angegebenen Namen bei OpenOffice registriert, so wird diese Registrierung vom WollMux *nicht* überschrieben, außer das Attribut REFRESH ist vorhanden und auf "true" gesetzt.

> **INFO** Bei file-URLs wird die Datei bei der Registrierung bereits geöffnet und falls dies fehlschlägt (z.B. weil die Datei nicht existiert) wird die Registrierung nicht durchgeführt. Bei HTTP-URLs erfolgt kein derartiger Zugriff. Die Datenbank wird unabhängig von der Existenz der Datei registriert. Ein Fehler tritt also erst bei einem versuchten Zugriff auf den Inhalt der Datenbank auf.

Datenquellen-Referenzen
-----------------------

Manche Datenquellen-Typen greifen auf bestehende Datenquellen zurück. In
diesen Fällen werden in der Datenquellen-Definition die entsprechenden
Datenquellen durch ihren Namen referenziert. Anders als bei
[Variablen](#variablen)
bezieht sich so eine Referenz *nicht* auf die letzte Datenquelle des
entsprechenden Namens in der gesamten *wollmux.conf*, sondern auf die
letzte, die *vor* der referenzierenden Datenquelle definiert wurde. Auf
diese Weise ist es möglich, eine Datenquelle zu definieren, die eine
Datenquelle des selben Namens referenziert. Das folgende Beispiel
verdeutlicht dies:

```
Datenquellen(

  # Definition von Datenquelle "Foo"
  Datenquelle(  
    NAME "Foo"   
    TYPE "<Typ1>"
    ...
  )

  # Re-Definition von Datenquelle "Foo" unter Bezugnahme auf die oben definierte
  # Datenquelle des gleichen Namens vom Typ <Typ1>.
  Datenquelle(
    NAME "Foo"
    TYPE "<Typ2>"
    SOURCE "Foo"
    ...
  )
)
```

SENDER\_SOURCE
--------------

Der WollMux muss wissen, aus welcher Datenquelle er die Absenderdaten
für die Briefkopf-Erstellung beziehen soll. Zur Festlegung dieser
Datenquelle dient die SENDER\_SOURCE Direktive:

`SENDER_SOURCE "<Name_der_Datenquelle>"`

Die SENDER\_SOURCE kann überall auf oberster Ebene der
Konfigurationsdatei außerhalb aller Abschnitte definiert werden. Die
SENDER\_SOURCE kann an einer späteren Stelle in der Konfigurationsdatei
redefiniert werden. Die letzte Definition bestimmt die Datenquelle, die
verwendet wird.

DATASOURCE\_TIMEOUT
-------------------

Mit DATASOURCE\_TIMEOUT kann ein Timeout für die Suche in Datenquellen
gesetzt werden (z.B. über den Absenderdaten Bearbeiten Dialog).
Spätestens nach der angegebenen Zeit wird die Suche abgebrochen, auch
wenn keine Ergebnisse vorliegen. Dies verhindert z.B. dass das Programm
bei Netzwerkproblemen sehr lange blockiert.

`DATASOURCE_TIMEOUT "<Zeit in Millisekunden>"`

Der DATASOURCE\_TIMEOUT kann überall auf oberster Ebene der
Konfigurationsdatei außerhalb aller Abschnitte definiert werden. Der
DATASOURCE\_TIMEOUT kann an einer späteren Stelle in der
Konfigurationsdatei redefiniert werden. Die letzte Definition bestimmt
den Timeout, der verwendet wird.

OVERRIDE\_FRAG\_DB\_SPALTE
--------------------------

Mit dieser Direktive kann der Name einer Spalte der SENDER\_SOURCE
bestimmt werden, aus deren Inhalt die *persönliche overrideFrag-Liste*
gelesen wird. Mit dieser wird die Abbildung von FRAG\_IDs auf andere
FRAG\_IDs initialisiert, die auch durch das [Dokumentkommando "overrideFrag"](Dokumentkommandos_des_WollMux.md#das-kommando-overridefrag)
beeinflusst wird. Der Inhalt der angegebenen Spalte kann leer sein oder
aus einem oder mehreren Einträgen bestehen, die jeweils eine der beiden
folgenden Formen haben

`(FRAG_ID '<alte_fragment_id>' NEW_FRAG_ID '<neue_fragment_id>')`
`(FRAG_ID '<fragment_id>')`

Zur Erläuterung der Funktionsweise siehe [Dokumentkommando "overrideFrag"](Dokumentkommandos_des_WollMux.md#das-kommando-overridefrag).
Die Festlegungen in der persönlichen overrideFrag-Liste haben Vorrang
vor denen, die durch Dokumentkommandos gesetzt werden.

Die OVERRIDE\_FRAG\_DB\_SPALTE kann überall auf oberster Ebene der
Konfigurationsdatei außerhalb aller Abschnitte definiert werden. Die
OVERRIDE\_FRAG\_DB\_SPALTE kann an einer späteren Stelle in der
Konfigurationsdatei redefiniert werden. Nur die letzte Definition wird
verwendet.

Der Abschnitt *AbsenderdatenSpaltenumsetzung*
---------------------------------------------

Über den Abschnitt *AbsenderdatenSpaltenumsetzung* lassen sich
Transformationen der Absenderdaten realisieren. Er hat folgenden Aufbau

```
AbsenderdatenSpaltenumsetzung(
  PseudoSpalte1( <WollMux-Funktion1> )
  PseudoSpalte2( <WollMux-Funktion2> )
  ...
)
```

-   *AbsenderdatenSpaltenumsetzung*-Abschnitte müssen auf oberster Ebene
    in der wollmux.conf definiert werden, *nicht* innerhalb des
    *Datenquellen*-Abschnitts.
-   Über den Abschnitt werden Pseudo-Spalten definiert, die jedem
    Datensatz der
    [SENDER\_SOURCE](#sendersource")
    hinzugefügt werden.
-   Wird in der Definition einer Pseudo-Spalte die Grundfunktion `VALUE "<Spalte>"` verwendet, so bezieht sich &lt;Spalte&gt; *immer* auf eine
    echte Spalte des Datensatzes, *niemals* auf eine Pseudospalte.
    Insbesondere ist es also *nicht* möglich, Pseudo-Spalten unter
    Bezugnahme auf andere Pseudo-Spalten zu definieren.
-   Gibt es mehrere Definitionen für die selbe Pseudo-Spalte, so gilt
    nur die letzte. Insbesondere ist es *nicht* möglich, eine
    Pseudo-Spalte XYZ unter Bezugnahme auf eine vorherige Definition von
    XYZ zu definieren. Siehe hierzu auch den vorigen Punkt.
-   Hat eine Pseudo-Spalte den selben Namen wie eine echte Spalte, so
    wird die echte Spalte verdeckt.
-   Alle Funktionsberechnungen finden auf den bereits vom Benutzer im
    [Absenderdaten Bearbeiten Dialog](#absenderdaten-bearbeiten)
    angepassten Werten statt, unmittelbar bevor ein Spaltenwert z.B.
    beim Auswerten des
    [insertValue-Dokumentkommandos](Dokumentkommandos_des_WollMux.md#das-kommando-insertvalue)
    verwendet wird. Eine evtl. auf das insertValue-Kommando gesetzte
    TRAFO wird erst danach ausgewertet, arbeitet also mit den durch
    *AbsenderdatenSpaltenumsetzung* geänderten Werten.
-   Gibt es mehrere Abschnitte *AbsenderdatenSpaltenumsetzung*, so
    werden diese zu einem einzigen großen Abschnitt verkettet.

Unterstützte Datenquellen-Typen
-------------------------------

Die folgenden Abschnitte beschreiben die verschiedenen Arten von
Datenquellen, die der WollMux unterstützt und wie sie in der
*wollmux.conf* definiert werden.

### TYPE "ldap"

Eine Datenquelle des Typs "ldap" greift auf ein LDAP-Verzeichnis zu. Die
Struktur der Definition einer LDAP-Datenquelle ist wie folgt:

```
 Datenquelle( 
   NAME "`<Name_der_Datenquelle>`"
   TYPE "ldap"
   URL "<url>"
   BASE_DN "<dn>"
   OBJECT_CLASS "<Klasse>"
   Spalten(
     (DB_SPALTE "<Spaltenname1>" PATH "<Pfad1>")
     (DB_SPALTE "<Spaltenname2>" PATH "<Pfad2>" OBJECT_CLASS "<Klasse>" LINE_SEPARATOR "<sep>")
     ...
   )
   
   Schluessel( "<Name_von_Schluesselspalte1>", "<Name_von_Schluesselspalte2>" ... )
 )
```

#### URL "&lt;url&gt;"

Die URL unter der der LDAP-Server zu finden ist, z.B.

`ldap://ldap01.muenchen.de:389`

#### BASE\_DN "&lt;dn&gt;"

Es ist oft sinnvoll oder sogar zwingend erforderlich, nur einen Teilbaum
des LDAP-Verzeichnisses als Datenquelle anzusprechen. Der als BASE\_DN
übergebene Distinguished Name bestimmt den Teilbaum, aus dem die
Datensätze der Datenquelle kommen dürfen, z.B.

`BASE_DN "o=Landeshauptstadt München,c=de"`

#### OBJECT\_CLASS "&lt;Klasse&gt;"

Ein LDAP-Verzeichnis kann Objekte verschiedener Art enthalten, z.B.
Personen und Ressourcen (Beamer,...). Meist soll eine Datenquelle nur
Objekte einer bestimmten Klasse zugänglich machen. OBJECT\_CLASS auf
Ebene der Datenquelle schränkt die von der Datenquelle als Datensätze
betrachteten Objekte auf diejenigen ein, deren objectClass Attribut
"&lt;Klasse&gt;" enthält. Beispiel:

`OBJECT_CLASS "lhmPerson"`

#### Spalten-Beschreibung

Da ein LDAP-Verzeichnis eine Baumstruktur besitzt, Datenquellen jedoch
immer eine Tabellenstruktur haben, muss in der Definition der
Datenquelle festgelegt werden, wie die Baumstruktur des Verzeichnisses
auf Tabellenspalten abzubilden ist. Diese Abbildung wird durch den
Abschnitt *Spalten* festgelegt, der folgende Struktur hat.

```
Spalten(
  (DB_SPALTE "<Spaltenname1>" PATH "<Pfad1>")
  (DB_SPALTE "<Spaltenname2>" PATH "<Pfad2>")
  ...
)
```

Es sind mehrere *Spalten*-Abschnitte erlaubt und auch mehrere Einträge
mit dem selben Spaltennamen. In diesem Fall gilt immer die letzte
Definition der Spalte. Eine Spaltendefinition besteht immer aus 2
Angaben.

##### DB\_SPALTE "&lt;Spaltenname&gt;"

&lt;Spaltenname&gt; bestimmt den Namen einer Spalte, die die Datenquelle zur
Verfügung stellen soll. Der Spaltenname muss der Konvention für
Bezeichner entsprechen, d.h. nur aus Ziffern, Buchstaben und Unterstrich
bestehen und nicht mit einer Ziffer beginnen.

##### PATH "&lt;Pfad&gt;"

Meist soll die Datenquelle bestimmte Attribute der über
[OBJECT\_CLASS](#objectclass-klasse)
ausgewählten Objekte in den Spalten zur Verfügung stellen, manchmal
jedoch sind die benötigen Daten nicht direkt im entsprechenden Objekt zu
finden, sondern in Vorfahren dieses Objekts. Zum Beispiel sind Daten
über das Referat eines Mitarbeiters meist nicht als Attribute des
Mitarbeiter-Objektes verfügbar, sondern nur als Attribute des
Vorfahren-Knotens, der das Referat repräsentiert. Um auch damit umgehen
zu können wird der Inhalt einer Spalte nicht nur durch einen
Attributsnamen gegeben, sondern durch einen Pfad der folgenden Form

`PATH "<Knoten>:<Attribut>"`

Dabei bestimmt &lt;Attribut&gt; den Namen des Attributs das den Spaltenwert
liefern soll. Es ist einfach der Name des Attributs wie er auch im LDAP
selbst Anwendung findet. <Knoten> dagegen ist eine ganze Zahl, die
angibt von welchem Vorfahren des Objektknotens, der den Datensatz
liefert, der Attributswert genommen werden soll. Folgende Möglichkeiten
gibt es, den Vorfahren festzulegen:

**0**: Die 0 bezeichnet den Objektknoten selbst.

**positive Zahl**: Die positive Zahl n wählt den Vorfahren des
Objektknotens, der von der Wurzel des LDAP-Verzeichnisses den Abstand
n-1 hat. D.h. die 1 bezeichnet immer die Wurzel des LDAP-Verzeichnisses
(*nicht* den Base DN), die 2 bezeichnet das direkte Kind der Wurzel, das
ein Vorfahre des Objektknotens ist, etc. Da der LDAP einen Baum
darstellt, gibt es zu jedem Abstand von der Wurzel maximal einen Knoten,
der Vorfahre des Objektknotens ist. Es ist möglich, dass es zu einem
Objektknoten keinen Vorfahren der entsprechenden Ebene *n* gibt, nämlich
dann, wenn der Knoten selbst von der Wurzel einen geringeren Abstand als
*n* hat. In diesem Fall gilt für den entsprechenden Datensatz der Wert der
Spalte als unbelegt.

**negative Zahl**: Die negative Zahl -n wählt den n-ten Vorfahren des
Objektknotens, z.B. bezeichnet -1 den unmittelbaren Vaterknoten, -2 den
Großvater, etc.

##### OBJECT\_CLASS "&lt;Klasse&gt;"

Auf Ebene der Spalten dient die OBJECT\_CLASS-Angabe der Optimierung bei
Suchanfragen. Bei Angabe einer OBJECT\_CLASS in einer
Spaltenbeschreibung, werden bei Suchanfragen, die die Spalte betreffen
nur LDAP-Knoten der entsprechenden Klasse betrachtet.

##### LINE\_SEPARATOR "&lt;sep&gt;"

Enthält die Spalte mehrzeilige Daten, so kann als <sep> ein [regulärer Ausdruck](http://java.sun.com/j2se/1.4.2/docs/api/java/util/regex/Pattern.html)
angegeben werden, der beschreibt, an welchen Stellen sich Zeilenumbrüche
befinden. Zu beachten ist, dass das "%" Zeichen als "%%" geschrieben
werden muss (und ein doppeltes "%"-Zeichen als "%%%%"), entsprechend der
[Syntax von WollMux-Config-Dateien](Format_von_WollMux-Config-Dateien.md).

#### Schluessel-Definition

Der Abschnitt *Schluessel* enthält eine Liste von einem oder mehreren
Spaltennamen. Diese Spalten bilden in der Gesamtheit einen Schlüssel,
der herangezogen wird, um Datensätze zu identifizieren. Dem Schlüssel
kommt im Zusammenhang mit den Caching-Mechanismen des WollMux besondere
Bedeutung zu. Um auch im Falle eines Netzausfalles den Betrieb
sicherzustellen, werden bestimmte Daten, wie z.B. die der Persönlichen
Absenderliste, vom WollMux im Benutzerverzeichnis gecacht. Bei jedem
Start versucht der WollMux, die Daten aus den Datenquellen zu
aktualisieren. Um die neuen Daten zu finden, dienen ihm dabei die
Schlüssel der Datensätze. Daraus ergeben sich folgende Anforderungen an
einen guten Schlüssel:

- **Die gewählten Schlüsselspalten sollten jeden Datensatz eindeutig identifizieren**: Falls es mehrere Datensätze mit dem selben
    Schlüssel gibt (falls z.B. in einer Personendatenbank als Schlüssel
    nur der Nachname verwendet wird), so wird der WollMux beim
    Aktualisieren seiner Daten alle passenden Datensätze importieren.
    Auf die Persönliche Absenderliste bezogen, würde dies bedeuten, dass
    der Anwender plötzlich zusätzliche Einträge in seiner Liste hat, die
    er nicht haben möchte. Der Anwender könnte diese Einträge zwar aus
    seiner Liste löschen, sie würden jedoch mit jedem Neustart des
    WollMux wieder importiert, solange mindestens ein Eintrag mit dem
    gleichen Schlüssel in der Liste verbleibt.
- **Die gewählten Schlüsselspalten sollten keine häufig geänderten Werte enthalten**: Falls sich zu einem Datensatz der Wert in einer
    Schlüsselspalte (und damit der Schlüssel) ändert, so kann der
    WollMux den Datensatz nicht mehr aus der Datenquelle aktualisieren.
    Bezogen auf die Persönliche Absenderliste bedeutet dies, dass ein
    Eintrag dessen Datensatz seinen Schlüssel geändert hat, auf dem
    letzten Stand vor der Änderung verbleibt. Eine Änderung der
    Raumnummer im LDAP-Verzeichnis für die entsprechende Person würde
    dann z.B. nicht automatisch übernommen.
- **Schlüsselwerte sollten nicht zu verschiedenen Zeiten auf verschiedene Objekte passen**: Noch ungünstiger als der Fall, dass
    auf einen Schlüssel mehrere Objekte passen. Das ist der Fall, wenn
    ein Schlüssel einmal auf Objekt A und zu einem anderen Zeitpunkt auf
    Objekt B passt, das mit Objekt A nichts zu tun hat. Typischerweise
    würde dies so geschehen, dass Objekt A aus der Datenbank entfernt
    und zu einem späteren Zeitpunkt Objekt B hinzugefügt wird, und dabei
    den früher von Objekt A benutzten Schlüssel bekommt. In diesem Fall
    würde der WollMux die gecachten Daten von Objekt A mit denen von
    Objekt B überschreiben. Bezogen auf die Persönliche Absenderliste
    würde zum Beispiel Wahl der Zimmernummer als einzige Schlüsselspalte
    zu dem Effekt führen, dass nach einem Umzug in ein anderes Büro die
    Liste Einträge für die falschen Personen enthält.

### TYPE "ooo"

Eine Datenquelle des Typs "ooo" macht eine beliebige in OpenOffice.org
registrierte Datenquelle als WollMux-Datenquelle verfügbar. Dies
ermöglicht zum Beispiel auch, den WollMux auf Oracle-Datenbanken
zugreifen zu lassen. Die Definition einer OOo-Datenquelle hat folgenden
Aufbau:

```
Datenquelle(
  NAME "<Name_der_WollMux_Datenquelle>"
  TYPE "ooo"
  SOURCE "`<Name_der_in_OOo_registrierten_Datenquelle>"
  TABLE "<Name_der_Tabelle_oder_Sicht>"
  USER "<Benutzername>"
  PASSWORD "<Passwort>"
  SQL_SYNTAX "<Syntaxbezeichner>"
  Schema( "<Name_von_Spalte1>" "<Name_von_Spalte2>" ... )
  Schluessel( "<Name_von_Schluesselspalte1>", "<Name_von_Schluesselspalte2>" ... )
  # Wenn ein Schema()-Abschnitt angegeben ist, muss auch ein Schluessel-Abschnitt angegeben werden.
)
```

#### SOURCE "&lt;Datenquellenname&gt;"

Mit SOURCE wird der Name der bei OpenOffice.org registrierten
Datenquelle angegeben, auf die zugegriffen werden soll.

#### TABLE "&lt;TabelleOderSicht&gt;"

Mit TABLE wird der Name der Tabelle oder Sicht innerhalb der Datenquelle
angegeben.

#### USER "&lt;Benutzername&gt;" und PASSWORD "&lt;Passwort&gt;"

Falls die Datenbank einen Login erfordert, werden mit diesen Feldern der
entsprechende Benutzername und das zugehörige Passwort festgelegt. Da
die Zugangsdaten von jedem Benutzer, der auf die WollMux-Konfiguration
zugreifen kann, eingesehen werden können, versteht es sich von selbst,
dass hier keine geheimen Daten verwendet werden dürfen und der
entsprechende Benutzeraccount nur Leserechte auf die Datenbank haben
darf.

#### SQL\_SYNTAX "&lt;Syntaxbezeichner&gt;"

Verschiedenen Datenbanken arbeiten mit verschiedenen SQL-Dialekten. Mit
dieser Angabe kann ausgewählt werden, in welchem Dialekt der WollMux
seinen Anfragen stellen soll. Als &lt;Syntaxbezeichner&gt; werden unterstützt:

*ansi*, *oracle*, *mysql*, *pervasivesql*

Die Angabe SQL\_SYNTAX ist optional. Wird sie weggelassen, so wird
*ansi* angenommen.

> **WARNING** Bei der Verwendung von Calc-Dateien als Datenquelle muss
als Syntax *pervasivesql* angegeben werden.

#### Schema-Angabe

Im Schema-Abschnitt werden die Namen aller Spalten der Tabelle
angegeben, auf die der Zugriff ermöglicht werden soll. Werden hier
Spalten angegeben, die nicht in der Tabelle vorhanden sind, so werden
diese als nicht belegt angenommen. Werden hier Spalten nicht angegeben,
die jedoch in der Tabelle vorhanden sind, so ist der Zugriff auf diese
Spalten nicht möglich. Der Schema-Abschnitt kann weggelassen werden. In
diesem Fall bezieht der WollMux das Schema direkt aus der Datenbank.
Hiervon ist jedoch abzuraten, da diese Datenbankzugriffe bei jedem Start
von OpenOffice Verzögerungen verursachen. Insbesondere im Falle eines
Netzausfalls müssten die Benutzer unnötig lange warten bis OpenOffice
startet, da erst der Timeout für den Datenbankzugriff ablaufen muss.

#### Schluessel-Definition

Der *Schluessel*-Abschnitt ist vollkommen analog zum
[Schluessel-Abschnitt bei LDAP-Datenquellen](#schluessel-definition).

Wird der Schema-Abschnitt weggelassen (was jedoch nicht empfehlenswert
ist), so wird versucht, den Schlüssel ebenfalls aus der Datenbank
auszulesen. Es hängt von der Datenbank und der Art der Tabelle ab, ob
dies funktioniert oder nicht und sollte daher vermieden werden.

### TYPE "conf"

Eine Datenquelle des Typs "conf" bezieht ihre Daten aus einer Textdatei
im [Format von WollMux-Config-Dateien](Format_von_WollMux-Config-Dateien.md).
Die genaue Struktur des Inhalts wird weiter unten beschrieben. Die
Definition einer Conf-Datenquelle hat folgenden Aufbau:

```
 Datenquelle(
   NAME "<Name_der_Datenquelle>"
   TYPE "conf"
   URL "<url>"
   Schluessel( "<Name_von_Schluesselspalte1>", "<Name_von_Schluesselspalte2>" ... )
 )
```

#### Schluessel-Definition

Der *Schluessel*-Abschnitt ist vollkommen analog zum
[Schluessel-Abschnitt bei LDAP-Datenquellen](Konfigurationsdatei_wollmux.conf#Schluessel-Definition).

#### URL "&lt;url&gt;"

Die &lt;url&gt; gibt die Datei an, in der die Daten der Datenquelle stehen.
Sie ist in
[URL-Notation](Format_von_WollMux-Config-Dateien.md#urls).
Relative URLs werden relativ zum
[DEFAULT\_CONTEXT](#der_defaultcontext)
interpretiert. Der Aufbau der Datendatei wird im folgenden Abschnitt
beschrieben.

#### Aufbau der Datendatei

Zu jeder Conf-Datenquelle gehört eine Datendatei. Die Syntax dieser
Datei entspricht der [Syntax der wollmux.conf](Format_von_WollMux-Config-Dateien.md) und ihre
Struktur ist folgende:

```
Schema(
  "<Spaltenname1>", "<Spaltenname2>" ...
)

Daten(
  (<Datensatz1>)
  (<Datensatz2>)
  ...
)
```

Die Abschnitte *Schema* und *Daten* sind im Folgenden beschrieben.

##### Schema

Der *Schema*-Abschnitt enthält eine Liste von Spaltennamen. Diese Liste
bestimmt, welche Spalten die Tabelle enthält. Bei geordneten Datensätzen
(siehe unten) bestimmt die Liste ausserdem die Zuordnung der Werte des
Datensatzes zu den entsprechenden Spalten. Die Namen der Spalten müssen
der Konvention für Bezeichner entsprechen, d.h. nur aus Ziffern,
Buchstaben und Unterstrich bestehen und nicht mit einer Ziffer beginnen.

##### Daten

Der *Daten*-Abschnitt enthält die eigentlichen Datensätze. Ein leerer
*Daten*-Abschnitt ist erlaubt. Jeder Datensatz kann in einem von 2
Formaten beschrieben sein: *geordnet* oder *ungeordnet*.

Ein *geordneter Datensatz* hat folgendes Format:

`("<Spaltenwert1>", "<Spaltenwert2>" ...)`

Die Werte werden den Spalten in der Reihenfolge zugeordnet, in der sie
im *Schema*-Abschnitt aufgeführt sind. Es ist erlaubt, weniger
Spaltenwerte anzugeben als es Spalten gibt. Die fehlenden Spaltenwerte
bleiben für den Datensatz unbelegt. Mehr Spaltenwerte anzugeben als das
Schema Spalten definiert, ist hingegen ein Fehler.

Ein *ungeordneter Datensatz* hat folgendes Format:

`(Spaltenname1 "<Spaltenwert1>"  Spaltenname2 "<Spaltenwert2>" ...)`

Bei dieser Form werden also die Daten als Schlüssel-Wert-Paare mit dem
Spaltennamen als Schlüssel und dem Spaltenwert als Wert angegeben. Die
Reihenfolge ist bei dieser Form unwichtig. Die ungeordnete Form hat
ausserdem den Vorteil, dass es möglich ist, beliebige Spaltenwerte
unbelegt zu lassen, wogegen die geordnete Form prinzipbedingt nur das
Weglassen von Spalten am Ende des Schemas erlaubt.

### TYPE "union"

Eine Datenquelle des Typs "union" stellt die Vereinigung der Menge aller
Datensätze aus 2 Datenquellen zur Verfügung. Sie wird wie folgt
definiert

```
Datenquelle(
  NAME "<Name_der_Datenquelle>"
  TYPE "union"
  SOURCE1 "<Name_Datenquelle1>"
  SOURCE2 "<Name_Datenquelle2>"
)
```

SOURCE1 und SOURCE2 geben die Datenquellen an, die vereinigt werden
sollen.

Anmerkungen:

- Wenn in SOURCE1 und SOURCE2 Datensätze mit dem selben Schlüsselwert
    sind, so kann dies unerwünschte Folgen haben. Im Briefkopfsystem zum
    Beispiel würde das Hinzufügen eines der Datensätze zur persönlichen
    Absenderliste beim nächsten Neustart dazu führen, dass alle
    Datensätze aus beiden Datenquellen mit dem entsprechenden Schlüssel
    auf der Absenderliste sind.
- Die Schemata beider Datenquellen müssen identisch sein.

### TYPE "prefer"

Eine Datenquelle des Typs "prefer" erlaubt es, Datensätze einer
Datenquelle A durch Datensätze einer anderen (bevorzugten) Datenquelle B
verdecken zu lassen. Technisch sieht das so aus: Es werden Anfragen an
beide Datenquellen gestellt und die Ergebnisse vereinigt. Dann werden
alle Ergebnisdatensätze aus Datenquelle A, die auch in Datenquelle B
vorhanden sind, aus der Ergebnismenge entfernt. Die Identifikation der
Datensätze läuft dabei über die Schlüsselwerte. Der typische
Anwendungsfall einer "prefer"-Datenquelle ist, einzelne fehlerhafte
Datensätze anhand einer Korrekturdatei durch korrekte zu ersetzen. Eine
"prefer"-Datenquelle wird wie folgt definiert

```
Datenquelle(
  NAME "<Name_der_Datenquelle>"
  TYPE "prefer"
  SOURCE "<Name_Datenquelle1>"
  OVER "<Name_Datenquelle2>"
)
```

SOURCE gibt die bevorzugte Datenquelle an und OVER die Datenquelle, die
die Anfragen beantworten soll. Die Schemata beider Datenquellen müssen
identisch sein.

### TYPE "schema"

Eine Datenquelle des Typs "schema" stellt die Datensätze einer anderen
Datenquelle mit geändertem Schema zur Verfügung. Sie erlaubt es, Spalten
umzubenennen, hinzuzufügen und zu entfernen. Sie wird wie folgt
definiert

```
Datenquelle(
  NAME "<Name_der_Datenquelle>"
  TYPE "schema"
  SOURCE "<Name_der_Originaldatenquelle>"
  RENAME("<UrsprünglicherSpaltenname1>" "<NeuerSpaltenname1>")
  RENAME("<UrsprünglicherSpaltenname2>" "<NeuerSpaltenname2>")
  ...    
  DROP("<UrsprünglicherSpaltenname3>" ...)
  ...
  ADD("<NeuerSpaltenname3>" ...)
  ...
)
```

Die RENAMEs spezifizieren Umbenennungen von Spalten. In jedem
RENAME-Block steht ein paar aus einem alten und dem neuen Spaltennamen.

Die DROP-Abschnitte enthalten Namen von Spalten, die in der neuen
Datenquelle nicht mehr verfügbar sein sollen.

Die ADD-Abschnitte fügen dem Schema neue Spalten hinzu.

Anmerkungen:

- Wird eine Spalte "A" umbenannt in "B", so ist eine evtl. vorher
    existierende Spalte "B" damit unerreichbar geworden (sofern sie
    nicht ebenfalls umbenannt wird).
- Die Schlüssel der Datensätze ändern sich auch bei Umbenennung von
    Schlüsselspalten nicht.
- Gibt es mehrere RENAMEs mit dem selben &lt;NeuerSpaltennameX&gt;, so gilt
    der letzte RENAME.
- Gibt es mehrere RENAMEs mit dem selben &lt;UrsprünglicherSpaltennameX&gt;,
    so haben alle Bestand und es entstehen mehrere Alias-Namen für die
    selbe Spalte.
- &lt;UrsprünglicherSpaltennameX&gt; bezieht sich immer auf
    die Originalspalten. Vorhergehende RENAMEs haben darauf
    keinen Einfluss. Deshalb ist es möglich 2 Spalten wie folgt zu
    vertauschen:

`RENAME("A" "B")`

`RENAME("B" "A")`

- Die Spaltennamen in DROP-Abschnitten beziehen sich immer auf die
    SOURCE-Datenquelle, nicht auf durch RENAME definierte neue Namen.
- Unabhängig von der Reihenfolge in der RENAME und DROP in der
    Config-Datei stehen, hat RENAME immer Vorrang vor DROP, d.h.
    spezifiziert ein RENAME als &lt;NeuerSpaltennameX&gt; einen Namen, der
    auch in einem DROP-Abschnitt vorkommt, so wird die neue Datenquelle
    die Spalte &lt;NeuerSpaltennameX&gt; anbieten, trotz des DROPs.
- Falls eine Spalte, die in einem ADD-Abschnitt angegeben wird,
    bereits in der Datenquelle existiert oder durch RENAME hinzugefügt
    wird, so hat das ADD keine Auswirkungen.
- Falls eine Spalte, die in einem ADD-Abschnitt angegeben wird auch
    als <UrsprünglicherSpaltennameX> in einem RENAME auftaucht, so ist
    das Ergebnis, dass beide Spaltennamen Aliase für die selbe
    Spalte sind. Insbesondere fügt ADD in diesem Fall keine unbelegte
    Spalte hinzu.
- ADD hat Vorrang vor DROP, d.h. spezifiziert ein ADD als
    &lt;NeuerSpaltennameX&gt; einen Namen, der auch in einem DROP-Abschnitt
    vorkommt, so wird die neue Datenquelle die Spalte
    &lt;NeuerSpaltennameX&gt; anbieten, trotz des DROPs.

### TYPE "funky"

Eine Datenquelle des Typs "funky" fügt einer anderen Datenquelle Spalten
hinzu, deren Werte durch beliebige
[WollMux-Funktionen](#funktionen)
aus den Ursprungsdaten berechnet werden. Sie wird wie folgt definiert

```
Datenquelle(
  NAME "<Name_der_Datenquelle>"
  TYPE "funky"
  SOURCE "<Name_der_Originaldatenquelle>"

  Spaltenumsetzung(
    NeueSpalte1( <WollMux-Funktion1> )
    NeueSpalte2( <WollMux-Funktion2> )
    ...
  )
)
```

Mit SOURCE wird die Datenquelle angegeben, die die Originaldaten zur
Verfügung stellt.

NeueSpalteX ist jeweils der Name der zu definierenden Spalte und
WollMux-FunktionX die WollMux-Funktion, mit der der Wert der Spalte
berechnet wird.

Das Schema der funky-Datenquelle enthält alle Spalten der
Originaldatenquelle und zusätzlich die als NeueSpalteX definierten.

Die Schlüssel der Datensätze sind die selben wie in der
Originaldatenquelle.

Anmerkungen:

-   Wird in der Definition einer NeueSpalteX die Grundfunktion `VALUE "<Spalte>"` verwendet, so bezieht sich <Spalte> *immer* auf eine
    Spalte der Originaldaten, *niemals* auf eine NeueSpalteX.
    Insbesondere ist es also *nicht* möglich, neue Spalten unter
    Bezugnahme auf andere neue Spalten zu definieren.
-   Gibt es mehrere Definitionen für die selbe NeueSpalteX, so gilt nur
    die letzte. Insbesondere ist es *nicht* möglich, eine NeueSpalteX
    unter Bezugnahme auf eine vorherige Definition von NeueSpalteX
    zu definieren. Siehe hierzu auch den vorigen Punkt.
-   Hat eine NeueSpalteX den selben Namen wie eine SpalteX der
    Originaldaten, so wird die Original-Spalte verdeckt. `VALUE "SpalteX"` bezieht sich jedoch innerhalb der Definition der
    funky-Datenquelle weiterhin auf die Original-Spalte (siehe
    vorherige Punkte). Die Schlüssel der Datensätze bleiben jedoch auch
    dann unverändert, wenn Schlüsselspalten der Originaldatenquelle
    verdeckt werden.

> **WARNING** Die funky-Datenquelle hat nur unvollständige Unterstützung für Suchanfragen auf transformierten Spalten. Wenn sie die inverse Transformation nicht berechnen kann, reicht sie die Suchanfrage einfach unverändert an die Originaldatenquelle weiter. Die bei einer Suche gelieferten Ergebnisse werden jedoch um die entsprechenden berechneten Spalten ergänzt. Wird aufgrund von Namensgleichheit eine SpalteX durch eine NeueSpalteX verdeckt, kann dies zu Diskrepanzen führen, wenn eine Suche sich auf SpalteX bezieht. Beispiel:

```
Datenquelle(
  NAME "personal"
  TYPE "funky"
  SOURCE "personal"

  Spaltenumsetzung(
    Nachname( "Anonymus" )
  )
)
```

Wird auf dieser Datenquelle "personal" nach Personen mit Nachname
"Maier" gesucht, und enthält die Originaldatenquelle einen "Hans Maier"
und einen "Peter Maier", so werden als Ergebnisse "Hans Anonymus" und
"Peter Anonymus" zurückgeliefert. Wird dagegen auf dieser Datenquelle
nach Personen mit Nachname "Anonymus" gesucht, so gibt es keine
Ergebnisse (außer die Originaldatenquelle enthält tatsächlich eine
Person dieses Namens).

Da dieses Verhalten normalerweise unintuitiv und unerwünscht ist, sollte
eine funky-Datenquelle nie dazu verwendet werden, Spalten
umzudefinieren, die potentiell in Suchanfragen vorkommen.

### TYPE "attach"

Eine Datenquelle des Typs "attach" wird verwendet, um Datensätze aus
einer Datenquelle um Spalten aus einer anderen Datenquelle zu ergänzen.
Eine "attach" Datenquelle ist sehr ähnlich zu einer "overlay"
Datenquelle. Im Einzelfall muss geprüft werden, welcher Type für das
entsprechende Problem besser passt. Eine "attach" Datenquelle wird wie
folgt definiert:

```
Datenquelle(
  NAME "<Name_der_Datenquelle>"
  TYPE "attach"
  SOURCE "<Name_Datenquelle1>"
  ATTACH "<Name_Datenquelle2>"
  MATCH("<Spalte_aus_Datenquelle1>" "<Spalte_aus_Datenquelle2>")
  MATCH("<Spalte_aus_Datenquelle1>" "<Spalte_aus_Datenquelle2>")
  ...
)
```

SOURCE gibt die Datenquelle an, die die Datensätze bestimmen soll,
ATTACH die Datenquelle, die die Ergänzungsspalten liefern soll. Die
MATCH-Blöcke enthalten jeweils einen Namen einer Spalte in Datenquelle
SOURCE und einen Namen einer Spalte in Datenquelle ATTACH. Für jeden
Datensatz aus SOURCE wird gesucht, ob es in Datenquelle ATTACH einen
Datensatz gibt, bei dem die Werte in den Spalten
&lt;Spalte_aus_Datenquelle2&gt; mit den Werten aus den Spalten
&lt;Spalte_aus_Datenquelle1&gt; des SOURCE-Datensatzes übereinstimmen. Falls
ja, so werden die Spalten des ATTACH-Datensatzes benutzt um den
SOURCE-Datensatz zu ergänzen.

Anmerkungen:

- In der Ergebnisdatenquelle sind alle Spalten von SOURCE unter ihrem
    ursprünglichen Namen, alle Spalten von ATTACH unter
    `"<Name_Datenquelle2>"` konkateniert mit "\_\_" (Doppel-Unterstrich)
    konkateniert mit dem ursprünglichen ATTACH-Spaltennamen zu finden.
    Falls ein so generierter Name mit einem Spaltennamen aus SOURCE
    kollidiert gibt dies einen Fehler. Dies erfordert einen weiteren
    Datenquellen-Typ vom type schema um diese Ungleichheit aufzulösen.
- Falls es zu einem SOURCE-Datensatz keinen passenden ATTACH-Datensatz
    gibt, so werden für diesen Datensatz die
    "<Name_Datenquelle2>\_\_"-Spalten als unbelegt behandelt.
    Insbesondere führt diese also nicht dazu, dass ein SOURCE-Datensatz
    verschwindet (wie es bei einem normalen Datenbank-Join der
    Fall wäre).
- Falls es zu einem SOURCE-Datensatz mehrere ATTACH-Datensätze gibt,
    so wird einer davon (auf unspezifizierte Weise) ausgewählt.
    Insbesondere führt es *nicht* dazu, dass aus einem SOURCE-Datensatz
    mehrere Datensätze entstehen (wie es bei einem normalen
    Datenbank-Join der Fall wäre).
- Die Schlüssel der Ergebnisdatensätze bleiben die Schlüssel aus
    SOURCE und werden nicht kombiniert aus SOURCE und ATTACH.

### TYPE "overlay"

Eine Datenquelle des Typs "overlay" wird verwendet, um Datensätze aus
einer Datenquelle um Spalten aus einer anderen Datenquelle zu ergänzen
oder um Spaltenwerte einer Datenquelle durch Werte einer gleichnamigen
Spalte einer anderen Datenquelle zu ersetzen. Eine "overlay" Datenquelle
ist sehr ähnlich zu einer "attach" Datenquelle. Im Einzelfall muss
geprüft werden, welcher Type für das entsprechende Problem besser passt.
Eine "overlay" Datenquelle wird wie folgt definiert:

```
Datenquelle(
  NAME "<Name_der_Datenquelle>"
  TYPE "overlay"
  SOURCE "<Name_Datenquelle1>"
  OVERLAY "<Name_Datenquelle2>"
  MODE "<Modus>"   # so, os, So, oS, sO, Os, SO, OS
  MATCH("<Spalte_aus_Datenquelle1>" "<Spalte_aus_Datenquelle2>")
  MATCH("<Spalte_aus_Datenquelle1>" "<Spalte_aus_Datenquelle2>")
  ...
)
```

SOURCE gibt die Datenquelle an, die die Datensätze bestimmen soll,
OVERLAY die Datenquelle, die die Ergänzungs- und Ersetzungsspalten
liefern soll. Die MATCH-Blöcke enthalten jeweils einen Namen einer
Spalte in Datenquelle SOURCE und einen Namen einer Spalte in Datenquelle
OVERLAY. Für jeden Datensatz aus SOURCE wird gesucht, ob es in
Datenquelle OVERLAY einen Datensatz gibt, bei dem die Werte in den
Spalten <Spalte_aus_Datenquelle2> mit den Werten aus den Spalten
<Spalte_aus_Datenquelle1> des SOURCE-Datensatzes übereinstimmen. Falls
ja, so werden die Spalten des OVERLAY-Datensatzes benutzt um den
SOURCE-Datensatz zu verändern.

Die Ergebnisdatenquelle besitzt alle Spalten von SOURCE und alle Spalten
von OVERLAY. Anders als bei einer Datenquelle des Typs "attach" sind
alle Spalten unter ihrem ursprünglichen Namen verfügbar ohne irgendein
Präfix. Enthalten SOURCE und OVERLAY Spalten mit den gleichen Namen, so
bestimmt die MODE-Angabe, welche Spalte in einem Ergebnisdatensatz
sichtbar ist. <Modus> kann folgende Werte haben

- **so**: Der OVERLAY-Wert wird verwendet, außer es ist der leere String oder unbelegt. In letzteren Fällen wird der SOURCE-Wert verwendet.
- **sO**: Der OVERLAY-Wert wird verwendet, außer er ist unbelegt. In letzterem Fall wird der SOURCE-Wert verwendet. Man beachte, dass ein leerer String *nicht* als "unbelegt" zählt.
- **So**: gleich wie "so"
- **SO**: gleich wie "sO"
- **os**: Der SOURCE-Wert wird verwendet, außer es ist der leere String oder unbelegt. In letzteren Fällen wird der OVERLAY-Wert verwendet.
- **oS**: Der SOURCE-Wert wird verwendet, außer er ist unbelegt. In letzterem Fall wird der OVERLAY-Wert verwendet. Man beachte, dass ein leerer String *nicht* als "unbelegt" zählt.
- **Os**: gleich wie "os"
- **OS**: gleich wie "oS"

Man kann sich das Ganze vorstellen als transparente Folien, die in der
Reihenfolge der Buchstaben im &lt;Modus&gt; übereinandergelegt werden. Dabei
steht "S" für SOURCE und "O" für OVERLAY. Ein Kleinbuchstabe gibt
jeweils an, dass leere Strings "durchsichtig" sind. Ein Großbuchstabe
gibt an, dass leere Strings "undurchsichtig" sind ("weiße Fläche").

Anmerkungen:

- Falls es zu einem SOURCE-Datensatz keinen passenden
    OVERLAY-Datensatz gibt, so werden für diesen Datensatz die
    OVERLAY-Spalten als unbelegt behandelt. Insbesondere führt diese
    also *nicht* dazu, dass ein SOURCE-Datensatz verschwindet (wie es
    bei einem normalen Datenbank-Join der Fall wäre).
- Falls es zu einem SOURCE-Datensatz mehrere OVERLAY-Datensätze gibt,
    so wird einer davon (auf unspezifizierte Weise) ausgewählt.
    Insbesondere führt es *nicht* dazu, dass aus einem SOURCE-Datensatz
    mehrere Datensätze entstehen (wie es bei einem normalen
    Datenbank-Join der Fall wäre).
- Die Schlüssel der Ergebnisdatensätze bleiben die Schlüssel aus
    SOURCE und werden *nicht* kombiniert aus SOURCE und OVERLAY.

Initialisierung der persönlichen Absenderliste
===============================================

Die "persönliche Absenderliste" enthält eine Liste aller Personen die
als Absender verwendet werden können. Ist diese Liste leer (z.B. beim
ersten Starten des WollMux in einem Benutzerprofil), so wird eine
Initialisierungsroutine gestartet, die versucht, die persoenliche
Absenderliste mit mindestens einem Wert zu belegen.

Der Abschnitt PersoenlicheAbsenderlisteInitialisierung/Suchstrategie
--------------------------------------------------------------------

Der Konfigurationsabschnitt
"PersoenlicheAbsenderlisteInitialisierung/Suchstrategie" dient dazu, die
Reihenfolge zu beschreiben, nach der bei der Initialisierung in der
durch SENDER\_SOURCE definierten Datenquelle gesucht werden soll.

Folgendes Beispiel zeigt einen vollständigen Abschnitt
PersoenlicheAbsenderlisteInitialisierung/Suchstrategie:

```
PersoenlicheAbsenderlisteInitialisierung(
  Suchstrategie(

   # Benutzernamen haben auf dem Basisclient analog zu den Mailadressen
   # der LHM in der Regel die Form vorname.nachname. Wird also an den
   # Benutzernamen der Zusatz "@muenchen.de" angehängt, so kann der Name
   # als Mailadresse interpretiert werden. Die Suche nutzt genau diese
   # Möglichkeit aus.
   BY_JAVA_PROPERTY(Mail "${user.name}@muenchen.de")

   # Unter Extras->Optionen->OpenOffice.org->Benutzerdaten können in
   # OpenOffice Benutzerdaten hinterlegt werden. In dieser Regel wird
   # nach der Kombination Vorname/Nachname gesucht, wobei die entsprechenden
   # Felder im OOo_USER_PROFILE "givenname" und "sn" heissen.
   BY_OOO_USER_PROFILE(Vorname "${givenname}" Nachname "${sn}")

  )
)
```

Ist in der Konfigurationsdatei keine Suchstrategie definiert, so wird
automatisch folgende Standardsuchstrategie verwendet:

```
PersoenlicheAbsenderlisteInitialisierung(
  Suchstrategie(
   BY_OOO_USER_PROFILE(Vorname "${givenname}" Nachname "${sn}")
  )
)
```

Der Abschnitt hat folgenden Aufbau:

```
PersoenlicheAbsenderlisteInitialisierung(
  Suchstrategie(

   <Suchanfrage1>
   <Suchanfrage2>
   ...
   <SuchanfrageN>

  )
)
```

<Suchanfrage>:

<Suchanfrage> beschreibt eine Suchanfrage, die an die durch
SENDER\_SOURCE definierte Datenquelle abgeschickt wird. Jede Suchanfrage
kann gefundene Datensätze zurückliefern, muss aber nicht. Wird bei einer
Suchanfrage kein Datensatz gefunden, so wird mit der nächsten
Suchanfrage fortgefahren. Werden über eine Suchanfrage Datensätze
gefunden, so werden diese Datensätze in die Persönliche Absenderliste
übertragen und die Suche beendet.

Eine Suchanfrage <Suchanfrage> ist dabei wie folgt aufgebaut:

`<BY_QUELLE>(<Spaltenname> '<Wert>')`

bzw.

`<BY_QUELLE>(<Spaltenname1> '<Wert1>' <Spaltenname2> '<Wert2>')`

- **&lt;Spaltenname&gt;**: Beschreibt den Name der Spalte in der durch SENDER\_SOURCE beschriebenen Datenquelle, in der nach dem Wert <Wert> gesucht werden soll. Pro Sucheintrag können zwei Spaltennamen angegeben werden, die bei der Suche mit UND verknüpft werden.
- **&lt;Wert&gt;**: Beschreibt den Wert nach dem in der Spalte &lt;Spaltenname&gt; gesucht werden soll. Der Wert darf Variablen in der Form "${variablenname}" enthalten (z.B. "${user.name}@muenchen.de"). Vor der Suche wird die Variable aus einer anderen, durch &lt;BY_QUELLE&gt; beschriebenen Datenquelle ausgelesen.
- **&lt;BY_QUELLE&gt;**: Beschreibt die Datenquelle die für die Auflösung der Variablen aus &lt;Wert&gt; herangezogen werden sollen.

Folgende Quellen stehen dabei zur Verfügung:

### Die Quelle BY\_JAVA\_PROPERTY

Die Quelle BY\_JAVA\_PROPERTY verwendet für die Auflösung der in &lt;Wert&gt;
enthaltenen Variablen die Java-Methode System.getProperty(key).

Beispiel: Die Variable "${user.name}" enthält den Benutzernamen des aktuell angemeldeten Benutzers (z.B. "christoph.lutz" auf dem Linux Basisclient oder "lut" unter Windows).

Unter [http://java.sun.com/j2se/1.5.0/docs/api/java/lang/System.html#getProperties()](http://java.sun.com/j2se/1.5.0/docs/api/java/lang/System.html#getProperties)
befindet sich eine Liste aller Java-Properties, die standardmäßig in
Java verfügbar sind. Systemadministratoren können zusätzlich auch eigene
Properties definieren.

### Die Quelle BY\_OOO\_USER\_PROFILE

Die Quelle BY\_OOO\_USER\_PROFILE verwendet für die Auflösung der in
<Wert> enthaltenen Variablen die Werte, die in OpenOffice.org über
Extras&rarr;Optionen&rarr;OpenOffice.org&rarr;Benutzerdaten eingegeben
werden können.

Beispiel: Die Variable "${givenname}" enthält den Vornamen der im Feld "Vorname" eingetragen wurde (z.B. "Christoph").

Folgende Variablen stehen dabei zur Verfügung:

```
c: <Land/Region>
facsimiletelephonenumber: <Fax>
givenname: <Vorname>
homephone: <Tel. (Privat)>
initials: <kuerzel>
l: <Ort>
mail: <E-Mail>
o: <Firma>
position: <Position>
postalcode: <PLZ>
sn: <Nachname>
street: <Straße>
telephonenumber: <Tel. (Geschäftlich)>
title: <Titel>
```

Menues und Symbolleisten
========================

Mit den Optionen in diesem Abschnitt können Sie die **WollMuxBar
"Vorlagen und Formulare" konfigurieren**. Sie können eigene
Menüstrukturen und die Inhalte der Symbolleiste festlegen.

Der Abschnitt Menueleiste
-------------------------

Der Abschnitt Menueleiste beschreibt alle Menues, die in der
WollMux-Leiste angezeigt werden sollen. Ein typischer
Menueleiste-Abschnitt sieht wie folgt aus:

```
Menueleiste(
     (LABEL "Standard" TYPE "menu" MENU "am_1_Standard" HOTKEY "S")
     (LABEL "Extras" TYPE "menu" MENU "am_4_eXtras" HOTKEY "X")
)
```

Der Abschnitt Menueleiste darf in der Konfigurationsdatei mehrfach
auftreten. Die WollMux-Leiste verwendet jedoch nur den zuletzt
definierten Abschnitt. Mit diesem Mechanismus kann der Abschnitt leicht
redefiniert werden. Sie können den Mechanismus verwenden, um das
standardmässig eingestellten Menüs "Standard" und "Extras" zu löschen,
umzubenennen oder ein weitere Menü hinzuzufügen.

Der Menueleiste-Abschnitt darf mehrere Einträge enthalten, die in der
gegebenen Reihenfolge im Menü angezeigt werden. Jeder Eintrag richtet
sich nach dem unter
[Menue-Elemente](#menue-elemente)
beschriebenen Schema. Dort sind auch die Attribute **LABEL**,
**HOTKEY**, **TYPE** und **MENUE** beschrieben.

Der Abschnitt Symbolleisten bzw. Briefkopfleiste
------------------------------------------------

Der Abschnitt Symbolleisten beschreibt den Inhalt der in der WollMuxBar
dargestellten Symbolleiste. Hier ist eine Beispiel für eine
Symbolleisten-Definition:

```
Symbolleisten(
  Briefkopfleiste(
      (LABEL "Absender auswählen" TYPE "senderbox")
      (LABEL "Externer Briefkopf" FRAG_ID "externerBriefkopf" HOTKEY "X" ACTION "openTemplate" TYPE "button" )
      (TYPE "separator")
      (LABEL "Interner Briefkopf" FRAG_ID "internerBriefkopf" HOTKEY "I" ACTION "openTemplate" TYPE "button" )
      (TYPE "separator")
      (LABEL "Kurzmitteilung"  FRAG_ID "kurzmitteilung" HOTKEY "K" ACTION "openTemplate" TYPE "button" )
      (TYPE "separator")
      (LABEL "Fax-Vorlage"        FRAG_ID "faxVorlage" HOTKEY "F" ACTION "openTemplate" TYPE "button" )
  )
)
```

Der Abschnitt Symbolleisten/Briefkopfleiste darf öfters in der
Konfigurationsdatei vorkommen. Auch hier gilt die Regel: Der zuletzt
definierte Eintrag gewinnt. So können Sie den vorgegebenen
Symbolleisten/Briefkopfleiste-Abschnitt redefinieren und eigene
Schaltflächen hinzufügen oder bestehende Schaltflächen entfernen. Bei
der Redefinition wird stets der gesamte Abschnitt Symbolleisten durch
den neuen Abschnitt ersetzt.

Die Menue-Elemente innerhalb der Symbolleistendefinition richten sich
nach dem unter
[Menue-Elemente](#menue-elemente)
beschriebenen Schema. Dort sind auch die Attribute **LABEL**,
**HOTKEY**, **TYPE** und **MENU** beschrieben.

Der Abschnitt Menues
--------------------

Der Abschnitt Menues beschreibt alle Untermenues, die der WollMuxBar
bekannt sein sollen. Eine Beispieldefinition sieht wie folgt aus:

```
Menues(
  LHMVorlagen( 
    Elemente(
       (LABEL "Briefköpfe" TYPE "menu" MENU "Briefkoepfe" HOTKEY "B" CONF_ID "bk")
       (LABEL "Favoriten" TYPE "menu" MENU "favoriten" FAVO "1")
       (TYPE "separator")
       (LABEL "Absenderdaten" TYPE "button" HOTKEY "A" ACTION "absenderAuswaehlen")
    )
  )

  Briefkoepfe( 
    Elemente(
       (LABEL "Externer Briefkopf"  FRAG_ID "externerBriefkopf" HOTKEY "X" ACTION "openTemplate" TYPE "button" )
       (LABEL "Interner Briefkopf"  FRAG_ID "internerBriefkopf" HOTKEY "I" ACTION "openTemplate" TYPE "button" )
       (LABEL "Kurzmitteilung"  FRAG_ID "kurzmitteilung" HOTKEY "K" ACTION "openTemplate" TYPE "button" )
       (LABEL "Fax-Vorlage"             FRAG_ID "faxVorlage" HOTKEY "F" ACTION "openTemplate" TYPE "button" )
    )
  )  
)
```

Der Abschnitt Menues darf innerhalb der Konfigurationsdatei mehrmals
auftauchen. In jedem Abschnitt ist es möglich **einzelne** Menues
hinzuzufügen oder zu redefinieren. Auch hier gilt die Regel: Die letzte
Definition gewinnt.

Der Menues-Abschnitt darf mehrere Einträge enthalten. Jeder Eintrag
repräsentiert ein Untermenü und die darin enthaltenen Elemente. Der Name
des Untermenues (im Beispiel "LHMVorlagen" und "Briefkoefpe") ist ein
Bezeichner mit dem für Bezeichner üblichen eingeschränkten Zeichensatz.
Jedes von Ihnen definierte Untermenue muss einen anderen Namen besitzen.

Die Menue-Elemente innerhalb einer Untermenue-Definition richten sich
nach dem unter
[Menue-Elemente](#menue-elemente)
beschriebenen Schema. Dort sind auch die Attribute **LABEL**,
**HOTKEY**, **TYPE** und **MENU** beschrieben.

### Menue-Elemente

Ein Menue-Element beschreibt die Eigenschaften und das Verhalten eines
Elements innerhalb eines Menueleiste-, Symbolleiste- und
Menues-Abschnitts. Menue-Elemente besitzen folgende Eigenschaften:

#### Das Attribut TYPE

Das Attribut TYPE ist das wichtigste Attribut eines Menue-Elements. Es
**muss** in jedem Menue-Element vorkommen. Anhand des Attributwerts
entscheidet der WollMux, welche weiteren Attribute auszuwerten sind.

Folgende Typen sind möglich:

- **button**: Beschreibt ein einfaches Menue-Element, das eine Aktion
    hervorruft, wenn darauf geklickt wird.
- **menu**: Beschreibt ein Untermenue, das beim Klicken auf das
    Menue-Element aufgeklappt werden soll.
- **separator**: Beschreibt einen Trennstrich innerhalb eines Menues
    oder einer Symbolleiste.
- **glue**: Ist ein unsichtbares Element, das dazu dient, Leerraum
    einzufügen (und dadurch Links- bzw. Rechtsbündigkeit zu erreichen).
- **senderbox**: Beschreibt die ComboBox "Absender-Auswählen", die die
    Liste aller in der persönlichen Absenderliste enthaltenen
    Absender zeigt.
- **searchbox**: Beschreibt ein Such-Eingabefeld, mit dem die Elemente
    in der WollMuxBar dursucht werden können.

#### Das Attribut LABEL

Das Attribut LABEL enthält die in der WollMuxBar dargestellte
Bezeichnung des Menue-Elements. Jedes Menue-Element mit dem Typ "button"
oder "menue" **muss** ein LABEL-Attribut besitzen.

#### Das Attribut HOTKEY

Das Attribut HOTKEY beschreibt die Taste, die als *shortcut* zum
Aufrufen der Funktion des Menue-Elements angeboten werden soll. Die
HOTKEY's werden unter Windows nur dargestellt, wenn die ALT-Taste
gedrückt wird, da jeder Hotkey an die ALT-Taste gebunden ist. Jedes
Menue-Element mit dem Typ "button" oder "menue" kann ein HOTKEY-Attribut
besitzen.

#### Das Attribut MENU

Das Attribut MENU enthält den Bezeichner des im Abschnitt Menues
definierten Untermenues, das beim Klick auf dieses Menue-Element
aufgeklappt werden soll. Jedes Menue-Element mit dem Typ "menu" **muss**
ein MENU-Attribut besitzen.

#### Das Attribut FAVO

Das Attribut FAVO kann den Wert "1" oder "0" haben. Ist FAVO "1" so wird
das Menü vom [Menü-Manager](WollMuxBar.md#menü-manager) als
Favoriten-Menü behandelt. FAVO "0" ist das selbe wie FAVO wegzulassen.

#### Das Attribut ACTION

Das Attribut ACTION beschreibt die Aktion, die beim Klick auf ein
einfaches Menue-Element (mit dem Typ "button") ausgeführt werden soll.

Derzeit sind folgende Aktionen möglich:

- *openTemplate*: Öffnet ein definiertes Textfragment als
    neue Dokumentvorlage. Erfordert die Angabe des Attributs FRAG\_ID.
- *openDocument*: Öffnet ein definiertes Textfragment als
    Dokument, d.h. die Datei wird direkt zum Bearbeiten geöffnet, ohne
    dass ein neues Dokument "UnbenanntX" angelegt wird. Erfordert die
    Angabe des Attributs FRAG\_ID.
- *open*:
> **WARNING** Diese Aktion wird nicht länger unterstützt.
- *openExt*: Öffnet eine Datei oder URL mit einer externen Anwendung.
    Erfordert die Angabe des Attributs EXT, das die externe Anwendung
    identifiziert (typischerweise die Dateierweiterung) sowie des
    Attributs URL, das die zu öffnende URL angibt. Zur korrekten
    Funktionsweise ist ein Eintrag für die externe Anwendung im
    Abschnitt
    [ExterneAnwendungen](#externeanwendungen)
    erforderlich.

    In der URL kann die Variable `${user.home}` verwendet werden. Diese
    wird ersetzt durch die mit "file:" beginnende URL des
    Home-Verzeichnisses (unter Windows `C:\Dokumente und Einstellungen\<Benutzer>`, unter Linux `/home/<Benutzer>`).
-   *absenderAuswaehlen*: Öffnet das Dialogfenster "Absender Auswählen".
-   *dumpInfo*: erzeugt eine Datei `$HOME/.wollmux/dump<DatumUndZeit>`,
    die wichtige Informationen für die Fehlersuche im Zusammenhang mit
    dem WollMux enthält. DumpInfo ist vor allem für
    WollMux-Administratoren geeignet, die bei der Installation und
    Einrichtung des WollMux auf Fehler stoßen, für deren Lösung
    Unterstützung durch D-III-ITD 5.1 notwendig wird. In diesem Fall ist
    die über dumpInfo erzeugte dump-Datei an ein entsprechendes
    Vorfallticket anzuhängen.
-   *kill*: Beendet die WollMuxBar und OpenOffice.org OHNE(!)
    jede Sicherheitsabfragen. Ein entsprechender Kill-Button sollte
    niemals für Endanwenderinnen und Endanwender sichtbar sein, sondern
    ausschließlich zur Unterstützung der Einrichtung und des Tests des
    WollMux von Systemadministratoren verwendet werden.

>    **INFO** Trotz des martialischen Namens kann dieser Befehl keine hängenden
    OpenOffice.org Prozesse beenden.

-   *about*: Zeigt einen Dialog, der wichtige Versionsinformationen zum
    aktuell installierten WollMux, zur WollMuxBar und zur verwendeten
    Konfiguration enthält.
-   *menuManager*: Ruft den
    [Menü-Manager](WollMuxBar#menü-Manager) auf. Mit
    diesem kann die Menüstruktur der WollMuxBar bearbeitet werden. Unter
    anderem können Benutzer dadurch ihr Favoriten-Menü pflegen.
-   *options*: Ruft den
    [Optionen-Dialog](WollMuxBar#optionen-dialog) der
    WollMuxBar auf. Über diesen kann unter anderem das
    [Fensterverhalten](#wollmuxbar-fenster)
    eingestellt und die aktiven Menügruppen gewählt werden.

#### Das Attribut EXT

Das Attribut EXT muss in Verbindung mit der Aktion "**openExt**"
angegeben werden. Es identifiziert den Eintrag im Abschnitt
[ExterneAnwendungen](#externeanwendungen),
der zum Öffnen der URL herangezogen werden soll.

#### Das Attribut URL

Das Attribut URL muss in Verbindung mit der Aktion "**openExt**"
angegeben werden. Es gibt an, welche URL der externen Anwendung als
Argument übergeben werden soll, bzw. von welcher URL Daten in eine
temporäre Datei heruntergeladen werden sollen, deren Pfad dann an die
externe Anwendung übergeben wird. Nähere Informationen finden sich bei
der Beschreibung des Abschnitts
[ExterneAnwendungen](#externeanwendungen).

#### Das Attribut FRAG\_ID

Das Attribut FRAG\_ID muss in Verbindung mit den Aktionen
"**openTemplate**" und "**openDocument**" angegeben werden. FRAG\_ID
enthält dabei die ID des Textfragments, welches im
[Textfragmente-Abschnitt](#textfragmente)
der Konfigurationsdatei definiert sein muss.

##### Liste mit FRAG\_ID-Attributen

Manchmal ist es wünschenswert, die Inhalte zweier Textfragmente zusammen
zu mischen. Um das zu erreichen, können Sie in einer
Element-Beschreibung mehrere FRAG\_ID-Attribute angeben. Dies sieht z.B.
wie folgt aus:

```
(LABEL "Baugenehmigung (Auf Basis des externen Briefkopfs)" HOTKEY "F" ACTION "openTemplate" TYPE "button"
  FRAG_ID "externerBriefkopf" FRAG_ID "Baugenehmigung" FRAG_ID "...noch_mehr_fragmente...")
```

Beim Klick auf den so definierten Button wird zunächst das erste
Fragment der FRAG\_ID-Liste (im Beispiel "externerBriefkopf") als
Vorlage geöffnet. Anschließend führt der WollMux alle in der Vorlage
enthaltenen
[Dokumentkommandos](Dokumentkommandos_des_WollMux.md) aus.
Enthält die Vorlage das Dokumentkommando
[insertContent](Dokumentkommandos_des_WollMux.md#das-kommando-insertcontent),
so wird das nächste Textfragment aus der FRAG\_ID-Liste (im Beispiel
"Baugenehmigung") an dieser Stelle eingefügt und dessen
Dokumentkommandos ausgeführt, usw... Jedes Textfragment darf dabei genau
ein *insertContent* Kommando besitzen. Ist das Ende der FRAG\_ID-Liste
erreicht und der WollMux stößt im letzten eingefügten Textfragment
(trotzdem) auf ein weiteres *insertContent*-Kommando, so wird dieses
Dokumentkommando ignoriert.

#### Das Attribut CONF\_ID

Über das Attribut CONF\_ID kann einem Menü, Untermenü oder beliebigen
anderen Element eine Menügruppe zugeordnet werden. Elemente mit CONF\_ID
werden nur angezeigt, wenn die entsprechende Menügruppe aktiv ist.
Menügruppen werden über den [Abschnitt WollMuxBarKonfigurationen](Konfigurationsdatei_wollmux.conf#Der_Abschnitt_WollMuxBarKonfigurationen)
bzw. über den [Optionen-Dialog](WollMuxBar.md#optionen-dialog)
aktiviert.

> **INFO** Das Attribut CONF\_ID kann bei dem selben Element mehrfach vorkommen und sowohl ein einzelner String als auch eine Liste sein. Alle CONF\_IDs werden zu einer Liste vereinigt. Damit das Element angezeigt wird reicht es aus, wenn eine einzige CONF\_ID aus dieser Liste unter den aktiven Menügruppen ist.

Der Abschnitt WollMuxBarKonfigurationen
---------------------------------------

Der Abschnitt WollMuxBarKonfigurationen definiert die Menü-Gruppen, die
der Benutzer im [Optionen-Dialog](WollMuxBar.md#optionen-dialog)
aktivieren und deaktivieren kann. Eine Beispieldefinition sieht wie
folgt aus:

```
WollMuxBarKonfigurationen(
  Labels(
    (CONF_ID "bienchen" LABEL "Vorlagen für fleißige Bienchen")
    (CONF_ID "limux"    LABEL "Vorlagen für fleißige Pinguine")
  )
  Aktiv("bienchen", "limux")
)
```

- Im Unterabschnitt "Labels" werden die verfügbaren CONF\_IDs
    deklariert und mit Labels versehen. Die Labels werden für die
    Anzeige im Options-Dialog verwendet.
- Alle WollMuxBarKonfigurationen/Labels-Abschnitte werden vereinigt.
    Die jeweils letzte Definition eines Labels für eine ID gewinnt.
- Der Unterabschnitt Labels kann über den
    [Menü-Manager](WollMuxBar.md#menü-manager)
    bearbeitet werden.
- Der Unterabschnitt "Aktiv" bestimmt die Menügruppen, deren Elemente
    angezeigt werden. Es können sowohl Menüs als auch Buttons und andere
    Menüeinträge mit entsprechenden CONF\_ID-Attributen versehen werden.
    Alle Menüs, Untermenüs, Buttons und sonstige Menüeinträge mit einer
    CONF\_ID, die *nicht* im Abschnitt WollMuxBarKonfigurationen/Aktiv
    aufgelistet sind werden nicht angezeigt.
- Es wird nur der letzte
    WollMuxBarKonfigurationen/Aktiv-Abschnitt verwendet.
- Die aktiven CONF\_IDs können über den
    [Optionen-Dialog](WollMuxBar.md#optionen-dialog)
    ausgewählt werden.

Fenster
=======

Mit dem Abschnitt *Fenster* können Sie Position, Größe und Eigenschaften
verschiedener im Rahmen des WollMux auftretender Fenster festlegen.

WollMuxBar-Fenster
------------------

Zur Konfiguration der Fenster-Eigenschaften der WollMux-Leiste gibt es
den Abschnitt *WollMuxBar*. Folgendes Beispiel zeigt einen
WollMuxBar-Abschnitt mit allen zur Verfügung stehenden
Konfigurationsoptionen.

```
Fenster(
  WollMuxBar(
    TITLE "Vorlagen und Formulare"
    MODE "UpAndAway"
    TRAYICON "None"
    X "0"
    Y "0"
    WIDTH "1280" 
    HEIGHT "82"
  )
)
```

### TITLE

Legt den Fenstertitel fest.

### MODE

Legt fest, wie sich die WollMuxBar verhalten soll, wenn sie den
Eingabefokus verliert (d.h. wenn ein anderes Fenster in den Vordergrund
kommt). Folgende Modi stehen zur Verfügung:

- *UpAndAway*: Die Leiste erscheint am oberen Bildschirmrand. Wenn der
    Mauscursor die Leiste verlässt, schrumpft sie zu einem
    kleinen Strich. Wird dieser Strich von der Maus berührt, so wird die
    Leiste wieder groß.
- *AlwaysOnTop*: Die WollMuxBar schwebt über allen anderen Fenstern
    und wird nie verdeckt.
- *Window*: Die WollMuxBar verhält sich wie ein ganz normales
    Fenster, d.h. sie kann ganz oder teilweise durch andere Fenster
    verdeckt werden.
- *Minimize*: Wenn die WollMuxBar den Fokus verliert minimiert sie
    sich automatisch. Bei Klick auf den entsprechenden Button in der
    Taskleiste am unteren Rand des Bildschirms erscheint sie wieder.

### TRAYICON

Legt fest, ob für die WollMuxBar ein Tray-Icon auf der System Tray (auch
bekannt als "Notification Area" - gemeint ist der Bereich üblicherweise
ganz rechts auf der Taskbar neben der Uhrzeitanzeige) angezeigt werden
soll und welche Funktionalitäten dieses Tray-Icon bereit stellt:

- *None*: Kein Tray-Icon für die WollMuxBar. Dies ist
    die Standard-Einstellung.
- *Iconify*: Die WollMuxBar wird beim Minimieren auf das Tray-Icon
    ikonifiziert (d.h. es ist dann kein Programmfenster für die
    WollMuxBar und kein Eintrag auf der Taskbar mehr zu sehen). Die
    WollMuxBar kann wieder hergestellt werden, indem mit der linken
    Maustaste auf das Tray-Icon geklickt wird. Bei einem Fenstermodus
    wie *UpAndAway* und *Minimize*, bei dem die WollMuxBar automatisch
    minimiert bzw. auf einen kleinen Strich verkleinert wird, wird die
    WollMuxBar nun entsprechend automatisch ikonifiziert.
- *Popup*: Durch Mittel- oder Rechtsklick auf das Tray-Icon kann ein
    Kontextmenü aufgerufen werden, das alle Elemente der Menüleiste der
    WollMuxBar enthält. Dieses Kontextmenü kann als bequemer Shortcut
    zum Aufrufen von Vorlagen verwendet werden ohne dass die eigentliche
    WollMuxBar angezeigt werden muss.
- *IconifyAndPopup*: Kombiniert die Eigenschaften der Tray-Icon-Modi
    *Iconify* und *Popup*.

### X, Y, WIDTH, HEIGHT

Legen fest, wo die WollMuxBar auf dem Bildschirm erscheinen soll. Neben
Zahlenwerten (in Pixeln) werden die Spezialwerte "max" (der größte
sinnvolle Wert) und "min" (der kleinste sinnvolle Wert) und für X und Y
auch noch der Spezialwert "center" unterstützt. Für alle Angaben ist
auch noch der Wert "auto" erlaubt, der dem Weglassen der Angabe
entspricht.

Writer-Fenster (Der Abschnitt Textdokument)
-------------------------------------------

Die Eigenschaften von Writer-Fenstern lassen sich über den Abschnitt
*Textdokument* festlegen. Enthält die Konfigurationsdatei diesen
Abschnitt nicht, so wird die Fensterverwaltung wie gewohnt OpenOffice
überlassen.

```
Fenster(
  Textdokument(
    X "0"
    Y "40"
    ZOOM "PageWidthExact"
  )
)
```

Im Abschnitt Textdokument sind folgende Attribute möglich, dabei sind
alle Attribute optional:

### X, Y

Die Position der linken oberen Ecke des Fensters auf dem Bildschirm. Es
müssen stets beide Attribute X und Y angegeben sein, damit die Werte
gesetzt werden.

### WIDTH, HEIGHT

Die Größe des Fensters auf dem Bildschirm. Es müssen stets beide
Attribute WIDTH und HEIGHT angegeben sein, damit die Werte gesetzt
werden.

### ZOOM '&lt;zoomwert&gt;'

Über die ZOOM-Angabe kann der Maßstab festgelegt werden, mit dem
Writer-Fenster standardmäßig dargestellt werden. Für den *&lt;zoomwert&gt;*
sind folgende Werte möglich, die sich genauso verhalten wie die
entsprechenden Einstellungen, die unter "Ansicht&rarr;Maßstab" gesetzt
werden können:

- **Eine Prozentangabe**: Über die Angabe einer ganzzahligen Prozentzahl
    (ohne Prozentzeichen) wird ein fester Zoomfaktor vorgeben.
- **PageWidth**: Mit dem Zoomwert "PageWidth" wird die Seite so im
    Fenster ausgerichtet, dass sie zwischen dem linken und dem rechten
    Seitenrand der Breite nach vollständig dargestellt werden kann. Über
    einen zusätzlichen sichtbaren Freiraum zwischen dem Fenster und den
    Seitenrändern wird die Seite zusätzlich optisch hervorgehoben. Im
    Regelfall ist mit dieser Einstellung die Seite der Länge nach nicht
    vollständig sichtbar.
- **PageWidthExact**: Der Zoomwert "PageWidthExact" verhält sich wie
    "PageWidth", nur dass hier der Freiraum zur optischen Hervorhebung
    der Seite verschwindet und die Seite zwischen dem linken und dem
    rechten Seitenrand exakt im Fenster dargestellt wird.
- **Optimal**: Der Zoomwert "Optimal" verhält sich wie "PageWidth",
    allerdings orientiert sich die Ausrichtung an Stelle des linken und
    rechten Seitenrands am linken und rechten Rand des
    sichtbaren Textbereiches. Der sichtbare Textbereich wird damit in
    der maximalen möglichen Größe im Fenster dargestellt, so dass alle
    wichtigen Elemente des Dokuments angezeigt werden können ohne nach
    links oder rechts scrollen zu müssen.
- **EntirePage**: Die Seite wird vollständig im entsprechenden
    Fenster angezeigt. Allerdings leidet in diesem Zustand auch die
    Lesbarkeit der Schrift.

Formular-Fenster (Der Abschnitt Formular)
-----------------------------------------

Die Eigenschaften von WollMux-Formularfenstern lassen sich über den
Abschnitt *Formular* festlegen.

```
Fenster(
  Formular(
    ZOOM "55"
    Y "96"
    WIDTH "400"
    HEIGHT "600"
  )
)
```

### ZOOM

Die ZOOM Angabe spezifiziert den Zoom-Faktor des neben der Formularmaske
dargestellten Writer-Fensters. Das Attribut verhält sich wie das
[gleichnamige Attribut des "Textdokumente"-Abschnitts](#zoom-zoomwert).

### X, Y

Bestimmt die Positionierung der Eingabemaske. Erlaubt sind folgende
Angaben:

- *<Zahlenwert>*: gibt die genaue Position in Pixeln an, gemessen von
    der oberen linken Ecke (0,0) des Bildschirms.
- *center*: Die Eingabemaske wird so positioniert, dass ihre Mitte mit
    der Mitte der X bzw. Y-Achse zusammenfällt.
- *min*: Fenster wird ganz oben bzw. ganz links positioniert.
- *max*: Fenster wird ganz unten bzw. ganz rechts positioniert.
- *auto*: Koordinate automatisch bestimmen. Dies ist das
    Standardverhalten, wenn überhaupt keine X bzw. Y Angabe
    vorhanden ist.

### WIDTH, HEIGHT

Gibt die Dimensionen der Eingabemaske an. Folgende Angaben sind
zulässig:

- *<Zahlenwert>*: Gibt die Breite/Höhe in Pixeln an.
- *max*: Die Breite/Höhe wird so groß wie möglich.
- *auto*: Dimension automatisch bestimmen. Dies ist das
    Standardverhalten, wenn überhaupt keine WIDTH bzw. HEIGHT Angabe
    vorhanden ist.

Funktionen
==========

Der WollMux verwendet an verschiedenen Stellen Funktionen, z.B. als
Plausibilitätsprüfungen für Formularfelder. Funktionen, die in der
wollmux.conf im Abschnitt *Funktionen* definiert werden sind global
verfügbar.

```
Funktionen(
  AnredeText(EXTERN(URL "vnd.sun.star.script:WollMux.Trafo.MannOderFrau?language=Basic&location=application" 
       PARAMS("Anrede", "SuffixWeibl", "SuffixMaennl")))

  AnredeText(EXTERN(URL "java:de.muenchen.allg.itd51.wollmux.func.Standard.zahlenBereich" 
       PARAMS("wert", "min", "max")))

  IstZahl(MATCH(VALUE('Argument'), "[0-9]+"))
`)
```

**Bemerkungen:**

- Jeder Eintrag des Abschnitts besteht aus einem Funktionsbezeichner
    gefolgt von der eigentlichen Funktionsdefinition eingeschlossen in
    Klammern
- Funktionen können redefiniert werden.
- Innerhalb der Definition einer Funktion *func* gilt noch eine evtl.
    vorhandene vorhergehende Funktionsdefinition für *func*, d.h.
    Rekursion ist nicht möglich, jedoch das Redefinieren einer Funktion
    unter Bezugnahme auf die vorherige Definition.
- Gibt es mehrere *Funktionen*-Abschnitte in der wollmux.conf, so
    werden diese alle in der Reihenfolge ihres
    Auftretens berücksichtigt.
- Funktionen liefern grundsätzlich immer Strings zurück. Falls in
    einem Kontext ein Wahrheitswert erforderlich ist, so wird der String
    "true" als wahr, jeder andere String als falsch betrachtet.
    Funktionen, die ihrer Natur nach einen Wahrheitswert zurückliefern
    (wie z.B. AND) liefern die Strings "true" und "false" zurück.
- Falls bei der Abarbeitung einer Funktion ein Fehler auftritt,
    liefert die Funktion einen Fehlerstring. Dies dient dazu, den
    Anwender auf das Problem aufmerksam zu machen, damit er die
    Systembetreuung einschaltet. So wird verhindert, dass z.B.
    stillschweigend falsche Daten in ein Formular eingefügt werden.

    > **WARNING** Der Fehlerstring kann sich jederzeit ändern (und
    dies ist auch bereits schon geschehen). Es dürfen also keine
    direkten Vergleiche gegen diesen String durchgeführt werden. Zum
    Testen, ob eine Funktion einen Fehler geliefert hat stehen die
    Funktionen ISERROR und ISERRORSTRING zur Verfügung. Um im Fehlerfall
    ein spezielles Ergebnis anstatt des Fehlerstrings zurückzuliefern
    kann SELECT verwendet werden.

Grundfunktionen
---------------

Jede Funktion setzt sich aus einer oder mehrerer Grundfunktionen
zusammen. Jede Grundfunktion besteht aus einem Bezeichner in
Großbuchstaben, gefolgt von ihren Parametern (in Klammern, falls es mehr
als einer ist). Im allgemeinen kann für jeden Parameter wieder eine
beliebige Funktionsdefinition eingesetzt werden. Manche Parameter haben
hier jedoch Einschränkungen. Im folgenden sind die verfügbaren
Grundfunktionen beschrieben.

**[Stringverarbeitung](#stringverarbeitung)**

- [String](#string) - ein
    String-Literal ist die einfachste Grundfunktion.
- [LENGTH](#length-argument1--argumentn) -
    liefert die Länge (in Zeichen) eines Strings.
- [MATCH](#match-argument-regex) -
    testet, ob ein String einem durch einen regulären Ausdruck gegebenen
    Muster entspricht.
- [REPLACE](#replace-argument-regex-repstr) -
    ersetzt Teile eines Strings mit Hilfe von regulären Ausdrücken.
- [SPLIT](#split-argument-regex-index) -
    Teile Strings mit Hilfe von regulären Ausdrücken auf in mehrere
    Teile und liefere einen dieser Teile zurück.
- [CAT](#cat-argument1--argumentn) -
    verkettet mehrere Strings zu einem langen String.
- [FORMAT](#formatargument-min-minstellen-max-maxstellen) -
    formatiert Zahlenwerte auf eine minimale und/oder maximale Anzahl
    von Nachkommastellen.

**[Arithmetik](#arithmetik)**

- [SUM](sum-argument1--argumentn) -
    bildet die Summe aus einer Reihe von Zahlenwerten.
- [DIFF](#diff-argument1--argumentn) -
    subtrahiert von einem Zahlenwert einen oder mehrere
    andere Zahlenwerte.
- [PRODUCT](#product-argument1--argumentn) -
    bildet das Produkt aus einer Reihe von Zahlenwerten.
- [DIVIDE](#dividedividend-bydivisor-min-minstellen-max-maxstellen) -
    berechnet den Quotienten aus 2 Zahlenwerten mit beliebig
    vorgebbarer Genauigkeit.
- [ABS](#abs-argument1--argumentn) -
    berechnet den absoluten Betrag eines Zahlenwerts.
- [SIGN](#sign-argument1--argumentn) -
    liefert -1, 0, +1 je nachdem, ob das Argument negativ, 0 oder
    positiv ist.

**[Vergleiche](#vergleiche)**

- [ISERROR](#iserror-funktion) -
    testet, ob eine Funktion einen Fehler zurückliefert.
- [ISERRORSTRING](#iserrorstring-funktion) -
    vergleicht einen String mit dem speziellen Fehler-String.
- [STRCMP](#strcmp-argument1--argumentn) -
    vergleicht 2 oder mehr Strings.
- [NUMCMP](#numcmp-argument1--argumentn-margin-maxabweichung-) -
    vergleicht 2 oder mehr Zahlenwerte.
- [LT](#lt-argument1--argumentn-margin-maxabweichung-) -
    prüft, ob zwischen der ersten Zahl und den folgenden Zahlen die &lt; Beziehung besteht.
- [LE](#le-argument1--argumentn-margin-maxabweichung-) -
    prüft, ob zwischen der ersten Zahl und den folgenden Zahlen die &lt;= Beziehung besteht.
- [GT](#gt-argument1--argumentn-margin-maxabweichung-) -
    prüft, ob zwischen der ersten Zahl und den folgenden Zahlen die &gt; Beziehung besteht.
- [GE](#ge-argument1--argumentn-margin-maxabweichung-) -
    prüft, ob zwischen der ersten Zahl und den folgenden Zahlen die &gt;= Beziehung besteht.

**[Logische Verknüpfungen](#logische-verknüpfungen)**

- [AND](#and-funktion1--funktionn) -
    liefert "true" gdw. alle enthaltenen Funktionen "true" liefern.
- [OR](#or-funktion1--funktionn) -
    liefert "true" gdw. mindestens eine der enthaltenen Funktionen
    "true" liefert.
- [NOT](#not-funktion1--funktionn) -
    liefert "true" gdw. keine der enthaltenen Funktionen "true" liefert.

**[Ablaufsteuerung/Kontrollfluss](#ablaufsteuerungkontrollfluss)**

- [IF](#if-bedingung-then-dann-else-sonst-) -
    testet eine Bedingung und liefert bei "true" den THEN-Teil, bei
    "false" den ELSE-Teil als Ergebnis.
- [SELECT](#select-funktion1--funktionn) -
    wählt aus einer Reihe von Funktionen einen Wert aus, typischerweise
    abhängig von Bedingungen.

**[Funktionen für Formulare](#funktionen-für-formulare)**

- [VALUE](#value-argument) -
    liefert den Wert eines Formularfeldes.
- [DIALOG](#dialog-dialogname-feldname) -
    liefert einen über einen Funktionsdialog ausgewählten Wert.

**[Zugriff auf externe Funktionen](#zugriff-auf-externe-funktionen)**

- [EXTERN](#extern-url-url-paramsparam1--paramn) -
    ermöglicht den Zugriff auf externe Java oder Basic-Funktionen.
- [BIND (mit Funktionsname)](#bind-function-funktionsname-setparamname1-wert1--setparamnamen-wertn) -
    ruft eine global im Funktionen-Abschnitt definierte externe Funktion mit Parametern auf.
- [BIND (mit Funktion)](#bind-functionfunktion-setparamname1-wert1--setparamnamen-wertn) -
    ruft eine inline deklarierte (externe) Funktion mit Parametern auf.

Stringverarbeitung
------------------

### String

Die einfachste Grundfunktion ist ein einfacher String. Jedes Element,
das keine Unterelemente hat, wird als String betrachtet.

```
Funktionen(
   SimplerText1("Dies ist ein einfacher Text")
   SimplerText2 "Die Klammern können wegfallen, weil SimplerText2 nur ein Unterelement hat"
   SimplerText3( AND()  )    #Dies ist das selbe wie SimplerText3( "AND" )
)
```

Beachten Sie insbesondere das Beispiel SimplerText3. Auch wenn es so
aussieht, als würde hier die Grundfunktion AND verwendet, ist dies nicht
der Fall. Die Grundfunktion AND erwartet mindestens einen Parameter.
Alles was keinen Parameter hat wird als einfacher String betrachtet
(auch wenn es nicht in Gänsefüßchen steht). Dementsprechend liefert die
Funktion SimplerText3 den String "AND" zurück. Achtung! Technisch
gesehen handelt es sich bei dem AND im letzten Beispiel um einen
Schlüssel und es gelten die Einschränkungen für Schlüssel (z.B. keine
Umlaute). Es ist davon abzuraten, diese Schreibweise zu verwenden.

### LENGTH (&lt;Argument1&gt; ... &lt;ArgumentN&gt;)

Die Funktion LENGTH erwartet ein oder mehrere Argumente. Diese werden
alle ausgewertet und zu einem langen String verkettet. Die Länge dieses
Strings (in Zeichen) wird zurückgeliefert. Alle Argumente können
beliebige Funktionen sein. Falls eine der Funktionen einen Fehler
liefert liefert LENGTH einen Fehler.

### MATCH (&lt;Argument&gt;, &lt;RegEx&gt;)

Die Funktion MATCH liefert "true", wenn &lt;Argument&gt; als Ganzes auf den
regulären Ausdruck &lt;RegEx&gt; passt. Die Syntax von &lt;RegEx&gt; folgt der eines
[Java-Patterns](http://java.sun.com/j2se/1.5.0/docs/api/java/util/regex/Pattern.html#sum).
Falls die Funktion &lt;Argument&gt; einen Fehler liefert, liefert MATCH einen
Fehler. Für &lt;Argument&gt; kann eine beliebige Funktion verwendet werden.
Für &lt;RegEx&gt; darf nur eine Funktion verwendet werden, die zum Zeitpunkt
der Funktionsdefinition bereits auswertbar ist, d.h. eine Funktion die
keine Parameter aus dem Kontext (z.B. Werte von Formularfeldern)
benötigt. Normalerweise sollten für &lt;RegEx&gt; nur einfache Strings
verwendet werden.

```
Funktionen(
  IstZahl(MATCH(VALUE('Argument'), "[0-9]+"))
  IstHerr(MATCH(VALUE('Anrede'), "Herrn?"))
)
```

> **INFO** Für den einfachen Vergleich zweier Strings auf Gleichheit sollte die MATCH-Funktion nicht verwendet werden, da es hier leicht zu Fehlern kommen kann, wenn im zweiten Argument Zeichen verwendet werden, die in regulären Ausdrücken eine besondere Bedeutung haben. Für den einfachen Vergleich zweier Strings steht die Funktion STRCMP zur Verfügung.

### REPLACE (&lt;Argument&gt;, &lt;RegEx&gt;, &lt;RepStr&gt;)

Die Funktion REPLACE ersetzt alle Vorkommen von &lt;RegEx&gt; in &lt;Argument&gt;
durch &lt;RepStr&gt;. Die Syntax von &lt;RegEx&gt; folgt der eines
[Java-Patterns](http://java.sun.com/j2se/1.5.0/docs/api/java/util/regex/Pattern.html#sum).
Die Syntax von &lt;RepStr&gt; entspricht der [Java-Funktion replaceAll()](http://java.sun.com/j2se/1.5.0/docs/api/java/util/regex/Matcher.html#replaceAll(java.lang.String)).

Achtung: Die Zeichen $ und \\ haben in &lt;RepStr&gt; spezielle Bedeutung!

Falls die Funktion &lt;Argument&gt; oder die Funktion &lt;RepStr&gt; einen Fehler
liefert, liefert REPLACE einen Fehler. Für &lt;Argument&gt; kann eine
beliebige Funktion verwendet werden. Für &lt;RegEx&gt; darf nur eine Funktion
verwendet werden, die zum Zeitpunkt der Funktionsdefinition bereits
auswertbar ist, d.h. eine Funktion die keine Parameter aus dem Kontext
(z.B. Werte von Formularfeldern) benötigt. Normalerweise sollten für
&lt;RegEx&gt; nur einfache Strings verwendet werden.

```
Funktionen(
  WhitespaceToSpace(REPLACE(VALUE('Argument'), "\p{Space}", " "))
)
```

### SPLIT (&lt;Argument&gt;, &lt;RegEx&gt;, &lt;Index&gt;)

Die Funktion SPLIT sucht im String &lt;Argument&gt; nach Vorkommen von
&lt;RegEx&gt;, teilt den String an diesen Stellen in durchnummerierte
Einzelteile auf (die den durch &lt;RegEx&gt; gefundenen Ausdruck nicht
enthalten) und liefert den Einzelteil mit der Nummer &lt;Index&gt; zurück. Die
Syntax von &lt;RegEx&gt; folgt der eines
[Java-Patterns](http://java.sun.com/j2se/1.5.0/docs/api/java/util/regex/Pattern.html#sum).
Der Index &lt;Index&gt; muss eine nicht negative ganze Zahl sein und startet
ab dem Wert "0" für das erste ermittelte Einzelteil. Ist der Index
größer als die Anzahl der ermittelten Einzelteile, so gibt die Funktion
den Leerstring zurück.

Falls die Funktion &lt;Argument&gt; einen Fehler liefert, liefert SPLIT einen
Fehler. Für &lt;Argument&gt; kann eine beliebige Funktion verwendet werden.
Für &lt;RegEx&gt; darf nur eine Funktion verwendet werden, die zum Zeitpunkt
der Funktionsdefinition bereits auswertbar ist, d.h. eine Funktion die
keine Parameter aus dem Kontext (z.B. Werte von Formularfeldern)
benötigt. Normalerweise sollten für &lt;RegEx&gt; nur einfache Strings
verwendet werden.

SPLIT lässt sich beispielsweise verwenden, um Leerzeilen aus der
Anschrift im Empfängerfeld zu entfernen (man beachte die doppelten
Zeilenvorschübe '%n' nach "Müller"):

`SPLIT("Herr Müller%n%nPostweg 32%n80331 München", "\n+", "0") --> "Herr Müller"`

`SPLIT("Herr Müller%n%nPostweg 32%n80331 München", "\n+", "1") --> "Postweg 32"`

`SPLIT("Herr Müller%n%nPostweg 32%n80331 München", "\n+", "2") --> "80331 München"`

`SPLIT("Herr Müller%n%nPostweg 32%n80331 München", "\n+", "3") --> ""`

### CAT (&lt;Argument1&gt; ... &lt;ArgumentN&gt;)

Die Funktion CAT erwartet ein oder mehrere Argumente. Diese werden alle
ausgewertet und zu einem langen String verkettet. Alle Argumente können
beliebige Funktionen sein. Falls eine der Funktionen einen Fehler
liefert liefert CAT einen Fehler.

Tip: CAT lässt sich gut mit IF kombinieren.

```
CAT(
  "Sehr geehrte" 
  IF(MATCH(VALUE("Anrede"), "Herr") THEN "r" )
  VALUE("Anrede")
  IF(NOT(MATCH(VALUE("Anrede"), "Damen und Herren")) THEN(VALUE("Nachname")) )
)
```

### FORMAT(&lt;Argument&gt; MIN "&lt;MinStellen&gt;" MAX "&lt;MaxStellen&gt;")

Die Funktion FORMAT wertet &lt;Argument&gt; aus und interpretiert den
Rückgabewert als Zahl. Falls diese Zahl mehr als &lt;MaxStellen&gt;
Nachkommastellen hat, so wird sie auf diese Zahl von Nachkommastellen
gerundet. Falls die Zahl weniger als &lt;MinStellen&gt; Nachkommastellen hat,
so wird sie mit 0ern auf die entsprechende Zahl von Nachkommastellen
aufgefüllt.

&lt;Argument&gt; kann eine beliebige Funktion sein. Für &lt;MinStellen&gt; und
&lt;MaxStellen&gt; sind nur String-Literale zulässig. &lt;MinStellen&gt; und
&lt;MaxStellen&gt; sind beide optional. Default-Wert für &lt;MinStellen&gt; ist 0,
für &lt;MaxStellen&gt; 1024.

Falls bei der Auswertung ein Fehler auftritt oder &lt;Argument&gt; keine
legale Zahl zurückliefert, dann liefert FORMAT einen Fehler.

Hinweis: Als Dezimaltrennzeichen wird nur das zu den aktuellen Spracheinstellungen passende akzeptiert. Ist OpenOffice.org auf "Deutsch" eingestellt, so ist dies das Komma, im Falle von Englisch der Punkt.

> **INFO** Die Funktion FORMAT verhält sich identisch zu DIVIDE und erlaubt im Prinzip auch die Angabe eines Divisors mit BY. Im Sinne der Klarheit sollte sie jedoch nicht so verwendet werden.

Arithmetik
----------

- Für alle arithmetischen Funktionen gilt, dass als
    Dezimaltrennzeichen nur das zu den aktuellen Spracheinstellungen
    passende akzeptiert wird. Ist OpenOffice.org auf "Deutsch"
    eingestellt, so ist dies das Komma, im Falle von "Englisch"
    der Punkt. Die Ausgabe der arithmetischen Funktionen erfolgt
    ebenfalls immer mit dem entsprechenden Dezimaltrennzeichen.
- Der Zahlenbereich der Funktionen ist nicht beschränkt. Sie können
    beliebig große und beliebig kleine Zahlen verarbeiten.
- Mit Ausnahme der Funktion DIVIDE liefern alle arithmetischen
    Funktionen immer ein exaktes Ergebnis ohne Rundungsfehler. Bei
    DIVIDE muss zwingend angegeben werden, auf wieviele Stellen genau
    das Ergebnis berechnet werden soll.
- Das Ergebnis der arithmetischen Funktionen wird immer mit der
    minimal erforderlichen Anzahl an Nachkommastellen
    zurückgeliefert (z.B. SUM("1.00", "1.0000") = "2"). Ausnahme ist die
    Funktion DIVIDE, bei der man optional eine minimale Anzahl an
    Nachkommastellen angeben kann. Für alle anderen Funktionen lässt
    sich die Darstellung mit der Funktion FORMAT anpassen.

### SUM (&lt;Argument1&gt; ... &lt;ArgumentN&gt;)

Die Funktion SUM wertet alle Argumente aus, interpretiert die Ergebnisse
als Zahlen, bildet daraus die Summe und liefert diese zurück. Als
Argumente sind beliebige Funktionen zulässig. Falls eine der Funktionen
einen Fehler oder keine legale Zahl liefert, so liefert SUM einen
Fehler.

### MINUS (&lt;Argument1&gt; ... &lt;ArgumentN&gt;)

Die Funktion MINUS wertet alle Argumente aus, interpretiert die
Ergebnisse als Zahlen, bildet daraus die Summe und liefert diese *mit
umgekehrtem Vorzeichen* zurück (Beispiel: MINUS("1", "3") = "-4"). Als
Argumente sind beliebige Funktionen zulässig. Falls eine der Funktionen
einen Fehler oder keine legale Zahl liefert, so liefert MINUS einen
Fehler.

### DIFF (&lt;Argument1&gt; ... &lt;ArgumentN&gt;)

Die Funktion DIFF wertet alle Argumente aus und interpretiert die
Ergebnisse als Zahlen. Zur Berechnung des Ergebnisses wird das erste
Argument genommen und davon werden alle weiteren Argumente subtrahiert.
Falls nur 2 Argumente angegeben sind, entspricht das Ergebnis also der
Differenz der beiden. Es müssen mindestens 2 Argumente angegeben werden.
Als Argumente sind beliebige Funktionen zulässig. Falls eine der
Funktionen einen Fehler oder keine legale Zahl liefert, so liefert DIFF
einen Fehler.

### PRODUCT (&lt;Argument1&gt; ... &lt;ArgumentN&gt;)

Die Funktion PRODUCT wertet alle Argumente aus, interpretiert die
Ergebnisse als Zahlen, bildet daraus das Produkt und liefert dieses
zurück. Als Argumente sind beliebige Funktionen zulässig. Falls eine der
Funktionen einen Fehler oder keine legale Zahl liefert, so liefert
PRODUCT einen Fehler.

### DIVIDE(&lt;Dividend&gt; BY(&lt;Divisor&gt;) MIN "&lt;MinStellen&gt;" MAX "&lt;MaxStellen&gt;")

Die Funktion DIVIDE wertet &lt;Dividend&gt; und &lt;Divisor&gt; aus und
interpretiert die Rückgabewerte als Zahlen. Dann berechnet sie den
Quotient Dividend/Divisor und liefert diesen zurück. Da bei einer
Division unendliche Dezimalbrüche möglich sind, ist die Angabe
&lt;MaxStellen&gt; zwingend erforderlich, um die maximale Anzahl an
Nachkommastellen anzugeben, auf die das Ergebnis gerundet werden soll.
Optional ist auch die Angabe &lt;MinStellen&gt; möglich und falls der Quotient
weniger als &lt;MinStellen&gt; Nachkommastellen hat, so wird er mit 0ern auf
die entsprechende Zahl von Nachkommastellen aufgefüllt.\
&lt;Dividend&gt; und &lt;Divisor&gt; können beliebige Funktionen sein, jedoch darf
der Divisor nicht 0 ergeben. Für &lt;MinStellen&gt; und &lt;MaxStellen&gt; sind nur
String-Literale zulässig. Wird &lt;MinStellen&gt; weggelassen, so wird 0
angenommen.

Falls bei der Auswertung von &lt;Dividend&gt; oder &lt;Divisor&gt; ein Fehler
auftritt oder der Divisor 0 ist, dann liefert DIVIDE einen Fehler.

> **INFO** Die Funktion DIVIDE verhält sich identisch zu FORMAT. Im Prinzip kann auch die Angabe des Divisors weggelassen werden. Es wird dann 1 angenommen und die Angabe MAX ist dann optional. Im Sinne der Klarheit ist davon jedoch abzuraten.

### ABS (&lt;Argument1&gt; ... &lt;ArgumentN&gt;)

Die Funktion ABS wertet alle Argumente aus, interpretiert die Ergebnisse
als Zahlen, bildet daraus die Summe und liefert den absoluten Betrag
derselben zurück. Als Argumente sind beliebige Funktionen zulässig.
Falls eine der Funktionen einen Fehler oder keine legale Zahl liefert,
so liefert ABS einen Fehler.

### SIGN (&lt;Argument1&gt; ... &lt;ArgumentN&gt;)

Die Funktion SIGN wertet alle Argumente aus, interpretiert die
Ergebnisse als Zahlen, bildet daraus die Summe und liefert -1, 0 oder +1
zurück, je nachdem ob die Summe negativ, 0 oder positiv ist. Als
Argumente sind beliebige Funktionen zulässig. Falls eine der Funktionen
einen Fehler oder keine legale Zahl liefert, so liefert SIGN einen
Fehler.

Vergleiche
----------

### ISERROR (&lt;Funktion&gt;)

Die Funktion ISERROR wertet &lt;Funktion&gt; aus und liefert "true" genau
dann, wenn &lt;Funktion&gt; einen Fehler zurückliefert. Ansonsten liefert
ISERROR "false" zurück. Zu beachten ist, dass ISERROR *nicht* einfach
nur mit dem speziellen Fehlerstring vergleicht, den Funktionen im
Fehlerfall zurückliefern (Zum Zeitpunkt der Erstellung dieser
Dokumentation ist dies der String "!¤£!FEHLERHAFTE DATEN!¤£!"). ISERROR
wertet stattdessen den internen Fehlerzustand von &lt;Funktion&gt; aus und
kann so unterscheiden zwischen einem wirklichen Fehler und dem
absichtlichen Zurückliefern des Fehlerstrings.

ISERROR("!¤£!FEHLERHAFTE DATEN!¤£!") liefert also "false" zurück,
ISERROR(SUM("keineZahl")) dagegen "true", obwohl der von
SUM("keineZahl") zurückgelieferte String identisch zu "!¤£!FEHLERHAFTE
DATEN!¤£!" ist.

Im Gegensatz zu ISERROR steht die Funktion ISERRORSTRING (siehe nächster
Abschnitt), die nur den Vergleich mit dem Fehlerstring durchführt.
Wannimmer möglich sollte ISERROR anstatt ISERRORSTRING verwendet werden.
Wenn der zu testende Wert jedoch indirekt, z.B. aus einem durch eine
andere Funktion berechneten Formularfeld stammt, dann kann ISERROR nicht
verwendet werden. Z.B. liefert der Test ISERROR(VALUE "formularfeld") in
den meisten Fällen nicht das gewünschte Ergebnis. Er prüft nämlich
nicht, ob im Formularfeld ein (durch eine andere Funktion berechneter)
Fehlerwert steht. Stattdessen liefert dieser Aufruf nur dann "true",
wenn das Formularfeld mit der ID "formularfeld" gar nicht existiert,
weil nur dann die VALUE-Funktion einen Fehler liefert.

> **INFO** Wenn es darum geht, im Fehlerfall einen besonderen Wert zurückzuliefern, ist SELECT mit einem ONERROR-Zweig meist günstiger als direkte Tests mit ISERROR oder ISERRORSTRING.

### ISERRORSTRING (&lt;Funktion&gt;)

ISERRORSTRING wertet &lt;Funktion&gt; aus und vergleicht den Rückgabewert mit
dem speziellen Fehlerstring, den Funktionen im Fehlerfall zurückgeben.
Dieser ist zum Zeitpunkt der Erstellung dieser Dokumentation
"!¤£!FEHLERHAFTE DATEN!¤£!". Er kann sich jedoch jederzeit ändern (und
hat sich in der Vergangenheit auch bereits geändert). Deswegen darf er
nicht direkt für Vergleiche mit MATCH oder STRCMP herangezogen werden,
sondern Gleichheit mit dem Fehlerstring darf nur über ISERRORSTRING
geprüft werden.

Der Fehlerstring ist so gewählt, dass er im normalen Betrieb nicht
auftreten kann, allerdings können Spaßvögel unter den Benutzern den
String direkt eingeben. Um einen echten Fehler von einem eingegebenen
Fehlerstring unterscheiden zu können existiert die Funktion ISERROR, die
direkt den Fehlerzustand von &lt;Funktion&gt; auswertet. Wenn möglich sollte
diese Funktion verwendet werden.

Hinweis: Wenn es darum geht, im Fehlerfall einen besonderen Wert zurückzuliefern, ist SELECT mit einem ONERROR-Zweig meist günstiger als direkte Tests mit ISERROR oder ISERRORSTRING.

### STRCMP (&lt;Argument1&gt; ... &lt;ArgumentN&gt;)

Es müssen mindestens 2 Argumente angegeben werden. Als Argumente sind
beliebige Funktionen zulässig. Die Funktion STRCMP wertet ihre Argumente
der Reihe nach aus und führt für die Argumente 2 bis N einen Vergleich
mit dem ersten Argument durch. Bei jedem Vergleich kann eines der
folgenden 3 Ergebnisse herauskommen: "Die Strings sind identisch", "Der
erste String kommt in einer alphabetischen Sortierung vor dem zweiten",
"Der zweite String kommt alphabetisch vor dem ersten". Der Vergleich
basiert auf der Reihenfolge der Zeichen im Unicode-Zeichensatz, d.h.
insbes. werden Kleinbuchstaben und Großbuchstaben als unterschiedliche
Zeichen aufgefasst. Die Funktion STRCMP kann folgende 5 Ergebnisse
zurückliefern, wobei in einem booleschen Kontext, wie in einer
IF-Bedingung, alle nicht-true Ergebnisse false entsprechen:

- "true": Alle Strings sind identisch. Beispiel: `STRCMP("a" "a" "a")`
- "-1": Mindestens eines der Argumente 2 bis N ist verschieden von Argument1 und kommt alphabetisch *nach* Argument1. Alle anderen Argumente kommen entweder auch alphabetisch *nach* Argument1 oder sie sind identisch zu Argument1.

  Beispiel: `STRCMP("a" "a" "z")`
- "1": Mindestens eines der Argumente 2 bis N ist verschieden von Argument1 und kommt alphabetisch *vor* Argument1. Alle anderen Argumente kommen entweder auch alphabetisch *vor* Argument1 oder sie sind identisch zu Argument1.

  Beispiel: `STRCMP("z" "a" "z")`
- "0": Mindestens zwei der Argumente 2 bis N sind verschieden von Argument1 und eines davon kommt alphabetisch *nach* Argument1 während das andere alphabetisch *vor* Argument1 kommt.

  Beispiel: `STRCMP("m" "a" "z")`
- Fehler: Falls eine der ausgewerteten Funktionen einen Fehler liefert, so liefert STRCMP einen Fehler. '''Achtung: ''' STRCMP wendet das Kurzschlussverfahren an, d.h. es wertet nur soviele Argumente aus wie notwendig. Wenn z.B. Argument2 alphabetisch vor Argument1 kommt und Argument3 alphabetisch danach, dann kann das Ergebnis nur "0" lauten und die Argumente 3 bis N werden gar nicht mehr ausgewertet. Eventuelle Fehler, die bei der Auswertung dieser Argumente auftreten würden, werden nicht erkannt.

  Beispiel: `STRCMP("m","a",SUM("keineZahl"),"z") = Fehler!`, aber `STRCMP("m" "a" "z" SUM("keineZahl")) = "0"`

### NUMCMP (&lt;Argument1&gt; ... &lt;ArgumentN&gt; MARGIN "&lt;MaxAbweichung&gt;" )

Es müssen mindestens 2 Argumente angegeben werden. Die Angabe einer
MARGIN ist optional. Als Argumente und MARGIN sind beliebige Funktionen
zulässig. Die Funktion NUMCMP wertet zuerst (falls angegeben) die
MARGIN-Funktion aus und interpretiert den Rückgabewert als Zahl und
nimmt davon den Absolutbetrag. Danach werden die Argumente der Reihe
nach ausgewertet und die Rückgabewerte als Zahlen interpretiert. Für die
Argumente 2 bis N führt NUMCMP einen Vergleich mit dem ersten Argument
durch. Falls MARGIN angegeben ist, so werden die Zahlen als numerisch
gleich behandelt, wenn ihre Differenz kleiner oder gleich
&lt;MaxAbweichung&gt; ist. Die Funktion NUMCMP kann folgende 5 Ergebnisse
zurückliefern, wobei in einem booleschen Kontext, wie in einer
IF-Bedingung, alle nicht-true Ergebnisse false entsprechen:

- "true": Alle Werte sind numerisch gleich.

  Beispiel 1: `NUMCMP("1" "1,0" "1,000")`

  Beispiel 2: `NUMCMP("1" "1,1" "0,9" MARGIN "0,1")`
- "-1": Mindestens eines der Argumente 2 bis N ist numerisch echt größer als Argument1. Alle anderen Argumente sind größer oder gleich Argument1.

  Beispiel 1: `NUMCMP("1" "1,0" "2")`

  Beispiel 2: `NUMCMP("1" "0,9" "2" MARGIN "0,1")`
- "1": Mindestens eines der Argumente 2 bis N ist numerisch echt kleiner als Argument1. Alle anderen Argumente sind kleiner oder gleich Argument1.

  Beispiel: `NUMCMP("2,0" "1" "2")`
- "0": Mindestens eines der Argumente 2 bis N ist numerisch echt größer als Argument1 und mindestens eines der Argumente ist numerisch echt kleiner als Argument1.

  Beispiel: `NUMCMP("2" "1" "3")`
- Fehler: Falls eine der ausgewerteten Funktionen einen Fehler liefert oder das Ergebnis keine legale Zahl darstellt, so liefert NUMCMP einen Fehler.

  > **WARNING** NUMCMP wendet das Kurzschlussverfahren an, d.h. es wertet nur soviele Argumente aus wie notwendig. Wenn z.B. Argument2 echt kleiner als Argument1 ist und Argument3 echt größer, dann kann das Ergebnis nur "0" lauten und die Argumente 4 bis N werden gar nicht mehr ausgewertet. Eventuelle Fehler, die bei der Auswertung dieser Argumente auftreten würden, werden nicht erkannt.

  Beispiel: `NUMCMP("2","1",SUM("keineZahl"),"3") = Fehler!`, aber `NUMCMP("2" "1" "3" SUM("keineZahl")) = "0"`

### LT (&lt;Argument1&gt; ... &lt;ArgumentN&gt; MARGIN "&lt;MaxAbweichung&gt;" )

Es müssen mindestens 2 Argumente angegeben werden. Die Angabe einer
MARGIN ist optional. Als Argumente und MARGIN sind beliebige Funktionen
zulässig. Die Funktion LT wertet zuerst (falls angegeben) die
MARGIN-Funktion aus und interpretiert den Rückgabewert als Zahl und
nimmt davon den Absolutbetrag. Danach werden die Argumente der Reihe
nach ausgewertet und die Rückgabewerte als Zahlen interpretiert. Für die
Argumente 2 bis N führt LT einen Vergleich mit dem ersten Argument
durch. LT liefert "true", wenn Argument1 numerisch echt kleiner ist als
die Argumente 2 bis N, ansonsten "false". Falls MARGIN angegeben ist, so
werden die Zahlen als numerisch gleich behandelt, wenn ihre Differenz
kleiner oder gleich &lt;MaxAbweichung&gt; ist.

Beispiel 1: `LT("1" "2" "3") = "true"`

Beispiel 2: `LT("1" "2" "3" MARGIN "1") = "false"`

- Fehler: Falls eine der ausgewerteten Funktionen einen Fehler liefert oder das Ergebnis keine legale Zahl darstellt, so liefert LT einen Fehler.

  > **WARNING** LT wendet das Kurzschlussverfahren an, d.h. es wertet nur soviele Argumente aus wie notwendig. Wenn z.B. Argument2 kleiner Argument1 ist, dann kann das Ergebnis nur "false" lauten und und die Argumente 3 bis N werden gar nicht mehr ausgewertet. Eventuelle Fehler, die bei der Auswertung dieser Argumente auftreten würden, werden nicht erkannt.

  Beispiel: `LT("2",SUM("keineZahl"),"1") = Fehler!`, aber `LT("2" "1" SUM("keineZahl")) = "false"`

### LE (&lt;Argument1&gt; ... &lt;ArgumentN&gt; MARGIN "&lt;MaxAbweichung&gt;" )

Wie LT, aber es wird "true" geliefert, wenn Argument1 numerisch kleiner
oder gleich Argument2 bis ArgumentN ist.

### GT (&lt;Argument1&gt; ... &lt;ArgumentN&gt; MARGIN "&lt;MaxAbweichung&gt;" )

Wie LT, aber es wird "true" geliefert, wenn Argument1 numerisch echt
größer Argument2 bis ArgumentN ist.

### GE (&lt;Argument1&gt; ... &lt;ArgumentN&gt; MARGIN "&lt;MaxAbweichung&gt;" )

Wie LT, aber es wird "true" geliefert, wenn Argument1 numerisch größer
oder gleich Argument2 bis ArgumentN ist.

Logische Verknüpfungen
----------------------

### AND (&lt;Funktion1&gt; ... &lt;FunktionN&gt;)

Die Funktion AND wertet &lt;Funktion1&gt; bis &lt;FunktionN&gt; der Reihe nach aus
und liefert "true", falls alle Funktionen "true" liefern, ansonsten
"false". Die Auswertung erfolgt nach dem Kurzschlussverfahren, d.h. wenn
eine der Funktionen nicht "true" liefert, werden die folgenden
Funktionen nicht mehr ausgewertet. Liefert eine der ausgewerteten
Funktionen einen Fehler, so liefert AND einen Fehler und die folgenden
Funktionen werden nicht mehr ausgewertet.

### OR (&lt;Funktion1&gt; ... &lt;FunktionN&gt;)

Die Funktion OR wertet &lt;Funktion1&gt; bis &lt;FunktionN&gt; der Reihe nach aus
und liefert "true", falls eine der Funktionen "true" liefert, ansonsten
"false". Die Auswertung erfolgt nach dem Kurzschlussverfahren, d.h. wenn
eine der Funktionen "true" liefert, werden die folgenden Funktionen
nicht mehr ausgewertet. Liefert eine der ausgewerteten Funktionen einen
Fehler, so liefert OR einen Fehler und die folgenden Funktionen werden
nicht mehr ausgewertet.

### NOT (&lt;Funktion1&gt; ... &lt;FunktionN&gt;)

Die Funktion NOT wertet &lt;Funktion1&gt; bis &lt;FunktionN&gt; der Reihe nach aus
und liefert "true", falls eine der Funktionen *nicht* "true" liefert,
ansonsten "false". Die Auswertung erfolgt nach dem Kurzschlussverfahren,
d.h. wenn eine der Funktionen nicht "true" liefert, werden die folgenden
Funktionen nicht mehr ausgewertet. Anders ausgedrückt: NOT (&lt;Funktion1&gt;
... &lt;FunktionN&gt;) liefert dann "true", wenn AND (&lt;Funktion1&gt; ...
&lt;FunktionN&gt;) "false" liefern würde. Liefert eine der ausgewerteten
Funktionen einen Fehler, so liefert NOT einen Fehler und die folgenden
Funktionen werden nicht mehr ausgewertet.

Ablaufsteuerung/Kontrollfluss
-----------------------------

### IF (&lt;Bedingung&gt; THEN &lt;Dann&gt; ELSE &lt;Sonst&gt; )

Die Funktion IF wertet die &lt;Bedingung&gt; aus. Falls diese "true" ist, so
wird der Wert der Funktion &lt;Dann&gt; zurückgeliefert, ansonsten der Wert
der Funktion &lt;Sonst&gt;. Sowohl der "THEN &lt;Dann&gt;" als auch der "ELSE
&lt;Sonst&gt;" Teil sind optional. Falls ein Teil fehlt, so wird der leere
String dafür angenommen. &lt;Bedingung&gt;, &lt;Dann&gt; und &lt;Sonst&gt; können
beliebige Funktionen sein. Falls &lt;Bedingung&gt; einen Fehler liefert, so
liefert IF einen Fehler, ohne &lt;Dann&gt; oder &lt;Sonst&gt; auszuführen.

### THEN &lt;Argument&gt;

Die Funktion THEN verhält sich genau wie die Funktion CAT. Sie sollte
jedoch um Verwirrung zu vermeiden nur zusammen mit IF verwendet werden.

### ELSE &lt;Argument&gt;

Die Funktion ELSE verhält sich genau wie die Funktion CAT. Sie sollte
jedoch um Verwirrung zu vermeiden nur zusammen mit IF oder SELECT
verwendet werden (und innerhalb von SELECT nur als letzte Funktion).

### SELECT (&lt;Funktion1&gt; ... &lt;FunktionN&gt;)

Die Funktion SELECT wertet &lt;Funktion1&gt; bis &lt;FunktionN&gt; der Reihe nach
aus. Liefert eine Funktion den leeren String, so wird die Auswertung mit
der nächsten Funktion fortgesetzt. Sobald eine der Funktionen einen
nicht-leeren Nicht-Fehler-String liefert, wird die Auswertung
abgebrochen und dieser wird das Ergebnis von SELECT. Typischerweise wird
SELECT zusammen mit IF verwendet und erhält als letzte Funktion eine
ELSE Funktion und/oder eine ONERROR Funktion.

```
SELECT(
  IF( <Bedingung1>
    THEN <Ergebnis1>
  )
  IF( <Bedingung2>
    THEN <Ergebnis2>
  )
  ...
  ELSE <SonstWert>

  ONERROR <Fehlermeldung>
)
```

Die Reaktion von SELECT auf Fehler hängt davon ab, ob eine
ONERROR-Funktion angegeben ist oder nicht. Gibt es ein ONERROR, so
bricht SELECT beim ersten Fehler ab und liefert das Ergebnis der
ONERROR-Funktion. Gibt es kein ONERROR, so wird bei Auftreten eines
Fehlers mit der nächsten Funktion fortgefahren. Gibt es kein ONERROR und
liefern *alle* Funktionen einen Fehler, liefert SELECT einen Fehler
zurück. Gibt es kein ONERROR und liefert mindestens eine Funktion einen
leeren String und alle anderen einen Fehler, so liefert SELECT den
leeren String zurück. D.h. wenn man als letzte Funktion eine ELSE
Funktion mit einem festen String verwendet (z.B. dem leeren String), so
wird SELECT nie einen Fehler zurückliefern. Die ONERROR-Funktion verhält
sich genau wie CAT, d.h. wenn ihr mehrere Parameter übergeben werden, so
werden diese aneinandergehängt.

Funktionen für Formulare
------------------------

### VALUE &lt;Argument&gt;

Die Funktion VALUE erwartet als Argument einen Identifikator und liefert
den diesem Identifikator zugewiesenen Wert zurück. Welcher das ist hängt
vom Kontext ab. In einem Formular würde die Id typischerweise ein
Formularfeld bezeichnen, dessen Wert die Funktion dann zurückliefern
würde. Als Argument kann im Prinzip eine beliebige Funktion übergeben
werden, deren Ergebnis dann als Identifikator genommen wird. Wegen der
Undurchsichtigkeit einer solchen Definition sollte davon jedoch Abstand
genommen werden. Es ist normalerweise völlig ausreichend als &lt;Argument&gt;
einen einfachen String zu verwenden. Ist für die angegebene Id im
entsprechenden Kontext kein Wert definiert (z.B. weil es kein
Formularelement mit dieser Id gibt), so liefert VALUE einen Fehler.

```
Funktionen(
  WertVonCheckbox(VALUE("CheckboxId"))
)
```

### DIALOG ("&lt;Dialogname&gt;", "&lt;Feldname&gt;")

Die Funktion DIALOG erlaubt Zugriff auf Werte, die der Benutzer in einem
speziellen Dialog ausgewählt hat. Das wichtigste Beispiel hierfür ist
der Dialog zur Auswahl des Empfängers bei Formularen und Briefköpfen.
Der Benutzer klickt hierzu den entsprechenden Button an, der den
Empfängerauswahl-Dialog aufruft und wählt im Dialog den Empfänger aus.

Die DIALOG-Funktion liefert das durch &lt;Feldname&gt; bezeichnete Feld, das
der Benutzer im Dialog &lt;Dialogname&gt; ausgewählt hat. Hat der Benutzer den
Dialog noch nicht aufgerufen, so wird ein Standardwert (typischerweise
der leere String) geliefert. Sobald der Benutzer den Dialog einmal
aufgerufen hat, wird der korrekte Wert geliefert. &lt;Dialogname&gt; muss
einen Dialog bezeichnen, der im Abschnitt
[Funktionsdialoge](#funktionsdialoge)
definiert wurde.

`DIALOG('Empfaengerauswahl', 'Anrede')`

Zugriff auf externe Funktionen
------------------------------

### EXTERN (URL &lt;url&gt; PARAMS(&lt;param1&gt; ... &lt;paramN&gt;))

Die EXTERN-Funktion stellt eine Verbindung zu einer externen (d.h. nicht
als WollMux-Funktionsdefinition vorliegenden) Funktion her. Diese kann
sowohl als Methode einer Java-Klasse als auch als Basic-Makro vorliegen.
Die &lt;url&gt; identifiziert die externe Funktion. Der Aufbau ist aus den
folgenden Beispielen ersichtlich. Der PARAMS-Block ist optional und legt
Bezeichner für die Parameter der Funktion fest in der Reihenfolge in der
sie übergeben werden müssen. Die Basic- oder Java-Funktion muss ihre
Parameter als Strings erwarten und entweder einen String oder einen
Wahrheitswert zurückliefern. Insbesondere muss es sich im Basic-Fall um
eine Function handeln.

```
EXTERN(URL "vnd.sun.star.script:Bibliothek.Modul.NameDerFunction?language=Basic&location=application" 
       PARAMS("Param1", "Param2", "Param3"))

EXTERN(URL "java:de.muenchen.allg.itd51.wollmux.func.Standard.zahlenBereich" 
       PARAMS("wert", "min", "max"))
```

#### de.muenchen.allg.itd51.wollmux.func.Standard

Dieses Java-Modul enthält einige vorgefertigte Standard-Funktionen:

- *immerWahr*: liefert immer den Wert "true"
- *zahlenBereich(low, hi, zahl)*: Liefert true genau dann wenn low, hi
    und zahl Integer-Zahlen sind und low&lt;=zahl&lt;=hi.
- (veraltet)*herrFrauText(anrede, frauText, herrText)*: Liefert den
    String herrText zurück, falls lowcase(anrede) == "herr", ansonsten
    wird frauText geliefert.
- *gender(herrText, frauText, sonstText, anrede)*: Liefert den String
    herrText zurück, falls lowcase(anrede) == "herr" oder "herrn".
    Liefert den String frauText zurück falls lowcase(anrede) == "frau".
    Ansonsten wird sonstText zurückgeliefert (typischerweise verwendet
    für den Mehrzahl-Fall "Damen und Herren").
- *korrektesDatum(datum)*: Versucht, zu erkennen, ob datum ein
    korrektes Datum der Form Tag.Monat.Jahr ist (wobei Jahr immer
    4-stellig sein muss). Liefert "true", falls dies so ist.
- *formatiereTelefonnummerDIN5008(nummer)*: Formatiert die
    *stadtinterne* Telefonnummer nummer entsprechend der DIN 5008 und
    versieht sie mit der Vorwahl 089, um eine Nummer zu erhalten, die
    extern gültig ist. Diese Funktion wurde für die Verarbeitung der
    Telefonnummerndaten aus dem städtischen LDAP konzipiert und arbeitet
    nicht zwangsweise mit Telefonnummern aus anderen Quellen.
- *formatiereTelefonnummerDIN5008Intern(nummer)*: Formatiert die
    *stadtinterne* Telefonnummer nummer entsprechend der DIN 5008 und
    versieht sie mit der Vorwahl 0, um eine Nummer zu erhalten, die auf
    jedem internen Telefon funktioniert. Diese Funktion wurde für die
    Verarbeitung der Telefonnummerndaten aus dem städtischen LDAP
    konzipiert und arbeitet nicht zwangsweise mit Telefonnummern aus
    anderen Quellen.
- *regex(regulaererAusdruck, eingabe)*: Liefert genau dann true, wenn
    [regulaererAusdruck](http://java.sun.com/j2se/1.5.0/docs/api/java/util/regex/Pattern.html#sum)
    den String eingabe vollständig matcht.
- *datumNichtInVergangenheit(datum)*: Liefert genau dann true, wenn
    datum ein korrektes Datum der Form Monat.Tag.Jahr ist (wobei Jahr
    immer 4-stellig sein muss) und das Datum nicht in der
    Vergangenheit liegt.

#### de.muenchen.allg.d101 (Plugin der WollMux-Standard-Config)

Im Verzeichnis plugins/de/muenchen/allg/d101 der wollmux-standard-config
werden darüber hinaus folgende nützliche Funktionen zu
Demonstrationszwecken bereitgestellt:

- *ZahlInWorten(zahl)*: Wandelt eine Zahl("200") in
    natürliche Sprache("zweihundert") um.

### BIND (FUNCTION "&lt;Funktionsname&gt;" SET("&lt;ParamName1&gt;" &lt;Wert1&gt;) ... SET("&lt;ParamNameN&gt;" &lt;WertN&gt;))

Die BIND-Funktion dient dazu, mehrere Funktionen zusammenzusetzen.
&lt;Funktionsname&gt; identifiziert eine benannte Funktion aus dem
*Funktionen*-Abschnitt. Diese Funktion bildet den Ausgangspunkt für die
zusammengesetzte Funktion. Dazu kommen beliebig viele (auch keine sind
möglich) SET-Anweisungen, die Parameter der Basisfunktion mit beliebigen
anderen Funktionen belegen. &lt;ParamName1&gt; bis &lt;ParamNameN&gt; sind dabei
Namen von Parametern, die die Basis-Funktion erwartet. Dies ist nicht
zwingend, aber Parameter zu belegen, die die Basis-Funktion nicht
erwartet, hat keinen Effekt. &lt;Wert1&gt; bis &lt;WertN&gt; können beliebige
Funktionen sein. Die Arbeitsweise von BIND wird klarer, wenn man
typische Anwendungsfälle betrachtet.

**Anwendungsfall 1**: Verwenden einer externen Funktion als
Plausibilitätsprüfung für ein Formularfeld

```
Funktionen(
    # Diese Funktion liefert "true" wenn  min <= wert <= max
  ZahlenBereich(EXTERN(URL "java:de.muenchen.allg.itd51.wollmux.Standard.zahlenBereich" 
       PARAMS("min", "max", "wert")))
)
```

Im *Funktionen*-Abschnitt ist die Funktion *ZahlenBereich* definiert,
die auf eine Java-Funktion im WollMux-Modul
`de.muenchen.allg.itd51.wollmux.Standard` verweist. Dieses Modul enthält
einige vorgefertigte Standard-Funktionen. Diese Funktion soll nun in
einer Formularbeschreibung eingesetzt werden, um zu überprüfen, dass das
der im Textfeld *DarlehensBetrag* eingegebene Wert zwischen 1000 und
50000 liegt. Um dies zu Realisieren müssen 3 Dinge erreicht werden:

- Als Parameter *min* wird 1000 übergeben
- Als Parameter *max* wird 50000 übergeben
- Der Parameter *wert* wird an den Inhalt des Textfelds *DarlehensBetrag* gebunden.

Für jede dieser 3 Anforderungen wird ein SET-Ausdruck einer
BIND-Funktion verwendet:

`BIND(FUNCTION "ZahlenBereich" SET("min" "1000") SET("max" "50000") SET("wert" VALUE("DarlehensBetrag")))`

**Anwendungsfall 2**: Einfügen von "der" oder "die" abhängig vom Anrede-Feld
eines Formulars

```
Funktionen(
  # Diese Funktion liefert TextMaennl wenn Anrede=="Herr", ansonsten TextWeibl
  GenderText(EXTERN(URL 'java:de.muenchen.allg.itd51.wollmux.func.Standard.herrFrauText' PARAMS('Anrede', 'TextWeibl', 'TextMaennl')))
)
```

Wie im ersten Anwendungsfall wird im *Funktionen*-Abschnitt eine
Funktion definiert, die Zugriff auf eine der vordefinierten
Standard-Funktionen erlaubt. In diesem Fall ist es eine Funktion die
abhängig vom Wert des Parameters Anrede einen Wert aus 2 Alternativen
auswählt. Um nun in einem Formular "der" oder "die" einfügen zu lassen
abhängig vom Formularfeld Anrede, verwenden wir das TRAFO-Attribut der
Funktion *insertFormValue*. Eine TRAFO-Funktion muss genau ein Argument
erwarten (den zu transformierenden String), deshalb kann die Funktion
GenderText nicht direkt als TRAFO verwendet werden. 2 der Argumente
müssen erst abgebunden werden, nämlich die beiden, die in unserem
Anwendungsfall fest vorgegeben sind: die Texte "der" und "die". Das
Ergebnis sieht wie folgt aus:

```
Funktionen(
  derDie(BIND(FUNCTION 'GenderText' SET('TextWeibl','die') SET('TextMaennl','der')))
)
```

Und das zugehörige
[WollMux-Dokumentkommando](#trafo-funktionsbezeichner)

`WM(CMD 'insertFormValue' ID 'Anrede' TRAFO 'derDie')`

### BIND (FUNCTION(&lt;Funktion&gt;) SET("&lt;ParamName1&gt;" &lt;Wert1&gt;) ... SET("&lt;ParamNameN&gt;" &lt;WertN&gt;))

Wie [BIND mit Angabe eines Funktionsnames hinter FUNCTION](#bind-function-funktionsname-setparamname1-wert1--setparamnamen-wertn),
jedoch wird hier als &lt;Funktion&gt; eine komplette WollMux-Funktion direkt
angegeben, typischerweise eine
[EXTERN-Funktion](#extern-url-url-paramsparam1--paramn).

Funktionsdialoge
================

Mit der Grundfunktion DIALOG können durch Dialoge abgefragte Werte in
Funktionen verwendet werden. Typischer Anwendungsfall sind Dialoge zum
Auswählen des Empfängers bei der Formularbearbeitung. Hierzu wird eine
Funktion des Typs DIALOG als AUTOFILL verwendet und dazu ein Button mit
ACTION "funcDialog" angelegt. Der Button ruft den Dialog auf, in dem der
Benutzer die gewünschten Daten auswählen kann. Sobald der Dialog beendet
wurde, liefert die DIALOG Grundfunktion die entsprechenden Werte zurück.
Durch den AUTOFILL gelangen diese ins Formular. Zur Zeit gibt es nur
eine Art von Funktionsdialog, den Typ "dbSelect", der die Auswahl eines
Datensatzes aus einer Datenquelle erlaubt.

Bevor ein Funktionsdialog in einer Funktion verwendet werden kann, muss
er definiert werden. Dies geschieht im Abschnitt *Funktionsdialoge*. Im
Folgenden ist sein Aufbau schematisch dargestellt:

```
Funktionsdialoge(
  Funktionsdialog1(
    TYPE "dbSelect"
    TITLE "<Titel des Dialogfensters>"

    Fenster(
      Tab1(
        TITLE "<Titel des 1.Tabs>"
        CLOSEACTION "back"
        TIP "<Tooltip für den 1.Tab>"

        Intro(
          <Label, Glue oder Separator>
          ...
        )#Intro
      
        Suche(
          (TYPE "textfield" ID "suchanfrage" ACTION "search")  #optional Attribut "AUTOFILL" möglich
          (LABEL "Suchen"  TYPE "button" HOTKEY "S"  ACTION "search")
        )#Suche
          
        Suchstrategie(
          <Suchanfrage mit Platzhaltern>
          ...
        )#Suchstrategie
          
        Spaltenumsetzung(
          <Funktionsdefinition>
          ...
        )
       
        Suchergebnis(
          <Label, Glue oder Separator>
          ...
          (TYPE "listbox" ID "suchergebnis" LINES "10" ACTION "select" 
            DISPLAY "<Muster für Anzeige der Suchergebnisse>")
        )#Suchergebnis
       
        Vorschau(
          <Anzeigeelement>
          ...
        )#Vorschau
         
        Fussbereich(
          <Button, Label, Separator oder Glue>
          ...
        )#Fussbereich
      )#Tab1

      Tab2(
        ...
      )#Tab2

      ...  # weitere Tabs

    )#Fenster
  )#Funktionsdialog1

  ... # weitere Funktionsdialoge

)#Funktionsdialoge
```

**Bemerkungen:**

- Gibt es mehrere *Funktionsdialoge*-Abschnitte in der wollmux.conf,
    so werden diese alle in der Reihenfolge ihres Auftretens
    berücksichtig, wobei die jeweils letzte Definition eines Dialogs
    Gültigkeit hat.
- Innerhalb des selben *Funktionsdialoge*-Abschnitts darf jeder Dialog
    nur einmal definiert werden.

Die Syntax für die Beschreibung der Elemente in diesem Abschnitt
entspricht der [bereits weiter oben beschriebenen](#beschreibung-eingabefeld-1).
Die folgenden Abschnitte beschreiben nur die Aspekte, die noch nicht
bereits beschrieben wurden.

Intro
-----

Der Unterabschnitt "Intro" beschreibt den oberen Teil eines Tabs. Hier
wird dem Benutzer normalerweise eine Kurzerklärung zum Tab geliefert,
z.B. wonach er im Suchfeld suchen kann. In diesem Abschnitt werden
normalerweise nur Elemente vom TYPE "label", "glue" oder "separator"
verwendet.

Suche
-----

In diesem Abschnitt werden die Bedienelemente für das Absetzen einer
Suchanfrage beschrieben. Besondere Erwähnung verdient hier das
Eingabefeld mit der speziellen ID "suchanfrage". Dieses Eingabefeld wird
ausgewertet, wenn ein Button mit der ACTION "search" aktiviert wird. Hat
das Eingabefeld ein Attribut AUTOFILL, so hat dies 2 Konsequenzen:

- das Feld wird mit dem AUTOFILL-Wert vorbelegt
- die Suche wird gleich beim Aufrufen des Dialogs mit diesem Wert
    durchgeführt, so dass der Benutzer gleich eine Ergebnisliste
    angezeigt bekommt.

Der AUTOFILL-Wert "" (leerer String), oder das gleichbedeutende "\*"
können zusammen mit einem Suchmuster ohne Spalten im
Suchstrategie-Abschnitt verwendet werden, um zu erreichen dass der
Benutzer gleich den kompletten Inhalt einer Datenquelle angezeigt
bekommt, ohne erst eine Suche starten zu müssen.

Suchstrategie
-------------

Der Abschnitt legt fest, wie die vom Benutzer im mit der ID
"suchanfrage" ausgezeichneten Textfeld eingegebenen Suchworte in
Datenquellen-Abfragen umgesetzt werden. Der Abschnitt besteht aus einer
beliebigen Anzahl von Suchanfragen nach folgendem Schema:

`datenquellenname(Spaltenname1 "<Suchmuster1>" Spaltenname2 "<Suchmuster2>" ... )`

Im Folgenden einige Praxisbeispiele:

`personal(Mail "${suchanfrage1}")`

`personal(Mail "${suchanfrage1}@muenchen.de")`

`personal(Nachname "${suchanfrage1}*")`

`personal(Vorname "${suchanfrage1}" Nachname "${suchanfrage2}")`

`personal(OrgaKurz "${suchanfrage1}-${suchanfrage2}")`

Bemerkungen:

- Als Platzhalter sind ${suchanfrage1} bis ${suchanfrage2} erlaubt
    und werden durch entsprechende Wörter der vom Benutzer eingegebenen
    Suchanfrage ersetzt.
- Sternchen sind als Jokerzeichen erlaubt und stehen für einen
    beliebigen Teilstring
- Die Suchmuster für die eingegebene Anzahl von Wörtern werden in der
    Reihenfolge ihres Auftretens versucht und die Ergebnisse der ersten
    Anfrage zurückgeliefert, die mindestens ein Ergebnis liefert.
- Suchmuster, die mehr Wörter erfordern als der Benutzer eingegeben
    hat, werden ignoriert.
- Gibt es für die Anzahl vom Benutzer eingegebener Wörter keine Regel,
    so wird die Eingabe so lange von hinten beginnend gekürzt bis sie
    entweder leer ist oder eine Wortzahl erreicht wurde, für die es eine
    Regel gibt.
- Die Angabe eines Suchmusters ohne Spalten (d.h. nur
    der Datenquellenname) ist möglich und bedeutet, dass leere
    Suchanfragen und die Suchanfrage "\*" erlaubt sind und alle
    Datensätze der Datenquelle zurückliefern sollen.

    > **WARNING** Dieses
    Feature wird derzeit nicht von allen Datenquellentypen unterstützt
    und nur nach Bedarf weiterentwickelt.

Spaltenumsetzung
----------------

Die von der Datenquelle gelieferten Datensätze haben meist nicht genau
das Schema, das man benötigt. Der *Spaltenumsetzung*-Abschnitt erlaubt
es mittels beliebiger
[Funktionen](#funktionen) aus
den in der Datenquelle existierenden Spalten neue Spalten zu generieren.
Der Aufbau des Abschnitts *Spaltenumsetzung* ist genau wie der des
*Funktionen*-Abschnitts. Das folgende Beispiel demonstriert dies:

```
Spaltenumsetzung(
  EmpfaengerZeile1(CAT(VALUE("Vorname") " " VALUE("Nachname")))
  EmpfaengerZeile2(VALUE("Postanschrift"))
  EmpfaengerZeile3(CAT(VALUE("PostPLZ") " " VALUE("PostOrt")))
  Vorname(VALUE("Vorname"))   # 1:1  Umsetzung
)
```

Achtung: Der *Spaltenumsetzung*-Abschnitt legt die Spalten sowohl für die DIALOG-Grundfunktion als auch für den *Vorschau*-Abschnitt und die DISPLAY-Angabe im *Suchergebnis*-Abschnitt fest. Spalten, die nicht im *Spaltenumsetzung*-Abschnitt definiert sind, können an keiner der vorgenannten Stellen verwendet werden. Insbesondere ist zum unveränderten Weiterverwenden einer Spalte des Suchergebnisses eine 1:1 Spaltenumsetzung erforderlich.

Suchergebnis/DISPLAY-Attribut
-----------------------------

Im Suchergebnis-Abschnitt ist neben den Elementen vom TYPE "label",
"glue" und "separator", die wie üblich für die Anzeige statischer
Informationen und die optische Auflockerung verwendet werden, das
einzige bemerkenswerte Element eine "listbox", die mit der ID
"suchergebnis" ausgezeichnet wird. In dieser Listbox werden die
Ergebnisse der Suchanfrage dargestellt. Wie die Darstellung der Einträge
erfolgen soll regelt das DISPLAY-Attribut. Neben statischen Textteilen
kann das Anzeigemuster Platzhalter der Form `${Spaltenname}` enthalten,
die für den jeweiligen Datensatz durch den entsprechenden Spaltenwert
ersetzt werden.

> **WARNING** Die Spaltennamen im DISPLAY-Attribut sind grundsätzlich durch den *Spaltenumsetzung*-Abschnitt definierte Spalten. Soll eine Spalte des Datensatzes unverändert angezeigt werden, so muss eine entsprechende 1:1 Umsetzung im *Spaltenumsetzung*-Abschnitt erfolgen.

Vorschau
--------

Der *Vorschau*-Abschnitt enthält neben den üblichen statischen Elementen
vom Typ "glue", "label" oder "separator" eine Reihe von auf READONLY
"true" gesetzten Textfeldern, die mit DB\_SPALTE-Attributen versehen
sind. Die entsprechenden Zeilen des in der Vorschau-Liste angewählten
Datensatzes werden hier dargestellt. Jede DB\_SPALTE kann derzeit
maximal einmal im Vorschau-Abschnitt verwendet werden. Bei mehrfachen
Einträgen mit der selben DB\_SPALTE wird nur im letzten Textfeld die
Spalte angezeigt.

> **WARNING** Die Spaltennamen im DB\_SPALTE-Attribut sind grundsätzlich durch den *Spaltenumsetzung*-Abschnitt definierte Spalten. Soll eine Spalte des Datensatzes unverändert angezeigt werden, so muss eine entsprechende 1:1 Umsetzung im *Spaltenumsetzung*-Abschnitt erfolgen.

Fussbereich
-----------

In diesem Abschnitt werden Eingabeelemente definiert, die am unteren
Rand des Tabs angezeigt werden sollen, typischerweise Buttons.

ACTIONs in "dbSelect" Funktionsdialogen
---------------------------------------

Funktionsdialoge des Typs dbSelect unterstützen die folgenden ACTIONs:

- **back:** Kehrt zum aufrufenden Dialog zurück. Es wird kein
    Datensatz ausgewählt. Im Kontext des Formularsystems normalerweise
    kein Unterschied zu abort.
- **abort:** Schließt den Dialog. Es wird kein Datensatz ausgewählt.
- **select:** Wählt den momentan in der Ergebnisliste markierten
    Datensatz aus. DIALOG-Funktionen, die sich auf diesen
    Funktionsdialog beziehen liefern ab diesem Zeitpunkt die Werte des
    ausgewählten Datensatzes.
- **search:** Führt die Suche gemäß der vom Benutzer eingegebenen
    Suchwörter durch und aktualisiert die Ergebnisliste entsprechend.

Druckfunktionen
===============

Zur Automatisierung des Drucks mehrerer leicht verschiedener
Ausfertigungen eines Dokuments können sog. Druckfunktionen definiert
werden. Dazu dient der Abschnitt "Druckfunktionen". Alle Druckfunktionen
die in diesem Abschnitt definiert werden sind global verfügbar:

```
Druckfunktionen(

  SachleitendeVerfuegung(EXTERN(URL "java:de.muenchen.allg.itd51.wollmux.func.StandardPrint.sachleitendeVerfuegung") ORDER "10")
  SachleitendeVerfuegungOutput(EXTERN(URL "java:de.muenchen.allg.itd51.wollmux.func.StandardPrint.sachleitendeVerfuegungOutput") ORDER "150")

  AlleKrankenkassen(EXTERN(URL "vnd.sun.star.script:WollMux.Tools.AlleKrankenkassen) ORDER "20")
)
```

**Anmerkungen**:

- Da Druckfunktionen nur als externe Funktionen implementiert werden,
    darf dem Funktionsbezeichner ausschließlich der Schlüssel
    "EXTERN(...)" mit einer gültigen URL folgen, die den physikalischen
    Ort der externen Druckfunktion beschreibt.
- Einzelne Druckfunktionen können in einem späteren Abschnitt
    "Druckfunktionen" redefiniert werden.
- Im Unterschied zu normalen Funktionen werden Druckfunktionen immer
    asynchron in einem eigenen Thread gestartet. Der WollMux überwacht
    nicht, ob die Druckfunktion zurückkehrt und ob dabei
    Fehler auftraten.

Das Attribut ORDER: Verschiedene Druckfunktionen können beliebig kombiniert und hintereinander ausgeführt werden. Ein praktischer Anwendungszweck ist z.B. die Möglichkeit, den Komfortdruck für Sachleitende Verfügungen mit dem Komfortdruck für Serienbriefe zu verketten. Das Attribut ORDER definiert dabei die Reihenfolge, in der die einzelnen Druckfunktionen kombiniert werden, wobei Druckfunktionen mit kleinem ORDER-Wert vor Druckfunktionen mit höherem ORDER-Wert ausgeführt werden. Das Attribut ORDER ist für alle Druckfunktionen optional, sollte aber stets angegeben werden, damit die Aufrufkette immer eindeutig definiert ist. Ist das ORDER-Attribut nicht angegeben, so wird automatisch die Voreinstellung "100" verwendet.

de.muenchen.allg.itd51.wollmux.func.StandardPrint
-------------------------------------------------

Dieses Java-Modul enthält einige vorgefertigte Standard-Druckfunktionen.
Alle diese Druckfunktionen sind auch in der
WollMux-Standard-Konfiguration definiert.

- *sachleitendeVerfuegung*: Druckt die verschiedenen Ausdrucke eines
    Dokuments mit Sachleitenden Verfügungen.
- *sachleitendeVerfuegungOutput*: Die Druckfunktion wird automatisch
    im Hintergrund von der Druckfunktion sachleitendeVerfuegung
    verwendet und muss nie direkt aufgerufen bzw. eingebunden werden.
- *mailMergeWithoutSelection*: Serienbriefdruck: Druckt für jeden
    Datensatz der über Bearbeiten/Datenbank austauschen gewählten
    Tabelle eine entsprechende Ausfertigung.
- *mailMergeWithSelection*: Serienbriefdruck: Präsentiert dem Benutzer
    eine Auswahlliste in der er die Datensätze wählen kann, für die eine
    Ausfertigung gedruckt werden soll. Angezeigt wird in dieser Liste
    für jeden Datensatz der Inhalt der Spalte "WollMuxDescription". Ist
    eine Spalte "WollMuxSelected" vorhanden und enthält "1", "ja" oder
    "true", so ist der entsprechende Datensatz in der Auswahlliste
    bereits vorselektiert.
- *superMailMerge*: Interaktive Seriendruckfunktion: Lässt den
    Benutzer eine Tabelle einer in OOo registrierten Datenquelle *oder
    eine Tabelle einer offenen Calc-Datei* auswählen als Datenlieferant
    für den Seriendruck. Im Falle der Calc-Tabelle werden nur die
    sichtbaren Zellen verwendet. Es ist also möglich, vor dem
    Seriendruck in Calc die Daten zu filtern. Ein Button *Einzelauswahl*
    erlaubt eine manuelle Selektion genau wie bei der Funktion
    *mailMergeWithSelection*. Die Spalten "WollMuxDescription" und
    "WollMuxSelected" werden in diesem Fall wie dort
    beschrieben ausgewertet.
- *printIntoFile*: "Druckt" den Inhalt in ein offenes Writer-Dokument.
    Das XTextDocument in das der Druck geschrieben werden soll kann über
    das Property `PrintIntoFile_OutputDocument` des XPrintModels
    gesetzt werden. Ist dieses Property nicht gesetzt, so wird ein neues
    Dokumentfenster geöffnet.

Informationen zum Entwickeln eigener Konfortdruckfunktionen finden Sie
unter: [Schnittstellen für Experten: Einbinden von Komfortdruckfunktionen](Schnittstellen_des_WollMux_fuer_Experten.md#einbinden-eigener-komfortdruckfunktionen).

Formulare
=========

Es gibt ein paar globale Einstellungen für Formulare, die im Abschnitt
*Formulare* festgelegt werden können. Das folgende Beispiel zeigt einen
entsprechenden Abschnitt.

```
Formulare(
  

  Plausiwarnung( 
    TYPE "confirm"
    TITLE "WARNUNG!"
    LABEL "Sie wollen ein Formular produzieren, das fehlerhaft ausgefüllt wurde. Wirklich fortfahren?"
  )
)
```

Plausiwarnung
-------------

Der Abschnitt *Plausiwarnung* bestimmt, wie sich ein Formular verhalten
soll, wenn der Benutzer versucht, es zu Drucken oder nach PDF zu
konvertieren obwohl mindestens eine Plausibilitätsprüfung einen Fehler
meldet.

Formularanpassung
=================

*Formularanpassung*-Abschnitte können verwendet werden, um Veränderungen
an Formularen vorzunehmen, ohne die eigentlichen Formularvorlagen
anzufassen. Diese Möglichkeiten sollten mit Bedacht eingesetzt werden,
da sie dazu führen, dass das Öffnen der *identischen* Vorlagendatei zu
*unterschiedlichen* Ergebnissen führt je nach verwendeter
WollMux-Konfiguration. Es ist in den meisten Fällen wünschenswert, die
Formularänderungen direkt in die Vorlagendateien zu integrieren. Auch
dabei können *Formularanpassung*-Abschnitte behilflich sein (siehe
*Hinweise* weiter unten). Folgende Beispiel demonstrieren den Aufbau von
*Formularanpassung*-Abschnitten:

**Beispiel 1**:

```
Formularanpassung(
     # Anpassung soll nur Formulare betreffen mit Titel "BS-Bescheid", die einen
     # Reiter "Empfaengerauswahl" haben
  Match( TITLE "BS-Bescheid" )          
  Match( Fenster(Empfaengerauswahl(Eingabefelder())) )

  Formular(
    Fenster(
      Empfaengerauswahl(
        TITLE "Empfänger"

        Eingabefelder(
          (LABEL "Zustellvermerk" TYPE "combobox" ID "EmpfaengerZustellvermerk" ...)
           ...
        )
        Buttons(
          (LABEL "Abbrechen"  TYPE "button" HOTKEY "A"  ACTION "abort" TIP "Zum Abbrechen hier klicken")
        ...
        )
      )
    )
  )
)
```

**Beispiel 2**:

```
# Bei allen Formularen den Drucken-Knopf verbieten, dafür aber einen PDF-Knopf anbieten
# Außerdem reparieren wir hier die Weiter/Zurück-Steuerung, die durch das Ändern des
# Empfaengerauswahl-Reiters durcheinandergebracht wird
Formularanpassung(
  # keine Match() Angaben, betrifft also alle Formulare

  Buttonanpassung(
      EinzigerTab( NEVER ("printForm" "prevTab", "nextTab" )
                   ALWAYS (LABEL "Als Pdf speichern..." TYPE "button" TIP "" READONLY "false" ACTION "form2PDF"
                 )
      ErsterTab( NEVER ("form2PDF", "printForm", "prevTab")
                 ALWAYS (LABEL "Weiter->"  TYPE "button" HOTKEY "W"  ACTION "nextTab")
               )
      MittlererTab( NEVER ("form2PDF", "printForm")
                    ALWAYS (LABEL "<-Zurück"  TYPE "button" HOTKEY "Z"  ACTION "prevTab")
                    ALWAYS (LABEL "Weiter->"  TYPE "button" HOTKEY "W"  ACTION "nextTab")
                  )
      LetzterTab(NEVER ("printForm" "nextTab")
                   ALWAYS (LABEL "<-Zurück"  TYPE "button" HOTKEY "Z"  ACTION "prevTab")
                   ALWAYS (LABEL "Als Pdf speichern..." TYPE "button" TIP "" READONLY "false" ACTION "form2PDF"
                )
    )
)
```

Die Funktionsweise der *Formularanpassung*-Abschnitte ist wie folgt: Bei
jedem geöffneten Formular wird zuerst anhand der *Match*-Abschnitte
(siehe unten) getestet, ob die Anpassung bei diesem Formular
durchgeführt werden soll. Falls ja, werden alle Reiter des
*Formular*-Abschnitts der *Formularanpassung* vereinigt mit denen des
Formulars. Gibt es dadurch mehrere Reiter mit der selben ID, werden von
diesen nur die aus der *Formularanpassung* verwendet. Obiges Beispiel 1
führt also nicht zum Vorhandensein von 2 Empfängerauswahl-Reitern,
sondern ersetzt den in der Formulardatei gespeicherten Reiter durch den
aus dem *Formularanpassung*-Abschnitt. Nach dem Mischen der Reiter
werden die Buttons angepasst entsprechend der Vorgaben aus dem
*Buttonanpassung*-Abschnitt (siehe unten).

**Hinweise**:

- Die Änderungen durch *Formularanpassung*-Abschnitte werden nicht nur
    auf die Anzeige der Formular-GUI angewendet, sondern betreffen auch
    WollMux-Funktionen, die die Formularbeschreibung verändern, allen
    voran der [FormularMax 4000](FormularMax_4000). D.h.
    falls ein von einem *Formularanpassung*-Abschnitt betroffenes
    Formular im FM4000 zum Bearbeiten geöffnet wird, so wird dort die
    *angepasste* Formularbeschreibung angezeigt und mit dem nächsten
    Speichern wird diese permanent in die Vorlangendatei übertragen.
    Dies kann verwendet werden, um mit relativ geringem Aufwand
    Änderungen in viele Formularvorlagen zu übertragen.
- Bei Verwendung von
    [wollmux:Open](Schnittstellen_des_WollMux_fuer_Experten.md#wollmuxopen)
    in Gegenwart von *Formularanpassung*-Abschnitten wird die
    *Buttonanpassung* des wollmux:Open Befehls *nach* der Abarbeitung
    aller *Formularanpassung*-Abschnitte durchgeführt.
- In der [Syntax der wollmux.conf](Format_von_WollMux-Config-Dateien.md) bedeuten
    `Empfaengerauswahl()` und `"Empfaengerauswahl"` das selbe. Der
    Match-Ausdruck `Match(Fenster(Empfaengerauswahl()))` funktioniert
    also evtl. nicht so wie gewünscht. Er entspricht dem Ausdruck
    `Match(Fenster("Empfaengerauswahl"))` der auch dann greift, wenn der
    String "Empfaengerauswahl" irgendwo im Formular vorkommt.

Match
-----

Durch die optionalen *Match*-Abschnitte kann bestimmt werden, für welche
Formulare die Anpassungen gelten sollen. Die Anpassung wird nur für
Formulare durchgeführt aus deren Formularbeschreibung sich nur durch
Löschungen (d.h. ohne Einfügungen oder Verschiebungen) alle
*Match*-Abschnitte ableiten lassen. Die *Match*-Abschnitte sind also
quasi auf die wesentlichen Erkennungsmerkmale zusammengestutzte
Formularbeschreibungen.

> **INFO** Die Reihenfolge von Abschnitten und Schlüssel-Wert-Paaren in *Match*-Abschnitten ist bedeutungslos. Deswegen kann man auch alle *Match*-Abschnitte zu einem großen *Match*-Abschnitt zusammenfassen ohne die Bedeutung zu verändern.

Buttonanpassung
---------------

Beim Mischen der Reiter des Formulars mit denen der *Formularanpassung*
kann es dazu kommen, dass die Benutzerführung der Buttonleiste gestört
wird. Zum Beispiel ist es möglich, dass in der verschmolzenen
Formular-GUI ein mittleres Tab keinen "Weiter-&gt;" Button, dafür jedoch
einen Drucken-Button hat. Um diese Probleme zu umgehen kann ein
Abschnitt Buttonanpassung verwendet werden. Dieser Abschnitt erlaubt es
außerdem, global für alle oder für bestimmte Formulare Buttons
vorzugeben oder zu verbieten. Im Abschnitt *Buttonanpassung* sind die
folgenden Unterabschnitte möglich:

- *EinzigerTab:* Wird angewendet, wenn die angepasste Formular-GUI
    genau einen Reiter besitzt.
- *ErsterTab:* Wird für den ersten Reiter der angepassten Formular-GUI
    angewendet, wenn die Formular-GUI mindestens 2 Reiter besitzt.
- *LetzterTab:* Wird für den letzten Reiter der angepassten
    Formular-GUI angewendet, wenn die Formular-GUI mindestens 2
    Reiter besitzt.
- *MittlererTab:* Wird für einen Reiter angewendet, der weder der
    erste noch der letzte Reiter der angepassten Formular-GUI ist. So
    ein Reiter existiert nur, wenn die Formular-GUI mindestens 3
    Reiter besitzt.

In jedem dieser Abschnitte können Regeln angegeben werden wie im
folgenden beschrieben.

### NEVER (&lt;Aktionsliste&gt;)

Alle Buttons, denen eine ACTION aus der &lt;Aktionsliste&gt; zugeordnet ist
werden vom betreffenden Reiter entfernt.

### ALWAYS (&lt;Bedienelement&gt;)

Überprüft, ob der betreffende Reiter bereits einen Button mit der selben
ACTION-Angabe wie &lt;Bedienelement&gt; hat. Falls nicht, so wird der durch
&lt;Bedienelement&gt; beschriebene Button in die Buttonleiste des Reiters
eingefügt. Dabei wird soweit möglich die Reihenfolge der ALWAYS-Angaben
eingehalten, auch bzgl. schon vorhandener Buttons. Durch die
(unschädliche) Aufnahme bereits vorhandener Buttons als ALWAYS-Angabe
lässt sich also steuern, wo neue Buttons in die Buttonleiste eingefügt
werden.

ExterneAnwendungen
==================

Über die WollMuxBar können nicht nur Office-Vorlagen und Dokumente
geöffnet werden, sondern auch beliebige Dateien und URLs, die von
externen Anwendungen verarbeitet werden (z.B. PDF-Dateien für den
Acrobat Reader). Der Abschnitt *ExterneAnwendungen* macht dem WollMux
die entsprechenden externen Anwendungen bekannt. Ein Beispiel für einen
*ExterneAnwendungen*-Abschnitt:

```
ExterneAnwendungen(
  (EXT ("pdf", "PDF") 
     DOWNLOAD "true"
     PIPE "true"
     FILTER "writer_pdf_Export"
     PROGRAM (
       "acroread",
       "acroread.bat", 
       "AcroRd32.exe", 
       "C:\Programme\Adobe\Acrobat 6.0\Reader\AcroRd32.exe"
    ) 
  )
 
 (EXT "http:" 
    DOWNLOAD "false" 
    PROGRAM (
      "sensible-browser", 
      "sensible-browser.bat"
    )
  )
)#ExterneAnwendungen
```

Die Attribute der Einträge des Abschnitts sind im folgenden näher
erläutert.

EXT &lt;Liste&gt;
-----------

Die beim Attribut EXT angegebene Liste von Strings dient dazu, die
externe Anwendung zu identifizieren zu der der Eintrag gehört. Über das
gleichnamige Attribut bei Buttons mit [ACTION "openExt"](#das-attribut-action)
wird der Bezug zwischen dem Button und der externen Anwendung
hergestellt. Die Strings der &lt;Liste&gt; sind beliebig und
Groß-/Kleinschreibung ist bedeutsam. Typischerweise werden hier die
Dateierweiterungen verwendet, die die entsprechende Applikation
verarbeitet. Im Falle, dass die Anwendung URLs direkt verarbeitet ist
die Angabe des Protokolls als Bezeichner gefolgt von einem Doppelpunkt
zur Abgrenzung gegenüber Dateierweiterungen sinnvoll (z.B. "http:").

PROGRAM &lt;Liste&gt;
---------------

Auf verschiedenen Plattformen ist das selbe Programm unter Umständen
unter verschiedenen Namen bzw. in verschiedenen Dateipfaden zu finden.
Um dennoch eine einheitliche Konfiguration für verschiedene Plattformen
verwenden zu können, erlaubt das PROGRAM-Attribut die Angabe einer
&lt;Liste&gt; von Programmnamen und Pfaden. Soll die externe Anwendung
gestartet werden, so versucht der WollMux die Einträge der &lt;Liste&gt; in
der angegebenen Reihenfolge bis der Start des Programms erfolgreich war.
Führt kein Eintrag zum Ziel gibt es eine Dialogbox für den Benutzer und
einen Eintrag in der Logdatei.

### /loadComponentFromUrl/

Neben echten Programmen kann das virtuelle Programm
"/loadComponentFromURL/" angegeben werden. Es ist ungefähr das selbe als
ob man soffice bzw. soffice.exe angibt, allerdings wird nicht wirklich
ein externes Programm gestartet sondern die interne Funktion von OOo zum
Laden des Dokuments verwendet. Es ist möglich, Parameter mitzugeben,
z.B.

` PROGRAM("/loadComponentFromURL/AsTemplate=true/MacroExecutionMode=3/Hidden=false/")`

Die Parameter sind optional und ihre Reihenfolge ist beliebig. Für
MacroExecutionMode stehen folgende Konstanten zur Verfügung

```
 # NEVER_EXECUTE = 0;
 # FROM_LIST = 1;
 # ALWAYS_EXECUTE = 2;
 # USE_CONFIG = 3;
 # ALWAYS_EXECUTE_NO_WARN = 4;
 # USE_CONFIG_REJECT_CONFIRMATION = 5;
 # USE_CONFIG_APPROVE_CONFIRMATION = 6;
 # FROM_LIST_NO_WARN = 7;
 # FROM_LIST_AND_SIGNED_WARN = 8;
 # FROM_LIST_AND_SIGNED_NO_WARN = 9;
```

Näheres siehe in der [IDL-Doku zu loadComponentFromURL](http://api.openoffice.org/docs/common/ref/com/sun/star/frame/XComponentLoader.html).

### Technische Hinweise

- Angaben ohne Pfad werden wie allgemein üblich mit Hilfe der
    Systemvariable PATH aufgelöst.
- Nach dem Start einer externen Anwendung schließt der WollMux
    normalerweise den Standardeingabe-, Standardausgabe- sowie den
    Standardfehlerkanal, um zu verhindern, dass die Anwendung blockiert
    weil sie auf Eingabe wartet bzw. Ausgabe tätigen möchte. Nicht alle
    Programme kommen damit zurecht. Für Programme, die mit diesem
    Verhalten Probleme haben, kann entweder das [Attribut PIPE "true"](#pipe-trueoderfalse)
    gesetzt oder ein einfaches Skript als Wrapper geschrieben werden,
    das die Eingabe/Ausgabe von/zu entsprechenden Stellen umleitet.

DOWNLOAD "&lt;true_oder_false&gt;"
----------------------------

Die Angabe des Attributs DOWNLOAD ist optional (Defaultwert ist
"false"). Im Falle DOWNLOAD "false" wird der externen Anwendung die URL
der zu öffnenden Datei direkt als URL übergeben. Im Falle DOWNLOAD
"true" wird die URL erst heruntergeladen und in einer temporären Datei
gespeichert, deren Pfad an die externe Anwendung übergeben wird.

### Technische Hinweise

- Die temporäre Datei wird im Standardverzeichnis für
    benutzerspezifische temporäre Daten gespeichert (unter Windows 2000
    ist dies C:\\Dokumente und Einstellungen\\&lt;Anmeldekürzel&gt;\\Lokale
    Einstellungen\\Temp), in einem Unterverzeichnis
    wollmuxbar-temp-download-&lt;Zahl&gt;, wobei &lt;Zahl&gt; bei jeder Datei um 1
    heraufgezählt wird.
- Die temporäre Datei wird durch den WollMux nicht
    automatisch gelöscht. Eine automatische Löschung ist technisch nicht
    möglich, da der WollMux keine Möglichkeit hat, festzustellen, wann
    die Datei nicht mehr benötigt wird. Viele Anwendungen (z.B. der
    Acrobat Reader) testen auf eine bereits laufende Instanz und reichen
    den Aufruf falls eine gefunden wird an diese weiter. Deshalb ist die
    Beendigung des aufgerufenen Programms kein hinreichender Hinweis
    darauf, dass die temporäre Datei nicht mehr benötigt wird.\
    Eine automatische Löschung der temporären Datei durch den WollMux
    ist allerdings auch nicht erforderlich. Viele Anwendungen schreiben
    Dateien in dieses temporäre Verzeichnis, ohne diese später
    zu löschen. Eine Löschstrategie für dieses Verzeichnis kann also
    vorausgesetzt werden. Auf dem Basisclient zum Beispiel wird das
    verwendete Verzeichnis (/tmp) bei jedem Reboot gelöscht.

PIPE "&lt;true_oder_false&gt;"
------------------------

Die Angabe des Attributes PIPE ist optional (Defaultwert ist "false").
Hat es den Wert "true", so liest der WollMux bzw. die WollMuxBar nach
Start der externen Anwendung deren Stdout und Stderr permanent aus. Ist
PIPE "false" oder fehlt, so schließt der WollMux diese Kanäle nach Start
der Anwendung. Es gibt manche Anwendungen (z.B. der Adobe Reader), die
mit PIPE "false" nicht funktionieren. Da das Auslesen von Stdout/Stderr
einen laufenden Thread erfordert, ist normalerweise ein Shell-Wrapper
mit Umleitung nach /dev/null die bessere Wahl. Ein Nebeneffekt von PIPE
"true", der für das Debugging nützlich ist ist, dass der WollMux alle
Ausgaben des externen Programms in die wollmux.log kopiert.

FILTER "&lt;Filtername&gt;"
---------------------

Die Angabe des Attributs FILTER ist nur notwendig, wenn der WollMux
Dateien für diese Anwendung schreiben muss. Dies ist z.B. der Fall, wenn
die externe Anwendung über die [ACTION "closeAndOpenExt" oder "saveTempAndOpenExt"](Dokumentkommandos_des_WollMux.md#action-aktion),
die für einen Button in der Formular-GUI eines WollMux-Formulars
hinterlegt ist, ausgeführt werden soll. Wenn ein Button mit der ACTION
"closeAndOpenExt" oder "saveTempAndOpenExt" in einer Formular-GUI
angeklickt wird, so speichert der WollMux das aktuelle Formular in einer
temporären Datei, die dann von der angegeben Anwendung geöffnet wird.
Das Attribut FILTER gibt also in diesem Fall an, in welchem Format das
Formular als temporäre Datei gespeichert werden soll. Dazu stehen dem
WollMux alle Export-Filter zur Verfügung, die auch der verwendeten
Version von OpenOffice.org zur Verfügung stehen.

Die zur Verfügung stehenden Filter lassen sich (bei OpenOffice.org 3.1)
in der Datei
&lt;Installationsverzeichnis&gt;`/basis3.1/share/registry/modules/org/openoffice/TypeDetection/Filter/fcfg_writer_filters.xcu`
finden. Der als Filtername für das FILTER-Attribut zu verwendende
Bezeichner ist der dem gewünschten Format entsprechende String, der in
dieser Datei hinter `<code><node oor:name=</code>` steht. Wichtig: Es
können nur solche Filter zum Speichern verwendet werden, bei denen in
der darauf folgenden Zeile (beginnt mit `<prop oor:name="Flags">`) das
Wort "EXPORT" steht. Beispiele für legale Filternamen sind z.B. "Rich
Text Format", "HTML (StarWriter)", "MS Word 95", "writer\_pdf\_Export",
etc.

Der Abschnitt SachleitendeVerfuegungen
======================================

Der Abschnitt SachleitendeVerfuegungen enthält Attribute, über die das
Verhalten der Funktionen der Sachleitenden Verfügunen gesteuert werden
können. Der Abschnitt hat folgenden Aufbau:

```
SachleitendeVerfuegungen(
  NUMBERS "<zahlenformat>"
  ABDRUCK_NAME "<alternative-Bezeichnung>"

  ALL_VERSIONS_HIGHLIGHT_COLOR "<farbe>"
  NOT_IN_ORIGINAL_HIGHLIGHT_COLOR "<farbe>"
  ORIGINAL_ONLY_HIGHLIGHT_COLOR "<farbe>"
  DRAFT_ONLY_HIGHLIGHT_COLOR "<farbe>"
  COPY_ONLY_HIGHLIGHT_COLOR "<farbe>"
)
```

Das Attribut NUMBERS: Steuert die Darstellung der Ziffern von Verfügungspunkten und kann entweder die Werte "roman" (I., II., III., ...) oder "arabic" (1., 2., 3., ...) enthalten. Fehlt das Attribut, so ist "roman" Standardeinstellung.

Das Attribut ABDRUCK\_NAME: Ermöglicht die Definition einer alternativen Bezeichnung für "Abdruck", so dass bei Abdrücken z.B. der Text "2. Kopie von 1." angezeigt werden könnte. Fehlt dieses Attribut, so gilt die Standardeinstellung "Abdruck".

Die Attribute \*\_HIGHLIGHT\_COLOR "&lt;farbe&gt;": Über die Attribute \*\_HIGHLIGHT\_COLOR können Hintergrundfarben vergeben werden, mit denen die [Blöcke zur Drucksteuerung](Hilfen_fuer_Sachleitende_Verfuegungen_verwenden.md#die-schaltflächen-zur-drucksteuerung-einzelner-blöcke) der Sachleitenden Verfügungen hinterlegt werden können, um sie optisch abzuheben und damit leichter orten zu können. Die Farbe &lt;farbe&gt; wird als Hex-Zahl in der Form AARRGGBB (A=Alpha, R=Rot, G=Grün, B=Blau) beschrieben (z.B. entspricht "00ff0000" der Farbe rot). Führende Nullen können dabei weggelassen werden - so kann die vorherige Beispielzahl auch als "ff0000" beschrieben werden. Um den Druckblock ohne farbliche Markierung erscheinen zu lassen, ist der Wert **"none"** zu verwenden. Der vordere Teil des Attributnamens (z.B. ALL\_VERSIONS) ist analog zu den Namen der entsprechenden [Dokumentkommandos](Hilfen_fuer_Sachleitende_Verfuegungen_verwenden.md#) benannt. Beim Drucken der Sachleitenden Verfügungen werden die in \*\_HIGHLIGHT\_COLOR gesetzten Farben **nicht** mit ausgedruckt.

Ein Beispielabschnitt sieht wie folgt aus:

```
SachleitendeVerfuegungen(
  NUMBERS "arabic"
  ABDRUCK_NAME "Kopie"

  ALL_VERSIONS_HIGHLIGHT_COLOR "ff0000"
  NOT_IN_ORIGINAL_HIGHLIGHT_COLOR "00ff00"
  ORIGINAL_ONLY_HIGHLIGHT_COLOR "ff00ff"
  DRAFT_ONLY_HIGHLIGHT_COLOR "0000ff"
  COPY_ONLY_HIGHLIGHT_COLOR "b8ffb8"
)
```

Verwendet arabische Ziffern für die Zählung der Verfügungspunkte und
schreibt für Abdrücke immer "1. Kopie von 2.", statt "II. Abdruck von
I.". Wird nun z.B. über die Schaltfläche [Block: immer drucken](Hilfen_fuer_Sachleitende_Verfuegungen_verwenden.md#schaltfläche-immer-drucken)
ein Block "immer Drucken" (repräsentiert durch das [Dokumentkommando allVersions](Dokumentkommandos_des_WollMux.md#das-kommando-allversions))
eingefügt, so wird dieser Block mit der Hintergrundfarbe hinterlegt, die
in ALL\_VERSIONS\_HIGHLIGHT\_COLOR definiert ist (in diesem Fall rot).

Innerhalb der Konfigurationsdatei können mehrere Abschnitte
*SachleitendeVerfuegungen* vorkommen. Der WollMux verwendet dabei immer
die zuletzt gesetzten Werte. So ist es z.B. möglich, zentrale Vorgaben
zu machen und diese an einer späteren Stelle an speziellere Bedürfnisse
anzupassen.

Lokalisierung
=============

Automatische Anpassungen
------------------------

Der WollMux passt sich automatisch an diverse regionsspezifische
Merkmale an.

### Dezimaltrennzeichen

[WollMux-Funktionen](#arithmetik)
verwenden automatisch das für die in OpenOffice.org eingestellte Region
passende Dezimaltrennzeichen (normalerweise Punkt oder Komma).

> **INFO** [Issue 80654](http://qa.openoffice.org/issues/show_bug.cgi?id=80654) sorgt unter Umständen für eine falsche Erkennung der Region, wenn die gewählte Benutzerinterface-Sprache von den gewählten Ländereinstellungen abweicht.

Der Abschnitt L10n
------------------

Über den Abschnitt *L10n* in der `wollmux.conf` können manuelle
Lokalisierungsanpassungen vorgenommen werden.

### Unterabschnitt Messages

Der Unterabschnitt *Messages* ist verantwortlich für die Übersetzung der
vom WollMux angezeigten Texte, inklusive der Beschriftung von Buttons,
Menüs,... Folgendes Beispiel demonstriert seinen Aufbau:

```
Messages(
       original "Bearbeiten..."    # Originaltext, normalerweise deutsch
         en "Edit..."              # Übersetzung in Sprache "en"(glisch)
         nl "Wijzigen..."          # Übersetzung in Sprache "n"(ieder)"l"(ändisch)

       original "Welchen Absender möchten Sie für Ihre Briefköpfe verwenden ?"
         en "Which sender do you want to use in your letters?"
         nl "Welk afzender willt u voor de briefhoofden gebruiken?"

       original "Schließen"
         en "Close"
         nl "Sluiten"
)
```

Der WollMux beachtet die folgenden Quellen zur Bestimmung der zu
verwendenden Sprache. Quellen mit höherer Nummer überschreiben jeweils
die Auswahl durch Quellen mit niedrigerer Nummer.

1.  In OpenOffice.org eingestellte Sprache (WollMux-Komponente) bzw. im
    Betriebssystem eingestellte Sprache (WollMuxBar)
2.  Umgebungsvariable `LC_MESSAGES` (Zusätze wie ".UTF-8" oder "@UTF-8"
    werden ignoriert)

Über den Abschnitt LanguageAliases (siehe unten) lassen sich
verschiedene Kürzel auf die selbe Sprache abbilden.

### Unterabschnitt LanguageAliases

Teilweise gibt es verschiedene Sprachkürzel, die die selbe Sprache
beschreiben oder Sprachkürzel, die fast identische Sprachen bezeichnen.
Um nicht die selben Übersetzungen mehrfach speichern zu müssen, lässt
sich über LanguageAliases festlegen, dass wenn Sprache X eingestellt
ist, die Meldungen zu Sprache Y verwendet werden sollen, *wenn keine
spezielle Meldung für Sprache X vorhanden ist*. Die Verwendung eines
Aliases verhindert also nicht die Verwendung spezifischer Texte. Es ist
dadurch möglich, z.B. für die Sprache en\_UK alle Meldungen aus der
Sprache en\_US zu "erben", jedoch für bestimmte Texte eine abweichende
Meldung zu hinterlegen. Folgendes Beispiel demonstriert den Aufbau des
Abschnitts:

```
LanguageAliases(
   ("en"   "en_US" "en_UK" ...)
   ("de"   "de_DE" "de_AT" ...)
   ...
  )
```

Das erste Sprachkürzel der Zeile ist das Kürzel unter dem die Texte im
Abschnitt *Messages* hinterlegt sind. Alle folgenden Kürzel sind die
Sprachen für die (in Abwesenheit spezifischer Einträge in *Messages*)
ebenfalls die selben Texte verwendet werden sollen.

Dokumentaktionen
================

Der Abschnitt *Dokumentaktionen* bietet die Möglichkeit, dynamisch zu
steuern, wie der WollMux Dokumente und Vorlagen verarbeitet. Sein Aufbau
entspricht dem des Abschnitts *[Funktionen](#funktionen)*.

```
Dokumentaktionen(
  DMS(
    SELECT(
       # Falls die Benutzervariable FSC_CFGMUENCHEN_... vorhanden und leer ist => Vorlage bearbeiten
      IF(STRCMP(VALUE "User/FSC_CFGMUENCHEN_15_1700_DocumentObjname" "") THEN "noaction")
       # Falls die Benutzervariable FSC_CFGMUENCHEN_... vorhanden und nicht leer ist
       #   => Wir sind Sachbearbeiter und wollen Expansionen und FormularGUI haben.
      ELSE "allactions"
       # Falls die Benutzervariable FSC_CFGMUENCHEN_... *nicht* vorhanden ist, bricht SELECT
       # bereits beim ersten IF ab (weil STRCMP einen Fehler liefert weil VALUE einen Fehler liefert)
       # und liefert den ONERROR-Wert zurück. Leerstring bedeutet => Diese Dokumentaktionen-Funktion
       # hat keine Meinung dazu, wie das Dokument verarbeitet werden soll.
      ONERROR ""
    )
  )
)
```

- Die WollMux-Funktionen in diesem Abschnitt werden der Reihe nach
    aufgerufen, bevor der WollMux das Dokument bearbeitet.

> **INFO** Bestimmte, teils auch verändernde, Handlungen führt der WollMux noch vorher aus.

- Die erste Funktion, die einen Wert ungleich leer zurückliefert
    bestimmt, wie der WollMux das Dokument behandeln soll. Weitere
    Funktionen werden dann nicht aufgerufen.
- Gibt die Funktion den Wert "noaction" zurück, behandelt der WollMux
    das Dokument wie eine zum Bearbeiten geöffnete Vorlage, d.h. es
    werden weder Expansionen ausgeführt noch Werte eingefügt noch wird
    eine FormularGUI gestartet.
- Gibt die Funktion den Wert "allactions" zurück, führt der WollMux
    alle sinnvollen Aktionen auf dem Dokument aus, auch wenn dies
    ansonsten nicht geschehen wäre (z.B. bei einer zum Bearbeiten
    geöffneten Vorlage). Unsinnige Aktionen, wie das Anzeigen einer
    FormularGUI bei einem Dokument ohne Formularbeschreibung, werden
    nicht durchgeführt.
- In den Funktionen des Dokumentaktionen-Abschnitts wird die [VALUE     Grundfunktion](Konfigurationsdatei_wollmux.conf#VALUE_.3CArgument.3E)
    wie folgt verwendet:
    - Das Argument ist in der Form "&lt;Namensraum&gt;/&lt;id&gt;".
    - Derzeit wird für &lt;Namensraum&gt; nur "User" unterstützt, was auf
        Benutzervariablen (siehe Feldbefehle) zugreift. Die id ist in
        dem Fall der Variablenname.

Optionale Funktionen der WollMuxBar
===================================

Folgende Funktionen der WollMuxBar sind optional und können über die
Konfigurationsdatei *wollmux.conf* ein- oder ausgeschalten werden. Diese
Einstellungen sind in der Regel für Entwickler, für die Fehlersuche oder
die Evaluierung experimenteller Funktionen interessant:

Die Option ALLOW\_USER\_CONFIG
------------------------------

Über die Option ALLOW\_USER\_CONFIG kann gesteuert werden, ob die
[Konfigurationsdatei *wollmuxbar.conf*](WollMuxBar#Konfiguration) beim Starten der
WollMuxBar ausgewertet werden darf, oder nicht. Ist diese Option
deaktiviert, so wird die Konfiguration der WollMuxBar ausschließlich aus
der Konfigurationsdatei *wollmux.conf* bezogen und die Einstellung aus
der Datei *wollmuxbar.conf* ignoriert (falls die Datei existiert).
Außerdem werden in diesem Fall die Buttons mit den
[Aktionen](#das-attribut-action) "menuManager" und "options"
nicht in der WollMuxBar angezeigt, d.h. die Funktionen
[Menümanager](WollMuxBar#menü-manager) und
[Optionen-Dialog](WollMuxBar#optionen-dialog) stehen in
diesem Modus nicht zur Verfügung.

**Die Option ist standardmäßig aktiviert**, d.h. die Datei
*wollmuxbar.conf* wird standardmäßig ausgewertet. Sie kann über folgende
Zeile in der Konfigurationsdatei *wollmux.conf* deaktiviert werden:

`ALLOW_USER_CONFIG "false"`

Hintergrund dieser Option: Da die Einstellungen in der Datei *wollmuxbar.conf* grundsätzlich Vorrang vor den Einstellungen in der Datei *wollmux.conf* haben, besteht das Risiko, dass Benutzer ungewollt eine vorgegebene Einstellung aus den Referaten überschreiben. Durch Deaktivierung der Option ALLOW\_USER\_CONFIG kann dies (dauerhaft oder zum Zweck der Fehlersuche) sicher vermieden werden.

Die Option ALLOW\_MENUMANAGER
-----------------------------

Über die Option ALLOW\_MENUMANAGER kann gesteuert werden, ob der
[Menümanager](WollMuxBar#menü-manager) in der WollMuxBar
angezeigt werden darf. Ist die Option deaktiviert, werden die Buttons
mit den [Aktionen](#das-attribut-action) "menuManager" und
"options" nicht in der WollMuxBar angezeigt.

**Die Option ist standardmäßig deaktiviert.**, d.h. der Menümanager wird
standardmäßig nicht in der WollMuxBar angezeigt. Über
[--mm](WollMuxBar#-mm) oder folgende Zeile in der
Konfigurationsdatei *wollmux.conf* kann der Menümanager aktiviert
werden:

`ALLOW_MENUMANAGER "true"`

Hintergrund dieser Option: Der Menümanager verfolgt einen ähnlichen Zweck wie der derzeit in der LHM etablierte *automux*-Mechanismus zur Steuerung der Inhalte der WollMuxBar. Es ist aktuell unklar, ob der Menümanager den *automux*-Mechanismus zukünftig ablösen wird und es gibt noch kein durchgängiges Konzept dafür, wie die Pflege einer zentral bereitgestellten WollMuxBar in diesem Fall erfolgen kann. **Der Menümanager ist aus diesem Grund als experimentell eingestuft.** Für Evaluierungszwecke oder kleine Administrationseinheiten, die auf eine zentrale WollMuxBar-Konfiguration verzichten möchten, kann der Menümanager mit obiger Anweisung jedoch temporär oder dauerhaft aktiviert werden. Es ist möglich, dass sich die Voreinstellung für diese Option zukünftig ändert.

Die Option ALLOW\_EXTERNAL\_WOLLMUX
-----------------------------------

Die Option ALLOW\_EXTERNAL\_WOLLMUX unterstützt die WollMux-Entwickler
beim Debugging und ist auf der Seite [Wollmux-Debugging - Einstellungen\_in\_der\_wollmux.conf](Wollmux-Debugging.md#verwendung)
ausführlicher beschrieben.

**Sie ist standardmäßig deaktiviert** und kann über folgende Zeile in
der Konfigurationsdatei *wollmux.conf* aktiviert werden:

`ALLOW_EXTERNAL_WOLLMUX "true"`

FormularMax4000
===============

Im Abschnitt *FormularMax4000* können Einstellungen zum [FormularMax 4000](FormularMax_4000.md) getätigt werden.

Unterabschnitt *Standardelemente*
---------------------------------

Im Unterabschnitt *Standardelemente* des Abschnitts *FormularMax4000*
wird festgelegt, welche Einträge im Menü *Einfügen/Standardelemente
einfügen* vorhanden sein sollen. Folgendes Beispiel demonstriert seinen
Aufbau (eine Erklärung der im Beispiel verwendeten
Formular-GUI-Beschreibung findet sich unter [Dokumentkommandos des WollMux](okumentkommandos_des_WollMux.md#beschreibung-der-formular-gui)):

```
FormularMax4000(
 Standardelemente(
   (  LABEL "Empfängerauswahl-Tab"
      Tab(
        Empfaengerauswahl(
          TITLE "Empfänger"
          CLOSEACTION "abort"
          TIP "Hier können Sie den Empfänger auswählen"
          HOTKEY "E"
          
          Eingabefelder(
            (LABEL "Zustellvermerk" TYPE "combobox" ID 
               "EmpfaengerZustellvermerk" VALUES("", "Einschreiben" "Einschreiben eigenhändig" "Einschreiben mit Rückschein" "Einschreiben eigenhändig mit Rückschein" "elektronischer Postzustellungsauftrag" "gegen Empfangsbekenntnis" "gegen Postzustellungsurkunde" "per E-Mail" "per Telefax" "öffentliche Zustellung"))
            
            (LABEL "Empfänger Zeile 1" TYPE "textfield" ID "EmpfaengerZeile1"
               AUTOFILL(DIALOG("Empfaengerauswahl","EmpfaengerZeile1"))
            )
            (LABEL "Empfänger Zeile 2" TYPE "textfield" ID "EmpfaengerZeile2"
               AUTOFILL(DIALOG("Empfaengerauswahl","EmpfaengerZeile2"))
            )
            (LABEL "Empfänger Zeile 3" TYPE "textfield" ID "EmpfaengerZeile3"
               AUTOFILL(DIALOG("Empfaengerauswahl","EmpfaengerZeile3"))
            )
            (LABEL "Empfänger Zeile 4" TYPE "textfield" ID "EmpfaengerZeile4"
               AUTOFILL(DIALOG("Empfaengerauswahl","EmpfaengerZeile4"))
            )
            (LABEL "Empfänger Zeile 5" TYPE "textfield" ID "EmpfaengerZeile5"
               AUTOFILL(DIALOG("Empfaengerauswahl","EmpfaengerZeile5"))
            )
            (LABEL "Empfänger Zeile 6" TYPE "textfield" ID "EmpfaengerZeile6"
               AUTOFILL(DIALOG("Empfaengerauswahl","EmpfaengerZeile6"))
            )
            (LABEL "Ihr Schreiben vom" TYPE "textfield" ID "IhrSchreibenVom")
            (LABEL "Ihr Zeichen" TYPE "textfield" ID "IhrZeichen")
            (LABEL "Unser Zeichen" TYPE "textfield" ID "UnserZeichen")
          )
          Buttons(
            (LABEL "Abbrechen"  TYPE "button" HOTKEY "A"  ACTION "abort" TIP "Zum Abbrechen hier klicken")
            (TYPE "glue" MINSIZE "20")
            (LABEL "Adressauswahl" TYPE "button" HOTKEY "S"  ACTION "funcDialog" DIALOG "Empfaengerauswahl" TIP "Hier kommen Sie zur Empfängerauswahl")
            (TYPE "glue" MINSIZE "20")
            (LABEL "Weiter->"  TYPE "button" HOTKEY "W"  ACTION "nextTab")
          )
        )
     )
   )

   (  LABEL "Abbrechen, <-Zurück, Weiter->"
      Buttons(
       (LABEL "Abbrechen"  TYPE "button" HOTKEY "A"  ACTION "abort")
       (TYPE "glue" MINSIZE "20")
       (LABEL "<-Zurück"  TYPE "button" HOTKEY "Z"  ACTION "prevTab")
       (LABEL "Weiter->"  TYPE "button" HOTKEY "W"  ACTION "nextTab")
      )
   )

   ( LABEL "Abbrechen, <-Zurück, PDF, Drucken"
     Buttons(
       (LABEL "Abbrechen"  TYPE "button" HOTKEY "A"  ACTION "abort")
       (TYPE "glue" MINSIZE "20")
       (LABEL "Als Pdf speichern..." TYPE "button" HOTKEY "S" ACTION "form2PDF")
       (TYPE "glue" MINSIZE "20")
       (LABEL "<-Zurück"  TYPE "button" HOTKEY "Z"  ACTION "prevTab")
       (LABEL "Drucken..." TYPE "button" HOTKEY "D" ACTION "printForm")
     )
   )

   ( LABEL "Abbrechen, <-Zurück, Speichern, Drucken"
     Buttons(
       (LABEL "Abbrechen"  TYPE "button" HOTKEY "A"  ACTION "abort")
       (TYPE "glue" MINSIZE "20")
       (LABEL "Speichern..." TYPE "button" HOTKEY "S" ACTION "save")
       (TYPE "glue" MINSIZE "20")
       (LABEL "<-Zurück"  TYPE "button" HOTKEY "Z"  ACTION "prevTab")
       (LABEL "Drucken..." TYPE "button" HOTKEY "D" ACTION "printForm")
     )
   )
 )
)
```

<Category:Eierlegender_WollMux> <Category:Handbuch_des_WollMux>
