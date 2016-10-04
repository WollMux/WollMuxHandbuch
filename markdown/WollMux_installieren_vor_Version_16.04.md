Linux
-----

### Manuelle Installation unter Linux

#### Installation der OpenOffice.org-/LibreOffice-Extension

-   [Herunterladen der Datei WollMux.oxt](WollMux_downloaden.md "wikilink")
    in der gewünschten Version in ein beliebiges Verzeichnis *&lt;Verz&gt;*.
-   Schliessen aller offenen OOo-/LO-Fenster, sowie der
    [WollMuxBar](WollMuxBar.md "wikilink").

> **WARNING** Bitte schauen Sie im Taskmanager nach, ob auch wirklich alle
Prozesse mit dem Namen “soffice.bin” beendet sind. Falls nicht,
schließen Sie bitte alle noch laufenden soffice.bin-Prozesse über den
Taskmanager.

-   Stellen Sie bitte sicher, dass die Java-Integration für LibreOffice
    installiert ist. Unter Debian, Ubuntu und Abkömmlingen findet sich
    diese im Paket **libreoffice-java-common**.
-   Root-Shell öffnen (Befehl `sudo -s -H` in der Konsole)
-   Setzen der richtigen *umask*, damit normalen Benutzern keine Lese-
    und X-Rechte entzogen werden:

    `umask 022`

-   Deinstallation der alten OOo-Extension mit folgendem Befehl:

    `unopkg remove WollMux.oxt --shared`

-   Installation der neuen OOo-Extension:

`unopkg add <Verz>/WollMux.oxt --shared`

Für eine Installation auf Benutzerebene kann die Option "--shared"
weggelassen werden, allerdings wird dies nicht empfohlen. Der
gleichzeitige Betrieb von WollMux-Installationen auf Rechnerebene und
WollMux-Installationen auf Benutzerebene kann zu Problemen führen und
wird deshalb vom WollMux nicht unterstützt.

#### Installation der WollMuxBar

-   [Herunterladen der Datei *WollMuxBar.jar*](WollMux_downloaden.md "wikilink"); die Datei
    speichern im Verzeichnis */usr/share/java*
-   [Herunterladen der Datei *wollmuxbar*](WollMux_downloaden.md "wikilink"); die Datei speichern im
    Verzeichnis */usr/bin*

Die WollMuxBar lässt sich anschließend einfach über die Konsole mit dem
Befehl *wollmuxbar* bzw. (mit vollständigem Pfad) */usr/bin/wollmuxbar*
aufrufen. Sie können auch eine entsprechende Verknüpfung auf dem Desktop
anlegen.

> **INFO** Falls Sie [LibreOffice](http://www.libreoffice.org) verwenden, beachten
Sie bitte die **[Hinweise für den Start der WollMuxBar mit LibreOffice](WollMuxBar.md#libroffice "wikilink")**.

Windows
-------

### EXE-Installer für Windows

Für Windows steht ein EXE-Installer (*wollmux-&lt;VERSION&gt;-installer.exe*)
zur Verfügung, der den [WollMux](WollMux.md "wikilink") sowie die
[WollMuxBar](WollMuxBar.md "wikilink") auf Ihrem System einrichtet und
optional eine Verknüpfung auf dem Desktop und im Startmenü anlegt.

**Hinweise:**

-   Um die Installation mit dem EXE-Installer durchführen zu können,
    benötigen Sie Administrator-Rechte.
-   Der EXE-Installer versucht vor der Installation der
    WollMux-Extension automatisch eventuell noch offene
    OpenOffice.org-Fenster zu schließen.
-   Die Installation mit dem EXE-Installer findet immer auf Rechnerebene
    statt, d.h. Desktop- und Startmenü-Verknüpfungen sowie
    Uninstaller-Einträge werden für alle Benutzer des Rechners angelegt
    und die OpenOffice.org-Extension wird so installiert als hätten Sie
    auf der Kommandozeile *unopkg add --shared* ausgeführt.
-   OpenOffice.org sowie Java müssen auf Ihrem System installiert sein
    bevor Sie den Installer ausführen.

#### Unbeaufsichtigte Installation

Mit dem EXE-Installer lässt sich auch eine sog. unbeaufsichtigte
Installation (englisch: *unattended installation*) durchführen, d.h. es
ist während der Installation keine Benutzerinteraktion nötig und es wird
keine grafische Oberfläche angezeigt.Um den EXE-Installer in diesem
Modus auszuführen, müssen Sie ihn über die Kommandozeile mit der Option
**--SILENT** oder **/S** starten (Der Uninstaller `wollmux_unistall.exe`
kennt nur die Variante **/S**):

`wollmux-<VERSION>-installer.exe --SILENT`

> **INFO** Wenn der Installer mit der Option *--SILENT* bzw. */S*
ausgeführt wird, erhalten Sie keinerlei Rückmeldung, ob die Installation
erfolgreich war oder nicht.

Der EXE-Installer installiert WollMux + WollMuxBar standardmäßig in den
Ordner *C:\\Programme\\wollmux* und richtet Verknüpfungen auf Desktop
und im Startmenü ein. Wenn Sie dieses Verhalten für die unbeaufsichtigte
Installation ändern wollen, stehen Ihnen folgende Kommandozeilenoptionen
zur Verfügung (Groß-/Kleinschreibung sowie Reihenfolge der Optionen ist
beliebig):

- **--INSTDIR="&lt;Installationspfad&gt;"** : Legt den Ordner fest, in den der WollMux installiert werden soll.
- **--NOSTARTMENU** : Gibt an, dass der Installer keine Verknüpfungen im Startmenü anlegen soll.
- **--NODESKTOP** : Gibt an, dass der Installer keine Verknüfung auf dem Desktop anlegen soll.
- **--LOCAL** : Gibt an, dass der Installer eine Installation auf Benutzerebene und nicht auf Rechnerebene durchführen soll.

> **WARNING** Im Allgemeinen wird von der Verwendung dieser Option abgeraten! Der bei der Installation generierte Uninstaller unterstützt diese Option nicht und die Deinstallation über den Uninstaller wird daher nicht funktionieren. Zudem kann ein Vermischen von WollMux-Installationen auf Rechnerebene und Benutzerebene zu Problemen führen und wird vom WollMux nicht unterstützt. Wenn Sie diese Option verwenden, kann der Installer auch ohne Administratorrechte ausgeführt werden.

- **--NOKILL** : Diese Kommandozeilenoption, die ebenfalls für den Uninstaller zur Verfügung steht, gibt an, dass vor dem Ausführen der Installation/Deinstallation nicht versucht werden soll, vorhandene soffice-Prozesse zu beenden. Ohne diese Option versucht der Installer mittels eine Java-Tools soffice-Prozesse sauber zu beenden. In bestimmten Szenarien kann dies allerdings zu Problemen führen (z.B. wenn die [WollMuxBar](WollMuxBar.md "wikilink") mit der Quickstarter-Option gestartet wurde), so dass der Installer die Installation nicht sauber durchführen kann. In diesem Fall verwenden Sie bitte die NOKILL-Option und stellen Sie manuell sicher, dass vor Ausführen des Installers keine soffice-Prozesse mehr laufen.

> **WARNING** Wenn Sie den Installer mit LibreOffice verwenden wollen, muss die NOKILL-Option zwangsläufig gesetzt sein!

- **--LIBRE** : Ist diese Option nicht angegeben, sucht der Installer zunächst nach einer Installation von OpenOffice.org. Nur wenn er keine OpenOffice.org-Installation findet, sucht er dann nach einer LibreOffice-Installation und verwendet diese. Wollen Sie das Verwenden einer eventuell vorhandenen OpenOffice.org-Installation überspringen und ausdrücklich für LibreOffice installieren, so können Sie die --LIBRE-Option dafür verwenden.

> **WARNING** Wenn Sie den Installer mit LibreOffice verwenden wollen, muss die NOKILL-Option zwangsläufig gesetzt sein! Beachten Sie außerdem die [Hinweise für den Start der WollMuxBar mit LibreOffice](WollMuxBar#libreoffice "wikilink").*

**Beispiel:**

Der WollMux soll unbeaufsichtigt im Ordner
*E:\\Beispiel\\WollMux-Installation* installiert werden und es sollen
keine Verknüpfungen im Startmenü (aber eine Verknüpfung auf dem Desktop)
erstellt werden:

`wollmux-<VERSION>-installer.exe --SILENT --INSTDIR="E:\Beispiel\WollMux-Installation" --NOSTARTMENU`

### Manuelle Installation unter Windows

#### Installation der OpenOffice.org-Extension

Das UNO-Paket WollMux.oxt kann sowohl für einen einzelnen Benutzer als
auch für alle Benutzer eines Rechners installiert werden. Für die
**Installation auf Benutzerebene** sind folgende Schritte notwendig:

-   Vorraussetzung: OpenOffice.org wurde vollständig installiert und
    mindestens ein mal gestartet, so dass das benutzerspezifische
    initiale Setup bereits durchgeführt wurde.
-   [Herunterladen der Datei WollMux.oxt](WollMux_downloaden.md "wikilink")
    in der gewünschten Version in ein beliebiges Verzeichnis &lt;Verz&gt;.
-   Schliessen aller offenen OOo-Fenster, einschließlich dem
    Schnellstarter in der Taskleiste links neben der Uhr, sowie der
    [WollMuxBar](WollMuxBar.md "wikilink").

> **WARNING** Bitte schauen Sie im Taskmanager nach, ob auch wirklich alle
Prozesse mit dem Namen “soffice.bin” beendet sind. Falls nicht,
schließen Sie bitte alle noch laufenden soffice.bin-Prozesse über den
Taskmanager.**

-   Installation des UNO-Pakets mit dem folgenden Kommando und den auf
    Ihre Umgebung angepassten Werten:
    -   &lt;OOo-Path&gt;: Beschreibt das Verzeichnis, in dem sich Ihre
        OOo-Installation befindet. z.B. “C:\\Programme\\OpenOffice.org
        3”.
    -   &lt;Verz&gt;: Beschreibt das Verzeichnis, in dem Sie das
        heruntergeladene WollMux-Paket abgelegt hatten.

`"<OOo-Path>\program\unopkg" add "<Verz>\WollMux.oxt"`

Für die **Installation auf Rechnerebene** verwenden Sie bitte zusätzlich
die Kommandozeilenoption "--shared". Das zugehörige Kommando sieht wie
folgt aus und muss mit Administrator-Rechten ausgeführt werden:

`"<OOo-Path>\program\unopkg" add "<Verz>\WollMux.oxt" --shared`

Falls Sie das WollMux.oxt auf Rechnerebene deinstallieren wollen, geben
Sie bitte folgenden Befehl ein - nur mit Administratorrechten möglich:

`"<OOo-Path>\program\unopkg" remove WollMux.oxt --shared`

#### Installation der WollMuxBar

-   Erzeugen eines Ordners, in dem die WollMuxBar installiert werden
    soll, z.B. *C:\\Programme\\wollmux*
-   Die Dateien *WollMuxBar.jar* und *wollmuxbar.exe*
    [downloaden](WollMux_downloaden.md "wikilink") und in den soeben
    erzeugten Ordner kopieren.

Die WollMuxBar lässt sich anschließend einfach über das Ausführen der
Datei *wollmuxbar.exe* starten (Voraussetzung ist ein installiertes Java
auf dem System). Sie können auch eine Verknüpfung zur *wollmuxbar.exe*
auf dem Desktop oder dem Startmenü anlegen.

#### Installation unter LibreOffice Portable

Siehe
[WollMux\_mit\_LibreOffice\_Portable](WollMux_mit_LibreOffice_Portable.md "wikilink")

> **INFO** Falls Sie [LibreOffice](http://www.libreoffice.org) verwenden, beachten
Sie bitte die **[Hinweise für den Start der WollMuxBar mit LibreOffice](WollMuxBar.md#libreoffice "wikilink")**.
