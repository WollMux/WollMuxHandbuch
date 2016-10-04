### Preliminary notes on the file format

WollMux configuration files are simple text files whose content follows
the syntax described below. The filed have to be coded in Unicode format
UTF8 because otherwise, umlauts and other special characters are
garbled. Due to the fact that most text editors cannot automatically
detect UTF8 format and do not use the same character in the reading and
the save mode, we recommend that you always explicitly specify the
format when loading or saving. Text editors that do not permit this
should not be used to edit WollMux config files. It shouls also be noted
that “Unicode” is not hte same as “UTF8”. For example, Wordpad does not
use UTF8 format when “Unicode text document” is selected.

### Syntax

All configuration files in WollMux have a common syntax. The basic
structure is a hierarchy of keys and and values.

#### Keys

The syntax for keys follows the usual rules for identifiers, i.e.,
characters permitted are the letters a-z and A-Z as well as numbers and
the underscore key, whereas the first character cannot be a number. Keys
are lower and upper case-sensitive. “KEY” and “key” are two different
keys.

#### Values

At present, only strings are permitted as values. Strings are any
sequences of characters set in quotation marks "..." or apostrophes
'...'. The quotation marks/apostrophes that go together have to be
positioned on the same line. In order to embed quotation marks into a
string enclosed by quotation marks or apostrophes into a string enclosed
by apostrophes, the duplication used in BASIC and Pascal is used. The
following examples both are strings consisting of three characters with
a quotation mark in the middle:

`"X""Y"`

`'X"Y'`

The following examples are a string consisting of three characters with
an apostrophe in the middle:

`'X''Y'`

`"X'Y"`

##### Line breaks and special characters %

Line breaks within strings (i.e., closing quotation mark/apostrophe not
in the same line as opening one) are not permitted. Embedding line
breaks within values is possible with the special sequence "%n". To
embed the % character, it is doubled. Any unicode sign can be embedded
with the "%uABCD" syntax, whereas ABCD is the hex number of the unicode
of the character (always 4-digit).

#### Key-value pairs

Pairs consisting of a key followed by a value are basic constructs in
Wollmux config files, for example

`NAME "WollMux"`

#### Nesting

In order to be able to organise the data hierarchically, it can be in
nests. A nest begins with a key and is followed by the content
subordinate to this key in round brackets. Example:

```
GUI
(
  Dialoge
  (
    Dialog1(...)
    Dialog2(...)
    ...
  )
)
```

#### Groups

Groups are nests without a preceding key name. They serve to combine
data into one unit. Example:

`  ( TYPE "textbox" LABEL "Name" )`

`  ( TYPE "textbox" LABEL "First name" )`

`  ( TYPE "textbox" LABEL "title" )`

#### Lists

Lists are enumerations of values in round brackets. They can be named
(by a key in front of the brackets) or remain unnamed. Example:

`Forms of address ( "Mr", "Mrs", "Penguin")`

`( "This", "is", "an", "unnamed", "list" )`

#### Commentaries

Commentaries commence with a hash sign '\#' and go on until the end of
the line. Example:

```
# This is an example for the use of commentaries

NAME "WollMux"  # This sets the name of our application to "WollMux"

# Please remove commentary sign at the beginning of the following line on Halloween
# COLOUR SCHEME "SlimyGreen"
```

#### Whitespace

-   Whitespace signs (space character, tabulator, line break) are always
    ignored outside strings, for example

`NAME "WollMux"`

is the same as

`NAME`<BR>
`"WollMux"`

-   Commas ',' and semicolons ';' are always treated like whitespace
    outside strings, for example

`NAME,,,,,;;;;;;;"WollMux"`

is the same as

`NAME "WollMux"`

-   The use of commas, especially, only improves the readability in
    value lists.

#### Control commands

WollMux config files can contain control commands that are not part of
the configuration data but control the importing of the config file
iteself. Control commands begin with a percentage sign '%'. At present,
there is only the control command "%include" (see [further down](#include)).

#### %include

It often makes sense to distribute configuration files onto several
files and possibly to even store them in different locations. A typical
application would be the division into department-specific configuration
data that is stored on a central network drive and user-specific
configuration data that is stored on the user's drive. WollMux supports
this with an include mechanism.

##### Syntax

The %include control command is followed by a string. The string is
interpreted as a URL and the content of the file determined by this URL
is inserted into the configuration file in the location of the %include
control command. It has to be noted that it is *not* permitted to
distribute sets of syntactic elements across several files. The
following, for example, is *not* possible:

```
# ERROR! Key-value pair must not be distributed across multiple files
KEY %include "value.txt"  

`# ERROR! `
```

Zu Verschachtelung gehörige schließende Klammer darf nicht in anderer
Datei stehen

```
SCHLUESSEL(
  ...
%include "klammer_zu.txt"
```

Es ist jedoch z.B. erlaubt, Inhalte von Verschachtelungen über %include
einzufügen. Die generelle Regel ist

1.  Eine Config-Datei muss auch nach Entfernen aller %include
    Steuerbefehle (und der dazugehörigen URL-Strings) noch korrekt gemäß
    der [oben beschriebenen
    Syntax](Format_von_WollMux-Config-Dateien#Syntax "wikilink") sein.
2.  Eine via %include eingefügte Datei muss selbst eine syntaktisch
    korrekte Config-Datei sein.

##### URLs

Der %include-Befehl erlaubt alle Arten von URLs, sowohl relativ als auch
absolut. Unterstützt werden verschiedene Protokolle, insbesondere
“file:” und “http:”. Der Kontext für relative URLs ist die URL der
Datei, die den %include-Befehl enthält. Das bedeutet, dass
unvollständige Pfadangaben relativ zum Verzeichnis dieser Datei
aufgelöst werden. Die genaue Spezifikation der URL-Syntax ist zu finden
in [RFC 2396](http://www.ietf.org/rfc/rfc2396.txt). Da das Includen von
Dateien aus dem Dateisystem sicher den wichtigsten Anwendungsfall
darstellt und dabei auch häufig Fehler gemacht werden, sind im folgenden
einige Beispiele für korrekte und inkorrekte “file:” URLs.

-   %include "file://localhost/C:/includes/include.conf"

    :   KORREKT! Vollständige URL unter Angabe des Pseudo-Rechnernamens
        "//localhost"

<!-- -->

-   %include "file:///C:/includes/include.conf"

    :   KORREKT! Rechnername "//" bedeutet das selbe wie "//localhost"

<!-- -->

-   %include "file:/C:/includes/include.conf"

    :   KORREKT! Rechnername kann ganz weggelassen werden. Achtung! 2
        Slashes "//" fallen dann auch weg, weil sie zum
        Rechnernamen gehören. Ein Slash bleibt, da absolute Pfade immer
        mit einem Slash beginnen.

<!-- -->

-   %include "file://C:/includes/include.conf"

    :   FEHLER! Ein '/' zu wenig. "//C" würde als Angabe des
        Rechnernamens interpretiert. Dieser Fehler wird häufig gemacht,
        weil wir es von HTTP-URLs gewöhnt sind, die beiden Slashes
        zu tippen. Sie gehören jedoch *nicht* zum Protokollspezifizierer
        dazu, sondern leiten den Rechnernamen ein.

<!-- -->

-   %include "/C:/includes/include.conf"

    :   KORREKT! Wenn der folgende %include über das Datei-System
        gelesen wird, dann folgt das “file:” Protokoll aus dem Kontext
        und kann weggelassen werden.

<!-- -->

-   %include “C:/includes/include.conf”

    :   FEHLER! Absoluter Pfad muss mit '/' beginnen (auch
        unter Windows!)

<!-- -->

-   %include “include.conf”

    :   KORREKT! Unvollständiger Pfad wird im Kontext der includenden
        Datei interpretiert. Die Datei “include.conf” wird also aus dem
        selben Verzeichnis gelesen wie die Datei, die den
        %include-Befehl enthält.

<!-- -->

-   %include "file:include.conf"

    :   KORREKT! Auch bei relativen Pfaden ist die Angabe des
        Protokolls erlaubt.

<!-- -->

-   %include "file://include.conf"

    :   FEHLER! Wie oben schon erwähnt leitet '//' den Rechnernamen ein,
        hat hier also nichts zu suchen (außer, wir würden tatsächlich
        auf den Rechner “include.conf” zugreifen wollen).

<!-- -->

-   %include "../../include.conf"

    :   KORREKT! Relative Pfadangaben können mit ".." auf höhere
        Verzeichnisebenen zugreifen. Ausgangspunkt ist dabei wie immer
        das Verzeichnis in dem sich die Datei befindet, die den
        %include-Befehl enthält.

<!-- -->

-   %include "file:../../include.conf"

    :   KORREKT! Auch hier ist das Protokoll erlaubt. Man beachte, dass
        es NICHT "file://.." lautet!

<Kategorie:Office_Admin_Handbuch>

<Category:AG-Office> <Category:Eierlegender_WollMux>
<Category:Handbuch_des_WollMux> [Category:WollMux
English](Category:WollMux_English "wikilink")
