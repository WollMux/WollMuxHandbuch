Im Zusammenhang mit dem WollMux sind, wie bei jeder anderen Software
auch, Probleme unvermeidbar. Ein großer Teil dieser Probleme fällt in
die Kategorie “Beobachtetes Verhalten weicht vom erwarteten Verhalten
ab”. Im folgenden werden derartige Probleme kurz als “Fehler”
bezeichnet. Teilweise handelt es sich dabei um Benutzerfehler, teilweise
um Bugs in der Software. Um Fehler zur Zufriedenheit der Benutzer
beseitigen zu können, entweder durch Support oder durch Fehlerbehebung
in der Software selbst, ist es erforderlich, dass Fehlerberichte alle
benötigten Informationen enthalten. Ebenfalls wichtig ist, dass diese
Informationen unter wohldefinierten Bedingungen aufgenommen wurden.

Bitte richten Sie sich daher bei der Meldung von Fehlern nach den
folgenden Richtlinien.

### Beantworten Sie bitte folgende Fragen

#### Checkliste

<table>
<tr>
<td> Welches Betriebssystem&#160;?
</td>
<td> LiMux Basis Client -&rarr; Versionsnummer
</td></tr>
<tr>
<td> Welche Besonderheiten auf dem System&#160;?
</td>
<td> Windows &rarr; Profilsynchronisation mit Netzwerkserver oder Teilen von Profildaten für mehrere Benutzer
</td></tr>
<tr>
<td>
</td>
<td> LiMux Basis Client &rarr; manuell nachinstallierte Debian Pakete
</td></tr>
<tr>
<td> Welches OpenOffice.org&#160;?
</td>
<td> OOo-Writer &rarr; Menü Hilfe &rarr; Info über OpenOffice.org &rarr; Strg-S-D-T
</td></tr>
<tr>
<td> Welche Java_Versionen?
</td>
<td> Windows Explorer &rarr; Suchen &rarr; java.exe
</td></tr>
<tr>
<td>
</td>
<td> LiMux Basis Client als root Konsole &rarr; <i>find / -maxdepth 3 -name java -print</i>
</td></tr>
<tr>
<td> Welches Java-Version aktiv&#160;?
</td>
<td> <i>java -version</i>
</td></tr>
<tr>
<td> Welches Java-Version in OOo&#160;?
</td>
<td> OOo-Writer &rarr; Menü Extras &rarr; Optionen &rarr; OpenOffice.org &rarr; Java
</td></tr>
<tr>
<td> Welche Interneteinstellungen in OOo&#160;?
</td>
<td> OOo-Writer &rarr; Menü Extras &rarr; Optionen &rarr; Internet
</td></tr>
<tr>
<td> Welche WollMux-Version&#160;?
</td>
<td> LOGGING DEBUG in wollmux.conf
</td></tr>
<tr>
<td> Bezugsquelle des WollMux&#160;?
</td>
<td> z.B. Debian-Paket oder heruntergeladen von URL
</td></tr>
<tr>
<td> Gab es andere Störungen zur selben Zeit&#160;?
</td>
<td> z.B. Netzwerkprobleme
</td></tr>
<tr>
<td> Funktioniert Zugriff über Browser auf&#160;?
</td>
<td> http:\\limux.tvc.muenchen.de/ablage/sonstiges/wollmux
</td></tr>
<tr>
<td> Eigene Erweiterungen an der Konfiguration&#160;?
</td>
<td> Auf Gross-/Kleinschreibung geachtet?
</td></tr>
<tr>
<td> Welche Standardkonfigurations-Version auf dem Webserver&#160;?
</td>
<td>
</td></tr>
<tr>
<td> Wird empfohlene Standardkonfiguration für die WollMux-Version verwendet&#160;?
</td>
<td>
</td></tr>
<tr>
<td> Funktioniert Zugriff auf die WollmuxUrl über Browser&#160;?
</td>
<td> WollmuxUrl &rarr; Verzeichnis .wollmux &rarr; wollmux.conf
</td></tr></table>

#### Ausführlichere Fragen

1.  Unter welchem Betriebssystem wurde getestet? Bitte seien Sie so
    genau wie möglich und geben Sie z.B. beim Basisclient die
    Versionsnummer mit an.
2.  Welche Besonderheiten sind auf dem System gegeben? Beispiele:
    1.  Unter Windows ist z.B. eine Profilsynchronisation mit einem
        Netzwerkserver anstatt der schlichten Speicherung der
        Profildaten (Desktop, Eigene Dateien,...) auf C:\\
        eine Besonderheit. Werden Profildaten von mehreren Benutzern
        geteilt (z.B. identischer Desktop für alle Benutzer) ist dies
        ebenfalls eine Besonderheit.
    2.  Auf dem Basisclient sind manuell nachinstallierte Debian-Pakete
        eine Besonderheit.

3.  Welche OpenOffice.org Version wird eingesetzt? Wählen Sie im Menü
    “Hilfe” den Punkt “Über OpenOffice.org” und drücken in dem
    erscheinenden Fenster die Tasten Strg-S-D-T (alle gleichzeitig) und
    geben Sie die Zeile direkt unter dem OK-Knopf an (z.B.
    “680m151(Build:8998)”).
4.  Welche Java-Versionen sind auf dem System installiert? Unter Windows
    lassen Sie über Start/Suchen/Dateien auf allen Lokalen Festplatten
    nach java.exe suchen und geben alle Fundstellen an. Auf dem
    Basisclient geben Sie das Ergebnis des Befehls `find /
    -maxdepth 3 -name "java" -print` an.
5.  Welche Java-Version steht im Systempfad? Um dies zu bestimmen, geben
    Sie in der Konsole den Befehl `java -version`
6.  Welche Java-Versionen kennt OpenOffice.org und welche davon wird
    verwendet? Um dies zu bestimmen, gehen Sie in OpenOffice.org
    auf Extras/Optionen/OpenOffice.org/Java. Geben Sie bitte alle
    Versionen an, die in der Liste stehen, sowie welche davon
    markiert ist.
7.  Wie sehen die Internet-Einstellungen von OpenOffice
    aus (Extras/Optionen/Internet)
8.  Welche Version des WollMux verwenden Sie? Bitte geben Sie genau die
    Quelle an, aus der Sie den WollMux bezogen haben (z.B.
    Debian-Paket ... heruntergeladen von URL ...).
9.  Gab es zum selben Zeitpunkt andere Störungen bzw. Probleme (z.B.
    Netzwerkprobleme)? Können Sie auf den Bereich der [Dateiablage im    Wiki](http://limux.tvc.muenchen.de/ablage/sonstiges/wollmux/)
    zugreifen, in der sich die Wollmux Dateien befinden?
10. Haben Sie eigene Erweiterungen an der Konfiguration vorgenommen?
    Haben Sie dabei insbesondere auch auf die korrekte
    Gross-/Kleinschreibung geachtet?
11. Welche Version der Standardkonfiguration haben Sie auf Ihrem
    Webserver installiert. Verwenden Sie die Standardkonfiguration, die
    für Ihre WollMux-Version empfohlen wird?
12. Können Sie mit Hilfe eines Browsers auf Ihren Webserver
    (insbesondere auf die “WollmuxUrl”) zugreifen. Ihre WollMuxUrl
    sollten Sie in der Datei wollmux.conf finden, die im
    .wollmux-Verzeichnis unterhalb Ihres Profils bzw.
    Homeverzeichnises liegt.

### Reproduzieren Sie das Problem unter wohldefinierten Bedingungen

1.  Falls der Fehler auf einem Windows NT System aufgetreten ist,
    versuchen Sie, ihn auf einem Windows 2000 System zu reproduzieren.
    Tritt der Fehler unter Win2k nicht auf, nehmen Sie diese Information
    bitte in Ihren Fehlerbericht mit auf. Beachten Sie, dass Windows NT
    weder von OpenOffice.org noch von Java offiziell unterstützt wird.
2.  Öffnen sie OpenOffice.org und gehen ins Menü
    Extras/Package Manager...
3.  Gehen Sie sowohl die Liste “Meine Packages” als auch “OpenOffice.org
    Packages” durch und entfernen sie alle WollMux-Pakete. Um das Paket
    aus “OpenOffice.org Packages” zu entfernen kann es notwendig sein,
    als Administrator den Befehl `unopkg remove --shared WollMux.oxt`
    auszuführen.

    Es sollten jetzt keine weiteren Pakete mehr installiert sein. Sind
    doch noch andere Pakete installiert, so geben Sie diese an.
4.  Wählen Sie “Meine Packages” an und benutzen dann den Button
    Hinzufügen, um die “WollMux.oxt” zu installieren. Bitte stellen Sie
    sicher, dass Sie wirklich die Version des WollMux verwenden, die Sie
    oben bei den Fragen angegeben haben. Da alle WollMux-Pakete
    “WollMux.oxt” heißen und es beim Download sehr leicht passieren
    kann, dass man in ein anderes Verzeichnis speichert als man denkt,
    ist es möglich, dass man eine ältere WollMux.oxt Version verwendet
    als man denkt.
5.  Wechseln Sie ins Profil-Verzeichnis des Benutzers (Unter Win2K ist
    dies C:\\Dokumente und Einstellungen\\&lt;Loginkürzel&gt;\\, auf dem
    Basis-Client das HOME-Verzeichnis). Ist dort ein Verzeichnis
    .wollmux? Wechseln Sie in dieses Verzeichnis. Ist dort eine Datei
    “wollmux.conf” ? Ist dort eine Datei wollmux.log?
6.  (Im Profil-Verzeichnis)Bearbeiten Sie die Datei “wollmux.conf” und
    fügen auf einer neuen Zeile am Ende der Datei die folgende Zeile
    ein: `LOGGING_MODE "debug"`
7.  Beenden Sie alle OpenOffice.org Prozesse. Verwenden Sie den
    Taskmanager um sicherzustellen, dass keine “soffice.bin” Prozesse
    mehr laufen.
8.  (Im Profil-Verzeichnis)Bearbeiten Sie die Datei “wollmux.log” (legen
    Sie sie an, falls sie nicht existiert) und schreiben ans Ende der
    Datei eine neue Zeile

    `Fehlerbericht von <Ansprechpartner> um <Uhrzeit> am <Datum>`
9.  Booten Sie den Rechner neu.
10. Beenden Sie alle OpenOffice.org Prozesse. Beachten Sie, dass direkt
    nach dem Booten OpenOffice.org Prozesse laufen können, auch ohne
    dass es dafür sichtbare Anzeichen gibt. Verwenden Sie den
    Taskmanager um sicherzustellen, dass keine “soffice.bin” Prozesse
    mehr laufen.
11. Führen Sie die Schritte aus, die zum Fehler geführt haben. Schreiben
    Sie detailliert auf
    1.  was Sie tun
    2.  welche Befehle Sie eingeben
    3.  welche Buttons oder Dateien sie anklicken oder doppelklicken
    4.  was passiert
    5.  welche Meldungen erscheinen
    6.  in welchen Fenstern die Meldungen erscheinen
    7.  welche Reaktionen sie erwartet hätten

12. Falls möglich, machen sie Screenshots, die das unerwartete
    Verhalten zeigen.
13. Nach dem Auftreten des Fehlers beenden Sie zuerst alle Instanzen der
    WollMuxBar (falls vorhanden), dann beenden Sie alle Instanzen
    von OpenOffice.org. Nehmen Sie den Taskmanager zuhilfe um
    sicherzustellen, dass keine “soffice.bin” Prozesse mehr laufen.
14. Erstellen Sie unmittelbar nach dem Auftreten des Fehlers Kopien der
    wollmux.log und wollmux.conf aus dem Profilverzeichnis. Es ist sehr
    wichtig, dass Sie dies sofort nach dem Auftreten des Fehlers machen
    und insbesondere nicht mehrere Fehler produzieren bevor Sie die
    wollmux.log kopieren, da ansonsten aus der Datei evtl. nicht mehr
    klar hervorgeht, welche Meldungen zu Ihrem Fehler gehören.
15. Schicken Sie all diese Informationen an [den Verteiler des Office    Teams](Kontakt_TP_Client)
    -   Hängen Sie an die Mail die oben erstellten Kopien der
        wollmux.conf und der wollmux.log, sowie oben
        erwähnte Screenshots.

<Kategorie:Office_Endanwender_Handbuch>

<Category:AG-Office> <Category:Eierlegender_WollMux>
<Category:Handbuch_des_WollMux>
