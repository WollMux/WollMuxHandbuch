WollMux Code Repositories
=========================

Wer sich für den Quelltext des WollMux interessiert oder den WollMux
selber kompilieren will (um z.B. derzeit in Entwicklung befindliche
Features des WollMux auszuprobieren), findet die aktuellste Version des
Source Codes stets in unserem öffentlichen Git Repository.

Das Repository wird derzeit bei GitHub gehostet - die URL des
zugehörigen WollMux-Projekts ist
**<http://github.com/WollMux/WollMux>**.
Über die Website des Projekts kann sehr einfach im Source Code gebrowst
werden und es sind übersichtlich alle Commit Logs und die damit
verbundenen Quelltextänderungen zu sehen.

Checkout des Quelltextes aus dem Repository
-------------------------------------------

Es gibt verschiedene Tools, mit denen Sie den Quelltext aus unserem Git
Repository auschecken können. Diese Anleitung beschränkt sich auf das
einfache Kommandozeilentool “git”. Die folgenden Kommandos sollten
sowohl unter Linux als auch unter Windows funktionieren. Voraussetzung
ist natürlich, dass Git installiert und im Pfad ist (mehr zu Git
erfahren Sie unter "[Git - Was ist das?](#git---was-ist-das "wikilink")").

### WollMux auschecken

Wechseln Sie in der Kommandozeile zunächst in den Dateiordner, in den
Sie den WollMux-Quelltext auschecken wollen. Dann rufen Sie folgendes
Kommando auf:

    git clone https://github.com/WollMux/WollMux

Durch dieses Kommando wird ein neuer Unterordner namens “WollMux”
angelegt, in dem sich nach erfolgreichen Ausführen des Kommandos jetzt
ein sogenannter Clone des WollMux-Repositories inkl. des aktuellen
Stands des WollMux-Quelltextes befindet.

Mehr ist im Prinzip nicht zu tun. Um den so ausgecheckten Quelltext auf
den aktuellen Stand zu bringen, wechseln Sie einfach in den
“WollMux”-Ordner und führen den folgenden Kommandozeilenbefehl aus:

`git pull`

Git - Was ist das?
------------------

Als Versionsverwaltungssystem kommt beim WollMux-Projekt Git zum
Einsatz. Für diejenigen, die nur CVS oder Subversion (SVN) kennen,
enthält Git einige Fallstricke, da es sich um ein verteiltes
Versionsverwaltungssystem handelt. Wer hingegen mit Mercurial vertraut
ist, dürfte mit dem Prinzip von Git wenig Schwierigkeiten haben. Wir
können an dieser Stelle allerdings keine umfassene Einführung in die
Verwendung von Git geben, sondern verweisen an dieser Stelle einfach auf
das umfangreiche Buch [Pro git](http://git-scm.com/book/de), das alles
enthält, was man zu Git wissen muss und komplett online lesbar ist.

Um einfach nur den WollMux Source Code auszuchecken langt es allerdings,
wenn Sie es schaffen Git auf ihrem System zu installieren und dann die
Anweisungen im Unterabschnitt "[Checkout des Quelltext aus dem
Repository](#checkout-des-quelltextes-aus-dem-repository "wikilink")"
befolgen. Eine Anleitung wie Sie Git bei sich installieren, finden Sie
ebenfalls unter
[git-scm.com](http://git-scm.com/book/de/v1/Los-geht%E2%80%99s-Git-installieren).

WollMux selber kompilieren
--------------------------

Wenn Sie den Quelltext von WollMux ausgecheckt haben, können Sie
theoretisch den WollMux selber bei sich bauen.
Weitere Informationen hierzu finden Sie unter "[WollMux
kompilieren](WollMux_kompilieren.md "wikilink")" (bei Problemen einfach auf
der [Mailingliste](Mailinglisten.md "wikilink") fragen).

> **Hint** Um alle Features des WollMux verwenden zu können, wird
> zusätzlich eine WollMux-Konfiguration benötigt. Eine
> Beispielkonfiguration befindet sich z.B. in unserem
> [Download-Bereich](Download.md "wikilink").

<Category:Eierlegender_WollMux> <Category:Handbuch_des_WollMux>
