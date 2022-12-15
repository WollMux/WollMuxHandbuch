# Etikettendruck

Im Unterschied zum Serienbrief werden bei Serienetiketten die Daten mehrerer Datensätze auf einer Seite ausgegeben. Um das zu gewährleisten wird das Spezialfeld *Nächster Datensatz* benötigt.

Zur Erstellung von Serienetiketten können Sie die gleiche Datenquelle verwenden, wie für den normalen Seriendruck. Auch die Neuerstellung einer Datenquelle funktioniert analog zum „normalen“ Seriendruck (siehe Kapitel [Die Datenquelle](datasource.md)).

## Erstellen des Ausgangsdokument

Das Erstellen eines Ausgangsdokument funktioniert im ersten Schritt genauso wie im LibreOffice Seriendruck. Zuerst müssen Sie das Format Ihrer Etiketten wählen. *Dazu gehen ins Menü Datei → Neu → Etiketten*.

![Dialog zur Erstellung von Etiketten](images/mailmerge_label.png "Dialog zur Erstellung von Etiketten")

In diesem Dialog müssen Sie nur das Format auswählen. Die restlichen Felder werden nur für den LibreOffice Etikettendruck benötigt.

Danach wechseln Sie auf den Reiter *Optionen*. Dort gibt es noch eine wichtige Einstellung, die die Erstellung der Etiketten wesentlich einfacher gestaltet. Falls noch nicht aktiviert, setzten Sie das Häkchen bei *Inhalte synchronisieren*. Dadurch können Sie relativ schnell den Inhalt der ersten Etiketten-Zelle in alle anderen übertragen.

Nach Setzen des Häkchens erscheint in Ihren Serienetiketten ein kleines Fenster mit einem Button *Etiketten synchronisieren*. Zum Erstellen des Ausgangsdokuments bestätigen Sie den Button *Neues Dokument*.

## Einfügen der Seriendruckfelder

Im Prinzip funktioniert das Einfügen der Seriendruckfelder genauso so wie beim „normalen“ Seriendruck. Beim Erstellen von Etiketten müssen Sie nur darauf achten, dass Sie die Eingaben immer im linken, oberen Feld machen. Der Übertrag in die anderen Felder erfolgt dann durch *Etiketten synchronisieren*.

Nachdem Sie Ihr Etikettenformat bestätigt haben, starten Sie den WollMux Seriendruck, wählen Ihre Datenquelle aus und fügen die benötigten Felder ein. Zwei Dinge fehlen hier noch: Zum einen müssen die Etiketten noch synchronisiert werden und zum anderen wurde das Spezialfeld *Nächster Datensatz* noch nicht eingefügt.

Man würde nun vermuten, dass hier etwas nicht stimmt, da ja in allen Feldern der gleiche Eintrag steht. Die Vorschau zeigt in diesem Fall aber nur den optischen Aufbau an, nicht den richtigen Inhalt. Jetzt betätigen Sie in der Sidebar den Button *Drucken* und wählen das Ausgabeformat, z.B. Gesamtdruck. In diesem Schritt werden dann erst die richtigen Daten eingefügt.

## Fehlerhafte Seitenränder anpassen

Manchmal stimmen die Ränder der Papieretiketten nicht mit den Rändern des Dokuments überein, das über die Funktion Etiketten erstellt wurde. Passen Sie dann das Seitenformat an. Meistens erreichen Sie den gewünschten Effekt mit A4.

Stellen Sie dazu ggf. das Seitenformat über Format → Seite... → Register Seite → Papierformat von Benutzer auf A4 um, oder Sie passen Sie die Seitenränder an, falls es Probleme beim Drucken gibt.
