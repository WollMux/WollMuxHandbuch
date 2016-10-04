Mögliche Ursache
----------------

Wenn plötzlich der Komfortdruck nicht mehr funktioniert, kann die
Ursache in einer Verkettung verschiedener Begebenheiten liegen.

Im vorliegenden Fall entstand dies durch:

-   Einsatz eines WollMux &gt; 3.8
-   ErrorDocument-Directive für “404-file not found” in der httpd.conf
    des Webservers auf dem sich die WollMux-Konfiguration befindet
-   Verweis der Direktive auf eine Seite im Redaktionssystem
    des Intranetservers.

Symptome und Gründe
--------------------

In der wollmux.log erscheinen folgende Fehlermeldungen:

    2009-07-23 10:05 ERROR(WollMuxFiles:856): Fehler beim Parsen der Druckfunktion "SachleitendeVerfuegung"
    2009-07-23 10:05 ERROR(WollMuxFiles:856): de.muenchen.allg.itd51.wollmux.ConfigurationErrorException: Skript "java:de.muenchen.allg.itd51.wollmux.func.StandardPrint.sachleitendeVerfuegung" nicht verfügbar
    2009-07-23 10:05 ERROR(WollMuxFiles:856): de.muenchen.allg.itd51.wollmux.func.ExternalFunction.&lt;init&gt;(ExternalFunction.java:150)
    2009-07-23 10:05 ERROR(WollMuxFiles:856): de.muenchen.allg.itd51.wollmux.func.PrintFunction.&lt;init&gt;(PrintFunction.java:66)
    2009-07-23 10:05 ERROR(WollMuxFiles:856): de.muenchen.allg.itd51.wollmux.WollMuxFiles.parsePrintFunctions(WollMuxFiles.java:850)
    2009-07-23 10:05 ERROR(WollMuxFiles:856): de.muenchen.allg.itd51.wollmux.WollMuxSingleton.&lt;init&gt;(WollMuxSingleton.java:234)
    2009-07-23 10:05 ERROR(WollMuxFiles:856): de.muenchen.allg.itd51.wollmux.WollMuxSingleton.initialize(WollMuxSingleton.java:325)
    2009-07-23 10:05 ERROR(WollMuxFiles:856): de.muenchen.allg.itd51.wollmux.comp.WollMux.&lt;init&gt;(WollMux.java:89)
    2009-07-23 10:05 ERROR(WollMuxFiles:856): sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
    2009-07-23 10:05 ERROR(WollMuxFiles:856): sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:39)
    2009-07-23 10:05 ERROR(WollMuxFiles:856): sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:27)
    2009-07-23 10:05 ERROR(WollMuxFiles:856): java.lang.reflect.Constructor.newInstance(Constructor.java:494)
    2009-07-23 10:05 ERROR(WollMuxFiles:856): com.sun.star.lib.uno.helper.Factory.instantiate(Factory.java:172)
    2009-07-23 10:05 ERROR(WollMuxFiles:856): com.sun.star.lib.uno.helper.Factory.createInstanceWithContext(Factory.java:205)
    2009-07-23 10:05 ERROR(WollMuxFiles:856): -------- CAUSED BY ------
    2009-07-23 10:05 ERROR(WollMuxFiles:856): java.lang.ClassFormatError: Incompatible magic value 1008813135 in class file de/muenchen/allg/itd51/wollmux/func/StandardPrint

Der Grund liegt also in der Java-Fehlermeldung:
**java.lang.ClassFormatError: Incompatible magic value**

Der Grund ist folgender
(siehe[1](http://forums.sun.com/thread.jspa?threadID=640927) ):

    After further investigation I've discovered that in my case the inexistent remote resource is the "javax.xml.parsers.DocumentBuilderFactory"
     that (as reported on official documentation: http://java.sun.com/j2se/1.5.0/docs/api/javax/xml/parsers/DocumentBuilderFactory.html)
     before using the platform default DocumentBuilderFactory instance, tries to look for a classname in the file META-INF/services/javax.xml.parsers.
    DocumentBuilderFactory in jars available to the runtime.
    If the server redirects 404 errors to a custom HTML page,


     the applet loads the HTML code instead of platform default DocumentBuilderFactory instance.


     This obviously generates the error.


Dies tritt nicht unbedingt bei jedem Webserver mit einer ErrorDocument
404-Direktive auf.

Im POR ist das lediglich aufgetreten, weil eben die Direktive auf den
städtischen Intranetserver verwiesen hat.

Lösung
------

unter Berücksichtigung des Lösungshinweises im Internet
[Internet](http://forums.sun.com/thread.jspa?threadID=640927)

-   .htaccess-Datei im Root-Verzeichnis der WollMux-Konfiguration mit
    eigener ErrorDocument 404-Direktive:

    `ErrorDocument 404 http://www.por.muenchen.de/fehler404.php`

    Die fehler404.php, auf die verwiesen wird, setzt speziell für Java
    den Header :

    ``` php
    <?php

    if ( isset($_SERVER['HTTP_USER_AGENT']) AND (!(strpos($_SERVER['HTTP_USER_AGENT'],"Java")===false))) {
        // returns 404 error because a Java user agent were recognized
        header("HTTP/1.0 404 Not Found");
    } else {
        echo "Seite nicht gefunden";
    }

    >
    ```


-   Voraussetzung, dass das mit der .htaccess funktioniert ist, dass in
    der httpd.conf für das Verzeichnis nicht AllowOverride None gesetzt
    ist, also .htaccess-Direktiven überhaupt erlaubt sind:

z.B.:
```
<directory "/web/htdocs/wollmux">
    Options indexes FollowSymLinks
    IndexOptions FancyIndexing FoldersFirst IconsAreLinks NameWidth=* ScanHTMLTitles SuppressSize
    IndexIgnore HEADER.html README.html
    AllowOverride All
</directory>
```

<Category:Wollmuxpraxis>
