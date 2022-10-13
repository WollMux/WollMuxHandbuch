# Die Datenquelle

Die Datenquelle (Calc Tabelle) beinhaltet alle variablen Daten (z. B. Adressen) die Sie in Ihrem Serienbrief nutzen möchten. Der Aufbau der Datenquelle beeinflusst die Erstellung des Ausgangsdokuments bzw. der Ausgangsvorlage und die Möglichkeiten, die Ihnen dort zur Verfügung stehen erheblich.

Sie sollten - wenn möglich immer - die Felder, die schon in der Ausgangsvorlage bzw. im Ausgangsdokument vorhanden sind, verwenden. Dies betrifft. insb. die Felder, die schon im Briefkopf enthalten sind. Wir empfehlen diese Felder **nicht** zu ändern – also **nicht** „EmpfaengerZeile1“ in „Anrede“ umzubenennen. Viel besser und auch flexibler ist es die Datenquelle entsprechend anzupassen.

## Grundlagen

Als Datenquelle können Sie Tabellen aus Tabellendokumenten, wie Sie sie mit Calc erstellen, verwenden. In diesem Handbuch wird primär die Nutzung der WollMux-Seriendruckfunktion mit Tabellen aus Tabellendokumenten beschrieben. Tabellen aus Textdokumenten (Writer) können nicht für den Seriendruck verwendet werden. Falls Sie Word-Tabellen für den Seriendruck in Word verwendet haben, müssen diese in Tabellendokumente (Calc) übernommen werden.

Jede Datenquelle besteht aus einer Tabelle, z. B. aus einer Tabelle eines Calc-Tabellendokuments. Diese Tabelle wiederum besteht aus Spalten und Zeilen. Dabei ist es notwendig, dass jede Spalte eine Überschrift hat. Diese Überschrift erklärt sozusagen, welche Informationen in der entsprechenden Spalte eingetragen werden müssen. Die Überschrift gibt der Spalte also ihren **Feldnamen**. Die Feldnamen stehen immer in der ersten Zeile der Tabelle (siehe ). Diese heißt daher auch Feldnamenszeile. Der Feldname entspricht dem Namen des Seriendruckfeldes im Ausgangsdokument. Die weiteren Zeilen sind die sog. Datensätze, in denen die variablen Informationen des Briefes eingetragen sind.

![Typischer Aufbau einer Datenquelle](images/mailmerge_datasource.png "Typischer Aufbau einer Datenquelle")

## Erstellung der Datenquelle

Eine neue Datenquelle kann in LibreOffice entweder über **Datei → Neu → Tabellendokument** oder über **Extras → Seriendruck (WollMux) → Neue Calc-Tabelle...** erstellt werden.

Tragen Sie in die erste Zeile die Feldnamen ein, die Sie später in Ihrem Serienbrief verwenden wollen ein. Nehmen Sie zu diesem Zeitpunkt noch
**keine** Rücksicht auf evtl. schon vorhandene Felder in Ihrer Ausgangsvorlage oder in Ihrem Ausgangsdokument. Schreiben Sie also für das Feld, das die Anrede enthalten soll, „Anrede“ und nicht „EmpfaengerZeile1“ oder ähnliches. Diese Anpassung bzw. Erweiterung erfolgt erst in einer der nächsten Schritte (siehe Kapitel [Datenquelle an die WollMux Felder anpassen](#datenquelle-an-die-wollmux-felder-anpassen)).

Ab der zweiten Zeile tragen Sie Ihre Daten ein. Wenn Sie alle Datensätze eingetragen haben, speichern Sie das Tabellendokument. Spätere Anpassungen, wie z.B. das Hinzufügen oder Löschen von Datensätzen sind natürlich jederzeit möglich (siehe Kapitel [Nachbearbeitung der Datenquelle](#nachbearbeitung-der-datenquelle)).

Bitte achten Sie darauf, dass Ihre Tabelle folgenden Qualitätskriterien entspricht:

* Die Feldnamen sollten nur aus folgenden Zeichen bestehen:
  * 0-9
  * a-z
  * A-Z
  * \_
  * Also keine Leerzeichen, Sonderzeichen etc. im Feldnamen.
* Bitte machen Sie in den Spaltenüberschriften, also bei den Feldnamen keine (manuellen) Zeilenumbrüche.
* Es sollten keine Leerspalten in der Datenquelle vorhanden sein: Die Feldnamenszeile muss vollständig ausgefüllt sein. Zwischen den Datenspalten darf keine Spalte existieren, die keine Überschrift hat.
  * In der Datenquelle können auch Spalten enthalten sein, die nicht für den Seriendruck verwendet werden sollen. Das bedeutet, Sie können auch Calc Tabellen verwenden, die Sie schon für andere Zwecke angelegt haben, die aber die Felder, die Sie für den Seriendruck verwenden wollen schon enthält. Dadurch brauchen Sie nicht extra eine weitere Tabelle anzulegen.
* Identische Information – Identischer Eintrag: Achten Sie darauf, dass z. B. in einer Spalte „Anrede“ wirklich immer die Anrede auf die gleiche Art eingetragen ist; also immer „Herr“ oder immer „Herrn“, aber auf keinen Fall mischen. Überprüfen Sie das mit der Funktion Autofilter in Calc. Näheres zum Autofilter finden Sie im Kapitel [Datensätze für den Ausdruck filtern](#datensätze-für-den-ausdruck-filtern).
* Verwenden Sie in verschiedenen Tabellen (Datenquellen) denselben Feldnamen für denselben Inhalt, z. B.: Nehmen Sie entweder immer „Nachname“ oder immer „Name“ als Feldname für den Familiennamen. Wenn sie in der einen Tabelle „Name“ schreiben und in einer anderen „Nachname“ und in der dritten „Familienname“, dann müssen Sie Ihre Serienbriefe immer wieder anpassen und es wird unübersichtlich.

## Nachbearbeitung der Datenquelle

Die Datenquelle kann jederzeit nachbearbeitet werden. Die Daten stehen sofort für den Seriendruck zu Verfügung. Öffnen Sie einfach das Tabellendokument, führen Sie die Änderungen durch und speichern Sie die Datei. Oder klicken Sie in der Sidebarauf die Schaltfläche *Tabelle bearbeiten*. Dadurch wechseln Sie zur Datenquelle.

## Datenquelle an die WollMux Felder anpassen

Wenn Sie sich ein WollMux Formular mit dem externen Briefkopf ansehen, werden Sie feststellen, dass dort einige Felder schon enthalten sind, die ebenfalls mit Daten aus der Datenquelle befüllt werden sollen.
![Bereits vorhandene Felder im externen Briefkopf](images/mailmerge_fields_external.png)

Hierfür empfiehlt sich das WollMuxdokument oder die -vorlage unverändert zu lassen und stattdessen die Datenquelle zu erweitern.

Die wichtigsten Felder werden wahrscheinlich die Felder im Empfängerfeld sein, also die EmpfaengerZeile1 bis EmpfaengerZeile6. Im ersten Schritt muss man sich nun festlegen, welche der bereits vorhandenen Felder, wie in die Empfängerzeilen eingetragen werden sollen. Wo soll also z.B. die Anrede stehen oder in welcher Stelle steht die Straße und die Hausnummer?

<table border="2" cellspacing="0" cellpadding="4" rules="all" style="margin:1em 1em 1em 0; border:solid 1px #AAAAAA; border-collapse:collapse; background-color:#F9F9F9; font-size:100%; empty-cells:show;">
<tr>
<td>EmpfaengerZeile1</td>
<td>Anrede und Titel</td>
</tr>
<tr>
<td>EmpfaengerZeile2</td>
<td>Vorname und Nachname</td>
</tr>
<tr>
<td>EmpfaengerZeile3</td>
<td>Straße und Hausnummer</td>
</tr>
<tr>
<td>EmpfaengerZeile4</td>
<td>PLZ und Ort</td>
</tr>
<tr>
<td>EmpfaengerZeile5</td>
<td></td>
</tr>
<tr>
<td>EmpfaengerZeile6</td>
<td></td>
</tr>
</tbody>
</table>

1. Legen Sie in Calc die Spalten mit den Namen „EmpfaengerZeile1“ bis „EmpfaengerZeile6“ an. Wenn Sie z.B. die „EmpfaengerZeile6“ nicht benötigen, können Sie sie auch weglassen. Achten Sie bitte unbedingt auf die richtige Schreibweise!
2. Es ist dringend zu empfehlen sich die nun eingefügten Spalten automatisch befüllen zu lassen, damit man bei einer Anpassung der Tabelle die Daten immer nur an einer Stelle eintragen muss. Dazu benötigt man eine passende Calc Formel, die uns z.B. die Felder „Vorname“ und „Nachname“ automatisch in die Spalte „EmpfaengerZeile2“ überträgt.
3. Dafür bietet sich die Funktion „VERKETTEN“ an. Mit dieser Funktion können Inhalte von Zellen miteinander verbunden bzw. verkettet werden. Wenn beispielsweise in C2 der Vornamen und in D2 den Nachnamen steht, würde die Funktion folgendermaßen aussehen: `=VERKETTEN(C2; " "; D2)`
4. Diese Funktion wird in die Spalte „EmpfaengerZeile2“, in diesem Fall J2 eingetragen. Das sorgt dafür, dass in J2 nun zuerst der Inhalt aus C2 gefolgt von einem Leerzeichen (damit die Einträge nicht direkt „aneinander kleben“) und des Inhaltes von D2 erscheinen.
5. Wenn man die Zelle J2 nun markiert und nach unten zieht, werden alle Felder mit der Funktionen und den dazugehörigen Feldern befüllt.
6. Mit den anderen Felder wird einfach analog verfahren.
