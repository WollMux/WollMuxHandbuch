# {{ page.title }}

Der WollMux erlaubt eine unzählige Vielfalt von Konfigurations- und Einstellungsmöglichkeiten. Um den Referaten eine Hilfestellung an die Hand zu geben und stadtweit einheitliche Vorgaben umzusetzen wurde die WollMux-Standardkonfiguration entwickelt. Die Standardkonfiguration bietet flexible Möglichkeiten zur Anpassung an die jeweiligen Bedürfnisse der Referate. Diese Seite gibt einen umfassenden Überblick über den Aufbau, die  Installation, die Anpassung und die Pflege einer Standardkonfiguration.

## Download

D-III-ITD-D101 stellt Basisarchive der Standardkonfiguration auf der Seite [Standardkonfiguration des WollMux downloaden](../Hauptseite.md) zur Verfügung.

## Installation

Installation und Pflege einer Standardkonfiguration sind im Artikel [Standardkonfiguration des WollMux installieren und pflegen](Standardkonfiguration_des_WollMux_installieren_und_pflegen) erklärt.

## Verzeichnisstruktur

Hier ist eine schematische Übersicht über die Verzeichnisstruktur der Standardkonfiguration. In den nachfolgenden Abschnitten sind die Bedeutungen der einzelnen Verzeichnisse kurz erläutert.

```
conf/
scripts/
plugins/
vorlagen/fragmente/
vorlagen/fragmente/beispiele
vorlagen/`<Benutzergruppe 1>\
vorlagen/`<Benutzergruppe 2>\
...
```

**`conf/`**

Der WollMux hat konzeptuell nur eine einzige Konfigurationsdatei, die [`wollmux.conf`](Konfigurationsdatei_wollmux_conf.md). Zur besseren Wartbarkeit ist diese in der Standardkonfiguration auf mehrere Einzeldateien aufgeteilt. Mittels des [`%include-Mechanismus`](Format_von_WollMux-Config-Dateien.md#include) werden diese wieder zu einer einzigen Konfiguration vereinigt. All diese `.conf`-Dateien befinden sich im Verzeichnis `conf/`. Einige der Dateien in diesem Verzeichnis sind für die Anpassung durch die Referate vorgesehen, andere sollten durch die Referate nicht geändert werden. Zu welcher Gruppe eine Datei gehört ist jeweils in einem Kommentar am Anfang der Datei vermerkt.

**`scripts/`**

Dieses Verzeichnis enthält diverse Shell-Skripte zur Wartung und Pflege der Standardkonfiguration. Für die Referate sind nur die Skripte `xupdate` und `run_automux` interessant.

**`plugins/`**

Der WollMux lässt sich um referatseigene Java-Plugins erweitern. Diese können eine Vielzahl von Aufgaben übernehmen. Einige Anwendungsbeispiele:

* Komplexe Plausibilitätsprüfungen von Formularen, die sich mit WollMux-Grundfunktionalitäten nicht realisieren lassen, z.B. die Prüfung ob ein eingegebenes Datum auf einen Werktag fällt
* Komplexe Transformationen von aus Datenquellen eingefügten Daten, z.B. das Umwandeln eines Namens in Großbuchstaben
* Einfügen von Daten aus vom WollMux nicht unterstützten Quellen, wie z.B. INI-Dateien.

WollMux-Plugins werden in Java geschrieben. Die kompilierten `.class`-Dateien werden in entsprechende Unterverzeichnisse von `plugins` kopiert, wie z.B. `de/muenchen/kvr` als Verzeichnis für die Plugins des KVR. Die Verwendung entsprechender Plugins ist in der [Dokumentation der wollmux.conf](Konfigurationsdatei_wollmux_conf.md#einbinden-referatseigener-pluginsclasspath) und der [Dokumentation des FormularMax 4000](FormularMax_4000.md#referatsspezifische-plugins) näher beschrieben.

**`vorlagen/fragmente/`**

Die in diesem Verzeichnis enthaltenen Dateien sind die Fragmente aus denen die Standardbriefköpfe dynamisch zusammengesetzt werden. Änderungen an den Standardbriefköpfen schlagen sich immer in Änderungen dieses Verzeichnisses nieder. Die Dateien im `fragmente` Verzeichnis werden ausschließlich zentral gepflegt. Die Referate sollten keine der in diesem Verzeichnis enthaltenen Dateien bearbeiten und auch keine eigenen Dateien in diesem Verzeichnis anlegen, ansonsten kann das `xupdate`-Skript zum automatisierten Update der Konfiguration nicht mehr verwendet werden.

**`vorlagen/fragmente/beispiele`**

Die Referate dürfen für ihre eigenen Fragmente beliebige Unterverzeichnisse im Verzeichnis `vorlagen/fragmente/` anlegen, solange die Namen dieser Unterverzeichnisse keine Dateierweiterung besitzen. Das Verzeichnis `vorlagen/fragmente/beispiele` ist ein Beispiel dafür, wie ein solches Unterverzeichnis verwendet werden kann, um dort Textbausteine zu hinterlegen.

**`vorlagen/<Benutzergruppe X>`**

Es ist oft erforderlich, dass nicht alle Benutzer eines Referats die selbe WollMux-Konfiguration verwenden. Insbesondere was die angebotenen Menüs und Vorlagen in der WollMuxBar angeht, gibt es oft unterschiedliche Anforderungen. Zum Beispiel benötigen die Mitarbeiterinnen und Mitarbeiter der Abteilungen D-III-LiMux und D-III-ITD-D.10 das LiMux-Logo in der Fußzeile des externen Briefkopfs. Alle anderen Personen von D-III jedoch sollen dieses Logo nicht in der Fußzeile haben. Die Unterverzeichnisse von `vorlagen/` mit Ausnahme von `vorlagen/fragmente/` werden verwendet, um die Konfigurationen der einzelnen Benutzergruppen zu definieren.

## Fußzeilenangaben

In der Fußzeile des externen Briefkopfes werden neben einem Logo, z.B. die URL einer Webseite, ÖPNV-Verbindungen und Bankverbindungen angegeben. Die entsprechenden Angaben werden typischerweise entweder von der Orga-Einheit (Bankverbindungen, Webseite) oder dem Dienstgebäude (ÖPNV-Verbindungen) abgeleitet. Entsprechende Fußzeilenvorbelegungen werden über die Dateien `mapOrgaKurz.conf` und `mapDienstgebaeude.conf` konfiguriert. Die Anpassung des Logos funktioniert anders und wird später beschrieben.

Alle `map...` Dateien haben den selben grundlegenden Aufbau, der hier am Beispiel der `mapOrgaKurz.conf` erläutert wird.

```
Schema("OrgaKurz" "FussSpalte1" "FussSpalte2" "FussSpalte3" "FussSpalte4")
Daten(
 ("D-III-ITD-D10"
    ""  
    ""
    "Internet:%nhttp://www.muenchen.de/limux"
    ""
 )

 ( <Datensatz 2> )

 ( <Datensatz 3> )

    ...

)#Daten
```

Die Datei spezifiziert eine Tabelle mit mehreren Spalten. Die *Schema*-Zeile gibt an, welche Spalten die Tabelle hat. Im *Daten*-Abschnitt sind die entsprechenden Datensätze (d.h. die Zeilen der Tabelle) aufgeführt. Alle `map...` Dateien bilden einen Wert aus den Sachbearbeiterdaten, wie sie im städtischen Verzeichnis gespeichert sind auf Zusatzinformationen ab. Die erste Spalte ist immer der entsprechende Wert in den Sachbearbeiterdaten, im obigen Beispiel die *OrgaKurz* des Sachbearbeiters. Die anderen Spalten sind die Zusatzinformationen, die für alle Sachbearbeiter vorbelegt sein sollen, die in ihren Daten die entsprechende *OrgaKurz* haben. Im obigen Beispiel soll bei allen Mitarbeitern von D-III-ITD-D10 in der dritten Spalte der Fußzeile die Web-Adresse des LiMux-Projektes stehen. Die anderen 3 Spalten Fußzeile werden nicht belegt. Beachten Sie, dass dies nicht heißt, dass diese Spalten leer bleiben. Es heißt nur, dass sie nicht in Abhängigkeit von der *OrgaKurz* belegt werden.

Wenn Sie in die Datei `mapDienstgebaeude.conf` schauen, sehen Sie dort den selben Aufbau, diesmal jedoch ist die erste Spalte *Dienstgebaeude* nicht *OrgaKurz*. Wenn Sie genau hinsehen, werden Sie auch merken, dass Spalten mit den Zusatzinformationen alle eine “2” am Ende tragen. Statt *FussSpalte1* steht hier *FussSpalte12*. Im externen Briefkopf wird sowohl der Text aus *FussSpalte1* als auch der aus *FussSpalte12* in der ersten Spalte der Fußzeile angezeigt. Wenn Sie die Beispielangaben in `mapDienstgebaeude.conf` ansehen, werden Sie feststellen, dass dort für die “Sonnenstr. 25” (dies ist das Dienstgebäude von D-III-ITD-D10) für *FussSpalte12* und *FussSpalte22* ÖPNV-Verbindungen eingetragen sind. Die 3. und 4. Spalte sind unbelegt. Da wie oben erwähnt sowohl *FussSpalteX* als auch *FussSpalteX2* im Briefkopf angezeigt werden, ergibt sich für einen Mitarbeiter von D-III-ITD-D10 folgendes Bild:

* die 1. und 2. Spalte enthalten die ÖPNV-Angaben aus `mapDienstgebaeude.conf`
* die 3. Spalte enthält die URL der Webseite des LiMux-Projekts aus `mapOrgaKurz.conf`

Im Prinzip hätte man auch die ÖPNV-Verbindungen in der `mapOrgaKurz.conf` eintragen können. Dies stattdessen in der `mapDienstgebaeude.conf` zu tun, hat jedoch den Vorteil, dass die Angaben damit für die Mitglieder anderer Orga-Einheiten, die ebenfalls in der Sonnenstr. 25 ihren Sitz haben, mit gelten, wogegen bei einer Pflege in der `mapOrgaKurz.conf` alleine für jede weitere Orga-Einheit ein neuer Datensatz angelegt werden müsste.

> **HINT** Wann immer möglich, sollten Angaben vom Dienstgebäude abgeleitet werden, um den Wartungsaufwand zu reduzieren. Dies erfordert jedoch die Einigung auf ein gemeinsames Format der Fußzeile für alle Orga-Einheiten im selben Dienstgebäude. Wenn auch nur eine einzige Orga-Einheit in einem Dienstgebäude Sonderwünsche bzgl. ihrer Fußzeile hat, müssen meist *alle* Orga-Einheiten dieses Dienstgebäudes über die `mapOrgaKurz.conf` mit dem entsprechenden Zusatzaufwand gepflegt werden.

## WollMux- und LibreOffice-Fenster

Der WollMux hat diverse Dialogfenster sowie die WollMux-Sidebar selbst, deren grundlegende Eigenschaften justiert werden können. Zudem gibt es die Möglichkeit, auch das Verhalten von LibreOffice-Fenstern zu konfigurieren.

Die Datei `fenster.conf` enthält die Vorkonfiguration, die nicht geändert werden sollte, da Änderungen nach einem Update mit `xupdate` verloren gehen. Nach Kopieren des entsprechenden Abschnitts in die `referat.conf` können dort die entsprechenden Anpassungen vorgenommen werden.

Informationen zu den möglichen Fenster-Einstellungen finden Sie in [der Dokumentation der `wollmux.conf`](Konfigurationsdatei_wollmux_conf.md#fenster).

## LibreOffice-Einstellungen

Es gibt diverse Einstellungen, die in LibreOffice gesetzt sein müssen, um das korrekte Funktionieren des WollMux sicherzustellen. Diese werden in der Datei `oooEinstellungen.conf` gesetzt. Auch wenn es technisch möglich wäre, die ganze Vorkonfiguration von LibreOffice über diesen Mechanismus abzuwickeln ist dies nicht ratsam, da die so festgelegten Einstellungen bei jedem Start von LibreOffice neu gesetzt werden und dadurch entsprechende Benutzereinstellungen überschreiben. Der Benutzer hat also nicht mehr die Möglichkeit, persistent die entsprechenden Einstellungen zu ändern.

## Tastenkürzel

Der WollMux hat verschiedene für Endanwender interessante Funktionen, z.B. für das Einfügen von Textbausteinen. Es kann wünschenswert sein, für diese Funktionen Tastenkürzel anzulegen. Für diesen Zweck ist die Datei `tastenkuerzel.conf` vorgesehen. Nähere Informationen zum Inhalt dieser Datei finden Sie im [Abschnitt *Tastenkuerzel* der Dokumentation zur `wollmux.conf`](Konfigurationsdatei_wollmux_conf.md#tastenkuerzel).

## Funktionen

An verschiedenen Stellen in WollMux-Formularen und Vorlagen können Funktionen eingesetzt werden. Zum Beispiel wird die Formatierung der Telefonnummer gemäß DIN-Norm in den Standardbriefköpfen über sog. Trafo-Funktionen realisiert. Funktionen können aber auch in Formularen zur Prüfung der Benutzereingaben auf Korrektheit (Plausi) oder zum automatischen Vorausfüllen von Feldern anhand der Werte anderer Felder (Autofill) eingesetzt werden. Einfache und nur einmal verwendete Funktionen werden typischerweise direkt in die betreffenden Formulare integriert. Dies ist jedoch nicht immer möglich oder zweckmäßig. Soll zum Beispiel in einer Vorlage, die kein WollMux-Formular ist eine Trafo eingesetzt werden (wie dies z.B. beim normalen internen Briefkopf der Fall ist) gibt es keine Formularbeschreibung, in die man die Funktion integrieren könnte.

In Fällen, in denen man eine Funktion nicht direkt in eine Vorlage einbetten kann oder möchte, wird diese Funktion über die WollMux-Konfiguration verfügbar gemacht. Die folgenden Abschnitte beschreiben, wie dies in einer Standardkonfiguration geschieht.

### Standardfunktionen

Die Datei `funktionen.conf` enthält die Standardfunktionen, die für [Plausis, Trafos und Autofills](FormularMax_4000.md#reiter-autofill-plausi-trafo-und-groups) verwendet werden können (Abschnitt *Funktionen*), sowie Standardkomfortdruckfunktionen (Abschnitt *Druckfunktionen*). Es handelt ich dabei nur um Deklarationen von im WollMux fest enthaltenen Funktionen. Der Programmcode der Funktion ist also nicht in der Standardkonfiguration enthalten, sondern im WollMux. Damit die entsprechende Funktion funktioniert, muss also eine WollMux-Version verwendet werden, die den Code tatsächlich enthält.

> **INFO** Änderungen an der `funktionen.conf` sind häufiger Auslöser für Inkompatibilitäten einer neuen Standardkonfiguration mit alten WollMux-Versionen. Diese äußern sich in Fehlermeldungen in der `wollmux.log`, die sich auf die entsprechende Funktion beziehen. Ob dies zu benutzersichtbaren Fehlern führt oder nicht hängt davon ab, ob die neue Funktion in den Standardbriefköpfen verwendet wird oder nicht. Falls sie nicht in den Standardbriefköpfen verwendet wird, kann der entsprechende Eintrag in der `funktionen.conf` einfach auskommentiert werden, um die Fehlermeldung zu beseitigen.

<!-- notwendig damit neues Kästchen gezeichnet wird -->
> **WARNING** Änderungen an den Deklarationen der Standardfunktionen sind zwar prinzipiell durch entsprechende eigene Einträge in der `referat.conf` möglich, sind jedoch mit Vorsicht zu genießen. Sollten Sie die Notwendigkeit sehen, die Standardfunktionen für Ihr Referat anzupassen, so erstellen Sie bitte ein Ticket, damit D-III-ITD-D101 Sie dabei unterstützen kann.

### Referatseigene Plugins

Die Referate können Ihre eigenen Java-Funktionen entwickeln bzw. entwickeln lassen, um dadurch beliebig komplexe Transformationen, Komfortdruckfunktionen etc. umzusetzen. Der WollMux bietet zu diesem Zweck eine Plugin-Schnittstelle, die in der [Beschreibung der `wollmux.conf`](Konfigurationsdatei_wollmux_conf.md#einbinden-referatseigener-pluginsclasspath) erläutert ist.

#### Beispiel-Plugin-Funktion: *Resturlaub*

Anhand der Funktion *Resturlaub* wird im Folgenden erklärt, wie das Einbinden eines Referatsplugins in der Standardkonfiguration umgesetzt wird. Die Funktion *Resturlaub* wird in einem Urlaubsantrag verwendet, um ein Formularfeld automatisch auszufüllen (Autofill). Dabei werden vom in einem Formularfeld einzugebenden Zahlenwert *Urlaubsanspruch* zwei Werte aus anderen Formularfeldern abgezogen, nämlich einerseits der bereits vorher beantragte Urlaub sowie der im neuen Urlaubsantrag beantragte Urlaub. Die Funktion *Resturlaub* ist also einfach

`Resturlaub = Urlaubsanspruch - BereitsBeantragt - JetztBeantragt`

Diese Funktion wollen wir über ein referatsspezifisches Java-Plugin realisieren. In diesem Fall wird die Funktion in einer Vorlage des KVR eingesetzt.

> **INFO** Der WollMux unterstützt seit der Version 3.8.1 auch arithmetische [Grundfunktionen](Konfigurationsdatei_wollmux_conf.md#grundfunktionen). Im Fall einer simplen Berechnung wie im Falle des Resturlaubs stellen diese Funktionen eine einfachere Alternative zu externen Plugins dar.

Die Funktion *Resturlaub* wird wie folgt (als externes Plugin) eingebunden:

* *Erstellen der `.class`-Datei*: Zu allererst wird eine entsprechende `.class`-Datei erstellt. Da die Funktion vom KVR gepflegt wird, wird sie gemäß der Java-Namenskonventionen im Package `de.muenchen.kvr` angelegt. Als Klassennamen wählen wir `FormularFunktionen`. Die Java-Programmierung selbst würden den Rahmen dieser Dokumentation sprengen. Wenden Sie sich diesbezüglich bitte an die Schulungsabteilung.
* *Kopieren der `.class` Datei ins Verzeichnis `plugins/`*: Die Standardkonfiguration sieht vor, dass Referatsplugins im Verzeichnis `plugins/` abgelegt werden. Da die Funktion *Resturlaub* wie oben festgelegt im Package `de.muenchen.kvr` angesiedelt ist, muss sie demzufolge im Verzeichnis `plugins/de/muenchen/kvr/` abgelegt werden. Es ist empfehlenswert, zu Referenzzwecken die `.java`-Datei im selben Verzeichnis abzulegen. Wenn man die Java-Entwicklung innerhalb einer lokalen Kopie der Standardkonfiguration erledigt, ergibt sich das von selbst.

  Wenn Sie in das Verzeichnis `plugins/de/muenchen/kvr/` der von D-III-ITD-D101 bereitgestellten Archive der Standardkonfiguration hineinschauen, dann finden Sie dort auch sowohl die Datei `FormularFunktionen.class` als auch den zugehörigen Quelltext `FormularFunktionen.java`. Wenn Sie die `.class` Datei selbst generieren wollen, so können Sie dies auf einem Basisclient auch einfach tun. Starten Sie eine Konsole, wechseln Sie in das Verzeichnis `plugins/de/muenchen/kvr/` und geben Sie folgenden Befehl ein

  `javac FormularFunktionen.java`

  (Löschen Sie vorher die Datei `FormularFunktionen.class`, um sich zu überzeugen, dass diese tatsächlich neu generiert wird.)
* *`CLASSPATH`-Eintrag für `plugins/`*: Damit externe Plugins überhaupt funktionieren, muss der folgende Eintrag in der `referat.conf` vorgenommen werden:

  `CLASSPATH "plugins/"`
* *Eintragen der EXTERN-Deklaration in `conf/plugins-kvr.conf`*: Die Standardkonfiguration sieht vor, dass Deklarationen referatseigener Plugins in Dateien nach dem Muster `conf/plugins-`<referat>`.conf` im Verzeichnis `conf/` eingetragen werden. Das von D-III-ITD-D101 bereitgestellte Archiv enthält auch bereits eine Datei `plugins-kvr.conf`, die dies demonstriert.

  > **WARNING** Funktionen müssen zur Verwendung nicht zwangsweise global deklariert werden und diese Deklaration hat durchaus ihre Nachteile. Lesen Sie hierzu die entsprechenden Hinweise in der [Dokumentation des FormularMax 4000](FormularMax_4000.md#referatsspezifische_plugins).

* *`%include "plugins-kvr.conf"`*: Damit die Deklaration der Funktion auch vom WollMux gesehen wird, muss die Datei `plugins-kvr.conf` über den [%include-Mechanismus](Format_von_WollMux-Config-Dateien.md#include) eingebunden werden. Dies erfolgt in der Datei `referat.conf`. Die von D-III-ITD-D101 bereitgestellten Archive demonstrieren dies bereits in der dort enthaltenen `referat.conf`

## Adressauswahl-Dialog

WollMux-Formulare bieten typischerweise einen Button *Adressauswahl*, über den der Sachbearbeiter aus Listen mit häufig verwendeten Adressen (z.B. andere Behörden) eine auswählen kann, die automatisch in das Empfängerfeld des Formulars eingetragen wird. Die Definition dieses Dialogs erfolgt im [Abschnitt *Funktionsdialoge*, Unterabschnitt *Empfaengerauswahl*](Konfigurationsdatei_wollmux.conf#Funktionsdialoge). Da die häufig verwendeten Empfänger von Dienststelle zu Dienststelle unterschiedlich sind, ist dieser Abschnitt in der `referat.conf` zu finden. Allerdings befindet sich dort nur der Rahmen. Die Definition der verschiedenen Reiter, die der Dialog anbietet, ist ausgelagert in 2 Dateien, die durch den [`%include`-Mechanismus](Format_von_WollMux-Config-Dateien.md#include) eingebunden werden:

* `adressauswahl-referat.conf`: Diese Datei ist dafür vorgesehen, dass die Referate dort die Reiter definieren, die referatsspezifische häufig verwendete Adressen bereitstellen. In den durch D-III-ITD-D101 verteilten Archiven ist dort zur Demonstration ein Reiter “Spielwarenläden” enthalten. Dieser Reiter demonstriert auch, wie durch die Kombination aus der Angabe `AUTOFILL ""` beim Textfeld mit `ID "suchanfrage"` und der Angabe des leeren Suchmusters `spielwarenlaeden()` im Abschnitt *Suchstrategie* erreicht werden kann, dass alle Datensätze der Datenquelle gleich im Suchergebnisfenster erscheinen, ohne dass der Benutzer erst eine Suchanfrage absetzen muss. Dies ist natürlich nur bei Datenquellen möglich, die eine kleine Anzahl von Datensätzen enthalten.
* `adressauswahl-standard.conf`: Diese Datei wird zentral durch D-III-ITD-D101 gepflegt und enthält die empfohlenen Reiter, die in allen Referaten von Bedeutung sind, z.B. für die Adressierung an Personen/Orga-Einheiten innerhalb der LHM. Möchte ein Referat diese Standardreiter seinen Benutzern nicht anbieten, kann es die entsprechende `%include`-Zeile in der `referat.conf` entfernen oder auskommentieren. Durch die Platzierung dieser `%include`-Zeile vor oder nach der `%include`-Zeile für die `adressauswahl-referat.conf` kann außerdem festgelegt werden, ob die Standard-Reiter zuerst oder zuletzt angezeigt werden sollen. Die Datei `adressauswahl-standard.conf` selbst soll durch die Referate nicht geändert werden.

## Datenquellen

Der WollMux kann Informationen aus verschiedenen Datenquellen zusammenführen und für diverse Zwecke nutzen. Zum Beispiel können die Sachbearbeiterdaten aus dem städtischen X.500 Verzeichnis zur Befüllung der Briefköpfe verwendet werden. Ein anderes Anwendungsbeispiel von Datenquellen ist der [Adressauswahl-Dialog](#adressauswahl-dialog), in dem der Benutzer aus durch eine Datenquelle bereitgestellten häufig verwendeten Empfängeradressen auswählen und damit automatisch das Empfängerfeld befüllen lassen kann.

Die Datei `datenquellen.conf` enthält zum einen die Definition der Datenquelle “personal”, die die Sachbearbeiterdaten aus dem städtischen X.500-Verzeichnis bereitstellt und um zusätzliche Informationen ergänzt (wie z.B. die lange Dienstbezeichnung). Zum anderen sind in der `datenquellen.conf` diverse Voreinstellungen für das Verhalten des WollMux enthalten, die mit den Datenquellen in Verbindung stehen, wie z.B. der Timeout nach dem Suchanfragen abgebrochen werden. Das Ändern der Datenquelle “personal” ist schwierig und meist nicht ratsam. Wenn Sie das Bedürfnis haben, diese für ihr Referat anzupassen, eröffnen Sie bitte ein Ticket, damit D-III-ITD-D101 sie dabei unterstützen kann. Die oben erwähnten Voreinstellungen, wie z.B. der erwähnte Timeout, sind dagegen unproblematisch zu ändern. Da die Datei `datenquellen.conf` jedoch von `xupdate` überschrieben wird müssen entsprechende Änderungen in der `referat.conf` durchgeführt werden.

## WollMux-Sidebarkonfigurieren

Der WollMuxBar kommt eine besondere Rolle zu, da sie der Teil ist, bei dem am meisten referats- und auch benutzergruppenspezifische Anpassungen erforderlich sind. Die Referate und oft sogar die einzelnen Orga-Einheiten innerhalb der Referate unterscheiden sich stark darin, welche Vorlagen sie benötigen. In der Standardkonfiguration ist vorgesehen, dass für jede Benutzergruppe mit ihrer eigenen WollMux-Sidebar eine Datei `conf/wollmuxbar_`<gruppe>`.conf` angelegt wird, in der die Konfiguration der WollMux-Sidebar für die Benutzergruppe &lt;gruppe&gt; gespeichert ist. Die Benutzer bekommen dann in ihre persönliche `wollmux.conf` zwei [`%include`-Zeilen](Format_von_WollMux-Config-Dateien.md#include). Die erste zieht die Datei `conf/main.conf` hinein, die für die referatsweiten Einstellungen verantwortlich ist. Die zweite zieht die passende `conf/wollmuxbar_`<gruppe>`.conf` hinein, die die gruppenspezifischen Anpassungen der WollMux-Sidebar (und wie weiter unten erläutert wird auch der Textfragmente) enthält. Weitere Informationen dazu, wie dies benutzer- und gruppenspezifisch konfiguriert wird (insbes. auch mit GOsa) finden Sie im Artikel [Standardkonfiguration des WollMux installieren und pflegen](Standardkonfiguration_des_WollMux_installieren_und_pflegen.md).

Die manuelle Pflege der `wollmuxbar_`<gruppe>`.conf` Dateien wäre sehr aufwändig, fehleranfällig und schwierig. Aus diesem Grunde wurde das Skript `automux` entwickelt, dessen Funktionsweise und Verwendung in den folgenden Abschnitten erklärt wird.

### `automux`, `run_automux`

Die Grundidee des `automux` Skripts ist es, die Struktur der WollMux-Sidebar durch vertraute Konzepte, nämlich Verzeichnisse und Unterverzeichnisse auf der Festplatte, abzubilden. Auf diese Weise können zur Pflege die altbekannten Dateiverwaltungstools eingesetzt werden. Das Generieren der `wollmuxbar_`<gruppe>`.conf` wird vom Skript `automux` übernommen. Dieses Skript durchsucht rekursiv eine ganze Verzeichnisstruktur und erstellt daraus nach bestimmten Regeln (z.B. jedes Verzeichnis ergibt ein Menü gleichen Namens und jedes Unterverzeichnis ein entsprechendes Untermenü) die Beschreibung der WollMuxBar.

Das Skript `automux` ist ein Kommandozeilenprogramm, das diverse Parameter erwartet. Um die Handhabung zu vereinfachen, wurde das Skript `run_automux` entwickelt. Dieses nimmt seinen eigenen Speicherort als Ausgangspunkt, um daraus zu bestimmen, welche Verzeichnisstruktur gescannt werden soll. So kann es die Parameter für `automux` automatisch bestimmen und es ohne weitere Benutzerinteraktion aufrufen. Solange man die normale Verzeichnisstruktur der Standardkonfiguration verwendet und darauf achtet, dass man, wenn man mehrere Kopien einer Standardkonfiguration auf der Festplatte hat, das richtige `run_automux` nimmt, braucht man sich nie mit dem `automux` Skript selbst auseinanderzusetzen. Man startet einfach (z.B. durch Doppelklick im Dateimanager) das Skript `run_automux` und der Rest geht von selbst. Im Folgenden werden `automux` und `run_automux` synonym verwendet.

> **WARNING** Sie sollten es sich zur Gewohnheit machen, nach jeder Änderung sofort `run_automux` zu starten. Es gibt Situationen (siehe später), in denen bei der Arbeit auf der lokalen Festplatte alles funktioniert, aber nach dem Kopieren auf den Server Dateien nicht mehr gefunden werden. Das `automux` Skript korrigiert dies automatisch, aber nur, wenn es in der Umgebung aufgerufen wird, in der die Änderungen durchgeführt wurden (d.h. in der Umgebung, in der alles funktioniert). “Umgebung” schließt hier typischerweise den Benutzeraccount mit ein, der die Änderungen durchgeführt hat.

Andersherum ist es bei den meisten Änderungen so, dass diese schon auf der lokalen Festplatte erst dann Wirkung zeigen bzw. korrekt funktionieren, wenn `automux` ausgeführt wurde. Die einzige Situation, in der ein `automux`-Lauf nie erforderlich ist, ist nach dem Editieren einer `.conf`-Datei im Verzeichnis `conf/`.

Den empfohlenen Workflow zum Durchführen von Änderungen an der Standardkonfiguration, inkl. des Aufrufs von `run_automux` finden Sie im Artikel [Standardkonfiguration des WollMux installieren und pflegen](Standardkonfiguration_des_WollMux_installieren_und_pflegen.md).

### Symlinks zur besseren Wartbarkeit

#### Was sind Symlinks

Von Windows her ist das Prinzip der Verknüpfungen bekannt. Es wird typischerweise dazu verwendet, um Anwendungen und Ordner an verschiedenen Stellen verfügbar zu machen. Der typische Anwendungsfall ist es, sich Verknüpfungen zu häufig verwendeten Anwendungen und Ordnern auf den Desktop zu legen. Ein Symlink (= “symbolischer Link” = “symbolische Verknüpfung”) unter Linux ist ähnlich zu einer Verknüpfung unter Windows, allerdings sind Symlinks enger in das Dateisystem eingebunden.

Wenn ein Programm sich nicht explizit darum bemüht, Symlinks zu erkennen, so sind diese für das Programm nicht von einer normalen Datei zu unterscheiden. Sie werden in Datei/Öffnen-Dialogen angeboten wie andere Dateien und Verzeichnisse auch, ohne explizit kenntlich gemacht zu sein, wogegen Verknüpfungen unter Windows immer mit einem kleinen Pfeil markiert sind. Symlinks auf Dateien lassen sich auch wie normale Dateien öffnen und bearbeiten. Dabei wird immer auf die verknüpfte Originaldatei zugegriffen.

Bei Verknüpfungen mit Ordnern sind die Unterschiede zwischen Windows und Linux besonders deutlich. Unter Windows leitet eine Verknüpfung immer zum Originalordner weiter. Wenn man unter Windows eine Verknüpfung mit dem Ordner `Ziel` anlegt und die Verknüpfung umbenennt in `WollMux` und dann in einem Dateiauswahldialog auf `WollMux` doppelklickt, wird ins Verzeichnis `Ziel` gewechselt. Auch der oben im Dialog angezeigte Name des aktuellen Verzeichnisses ist dann `Ziel`, nicht `WollMux`. Unter Linux dagegen werden Verknüpfungen mit Verzeichnissen normalerweise so behandelt als wären es richtige Verzeichnisse. Wird unter Linux eine Verknüpfung mit dem Ordner `Ziel` angelegt, in `WollMux` umbenannt und dann in einem Dateiauswahldialog angewählt, so wird danach als aktuelles Verzeichnis tatsächlich `WollMux` angezeigt, so als gäbe es tatsächlich ein unabhängiges Verzeichnis dieses Namens und nicht nur einen Symlink auf `Ziel`.

Auch in Dateipfaden können Symlinks, anders als Windows-Verknüpfungen, ohne Einschränkung verwendet werden. Wird unter Windows auf `C:\` eine Verknüpfung mit `C:\temp` angelegt, der man den Namen `temp2` gibt, dann funktioniert der Dateipfad `C:\temp2datei.txt` trotzdem *nicht*. Wenn man dagegen unter Linux einen Symlink`/home/benutzer/temp2` auf den Ordner `/home/benutzer/temp` anlegt, dann ist `/home/benutzer/temp2/datei.txt` sehr wohl ein funktionierender Dateipfad, der die selbe Datei öffnet wie `/home/benutzer/temp/datei.txt`.

Eine Folge des Prinzips, Symlinks wie richtige Dateien zu behandeln ist es, dass anders als für Windows-Verknüpfungen für Symlinks keine von der Originaldatei abweichenden Eigenschaften (wie z.B. ein spezielles Icon) vergeben werden können.

#### Warum sind Symlinks nützlich

Wie weiter oben bereits erwähnt ist das Grundprinzip von `automux`, dass die Struktur der WollMuxBar 1:1 einer Verzeichnisstruktur auf der Festplatte entspricht. Dies hat zwei wichtige Konsequenzen:

1. Die Bezeichnung eines Menüeintrags für eine Vorlage entspricht dem Namen der Vorlagendatei im Dateisystem. (Dies ist vereinfacht dargestellt. Nähere Details zur Namensgebung werden weiter unten detailliert ausgeführt.)
2. Wenn die selbe Vorlage an mehreren Stellen (z.B. in verschiedenen Menüs) auftauchen soll, muss sie im Dateisystem mehrfach vorhanden sein.

Würde man mit Kopien der Vorlagendateien arbeiten, hätte dies entsprechend zwei Probleme zur Folge:

1. Die Namen mit denen Vorlagendateien erstellt und gepflegt werden sind in den seltensten Fällen passende Menüeinträge. Zum Beispiel werden als Namensbestandteile von Dateinamen oft Datums- oder Versionsangaben verwendet, die dazu dienen neue Versionen von alten zu unterscheiden. In Menüeinträgen für Endbenutzer sind solche Angaben fehl am Platz.
2. Es ist durchaus üblich, Vorlagen an verschiedenen Stellen in der WollMuxBar anzubieten. Arbeitet man mit Kopien muss man peinlichst darauf achten, Buch über diese zu führen und bei einer Änderung einer Vorlage alle Kopien synchron zu halten. Ansonsten rufen manche Buttons/Menüeinträge noch eine alte Version auf.

Symlinks lösen beide Probleme einfach und elegant. Statt mehrerer Kopien einer Datei gibt es nur einzige. Alles andere sind Symlinks auf diese.

Empfehlung: Für die Standardkonfiguration wird empfohlen, alle Vorlagendateien im Verzeichnis `vorlagen/fragmente/` (zentral durch D-III-ITD-D101 gepflegte Standardvorlagen) bzw. Unterverzeichnissen davon (referatsspezifische Vorlagen) zu halten und ansonsten nur Symlinks zu verwenden, die auf diese Dateien verweisen.

#### Wie erzeugt man Symlinks

##### Dateimanager (Dolphin)

Im Dateimanager (Dolphin) erzeugt man Symlinks einfach, indem man die Zieldatei mit der *linken* Maustaste (Achtung: Unterschied zu Windows! Dort wäre es die rechte.) packt, in das gewünschte Zielverzeichnis zieht und dort fallen lässt. Es erscheint dann ein Popup-Menü in dem man *Hiermit verknüpfen* wählt.

Anders als bei Windows-Verknüpfungen wird als Name für den Symlink nicht automatisch “Verknüpfung mit &lt;Ziel&gt;” gewählt, sondern der  Originalname der Datei. Dementsprechend erhält man, wenn man versucht, im selben Verzeichnis in dem sich die Originaldatei befindet eine Verknüpfung zu ihr zu erstellen eine Warnung. Diese weist darauf hin, dass man versucht eine existierende Datei zu überschreiben und bietet ein Eingabefeld zur Wahl Eingabe eines anderen Namens an.

Im Normalfall allerdings erstellt man Symlinks in anderen Verzeichnissen. Dann ist das Standardverhalten, den Originalnamen zu verwenden praktischer, als wenn wie unter Windows immer der Zusatz “Verknüpfung mit” eingefügt würde.

**Tip 1**: In den meisten Ansichten des Dolphin sind Symlinks durch *kursive* Schrift als Symlinks gekennzeichnet.
**Tip 2**: Zur Arbeit an einer Standardkonfiguration haben sich folgende Ansichtseinstellungen im Dolphin als nützlich erwiesen:

* *Ansicht/Anzeigemodus/Detaillierte Ordneransicht*.
* Den Spaltenkopf der Spalte *Verknüpfung* (unter Umständen muss man die Anzeige nach rechts scrollen, um sie zu finden) mit der linken Maustaste packen, nach links ziehen und direkt neben der Spalte *Name* fallen lassen. So hat man den Namen der Datei und das Verknüpfungsziel direkt nebeneinander.
* Die Spalten *Name* und *Verknüpfung* durch Ziehen mit der linken Maustaste an den Separatoren zwischen den Spaltenköpfen so Vergrößern/Verkleinern, dass man beide gut lesen kann.

> **INFO** Symlinks sind in dieser Ansicht durch kleine Pfeile links unten am Icon der Datei gekennzeichnet. Und natürlich sind sie dadurch erkennbar, dass ihre *Verknüpfung*-Spalte nicht leer ist.

**Tip 3**: Es ist oft günstig, zwei Dolphin-Fenster zu öffnen, vertikal auf die halbe Bildschirmgröße zu verkleinern und übereinander anzuordnen, so dass man beide gleichzeitig sieht. Im oberen Fenster kann man dann das `vorlagen/fragmente/` Verzeichnis anzeigen lassen und im unteren das entsprechende Verzeichnis in dem die Symlinks zu erstellen sind. So kann man bequem die gewünschten Dateien vom oberen ins untere Fenster ziehen.

Horizontal sollte immer die volle Bildschirmbreite ausgenutzt werden, um die Spalten *Name* und *Verknüpfung* vollständig darstellen zu können.

##### Konsole

Auf der Kommandozeile erstellt der Befehl

`ln -sn "&lt;Quelle&gt;" "&lt;Ziel&gt;"`

einen Symlink. Beispiel

`ln -sn "../../fragmente/Briefkopf-extern-ohne-Logo.ott"  "Externer Briefkopf ohne Logo.ott"`

> **WARNING** Man muss darauf achten, den Parameter `-sn` nicht zu vergessen. Lässt man ihn weg, gibt es *keine* Fehlermeldung. Stattdessen wird ein sogenannter harter Link angelegt. Ein harter Link ist von der Originaldatei durch nichts zu unterscheiden (insbesondere gibt es keine *Verknüpfung*-Angabe im Konqueror) und wegen dieser Intransparenz für die Verwendung in der Standardkonfiguration nicht geeignet.

#### Probleme mit Symlinks

Bei der Arbeit mit Symlinks können diverse Probleme auftreten. Diese Probleme lassen sich jedoch leicht vermeiden, wenn man sich ihrer bewusst ist.

##### Absolute Symlinks

Ein Symlink speichert den Dateipfad der verknüpften Datei. Wie jeder Dateipfad kann dieser Pfad absolut sein, d.h. er gibt die Position des Ziels vom Wurzelverzeichnis beginnend vollständig an, oder er kann relativ sein, d.h. er gibt die Position des Ziels relativ zum Ort des Symlinks an. Ein Beispiel für einen absoluten Pfad ist

`/home/felix.wollmux/wollmux-standard-config/vorlagen/fragmente/referat/vorlage.ott`

Ein Beispiel für einen relativen Pfad ist

`../../fragmente/referat/vorlage.ott`

Zu beachten ist hier, dass beim Kopieren, Verschieben oder Archivieren (zum Upload auf den Server) eines Symlinks die Zielangabe des Symlinks *nicht* verändert wird. Als Konsequenz daraus verhalten sich insbesondere absolute Symlinks oft nicht so wie erwartet und gewünscht.

Nehmen wir zur Illustration dieses Problems an, dass Herr Felix Wollmux in seinem Referat für die Pflege der WollMux-Konfiguration zuständig ist. Er hat eine lokale Kopie der Standardkonfiguration in seinem Home-Verzeichnis. Darin befinden sich auch ein relativer und ein absoluter Symlink mit den beiden Beispielpfaden weiter oben. Nach dem erfolgreichen lokalen Test soll die Konfiguration auf den Server hochgeladen werden. Felix Wollmux selbst hat keinen Zugriff auf den Server. Er erstellt ein `.tar.gz` Archiv der Konfiguration und gibt es dem Webmaster, um es auf den Server zu stellen. Nach dem Upload jedoch lässt sich `vorlage.ott` nicht öffnen, obwohl dies im lokalen Test einwandfrei geklappt hat.

Was ist passiert?

Der absolute Symlink verweist immer noch auf die Datei

`/home/felix.wollmux/wollmux-standard-config/vorlagen/fragmente/referat/vorlage.ott`

aber auf dem Webserver gibt es das Verzeichnis `/home/felix.wollmux/` gar nicht, da Felix Wollmux dort keinen Zugang hat. Und sogar wenn er dort Zugang hätte, wäre in seinem Home-Verzeichnis auf dem Server die Datei nicht zu finden, da diese nur auf der lokalen Festplatte seines Arbeitsplatzrechners liegt.

Der relative Symlink

`../../fragmente/referat/vorlage.ott`

dagegen funktioniert auch auf dem Server, da die ganze Verzeichnisstruktur kopiert wurde.

> **INFO** Der Dateimanager Konqueror erzeugt standardmäßig absolute Symlinks, also die problematische Sorte. Diese werden jedoch von `automux` automatisch korrigiert. Dies funktioniert jedoch nur dann zuverlässig, wenn `automux` auf dem Rechner und von der Person aufgerufen wird, die die Symlinks gesetzt hat. Deswegen ist es wichtig, dass nach jeder Änderung, spätestens vor dem Archivieren, Hochladen oder sonstiger Weitergabe mindestens einmal `run_automux` aufgerufen wird.

<!-- -->
> **WARNING** Der Konqueror hat einen Bug, der dafür sorgt, dass manchmal die Verknüpfungsziele in der Ansicht nicht aktualisiert werden. Auch *Ansicht/Erneut Laden (F5)* hilft in diesem Fall nicht. Der Konqueror muss dann beendet und neu geöffnet werden, damit die Ansicht stimmt. Sollten also nach dem Aufruf von `run_automux` einige Symlinks trotzdem noch mit absoluten Zielen angezeigt werden, kann dieser Bug die Ursache sein. Dieses Problem betrifft aber nur die Anzeige und hat ansonsten keine schädlichen Auswirkungen.

##### Relative Symlinks

Relative Symlinks funktionieren nur solange, wie sich der Speicheort der Zieldatei relativ zum Symlink nicht ändert. Wird die Zieldatei an einen anderen Ort verschoben, so funktioniert der Symlink nicht mehr (wie eine Windows-Verknüpfung). Probleme gibt es jedoch auch, wenn der Symlink verschoben oder kopiert wird. Der im Symlink gespeicherte relative Pfad wird immer ausgehend vom Speicherort des Symlinks ausgewertet. Folgender Pfad `../../fragmente/referat/vorlage.ott` beginnt mit `../../` was das Elternverzeichnis des Elternverzeichnisses des Verzeichnisses bezeichnet, in dem der Symlink liegt. Befindet sich der Symlink im Verzeichnis `/home/felix.wollmux/wollmux-standard-config/vorlagen/standard/Formulare` so ist `../../` das Verzeichnis `/home/felix.wollmux/wollmux-standard-config/vorlagen/` Wird der Symlink in das Verzeichnis `/home/felix.wollmux/wollmux-standard-config/vorlagen/standard/Formulare/Bescheide` verschoben, so hört er jedoch auf zu funktionieren, denn von dort aus gesehen bedeutet `../../` nämlich das Verzeichnis `/home/felix.wollmux/wollmux-standard-config/vorlagen/standard/`

> **INFO** Dieser Fehler passiert typischerweise, wenn man in der Menüstruktur nachträglich Untermenüs einrichten möchte und die alten Menüpunkte einfach nur in das Untermenü verschiebt. Auch in diesem Fall jedoch hilft `run_automux`. Es kann den Fehler zwar nicht korrigieren, meldet ihn jedoch gleich am Anfang seiner Ausgabe mit der Meldung<BR> `Ziel von <Speicherort des Symlinks> existiert nicht!` Achten Sie also genau auf die Ausgabe von `run_automux`. Der Konqueror markiert im übrigen nicht-funktionierende Symlinks mit einem kleinen Kästchen über dem Icon. Auch dort sind sie also leicht erkennbar. In der Konsole werden kaputte Symlinks von ls (bei Verwendung von Farbdarstellung) anders eingefärbt.

##### Symlinks auf Netzlaufwerken

Auf Netzlaufwerken werden Symlinks unter Umständen nicht unterstützt. Deswegen ist es oft nicht möglich, die Standardkonfiguration auf ein Netzlaufwerk zu kopieren ohne dabei die Symlinks zu verlieren. Ob Symlinks auf einem Netzlaufwerk funktionieren hängt sowohl vom eingesetzten Server als auch von den Mount-Optionen auf dem Client ab.

##### Symlinks auf dem Webserver

Webserver sind oft so konfiguriert, dass sie Symlinks nicht auflösen. Dies ist bei Webservern, auf denen Webspace an (nicht vertrauenswürdige) Kunden vermietet wird eine wichtige Sicherheitseinstellung, da es den Kunden daran hindert, durch das Anlegen von Symlinks Zugriff auf Dateien zu erhalten, die außerhalb seines gemieteten Bereichs des Webservers liegen. Da die Standardkonfiguration Symlinks verwendet, muss für das Verzeichnis, in dem sie sich befindet (und dessen Unterverzeichnisse), die Option zur Zulassung von Symlinks gesetzt werden (bei Apache: FollowSymlinks).

### Buttonleiste

Die Buttonleiste der WollMuxBar enthält in der Standardfassung eine Combobox zur Auswahl des Absenders, sowie 4 Buttons zum Schnellzugriff auf die Standardbriefköpfe. Dies lässt sich jedoch beliebig anpassen. Für die Konfiguration der Buttonleiste für Benutzergruppe &lt;gruppe&gt; sind in der Standardkonfiguration die Unterverzeichnisse `?.buttons` innerhalb des Verzeichnisses `vorlagen/`&lt;gruppe&gt; verantwortlich. Dabei ist `?` ein beliebiges Zeichen, wobei typischerweise “X” verwendet wird (also `X.buttons`), damit das Verzeichnis im Dateimanager bei alphabetischer Sortierung nach Dateinamen am Ende der Liste angezeigt wird.

Der Aufbau des `?.buttons` Verzeichnisses ist sehr einfach. Für jede Vorlagendatei (bzw. jeden Symlink auf eine Vorlagendatei) innerhalb dieses Verzeichnisses wird ein entsprechender Button in der WollMux-Leiste angelegt. Spezielle Elemente, wie Separatoren (vertikale Trennstriche), Abstände oder die ComboBox zur Absenderauswahl können ebenfalls in die Buttonleiste eingebaut werden. Zum Anlegen dieser Elemente werden die selben Spezialdateien verwendet wie für die Konfiguration der Menüleiste. Auch das Festlegen der Buttonreihenfolge und der Hotkeys funktioniert analog zur Konfiguration der Menüleiste. Diese Dinge werden weiter unten genauer erklärt.

### Menüs, Untermenüs, Menüeinträge

Der Aufbau der Menüleiste der WollMuxBar für Benutzergruppe &lt;gruppe&gt; wird festgelegt durch die Verzeichnishierarchie unterhalb von `vorlagen/<gruppe>`. Die Unterverzeichnisse, die direkt in diesem Verzeichnis liegen ergeben die Menüs, die in der WollMuxBar angeboten werden. Unterverzeichnisse dieser Verzeichnisse ergeben entsprechende Untermenüs. Unterunterverzeichnisse ergeben Unteruntermenüs und so weiter. Es gibt allerdings ein paar Ausnahmen von diesem Prinzip:

* *?.insertFrag*: Verzeichnisse, die nach diesem Muster benannt sind, werden für den Aufbau der Menüstruktur ignoriert. Sie werden zur Bestimmung der Textfragmente herangezogen (siehe weiter unten).
* *?.buttons*: Verzeichnisse, die nach diesem Muster benannt sind, werden für den Aufbau der Menüstruktur ignoriert. Sie bestimmen die Buttonleiste der WollMuxBar (siehe weiter oben).

In allen Verzeichnissen und Unterverzeichnissen können Vorlagendateien bzw. Symlinks darauf hinterlegt werden. Diese Dateien werden von `automux` umgesetzt in Menüpunkte, die die entsprechenden Vorlagen aufrufen. Dazu ist es auch möglich, externe Anwendungen (z.B. Acrobat Reader zum Ausfüllen von PDF-Formularen) oder Webseiten durch Menüeinträge aufrufen zu lassen. Dies wird in einem [eigenen Abschnitt] (Standardkonfiguration_des_WollMux#Externe_Anwendungen_aus_der_WollMuxBar_starten) erläutert. Zusätzlich können auch noch eine Reihe spezieller Elemente in Menüs eingefügt werden, wie z.B. Separatoren (horizontale Linien zur Gruppierung). Auch dies wird einem [späteren Abschnitt] (#besondere-menüelemente) näher erklärt.

### Tricks mit der Namensgebung

Wie bereits erwähnt, lassen sich in den Unterverzeichnissen von `vorlagen/<gruppe>` Vorlagendateien (bzw. Symlinks darauf) hinterlegen, die von `automux` in Buttons oder Menüeinträge umgesetzt werden, die die entsprechenden Vorlagen aufrufen. Im Folgenden erfahren Sie, wie genau diese Umsetzung funktioniert.

#### Buttonbeschriftung bzw. Menüeintrag

Zu jeder Vorlagendatei wird ein entsprechender Button bzw. Menüeintrag erstellt, der die Vorlage aufruft. Die Beschriftung des Buttons bzw. der Menüeintrag wird dabei wie folgt aus dem Namen der Vorlagendatei bestimmt:

1. Wenn der Name mit einem Klein- oder Großbuchstaben (nicht Umlaut) gefolgt von einem Punkt (z.B. “A.” oder “b.”) beginnt oder wenn der Name mit einer beliebig langen Ziffernfolge gefolgt von Punkt (z.B. “1.” oder “09.”) beginnt, so wird dieses Präfix abgeschnitten.

  Beispiel: `01.Vorlage.ott` `=>` `Vorlage.ott`
2. Die Dateierweiterung (d.h. alles ab dem letzten Punkt) wird abgeschnitten.

   Beispiel: `Vorlage.ott` `=>` `Vorlage`
3. Wenn der Name mindestens einen Großbuchstaben (nicht Umlaut) enthält, so wird der erste Großbuchstabe in einen Kleinbuchstaben umgewandelt.

   Beispiel: `Vorlage` `=>` `vorlage`
4. Wenn der erste Buchstabe ein Kleinbuchstabe (nicht Umlaut) ist, so wird er in einen Großbuchstaben umgewandelt:

   Beispiel: `vorlage` `=>` `Vorlage`

#### Reihenfolge der Buttons bzw. Menüeinträge festlegen

`automux` erstellt die Buttons bzw. Menüeinträge in alphabetischer Reihenfolge der Dateinamen, d.h. wenn sie im Dateimanager nach dem Dateinamen alphabetisch sortieren lassen, dann sehen Sie gleich, in welcher Reihenfolge die Menüs, Untermenüs, Menüeinträge und Buttons später in der WollMuxBar erscheinen werden.

Um die Reihenfolge frei festlegen zu können, ohne die Bezeichnungen der Buttons oder Menüeinträge zu verändern, erlaubt der `automux` die Verwendung eines durch Punkt abgetrennten Präfix, das nicht in die Bezeichnung übernommen wird. Das Präfix kann entweder ein einzelner Buchstabe (kein Umlaut) oder eine beliebig lange Ziffernfolge sein.

Tip: Es ist empfehlenswert grundsätzlich 2-stellige oder (bei Menüs mit vielen Einträgen) gar 3-stellige Zahlen als Präfix zu verwenden und diese in 10er Schritten zu vergeben (also “10.Eintrag 1”, “20.Eintrag 2”,...). Dies erlaubt es, später neue Punkte zwischen existierenden Punkten einzufügen, ohne große Umbenennungsaktionen durchführen zu müssen.

#### Hotkeys festlegen

##### Großbuchstabe als Hotkey

Wie allgemein üblich lassen sich auch in der WollMuxBar Menüs und Buttons durch Tastenkürzel direkt aufrufen, wenn entsprechende Hotkeys (kenntlich gemacht durch unterstrichene Buchstaben) gedrückt werden. `automux` nimmt den ersten Großbuchstaben (nicht Umlaut) im Dateinamen (hinter einem evtl. vorhandenen Sortierpräfix) als Hotkey. Handelt es sich bei dem Buchstaben nicht um den ersten Buchstaben, so wird er für die Beschriftung des Buttons bzw. Menüpunktes in einen Kleinbuchstaben umgewandelt (siehe [Beschreibung der Namenskonvertierung](#buttonbeschriftung-bzw-menüeintrag) weiter oben). Zusammen mit dem Umwandlungsschritt, der den ersten Buchstaben nach dem Präfix in einen Großbuchstaben umwandelt, wenn es ein Kleinbuchstabe ist, erlaubt dies, auch Buchstaben in der Mitte von Wörtern als Hotkeys zu bestimmen. Es hat allerdings den Nachteil, dass manchmal ein Buchstabe zu einem Kleinbuchstaben gemacht wird, der eigentlich groß sein sollte. Dies ist aber meist weniger störend als Großbuchstaben innerhalb von Wörtern.

##### Sonderzeichen zum Markieren von Hotkeys

Ab der Version 11.x der Standardkonfiguration unterstützt `automux` auch das Festlegen eines Hotkeys über ein Sonderzeichen. Standardmäßig ist dies die Tilde (\~). Wird das Sonderzeichen in einem Dateinamen verwendet, wird der Buchstabe oder die Zahl nach dem Zeichen als Hotkey verwendet.

`1.Externer ~Briefkopf.ott   # B wird als Hotkey festgelegt`

Das Sonderzeichen muss unmittelbar vor dem Hotkey ohne Leerzeichen stehen. Wird das Sonderzeichen mehrfach verwendet, wird nur das letzte verwendet. Wenn die Notwendigkeit besteht, die Tilde (\~) in Dateinamen zu verwenden, kann das Sonderzeichen mit der Environment-Variable HKCHAR geändert werden.

`HKCHAR="=" ./run_automux   # verwendet '=' als Sonderzeichen`

### Besondere Menüelement

Neben Menüpunkten und Buttons, die Vorlagen aufrufen, gibt es diverse andere spezielle Elemente, die sich in Menüs und die Buttonleiste einfügen lassen.

#### Grundprinzip

Spezielle Menüelemente sind Dateien mit besonderen Dateierweiterungen. Die Dateierweiterung entspricht dabei dem Attribut TYPE, wie es in der [entsprechenden Dokumentation zur `wollmux.conf`](Konfigurationsdatei_wollmux_conf.md#das-attribut-type) beschrieben ist. Der Rest des Namens ist willkürlich und dient nur der Einordnung in die alphabetische Sortierung der Menüelemente.

Wenn das Menüelement keine zusätzlichen Angaben erfordert (z.B. ein Separator), so ist die Datei leer. Ansonsten sind die zusätzlichen Angaben in der Datei gespeichert und werden von `automux` ohne weitere Verarbeitung direkt übernommen. Auf diese Weise können alle Menüelemente, die der WollMux unterstützt in die WollMuxBar eingebaut werden, auch wenn `automux` dafür keine spezielle Unterstützung bietet.

Die folgenden Abschnitte gehen auf einige der möglichen speziellen Menüelemente näher ein.

#### Abstände: glue

Ein Glue ist ein Abstand der sich dynamisch so weit ausdehnt, wie er kann, ohne dass dazu das Fenster vergrößert werden muss. Glues werden dazu verwendet, Dinge links- bzw. rechtsbündig auszurichten. Die von D-III-ITD-D101 bereitgestellten Archive enthalten z.B. im Verzeichnis `vorlagen/standard` einen Glue. Dieser ist der vorletzte Eintrag vor dem “X” Button (die entsprechende Datei `90.X.button` ist nicht zu verwechseln mit dem Verzeichis `X.buttons`). Durch seine dynamische Ausdehnung drückt der Glue den “X” Button an das rechte Ende der WollMuxBar-Menüleiste, also dorthin wo sich der “X” Button zum Schließen eines Fensters typischerweise befindet.

#### Separatoren

Ein Separator ist ein Strich, der der optischen Gruppierung von Buttons oder Menüpunkten dient. Ein Separator ist je nach Kontext automatisch horizontal oder vertikal.

#### Spezialbuttons

Die WollMux-Sidebar bietet die Möglichkeit, diverse Zusatzfunktion aufzurufen. Diese sind im [entsprechenden Abschnitt](Konfigurationsdatei_wollmux.conf#Das_Attribut_ACTION) der Dokumentation der `wollmux.conf` vollständig aufgelistet. Wie weiter oben beschrieben, lassen sich mit Hilfe von Dateien nach dem Muster `*.button` sämtliche dieser Funktionen über `automux` in die `wollmuxbar_*.conf` einbauen. Im Folgenden sind einige Beispiele für Spezialbuttons aufgeführt, die in den von D-III-ITD-D101 bereitgestellten Archiven der Standardkonfiguration zu finden sind:

* *Extras/Absenderdaten*: Dieser Button ruft den Absenderauswahl-Dialog auf. Die zugehörige `.button` Datei ist `vorlagen/standard/40.eXtras/10.Absenderdaten.button`.
* *Extras/Info*: Dieser Button ruft ein Fenster mit Versionsinformationen über WollMux und WollMuxBar auf. Die zugehörige `.button` Datei ist `vorlagen/standard/40.eXtras/60.Info über Vorlagen und Formulare.button`.
* *Extras/Fehlerinfos*: Dieser Button exportiert für das Untersuchen eines WollMux-Problems nötige Informationen in eine Datei, die an ein entsprechendes Ticket angehängt werden kann, um die Bearbeitung zu beschleunigen. Die zugehörige `.button` Datei ist `vorlagen/standard/40.eXtras/30.Fehlerinfos erstellen.button`.

> **INFO** Der obige Abschnitt wird nicht mit jedem Release aktualisiert. Abweichungen, insbesondere bzgl. der Sortierungspräfixe sind möglich. Wenn Ihnen eine solche Abweichung auffällt, dann teilen Sie uns dies bitte mit.

#### Absenderauswahl

Die WollMux-Sidebar bietet neben dem “Absender Auswählen” Dialog, der über einen Spezialbutton (siehe weiter oben) aufgerufen wird auch eine Schnellauswahl des Absenders. Diese kann sowohl in die Buttonleiste als auch in die Menüleiste eingebaut werden. In der Buttonleiste erscheint die Schnellauswahl als Combobox und erlaubt die Auswahl des Absenders über ein Pull-Down-Menü. Innerhalb eines Menüs wird die Schnellauswahl als Untermenü dargestellt. Um eine Schnellauswahl an einer Stelle einzubauen, muss nur im entsprechenden Verzeichnis eine leere Datei mit Erweiterung `.senderbox` angelegt werden. Das Verzeichnis `vorlagen/standard/X.buttons` enthält ein Beispiel für so eine Datei.

#### Searchbox

Die Searchbox ist ein Eingabefeld, das den Schnellzugriff auf Menü-Elemente der WollMux-Sidebar erlaubt. Sie kann sowohl in die Buttonleiste als auch in die Menüleiste eingebaut werden. Um die Searchbox an einer Stelle einzubauen, muss nur im entsprechenden Verzeichnis eine leere Datei mit Erweiterung `.searchbox` angelegt werden.

### Verschiedene Menüs für verschiedene Benutzergruppen

Die Aufgabenbereiche der verschiedenen Abteilungen und Sachgebiete innerhalb eines Referats sind sehr verschieden. Deshalb gibt es auch viele Vorlagen, die nur von einem Teil der Sachbearbeiterinnen und Sachbearbeiter benötigt werden. Auch wenn es technisch möglich ist, alle Vorlagen des gesamten Referats in der Menüstruktur der WollMux-Sidebar zu hinterlegen, führt dies doch unter Umständen zu einem sehr überfrachteten Menü und schlechter Usability. Viel günstiger ist es, sinnvolle Benutzergruppen zu bilden und für diese Benutzergruppen jeweils unterschiedliche  WollMux-Sidebar-Konfigurationen anzubieten. Bei Verwendung von Symlinks erfordert dies auch keinen nennenswerten Mehraufwand.

#### Beispiel: Bienchen und Blümchen - Standardmenüs für alle, dazu ein gruppenspezifisches Menü

Die von D-III-ITD-D101 bereitgestellten Archive der Standardkonfiguration enthalten zur Demonstration zwei Benutzergruppen. Das eine ist die Gruppe “Bienchen”. Diese stellt den Standardfall dar. Deswegen ist der technische Name dieser Gruppe “standard”. Dementsprechend gibt es für diese Gruppe ein Verzeichnis `vorlagen/standard/`, dessen Inhalt den Aufbau und die verfügbaren Vorlagen für die WollMux-Sidebar der Bienchen spezifiziert.

Die zweite Gruppe ist die Gruppe “Blümchen”. Diese Gruppe weicht in einigen Punkten vom Standard ab:

* Die Blümchen verwenden in ihrer Fußzeile das “Total E-Quality” Logo.
* Die Blümchen sind alle sehbehindert und benötigen daher extra große Schrift.
* Die Blümchen benötigen spezielle Vorlagen, die die Bienchen nicht verwenden. Dafür benötigen sie die Vorlagen der Bienchen nicht (mit Ausnahme der Standardbriefköpfe).

Wie die beiden ersten Abweichungen realisiert werden wird später erklärt. Hier geht es zunächst nur um den gruppenspezifischen Aufbau der WollMux-Sidebar. Die Spezifikation der WollMux-Sidebar für die Blümchen ist über die Verzeichnisstruktur unter `vorlagen/blümchen` gegeben. Man könnte natürlich die Verzeichnisstruktur von `vorlagen/standard/` einfach kopieren und die nötigen Änderungen in der Kopie durchführen. Dies würde jedoch den Pflegeaufwand unnötig erhöhen. Wenn zum Beispiel eine neue Vorlage in das Menü “Standard” aufgenommen werden soll, so muss dieses bei der Kopiermethode zweimal gemacht werden, einmal pro Gruppe. Neben dem Zusatzaufwand besteht immer die Gefahr, dass bei einer Änderung eine der beiden Gruppen vergessen wird, was dazu führt, dass Menüs, die eigentlich gruppenübergreifend gleich sein sollten (wie z.B. “Standard”), verschiedene Inhalte zeigen, abhängig von der Gruppe.

Die bessere Lösung, für die Blümchen eine abweichende WollMux-Sidebar zu realisieren sind Symlinks. Die von D-III-ITD-D101 bereitgestellten Archive demonstrieren dies. Wenn Sie in das Verzeichnis `vorlagen/standard/` schauen, sehen Sie für jedes Menü der WollMux-Sidebar ein Verzeichnis. Wenn Sie dies mit dem Verzeichnis `vorlagen/blümchen/` vergleichen, dann sehen Sie, dass in letzterem nur für das Menü “Blümchen” ein richtiges Verzeichnis existiert. Für die anderen Menüs (mit Ausnahme des Menüs “Bienchen”, das die Blümchen nicht benötigen) existieren stattdessen Symlinks auf die entsprechenden Verzeichnisse in `vorlagen/standard/`. So wird erreicht, dass Änderungen an einem der Standard-Menüs sich automatisch auf beide Gruppen auswirken. Zusätzlicher Wartungsaufwand für die zweite Gruppe wird dadurch fast vollständig vermieden. Nur wenn sich der Name eines Menüs ändert oder neue Menüs hinzukommen, die beide Gruppen haben sollen, sind Anpassungen der Symlinks in `vorlagen/blümchen/` erforderlich.

### Externe Anwendungen aus der WollMux-Sidebar starten

Aus der WollMux-Sidebar heraus können beliebige externe Anwendungen gestartet werden. Dies ist sehr nützlich, um den Benutzerinnen und Benutzern aus einer einheitlichen Oberfläche heraus Zugriff auf alle Ressourcen zu bieten, die sie für die tägliche Arbeit brauchen. Besonders nützlich in diesem Zusammenhang ist das Einbinden von Links auf Webseiten und PDF-Formulare, da einige der bisherigen MS Office Vorlagen im Zuge der Migration nicht mehr als Vorlagen, sondern als PDF-Formulare oder Webanwendungen umgesetzt werden. Die technischen Details zur Einbindung externer Anwendungen, sind in der [Dokumentation der `wollmux.conf`](Konfigurationsdatei_wollmux_conf.md#externeanwendungen) beschrieben. Im Folgenden wird nur auf die Beispiele aus den von D-III-ITD-D101 bereitgestellten Archiven näher eingegangen.

#### Beispiel: PDF-Formulare im Acrobat Reader starten

Wenn Sie die WollMux-Sidebar aufrufen für eine unangepasste Standardkonfiguration, so wie sie von D-III-ITD D.101 zur Verfügung gestellt wird, dann gibt es dort das Menü “Bienchen”. In diesem findet sich der Menüpunkt “Arbeitsbienchen-Anforderung (PDF-Formular)”. Wenn Sie diesen Menüpunkt auswählen, dann sollte der Acrobat Reader starten und das Formular “Arbeitsbienchen-Anforferung” zum Ausfüllen öffnen. Auf dem Basisclient funktioniert dies ohne weitere Maßnahmen. Ob es unter Windows gleich funktioniert, hängt davon ab, ob der Acrobat Reader installiert ist und wenn ja, in welchem Verzeichnis.

Der Schlüssel zum erfolgreichen Start des Acrobat Reader findet sich in der `referat.conf`. Wenn Sie die Datei öffnen, dann sehen Sie darin den [Abschnitt *ExterneAnwendungen*](Konfigurationsdatei_wollmux_conf.md#externeanwendungen) und darin einen Eintrag der mit `(EXT` `(`“`pdf`”`,`“`PDF`”`)` beginnt. Dieser Eintrag stellt die Verbindung her zwischen der Dateierweiterung ".pdf" (bzw. ".PDF", das extra aufgeführt ist, da hier zwischen Groß- und Kleinschrift unterschieden wird.) und der Anwendung Acrobat Reader. Der Abschnitt enthält eine Liste von möglichen Programmaufrufen, die der Reihe nach durchprobiert werden, bis einer davon zum Ziel führt. Aufrufe ohne vollständige Pfadangabe werden dabei wie üblich mit der Umgebungsvariable PATH aufgelöst.

Wenn im Abschnitt *ExterneAnwendungen* ein korrekter Aufrufpfad für den Acrobat Reader enthalten ist, dann ist das Einbinden von PDF-Formularen in die WollMux-Sidebar ein Kinderspiel. Es funktioniert genau wie das Einbinden von LibreOffice Vorlagen, indem einfach die `.pdf` Datei (oder ein Symlink darauf) in das entsprechende Verzeichnis kopiert und dann `run_automux` gestartet wird. Im konkreten Beispiel hier, befindet sich die Datei `Arbeitsbienchen-Anforderung` `(PDF-Formular).pdf` im Verzeichnis `vorlagen/standard/30.Bienchen/`, damit sie im Menü “Bienchen” erscheint.

Mit der selben Methode können Sie auch für andere Dateierweiterungen externe Anwendungen definieren und dann entsprechende Dateien über die WollMuxBar verfügbar machen. Beachten Sie jedoch, dass dies nur für Dateierweiterungen funktioniert, für die `automux` nicht bereits eine Anwendung vorgesehen hat. Zum Beispiel ist es *nicht* möglich, über diesen Mechanismus `.dot` Dateien mit MS Word zu verknüpfen, da `automux` diesen Dateityp bereits mit LibreOffice assoziiert.

#### Beispiel: URLs im Web-Browser aufrufen

Das Aufrufen einer Webseite unterscheidet sich vom Aufruf von Office-Vorlagen und PDF-Dateien grundlegend. Im Falle einer Webseite wäre es normalerweise nicht sinnvoll, die HTML-Dateien (oder Symlinks darauf) direkt in die Verzeichnisstruktur der Standardkonfiguration zu legen, damit `run_automux` diese erfassen kann. Stattdessen wird eine `.button` Datei angelegt, wie im [Abschnitt “Spezialbuttons”](Standardkonfiguration_des_WollMux#Spezialbuttons) beschrieben. Diese `.button` Datei verwendet die [ACTION “openExt”](Konfigurationsdatei_wollmux_conf.md#das-attribut-action), um den WollMux anzuweisen, dass eine externe Anwendung zu starten ist. Die `.button` Datei enthält auch die URL des Dokuments bzw. der Webseite, die mit der Anwendung geöffnet werden soll. Die von D-III-ITD-D101 bereitgestellten Archive enthalten zur Demonstration eine solche `.button` Datei, die einen Knopf ergibt, der das LiMux-Wiki aufruft. Die Datei ist zu finden unter dem Pfad

`vorlagen/standard/35.LiMux/LiMux-Wiki.button`

Der korrekte Aufruf des Webbrowsers wird über den [Abschnitt *ExterneAnwendungen*](Konfigurationsdatei_wollmux_conf.md#externeanwendungen) eingerichtet, der bereits im Zusammenhang mit dem Verfügbarmachen des Acrobat Reader zum [Einbinden von PDFs in die WollMuxBar](#beispiel-pdf-formulare-im-acrobat-reader-starten) besprochen wurde. Wenn Sie sich den Beispiel-Eintrag in der `referat.conf` der von D-III-ITD-D101 bereitgestellten Archive ansehen, dann werden Ihnen 2 Unterschiede zum Eintrag für den Acrobat Reader auffallen:

* Als EXT-Attribut ist “http:” angegeben. Da dies keine korrekte Dateierweiterung darstellt, werden auf diese Weise potentielle Überschneidungen mit externen Anwendungen vermieden, für die es eine Dateiendung gibt (wie z.B. PDF).
* Das DOWNLOAD-Attribut hat den Wert “false”. Dies sorgt dafür, dass die URL direkt an die externe Anwendung weitergegeben wird, anstatt sie herunterzuladen und als temporäre Datei zu speichern (wie dies bei PDF notwendig ist).

Auf dem Basisclient funktioniert das Aufrufen von Webseiten aus der WollMuxBar mit den Angaben aus der Beispiel-`referat.conf` standardmäßig. Ob es unter Windows funktioniert, hängt davon ab, ob und in welchem Verzeichnis Firefox installiert ist. Um Firefox (oder einen anderen Browser) verfügbar zu machen, ist es am einfachsten, eine Batch-Datei `sensible-browser.bat` in einem Verzeichnis anzulegen, das im PATH steht. In dieser Batch-Datei können dem Browser auch entsprechende Kommandozeilenparameter übergeben werden, die z.B. die URL in einem Tab anstatt in einem neuen Fenster öffnen.

## Gruppenspezifische Konfigurationseinstellungen

Es ist manchmal notwendig, für bestimmte Benutzergruppen spezielle Konfigurationseinstellungen vorzunehmen. Die Standardkonfiguration sieht hierfür die Dateien `conf/referat_`&lt;gruppe&gt;`.conf` vor. In diesen Dateien werden die selben Einstellungen vorgenommen, die typischerweise in der `referat.conf` vorgenommen werden, allerdings werden diese Einstellungen nur für die Benutzergruppe &lt;gruppe&gt; verwendet. &lt;gruppe&gt; entspricht dabei dem Namen eines Unterverzeichnisses in `vorlagen/`, d.h. `run_automux` erstellt eine Datei `wollmuxbar_`&lt;gruppe&gt;`.conf`. In letztere fügt `run_automux` auch automatisch einen `%include`-Befehl für `referat_`&lt;gruppe&gt;`.conf` ein, jedoch nur, wenn diese Datei existiert. Anders als `wollmuxbar_`&lt;gruppe&gt;`.conf` wird die `referat_`&lt;gruppe&gt;`.conf` *nicht* automatisch angelegt.

Die von D-III-ITD-D101 bereitgestellten Archive enthalten zur Illustration für die Gruppe “blümchen” eine Datei `referat_blümchen.conf`. Diese legt mittels `FONT_ZOOM` größere Schriftarten für die WollMux-Dialoge fest, wie man dies für eine Gruppe mit sehbehinderten Benutzern tun würde.

## Textfragmente

Textfragmente, oft auch kurz nur als “Fragmente” bezeichnet, sind eine wesentliche Grundlage für die Flexibilität des Briefkopfsystems des WollMux. Früher wurden die Briefköpfe oft vollständig in den Vorlagen direkt hinterlegt. Die Anpassung kleiner Aspekte wie des Münchner Kindl Logos erfordert bei so einem System, dass *alle* Vorlagen bearbeitet werden. Der WollMux dagegen setzt seine Briefköpfe aus verschiedenen Einzeldateien zusammen. Diese Dateien sind die Textfragmente. Jedes Textfragment ist dabei eine eigene Vorlage im OpenDocument-Format und wird wie eine ganz normale Vorlage mit LibreOffice erstellt und einzeln gepflegt. Erst wenn eine WollMux-Vorlage geöffnet wird, fügt der WollMux die entsprechenden Textfragmente ein, wodurch der Briefkopf entsteht.

Ein Vorteil dieses Systems ist es, dass Änderungen am Briefkopf vorgenommen werden können, ohne alle Vorlagen bearbeiten zu müssen. Um dies zu erreichen, würde es allerdings ausreichen, den Briefkopf als Ganzes in ein Fragment auszulagern. In der Standardkonfiguration dagegen sind die Briefköpfe weiter unterteilt in kleine Einzelfragmente. Zum Beispiel steht das Logo für die Fußzeile in einer eigenen Datei. Diese Aufteilung erlaubt es, einzelne Aspekte des Briefkopfes für verschiedene Benutzergruppen anders zu gestalten, während die gemeinsamen Aspekte weiterhin einheitlich gepflegt werden. Dies reduziert den Aufwand für die Wartung und Test und senkt das Fehlerrisiko.

Eine detaillierte Erklärung des Prinzips “Textfragmente” finden Sie auf der Seite [Textfragmente im WollMux](Textfragmente_im_WollMux.md). Im Folgenden wird beschrieben, wie die Liste der Textfragmente in einer Standardkonfiguration administriert wird und wie unterschiedliche Briefköpfe für verschiedene Benutzergruppen realisiert werden.

### Das Verzeichnis `vorlagen/fragmente`

Die im Verzeichnis `vorlagen/fragmente` enthaltenen Dateien sind die Fragmente aus denen die Standardbriefköpfe dynamisch zusammengesetzt werden. Änderungen an den Standardbriefköpfen schlagen sich immer in Änderungen dieses Verzeichnisses nieder. Die Dateien im Verzeichnis `vorlagen/fragmente` werden ausschließlich zentral gepflegt. Die Referate sollten keine der in diesem Verzeichnis enthaltenen Dateien bearbeiten und auch keine eigenen Dateien in diesem Verzeichnis anlegen. Ansonsten kann das Skript `xupdate` zum automatisierten Update der Konfiguration nicht mehr verwendet werden.

Die Referate dürfen für ihre eigenen Fragmente beliebige Unterverzeichnisse im Verzeichnis `vorlagen/fragmente` anlegen, solange die Namen dieser Unterverzeichnisse keine Dateierweiterung besitzen. Das Verzeichnis `vorlagen/fragmente/beispiele` ist ein Beispiel dafür, wie ein solches Unterverzeichnis verwendet werden kann, um dort Textbausteine zu hinterlegen.

Wie bereits im [Abschnitt zur Nützlichkeit von Symlinks](#warum-sind-symlinks-nützlich-) erwähnt, ist es empfehlenswert, Vorlagen die an mehreren Stellen in der Menüstruktur oder von mehreren Benutzergruppen verwendet werden, in einem Unterverzeichnis von `vorlagen/fragmente/` zu hinterlegen und an den Stellen, wo die Vorlage verwendet wird entsprechende Symlinks anzulegen.

### Die Bedeutung der ?.insertFrag Verzeichnisse

Intern verwaltet der WollMux Fragmente nicht direkt als Dateipfade oder URLs sondern über abstrakte Bezeichner, die zur Laufzeit in den entsprechenden Pfad der Vorlage übersetzt werden. Nur so ist es möglich,  eine Vorlage zu erstellen, die den externen Briefkopf importiert, ohne dessen Pfad fest in der Vorlage zu hinterlegen. Zu jeder Benutzergruppe &lt;gruppe&gt; existiert ein Verzeichnis `vorlagen/&lt;gruppe&gt;/`. In diesem Verzeichnis sind immer ein oder mehrere Verzeichnisse nach dem Muster `?.insertFrag` (z.B. `X.insertFrag`), wobei ? ein beliebiges Zeichen ist. Anders als die Präfixe für Menü-Verzeichnisse dient dieses Zeichen *nicht* zur Sortierung und es ist auch tatsächlich nur genau ein Zeichen erlaubt, keine mehrstelligen Zahlenpräfixe.

Die `?.insertFrag`-Verzeichnisse enthalten Symlinks auf Dateien im Ordner `vorlagen/fragmente` bzw. im Falle referatseigener Fragmente auf Dateien in Unterordnern davon. Den Namen dieser Symlinks kommt besondere Bedeutung zu, denn sie werden (abzüglich der Endung `.ott`) als eben jene weiter oben erwähnten abstrakten Fragment-Bezeichner verwendet, über die WollMux-Vorlagen die entsprechenden Dateien referenzieren. Das Beispiel des externen Briefkopfs soll dies verdeutlichen:

* Eine Mischvorlage ist eine Vorlage, die ihren Briefkopf nicht fest verdrahtet enthält, sondern ihn dynamisch einmischt. Alle Vorlagen sollten als Mischvorlagen realisiert werden, wenn nicht außergewöhnliche Gründe, die eine Abweichung vom städtischen Erscheinungsbild erfordern, dagegen sprechen.
* Wenn man eine Mischvorlage mit externem Briefkopf zum Bearbeiten öffnet (auf dem Basisclient z.B. durch Rechts-Klick im Dateimanager und Auswahl von “Vorlage bearbeiten”; ansonsten in LibreOffice über *Datei/Dokumentvorlage/Bearbeiten...*), dann sieht man in ihr keinen Briefkopf.
* Wenn man jedoch in LibreOffice den Navigator öffnet (*Bearbeiten/Navigator*) und sich die Textmarken anschaut, findet man dort eine Textmarke mit der Bezeichnung

  `WM(CMD 'insertFrag' FRAG_ID 'externerBriefkopf')`.
* Diese spezielle Textmarke weist den WollMux an, beim Öffnen dieser Mischvorlage das Textfragment mit dem abstrakten Bezeichner “externerBriefkopf” einzumischen.
* Würde man die WollMux-Konfiguration von Hand schreiben, dann könnte man durch einen entsprechenden Eintrag diesen abstrakten Bezeichner auf eine beliebige URL verweisen lassen. Bei einer Standardkonfiguration, die mit `automux` gepflegt wird übernimmt jedoch `automux` das Anlegen der Einträge für die abstrakten Bezeichner.
* `automux` legt für jeden Symlink in einem `?.insertFrag` Verzeicheis einen Eintrag an. Wenn Sie in die Verzeichnisse `vorlagen/standard` und `vorlagen/blümchen` der von D-III-ITD-D101 bereitgestellten Standardkonfigurationsarchive schauen, sehen Sie dort jeweils ein Verzeichnis `X.insertFrag`. Beide `X.insertFrag` Verzeichnisse (technisch gesehen, ist es nur ein Verzeichnis, da das `X.insertFrag` der Gruppe blümchen nur ein Symlink auf das `X.insertFrag` von standard ist) enthalten einen Symlink `externerBriefkopf.ott`. Aus diesem Symlink macht `automux` einen entsprechenden Konfigurationseintrag für den abstrakten Bezeichner “externerBriefkopf”.
* Zu beachten ist, dass diese Einträge in der `wollmuxbar_&lt;gruppe&gt;.conf` gespeichert werden, also gruppenspezifisch sind. Hätte die Gruppe Blümchen einen anderen Symlink `externerBriefkopf.ott`, dann würde ein Benutzer der Gruppe Blümchen beim Öffnen der *selben* Mischvorlage einen anderen Briefkopf eingemischt bekommen. Auf die Möglichkeiten, die sich dadurch ergeben wird weiter unten noch anhand von Praxisbeispielen eingegangen.
* Wenn man das Fragment des externen Briefkopfs zum Bearbeiten öffnet (wahlweise über einen der `externerBriefkopf.ott` Symlinks oder die eigentliche Fragmentdatei `fragmente/WOL_Briefkopf-extern_v1_2005-12-19.ott`), dann sieht man, dass er einige Lücken enthält. Zum Beispiel steht in der Fußzeile nur der Platzhaltertext "&lt;Fusszeile&gt;".
* Schaut man im Navigator wieder die Textmarken an, dann sieht man dort die Textmarke `WM(CMD 'insertFrag' FRAG_ID 'Fusszeile')`.
* Diese Textmarke funktioniert genau so wie die weiter oben erklärte für den abstrakten Bezeichner “externerBriefkopf” und wieder gibt es im `X.insertFrag` Verzeichnis einen entsprechenden Symlink `Fusszeile.ott`.

> **HINT** Wenn der WollMux beim Öffnen einer Vorlage eine Popup-Meldung “Fehler bei der Dokumentbearbeitung” bringt, dann kann ein fehlendes Fragment die Ursache sein. Sehen Sie entweder in der `wollmux.log` nach oder schauen Sie im Dokument nach einem "&lt;FEHLER:&gt;" Marker und lassen Sie die Maus über dem zugehörigen Kommentarfeld schweben. Dort erfahren Sie näheres darüber, um welches Fragment es geht. Vergessen Sie auch nicht, nach dem Ändern eines der `?.insertFrag` Verzeichnisse immer `run_automux` laufen zu lassen.

<!-- -->
> **WARNING** Die Verwaltung der Fragmente liegt in der WollMux-Komponente von LibreOffice, *nicht* in der WollMuxBar. Die WollMuxBar zu schließen reicht also *nicht* aus (und ist sogar gar nicht notwendig), damit eine geänderte Konfiguration der Fragmente Wirkung zeigt. Es müssen *alle* LibreOffice Prozesse (Prozessname `soffice.bin`) beendet werden, bevor die neue Konfiguration effektiv wird. Beachten Sie, dass auch nach Schließen aller OOo Fenster noch unsichtbare `soffice.bin` Prozesse aktiv sein können. Das Verwenden des Taskmanagers ist also ratsam.

#### Beispiel: Eine Benutzergruppe soll ein anderes Logo in der Fußzeile haben

Ein häufiger Anwendungsfall ist, dass verschiedene Benutzergruppen verschiedene Logos in der Fußzeile benötigen. Für dieses Beispiel gehen wir davon aus, dass die Gruppe Blümchen in ihren Briefköpfen das Total E-Quality Logo verwenden möchte, während der Standard weiterhin das WollMux-Logo ist. Das Prinzip der Aufteilung des Briefkopfs in viele Einzelfragmente kombiniert mit der Möglichkeit, mehrere `?.insertFrag` Verzeichnisse zu haben, erlaubt es, diese Anforderung mit minimalem Wartungsaufwand umzusetzen. Im Folgenden sind die notwendigen Schritte dafür aufgezeigt. In den von D-III-ITD-D101 bereitgestellten Archiven sind diese bereits umgesetzt, so dass bei Verwendung von `wollmuxbar_blümchen.conf` das Endergebnis bereits betrachtet werden kann.

* Der erste Schritt ist die Identifizierung des entsprechenden Fragments. Wenn dies nicht anhand der Dateinamen offensichtlich ist, kann es durch Nachverfolgen der `insertFrag` Textmarken mit dem Navigator, ausgehend vom externen Briefkopf, bestimmt werden. In diesem Fall ist das betroffene Fragment bereits am Namen deutlich erkennbar: `Logo.ott`.
* Als nächstes müssen die Voraussetzungen dafür geschaffen werden, dass beide Benutzergruppen unterschiedliche Logo-Fragmente verwenden.
  * Um den Wartungsaufwand gering zu halten und um Fehlern vorzubeugen, ist es ratsam, mit Hilfe von Symlinks ganze Verzeichnisse der Standard-Benutzergruppe für andere Benutzergruppen zu übernehmen. Im Fall der Gruppe Blümchen ist zum Beispiel `vorlagen/blümchen/X.insertFrag` ein Symlink auf `vorlagen/standard/X.insertFrag`, so dass die Gruppe Blümchen automatisch die Fragmente der Standard-Gruppe Bienchen übernimmt, ohne dass zusätzlicher Pflegeaufwand anfällt.
  * Im Falle des Logo-Fragments benötigen wir jedoch eine Ausnahme, denn dieses soll die Gruppe Bienchen eben gerade nicht von der Standard-Gruppe übernehmen. Deswegen darf `Logo.ott` *nicht* im gemeinsamen Verzeichnis `X.insertFrag` stehen.
  * Zum Glück ist es möglich, mehrere Verzeichnisse nach dem Muster `?.insertFrag` zu haben. Deswegen erstellen wir einfach ein Verzeichnis `vorlagen/standard/Y.insertFrag/` und ein Verzeichnis `vorlagen/blümchen/Y.insertFrag/`. Dieses Mal verwenden wir anders als bei `X.insertFrag` tatsächlich unabhängige Verzeichnisse.
  * Diese Konstruktion erlaubt es uns, gemeinsam genutzte Fragmente weiterhin in dem gemeinsam genutzten Verzeichnis `X.insertFrag` zu halten und dadurch weiterhin den Vorteil des niedrigeren Wartungsaufands zu haben. Gleichzeitig können wir Fragmente, die sich zwischen den beiden Gruppen unterscheiden in den `Y.insertFrag` Verzeichnissen halten.
* Im Verzeichnis `standard/Y.insertFrag/` erstellen wir nun einen Symlink auf `vorlagen/fragmente/Logo.ott`, im Verzeichnis `blümchen/Y.insertFrag/` dagegen verlinken wir `vorlagen/fragmente/Logo_total_equality.ott`. Dabei nicht vergessen, die entsprechenden Symlinks im Verzeichnis `X.insertFrag` zu löschen.
* Damit das Ganze funktioniert, muss der Symlink wieder den ursprünglichen Namen haben. Deshalb muss der Symlink `Logo_total_equality.ott` in `Logo.ott` umbenannt werden, da die entsprechende FRAG\_ID immer noch auf diesen Namen lautet.
* Am Ende wird noch `run_automux` aufgerufen, damit die Änderungen in die `wollmuxbar_`&lt;gruppe&gt;`.conf` Dateien geschrieben werden.
* Nach dem Beenden und Neustart von LibreOffice haben nun Benutzer der `wollmuxbar_blümchen.conf` beim Aufruf des externen Briefkopfes das Total-E-Quality Logo.

> **WARNING** Die Verwaltung der Fragmente liegt in der WollMux-Komponente von LibreOffice, *nicht* in der WollMuxBar. Die WollMuxBar zu schließen reicht also *nicht* aus (und ist sogar gar nicht notwendig), damit eine geänderte Konfiguration der Fragmente Wirkung zeigt. Es müssen *alle* LibreOffice Prozesse (Prozessname `soffice.bin`) beendet werden, bevor die neue Konfiguration effektiv wird. Beachten Sie, dass auch nach Schließen aller OOo Fenster noch unsichtbare `soffice.bin` Prozesse aktiv sein können. Das Verwenden des Taskmanagers ist also ratsam.

#### Beispiel: Eine Benutzergruppe soll nur die Orga-E-Mail-Adresse im Briefkopf haben

In diesem Anwendungsfall ist es erforderlich, dass eine Benutzergruppe im externen Briefkopf nur die E-Mail-Adresse der Orga-Einheit und nicht die persönliche hat.

Eine Möglichkeit dies zu realisieren, die gleichzeitig die Flexibilität bietet, dies auf Fallbasis zu tun, wäre die Verwendung von *Rollen*. Wird über die WollMuxBar *Extras/Absenderdaten/Bearbeiten...* der Dialog zur Bearbeitung der persönlichen Absenderliste aufgerufen, so kann dort über den Button “Kopieren” eine Kopie des eigenen Eintrags angelegt werden. Dieser erhält automatisch die Rolle “Kopie”. Die Rolle kann im über den *Bearbeiten..* Button aufgerufenen Dialog auf eine bessere Bezeichnung geändert werden. Im *Bearbeiten...* kann auch die persönliche Mailadresse so geändert werden, dass sie der der Orga-Einheit entspricht. Verwendet die Sachbearbeiterin oder der Sachbearbeiter den Absendereintrag mit der neuen Rolle, so wird in aufgerufenen Briefköpfen statt der persönlichen E-Mail-Adresse die der Orga-Einheit eingefügt.

Obige Lösung ist mit Aufwand für die Einzelbenutzer verbunden und birgt die Gefahr, dass die Rollen durcheinandergebracht werden. Möchte man bei einer Benutzergruppe grundsätzlich für den externen Briefkopf immer die Orga-E-Mail statt der persönlichen verwenden, dann lässt sich dies auch über den schon im vorigen Beispiel beschriebenen `?.insertFrag` Mechanismus realisieren. Die notwendigen Schritte sind die selben wie im [Beispiel des benutzergruppenspezifischen Logos](beispiel-eine-benutzergruppe-soll-ein-anderes-logo-in-der-fußzeile-haben) und werden hier deshalb nur noch sehr kurz umrissen. In den von D-III-ITD-D101 bereitgestellten Archiven ist dieses Beispiel nicht umgesetzt.

* Identifikation der betroffenen Fragmente: Für die E-Mail-Adresse gibt es mehrere Fragmente, die von verschiedenen Vorlagen verwendet werden. Zum Beispiel verwendet die Kurzmitteilung das Fragment mit Bezeichner “Email\_kurzm”. Der externe Briefkopf verwendet das Fragment mit Bezeichner “Email”
* Aus `X.insertFrag` entfernen: Wenn wie im Beispiel von den Bienchen und den Blümchen das Verzeichnis `X.insertFrag` gemeinsam genutzt wird, dann müssen die entsprechenden im vorigen Schritt identifizierten Symlinks aus `X.insertFrag` entfernt werden.
* In `Y.insertFrag` anlegen: Für die im vorigen Schritt entfernten Symlinks müssen neue Symlinks (mit den gleichen, ursprünglichen Namen) in den `Y.insertFrag` Verzeichnissen angelegt werden (davon ausgehend, dass `Y.insertFrag` unabhängige Verzeichnisse sind, wie bei den Bienchen und Blümchen). Standardmäßig verweisen alle Email-Fragmente auf die Datei `vorlagen/fragmente/WOL_Briefkopf-Fragment-Email_2006-02-21.ott`. Diese Datei enthält einen WollMux-Befehl zum Einfügen der persönlichen E-Mail-Adresse. Daneben gibt es noch das Fragment `vorlagen/fragmente/OrgaEMail.ott`. Dieses fügt die Orga-E-Mail-Adresse ein. Werden in `Y.insertFrag` entsprechende Symlinks auf diese Fragmentdatei eingerichtet, dann erscheint in den betroffenen Briefköpfen die Orga-E-Mail anstatt der persönlichen.

#### Beispiel: Neue Mischvorlage erstellen

Dieses Beispiel hat nicht direkt mit der Standardkonfiguration zu tun, sondern dient nur dazu, zu demonstrieren, wie einfach sich Vorlagen erstellen lassen, die einen der Standardbriefköpfe enthalten. Um eine Vorlage zu erstellen, die dynamisch den externen Briefkopf in der jeweils aktuellen Form einfügt und automatisch mit den Sachbearbeiterdaten befüllt gehen Sie wie folgt for:

* Starten Sie die WollMux-Sidebar
* Rufen Sie *Standard/Mischvorlagen/Mischvorlage externer Briefkopf* auf.
* Es öffnet sich eine “Vorlage für Vorlagen”. Lesen Sie den Erklärungstext in dieser Vorlage.
* Fügen Sie den gewünschten Text für die neue Vorlage ein. Beachten Sie dabei den [Leitfaden zum Dokumentenaustausch zwischen MSO und    OOo](:Category:Leitfaden_zum_Dokumentenaustausch_zwischen_MSO_und_OOo).
* Speichern Sie die Vorlage als “OpenDocument Textdokumentvorlage” mit der Dateierweiterung `.ott`.
* Fertig. Wenn Sie diese Vorlage öffnen (z.B. durch Doppelklick im Dateimanager), wird der externe Briefkopf automatisch eingemischt und mit den korrekten Sachbearbeiterdaten befüllt.

> **WARNING** Um eine Mischvorlage zu bearbeiten, *muss* diese korrekt als Vorlage geöffnet werden. Verwenden Sie dafür entweder auf dem Basisclient im Dateimanager *Rechts-Klick/Vorlage bearbeiten* oder in LibreOffice den Menüpunkt *Datei/Dokumentvorlage/Bearbeiten...*\
Es gibt eine ganz einfache Merkregel: Wenn in dem LibreOffice Fenster, das Sie vor sich haben ein Briefkopf angezeigt wird, dann dürfen Sie es *unter keinen Umständen* als Vorlage speichern. Es verliert sonst dauerhaft die Fähigkeit den Briefkopf dynamisch einzumischen und mit Sachbearbeiterdaten zu befüllen. Sehen Sie dagegen statt eines Briefkopfs einen Platzhalter, wie z.B. "&lt;externer Briefkopf&gt;", dann können Sie getrost als Vorlage speichern.

## Textbausteine

Textbausteine sind ein schon lange eingesetztes Mittel, um das Erstellen von Dokumenten, die immer wiederkehrende Elemente enthalten zu vereinfachen. Typischerweise gibt es ein Texthandbuch, aus dem die Sachbearbeiterinnen und Sachbearbeiter die Textbausteine heraussuchen und dann über einen Mechanismus, z.B. die Eingabe eines im Handbuch abgedruckten Codes gefolgt von einem Tastenkürzel zum Aufruf eines Makros, in ihr Dokument einfügen können. Für viele der klassischen Anwendungsfälle von Textbausteinen gibt es im WollMux komfortablere Lösungen. Gerade die Ein- und Ausblendungen, die von WollMux-Formularen zur Verfügung gestellt werden, können oft Anwendungsfälle von Textbausteinen ersetzen. Da diese alternativen Mechanismen jedoch nicht alle Anwendungsfälle von Textbausteinen abdecken können und vor allem auch, da eine Umsetzung der umfangreichen Sammlung existierender Textbausteine mancher Referate über andere WollMux-Mittel eine langfristige Sache ist, bietet der WollMux auch ein Textbausteinsystem an.

In der Standardkonfiguration wird das Textbausteinsystem durch die Datei `conf/textbausteine.conf` konfiguriert. Diese Datei ist in den von D-III-ITD-D101 bereitgestellten Archiven nur als Beispiel enthalten. Sie liegt vollständig im Einflussbereich der Referate und wird von `xupdate` nicht überschrieben. Neben dieser Konfigurationsdatei ist auch noch die `conf/tastenkuerzel.conf` erwähnenswert. Diese hat zwar nicht direkt etwas mit dem Textbausteinsystem zu tun, jedoch wird typischerweise für das Einfügen eines Textbausteins ein Tastenkürzel vergeben und dies erfolgt in der Standardkonfiguration über die Datei `tastenkuerzel.conf`.

Neben der Konfigurationsdatei `textbausteine.conf`, deren Hauptaufgabe es ist, die Codes festzulegen, mit denen sich die Textbausteine aufrufen lassen, sind natürlich auch noch die Textbausteine selbst erforderlich. Im WollMux ist jeder Textbaustein repräsentiert durch ein entsprechendes Textfragment. Wie bereits erwähnt sieht die Standardkonfiguration Unterverzeichnisse von `vorlagen/fragmente/` als Speicherort für referatseigene Textfragmente vor. Z.B. könnte `vorlagen/fragmente/textbausteine/` als Speicherort für Textbausteine verwendet werden. Die von D-III-ITD-D101 bereitgestellten Archive enthalten ein Verzeichnis `vorlagen/fragmente/beispiele/`, in dem einige Textbausteine enthalten sind.

Der Weg vom Code, den der Benutzer eingibt, bis zum Einfügen einer konkreten Datei ist mehrstufig und erfolgt nach folgendem Schema

```
Benutzereingegebener Code
     Übersetzung anhand des Kuerzel-Abschnitts
Fragment-ID
     Übersetzung anhand des Textfragmente-Abschnitts
URL der einzufügenden Datei
```

Der [*Kuerzel*-Abschnitt](Konfigurationsdatei_wollmux_conf.md#kuerzel), der für die Übersetzung des benutzereingegebenen Codes in eine Fragment-ID verantwortlich ist, wird in der Datei `textbausteine.conf` von Hand gepflegt. Der [*Textfragmente*-Abschnitt](Konfigurationsdatei_wollmux_conf.md#textfragmente), der für die Übersetzung einer Fragment-ID in die URL der einzufügenden Datei verantwortlich ist, besteht aus einem automatisch generierten und einem händisch gepflegten Teil.

Der automatisch durch `automux` generierte Teil steht in der `wollmuxbar_`&lt;gruppe&gt;`.conf`. Dabei handelt es sich um nichts anderes als um die durch die weiter oben beschriebenen [`?.insertFrag` Verzeichnisse](#die-bedeutung-der-insertfrag-verzeichnisse) definierten abstrakten Bezeichner. Diese können nicht nur in `WM(CMD 'insertFrag' FRAG_ID "...")` Textmarken verwendet werden, sondern stehen uneingeschränkt auch für das Textbausteinsystem zur Verfügung.

Die Möglichkeit, über `?.insertFrag` Verzeichnisse Textfragmente zu definieren ist insofern eingeschränkt als jede Fragment-ID durch einen eigenen entsprechend benannten Symlink repräsentiert werden muss. Bei großen Mengen an Textbausteinen ist dies unpraktisch, insbesondere wenn die Textbausteine alle einem einheitlichen Namensschema folgen (z.B. BST1020, BST1030, BST2020,...). In so einem Fall ist es meist günstiger von Hand eine intelligente Textfragment-Definition zu erstellen, die mit Hilfe von regulären Ausdrücken auf einen Schlag viele Pfade abdeckt. Für solche Regeln ist in der Standardkonfiguration der *Textfragmente*-Abschnitt in der Datei `textfragmente.conf` vorgesehen. Die von D-III-ITD-5.1 bereitgestellten Archive enthalten in der `textfragmente.conf` bereits so ein Beispiel, mit dem über eine einzige Regel alle Textbausteine nach dem Muster `Abt*.ott` im Verzeichnis `vorlagen/fragmente/beispiele/` verfügbar gemacht werden.

<Category:Eierlegender_WollMux> <Category:Handbuch_des_WollMux>
