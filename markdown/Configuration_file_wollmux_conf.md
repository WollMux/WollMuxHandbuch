[WollMux](Eierlegender_WollMux.md "wikilink") has, at least in
concept, a single configuration file, referred to throughout as
*wollmux.conf*. In practice, however, the configuration is spread out
over multiple files by using the [%include mechanism](Format_von_WollMux-Config-Dateien.md#include "wikilink").
(See [Formatting WollMux config files](Formatting_WollMux_config_files.md "wikilink")). WollMux looks for
*wollmux.conf* in the following locations and in the following order:

**Under Windows:**

1.  using the enviroment variable %WOLLMUX\_CONF\_PATH% (path including
    filename, for example: *C:\\Program Files\\WollMux\\wollmux.conf*)
2.  via the path (incl. filename) set in the registry key "ConfigPath"
    under *HKEY\_CURRENT\_USER\\Software\\WollMux*
3.  *<Profile_Folder>/.wollmux/wollmux.conf*, where <Profile_Folder>
    under Windows 7 is the folder "C:\\Users\\<UserName>".
4.  via the path (incl. filename) set in the registry key "ConfigPath"
    under *HKEY\_LOCAL\_MACHINE\\Software\\WollMux*
5.  *C:\\Program Files\\WollMux\\wollmux.conf* (This is the default
    installation directory. WollMux will also find *wollmux.conf* if you
    use the EXE configuration installer to install to a different
    directory, for example "C:\\WollMux".)

**Under Linux:**

1.  using the enviroment variable %WOLLMUX\_CONF\_PATH% (path including
    filename, for example: */etc/wollmux/wollmux.conf*)
2.  *`$HOME`/.wollmux/wollmux.conf*
3.  */etc/wollmux/wollmux.conf*

Once WollMux finds a configuration file, it stops looking in the
remaining locations. So if (under Linux) a file
*`$HOME`/.wollmux/wollmux.conf* exists, the existence of another
configuration file */etc/wollmux/wollmux.conf* is irrelevant and ignored
by WollMux.

Please note: Localization files change. Labels in dialogs may vary from
what you see here. You are free to change them yourself in the
localization files provided.

When editing wollmux.conf, **use the correct upper/lower case**! In
particular, please use all keys (and attributes) exactly as they're
written here.

The DEFAULT\_CONTEXT variable
=============================

The variable DEFAULT\_CONTEXT describes the path to the folder in [URL notation](Format_von_WollMux-Config-Dateien.md#urls "wikilink"), in which
central WollMux data (i.e. text fragments, user data) is stored. In
different places throughout the wollmux.conf structure, DEFAULT\_CONTEXT
is used as the basis for resolving relative URLs. This is noted in the
corresponding places. The syntax for setting DEFAULT\_CONTEXT is as
follows:

`DEFAULT_CONTEXT "<url>"`

Examples:

```
DEFAULT_CONTEXT "[file:///L:/WollMuxData](file:///L:/WollMuxData)" # WollMux data is stored in the central location L:/WollMuxData.
Under Windows 7, the first line may be something like 'DEFAULT_CONTEXT "[file:/C:/WollMux](file:/C:/WollMux)"'
or 'DEFAULT_CONTEXT "`[file:/C:/Program](file:/C:/Program) Files/WollMux"' if you use the EXE installer.
```

DEFAULT\_CONTEXT can be defined anywhere on the top level of the
configuration file outside of all sections. DEFAULT\_CONTEXT can be
redefined later elsewhere in the configuration file. The final
definition applies to the *entire* wollmux.conf structure.

If there is no DEFAULT\_CONTEXT entry, WollMux uses the folder where
wollmux.conf [was found](#top "wikilink") to determine DEFAULT\_CONTEXT.

If a relative path is entered for DEFAULT\_CONTEXT (i.e.
../networkdrive/fileserver/wollmux), this is interpreted as being
relative to the folder where wollmux.conf [was found](#top "wikilink")
by WollMux.

Integrating plugins to suit your workplace/CLASSPATH
====================================================

WollMux lets you integrate custom plugins suitable for your department.
For example, you might transform values from a data source, or make it
easier for users to print. Integrating external functions like these is
done via [EXTERN basic functions](#extern-url--params-- "wikilink")
. This can be determined globally in the sections [Print
functions](Konfigurationsdatei_wollmux.conf#Druckfunktionen "wikilink")
und [Functions](#functions "wikilink"),
or as part of a template itself. See the [corresponding documentation for FormularMax 4000](FormularMax_4000#Referatsspezifische_Plugins "wikilink") for more
information.

The actual program code for an external function must be realized as a
static method in a class of your choice. In order for WollMux to find
your plugin's class, either the path to the folder containing it or the
path to the JAR file itself must appear in the CLASSPATH directive. The
following are permissible CLASSPATH entries (under Linux):

```
CLASSPATH( "file:///usr/share/wollmux/" "http://foo.bar.muenchen.de/functions.jar")
CLASSPATH "file:///usr/share/wollmux/"
```

Please note:

-   CLASSPATH entries must appear at the uppermost nesting level
    of wollmux.conf.
-   The values entered must be URLs.
-   Do *not* enter the name of the folder containing the .class file,
    but rather the topmost folder of the package hierarchy. The .class
    file itself must be located in the sub-folder belonging to
    your package. Example: The
    function de.muenchen.sozref.Druck.comfortPrint() is located in the
    .class file Print.class. This file is in the
    folder /usr/share/wollmux/de/muenchen/sozref/. This means the proper
    CLASSPATH entry for your function is "`<file:///usr/share/wollmux/>`".
-   Relative URLs are resolved relative to DEFAULT\_CONTEXT.

Logging and Debugging
=====================

WollMux appends its messages to *\$HOME/.wollmux/wollmux.log*. This file
is automatically generated the first time WollMux issues a message. In
some situations WollMux may issue messages that don't need to be logged.
Using LOGGING\_MODE you can control the level of detail that WollMux
gives in its log messages. The log file is never deleted automatically.
In standard mode, WollMux only logs messages involving critical failure
or informative messages. This reduces the tendency of the log file to
grow unnecessarily.

LOGGING\_MODE
-------------

**Syntax**

`LOGGING_MODE "<modes>"`

**Example**

```
LOGGING_MODE "ERROR"
or
LOGGING_MODE "DEBUG"
```

**Description**: Controls the level of detail of **output from WollMux (and the WollMuxBar) appended to wollmux.log**.

WollMux recognizes the following modes:

<table>
<thead>
<tr class="header">
<th><p><mode></p></th>
<th><p>Description</p></th>
<th><p>Debug mode</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>NONE</p></td>
<td><p>In Logging Mode NONE no output is logged.</p></td>
<td><p>No</p></td>
</tr>
<tr class="even">
<td><p>ERROR</p></td>
<td><p>The Logging Mode ERROR only logs errors encountered while running WollMux. These include messages about</p>
<ul>
<li>errors in the configuration file,</li>
<li>errors in templates,</li>
<li>errors in accessing configured databases,</li>
<li>WollMux internal failures.</li>
</ul></td>
<td><p>No</p></td>
</tr>
<tr class="odd">
<td><p>LOG</p></td>
<td><p>In Logging Mode LOG WollMux records all messages that might be interesting or useful for daily use of Wollmux, while avoiding pointless metastasizing of the logfile. These include all error messages (as in Logging Mode ERROR) and additional important warnings and information about the running process. <strong>Logging Mode LOG is the standard setting</strong>, unless modified in wollmux.conf.</p></td>
<td><p>No</p></td>
</tr>
<tr class="even">
<td><p>DEBUG</p></td>
<td><p>Logging Mode DEBUG is used to augment the information given by LOG Mode, providing information about the status of program flow. These messages can ease the task of rooting out errors related to development and maintenance of configuration files, text fragments and templates, and to internal program development. Logging Mode DEBUG generates lots of messages, not all of which are necessary for daily use of WollMux. Overuse of Logging Mode DEBUG can cause the size of wollmux.log to explode unnecessarily, requiring manual deletion of the logfile. If Logging Mode DEBUG is set, you will definitely experience a reduction in WollMux's responsiveness!</p>
<p>Worth mentioning are the first three messages WollMux issues when starting in DEBUG mode, as in this example:</p>
<p><code>2006-07-13 11:14 DEBUG2(Logger:162): =========== Logger::init(): LoggingMode = 7 ==========</code><br />
<br />
<code>2006-07-13 11:14 DEBUG(WollMuxSingleton:146): StartupWollMux</code><br />
<br />
<code>2006-07-13 11:14 DEBUG(WollMuxSingleton:147): </code><strong><code>Build-Info:</code> <code>Paketversion:</code> <code>1.2.1,</code> <code>Revision:</code> <code>986</code></strong></p>
<p>They contain information about the current WollMux version, which you should always include in further inquiry about WollMux or when reporting problems.</p></td>
<td><p>Yes</p></td>
</tr>
<tr class="odd">
<td><p>ALL</p></td>
<td><p>Logging Mode ALL records each and every message WollMux generates. This mode records internal status information not generated by DEBUG, too detailed for normal debugging purposes and in general only suitable for use by developers. If you're simply looking for errors purely related to maintenance of configuration files, text fragments and templates, use of this mode is not recommended.</p></td>
<td><p>Yes</p></td>
</tr>
</tbody>
</table>

Debug Mode
----------

Besides the logging mode, which determines what messages are written to
wollmux.log, there exists also a mode of operation for WollMux that
makes it easier for template creators, sysadmins and developers to find
errors: Debug Mode. Debug Mode is automatically started if LOGGING\_MODE
"DEBUG" or "ALL" is set (see the table above).

In Debug Mode, WollMux behaves differently in the following regard than
when Debug Mode is not set:

-   When opening a template, WollMux carries out every command the
    template contains. In normal use, once all commands in a template
    have been carried out, the bookmarks are removed from the
    generated document. In Debug Mode, these bookmarks remain intact.
    This makes it easier to find errors in document commands, obviating
    the need to open the corresponding template for editing.

The SENDER\_DISPLAYTEMPLATE
===========================

Syntax

`SENDER_DISPLAYTEMPLATE "<DisplayElements>"`

Example

```
SENDER_DISPLAYTEMPLATE "%{Nachname}, %{Vorname} (%{Rolle})"
or
SENDER_DISPLAYTEMPLATE "%{Vorname} %{Nachname} (Mailadresse: %{Mail})"
```

*Note: the values above are for the German version of WollMux.*

Setting SENDER\_DISPLAYTEMPLATE values controls which entries from the
Personal Sender List (or PAL, from the German "persönliche
Absenderliste") are to be displayed (internally as well, via the
XPALProvider-Interface, see [WollMux Interface Programming for Experts: Embedding a SenderBox (German)](Schnittstellen_des_WollMux_für_Experten#Einbinden_einer_SenderBox "wikilink")).
Along with static text, the display template can contain placeholders of
the form `%{ColumnName}`, which will be replaced by the respective data
record in that column of the corresponding database.

Adjustments to SENDER\_DISPLAYTEMPLATE have notable effects on the
display of the Sender List in [Menu Elements](#Menue-Elemente "wikilink") of type "senderbox" in the
WollMuxBar. Such adjustments, however, have no effect at all on the
dialog "[Manage Personal Sender List](#Pers.C3.B6nliche_Absenderliste_Verwalten "wikilink")" or the
dialog "[Select Sender](Konfigurationsdatei_wollmux.conf#Absender_Ausw.C3.A4hlen "wikilink")".
Display of those elements, i.e. of type "listbox" with ID "suchergebnis"
(search result) or "pal" (personal sender list), is controlled via the
DISPLAY attribute. Please see DISPLAY section for more information.

PERSISTENT\_DATA\_MODE
======================

From WollMux 11.9 on the global attribute PERSISTENT\_DATA\_MODE is
evaluated.

Syntax

`PERSISTENT_DATA_MODE "<mode>"`

**Example**

```
PERSISTENT_DATA_MODE "transition"
or
PERSISTENT_DATA_MODE "rdfReadLegacy"
```

For a number of reasons Wollmux stores certain information about
internal conditions (metadata)in the document itself. By setting
PERSISTENT\_DATA\_MODE you can control how and where WollMux stores this
data. The following values are available:

<table>
<thead>
<tr class="header">
<th><p><mode></p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>annotation<br />
<em>(deprecated)</em></p></td>
<td><p>In &quot;annotation&quot; mode (as was standard in all WollMux versions prior to 11.9) metadata is stored in the document as hidden annotations. This mechanism has proven in the past to be error-prone, as annotations (or &quot;comments&quot;, from OpenOffice.org 3.2.1 on) were not intended for metadata storage. Starting with OpenOffice.org 3.0 the user experience with annotations/comments was completely reworked and simplified, with the result that metadata storage in comments had increasingly objectionable effects for software users. For example, WollMux metadata was exposed when this was not desired.</p>
<p><strong>Use of this mode is strongly discouraged</strong>. Its use should probably be restricted to isolated cases where reproducing errors in the behavior of WollMux versions older than 11.9 is necessary.</p></td>
</tr>
<tr class="even">
<td><p>rdf</p></td>
<td><p>In &quot;rdf&quot; mode metadata are stored in a unique XML file named &quot;wollmux.rdf&quot; archived in the document's ODF packet. This mode ensures that WollMux metadata and the actual document itself are strictly separated and preventing the possibility of objectionable effects. Since RDF mode explicitly uses a <a href="http://wiki.services.openoffice.org/wiki/Documentation/DevGuide/OfficeDev/RDF_metadata_UNO-Schnittstelle_für_Metadaten" title="wikilink">UNO Interface for RDF Metadata</a>, we can assume that &quot;rdf&quot; mode will remain stable and reliable over the long term.</p>
<p>From a conceptual perspective, &quot;rdf&quot; mode is the cleanes way to store WollMux metadata. In this mode metadata are only written to the XML file, and only read from there. Practically speaking, this mode is unsuitable for WollMux documents still in circulation that were created in &quot;annotation&quot; mode, i.e. with older WollMux versions.</p>
<p><strong>Use of this mode is discouraged if your document archive either contains documents created with WollMux versions older than 11.9, or if there is exchange of data with such documents.</strong> The mode is suitable and recommended for any enterprise or community planning a new WollMux installation, one with no WollMux documents yet in use.</p></td>
</tr>
<tr class="odd">
<td><p>transition</p></td>
<td><p>In &quot;transition&quot; mode, metada is stored both as in &quot;annotation&quot; mode and as in &quot;rdf&quot; mode. When reading metadata, the values contained in the annotations/comments take priority. This ensures problem-free backward compatibility in &quot;mixed-moded&quot; installations, i.e. with newer and older versions of WollMux in use.</p>
<p><strong>This mode makes it possible in the short term to convert the metadata of your document collection to &quot;rdf&quot; mode data, without jeopardizing &quot;mixed-mode&quot; installations, i.e. those with &quot;annotation&quot; mode documents.</strong></p></td>
</tr>
<tr class="even">
<td><p>rdfReadLegacy</p></td>
<td><p>In &quot;rdfReadLegacy&quot; mode metadata is only stored as in &quot;rdf&quot; mode. For backward compatibility, &quot;annotation&quot; mode metadata is read with priority, but thereafter immediately deleted and replaced with corresponding RDF data entries.</p>
<p><strong>This mode is suitable for long-term adoption</strong> by all enterprises or communities that have documents in circulation using &quot;annotation&quot; metadata, but have since demobilized older, organization-level versions of WollMux that use &quot;annotation&quot; mode.'''</p></td>
</tr>
<tr class="odd">
</tr>
</tbody>
</table>

If no setting is present for PERSISTENT\_DATA\_MODE the following
applies:

-   For all versions &lt; 11.9 "annotation" mode is implicitly set.
-   From WollMux 11.9 on, "transition" mode is the preset parameter.

Further, the settings **"rdf", "transition" and "rdfReadLegacy" are
supported only from OpenOffice.org 3.2.1 onward**. Installations of
WollMux with older versions of OpenOffice.org automatically switch to
"annotation" mode.

More information on WollMux metadata can be found at [WollMux Document
Commands](Dokumentkommandos_des_WollMux#WollMux-Metadaten_im_Dokument "wikilink").

The "OOoEinstellungen" section (or "%include" file called OooEinstellungen.conf)
================================================================================

For WollMux to function properly, certain configuration options have to
be set in OpenOffice. To achieve this, in "OOoEinstellungen.conf" you
can provide values for configuration settings, which will be set again
every time WollMux starts.

Here's an example from the file:

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

As shown in the example, the section contains a list of configuration
options and their values. Each element in the list is of the form

(NODE "<Path/NodeName>" PROP "<NameOfProperty>" TYPE "<DatatypeOfProperty>" VALUE "<ValueToSet>")`

**NODE**: Describes the path and node name where the config setting is in the OpenOffice.org configuration tree. (Remark: From a technical point of view this is the hierarchical name.)

**PROP**: Describes the property name, and therefore the setting to change.

**TYPE**: Describes the datatype for the VALUE of the property. The choice is: "string", "boolean", "integer" and "float".

**VALUE**: Describes the value for the TYPE. You'll get an error message in wollmux.log if the type doesn't match, and the setting won't be accomplished.

Within the wollmux.conf file you can define several "OooEinstellungen"
sections. All setting changes they contain will be applied in order. A
typical scenario is that centrally-determined defaults are set in
WollMux-Standard-Config, which can be modified if necessary at the
department level in referat.conf.

Determining NODE, PROP and TYPE
-------------------------------

If a configuration file (\*.xcu) is present, you can derive these names
from the content of that file. For example:

```
<?xml version="1.0" encoding="UTF-8"?>
<oor:component-data xmlns:oor="http://openoffice.org/2001/registry]" xmlns:xs="http://www.w3.org/2001/XMLSchema"
oor:name="Inet" oor:package="org.openoffice">
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

The general rule then, is:

-   NODE = "/" + <oor:component-data/oor:package> + "." +
    <oor:component-data/oor:name> + "/" + <node/oor:name> \[ + "/" +
    <node/oor:name> \](for each subnode)
-   PROP = <prop/oor:name>
-   TYPE = Derived from <prop/oor:type> (for example, xs:int
    &rarr; integer)

Look And Feel Configuration
===========================

From WollMux 11.9 forward the global attribute LAF\_CLASS\_NAME is
evaluated.

Syntax

`LAF_CLASS_NAME "<package.class>"`

Example

`LAF_CLASS_NAME "com.sun.java.swing.plaf.nimbus.NimbusLookAndFeel"`

By setting LAF\_CLASS\_NAME you can give the UI of all WollMux dialogs
the same "look and feel". This option is particularly interesting for
applications with an embedded WollMux. Different "look and feel" for the
application and its embedded WollMux will likely lead to problems.

If you don't use this option, the default setting Metal-LAF
(javax.swing.plaf.metal.MetalLookAndFeel) remains in place.

Dialogs
=======

WollMux has various dialogs that influence configuration. These can be
custom-tailored to meet departmental needs.

FONT\_ZOOM
----------

Via the directive FONT\_ZOOM at the uppermost nesting level of the
dialog section, you can change font size for all WollMux UIs. After
FONT\_ZOOM, enter a floating-point number as shown as a multiplier for
font size. Example:

```
Dialoge(
  FONT_ZOOM "2.0"  # all fonts are twice their normal size.
)
```

(Note: The option font-zoom in WollMuxBar's option dialog only sets the
font zoom for the WollMuxBar)

Configure Sender Data
---------------------

This dialog enables the user to check data entries from his or her
personal list (and especially his or her own user data) and to modify
these entries if required. The description of this dialog can be found
in "dialoge.conf", in the section *Dialoge/AbsenderdatenBearbeiten*.
There is a warning at the top of "dialoge.conf" indicating that
individual departments shouldn't alter "dialoge.conf"; instead, changes
can be made in "referat.conf". It has the following structure in
"dialoge.conf":

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

The 3 subsections Person, Orga und Fusszeile (footer) each describe a
dialog window. In the respective subsection "Eingabefelder" the user
elements controlling display and editing of sender data (i.e. text
fields or comboboxes) are described. The related subsection Buttons
specifies labeling and function of the dialog page's buttons. The
following explains the individual specification elements:

### MODIFY\_MARKER\_COLOR &lt;Color entry&gt;

If the user modifies a sender data value, for obvious reasons this isn't
written back to the underlying database (i.e. LDAP). Instead, a
user-specific override is set for the modified value. The value is
decoupled from the database from that point forward. To make such
decoupled fields easily recognizable, they receive a colored marker. The
color used is determined by MODIFY\_MARKER\_COLOR. Die <Color entry>, as
in CSS, is a hexadecimal number in the format "\#RRGGBB", where RR, GG
and BB signify the red, green and blue components (hexadecimal, 00-FF).

### TITLE &lt;Title&gt;

This is the dialog window's display title. You can embed directives
in the form of "%{<ColumnName>}". These are replaced by the
corresponding values in the named column of the correspoding data
record. A typical title would be: TITLE "Personal data for %{FirstName}
%{LastName} (%{Role})"

### CLOSEACTION "&lt;action&gt;"

Indicates which action will be carried out when the user closes the
window with OS-specific actions, (for example, the "X" in the window's
title bar). Permitted actions are described
[below](Konfigurationsdatei_wollmux.conf#ACTION_.22Aktion.22 "wikilink").

### (&lt;Input Field Description 1&gt;)

The description of an input field consists of "key-value" pairs.
Possible pairs are described in the sections below. Note that not all of
these key-value pairs are useable for every type of input field.

#### LABEL "Label"

The label text is shown to the left of the input element.

#### TYPE "Field type"

The field type specifies which GUI element is used. The following field
types are supported:

-   textfield: a single-line field for the entry of a string
-   textarea: like a textfield, but can take multiple lines
-   combobox: a combination text/dropdown field, offering a selection of
    more than one preset values
-   label: not an input field. Only shows LABEL text.
-   separator: a horizontal line used for grouping purposes, with no
    further function.

#### DB\_SPALTE "Column"

This indicates the column containing the data to be displayed in the
input field and to be worked with. Column names refer to those
determined by
[SENDER\_SOURCE](Konfigurationsdatei_wollmux.conf#SENDER_SOURCE "wikilink")
contained in [Data source](Konfigurationsdatei_wollmux.conf#Datenquellen "wikilink"). The
data record being worked with is that selected in the dialog [Configure sender data](Konfigurationsdatei_wollmux.conf#Pers.C3.B6nliche_Absenderliste_Verwalten "wikilink").

#### VALUES (&lt;List&gt;)

This list of strings specifies the values that a "combobox" input field
offers the user.

#### LINES "Number"

Determines the number of lines shown in the form GUI for "textarea"
input. This number does not limit input. As many lines as desired can be
entered.

#### WRAP "false"

The statement WRAP "false" suppresses word wrap for "textarea" display.
The default is WRAP "true", in other words long sentences will be
wrapped at the boundary of the field. Note that this setting affects the
dialog window display only. No hard line breaks are entered regardless
of the setting.

#### READONLY "true"

If this is set, the user can't modify the input field's value.

#### EDIT "true"

If this is set for a "combobox" field, the user can not only select from
the list, but enter text as well.

### (&lt;Button Description 1&gt;)

The description of a button consists of "key-value" pairs. Possible
pairs are described in the sections below. Note that not all of these
key-value pairs are useable for each and every element of the button
list.

#### LABEL "Label"

The button's label.

#### TYPE "Type"

Type of input element. The following types are supported:

-   button: a normal button
-   glue: an invisible element that serves to add distance between
    2 buttons.

#### MINSIZE "No. pixels"

This entry is only valid for elements of type "glue". It indicates the
minimum width of the empty space between buttons, in pixels. If this
value is not given, "0" is assumed.

#### MAXSIZE "No. pixels"

This entry is only valid for elements of type "glue". It indicates the
maximum width of the empty space between buttons, in pixels. If this
value is not given, "infinite" is assumed.

#### PREFSIZE "No. pixels"

This entry is only valid for elements of type "glue". It indicates the
preferred width of the empty space between buttons, in pixels. If this
value is not given, "0" is assumed.

#### HOTKEY "letter"

If this entry exists, the action associated with the button can be
executed by the combination Alt-"letter". No special characters are
allowed. CAUTION: With Windows 2000, in "Display Properties"
(right-click on Desktop &rarr; Properties) in the "Effects" tab there is
the option "Hide keyboard navigation indicators until I use the ALT
key". If this option is activated, the hotkeys are only underscored when
you press the ALT key. This is not standard behavior and most Windows
applications don't support it.

#### ACTION "Action"

The ACTION specifies what should occur when the user presses the
corresponding button. The following actions are supported:

-   *abort*: The dialog is cancelled. Modifications are *not* saved.
-   *back*: Returns to previous dialog. Modifications are *not* saved.
-   *restoreStandard*: After the user completes a security dialog, all
    user-made changes in the diplayed dialog page (and only on
    this page) are restored to the values existing in the corresponding
    data source (i.e. LDAP).
-   *switchWindow*: brings to the foreground the dialog page indicated
    by WINDOW.
-   *save*: User-made modifications are stored as local overrides. From
    then on they will override the values from the original data source.
    Use restoreStandard to return to data source values.
-   *saveAndExit*: like "save", but the dialog closes.
-   *saveAndBack*: like "save", but returns to the previous dialog.

If ACTION is not entered at all or specified by an empty string, the
button is grayed out and has no function.

#### WINDOW "Window"

For the "switchWindow" action, this names the window to switch to. The
name corresponds to the subsection key of Window(...), which in a
standard configuration will be "Person", "Orga" or "Fusszeile".

Organize Senderlist
-------------------

This dialog lets you add or delete entries to your personal sender list.
There's a handy search field to make it easy to access sender data in
available directories (especially LDAP), and add it to your own sender
list. You reach this dialog when you select "Edit" from the "Configure
sender data" dialog (see below). The configuration section for this
dialog (or file, as the case may be) comes stock with the following
content:

```
Dialoge(
  PersoenlicheAbsenderliste(
    Fenster(
      Verwalten(
        TITLE "Absenderliste Verwalten (WollMux)"

        Intro(
          (LABEL "Sie können nach Vorname, Nachname, Email und Orga-Einheit suchen" TYPE "label" )
          (TYPE "glue")
        )
        
        Suche(
          (TYPE "textfield" ID "suchanfrage" ACTION "search")
          (LABEL "Suchen"  TYPE "button" HOTKEY "S"  ACTION "search")
        )
        
        Suchergebnis(
          (LABEL "Suchergebnis" TYPE "label")
          (TYPE "listbox" ID "suchergebnis" LINES "10" ACTION "addToPAL" DISPLAY "%{Nachname}, %{Vorname} (%{Rolle})")
        )
        
        HinUndHer(
          (LABEL "-->"  TYPE "button" ACTION "addToPAL")
          (LABEL "<--"  TYPE "button" ACTION "removeFromPAL")
        )
        
        Absenderliste(
          (LABEL "Persönliche Absenderliste" TYPE "label")
          (TYPE "listbox" ID "pal" LINES "10" ACTION "editEntry" DISPLAY "%{Nachname}, %{Vorname} (%{Rolle})")
        )
          
        Fussbereich(
          (LABEL "Löschen"  TYPE "button" HOTKEY "L"  ACTION "removeFromPAL")
          (LABEL "Bearbeiten..."  TYPE "button" HOTKEY "B"  ACTION "editEntry")
          (LABEL "Kopieren"  TYPE "button" HOTKEY "K"  ACTION "copyEntry")
          (LABEL "Neu"  TYPE "button" HOTKEY "N"  ACTION "editNewPALEntry")
          (LABEL "Schließen"  TYPE "button" HOTKEY "C"  ACTION "abort")
        )
      )
    )
    Suchstrategie(
      personal(Mail "${suchanfrage1}")
      personal(Mail "${suchanfrage1}@muenchen.de")
      personal(Nachname "${suchanfrage1}*")
      personal(OrgaKurz "${suchanfrage1}")
      personal(OrgaKurz "*${suchanfrage1}")
      personal(Vorname "${suchanfrage1}")
      personal(Vorname "${suchanfrage1}*")

      personal(Vorname "${suchanfrage1}" Nachname "${suchanfrage2}")
      personal(Nachname "${suchanfrage1}" Vorname "${suchanfrage2}")
      personal(Vorname "${suchanfrage1}" Nachname "${suchanfrage2}*")
      personal(Nachname "${suchanfrage1}" Vorname "${suchanfrage2}*")
      personal(OrgaKurz "${suchanfrage1}-${suchanfrage2}")
      personal(OrgaKurz "${suchanfrage1}/${suchanfrage2}")
      personal(OrgaKurz "${suchanfrage1} ${suchanfrage2}")
      personal(OrgaKurz "${suchanfrage1}_${suchanfrage2}")
      personal(OrgaKurz "*${suchanfrage1}-${suchanfrage2}")
      personal(OrgaKurz "*${suchanfrage1}/${suchanfrage2}")
      personal(OrgaKurz "*${suchanfrage1} ${suchanfrage2}")
      personal(OrgaKurz "*${suchanfrage1}_${suchanfrage2}")
      personal(Vorname "${suchanfrage1}*" Nachname "${suchanfrage2}*")
      personal(Nachname "${suchanfrage1}*" Vorname "${suchanfrage2}*")

      personal(OrgaKurz "${suchanfrage1} ${suchanfrage2} ${suchanfrage3}")
      personal(OrgaKurz "${suchanfrage1} ${suchanfrage2} ${suchanfrage3} ${suchanfrage4}")
      personal(OrgaKurz "${suchanfrage1} ${suchanfrage2} ${suchanfrage3} ${suchanfrage4} ${suchanfrage5}")
    )
  )
)
```

Some of these entries may appear in your own language in a stock
configuration, depending on the contents of the "localization.conf" file
for your "wollmux-config" setup. Departments should not normally have to
make any changes to this dialog. You may, however, want (or need) to
deactivate certain functions. Since the structure as well as the
specification elements of this dialog are entirely analogous to those of
[Configure sender data](Konfigurationsdatei_wollmux.conf#Absenderdaten_Bearbeiten "wikilink"),
we'll focus here on items that either aren't mentioned there or are of
particular interest.

Tip: The similar structures of the dialog config section [Configure sender data](Konfigurationsdatei_wollmux.conf#Absenderdaten_Bearbeiten "wikilink") and [Manage personal sender list](Konfigurationsdatei_wollmux.conf#Pers.C3.B6nliche_Absenderliste_Verwalten "wikilink") reduces the learning curve for administrators. Actual possibilities for adaptation are limited to those functions the dialog is furnished with. For example, it is *not* possible to add more windows to the "Manage Personal Sender List" dialog, as further subsections are created in the section "Windows", and buttons are created with *ACTION "switchWindow"*.

### (Description - GUI element&gt;)

#### ID "identifier"

Since the dialog can have several similar GUI elements, the identifier
determines which element performs which task. Only one element per ID is
permitted. The following identifiers exist:

-   *search\_query*: identifies the search input field
-   *search\_result*: identifies the listbox that displays the search
    result
-   *pal*: identifies the listbox that displays the user's personal
    sender list

#### TYPE "field\_type"

This describes what kind the GUI element is. The following field types
are supported:

-   *textfield*: a one-line field for entering a string
-   *label*: not an entry field. Only shows LABEL text.
-   *glue*: an invisible element used to insert empty space (and thereby
    achieving alignment left or right)
-   *listbox*: a list of possible entries from which the user can choose
-   *button*: a normal button

#### LINES "number"

Sets the preferred number of lines to display for a listbox element.

#### ACTION "action"

This specifies what happens when the user clicks the corresponding
button. For listboxes, the action is performed when the the user
double-clicks the entry. For textboxes, the action is performed when the
hits the ENTER key while inside the field. The following actions are
supported:

-   *abort*: The dialog is closed. Changes to the sender list
    remain intact.
-   *search*: The query in the search field is performed.
-   *addToPAL*: add the selected entry in the search result to the
    sender list.
-   *removeFromPAL*: deletes the selected entry from the sender list.
-   *editEntry*: edits the first entry of any selected in the listbox.
    If the selected entry is in the search result list, it is copied to
    the sender list, and the copy is edited.
-   *copyEntry*: adds a copy of all entries selected to the sender list.
-   *newPALEntry*: adds a new data record to the sender list, which is
    not linked to a database.
-   *editNewPALEntry*: adds a new data record to the sender list, which
    is not linked to a database, and opens it for editing.

If a button has no action assigned, or an empty string assigned as an
action, the button is grayed out, and has no function.

#### DISPLAY "display\_pattern"

Only possible for elements of type "listbox" with ID "search\_result"
oder "pal" (siehe oben). The DISPLAY attribute is used to control how
search results are presented, as well as the entries in the sender list.
Besides static text, the display pattern can contain placeholders of the
form `%{column_name}` enthalten, which are replaced by the database
values for the corresponding columns..

*Example:* A [LDAP data source](#TYPE_.22ldap.22 "wikilink") is used.
(See [Column description](#Spalten-Beschreibung "wikilink")) The
DB\_SPALTE attribute defines the column names "Nachname" (last name or
surname), "Vorname" (first name) und "Rolle" (role or title).
Specifiying "`DISPLAY %{Nachname}, %{Vorname} (%{Rolle})`", for
example, results in a display of the form "`Meier, Hans
(Abteilungsleiter)`".

### Search strategy

The *Dialoge/PersoenlicheAbsenderliste/Search strategy* section
determines implementation of textfields with ID "query", used in queries
to the database selected as [SENDER\_SOURCE](#SENDER_SOURCE "wikilink").
The section consists of an arbitrary number of queries with the
following pattern:

`datasource(ColumnName1 "<SearchPattern1>" ColumnName2 "<SearchPattern2>" ... )`

Here's a practical example:

```
personal(Mail "${query1}")
personal(Mail "${query1}@muenchen.de")
personal(LastName "${query1}*")
personal(FirstName "${query1}" LastName "${query2}")
personal(OrgaKurz "${query1}-${query2}")
```

Remarks:

-   **Depending on the extent of localization implemented at the time
    you read this, you may still need to use ${suchanfrage1} and
    ${suchanfrage2} instead of ${query1} and ${query2}. These may
    appear interchangeably in this documentation.**
-   **For searches in the PAL (personal sender list) the data source
    selected as [SENDER\_SOURCE](#SENDER_SOURCE "wikilink") is ALWAYS
    used, independent of the name entered here!** The lines
    `personal(Mail "${query1}")` and `gugelhupf(Mail "${query1}")`
    are therefore completely equal! Despite this behavior at present, we
    strongly advise you use the
    [SENDER\_SOURCE](#SENDER_SOURCE "wikilink") data source name, as
    future WollMux functionality may result in this data source's name
    actually being evaluated.
-   Allowable entries are ${suchanfrage1}, ${suchanfrage2}. They are
    variables that will be replaced by corresponding words in the query
    entered by the user.
-   Asterisks function as wild cards, representing a partial string of
    any length.
-   Search patterns for the entered number of words are processed
    in order. The results of the first query with at least one hit
    are returned.
-   Search patterns requiring more words than the user has entered
    are ignored.
-   If no rule matches the number of words the user has entered, the
    entered is truncated from the end until it is either empty or
    reaches a number of words for which a rule exists.
-   Entering a search pattern without columns (i.e. just the data
    source name) is possible, and means that empty queries and the query
    "\*" are permitted, returning all data records from the data source
    where possible. **CAUTION!** At present not all data sources support
    this feature. Future development along these lines will only take
    place as required.

Select Sender / Configure sender data
-------------------------------------

This dialog (the label may vary) lets the user select the sender for the
user's letterheads. It displays the personal sender list for selection
of an entry. The description for this dialog can be found in the section
(or file) *Dialoge/AbsenderAuswaehlen*, which has the following content
as delivered:

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

You will need to change this in "referat.conf" for localization
purposes. Under certain circumstances you may need to de-activate some
of the available functions. The structure and specific elements are
analogous to those of [Organize Senderlist](Konfigurationsdatei_wollmux.conf#Absenderdaten_Bearbeiten "wikilink").
**Please note that the labels for these dialogs are subject to change
due to change in localization files.**

I use the following at the moment, as a section in "referat.conf":

```
    #Department-specific tab for selecting sender
    Dialoge(
      AbsenderAuswaehlen(
        Fenster(
          Auswaehlen(
            TITLE "Select Sender (WollMux)"
            CLOSEACTION "abort"
            Absenderliste(
              (LABEL "Which sender do you want to use for your letterheads?" TYPE "label" )
              (TYPE "listbox" ID "pal" LINES "10" ACTION "back" DISPLAY "%{Nachname}, %{Vorname} (%{Rolle})")
            )  
            Buttons(
              (LABEL "Edit..."  TYPE "button" HOTKEY "B"  ACTION "editList")
              (TYPE "glue")
              (LABEL "Close"  TYPE "button" HOTKEY "C"  ACTION "abort")
            )
          )
        )
      )
    )#Select Sender
```

Tip: The similar structures of the dialog config section [Configure sender data](Konfigurationsdatei_wollmux.conf#Absenderdaten_Bearbeiten "wikilink") and [Organize Senderlist (WollMux)](Konfigurationsdatei_wollmux.conf#Pers.C3.B6nliche_Absenderliste_Verwalten "wikilink") reduces the learning curve for administrators. Actual possibilities for adaptation are limited to those functions the dialog is furnished with. For example, it is *not* possible to add more windows to the "Manage Personal Sender List" dialog, as further subsections are created in the section "Windows", and buttons are created with *ACTION "switchWindow"*.

### (&lt;GUI Element Description&gt;)

#### ID "Identifier"

The only identifier of any interest for this dialog is *pal*. It has to
be declared for the listbox element that displays the Personal Sender
List.

#### ACTION "Action"

The dialog supports the following actions:

-   *abort*: The dialog is closed. If the selection was modified before
    closing, the modification remains valid.
-   *editList*: This calls up the dialog for editing the Personal
    Sender List. If no action is declared for a button, or if an empty
    string is specified as the action, the button is grayed out and has
    no function.

#### DISPLAY "DisplayPattern"

This can be declared for the listbox element with the ID "pal". The
DISPLAY attribute lets you control how the entries in the Personal
Sender List are displayed. Besides static text, the display pattern can
contain placeholders of the form `%{ColumnName}`, which will be replaced
by the value of the corresponding column of the corresponding data
record.

*Example:* Let's assume a [LDAP datasource](#TYPE_.22ldap.22 "wikilink")
is used, in whose [column description](#Spalten-Beschreibung "wikilink")'s DB\_SPALTE attribute
the column names "LastName", "FirstName" und "Position" are defined. In
this case, declaring `DISPLAY "%{LastName}, %{FirstName}`
`(%{Position})"` would lead to a display of something on the order of
"`Meier, Hans (Department chief)`".

"Sachleitende Verfügungen" print dialog
---------------------------------------

The term "sachleitende Verfügungen" doesn't translate easily to English.
Approximately only, it means "case management directives", or perhaps
"clerical instructions", or even "workflow" (try Googling it!).
Individual processing steps are numbered, provided with appropriate
initials or abbreviations, and dated. Individual annotations may only
appear in versions of the document destined for a particular recipient.
This "Komfortdruck" (roughly, "easy printing") dialog, designed to ease
the burden of this workflow, controls this function. The description of
this dialog will most likely be in the file "dialoge.conf" delivered
with your "wollmux-conf" setup. As delivered it has the following
content:

```
Dialoge(
 SachleitendeVerfuegungenDruckdialog( #Workflow print dialog
   Fenster(
     Drucken(
       TITLE "Wollmux Komfortdruck"
       CLOSEACTION "abort"

       Headers(
         (LABEL "Ausfertigung" TYPE "label") #"Ausfertigung" may be displayed in English localization as an "instance"
         (LABEL "Kopien" TYPE "label")
         (TYPE "glue")
       )

       Verfuegungspunkt( # displayed in one line per annotation point (Verfuegungspunkt)
         (TYPE "combobox" ID "element")
         (TYPE "spinner" ID "elementCount")
         (TYPE "glue")
         (TYPE "button" LABEL "Drucken" ACTION "printElement")
       )

       AllElements( # displayed as a separate line under a separator
         (LABEL "Summe aller Ausfertigungen" TYPE "label")#Sum of all instances
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

Departments should not normally have to make any changes to this dialog.
You may, however, want (or need) to deactivate certain functions. Since
the structure as well as the specification elements of this dialog are
entirely analogous to those of Configure sender data, we'll focus here
on items that either aren't mentioned there or are of particular
interest.

> **INFO** The similar structures of the dialog config section for this dialog and that of [Configure sender datareduces](Konfigurationsdatei_wollmux.conf#Absenderdaten_Bearbeiten "wikilink") the learning curve for administrators. Actual possibilities for adaptation are limited to those functions the dialog is furnished with.

### Description of the subsection Window/Print

This dialog has a single window area, in which all elements of the
dialog are displayed as a table. Four separate areas or subsections are
defined:

-   *Headers*: The "Headers" section contains the column headers for
    the dialog.
-   *Verfuegungspunkt (annotation point)*: When the dialog is defined,
    each annotation point is assigned an entry using the elements in
    this subsection as a template.
-   *AllElements*: Contains a summary with a counter showing the number
    of copies.
-   *Buttons*: Contains the buttons available in the dialog.

### (&lt;GUI element description&gt;)

#### ID "Identifier"

This dialog supports the following identifiers:

-   *element*: This identifier is defined in conjunction with a combobox
    element in which the caption of the annotation point and the
    so-called "supply line" (if any) are specified.
-   *elementCount*: This identifier is defined in conjunction with a
    spinner element, allowing the user to determine the number of copies
    of an annotation point.
-   *allElementCount*: This identifier is defined in conjunction with a
    text field in whcih the total number of copies is displayed.

#### ACTION "Action"

The dialog supports the following actions:

-   *printElement*: Creates all copies of the single annotation point to
    which the element refers.
-   *printAll*: Prints all copies of all instances.

Warning dialog - multiple WollMux installations
-----------------------------------------------

Multiple installations of WollMux are a frequent cause of irritation and
time-consuming debugging. They usually occur when a WollMux package is
installed while an "soffice" process is still running. This makes it
impossible to reliably uninstall the previous version, leaving an
outdated and non-functional WollMux in the system. A multiple
installation can also occur when a system-wide installation and a
user-specific installation coexist. Possible consequences are
non-error-free WollMux functionality, and unpredictable errors.

To give advance warning of errors of this type, the following dialog was
introduced. When LibreOffice or OpenOffice.org is started, or the
WollMux toolbar is activated, or the WollMuxBar is started, a test is
run for multiple installations. Both system-wide and user-specific
instances of LO or OOO.org are checked. If multiple installations are
found, or the date of the most recent installation has somehow changed,
the warning dialog is displayed, and a corresponding entry is made in
wollmux.log.

The warning dialog text appears in dialoge.conf, and can be changed in
localization.conf to English (most of it is already). An example warning
dialog is the following:

```
Dialoge(
  MehrfachinstallationWarndialog(
    TITLE "Multiple WollMux installation" #This according to the localization.conf file available at this writing
    MSG( 
         "Multiple WollMux installations were found on your system.%n" #May vary in your localization
         "This condition may have unforseeable consequences%n" #May vary in your localization
         "and should be remedied as soon as possible.%n"       #May vary in your localization
         "%n"
         "The newest WollMux installation is located under:%n"
         "- ${RECENT_INST_PATH}%n"
         "%n"
         "Furthermore the following WollMux installations was found:%n"
         "${OTHER_INSTS_LIST}"
       )
  )
)
```

This entire section is optional. If it is absent, an error will appear
with the initial contents of the WollMux displayed. If the section is
defined, the following values can be set:

*TITLE*: Caption of the warning dialog. TITLE is optional. If TITLE is not defined, the corresponding initial WollMux values are used.

*MSG*: The actual text content of the dialog. This attribute is required for this section. If MSG is missing the dialog will not be displayed.

In MSG the following variables can be used. They will be replaced by
correpsonding WollMux runtime values:
-   **\${RECENT\_INST\_PATH}**: Path of the most recent WollMux
    installation found on the system.
-   **\${RECENT\_INST\_LAST\_MODIFIED}**: Date of the last
    modification to the most recent WollMux installation.
-   **\${OTHER\_INSTS\_LIST}**: Contains a list with the paths of
    all "competing" WollMux installations on the system.

### Deactivate warning dialog

Just define an empty dialog, as follows:

```
Dialoge(
  MehrfachinstallationWarndialog(
  )
)
```

The warning dialog won't display, but there will still be an error entry
in wollmux.log.

Mailmerge dialog
----------------

The Mailmerge dialog section specifies and configures the dialog that
appears when the user clicks the Mailmerge bar's "Print" button. There
are two subsections: "Fenster" (Window) and "Regeln" (Rules). The
subsection "Fenster" specifies the specifies the elements that are
either shown or hidden, depending on applicable visibility rules. The
"Rules" subsection sets out the rules that govern visibility, and which
print functions are used in a specific print scenario. You can add the
following to "referat.conf" to have this dialog in English instead of
German:

Dialoge(

```
 Seriendruckdialog(
   TITLE "Mailmerge"
   Fenster(    
     Aktionen(TITLE "Actions"
       (LABEL "Create as a single document" TYPE "radio" ACTION "setActionType" VALUE "gesamtdok")
       (LABEL "Direct print" TYPE "radio" ACTION "setActionType" VALUE "drucken")
       (LABEL "Send as emails" TYPE "radio" ACTION "setActionType" VALUE "emails")
       (LABEL "Create individual file(s)" TYPE "radio" ACTION "setActionType" VALUE "einzel")
     ) 
     Druckbereich(TITLE "Use following data record(s)"
       (LABEL "All" TYPE "radio" ACTION "selectAll")
       (LABEL_FROM "From" LABEL_TO "to" TYPE "fromtoradio" ACTION "selectRange")
     )
     Output(TITLE "Output format"
       (LABEL "ODT file" TYPE "radio" GROUP "odt" ACTION "setOutput" VALUE "odt")
       (LABEL "ODT file / WollMux Form" TYPE "radio" GROUP "odtwm" ACTION "setOutput" VALUE "odt")
       (LABEL "PDF file" TYPE "radio" GROUP "pdf" ACTION "setOutput" VALUE "pdf")
     )
     EMailOptionen1(
       (LABEL "Sender address" TYPE "emailfrom" GROUP "emails")
       (LABEL "Recipient address" TYPE "emailtofieldname" GROUP "emails")
       (LABEL "Re:" TYPE "emailsubject" GROUP "emails")
     )
     EMailOptionen2(TITLE "Email message"
       (TYPE "emailtext" GROUP "emails")
     )
     Zielverzeichnis(TITLE "Target directory"
       (LABEL "Browse..." TYPE "targetdirpicker" GROUP "einzel")
     )
     Dateinamensmuster(TITLE "Dateinamensmuster"
         (TYPE "filenametemplatechooser" GROUP "einzel")
     )
     DateinamensmusterMail(TITLE "Dateinamensmuster für den Anhang"
         (TYPE "filenametemplatechooser" GROUP "emails")
     )
     # This dialog only works when "User Defined Settings" 
     # (see: "Tools->Options->Load/Save->General->Load printer settings with the document") 
     # is active, so this dialog is deactivated by default. Uncomment this section to activate it.
     #Druckereinstellungen(
     #  (LABEL "Printer:" TYPE "printersettings" GROUP "drucken")
     #)
     Description(
         (TYPE "glue")
         (TYPE "description")
     )
     Buttons(ORIENTATION "horizontal"
       (LABEL "Cancel" TYPE "button" ACTION "abort")
       (TYPE "glue")
       (LABEL "Continue" TYPE "button" ACTION "submit")
     )     
   ) # Fenster
   Regeln(
     (ON_ACTION_TYPE "gesamtdok" SHOW_GROUPS("odt" "pdf" "gesamtdok"))
     (ON_ACTION_TYPE "gesamtdok" ON_OUTPUT "odt"
       USE_PRINTFUNCTIONS ("OOoMailMergeToOdtFile")
       SET_DESCRIPTION(
         "Creates single document as ODT file.%n"
         "+ Allows preview, subsequent editing and archiving%n"
         "+ Supports ""Next data record"" function%n"
         "- Show/Hide CANNOT be controlled via the data source"
       )
     )
     (ON_ACTION_TYPE "gesamtdok" ON_OUTPUT "pdf"
       USE_PRINTFUNCTIONS ("MailMergeNewSetFormValue" "PDFGesamtdokument" "PDFGesamtdokumentOutput")
       SET_DESCRIPTION(
         "Creates single document as PDF file.%n"
         "+ Allows preview and archiving, but not subsequent editing%n"
         "+ Show/Hide CAN be controlled via the data sourcen%n"
         "- NO support for ""Next data record"" function"
       )
     )
     (ON_ACTION_TYPE "drucken" SHOW_GROUPS("drucken")
       USE_PRINTFUNCTIONS ("OOoMailMergeToPrinter")
       SET_DESCRIPTION(
         "Sends mailmerge document to a printer.%n"
         "+ By far the quickest, most stable form of WollMux mailmerge%n"
         "+ Supports ""Next data record"" function%n"
         "- Show/Hide CANNOT be controlled via the data source"
       )
     )
     (ON_ACTION_TYPE "emails" SHOW_GROUPS("emails")
       USE_PRINTFUNCTIONS ("MailMergeNewSetFormValue" "MailMergeNewToEMail") IGNORE_DOC_PRINTFUNCTIONS "true"
       SET_DESCRIPTION (
         "Send emails with individual ODT files attached.%n"
         "+ WollMux forms retain form characteristics%n"
         "+ Show/Hide CAN be controlled via the data sourcen%n"
       )
     )
     (ON_ACTION_TYPE "einzel" SHOW_GROUPS("einzel")
       USE_PRINTFUNCTIONS ("MailMergeNewSetFormValue" "MailMergeNewToSingleODT") IGNORE_DOC_PRINTFUNCTIONS "true"
       SET_DESCRIPTION( 
         "Creates individual ODT file with configurable name in a selectable directory%n"
         "+ WollMux forms retain form characteristics%n"
         "+ Show/Hide CAN be controlled via the data sourcen%n"
       )
     )
   ) # Regeln (Rules)
 ) # Seriendruckdialog (Mailmerge dialog)
) # Dialoge (dialogs)
```

In the delivered "dialoge.conf", it states that "departments shouldn't
normally need to make any changes in this dialog. In exceptional cases,
however, it may be necessary to change some of the default settings to
meet print common print requirements." It is likely you will need to
make such changes!

Note: The similarity of this to other WollMux dialogs eases the learning curve. As with other dialogs, adapting functionality is limited to those functions the dialgo supports.

### "Fenster" (Window) subsection

The dialog has a single window area where all dialog elements are
displayed in *Sections* (such as the section with the keyname
"EMailOptionen2"). A section's keyname can be freely assigned, and has
no effect on how WollMux displays the section - it's only there for
readability purposes. Each "Section" manages the radio button elements
it contains, and is only visible when at least one of the elements in
the section is visible. The following attributes can be applied directly
from the corresponding Section (the ".conf" section below shows how
these attributes appear in practice):

```
     Buttons(ORIENTATION "horizontal"
       (LABEL "Cancel" TYPE "button" ACTION "abort")
       (TYPE "glue")
       (LABEL "Continue" TYPE "button" ACTION "submit")
     )
```

-   *TITLE*: If a title is designated, the Section gets a a border with
    the text TITLE as a caption. If no TITLE is designated, there will
    be no border or title.
-   *ORIENTATION*: Can be "horizontal" or "vertical" (Default
    is vertical)

A Section can contain the following elements, distinguished by their
TYPE attribute:

-   **TYPE "radio":** creates a radio button with LABEL describing the
    action the button triggers
-   **TYPE "label":** creates a label with the description provided by
    LABEL
-   **TYPE "description":** creates the description field containing
    relevant information about the selected print option
-   **TYPE "fromToRadio":** creates the "radio" element for choosing the
    print range described by LABEL\_FROM and LABEL\_TO. When activated,
    evaluates the ACTION entry
-   **TYPE "targetDirPicker":** creates an element for selecting the
    target directory (single-document printing)
-   **TYPE "filenameTemplateChooser":** creates an input field for
    entering the output file pattern with its database field references
-   **TYPE "emailFrom":** creates a text field for entering the email
    sender address, with description LABEL
-   **TYPE "emailToFieldname":** creates a combo box with descripion
    LABEL for the database field describing the recipient
-   **TYPE "emailText":** creates an entry field for email text with
    field references
-   **TYPE "emailSubject":** creates a text field for choice of email
    subject
-   **TYPE "printerSettings":** creates a button for choice of printer
    and editing of properties
-   **TYPE "glue":** depending on the ORIENTATION setting of the
    section, creates a vertical or horizontal distance
-   **TYPE "button":** creates a button with description LABEL, which
    executes the action given by ACTION when activated

Furthermore, each element evaluates a GROUP entry if present, where
visibility is determined. If the group is set to "visible", the element
will be displayed, otherwise not. If there is no GROUP entry the element
will always be displayed.

The following are valid actions for the ACTION attribute:

-   *setActionType*: causes a new evaluation of the ON\_ACTION rules
    with the action given in VALUE
-   *setOutput*: causes a new evaluation of the ON\_OUTPUT-Regeln with
    the output option given in VALUE
-   *selectAll*: sets status to "Print all data records"
-   *selectRange*: sets print output status to the range of data records
    given
-   *abort*: closes dialog
-   *submit*: starts printing

### The Regeln (Rules) section

This subsection determines which elements of the window section are
visible and which print actions are carried out when a "submit" action
is executed

The following keywords or combinations thereof can be use in rules:

-   *ON\_ACTION "&lt;action&gt;"*: Rule applies when an ACTION "setActionType"
    with VALUE equal to &ltaction&gt has been executed
-   *ON\_OUTPUT "&lt;output&gt;*": Rule applies when an ACTION "setOutput" with VALUE equal to &lt;output&gt; has been executed
-   *SHOW\_GROUPS (&lt;list&gt;)*: Sets all visibility groups excluding those
    in the list to invisible and all groups in the list to visible
-   *USE\_PRINTFUNCTIONS(&lt;list&gt;)*: The print functions given in &lt;list&gt;
    are used with a "submit" action. All print functions entered here
    must be defined in a [Print functions](#Druckfunktionen "wikilink")
    section; otherwise the corresponding radio buttons will be grayed
    out
-   *IGNORE\_DOC\_PRINTFUNCTIONS "true|false"*: Controls whether
    document-specific print functions (such as workflow directives) will
    apply
-   *SET\_DESCRIPTION "<text>"*: shows the text of <text> in the
    "description" field

Text fragments
==============

WollMux supports "text fragments". A text fragment is one part of the
content of an entire document. Text fragments can be stored in
individual files, and added to a document via WollMux. This allows great
flexibility and modularity when building templates. The concept is fully
described in [WollMux text fragments](Textfragmente_im_WollMux "wikilink").

Textfragmente (text fragments) section
--------------------------------------

The list of text fragments that WollMux can add can be maintained by
each department through the use of the relevant configuration file. The
section *Textfragmente* has the following structure:

```
Textfragmente(

   (<FragmentDescription1>)
   ...
   (<FragmentDescriptionN>)

)
```

The "Textfragmente" section can appear multiple times in the
configuration file(s). You can define text fragments in each
"Textfragmente" section. WollMux recognizes all text fragments in
defined in all Textfragmente sections. Text fragments appearing later in
the file take precedence over those defined in earlier sections. The
corresponding description looks like this:

### &lt;FragmentDescriptionN&gt;

A fragment description consists of key-value pairs. It has the following
structure:

`(FRAG_ID "<regEx>" URL "<URL_of_text_fragment-file>")

`(FRAG_ID "<regEx>" URL ("<url1>" "<url2>" "<urlN>"))`

The following values must be given for each fragment description:

#### FRAG\_ID "&lt;regex&gt;"

Die FRAG\_ID contains a short identifier that distinguishes the text
fragment for WollMux's internal processing. The identifier requires the
format to follow the [Syntax rules for keys](Format_von_WollMux-Config-Dateien#Schl.C3.BCssel "wikilink"), and
it must be unique. In other words, two different text fragments may not
have the same FRAG\_ID. However, if need be you can redefine a
previously defined text fragment. If a text fragment is defined multiple
times, the last to appear in the configuration file(s) will be used. As
you've probably guesssed from the title of this subsection, FRAG\_ID
also supports regular expressions.

#### URL "&lt;URL_of_text_fragment_file&gt;"

The URL describes the file containing the text fragment, usually with
extension .ott. Structure of URLS is described at
[Format\_of\_WollMux\_config\_files](Format_von_WollMux-Config-Dateien#URLs "wikilink").
Relative URLs are evaluated in reference to the path determined in
[DEFAULT\_CONTEXT](Konfigurationsdatei_wollmux.conf#Der_DEFAULT_CONTEXT "wikilink").
You can also use an absolute path without requiring DEFAULT\_CONTEXT.
More than one URL can be entered; the first to be resolved without error
will be used.

If there's a so-called [Capturing\_group](https://docs.oracle.com/javase/tutorial/essential/regex/groups.html "wikilink")
in the FRAG\_ID, it can be referenced in the URL by the notation "$n",
where "n" is the number of the group. Group $0 by default contains the
content of the complete FRAG\_ID. Various URLs can therefore be
addressed, depending on the FRAG\_ID.

Example:

```
Textfragmente(
   (FRAG_ID "Abt.*" URL "./vorlagen/fragmente/beispiele/$0.ott")
)
```

This expression defines all text fragments that begin with "Abt" and
reroutes to the corresponding file in directory
./vorlagen/fragmente/beispiele/\*.ott. For example, a valid text
fragment here could be "AbtKopf", with the corresponding file searched
for at ./vorlagen/fragmente/beispiele/AbtKopf.ott.

### Variables

The use of variables makes it easier to maintain the configuration
files. For example, you can use variables to take the place of
frequently used paths in the URL values above.

#### Variable definition with VAR

A variable is defined like this:

`VAR(NAME "Variable_name" VALUE "Content")`

You can define variables in different places in the config file(s). For
example:

```
VAR(NAME "Variable1" VALUE "Content")             # in the main section, at the beginning of the file.

Textfragmente(
   VAR(NAME "Variable2" VALUE "Content")          # in a text-fragment section.
   ...
)

VAR(NAME "Variable3" VALUE "Content")             # or in the main section, but elsewhere in the file

Textfragmente(
   ...
   VAR(NAME "Variable4" VALUE "More content")    # or someplace in a different text-fragment section
   ...
)

VAR(NAME "Variable5" VALUE "Still more content")  # or in the main section right at the end of the config file.
```

Brief description of the elements used:

*NAME*: The key "NAME" is the variable identifier. The syntax is as usual for identifiers, that is, permitted symbols are letters, numbers and the underscore, where the first character is not a number.

*VALUE*: The key "VALUE" provides the variable's content.

You can re-define variables in the config file. In general, the last
definition will be the one used. Example:

```
VAR(NAME "Foo" VALUE "Content")       # Variable Foo, original definition

Some_Section(
   ...
)

Some_Section2(
   ...
)

VAR(NAME "Foo" VALUE "New content")    # This subsequent re-definition overwrites the old one
```

Variables can be defined in two different nesting levels: in the main
section of the config file, and in a text-fragment subsection.
Definitions in level 1 supersede those in level 0.

```
VAR(NAME "Foo" VALUE "Content")          # Definition somewhere in the main section 
                                        # (Nesting level 0)

Textfragmente(
   VAR(NAME "Foo" VALUE "New content")  # Re-definition in a text-fragment section
                                        # (Nesting level 1)
   ...
)
```

Variables can themselves reference other variables(see [Referencing
variables](Configuration_file_wollmux.conf#Referencing_variables "wikilink")).
A brief example:

`VAR(NAME "Variable_A" VALUE "My Content A")`

`VAR(NAME "Variable_B" VALUE "${Variable_A} and My Additional Content B")`

#### Referencing variables

In a value, variables are referenced like this:

`${Variable_name}`

Each variable reference begins with the dollar sign ("\$")and must be
enclosed by curly braces.

The following example shows the use of variables in URL values:

```
VAR(NAME "our_drive" VALUE "file:/L:/ourTemplates")

Textfragmente(
   (FRAG_ID "fragment_a" URL "${our_drive}/Fragment_a.odt") #Admittedly, here the variable's not much shorter than the path
   (FRAG_ID "fragment_b" URL "${our_drive}/Fragment_b.odt")
)
```

Since you can define variables in different nesting levels, (level 0 und
level 1), in each case the closest variable definition to the
reference's level will be used. Here's an example:

```
VAR(NAME "Variable A" VALUE "neverVisible")  # First definition of "Variable A" (in level 0)

Textfragmente(
  VAR(NAME "Variable A" VALUE "bar")        # level-1 re-definition of "Variable A" 
  (FRAG_ID "frag1" URL "${Variable A}")     # thus, URL --> "bar"
)

Textfragmente(
  (FRAG_ID "frag1" URL "${Variable A}")     # URL --> "foo" 
)

VAR(NAME "Variable A" VALUE "foo")          # Last valid (re-)definition of "Variable A" is in level 0 is passed to level 1 above
```

Variables are replaced when first used, not when defined.

Text fragments or text blocks
=============================

The Textfragment system lets you interactively reload text fragments (or
text blocks, the terms are used interchangeably) in a document you're
editing. Each text block can in turn load another text block
automatically. A text block is loaded by specifying a text block
identifier (possibly with arguments) in the document. A configurable key
combination triggers an event that recognizes the text block identifier
(plus arguments) and loads the linked text block.

The "Textbausteine" section configures the Textfragment system. More
than one of these sections can appear in wollmux.conf. The definitions
in later sections override definitions in earlier sections.

Here's an example of a "Textbausteine" section:

```
  Textbausteine(
    SEPARATOR "#"
    Warnungen(
      MSG_TOO_MANY_ARGS "true"  #oder on oder 1
    )
    Kuerzel(
     (MATCH(<ListWithRegExStrings>) FRAG_ID '<replacementString>')
     (MATCH("NOST", "NSOT") FRAG_ID "TBS_nostalgie")
     (MATCH("UNT") FRAG_ID "Unterschrift")
     (MATCH("IB") FRAG_ID "internerBriefkopf" )
     (MATCH "(NOST)|(NSOT)" FRAG_ID "TBS_nostalgie2")
     (MATCH "\$(.+)" FRAG_ID "$1")                                    # Entering $Test1 --> FRAG_ID "Test1"
     (MATCH "SF(\d{4})" FRAG_ID "SF$1")                               # Entering SF2400 --> FRAG_ID "SF2400"
     (MATCH "(BS\d+)" FRAG_ID "TBS_$1")                               # Entering BS10 --> FRAG_ID "TBS_BS10"
     (MATCH (...) FRAG_ID "TBS_$1")                                  
   )
 )
```

SEPARATOR &lt;Separator&gt;
---------------------

The optional attribute Attribut SEPARATOR lets you specify a delimiter
for individual parameters when inserting text blocks. The assigned
parameters are automatically inserted in free placeholders for the added
text block. If no SEPARATOR is defined, "\#" is used by default.
Example: $BB0815\#one\#two.

If one of the placeholders should not be filled in when inserting the
text block, leave the space between separators empty (i.e. no space
between separators). Example: "$BB0815\#first\#\#third"). In the
example, the second placeholder doesn't get filled in and remains
unaltered.

If one of the placeholders should be deleted when inserting the text
block (i.e. zero content), you must leave a space between the two
separators. Example: $BB0815\#first\# \#third. Here the second
placeholder gets deleted.

Warnungen (Warnings)
--------------------

In this optional section you can define the warnings potentially
displayed to the user of the text fragment system.

### MSG\_TOO\_MANY\_ARGS &lt;Argument&gt;

With the MSG\_TOO\_MANY\_ARGS you can enable the error message "More
parameters specified than slots available \[may not be translated yet\]"
by setting it to *true*, *on* or *1*. The warning dialog will display if
too many arguments are passed when you try to insert a text block. If
you don't specify the attribute or it isn't set to true, on, or 1, no
warning dialog will display.

Kuerzel (Shortcuts)
-------------------

In the "Kuerzel" \[Shortcuts\] section you can define the text block
identifiers that WollMux should recognize. In the section you allocate
MATCH to FRAG\_ID by describing which text block should be inserted when
(going backwards from the cursor) a MATCH is found. For example, you
enter $BB0815 in Writer, and click the button "Insert textfragment."
WollMux compares the identifier you entered to the entry in MATCH. If it
matches the regex given, its FRAG\_ID will be linked to the
corresponding FRAG\_ID from the "Textfragmente" section. Via the
"Textfragmente" section, then, where the FRAG\_IDs are resolved into
URLs, the first resolvable text block encountered is inserted.

### MATCH(&lt;listOfRegExStrings&gt;)

Syntax:

`MATCH "<regex>"`

`MATCH ("<regex1>" "<regex2>" ...)`

Use MATCH to define the text block identifier. Using [Regular expressions](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html "wikilink")
you can handle more than one text block identifier at a time.

### FRAG\_ID '<replacementString>'

The FRAG\_ID connects the
[FRAG\_ID](Konfigurationsdatei_wollmux.conf#FRAG_ID_.22.3Cregex.3E.22 "wikilink")
from the [Abschnitt Textfragmente](Konfigurationsdatei_wollmux.conf#Der_Abschnitt_Textfragmente "wikilink")
in which in turn the
[URLs](Konfigurationsdatei_wollmux.conf#URL_.22.3CURL_der_Textfragment-Datei.3E.22 "wikilink")
are listed.

If a
[Capturing-Group](http://java.sun.com/j2se/1.4.2/docs/api/java/util/regex/Pattern.html#cg)
has been defined within the regular MATCH expression, this group can be
referenced with the notation "$n" in the FRAG\_ID, whereas n is the
number of the group. The group $0 is defined as a standard and always
contains the content of the complete MATCH expression. This means that
different FRAG\_IDs can be activated depending on MATCH.

Beispiel:

```
Textbausteine(
  Kuerzel(
    (MATCH "Abt.*" FRAG_ID "$0")
  )
)
```

This expression sees to it that all strings starting with "Abt" will be
regarded as text block identifiers. In order to resolve the respective
text blocks, a search for text fragments with FRAG\_IDs carrying the
same name is conducted. A valid text block identifier is therefore
"AbtKopf", for example, for which a search is conducted for the text
fragments "AbtKopf".

Please note:

The resulting FRAG\_ID has to follow the [syntax rules for keys and identifiers](Format_von_WollMux-Config-Dateien#Schl.C3.BCssel "wikilink").
FRAG\_IDs that do not meet these criteria are not resolved or not
resolved reliably.

Tastenkuerzel (shortcut keys)
=============================

In a Tastenkuerzel (shortcut key) section you can set a key combination
for one of the [WollMux dispatch commands](Schnittstellen_des_WollMux_f%C3%BCr_Experten#Die_Dispatch-Kommandos_des_WollMux "wikilink")
(i.e. wollmux:TextbausteinEinfuegen (Instert text block)). At WollMux
startup, all key combinations that have one of the [WollMux dispatch commands](Schnittstellen_des_WollMux_f%C3%BCr_Experten "wikilink")
assigned are cleared, and then re-assigned according to the
"Tastenkuerzel" section. There can be several such sections in
wollmux.conf; assignments in later Tastenkuerzel sections always take
precedence over those in earlier sections. For each of the [WollMux dispatch commands](Schnittstellen_des_WollMux_f%C3%BCr_Experten "wikilink")
several shortcuts can be assigned.

Example Tastenkuerzel section:

```
Tastenkuerzel(
   (SHORTCUT "<shortcut>" URL "<WollMux dispatch command>")
   (SHORTCUT "ctrl+t" URL "wollmux:TextbausteinEinfuegen") 
)
```

SHORTCUT "&lt;shortcut&gt;"
---------------------

A &lt;shortcut&gt; consists of the names of the keys to be pressed
simultaneously, joined by "+". Case is ignored. In LibreOffice yoou can
examine the shortcuts assignable under Tools&rarr;Customize&rarr;Keyboard.
Shortcuts that don't appear in the list can nonetheless be assigned, but
won't be visible in the list (i.e. alt+shift+ctrl+t or alt+\*).

You can use the following keys:

*One of, respectively,*

-   Digits from 0-9

*or*

-   Letters from a-z

*or*

-   Function keys from F1-F12

*or*

-   Special keys and symbols: Down, Up, Left, Right, Home, End, Page Up,
    Page Down, Insert, Esc, Tab, Backspace, Space, Insert, Delete, Plus,
    Minus ("-"), asterisk "\*", slash "/", period ".", comma ",", less
    than "&lt;", greater than "&gt;" and equals "=".

*optionally, combined with one or more of the following keys*

-   alt, shift and ctrl

Example:

`SHORTCUT "a+alt+shift"`

> **INFO** If you use a key or special symbol that requires Shift to enter
(for example "\*"), you need to enter "shift" in the shortcut assignment
also.

URL "&lt;WollMux dispatch command&gt;"
--------------------------------

The URL references one of the [WollMux dispatch commands](Schnittstellen_des_WollMux_f%C3%BCr_Experten#Die_Dispatch-Kommandos_des_WollMux "wikilink"),
i.e. wollmux:TextbausteinEinfuegen (insert text block).

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
`Datenquellen(

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

**NAME**: Gibt den Namen an, den die Datenquelle in OpenOffice haben soll. Man beachte, dass *nicht* automatisch eine WollMux-Datenquelle mit diesem Namen eingerichtet wird. Wird eine WollMux-Datenquelle benötigt, so muss zusätzlich zum *Registriere*-Abschnitt ein *Datenquelle*-Abschnitt mit [TYPE "ooo"](Konfigurationsdatei_wollmux.conf#TYPE_.22ooo.22 "wikilink") angelegt werden.

**URL**: Gibt die URL der .odb-Datei an. Relative URLs werden relativ zum [DEFAULT\_CONTEXT](Konfigurationsdatei_wollmux.conf#Der_DEFAULT_CONTEXT "wikilink") aufgelöst.

> **INFO** ODB-Datenbanken, die ihre Daten direkt in der ODB-Datei speichern, werden derzeit von OOo auf HTTP-Servern nicht richtig unterstützt. Sie lassen sich zwar registrieren, jedoch sind keine Zugriffe auf die enthaltenen Tabellen möglich. Andere Orte (z.B. Netzlaufwerk) sollten jedoch funktionieren. Schreibrechte des Benutzers auf die Datei sind nicht erforderlich. Andere Datenbanktypen sind von diesem Problem nach derzeitigem Kenntnisstand nicht betroffen.
REFRESH (optional): Ist bereits eine Datenquelle mit dem angegebenen Namen bei OpenOffice registriert, so wird diese Registrierung vom WollMux *nicht* überschrieben, außer das Attribut REFRESH ist vorhanden und auf "true" gesetzt.

<!-- -->
> **INFO** Bei file-URLs wird die Datei bei der Registrierung bereits geöffnet und falls dies fehlschlägt (z.B. weil die Datei nicht existiert) wird die Registrierung nicht durchgeführt. Bei HTTP-URLs erfolgt kein derartiger Zugriff. Die Datenbank wird unabhängig von der Existenz der Datei registriert. Ein Fehler tritt also erst bei einem versuchten Zugriff auf den Inhalt der Datenbank auf.

Datenquellen-Referenzen
-----------------------

Manche Datenquellen-Typen greifen auf bestehende Datenquellen zurück. In
diesen Fällen werden in der Datenquellen-Definition die entsprechenden
Datenquellen durch ihren Namen referenziert. Anders als bei
[Variablen](Konfigurationsdatei_wollmux.conf#Variablen "wikilink")
bezieht sich so eine Referenz *nicht* auf die letzte Datenquelle des
entsprechenden Namens in der gesamten *wollmux.conf*, sondern auf die
letzte, die *vor* der referenzierenden Datenquelle definiert wurde. Auf
diese Weise ist es möglich, eine Datenquelle zu definieren, die eine
Datenquelle des selben Namens referenziert. Das folgende Beispiel
verdeutlicht dies:

`Datenquellen(
\
`   # Definition von Datenquelle "Foo"
`  Datenquelle(  
`    NAME "Foo"   
`    TYPE "`<Typ1>`"
`    ...
`  )
\
`   # Re-Definition von Datenquelle "Foo" unter Bezugnahme auf die oben definierte
`   # Datenquelle des gleichen Namens vom Typ `<Typ1>`.
`  Datenquelle(
`    NAME "Foo"
`    TYPE "`<Typ2>`"
`    SOURCE "Foo"
`    ...
`  )
`)`

SENDER\_SOURCE
--------------

Der WollMux muss wissen, aus welcher Datenquelle er die Absenderdaten
für die Briefkopf-Erstellung beziehen soll. Zur Festlegung dieser
Datenquelle dient die SENDER\_SOURCE Direktive:

`SENDER_SOURCE "`<Name_der_Datenquelle>`"`

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

`DATASOURCE_TIMEOUT "`<Zeit in Millisekunden>`"`

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
FRAG\_IDs initialisiert, die auch durch das [Dokumentkommando
"overrideFrag"](Dokumentkommandos_des_WollMux#Das_Kommando_.22overrideFrag.22 "wikilink")
beeinflusst wird. Der Inhalt der angegebenen Spalte kann leer sein oder
aus einem oder mehreren Einträgen bestehen, die jeweils eine der beiden
folgenden Formen haben

`(FRAG_ID '`<alte_fragment_id>`' NEW_FRAG_ID '`<neue_fragment_id>`')
`(FRAG_ID '`<fragment_id>`')`

Zur Erläuterung der Funktionsweise siehe [Dokumentkommando
"overrideFrag"](Dokumentkommandos_des_WollMux#Das_Kommando_.22overrideFrag.22 "wikilink").
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

`AbsenderdatenSpaltenumsetzung(
`  PseudoSpalte1( `<WollMux-Funktion1>` )
`  PseudoSpalte2( `<WollMux-Funktion2>` )
`  ...
`)`

-   *AbsenderdatenSpaltenumsetzung*-Abschnitte müssen auf oberster Ebene
    in der wollmux.conf definiert werden, *nicht* innerhalb des
    *Datenquellen*-Abschnitts.
-   Über den Abschnitt werden Pseudo-Spalten definiert, die jedem
    Datensatz der
    [SENDER\_SOURCE](Konfigurationsdatei_wollmux.conf#SENDER_SOURCE "wikilink")
    hinzugefügt werden.
-   Wird in der Definition einer Pseudo-Spalte die Grundfunktion `VALUE`
    `"`<Spalte>`"` verwendet, so bezieht sich <Spalte> *immer* auf eine
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
    [Absenderdaten Bearbeiten
    Dialog](Konfigurationsdatei_wollmux.conf#Absenderdaten_Bearbeiten "wikilink")
    angepassten Werten statt, unmittelbar bevor ein Spaltenwert z.B.
    beim Auswerten des
    [insertValue-Dokumentkommandos](Dokumentkommandos_des_WollMux#Das_Kommando_.22insertValue.22 "wikilink")
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

` Datenquelle( 
`   NAME "`<Name_der_Datenquelle>`"
`   TYPE "ldap"
`   URL "`<url>`"
`   BASE_DN "`<dn>`"
`   OBJECT_CLASS "`<Klasse>`"
`   Spalten(
`     (DB_SPALTE "`<Spaltenname1>`" PATH "`<Pfad1>`")
`     (DB_SPALTE "`<Spaltenname2>`" PATH "`<Pfad2>`" OBJECT_CLASS "`<Klasse>`" LINE_SEPARATOR "`<sep>`")
`     ...
`   )
`   
`   Schluessel( "`<Name_von_Schluesselspalte1>`", "`<Name_von_Schluesselspalte2>`" ... )
` )`

#### URL "&lt;url&gt;"

Die URL unter der der LDAP-Server zu finden ist, z.B.

[`ldap://ldap01.muenchen.de:389`](ldap://ldap01.muenchen.de:389)

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
"<Klasse>" enthält. Beispiel:

`OBJECT_CLASS "lhmPerson"`

#### Spalten-Beschreibung

Da ein LDAP-Verzeichnis eine Baumstruktur besitzt, Datenquellen jedoch
immer eine Tabellenstruktur haben, muss in der Definition der
Datenquelle festgelegt werden, wie die Baumstruktur des Verzeichnisses
auf Tabellenspalten abzubilden ist. Diese Abbildung wird durch den
Abschnitt *Spalten* festgelegt, der folgende Struktur hat.

`Spalten(
`  (DB_SPALTE "`<Spaltenname1>`" PATH "`<Pfad1>`")
`  (DB_SPALTE "`<Spaltenname2>`" PATH "`<Pfad2>`")
`  ...
`)`

Es sind mehrere *Spalten*-Abschnitte erlaubt und auch mehrere Einträge
mit dem selben Spaltennamen. In diesem Fall gilt immer die letzte
Definition der Spalte. Eine Spaltendefinition besteht immer aus 2
Angaben.

##### DB\_SPALTE "&lt;Spaltenname&gt;"

<Spaltenname> bestimmt den Namen einer Spalte, die die Datenquelle zur
Verfügung stellen soll. Der Spaltenname muss der Konvention für
Bezeichner entsprechen, d.h. nur aus Ziffern, Buchstaben und Unterstrich
bestehen und nicht mit einer Ziffer beginnen.

##### PATH "&lt;Pfad&gt;"

Meist soll die Datenquelle bestimmte Attribute der über
[OBJECT\_CLASS](Konfigurationsdatei_wollmux.conf#OBJECT_CLASS_.22.3CKlasse.3E.22 "wikilink")
ausgewählten Objekte in den Spalten zur Verfügung stellen, manchmal
jedoch sind die benötigen Daten nicht direkt im entsprechenden Objekt zu
finden, sondern in Vorfahren dieses Objekts. Zum Beispiel sind Daten
über das Referat eines Mitarbeiters meist nicht als Attribute des
Mitarbeiter-Objektes verfügbar, sondern nur als Attribute des
Vorfahren-Knotens, der das Referat repräsentiert. Um auch damit umgehen
zu können wird der Inhalt einer Spalte nicht nur durch einen
Attributsnamen gegeben, sondern durch einen Pfad der folgenden Form

`PATH "`<Knoten>`:`<Attribut>`"`

Dabei bestimmt <Attribut> den Namen des Attributs das den Spaltenwert
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
Objektknoten keinen Vorfahren der entsprechenden Ebene n gibt, nämlich
dann, wenn der Knoten selbst von der Wurzel einen geringeren Abstand als
n hat. In diesem Fall gilt für den entsprechenden Datensatz der Wert der
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

Enthält die Spalte mehrzeilige Daten, so kann als <sep> ein [regulärer
Ausdruck](http://java.sun.com/j2se/1.4.2/docs/api/java/util/regex/Pattern.html)
angegeben werden, der beschreibt, an welchen Stellen sich Zeilenumbrüche
befinden. Zu beachten ist, dass das "%" Zeichen als "%%" geschrieben
werden muss (und ein doppeltes "%"-Zeichen als "%%%%"), entsprechend der
[Syntax von
WollMux-Config-Dateien](Format_von_WollMux-Config-Dateien "wikilink").

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

-   **Die gewählten Schlüsselspalten sollten jeden Datensatz eindeutig
    identifizieren**: Falls es mehrere Datensätze mit dem selben
    Schlüssel gibt (falls z.B. in einer Personendatenbank als Schlüssel
    nur der Nachname verwendet wird), so wird der WollMux beim
    Aktualisieren seiner Daten alle passenden Datensätze importieren.
    Auf die Persönliche Absenderliste bezogen, würde dies bedeuten, dass
    der Anwender plötzlich zusätzliche Einträge in seiner Liste hat, die
    er nicht haben möchte. Der Anwender könnte diese Einträge zwar aus
    seiner Liste löschen, sie würden jedoch mit jedem Neustart des
    WollMux wieder importiert, solange mindestens ein Eintrag mit dem
    gleichen Schlüssel in der Liste verbleibt.

<!-- -->

-   **Die gewählten Schlüsselspalten sollten keine häufig geänderten
    Werte enthalten**: Falls sich zu einem Datensatz der Wert in einer
    Schlüsselspalte (und damit der Schlüssel) ändert, so kann der
    WollMux den Datensatz nicht mehr aus der Datenquelle aktualisieren.
    Bezogen auf die Persönliche Absenderliste bedeutet dies, dass ein
    Eintrag dessen Datensatz seinen Schlüssel geändert hat, auf dem
    letzten Stand vor der Änderung verbleibt. Eine Änderung der
    Raumnummer im LDAP-Verzeichnis für die entsprechende Person würde
    dann z.B. nicht automatisch übernommen.

<!-- -->

-   **Schlüsselwerte sollten nicht zu verschiedenen Zeiten auf
    verschiedene Objekte passen**: Noch ungünstiger als der Fall, dass
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

`Datenquelle(
`  NAME "`<Name_der_WollMux_Datenquelle>`"
`  TYPE "ooo"
`  SOURCE "`<Name_der_in_OOo_registrierten_Datenquelle"
   TABLE "<Name_der_Tabelle_oder_Sicht>`"
`  USER "`<Benutzername>`"
`  PASSWORD "`<Passwort>`"
`  SQL_SYNTAX "`<Syntaxbezeichner>`"
`  Schema( "`<Name_von_Spalte1>`" "`<Name_von_Spalte2>`" ... )
`  Schluessel( "`<Name_von_Schluesselspalte1>`", "`<Name_von_Schluesselspalte2>`" ... )
`   # Wenn ein Schema()-Abschnitt angegeben ist, muss auch ein Schluessel-Abschnitt angegeben werden.
`)`

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
seinen Anfragen stellen soll. Als <Syntaxbezeichner> werden unterstützt:

*ansi*, *oracle*, *mysql*, *pervasivesql*

Die Angabe SQL\_SYNTAX ist optional. Wird sie weggelassen, so wird
*ansi* angenommen.

**Achtung:** Bei der Verwendung von Calc-Dateien als Datenquelle muss
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
[Schluessel-Abschnitt bei
LDAP-Datenquellen](Konfigurationsdatei_wollmux.conf#Schluessel-Definition "wikilink").

Wird der Schema-Abschnitt weggelassen (was jedoch nicht empfehlenswert
ist), so wird versucht, den Schlüssel ebenfalls aus der Datenbank
auszulesen. Es hängt von der Datenbank und der Art der Tabelle ab, ob
dies funktioniert oder nicht und sollte daher vermieden werden.

### TYPE "conf"

Eine Datenquelle des Typs "conf" bezieht ihre Daten aus einer Textdatei
im [Format von
WollMux-Config-Dateien](Format_von_WollMux-Config-Dateien "wikilink").
Die genaue Struktur des Inhalts wird weiter unten beschrieben. Die
Definition einer Conf-Datenquelle hat folgenden Aufbau:

` Datenquelle(
`   NAME "`<Name_der_Datenquelle>`"
`   TYPE "conf"
`   URL "`<url>`"
`   Schluessel( "`<Name_von_Schluesselspalte1>`", "`<Name_von_Schluesselspalte2>`" ... )
` )`

Mehrere Praxisbeispiele für Datenquellen finden sich
[hier](Datenquellensammlung "wikilink").

#### Schluessel-Definition

Der *Schluessel*-Abschnitt ist vollkommen analog zum
[Schluessel-Abschnitt bei
LDAP-Datenquellen](Konfigurationsdatei_wollmux.conf#Schluessel-Definition "wikilink").

#### URL "<url>"

Die <url> gibt die Datei an, in der die Daten der Datenquelle stehen.
Sie ist in
[URL-Notation](Format_von_WollMux-Config-Dateien#URLs "wikilink").
Relative URLs werden relativ zum
[DEFAULT\_CONTEXT](Konfigurationsdatei_wollmux.conf#Der_DEFAULT_CONTEXT "wikilink")
interpretiert. Der Aufbau der Datendatei wird im folgenden Abschnitt
beschrieben.

#### Aufbau der Datendatei

Zu jeder Conf-Datenquelle gehört eine Datendatei. Die Syntax dieser
Datei entspricht der [Syntax der
wollmux.conf](Format_von_WollMux-Config-Dateien "wikilink") und ihre
Struktur ist folgende:

`Schema(
`  "`<Spaltenname1>`", "`<Spaltenname2>`" ...
`)
\
`Daten(
`  (`<Datensatz1>`)
`  (`<Datensatz2>`)
`  ...
`)`

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

`("`<Spaltenwert1>`", "`<Spaltenwert2>`" ...)`

Die Werte werden den Spalten in der Reihenfolge zugeordnet, in der sie
im *Schema*-Abschnitt aufgeführt sind. Es ist erlaubt, weniger
Spaltenwerte anzugeben als es Spalten gibt. Die fehlenden Spaltenwerte
bleiben für den Datensatz unbelegt. Mehr Spaltenwerte anzugeben als das
Schema Spalten definiert, ist hingegen ein Fehler.

Ein *ungeordneter Datensatz* hat folgendes Format:

`(Spaltenname1 "`<Spaltenwert1>`"  Spaltenname2 "`<Spaltenwert2>`" ...)`

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

`Datenquelle(
`  NAME "`<Name_der_Datenquelle>`"
`  TYPE "union"
`  SOURCE1 "`<Name_Datenquelle1>`"
`  SOURCE2 "`<Name_Datenquelle2>`"
`)`

SOURCE1 und SOURCE2 geben die Datenquellen an, die vereinigt werden
sollen.

Anmerkungen:

-   Wenn in SOURCE1 und SOURCE2 Datensätze mit dem selben Schlüsselwert
    sind, so kann dies unerwünschte Folgen haben. Im Briefkopfsystem zum
    Beispiel würde das Hinzufügen eines der Datensätze zur persönlichen
    Absenderliste beim nächsten Neustart dazu führen, dass alle
    Datensätze aus beiden Datenquellen mit dem entsprechenden Schlüssel
    auf der Absenderliste sind.
-   Die Schemata beider Datenquellen müssen identisch sein.

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

`Datenquelle(
`  NAME "`<Name_der_Datenquelle>`"
`  TYPE "prefer"
`  SOURCE "`<Name_Datenquelle1>`"
`  OVER "`<Name_Datenquelle2>`"
`)`

SOURCE gibt die bevorzugte Datenquelle an und OVER die Datenquelle, die
die Anfragen beantworten soll. Die Schemata beider Datenquellen müssen
identisch sein.

### TYPE "schema"

Eine Datenquelle des Typs "schema" stellt die Datensätze einer anderen
Datenquelle mit geändertem Schema zur Verfügung. Sie erlaubt es, Spalten
umzubenennen, hinzuzufügen und zu entfernen. Sie wird wie folgt
definiert

`Datenquelle(
`  NAME "`<Name_der_Datenquelle>`"
`  TYPE "schema"
`  SOURCE "`<Name_der_Originaldatenquelle>`"
`  RENAME("`<UrsprünglicherSpaltenname1>`" "`<NeuerSpaltenname1>`")
`  RENAME("`<UrsprünglicherSpaltenname2>`" "`<NeuerSpaltenname2>`")
`  ...    
`  DROP("`<UrsprünglicherSpaltenname3>`" ...)
`  ...
`  ADD("`<NeuerSpaltenname3>`" ...)
`  ...
`)`

Die RENAMEs spezifizieren Umbenennungen von Spalten. In jedem
RENAME-Block steht ein paar aus einem alten und dem neuen Spaltennamen.

Die DROP-Abschnitte enthalten Namen von Spalten, die in der neuen
Datenquelle nicht mehr verfügbar sein sollen.

Die ADD-Abschnitte fügen dem Schema neue Spalten hinzu.

Anmerkungen:

-   Wird eine Spalte "A" umbenannt in "B", so ist eine evtl. vorher
    existierende Spalte "B" damit unerreichbar geworden (sofern sie
    nicht ebenfalls umbenannt wird).
-   Die Schlüssel der Datensätze ändern sich auch bei Umbenennung von
    Schlüsselspalten nicht.
-   Gibt es mehrere RENAMEs mit dem selben <NeuerSpaltennameX>, so gilt
    der letzte RENAME.
-   Gibt es mehrere RENAMEs mit dem selben <UrsprünglicherSpaltennameX>,
    so haben alle Bestand und es entstehen mehrere Alias-Namen für die
    selbe Spalte.
-   <UrsprünglicherSpaltennameX> bezieht sich immer auf
    die Originalspalten. Vorhergehende RENAMEs haben darauf
    keinen Einfluss. Deshalb ist es möglich 2 Spalten wie folgt zu
    vertauschen:

`RENAME("A" "B")
`RENAME("B" "A")`

-   Die Spaltennamen in DROP-Abschnitten beziehen sich immer auf die
    SOURCE-Datenquelle, nicht auf durch RENAME definierte neue Namen.
-   Unabhängig von der Reihenfolge in der RENAME und DROP in der
    Config-Datei stehen, hat RENAME immer Vorrang vor DROP, d.h.
    spezifiziert ein RENAME als <NeuerSpaltennameX> einen Namen, der
    auch in einem DROP-Abschnitt vorkommt, so wird die neue Datenquelle
    die Spalte <NeuerSpaltennameX> anbieten, trotz des DROPs.
-   Falls eine Spalte, die in einem ADD-Abschnitt angegeben wird,
    bereits in der Datenquelle existiert oder durch RENAME hinzugefügt
    wird, so hat das ADD keine Auswirkungen.
-   Falls eine Spalte, die in einem ADD-Abschnitt angegeben wird auch
    als <UrsprünglicherSpaltennameX> in einem RENAME auftaucht, so ist
    das Ergebnis, dass beide Spaltennamen Aliase für die selbe
    Spalte sind. Insbesondere fügt ADD in diesem Fall keine unbelegte
    Spalte hinzu.
-   ADD hat Vorrang vor DROP, d.h. spezifiziert ein ADD als
    <NeuerSpaltennameX> einen Namen, der auch in einem DROP-Abschnitt
    vorkommt, so wird die neue Datenquelle die Spalte
    <NeuerSpaltennameX> anbieten, trotz des DROPs.

### TYPE "funky"

Eine Datenquelle des Typs "funky" fügt einer anderen Datenquelle Spalten
hinzu, deren Werte durch beliebige
[WollMux-Funktionen](Konfigurationsdatei_wollmux.conf#Funktionen "wikilink")
aus den Ursprungsdaten berechnet werden. Sie wird wie folgt definiert

`Datenquelle(
`  NAME "`<Name_der_Datenquelle>`"
`  TYPE "funky"
`  SOURCE "`<Name_der_Originaldatenquelle>`"
\
`  Spaltenumsetzung(
`    NeueSpalte1( `<WollMux-Funktion1>` )
`    NeueSpalte2( `<WollMux-Funktion2>` )
`    ...
`  )
`)`

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

-   Wird in der Definition einer NeueSpalteX die Grundfunktion `VALUE`
    `"`<Spalte>`"` verwendet, so bezieht sich <Spalte> *immer* auf eine
    Spalte der Originaldaten, *niemals* auf eine NeueSpalteX.
    Insbesondere ist es also *nicht* möglich, neue Spalten unter
    Bezugnahme auf andere neue Spalten zu definieren.
-   Gibt es mehrere Definitionen für die selbe NeueSpalteX, so gilt nur
    die letzte. Insbesondere ist es *nicht* möglich, eine NeueSpalteX
    unter Bezugnahme auf eine vorherige Definition von NeueSpalteX
    zu definieren. Siehe hierzu auch den vorigen Punkt.
-   Hat eine NeueSpalteX den selben Namen wie eine SpalteX der
    Originaldaten, so wird die Original-Spalte verdeckt. `VALUE`
    `"SpalteX"` bezieht sich jedoch innerhalb der Definition der
    funky-Datenquelle weiterhin auf die Original-Spalte (siehe
    vorherige Punkte). Die Schlüssel der Datensätze bleiben jedoch auch
    dann unverändert, wenn Schlüsselspalten der Originaldatenquelle
    verdeckt werden.

ACHTUNG: Die funky-Datenquelle hat nur unvollständige Unterstützung für Suchanfragen auf transformierten Spalten. Wenn sie die inverse Transformation nicht berechnen kann, reicht sie die Suchanfrage einfach unverändert an die Originaldatenquelle weiter. Die bei einer Suche gelieferten Ergebnisse werden jedoch um die entsprechenden berechneten Spalten ergänzt. Wird aufgrund von Namensgleichheit eine SpalteX durch eine NeueSpalteX verdeckt, kann dies zu Diskrepanzen führen, wenn eine Suche sich auf SpalteX bezieht. Beispiel:

`Datenquelle(
`  NAME "personal"
`  TYPE "funky"
`  SOURCE "personal"
\
`  Spaltenumsetzung(
`    Nachname( "Anonymus" )
`  )
`)`

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

`Datenquelle(
`  NAME "`<Name_der_Datenquelle>`"
`  TYPE "attach"
`  SOURCE "`<Name_Datenquelle1>`"
`  ATTACH "`<Name_Datenquelle2>`"
`  MATCH("`<Spalte_aus_Datenquelle1>`" "`<Spalte_aus_Datenquelle2>`")
`  MATCH("`<Spalte_aus_Datenquelle1>`" "`<Spalte_aus_Datenquelle2>`")
`  ...
`)`

SOURCE gibt die Datenquelle an, die die Datensätze bestimmen soll,
ATTACH die Datenquelle, die die Ergänzungsspalten liefern soll. Die
MATCH-Blöcke enthalten jeweils einen Namen einer Spalte in Datenquelle
SOURCE und einen Namen einer Spalte in Datenquelle ATTACH. Für jeden
Datensatz aus SOURCE wird gesucht, ob es in Datenquelle ATTACH einen
Datensatz gibt, bei dem die Werte in den Spalten
<Spalte_aus_Datenquelle2> mit den Werten aus den Spalten
<Spalte_aus_Datenquelle1> des SOURCE-Datensatzes übereinstimmen. Falls
ja, so werden die Spalten des ATTACH-Datensatzes benutzt um den
SOURCE-Datensatz zu ergänzen.

Anmerkungen:

-   In der Ergebnisdatenquelle sind alle Spalten von SOURCE unter ihrem
    ursprünglichen Namen, alle Spalten von ATTACH unter
    "<Name_Datenquelle2> konkateniert mit "\_\_" (Doppel-Unterstrich)
    konkateniert mit dem ursprünglichen ATTACH-Spaltennamen zu finden.
    Falls ein so generierter Name mit einem Spaltennamen aus SOURCE
    kollidiert gibt dies einen Fehler. Dies erfordert einen weiteren
    Datenquellen-Typ vom type schema um diese Ungleichheit aufzulösen.
-   Falls es zu einem SOURCE-Datensatz keinen passenden ATTACH-Datensatz
    gibt, so werden für diesen Datensatz die
    "<Name_Datenquelle2>\_\_"-Spalten als unbelegt behandelt.
    Insbesondere führt diese also nicht dazu, dass ein SOURCE-Datensatz
    verschwindet (wie es bei einem normalen Datenbank-Join der
    Fall wäre).
-   Falls es zu einem SOURCE-Datensatz mehrere ATTACH-Datensätze gibt,
    so wird einer davon (auf unspezifizierte Weise) ausgewählt.
    Insbesondere führt es *nicht* dazu, dass aus einem SOURCE-Datensatz
    mehrere Datensätze entstehen (wie es bei einem normalen
    Datenbank-Join der Fall wäre).
-   Die Schlüssel der Ergebnisdatensätze bleiben die Schlüssel aus
    SOURCE und werden nicht kombiniert aus SOURCE und ATTACH.

### TYPE "overlay"

Eine Datenquelle des Typs "overlay" wird verwendet, um Datensätze aus
einer Datenquelle um Spalten aus einer anderen Datenquelle zu ergänzen
oder um Spaltenwerte einer Datenquelle durch Werte einer gleichnamigen
Spalte einer anderen Datenquelle zu ersetzen. Eine "overlay" Datenquelle
ist sehr ähnlich zu einer "attach" Datenquelle. Im Einzelfall muss
geprüft werden, welcher Type für das entsprechende Problem besser passt.
Eine "overlay" Datenquelle wird wie folgt definiert:

`Datenquelle(
`  NAME "`<Name_der_Datenquelle>`"
`  TYPE "overlay"
`  SOURCE "`<Name_Datenquelle1>`"
`  OVERLAY "`<Name_Datenquelle2>`"
`  MODE "`<Modus>`"   # so, os, So, oS, sO, Os, SO, OS
`  MATCH("`<Spalte_aus_Datenquelle1>`" "`<Spalte_aus_Datenquelle2>`")
`  MATCH("`<Spalte_aus_Datenquelle1>`" "`<Spalte_aus_Datenquelle2>`")
`  ...
`)`

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

so: Der OVERLAY-Wert wird verwendet, außer es ist der leere String oder unbelegt. In letzteren Fällen wird der SOURCE-Wert verwendet.\
sO: Der OVERLAY-Wert wird verwendet, außer er ist unbelegt. In letzterem Fall wird der SOURCE-Wert verwendet. Man beachte, dass ein leerer String *nicht* als "unbelegt" zählt.\
So: gleich wie "so"\
SO: gleich wie "sO"\
os: Der SOURCE-Wert wird verwendet, außer es ist der leere String oder unbelegt. In letzteren Fällen wird der OVERLAY-Wert verwendet.\
oS: Der SOURCE-Wert wird verwendet, außer er ist unbelegt. In letzterem Fall wird der OVERLAY-Wert verwendet. Man beachte, dass ein leerer String *nicht* als "unbelegt" zählt.\
Os: gleich wie "os"\
OS: gleich wie "oS"

Man kann sich das Ganze vorstellen als transparente Folien, die in der
Reihenfolge der Buchstaben im <Modus> übereinandergelegt werden. Dabei
steht "S" für SOURCE und "O" für OVERLAY. Ein Kleinbuchstabe gibt
jeweils an, dass leere Strings "durchsichtig" sind. Ein Großbuchstabe
gibt an, dass leere Strings "undurchsichtig" sind ("weiße Fläche").

Anmerkungen:

-   Falls es zu einem SOURCE-Datensatz keinen passenden
    OVERLAY-Datensatz gibt, so werden für diesen Datensatz die
    OVERLAY-Spalten als unbelegt behandelt. Insbesondere führt diese
    also *nicht* dazu, dass ein SOURCE-Datensatz verschwindet (wie es
    bei einem normalen Datenbank-Join der Fall wäre).
-   Falls es zu einem SOURCE-Datensatz mehrere OVERLAY-Datensätze gibt,
    so wird einer davon (auf unspezifizierte Weise) ausgewählt.
    Insbesondere führt es *nicht* dazu, dass aus einem SOURCE-Datensatz
    mehrere Datensätze entstehen (wie es bei einem normalen
    Datenbank-Join der Fall wäre).
-   Die Schlüssel der Ergebnisdatensätze bleiben die Schlüssel aus
    SOURCE und werden *nicht* kombiniert aus SOURCE und OVERLAY.

Initialisierung der persoenlichen Absenderliste
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

`PersoenlicheAbsenderlisteInitialisierung(
`  Suchstrategie(
\
`   # Benutzernamen haben auf dem Basisclient analog zu den Mailadressen
`   # der LHM in der Regel die Form vorname.nachname. Wird also an den
`   # Benutzernamen der Zusatz "@muenchen.de" angehängt, so kann der Name
`   # als Mailadresse interpretiert werden. Die Suche nutzt genau diese
`   # Möglichkeit aus.
`   BY_JAVA_PROPERTY(Mail "${user.name}@muenchen.de")
\
`   # Unter Extras->Optionen->OpenOffice.org->Benutzerdaten können in
`   # OpenOffice Benutzerdaten hinterlegt werden. In dieser Regel wird
`   # nach der Kombination Vorname/Nachname gesucht, wobei die entsprechenden
`   # Felder im OOo_USER_PROFILE "givenname" und "sn" heissen.
`   BY_OOO_USER_PROFILE(Vorname "${givenname}" Nachname "${sn}")
\
`  )
`)`

Ist in der Konfigurationsdatei keine Suchstrategie definiert, so wird
automatisch folgende Standardsuchstrategie verwendet:

`PersoenlicheAbsenderlisteInitialisierung(
`  Suchstrategie(
`   BY_OOO_USER_PROFILE(Vorname "${givenname}" Nachname "${sn}")
`  )
`)`

Der Abschnitt hat folgenden Aufbau:

`PersoenlicheAbsenderlisteInitialisierung(
`  Suchstrategie(
\
`   `<Suchanfrage1>\
`   `<Suchanfrage2>\
`   ...
`   `<SuchanfrageN>` 
\
`  )
`)`

<Suchanfrage>:

<Suchanfrage> beschreibt eine Suchanfrage, die an die durch
SENDER\_SOURCE definierte Datenquelle abgeschickt wird. Jede Suchanfrage
kann gefundene Datensätze zurückliefern, muss aber nicht. Wird bei einer
Suchanfrage kein Datensatz gefunden, so wird mit der nächsten
Suchanfrage fortgefahren. Werden über eine Suchanfrage Datensätze
gefunden, so werden diese Datensätze in die Persönliche Absenderliste
übertragen und die Suche beendet.

Eine Suchanfrage <Suchanfrage> ist dabei wie folgt aufgebaut:

<BY_QUELLE>`(`<Spaltenname>` '`<Wert>`')`

bzw.

<BY_QUELLE>`(`<Spaltenname1>` '`<Wert1>`' `<Spaltenname2>` '`<Wert2>`')`

<Spaltenname>: Beschreibt den Name der Spalte in der durch SENDER\_SOURCE beschriebenen Datenquelle, in der nach dem Wert <Wert> gesucht werden soll. Pro Sucheintrag können zwei Spaltennamen angegeben werden, die bei der Suche mit UND verknüpft werden.\
<Wert>: Beschreibt den Wert nach dem in der Spalte <Spaltenname> gesucht werden soll. Der Wert darf Variablen in der Form "\${variablenname}" enthalten (z.B. "\${user.name}@muenchen.de"). Vor der Suche wird die Variable aus einer anderen, durch <BY_QUELLE> beschriebenen Datenquelle ausgelesen.\
<BY_QUELLE>: Beschreibt die Datenquelle die für die Auflösung der Variablen aus <Wert> herangezogen werden sollen.

Folgende Quellen stehen dabei zur Verfügung:

### Die Quelle BY\_JAVA\_PROPERTY

Die Quelle BY\_JAVA\_PROPERTY verwendet für die Auflösung der in <Wert>
enthaltenen Variablen die Java-Methode System.getProperty(key).

Beispiel: Die Variable "\${user.name}" enthält den Benutzernamen des aktuell angemeldeten Benutzers (z.B. "christoph.lutz" auf dem Linux Basisclient oder "lut" unter Windows).

Unter
\[<http://java.sun.com/j2se/1.5.0/docs/api/java/lang/System.html#getProperties>()
<http://java.sun.com/j2se/1.5.0/docs/api/java/lang/System.html#getProperties>()\]
befindet sich eine Liste aller Java-Properties, die standardmäßig in
Java verfügbar sind. Systemadministratoren können zusätzlich auch eigene
Properties definieren.

### Die Quelle BY\_OOO\_USER\_PROFILE

Die Quelle BY\_OOO\_USER\_PROFILE verwendet für die Auflösung der in
<Wert> enthaltenen Variablen die Werte, die in OpenOffice.org über
Extras-&gt;Optionen-&gt;OpenOffice.org-&gt;Benutzerdaten eingegeben
werden können.

Beispiel: Die Variable "\${givenname}" enthält den Vornamen der im Feld "Vorname" eingetragen wurde (z.B. "Christoph").

Folgende Variablen stehen dabei zur Verfügung:

`c: `<Land/Region>\
`facsimiletelephonenumber: `<Fax>\
`givenname: `<Vorname>\
`homephone: <Tel. (Privat)>
`initials: `<kuerzel>\
`l: `<Ort>\
`mail: `<E-Mail>\
`o: `<Firma>\
`position: `<Position>\
`postalcode: `<PLZ>\
`sn: `<Nachname>\
`street: `<Straße>\
`telephonenumber: <Tel. (Geschäftlich)>
`title: `<Titel>

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

`Menueleiste(
`     (LABEL "Standard" TYPE "menu" MENU "am_1_Standard" HOTKEY "S")
`     (LABEL "Extras" TYPE "menu" MENU "am_4_eXtras" HOTKEY "X")
`)`

Der Abschnitt Menueleiste darf in der Konfigurationsdatei mehrfach
auftreten. Die WollMux-Leiste verwendet jedoch nur den zuletzt
definierten Abschnitt. Mit diesem Mechanismus kann der Abschnitt leicht
redefiniert werden. Sie können den Mechanismus verwenden, um das
standardmässig eingestellten Menüs "Standard" und "Extras" zu löschen,
umzubenennen oder ein weitere Menü hinzuzufügen.

Der Menueleiste-Abschnitt darf mehrere Einträge enthalten, die in der
gegebenen Reihenfolge im Menü angezeigt werden. Jeder Eintrag richtet
sich nach dem unter
[Menue-Elemente](Konfigurationsdatei_wollmux.conf#Menue-Elemente "wikilink")
beschriebenen Schema. Dort sind auch die Attribute **LABEL**,
**HOTKEY**, **TYPE** und **MENUE** beschrieben.

Der Abschnitt Symbolleisten bzw. Briefkopfleiste
------------------------------------------------

Der Abschnitt Symbolleisten beschreibt den Inhalt der in der WollMuxBar
dargestellten Symbolleiste. Hier ist eine Beispiel für eine
Symbolleisten-Definition:

`Symbolleisten(
`  Briefkopfleiste(
`      (LABEL "Absender auswählen" TYPE "senderbox")
`      (LABEL "Externer Briefkopf" FRAG_ID "externerBriefkopf" HOTKEY "X" ACTION "openTemplate" TYPE "button" )
`      (TYPE "separator")
`      (LABEL "Interner Briefkopf" FRAG_ID "internerBriefkopf" HOTKEY "I" ACTION "openTemplate" TYPE "button" )
`      (TYPE "separator")
`      (LABEL "Kurzmitteilung"  FRAG_ID "kurzmitteilung" HOTKEY "K" ACTION "openTemplate" TYPE "button" )
`      (TYPE "separator")
`      (LABEL "Fax-Vorlage"        FRAG_ID "faxVorlage" HOTKEY "F" ACTION "openTemplate" TYPE "button" )
`  )
`)`

Der Abschnitt Symbolleisten/Briefkopfleiste darf öfters in der
Konfigurationsdatei vorkommen. Auch hier gilt die Regel: Der zuletzt
definierte Eintrag gewinnt. So können Sie den vorgegebenen
Symbolleisten/Briefkopfleiste-Abschnitt redefinieren und eigene
Schaltflächen hinzufügen oder bestehende Schaltflächen entfernen. Bei
der Redefinition wird stets der gesamte Abschnitt Symbolleisten durch
den neuen Abschnitt ersetzt.

Die Menue-Elemente innerhalb der Symbolleistendefinition richten sich
nach dem unter
[Menue-Elemente](Konfigurationsdatei_wollmux.conf#Menue-Elemente "wikilink")
beschriebenen Schema. Dort sind auch die Attribute **LABEL**,
**HOTKEY**, **TYPE** und **MENU** beschrieben.

Der Abschnitt Menues
--------------------

Der Abschnitt Menues beschreibt alle Untermenues, die der WollMuxBar
bekannt sein sollen. Eine Beispieldefinition sieht wie folgt aus:

`Menues(
`  LHMVorlagen( 
`    Elemente(
`       (LABEL "Briefköpfe" TYPE "menu" MENU "Briefkoepfe" HOTKEY "B" CONF_ID "bk")
`       (LABEL "Favoriten" TYPE "menu" MENU "favoriten" FAVO "1")
`       (TYPE "separator")
`       (LABEL "Absenderdaten" TYPE "button" HOTKEY "A" ACTION "absenderAuswaehlen")
`    )
`  )
\
`  Briefkoepfe( 
`    Elemente(
`       (LABEL "Externer Briefkopf"  FRAG_ID "externerBriefkopf" HOTKEY "X" ACTION "openTemplate" TYPE "button" )
`       (LABEL "Interner Briefkopf"  FRAG_ID "internerBriefkopf" HOTKEY "I" ACTION "openTemplate" TYPE "button" )
`       (LABEL "Kurzmitteilung"  FRAG_ID "kurzmitteilung" HOTKEY "K" ACTION "openTemplate" TYPE "button" )
`       (LABEL "Fax-Vorlage"             FRAG_ID "faxVorlage" HOTKEY "F" ACTION "openTemplate" TYPE "button" )
`    )
`  )  
`)`

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
[Menue-Elemente](Konfigurationsdatei_wollmux.conf#Menue-Elemente "wikilink")
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

-   **button**: Beschreibt ein einfaches Menue-Element, das eine Aktion
    hervorruft, wenn darauf geklickt wird.
-   **menu**: Beschreibt ein Untermenue, das beim Klicken auf das
    Menue-Element aufgeklappt werden soll.
-   **separator**: Beschreibt einen Trennstrich innerhalb eines Menues
    oder einer Symbolleiste.
-   **glue**: Ist ein unsichtbares Element, das dazu dient, Leerraum
    einzufügen (und dadurch Links- bzw. Rechtsbündigkeit zu erreichen).
-   **senderbox**: Beschreibt die ComboBox "Absender-Auswählen", die die
    Liste aller in der persönlichen Absenderliste enthaltenen
    Absender zeigt.
-   **searchbox**: Beschreibt ein Such-Eingabefeld, mit dem die Elemente
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
das Menü vom [Menü-Manager](WollMuxBar#Men.C3.BC-Manager "wikilink") als
Favoriten-Menü behandelt. FAVO "0" ist das selbe wie FAVO wegzulassen.

#### Das Attribut ACTION

Das Attribut ACTION beschreibt die Aktion, die beim Klick auf ein
einfaches Menue-Element (mit dem Typ "button") ausgeführt werden soll.

Derzeit sind folgende Aktionen möglich:

-   *openTemplate*: Öffnet ein definiertes Textfragment als
    neue Dokumentvorlage. Erfordert die Angabe des Attributs FRAG\_ID.
-   *openDocument*: Öffnet ein definiertes Textfragment als
    Dokument, d.h. die Datei wird direkt zum Bearbeiten geöffnet, ohne
    dass ein neues Dokument "UnbenanntX" angelegt wird. Erfordert die
    Angabe des Attributs FRAG\_ID.
-   *openExt*: Öffnet eine Datei oder URL mit einer externen Anwendung.
    Erfordert die Angabe des Attributs EXT, das die externe Anwendung
    identifiziert (typischerweise die Dateierweiterung) sowie des
    Attributs URL, das die zu öffnende URL angibt. Zur korrekten
    Funktionsweise ist ein Eintrag für die externe Anwendung im
    Abschnitt
    [ExterneAnwendungen](Konfigurationsdatei_wollmux.conf#ExterneAnwendungen "wikilink")
    erforderlich.\
    In der URL kann die Variable `${user.home}` verwendet werden. Diese
    wird ersetzt durch die mit "file:" beginnende URL des
    Home-Verzeichnisses (unter Windows `C:\Dokumente` `und`
    `Einstellungen\`<Benutzer>, unter Linux `/home/`<Benutzer>).
-   *open*: Erfordert die Angabe eines Elements OPEN, dessen Inhalt
    Daten im selben Format wie für [das Dispatch-Kommando
    wollmux:Open](Schnittstellen_des_WollMux_f%C3%BCr_Experten#wollmux:Open "wikilink") sind.
    Der Benutzer bekommt einen Auswahldialog mit je einem Eintrag für
    jedes Element des *Labels*-Abschnitts. In diesem Dialog kann der
    Benutzer auswählen, welche Vorlagen/Dokumente gemeinsam geöffnet
    werden sollen (Multi-Form).
-   *absenderAuswaehlen*: Öffnet das Dialogfenster "Absender Auswählen".
-   *dumpInfo*: erzeugt eine Datei \$HOME/.wollmux/dump<DatumUndZeit>,
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
    WollMux von Systemadministratoren verwendet werden. **Hinweis:**
    Trotz des martialischen Namens kann dieser Befehl keine hängenden
    OpenOffice.org Prozesse beenden.
-   *about*: Zeigt einen Dialog, der wichtige Versionsinformationen zum
    aktuell installierten WollMux, zur WollMuxBar und zur verwendeten
    Konfiguration enthält.
-   *menuManager*: Ruft den
    [Menü-Manager](WollMuxBar#Men.C3.BC-Manager "wikilink") auf. Mit
    diesem kann die Menüstruktur der WollMuxBar bearbeitet werden. Unter
    anderem können Benutzer dadurch ihr Favoriten-Menü pflegen.
-   *options*: Ruft den
    [Optionen-Dialog](WollMuxBar#Optionen-Dialog "wikilink") der
    WollMuxBar auf. Über diesen kann unter anderem das
    [Fensterverhalten](Konfigurationsdatei_wollmux.conf#WollMuxBar-Fenster "wikilink")
    eingestellt und die aktiven Menügruppen gewählt werden.

#### Das Attribut EXT

Das Attribut EXT muss in Verbindung mit der Aktion "**openExt**"
angegeben werden. Es identifiziert den Eintrag im Abschnitt
[ExterneAnwendungen](Konfigurationsdatei_wollmux.conf#ExterneAnwendungen "wikilink"),
der zum Öffnen der URL herangezogen werden soll.

#### Das Attribut URL

Das Attribut URL muss in Verbindung mit der Aktion "**openExt**"
angegeben werden. Es gibt an, welche URL der externen Anwendung als
Argument übergeben werden soll, bzw. von welcher URL Daten in eine
temporäre Datei heruntergeladen werden sollen, deren Pfad dann an die
externe Anwendung übergeben wird. Nähere Informationen finden sich bei
der Beschreibung des Abschnitts
[ExterneAnwendungen](Konfigurationsdatei_wollmux.conf#ExterneAnwendungen "wikilink").

#### Das Attribut FRAG\_ID

Das Attribut FRAG\_ID muss in Verbindung mit den Aktionen
"**openTemplate**" und "**openDocument**" angegeben werden. FRAG\_ID
enthält dabei die ID des Textfragments, welches im
[Textfragmente-Abschnitt](Konfigurationsdatei_wollmux.conf#Textfragmente "wikilink")
der Konfigurationsdatei definiert sein muss.

##### Liste mit FRAG\_ID-Attributen

Manchmal ist es wünschenswert, die Inhalte zweier Textfragmente zusammen
zu mischen. Um das zu erreichen, können Sie in einer
Element-Beschreibung mehrere FRAG\_ID-Attribute angeben. Dies sieht z.B.
wie folgt aus:

`(LABEL "Baugenehmigung (Auf Basis des externen Briefkopfs)" HOTKEY "F" ACTION "openTemplate" TYPE "button"
` `**`FRAG_ID` `"externerBriefkopf"` `FRAG_ID` `"Baugenehmigung"`
`FRAG_ID` `"...noch_mehr_fragmente..."`**`)`

Beim Klick auf den so definierten Button wird zunächst das erste
Fragment der FRAG\_ID-Liste (im Beispiel "externerBriefkopf") als
Vorlage geöffnet. Anschließend führt der WollMux alle in der Vorlage
enthaltenen
[Dokumentkommandos](Dokumentkommandos_des_WollMux "wikilink") aus.
Enthält die Vorlage das Dokumentkommando
[insertContent](Dokumentkommandos_des_WollMux#Das_Kommando_"insertContent" "wikilink"),
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
Menügruppen werden über den [Abschnitt
WollMuxBarKonfigurationen](Konfigurationsdatei_wollmux.conf#Der_Abschnitt_WollMuxBarKonfigurationen "wikilink")
bzw. über den [Optionen-Dialog](WollMuxBar#Optionen-Dialog "wikilink")
aktiviert.

Hinweis: Das Attribut CONF\_ID kann bei dem selben Element mehrfach vorkommen und sowohl ein einzelner String als auch eine Liste sein. Alle CONF\_IDs werden zu einer Liste vereinigt. Damit das Element angezeigt wird reicht es aus, wenn eine einzige CONF\_ID aus dieser Liste unter den aktiven Menügruppen ist.

Der Abschnitt WollMuxBarKonfigurationen
---------------------------------------

Der Abschnitt WollMuxBarKonfigurationen definiert die Menü-Gruppen, die
der Benutzer im [Optionen-Dialog](WollMuxBar#Optionen-Dialog "wikilink")
aktivieren und deaktivieren kann. Eine Beispieldefinition sieht wie
folgt aus:

`WollMuxBarKonfigurationen(
`  Labels(
`    (CONF_ID "bienchen" LABEL "Vorlagen für fleißige Bienchen")
`    (CONF_ID "limux"    LABEL "Vorlagen für fleißige Pinguine")
`  )
`  Aktiv("bienchen", "limux")
`)`

-   Im Unterabschnitt "Labels" werden die verfügbaren CONF\_IDs
    deklariert und mit Labels versehen. Die Labels werden für die
    Anzeige im Options-Dialog verwendet.
-   Alle WollMuxBarKonfigurationen/Labels-Abschnitte werden vereinigt.
    Die jeweils letzte Definition eines Labels für eine ID gewinnt.
-   Der Unterabschnitt Labels kann über den
    [Menü-Manager](WollMuxBar#Men.C3.BC-Manager "wikilink")
    bearbeitet werden.
-   Der Unterabschnitt "Aktiv" bestimmt die Menügruppen, deren Elemente
    angezeigt werden. Es können sowohl Menüs als auch Buttons und andere
    Menüeinträge mit entsprechenden CONF\_ID-Attributen versehen werden.
    Alle Menüs, Untermenüs, Buttons und sonstige Menüeinträge mit einer
    CONF\_ID, die *nicht* im Abschnitt WollMuxBarKonfigurationen/Aktiv
    aufgelistet sind werden nicht angezeigt.
-   Es wird nur der letzte
    WollMuxBarKonfigurationen/Aktiv-Abschnitt verwendet.
-   Die aktiven CONF\_IDs können über den
    [Optionen-Dialog](WollMuxBar#Optionen-Dialog "wikilink")
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

`Fenster(
`  WollMuxBar(
`    TITLE "Vorlagen und Formulare"
`    MODE "UpAndAway"
`    TRAYICON "None"
`    X "0"
`    Y "0"
`    WIDTH "1280" 
`    HEIGHT "82"
`  )
`)`

### TITLE

Legt den Fenstertitel fest.

### MODE

Legt fest, wie sich die WollMuxBar verhalten soll, wenn sie den
Eingabefokus verliert (d.h. wenn ein anderes Fenster in den Vordergrund
kommt). Folgende Modi stehen zur Verfügung:

-   *UpAndAway*: Die Leiste erscheint am oberen Bildschirmrand. Wenn der
    Mauscursor die Leiste verlässt, schrumpft sie zu einem
    kleinen Strich. Wird dieser Strich von der Maus berührt, so wird die
    Leiste wieder groß.
-   *AlwaysOnTop*: Die WollMuxBar schwebt über allen anderen Fenstern
    und wird nie verdeckt.
-   *Window*: Die WollMuxBar verhält sich wie ein ganz normales
    Fenster, d.h. sie kann ganz oder teilweise durch andere Fenster
    verdeckt werden.
-   *Minimize*: Wenn die WollMuxBar den Fokus verliert minimiert sie
    sich automatisch. Bei Klick auf den entsprechenden Button in der
    Taskleiste am unteren Rand des Bildschirms erscheint sie wieder.

### TRAYICON

*Verfügbar ab WollMux 11.10.*\
Legt fest, ob für die WollMuxBar ein Tray-Icon auf der System Tray (auch
bekannt als "Notification Area" - gemeint ist der Bereich üblicherweise
ganz rechts auf der Taskbar neben der Uhrzeitanzeige) angezeigt werden
soll und welche Funktionalitäten dieses Tray-Icon bereit stellt:

-   *None*: Kein Tray-Icon für die WollMuxBar. Dies ist
    die Standard-Einstellung.
-   *Iconify*: Die WollMuxBar wird beim Minimieren auf das Tray-Icon
    ikonifiziert (d.h. es ist dann kein Programmfenster für die
    WollMuxBar und kein Eintrag auf der Taskbar mehr zu sehen). Die
    WollMuxBar kann wieder hergestellt werden, indem mit der linken
    Maustaste auf das Tray-Icon geklickt wird. Bei einem Fenstermodus
    wie *UpAndAway* und *Minimize*, bei dem die WollMuxBar automatisch
    minimiert bzw. auf einen kleinen Strich verkleinert wird, wird die
    WollMuxBar nun entsprechend automatisch ikonifiziert.
-   *Popup*: Durch Mittel- oder Rechtsklick auf das Tray-Icon kann ein
    Kontextmenü aufgerufen werden, das alle Elemente der Menüleiste der
    WollMuxBar enthält. Dieses Kontextmenü kann als bequemer Shortcut
    zum Aufrufen von Vorlagen verwendet werden ohne dass die eigentliche
    WollMuxBar angezeigt werden muss.
-   *IconifyAndPopup*: Kombiniert die Eigenschaften der Tray-Icon-Modi
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

`Fenster(
`  Textdokument(
`    X "0"
`    Y "40"
`    ZOOM "PageWidthExact"
`  )
`)`

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

### ZOOM '<zoomwert>'

Über die ZOOM-Angabe kann der Maßstab festgelegt werden, mit dem
Writer-Fenster standardmäßig dargestellt werden. Für den *<zoomwert>*
sind folgende Werte möglich, die sich genauso verhalten wie die
entsprechenden Einstellungen, die unter "Ansicht-&gt;Maßstab" gesetzt
werden können:

-   Eine Prozentangabe: Über die Angabe einer ganzzahligen Prozentzahl
    (ohne Prozentzeichen) wird ein fester Zoomfaktor vorgeben.
-   **PageWidth**: Mit dem Zoomwert "PageWidth" wird die Seite so im
    Fenster ausgerichtet, dass sie zwischen dem linken und dem rechten
    Seitenrand der Breite nach vollständig dargestellt werden kann. Über
    einen zusätzlichen sichtbaren Freiraum zwischen dem Fenster und den
    Seitenrändern wird die Seite zusätzlich optisch hervorgehoben. Im
    Regelfall ist mit dieser Einstellung die Seite der Länge nach nicht
    vollständig sichtbar.
-   **PageWidthExact**: Der Zoomwert "PageWidthExact" verhält sich wie
    "PageWidth", nur dass hier der Freiraum zur optischen Hervorhebung
    der Seite verschwindet und die Seite zwischen dem linken und dem
    rechten Seitenrand exakt im Fenster dargestellt wird.
-   **Optimal**: Der Zoomwert "Optimal" verhält sich wie "PageWidth",
    allerdings orientiert sich die Ausrichtung an Stelle des linken und
    rechten Seitenrands am linken und rechten Rand des
    sichtbaren Textbereiches. Der sichtbare Textbereich wird damit in
    der maximalen möglichen Größe im Fenster dargestellt, so dass alle
    wichtigen Elemente des Dokuments angezeigt werden können ohne nach
    links oder rechts scrollen zu müssen.
-   **EntirePage**: Die Seite wird vollständig im entsprechenden
    Fenster angezeigt. Allerdings leidet in diesem Zustand auch die
    Lesbarkeit der Schrift.

Formular-Fenster (Der Abschnitt Formular)
-----------------------------------------

Die Eigenschaften von WollMux-Formularfenstern lassen sich über den
Abschnitt *Formular* festlegen.

`Fenster(
`  Formular(
`    ZOOM "55"
`    Y "96"
`    WIDTH "400"
`    HEIGHT "600"
`  )
`)`

### ZOOM

Die ZOOM Angabe spezifiziert den Zoom-Faktor des neben der Formularmaske
dargestellten Writer-Fensters. Das Attribut verhält sich wie das
[gleichnamige Attribut des
"Textdokumente"-Abschnitts](Konfigurationsdatei_wollmux.conf#ZOOM_.27.3Czoomwert.3E.27 "wikilink").

### X, Y

Bestimmt die Positionierung der Eingabemaske. Erlaubt sind folgende
Angaben:

-   *<Zahlenwert>*: gibt die genaue Position in Pixeln an, gemessen von
    der oberen linken Ecke (0,0) des Bildschirms.
-   *center*: Die Eingabemaske wird so positioniert, dass ihre Mitte mit
    der Mitte der X bzw. Y-Achse zusammenfällt.
-   *min*: Fenster wird ganz oben bzw. ganz links positioniert.
-   *max*: Fenster wird ganz unten bzw. ganz rechts positioniert.
-   *auto*: Koordinate automatisch bestimmen. Dies ist das
    Standardverhalten, wenn überhaupt keine X bzw. Y Angabe
    vorhanden ist.

### WIDTH, HEIGHT

Gibt die Dimensionen der Eingabemaske an. Folgende Angaben sind
zulässig:

-   *<Zahlenwert>*: Gibt die Breite/Höhe in Pixeln an.
-   *max*: Die Breite/Höhe wird so groß wie möglich.
-   *auto*: Dimension automatisch bestimmen. Dies ist das
    Standardverhalten, wenn überhaupt keine WIDTH bzw. HEIGHT Angabe
    vorhanden ist.

Funktionen
==========

Der WollMux verwendet an verschiedenen Stellen Funktionen, z.B. als
Plausibilitätsprüfungen für Formularfelder. Funktionen, die in der
wollmux.conf im Abschnitt *Funktionen* definiert werden sind global
verfügbar.

`Funktionen(
`  AnredeText(EXTERN(URL "vnd.sun.star.script:WollMux.Trafo.MannOderFrau?language=Basic&location=application" 
`       PARAMS("Anrede", "SuffixWeibl", "SuffixMaennl")))
\
`  AnredeText(EXTERN(URL "java:de.muenchen.allg.itd51.wollmux.func.Standard.zahlenBereich" 
`       PARAMS("wert", "min", "max")))
\
`  IstZahl(MATCH(VALUE('Argument'), "[0-9]+"))
`)`

**Bemerkungen:**

-   Jeder Eintrag des Abschnitts besteht aus einem Funktionsbezeichner
    gefolgt von der eigentlichen Funktionsdefinition eingeschlossen in
    Klammern
-   Funktionen können redefiniert werden.
-   Innerhalb der Definition einer Funktion *func* gilt noch eine evtl.
    vorhandene vorhergehende Funktionsdefinition für *func*, d.h.
    Rekursion ist nicht möglich, jedoch das Redefinieren einer Funktion
    unter Bezugnahme auf die vorherige Definition.
-   Gibt es mehrere *Funktionen*-Abschnitte in der wollmux.conf, so
    werden diese alle in der Reihenfolge ihres
    Auftretens berücksichtigt.
-   Funktionen liefern grundsätzlich immer Strings zurück. Falls in
    einem Kontext ein Wahrheitswert erforderlich ist, so wird der String
    "true" als wahr, jeder andere String als falsch betrachtet.
    Funktionen, die ihrer Natur nach einen Wahrheitswert zurückliefern
    (wie z.B. AND) liefern die Strings "true" und "false" zurück.
-   Falls bei der Abarbeitung einer Funktion ein Fehler auftritt,
    liefert die Funktion einen Fehlerstring. Dies dient dazu, den
    Anwender auf das Problem aufmerksam zu machen, damit er die
    Systembetreuung einschaltet. So wird verhindert, dass z.B.
    stillschweigend falsche Daten in ein Formular eingefügt werden.\
    '''Achtung: ''' Der Fehlerstring kann sich jederzeit ändern (und
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

**[Stringverarbeitung](Konfigurationsdatei_wollmux.conf#Stringverarbeitung "wikilink")**

:   [String](Konfigurationsdatei_wollmux.conf#String "wikilink") - ein
    String-Literal ist die einfachste Grundfunktion.
:   [LENGTH](Konfigurationsdatei_wollmux.conf#LENGTH_.28.3CArgument1.3E_..._.3CArgumentN.3E.29 "wikilink") -
    liefert die Länge (in Zeichen) eines Strings.
:   [MATCH](Konfigurationsdatei_wollmux.conf#MATCH_.28.3CArgument.3E.2C_.3CRegEx.3E.29 "wikilink") -
    testet, ob ein String einem durch einen regulären Ausdruck gegebenen
    Muster entspricht.
:   [REPLACE](Konfigurationsdatei_wollmux.conf#REPLACE_.28.3CArgument.3E.2C_.3CRegEx.3E.2C_.3CRepStr.3E.29 "wikilink") -
    ersetzt Teile eines Strings mit Hilfe von regulären Ausdrücken.
:   [SPLIT](Konfigurationsdatei_wollmux.conf#SPLIT_.28.3CArgument.3E.2C_.3CRegEx.3E.2C_.3CIndex.3E.29 "wikilink") -
    Teile Strings mit Hilfe von regulären Ausdrücken auf in mehrere
    Teile und liefere einen dieser Teile zurück.
:   [CAT](Konfigurationsdatei_wollmux.conf#CAT_.28.3CArgument1.3E_..._.3CArgumentN.3E.29 "wikilink") -
    verkettet mehrere Strings zu einem langen String.
:   [FORMAT](Konfigurationsdatei_wollmux.conf#FORMAT.28.3CArgument.3E_MIN_.22.3CMinStellen.3E.22_MAX_.22.3CMaxStellen.3E.22.29 "wikilink") -
    formatiert Zahlenwerte auf eine minimale und/oder maximale Anzahl
    von Nachkommastellen.

**[Arithmetik](Konfigurationsdatei_wollmux.conf#Arithmetik "wikilink")**

:   [SUM](Konfigurationsdatei_wollmux.conf#SUM_.28.3CArgument1.3E_..._.3CArgumentN.3E.29 "wikilink") -
    bildet die Summe aus einer Reihe von Zahlenwerten.
:   [MINUS](Konfigurationsdatei_wollmux.conf#MINUS_.28.3CArgument1.3E_..._.3CArgumentN.3E.29 "wikilink") -
    bildet die Summe aus einer Reihe von Zahlenwerten und
    liefert -(Summe) zurück.
:   [DIFF](Konfigurationsdatei_wollmux.conf#DIFF_.28.3CArgument1.3E_..._.3CArgumentN.3E.29 "wikilink") -
    subtrahiert von einem Zahlenwert einen oder mehrere
    andere Zahlenwerte.
:   [PRODUCT](Konfigurationsdatei_wollmux.conf#PRODUCT_.28.3CArgument1.3E_..._.3CArgumentN.3E.29 "wikilink") -
    bildet das Produkt aus einer Reihe von Zahlenwerten.
:   [DIVIDE](Konfigurationsdatei_wollmux.conf#DIVIDE.28.3CDividend.3E_BY.28.3CDivisor.3E.29_MIN_.22.3CMinStellen.3E.22_MAX_.22.3CMaxStellen.3E.22.29 "wikilink") -
    berechnet den Quotienten aus 2 Zahlenwerten mit beliebig
    vorgebbarer Genauigkeit.
:   [ABS](Konfigurationsdatei_wollmux.conf#ABS_.28.3CArgument1.3E_..._.3CArgumentN.3E.29 "wikilink") -
    berechnet den absoluten Betrag eines Zahlenwerts.
:   [SIGN](Konfigurationsdatei_wollmux.conf#SIGN_.28.3CArgument1.3E_..._.3CArgumentN.3E.29 "wikilink") -
    liefert -1, 0, +1 je nachdem, ob das Argument negativ, 0 oder
    positiv ist.

**[Vergleiche](Konfigurationsdatei_wollmux.conf#Vergleiche "wikilink")**

:   [ISERROR](Konfigurationsdatei_wollmux.conf#ISERROR_.28.3CFunktion.3E.29 "wikilink") -
    testet, ob eine Funktion einen Fehler zurückliefert.
:   [ISERRORSTRING](Konfigurationsdatei_wollmux.conf#ISERRORSTRING_.28.3CFunktion.3E.29 "wikilink") -
    vergleicht einen String mit dem speziellen Fehler-String.
:   [STRCMP](Konfigurationsdatei_wollmux.conf#STRCMP_.28.3CArgument1.3E_..._.3CArgumentN.3E.29 "wikilink") -
    vergleicht 2 oder mehr Strings.
:   [NUMCMP](Konfigurationsdatei_wollmux.conf#NUMCMP_.28.3CArgument1.3E_..._.3CArgumentN.3E_MARGIN_.22.3CMaxAbweichung.3E.22_.29 "wikilink") -
    vergleicht 2 oder mehr Zahlenwerte.
:   [LT](Konfigurationsdatei_wollmux.conf#LT_.28.3CArgument1.3E_..._.3CArgumentN.3E_MARGIN_.22.3CMaxAbweichung.3E.22_.29 "wikilink") -
    prüft, ob zwischen der ersten Zahl und den folgenden Zahlen die &lt;
    Beziehung besteht.
:   [LE
    ](Konfigurationsdatei_wollmux.conf#LE_.28.3CArgument1.3E_..._.3CArgumentN.3E_MARGIN_.22.3CMaxAbweichung.3E.22_.29 "wikilink") -
    prüft, ob zwischen der ersten Zahl und den folgenden Zahlen die
    &lt;= Beziehung besteht.
:   [GT](Konfigurationsdatei_wollmux.conf#GT_.28.3CArgument1.3E_..._.3CArgumentN.3E_MARGIN_.22.3CMaxAbweichung.3E.22_.29 "wikilink") -
    prüft, ob zwischen der ersten Zahl und den folgenden Zahlen die &gt;
    Beziehung besteht.
:   [GE
    ](Konfigurationsdatei_wollmux.conf#GE_.28.3CArgument1.3E_..._.3CArgumentN.3E_MARGIN_.22.3CMaxAbweichung.3E.22_.29 "wikilink") -
    prüft, ob zwischen der ersten Zahl und den folgenden Zahlen
    die &gt;= Beziehung besteht.

**[Logische
Verknüpfungen](Konfigurationsdatei_wollmux.conf#Logische_Verkn.C3.BCpfungen "wikilink")**

:   [AND](Konfigurationsdatei_wollmux.conf#AND_.28.3CFunktion1.3E_..._.3CFunktionN.3E.29 "wikilink") -
    liefert "true" gdw. alle enthaltenen Funktionen "true" liefern.
:   [OR](Konfigurationsdatei_wollmux.conf#OR_.28.3CFunktion1.3E_..._.3CFunktionN.3E.29 "wikilink") -
    liefert "true" gdw. mindestens eine der enthaltenen Funktionen
    "true" liefert.
:   [NOT](Konfigurationsdatei_wollmux.conf#NOT_.28.3CFunktion1.3E_..._.3CFunktionN.3E.29 "wikilink") -
    liefert "true" gdw. keine der enthaltenen Funktionen "true" liefert.

**[Ablaufsteuerung/Kontrollfluss](Konfigurationsdatei_wollmux.conf#Ablaufsteuerung.2FKontrollfluss "wikilink")**

:   [IF](Konfigurationsdatei_wollmux.conf#IF_.28.3CBedingung.3E_THEN_.3CDann.3E_ELSE_.3CSonst.3E_.29 "wikilink") -
    testet eine Bedingung und liefert bei "true" den THEN-Teil, bei
    "false" den ELSE-Teil als Ergebnis.
:   [SELECT](Konfigurationsdatei_wollmux.conf#SELECT_.28.3CFunktion1.3E_..._.3CFunktionN.3E.29 "wikilink") -
    wählt aus einer Reihe von Funktionen einen Wert aus, typischerweise
    abhängig von Bedingungen.

**[Funktionen für
Formulare](Konfigurationsdatei_wollmux.conf#Funktionen_f.C3.BCr_Formulare "wikilink")**

:   [VALUE](Konfigurationsdatei_wollmux.conf#VALUE_.3CArgument.3E "wikilink") -
    liefert den Wert eines Formularfeldes.
:   [DIALOG
    ](Konfigurationsdatei_wollmux.conf#DIALOG_.28.22.3CDialogname.3E.22.2C_.22.3CFeldname.3E.22.29 "wikilink") -
    liefert einen über einen Funktionsdialog ausgewählten Wert.

**[Zugriff auf externe
Funktionen](Konfigurationsdatei_wollmux.conf#Zugriff_auf_externe_Funktionen "wikilink")**

:   [EXTERN](Konfigurationsdatei_wollmux.conf#EXTERN_.28URL_.3Curl.3E_PARAMS.28.3Cparam1.3E_..._.3CparamN.3E.29.29 "wikilink") -
    ermöglicht den Zugriff auf externe Java oder Basic-Funktionen.
:   [BIND
    (mit Funktionsname)](Konfigurationsdatei_wollmux.conf#BIND_.28FUNCTION_.22.3CFunktionsname.3E.22_SET.28.22.3CParamName1.3E.22_.3CWert1.3E.29_..._SET.28.22.3CParamNameN.3E.22_.3CWertN.3E.29.29 "wikilink") -
    ruft eine global im Funktionen-Abschnitt definierte externe Funktion
    mit Parametern auf.
:   [BIND
    (mit Funktion)](Konfigurationsdatei_wollmux.conf#BIND_.28FUNCTION.28.3CFunktion.3E.29_SET.28.22.3CParamName1.3E.22_.3CWert1.3E.29_..._SET.28.22.3CParamNameN.3E.22_.3CWertN.3E.29.29 "wikilink") -
    ruft eine inline deklarierte (externe) Funktion mit Parametern auf.

Stringverarbeitung
------------------

### String

Die einfachste Grundfunktion ist ein einfacher String. Jedes Element,
das keine Unterelemente hat, wird als String betrachtet.

`Funktionen(
`   SimplerText1("Dies ist ein einfacher Text")
`   SimplerText2 "Die Klammern können wegfallen, weil SimplerText2 nur ein Unterelement hat"
`   SimplerText3( AND()  )    #Dies ist das selbe wie SimplerText3( "AND" )
`)`

Beachten Sie insbesondere das Beispiel SimplerText3. Auch wenn es so
aussieht, als würde hier die Grundfunktion AND verwendet, ist dies nicht
der Fall. Die Grundfunktion AND erwartet mindestens einen Parameter.
Alles was keinen Parameter hat wird als einfacher String betrachtet
(auch wenn es nicht in Gänsefüßchen steht). Dementsprechend liefert die
Funktion SimplerText3 den String "AND" zurück. Achtung! Technisch
gesehen handelt es sich bei dem AND im letzten Beispiel um einen
Schlüssel und es gelten die Einschränkungen für Schlüssel (z.B. keine
Umlaute). Es ist davon abzuraten, diese Schreibweise zu verwenden.

### LENGTH (<Argument1> ... <ArgumentN>)

Die Funktion LENGTH erwartet ein oder mehrere Argumente. Diese werden
alle ausgewertet und zu einem langen String verkettet. Die Länge dieses
Strings (in Zeichen) wird zurückgeliefert. Alle Argumente können
beliebige Funktionen sein. Falls eine der Funktionen einen Fehler
liefert liefert LENGTH einen Fehler.

### MATCH (<Argument>, <RegEx>)

Die Funktion MATCH liefert "true", wenn <Argument> als Ganzes auf den
regulären Ausdruck <RegEx> passt. Die Syntax von <RegEx> folgt der eines
[Java-Patterns](http://java.sun.com/j2se/1.5.0/docs/api/java/util/regex/Pattern.html#sum).
Falls die Funktion <Argument> einen Fehler liefert, liefert MATCH einen
Fehler. Für <Argument> kann eine beliebige Funktion verwendet werden.
Für <RegEx> darf nur eine Funktion verwendet werden, die zum Zeitpunkt
der Funktionsdefinition bereits auswertbar ist, d.h. eine Funktion die
keine Parameter aus dem Kontext (z.B. Werte von Formularfeldern)
benötigt. Normalerweise sollten für <RegEx> nur einfache Strings
verwendet werden.

`Funktionen(
`  IstZahl(MATCH(VALUE('Argument'), "[0-9]+"))
`  IstHerr(MATCH(VALUE('Anrede'), "Herrn?"))
`)`

Hinweis: Für den einfachen Vergleich zweier Strings auf Gleichheit sollte die MATCH-Funktion nicht verwendet werden, da es hier leicht zu Fehlern kommen kann, wenn im zweiten Argument Zeichen verwendet werden, die in regulären Ausdrücken eine besondere Bedeutung haben. Für den einfachen Vergleich zweier Strings steht die Funktion STRCMP zur Verfügung.

### REPLACE (<Argument>, <RegEx>, <RepStr>)

Die Funktion REPLACE ersetzt alle Vorkommen von <RegEx> in <Argument>
durch <RepStr>. Die Syntax von <RegEx> folgt der eines
[Java-Patterns](http://java.sun.com/j2se/1.5.0/docs/api/java/util/regex/Pattern.html#sum).
Die Syntax von <RepStr> entspricht der [Java-Funktion
replaceAll()](http://java.sun.com/j2se/1.5.0/docs/api/java/util/regex/Matcher.html#replaceAll(java.lang.String)).

Achtung: Die Zeichen \$ und \\ haben in <RepStr> spezielle Bedeutung!

Falls die Funktion <Argument> oder die Funktion <RepStr> einen Fehler
liefert, liefert REPLACE einen Fehler. Für <Argument> kann eine
beliebige Funktion verwendet werden. Für <RegEx> darf nur eine Funktion
verwendet werden, die zum Zeitpunkt der Funktionsdefinition bereits
auswertbar ist, d.h. eine Funktion die keine Parameter aus dem Kontext
(z.B. Werte von Formularfeldern) benötigt. Normalerweise sollten für
<RegEx> nur einfache Strings verwendet werden.

`Funktionen(
`  WhitespaceToSpace(REPLACE(VALUE('Argument'), "\p{Space}", " "))
`)`

### SPLIT (<Argument>, <RegEx>, <Index>)

Die Funktion SPLIT sucht im String <Argument> nach Vorkommen von
<RegEx>, teilt den String an diesen Stellen in durchnummerierte
Einzelteile auf (die den durch <RegEx> gefundenen Ausdruck nicht
enthalten) und liefert den Einzelteil mit der Nummer <Index> zurück. Die
Syntax von <RegEx> folgt der eines
[Java-Patterns](http://java.sun.com/j2se/1.5.0/docs/api/java/util/regex/Pattern.html#sum).
Der Index <Index> muss eine nicht negative ganze Zahl sein und startet
ab dem Wert "0" für das erste ermittelte Einzelteil. Ist der Index
größer als die Anzahl der ermittelten Einzelteile, so gibt die Funktion
den Leerstring zurück.

Falls die Funktion <Argument> einen Fehler liefert, liefert SPLIT einen
Fehler. Für <Argument> kann eine beliebige Funktion verwendet werden.
Für <RegEx> darf nur eine Funktion verwendet werden, die zum Zeitpunkt
der Funktionsdefinition bereits auswertbar ist, d.h. eine Funktion die
keine Parameter aus dem Kontext (z.B. Werte von Formularfeldern)
benötigt. Normalerweise sollten für <RegEx> nur einfache Strings
verwendet werden.

SPLIT lässt sich beispielsweise verwenden, um Leerzeilen aus der
Anschrift im Empfängerfeld zu entfernen (man beachte die doppelten
Zeilenvorschübe '%n' nach "Müller"):

`SPLIT("Herr Müller%n%nPostweg 32%n80331 München", "\n+", "0") --> "Herr Müller"
`SPLIT("Herr Müller%n%nPostweg 32%n80331 München", "\n+", "1") --> "Postweg 32"
`SPLIT("Herr Müller%n%nPostweg 32%n80331 München", "\n+", "2") --> "80331 München"
`SPLIT("Herr Müller%n%nPostweg 32%n80331 München", "\n+", "3") --> ""`

### CAT (<Argument1> ... <ArgumentN>)

Die Funktion CAT erwartet ein oder mehrere Argumente. Diese werden alle
ausgewertet und zu einem langen String verkettet. Alle Argumente können
beliebige Funktionen sein. Falls eine der Funktionen einen Fehler
liefert liefert CAT einen Fehler.

Tip: CAT lässt sich gut mit IF kombinieren.

`CAT(
`  "Sehr geehrte" 
`  IF(MATCH(VALUE("Anrede"), "Herr") THEN "r" )
`  VALUE("Anrede")
`  IF(NOT(MATCH(VALUE("Anrede"), "Damen und Herren")) THEN(VALUE("Nachname")) )
`)`

### FORMAT(<Argument> MIN "<MinStellen>" MAX "<MaxStellen>")

Die Funktion FORMAT wertet <Argument> aus und interpretiert den
Rückgabewert als Zahl. Falls diese Zahl mehr als <MaxStellen>
Nachkommastellen hat, so wird sie auf diese Zahl von Nachkommastellen
gerundet. Falls die Zahl weniger als <MinStellen> Nachkommastellen hat,
so wird sie mit 0ern auf die entsprechende Zahl von Nachkommastellen
aufgefüllt.\
<Argument> kann eine beliebige Funktion sein. Für <MinStellen> und
<MaxStellen> sind nur String-Literale zulässig. <MinStellen> und
<MaxStellen> sind beide optional. Default-Wert für <MinStellen> ist 0,
für <MaxStellen> 1024.\
Falls bei der Auswertung ein Fehler auftritt oder <Argument> keine
legale Zahl zurückliefert, dann liefert FORMAT einen Fehler.

Hinweis: Als Dezimaltrennzeichen wird nur das zu den aktuellen Spracheinstellungen passende akzeptiert. Ist OpenOffice.org auf "Deutsch" eingestellt, so ist dies das Komma, im Falle von Englisch der Punkt.\
Hinweis: Die Funktion FORMAT verhält sich identisch zu DIVIDE und erlaubt im Prinzip auch die Angabe eines Divisors mit BY. Im Sinne der Klarheit sollte sie jedoch nicht so verwendet werden.

Arithmetik
----------

-   Für alle arithmetischen Funktionen gilt, dass als
    Dezimaltrennzeichen nur das zu den aktuellen Spracheinstellungen
    passende akzeptiert wird. Ist OpenOffice.org auf "Deutsch"
    eingestellt, so ist dies das Komma, im Falle von "Englisch"
    der Punkt. Die Ausgabe der arithmetischen Funktionen erfolgt
    ebenfalls immer mit dem entsprechenden Dezimaltrennzeichen.
-   Der Zahlenbereich der Funktionen ist nicht beschränkt. Sie können
    beliebig große und beliebig kleine Zahlen verarbeiten.
-   Mit Ausnahme der Funktion DIVIDE liefern alle arithmetischen
    Funktionen immer ein exaktes Ergebnis ohne Rundungsfehler. Bei
    DIVIDE muss zwingend angegeben werden, auf wieviele Stellen genau
    das Ergebnis berechnet werden soll.
-   Das Ergebnis der arithmetischen Funktionen wird immer mit der
    minimal erforderlichen Anzahl an Nachkommastellen
    zurückgeliefert (z.B. SUM("1.00", "1.0000") = "2"). Ausnahme ist die
    Funktion DIVIDE, bei der man optional eine minimale Anzahl an
    Nachkommastellen angeben kann. Für alle anderen Funktionen lässt
    sich die Darstellung mit der Funktion FORMAT anpassen.

### SUM (<Argument1> ... <ArgumentN>)

Die Funktion SUM wertet alle Argumente aus, interpretiert die Ergebnisse
als Zahlen, bildet daraus die Summe und liefert diese zurück. Als
Argumente sind beliebige Funktionen zulässig. Falls eine der Funktionen
einen Fehler oder keine legale Zahl liefert, so liefert SUM einen
Fehler.

### MINUS (<Argument1> ... <ArgumentN>)

Die Funktion MINUS wertet alle Argumente aus, interpretiert die
Ergebnisse als Zahlen, bildet daraus die Summe und liefert diese *mit
umgekehrtem Vorzeichen* zurück (Beispiel: MINUS("1", "3") = "-4"). Als
Argumente sind beliebige Funktionen zulässig. Falls eine der Funktionen
einen Fehler oder keine legale Zahl liefert, so liefert MINUS einen
Fehler.

### DIFF (<Argument1> ... <ArgumentN>)

Die Funktion DIFF wertet alle Argumente aus und interpretiert die
Ergebnisse als Zahlen. Zur Berechnung des Ergebnisses wird das erste
Argument genommen und davon werden alle weiteren Argumente subtrahiert.
Falls nur 2 Argumente angegeben sind, entspricht das Ergebnis also der
Differenz der beiden. Es müssen mindestens 2 Argumente angegeben werden.
Als Argumente sind beliebige Funktionen zulässig. Falls eine der
Funktionen einen Fehler oder keine legale Zahl liefert, so liefert DIFF
einen Fehler.

### PRODUCT (<Argument1> ... <ArgumentN>)

Die Funktion PRODUCT wertet alle Argumente aus, interpretiert die
Ergebnisse als Zahlen, bildet daraus das Produkt und liefert dieses
zurück. Als Argumente sind beliebige Funktionen zulässig. Falls eine der
Funktionen einen Fehler oder keine legale Zahl liefert, so liefert
PRODUCT einen Fehler.

### DIVIDE(<Dividend> BY(<Divisor>) MIN "<MinStellen>" MAX "<MaxStellen>")

Die Funktion DIVIDE wertet <Dividend> und <Divisor> aus und
interpretiert die Rückgabewerte als Zahlen. Dann berechnet sie den
Quotient Dividend/Divisor und liefert diesen zurück. Da bei einer
Division unendliche Dezimalbrüche möglich sind, ist die Angabe
<MaxStellen> zwingend erforderlich, um die maximale Anzahl an
Nachkommastellen anzugeben, auf die das Ergebnis gerundet werden soll.
Optional ist auch die Angabe <MinStellen> möglich und falls der Quotient
weniger als <MinStellen> Nachkommastellen hat, so wird er mit 0ern auf
die entsprechende Zahl von Nachkommastellen aufgefüllt.\
<Dividend> und <Divisor> können beliebige Funktionen sein, jedoch darf
der Divisor nicht 0 ergeben. Für <MinStellen> und <MaxStellen> sind nur
String-Literale zulässig. Wird <MinStellen> weggelassen, so wird 0
angenommen.\
Falls bei der Auswertung von <Dividend> oder <Divisor> ein Fehler
auftritt oder der Divisor 0 ist, dann liefert DIVIDE einen Fehler.

Hinweis: Die Funktion DIVIDE verhält sich identisch zu FORMAT. Im Prinzip kann auch die Angabe des Divisors weggelassen werden. Es wird dann 1 angenommen und die Angabe MAX ist dann optional. Im Sinne der Klarheit ist davon jedoch abzuraten.

### ABS (<Argument1> ... <ArgumentN>)

Die Funktion ABS wertet alle Argumente aus, interpretiert die Ergebnisse
als Zahlen, bildet daraus die Summe und liefert den absoluten Betrag
derselben zurück. Als Argumente sind beliebige Funktionen zulässig.
Falls eine der Funktionen einen Fehler oder keine legale Zahl liefert,
so liefert ABS einen Fehler.

### SIGN (<Argument1> ... <ArgumentN>)

Die Funktion SIGN wertet alle Argumente aus, interpretiert die
Ergebnisse als Zahlen, bildet daraus die Summe und liefert -1, 0 oder +1
zurück, je nachdem ob die Summe negativ, 0 oder positiv ist. Als
Argumente sind beliebige Funktionen zulässig. Falls eine der Funktionen
einen Fehler oder keine legale Zahl liefert, so liefert SIGN einen
Fehler.

Vergleiche
----------

### ISERROR (<Funktion>)

Die Funktion ISERROR wertet <Funktion> aus und liefert "true" genau
dann, wenn <Funktion> einen Fehler zurückliefert. Ansonsten liefert
ISERROR "false" zurück. Zu beachten ist, dass ISERROR *nicht* einfach
nur mit dem speziellen Fehlerstring vergleicht, den Funktionen im
Fehlerfall zurückliefern (Zum Zeitpunkt der Erstellung dieser
Dokumentation ist dies der String "!¤£!FEHLERHAFTE DATEN!¤£!"). ISERROR
wertet stattdessen den internen Fehlerzustand von <Funktion> aus und
kann so unterscheiden zwischen einem wirklichen Fehler und dem
absichtlichen Zurückliefern des Fehlerstrings.\
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

Hinweis: Wenn es darum geht, im Fehlerfall einen besonderen Wert zurückzuliefern, ist SELECT mit einem ONERROR-Zweig meist günstiger als direkte Tests mit ISERROR oder ISERRORSTRING.

### ISERRORSTRING (<Funktion>)

ISERRORSTRING wertet <Funktion> aus und vergleicht den Rückgabewert mit
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
direkt den Fehlerzustand von <Funktion> auswertet. Wenn möglich sollte
diese Funktion verwendet werden.

Hinweis: Wenn es darum geht, im Fehlerfall einen besonderen Wert zurückzuliefern, ist SELECT mit einem ONERROR-Zweig meist günstiger als direkte Tests mit ISERROR oder ISERRORSTRING.

### STRCMP (<Argument1> ... <ArgumentN>)

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

"true": Alle Strings sind identisch. Beispiel: `STRCMP("a"` `"a"` `"a")
"-1": Mindestens eines der Argumente 2 bis N ist verschieden von Argument1 und kommt alphabetisch *nach* Argument1. Alle anderen Argumente kommen entweder auch alphabetisch *nach* Argument1 oder sie sind identisch zu Argument1.\
Beispiel: `STRCMP("a"` `"a"` `"z")
"1": Mindestens eines der Argumente 2 bis N ist verschieden von Argument1 und kommt alphabetisch *vor* Argument1. Alle anderen Argumente kommen entweder auch alphabetisch *vor* Argument1 oder sie sind identisch zu Argument1.\
Beispiel: `STRCMP("z"` `"a"` `"z")
"0": Mindestens zwei der Argumente 2 bis N sind verschieden von Argument1 und eines davon kommt alphabetisch *nach* Argument1 während das andere alphabetisch *vor* Argument1 kommt. Beispiel: `STRCMP("m"` `"a"` `"z")
Fehler: Falls eine der ausgewerteten Funktionen einen Fehler liefert, so liefert STRCMP einen Fehler. '''Achtung: ''' STRCMP wendet das Kurzschlussverfahren an, d.h. es wertet nur soviele Argumente aus wie notwendig. Wenn z.B. Argument2 alphabetisch vor Argument1 kommt und Argument3 alphabetisch danach, dann kann das Ergebnis nur "0" lauten und die Argumente 3 bis N werden gar nicht mehr ausgewertet. Eventuelle Fehler, die bei der Auswertung dieser Argumente auftreten würden, werden nicht erkannt. Beispiel: `STRCMP("m","a",SUM("keineZahl"),"z")` `=` `Fehler!`, aber `STRCMP("m"` `"a"` `"z"` `SUM("keineZahl"))` `=` `"0"`

### NUMCMP (<Argument1> ... <ArgumentN> MARGIN "<MaxAbweichung>" )

Es müssen mindestens 2 Argumente angegeben werden. Die Angabe einer
MARGIN ist optional. Als Argumente und MARGIN sind beliebige Funktionen
zulässig. Die Funktion NUMCMP wertet zuerst (falls angegeben) die
MARGIN-Funktion aus und interpretiert den Rückgabewert als Zahl und
nimmt davon den Absolutbetrag. Danach werden die Argumente der Reihe
nach ausgewertet und die Rückgabewerte als Zahlen interpretiert. Für die
Argumente 2 bis N führt NUMCMP einen Vergleich mit dem ersten Argument
durch. Falls MARGIN angegeben ist, so werden die Zahlen als numerisch
gleich behandelt, wenn ihre Differenz kleiner oder gleich
<MaxAbweichung> ist. Die Funktion NUMCMP kann folgende 5 Ergebnisse
zurückliefern, wobei in einem booleschen Kontext, wie in einer
IF-Bedingung, alle nicht-true Ergebnisse false entsprechen:

"true": Alle Werte sind numerisch gleich.\
Beispiel 1: `NUMCMP("1"` `"1,0"` `"1,000")
Beispiel 2: `NUMCMP("1"` `"1,1"` `"0,9"` `MARGIN` `"0,1")
"-1": Mindestens eines der Argumente 2 bis N ist numerisch echt größer als Argument1. Alle anderen Argumente sind größer oder gleich Argument1.\
Beispiel 1: `NUMCMP("1"` `"1,0"` `"2")
Beispiel 2: `NUMCMP("1"` `"0,9"` `"2"` `MARGIN` `"0,1")
"1": Mindestens eines der Argumente 2 bis N ist numerisch echt kleiner als Argument1. Alle anderen Argumente sind kleiner oder gleich Argument1. Beispiel: `NUMCMP("2,0"` `"1"` `"2")
"0": Mindestens eines der Argumente 2 bis N ist numerisch echt größer als Argument1 und mindestens eines der Argumente ist numerisch echt kleiner als Argument1. Beispiel: `NUMCMP("2"` `"1"` `"3")
Fehler: Falls eine der ausgewerteten Funktionen einen Fehler liefert oder das Ergebnis keine legale Zahl darstellt, so liefert NUMCMP einen Fehler. '''Achtung: ''' NUMCMP wendet das Kurzschlussverfahren an, d.h. es wertet nur soviele Argumente aus wie notwendig. Wenn z.B. Argument2 echt kleiner als Argument1 ist und Argument3 echt größer, dann kann das Ergebnis nur "0" lauten und die Argumente 4 bis N werden gar nicht mehr ausgewertet. Eventuelle Fehler, die bei der Auswertung dieser Argumente auftreten würden, werden nicht erkannt. Beispiel: `NUMCMP("2","1",SUM("keineZahl"),"3")` `=` `Fehler!`, aber `NUMCMP("2"` `"1"` `"3"` `SUM("keineZahl"))` `=` `"0"`

### LT (<Argument1> ... <ArgumentN> MARGIN "<MaxAbweichung>" )

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
kleiner oder gleich <MaxAbweichung> ist.\
Beispiel 1: `LT("1"` `"2"` `"3")` `=` `"true"
Beispiel 2: `LT("1"` `"2"` `"3"` `MARGIN` `"1")` `=` `"false"`

Fehler: Falls eine der ausgewerteten Funktionen einen Fehler liefert oder das Ergebnis keine legale Zahl darstellt, so liefert LT einen Fehler. '''Achtung: ''' LT wendet das Kurzschlussverfahren an, d.h. es wertet nur soviele Argumente aus wie notwendig. Wenn z.B. Argument2 kleiner Argument1 ist, dann kann das Ergebnis nur "false" lauten und und die Argumente 3 bis N werden gar nicht mehr ausgewertet. Eventuelle Fehler, die bei der Auswertung dieser Argumente auftreten würden, werden nicht erkannt. Beispiel: `LT("2",SUM("keineZahl"),"1")` `=` `Fehler!`, aber `LT("2"` `"1"` `SUM("keineZahl"))` `=` `"false"`

### LE (<Argument1> ... <ArgumentN> MARGIN "<MaxAbweichung>" )

Wie LT, aber es wird "true" geliefert, wenn Argument1 numerisch kleiner
oder gleich Argument2 bis ArgumentN ist.

### GT (<Argument1> ... <ArgumentN> MARGIN "<MaxAbweichung>" )

Wie LT, aber es wird "true" geliefert, wenn Argument1 numerisch echt
größer Argument2 bis ArgumentN ist.

### GE (<Argument1> ... <ArgumentN> MARGIN "<MaxAbweichung>" )

Wie LT, aber es wird "true" geliefert, wenn Argument1 numerisch größer
oder gleich Argument2 bis ArgumentN ist.

Logische Verknüpfungen
----------------------

### AND (<Funktion1> ... <FunktionN>)

Die Funktion AND wertet <Funktion1> bis <FunktionN> der Reihe nach aus
und liefert "true", falls alle Funktionen "true" liefern, ansonsten
"false". Die Auswertung erfolgt nach dem Kurzschlussverfahren, d.h. wenn
eine der Funktionen nicht "true" liefert, werden die folgenden
Funktionen nicht mehr ausgewertet. Liefert eine der ausgewerteten
Funktionen einen Fehler, so liefert AND einen Fehler und die folgenden
Funktionen werden nicht mehr ausgewertet.

### OR (<Funktion1> ... <FunktionN>)

Die Funktion OR wertet <Funktion1> bis <FunktionN> der Reihe nach aus
und liefert "true", falls eine der Funktionen "true" liefert, ansonsten
"false". Die Auswertung erfolgt nach dem Kurzschlussverfahren, d.h. wenn
eine der Funktionen "true" liefert, werden die folgenden Funktionen
nicht mehr ausgewertet. Liefert eine der ausgewerteten Funktionen einen
Fehler, so liefert OR einen Fehler und die folgenden Funktionen werden
nicht mehr ausgewertet.

### NOT (<Funktion1> ... <FunktionN>)

Die Funktion NOT wertet <Funktion1> bis <FunktionN> der Reihe nach aus
und liefert "true", falls eine der Funktionen *nicht* "true" liefert,
ansonsten "false". Die Auswertung erfolgt nach dem Kurzschlussverfahren,
d.h. wenn eine der Funktionen nicht "true" liefert, werden die folgenden
Funktionen nicht mehr ausgewertet. Anders ausgedrückt: NOT (<Funktion1>
... <FunktionN>) liefert dann "true", wenn AND (<Funktion1> ...
<FunktionN>) "false" liefern würde. Liefert eine der ausgewerteten
Funktionen einen Fehler, so liefert NOT einen Fehler und die folgenden
Funktionen werden nicht mehr ausgewertet.

Ablaufsteuerung/Kontrollfluss
-----------------------------

### IF (<Bedingung> THEN <Dann> ELSE <Sonst> )

Die Funktion IF wertet die <Bedingung> aus. Falls diese "true" ist, so
wird der Wert der Funktion <Dann> zurückgeliefert, ansonsten der Wert
der Funktion <Sonst>. Sowohl der "THEN <Dann>" als auch der "ELSE
<Sonst>" Teil sind optional. Falls ein Teil fehlt, so wird der leere
String dafür angenommen. <Bedingung>, <Dann> und <Sonst> können
beliebige Funktionen sein. Falls <Bedingung> einen Fehler liefert, so
liefert IF einen Fehler, ohne <Dann> oder <Sonst> auszuführen.

### THEN <Argument>

Die Funktion THEN verhält sich genau wie die Funktion CAT. Sie sollte
jedoch um Verwirrung zu vermeiden nur zusammen mit IF verwendet werden.

### ELSE <Argument>

Die Funktion ELSE verhält sich genau wie die Funktion CAT. Sie sollte
jedoch um Verwirrung zu vermeiden nur zusammen mit IF oder SELECT
verwendet werden (und innerhalb von SELECT nur als letzte Funktion).

### SELECT (<Funktion1> ... <FunktionN>)

Die Funktion SELECT wertet <Funktion1> bis <FunktionN> der Reihe nach
aus. Liefert eine Funktion den leeren String, so wird die Auswertung mit
der nächsten Funktion fortgesetzt. Sobald eine der Funktionen einen
nicht-leeren Nicht-Fehler-String liefert, wird die Auswertung
abgebrochen und dieser wird das Ergebnis von SELECT. Typischerweise wird
SELECT zusammen mit IF verwendet und erhält als letzte Funktion eine
ELSE Funktion und/oder eine ONERROR Funktion.

`SELECT(
`  IF( `<Bedingung1>\
`    THEN `<Ergebnis1>\
`  )
`  IF( `<Bedingung2>\
`    THEN `<Ergebnis2>\
`  )
`  ...
`  ELSE `<SonstWert>\
\
`  ONERROR `<Fehlermeldung>\
`)`

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
genommen werden. Es ist normalerweise völlig ausreichend als <Argument>
einen einfachen String zu verwenden. Ist für die angegebene Id im
entsprechenden Kontext kein Wert definiert (z.B. weil es kein
Formularelement mit dieser Id gibt), so liefert VALUE einen Fehler.

`Funktionen(
`  WertVonCheckbox(VALUE("CheckboxId"))
`)`

### DIALOG ("<Dialogname>", "<Feldname>")

Die Funktion DIALOG erlaubt Zugriff auf Werte, die der Benutzer in einem
speziellen Dialog ausgewählt hat. Das wichtigste Beispiel hierfür ist
der Dialog zur Auswahl des Empfängers bei Formularen und Briefköpfen.
Der Benutzer klickt hierzu den entsprechenden Button an, der den
Empfängerauswahl-Dialog aufruft und wählt im Dialog den Empfänger aus.

Die DIALOG-Funktion liefert das durch <Feldname> bezeichnete Feld, das
der Benutzer im Dialog <Dialogname> ausgewählt hat. Hat der Benutzer den
Dialog noch nicht aufgerufen, so wird ein Standardwert (typischerweise
der leere String) geliefert. Sobald der Benutzer den Dialog einmal
aufgerufen hat, wird der korrekte Wert geliefert. <Dialogname> muss
einen Dialog bezeichnen, der im Abschnitt
[Funktionsdialoge](Konfigurationsdatei_wollmux.conf#Funktionsdialoge "wikilink")
definiert wurde.

`DIALOG('Empfaengerauswahl', 'Anrede')`

Zugriff auf externe Funktionen
------------------------------

### EXTERN (URL <url> PARAMS(<param1> ... <paramN>))

Die EXTERN-Funktion stellt eine Verbindung zu einer externen (d.h. nicht
als WollMux-Funktionsdefinition vorliegenden) Funktion her. Diese kann
sowohl als Methode einer Java-Klasse als auch als Basic-Makro vorliegen.
Die <url> identifiziert die externe Funktion. Der Aufbau ist aus den
folgenden Beispielen ersichtlich. Der PARAMS-Block ist optional und legt
Bezeichner für die Parameter der Funktion fest in der Reihenfolge in der
sie übergeben werden müssen. Die Basic- oder Java-Funktion muss ihre
Parameter als Strings erwarten und entweder einen String oder einen
Wahrheitswert zurückliefern. Insbesondere muss es sich im Basic-Fall um
eine Function handeln.

`EXTERN(URL "vnd.sun.star.script:Bibliothek.Modul.NameDerFunction?language=Basic&location=application" 
`       PARAMS("Param1", "Param2", "Param3"))
\
`EXTERN(URL "java:de.muenchen.allg.itd51.wollmux.func.Standard.zahlenBereich" 
`       PARAMS("wert", "min", "max"))`

#### de.muenchen.allg.itd51.wollmux.func.Standard

Dieses Java-Modul enthält einige vorgefertigte Standard-Funktionen:

-   *immerWahr*: liefert immer den Wert "true"
-   *zahlenBereich(low, hi, zahl)*: Liefert true genau dann wenn low, hi
    und zahl Integer-Zahlen sind und low&lt;=zahl&lt;=hi.
-   (veraltet)*herrFrauText(anrede, frauText, herrText)*: Liefert den
    String herrText zurück, falls lowcase(anrede) == "herr", ansonsten
    wird frauText geliefert.
-   *gender(herrText, frauText, sonstText, anrede)*: Liefert den String
    herrText zurück, falls lowcase(anrede) == "herr" oder "herrn".
    Liefert den String frauText zurück falls lowcase(anrede) == "frau".
    Ansonsten wird sonstText zurückgeliefert (typischerweise verwendet
    für den Mehrzahl-Fall "Damen und Herren").
-   *korrektesDatum(datum)*: Versucht, zu erkennen, ob datum ein
    korrektes Datum der Form Tag.Monat.Jahr ist (wobei Jahr immer
    4-stellig sein muss). Liefert "true", falls dies so ist.
-   *formatiereTelefonnummerDIN5008(nummer)*: Formatiert die
    *stadtinterne* Telefonnummer nummer entsprechend der DIN 5008 und
    versieht sie mit der Vorwahl 089, um eine Nummer zu erhalten, die
    extern gültig ist. Diese Funktion wurde für die Verarbeitung der
    Telefonnummerndaten aus dem städtischen LDAP konzipiert und arbeitet
    nicht zwangsweise mit Telefonnummern aus anderen Quellen.
-   *formatiereTelefonnummerDIN5008Intern(nummer)*: Formatiert die
    *stadtinterne* Telefonnummer nummer entsprechend der DIN 5008 und
    versieht sie mit der Vorwahl 0, um eine Nummer zu erhalten, die auf
    jedem internen Telefon funktioniert. Diese Funktion wurde für die
    Verarbeitung der Telefonnummerndaten aus dem städtischen LDAP
    konzipiert und arbeitet nicht zwangsweise mit Telefonnummern aus
    anderen Quellen.
-   *regex(regularerAusdruck, eingabe)*: Liefert genau dann true, wenn
    [regularerAusdruck](http://java.sun.com/j2se/1.5.0/docs/api/java/util/regex/Pattern.html#sum)
    den String eingabe vollständig matcht.
-   *datumNichtInVergangenheit(datum)*: Liefert genau dann true, wenn
    datum ein korrektes Datum der Form Monat.Tag.Jahr ist (wobei Jahr
    immer 4-stellig sein muss) und das Datum nicht in der
    Vergangenheit liegt.

#### de.muenchen.allg.d101 (Plugin der WollMux-Standard-Config)

Im Verzeichnis plugins/de/muenchen/allg/d101 der wollmux-standard-config
werden darüber hinaus folgende nützliche Funktionen zu
Demonstrationszwecken bereitgestellt:

-   *ZahlInWorten(zahl)*: Wandelt eine Zahl("200") in
    natürliche Sprache("zweihundert") um.

### BIND (FUNCTION "<Funktionsname>" SET("<ParamName1>" <Wert1>) ... SET("<ParamNameN>" <WertN>))

Die BIND-Funktion dient dazu, mehrere Funktionen zusammenzusetzen.
<Funktionsname> identifiziert eine benannte Funktion aus dem
*Funktionen*-Abschnitt. Diese Funktion bildet den Ausgangspunkt für die
zusammengesetzte Funktion. Dazu kommen beliebig viele (auch keine sind
möglich) SET-Anweisungen, die Parameter der Basisfunktion mit beliebigen
anderen Funktionen belegen. <ParamName1> bis <ParamNameN> sind dabei
Namen von Parametern, die die Basis-Funktion erwartet. Dies ist nicht
zwingend, aber Parameter zu belegen, die die Basis-Funktion nicht
erwartet, hat keinen Effekt. <Wert1> bis <WertN> können beliebige
Funktionen sein. Die Arbeitsweise von BIND wird klarer, wenn man
typische Anwendungsfälle betrachtet.

Anwendungsfall 1: Verwenden einer externen Funktion als
Plausibilitätsprüfung für ein Formularfeld

`Funktionen(
`    # Diese Funktion liefert "true" wenn  min <= wert <= max
`  ZahlenBereich(EXTERN(URL "java:de.muenchen.allg.itd51.wollmux.Standard.zahlenBereich" 
`       PARAMS("min", "max", "wert")))
`)`

Im *Funktionen*-Abschnitt ist die Funktion *ZahlenBereich* definiert,
die auf eine Java-Funktion im WollMux-Modul
`de.muenchen.allg.itd51.wollmux.Standard` verweist. Dieses Modul enthält
einige vorgefertigte Standard-Funktionen. Diese Funktion soll nun in
einer Formularbeschreibung eingesetzt werden, um zu überprüfen, dass das
der im Textfeld *DarlehensBetrag* eingegebene Wert zwischen 1000 und
50000 liegt. Um dies zu Realisieren müssen 3 Dinge erreicht werden:

-   Als Parameter *min* wird 1000 übergeben
-   Als Parameter *max* wird 50000 übergeben
-   Der Parameter *wert* wird an den Inhalt des Textfelds
    *DarlehensBetrag* gebunden.

Für jede dieser 3 Anforderungen wird ein SET-Ausdruck einer
BIND-Funktion verwendet:

`BIND(FUNCTION "ZahlenBereich" SET("min" "1000") SET("max" "50000") SET("wert" VALUE("DarlehensBetrag")))`

Anwendungsfall 2: Einfügen von "der" oder "die" abhängig vom Anrede-Feld
eines Formulars

`Funktionen(
`     # Diese Funktion liefert TextMaennl wenn Anrede=="Herr", ansonsten TextWeibl
`  GenderText(EXTERN(URL 'java:de.muenchen.allg.itd51.wollmux.func.Standard.herrFrauText' PARAMS('Anrede', 'TextWeibl', 'TextMaennl')))
`)`

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

`Funktionen(
`  derDie(BIND(FUNCTION 'GenderText' SET('TextWeibl','die') SET('TextMaennl','der')))
`)`

Und das zugehörige
[WollMux-Dokumentkommando](Dokumentkommandos_des_WollMux#TRAFO_.27.3CFunktionsbezeichner.3E.27 "wikilink")

`WM(CMD 'insertFormValue' ID 'Anrede' TRAFO 'derDie')`

### BIND (FUNCTION(<Funktion>) SET("<ParamName1>" <Wert1>) ... SET("<ParamNameN>" <WertN>))

Wie [ BIND mit Angabe eines Funktionsnames hinter
FUNCTION](Konfigurationsdatei_wollmux.conf#BIND_.28FUNCTION_.22.3CFunktionsname.3E.22_SET.28.22.3CParamName1.3E.22_.3CWert1.3E.29_..._SET.28.22.3CParamNameN.3E.22_.3CWertN.3E.29.29 "wikilink"),
jedoch wird hier als <Funktion> eine komplette WollMux-Funktion direkt
angegeben, typischerweise eine
[EXTERN-Funktion](Konfigurationsdatei_wollmux.conf#EXTERN_.28URL_.3Curl.3E_PARAMS.28.3Cparam1.3E_..._.3CparamN.3E.29.29 "wikilink").

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

`Funktionsdialoge(
`  Funktionsdialog1(
`    TYPE "dbSelect"
`    TITLE "`<Titel des Dialogfensters>`"
\
`    Fenster(
`      Tab1(
`        TITLE "`<Titel des 1.Tabs>`"
`        CLOSEACTION "back"
`        TIP "`<Tooltip für den 1.Tab>`"
\
`        Intro(
`          `<Label, Glue oder Separator>\
`          ...
`        )#Intro
`       
`        Suche(
`          (TYPE "textfield" ID "suchanfrage" ACTION "search")  #optional Attribut "AUTOFILL" möglich
`          (LABEL "Suchen"  TYPE "button" HOTKEY "S"  ACTION "search")
`        )#Suche
`          
`        Suchstrategie(
`          `<Suchanfrage mit Platzhaltern>`  
`          ...
`        )#Suchstrategie
`          
`        Spaltenumsetzung(
`          `<Funktionsdefinition>\
`          ...
`        )
`       
`        Suchergebnis(
`          `<Label, Glue oder Separator>\
`          ...
`          (TYPE "listbox" ID "suchergebnis" LINES "10" ACTION "select" 
`            DISPLAY "`<Muster für Anzeige der Suchergebnisse>`")
`        )#Suchergebnis
`       
`        Vorschau(
`          `<Anzeigeelement>\
`          ...
`        )#Vorschau
`         
`        Fussbereich(
`          `<Button, Label, Separator oder Glue>\
`          ...
`        )#Fussbereich
`      )#Tab1
\
`      Tab2(
`        ...
`      )#Tab2
\
`      ...  # weitere Tabs
\
`    )#Fenster
`  )#Funktionsdialog1
\
`  ... # weitere Funktionsdialoge
\
`)#Funktionsdialoge`

**Bemerkungen:**

-   Gibt es mehrere *Funktionsdialoge*-Abschnitte in der wollmux.conf,
    so werden diese alle in der Reihenfolge ihres Auftretens
    berücksichtig, wobei die jeweils letzte Definition eines Dialogs
    Gültigkeit hat.
-   Innerhalb des selben *Funktionsdialoge*-Abschnitts darf jeder Dialog
    nur einmal definiert werden.

Die Syntax für die Beschreibung der Elemente in diesem Abschnitt
entspricht der [ bereits weiter oben
beschriebenen](Konfigurationsdatei_wollmux.conf#.28.3CBeschreibung_Eingabefeld_1.3E.29 "wikilink").
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

-   das Feld wird mit dem AUTOFILL-Wert vorbelegt
-   die Suche wird gleich beim Aufrufen des Dialogs mit diesem Wert
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

`datenquellenname(Spaltenname1 "`<Suchmuster1>`" Spaltenname2 "`<Suchmuster2>`" ... )`

Im Folgenden einige Praxisbeispiele:

`personal(Mail "${suchanfrage1}")
`personal(Mail "${suchanfrage1}@muenchen.de")
`personal(Nachname "${suchanfrage1}*")
`personal(Vorname "${suchanfrage1}" Nachname "${suchanfrage2}")
`personal(OrgaKurz "${suchanfrage1}-${suchanfrage2}")`

Bemerkungen:

-   Als Platzhalter sind \${suchanfrage1} bis \${suchanfrage2} erlaubt
    und werden durch entsprechende Wörter der vom Benutzer eingegebenen
    Suchanfrage ersetzt.
-   Sternchen sind als Jokerzeichen erlaubt und stehen für einen
    beliebigen Teilstring
-   Die Suchmuster für die eingegebene Anzahl von Wörtern werden in der
    Reihenfolge ihres Auftretens versucht und die Ergebnisse der ersten
    Anfrage zurückgeliefert, die mindestens ein Ergebnis liefert.
-   Suchmuster, die mehr Wörter erfordern als der Benutzer eingegeben
    hat, werden ignoriert.
-   Gibt es für die Anzahl vom Benutzer eingegebener Wörter keine Regel,
    so wird die Eingabe so lange von hinten beginnend gekürzt bis sie
    entweder leer ist oder eine Wortzahl erreicht wurde, für die es eine
    Regel gibt.
-   Die Angabe eines Suchmusters ohne Spalten (d.h. nur
    der Datenquellenname) ist möglich und bedeutet, dass leere
    Suchanfragen und die Suchanfrage "\*" erlaubt sind und alle
    Datensätze der Datenquelle zurückliefern sollen. **ACHTUNG!** Dieses
    Feature wird derzeit nicht von allen Datenquellentypen unterstützt
    und nur nach Bedarf weiterentwickelt.

Spaltenumsetzung
----------------

Die von der Datenquelle gelieferten Datensätze haben meist nicht genau
das Schema, das man benötigt. Der *Spaltenumsetzung*-Abschnitt erlaubt
es mittels beliebiger
[Funktionen](Konfigurationsdatei_wollmux.conf#Funktionen "wikilink") aus
den in der Datenquelle existierenden Spalten neue Spalten zu generieren.
Der Aufbau des Abschnitts *Spaltenumsetzung* ist genau wie der des
*Funktionen*-Abschnitts. Das folgende Beispiel demonstriert dies:

`Spaltenumsetzung(
`  EmpfaengerZeile1(CAT(VALUE("Vorname") " " VALUE("Nachname")))
`  EmpfaengerZeile2(VALUE("Postanschrift"))
`  EmpfaengerZeile3(CAT(VALUE("PostPLZ") " " VALUE("PostOrt")))
`  Vorname(VALUE("Vorname"))   # 1:1  Umsetzung
`)`

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

Achtung: Die Spaltennamen im DISPLAY-Attribut sind grundsätzlich durch den *Spaltenumsetzung*-Abschnitt definierte Spalten. Soll eine Spalte des Datensatzes unverändert angezeigt werden, so muss eine entsprechende 1:1 Umsetzung im *Spaltenumsetzung*-Abschnitt erfolgen.

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

Achtung: Die Spaltennamen im DB\_SPALTE-Attribut sind grundsätzlich durch den *Spaltenumsetzung*-Abschnitt definierte Spalten. Soll eine Spalte des Datensatzes unverändert angezeigt werden, so muss eine entsprechende 1:1 Umsetzung im *Spaltenumsetzung*-Abschnitt erfolgen.

Fussbereich
-----------

In diesem Abschnitt werden Eingabeelemente definiert, die am unteren
Rand des Tabs angezeigt werden sollen, typischerweise Buttons.

ACTIONs in "dbSelect" Funktionsdialogen
---------------------------------------

Funktionsdialoge des Typs dbSelect unterstützen die folgenden ACTIONs:

-   **back:** Kehrt zum aufrufenden Dialog zurück. Es wird kein
    Datensatz ausgewählt. Im Kontext des Formularsystems normalerweise
    kein Unterschied zu abort.
-   **abort:** Schließt den Dialog. Es wird kein Datensatz ausgewählt.
-   **select:** Wählt den momentan in der Ergebnisliste markierten
    Datensatz aus. DIALOG-Funktionen, die sich auf diesen
    Funktionsdialog beziehen liefern ab diesem Zeitpunkt die Werte des
    ausgewählten Datensatzes.
-   **search:** Führt die Suche gemäß der vom Benutzer eingegebenen
    Suchwörter durch und aktualisiert die Ergebnisliste entsprechend.

Druckfunktionen
===============

Zur Automatisierung des Drucks mehrerer leicht verschiedener
Ausfertigungen eines Dokuments können sog. Druckfunktionen definiert
werden. Dazu dient der Abschnitt "Druckfunktionen". Alle Druckfunktionen
die in diesem Abschnitt definiert werden sind global verfügbar:

`Druckfunktionen(
\
`  SachleitendeVerfuegung(EXTERN(URL "java:de.muenchen.allg.itd51.wollmux.func.StandardPrint.sachleitendeVerfuegung") ORDER "10")
`  SachleitendeVerfuegungOutput(EXTERN(URL "java:de.muenchen.allg.itd51.wollmux.func.StandardPrint.sachleitendeVerfuegungOutput") ORDER "150")
\
`  AlleKrankenkassen(EXTERN(URL "vnd.sun.star.script:WollMux.Tools.AlleKrankenkassen) ORDER "20")
`)`

Anmerkungen:

-   Da Druckfunktionen nur als externe Funktionen implementiert werden,
    darf dem Funktionsbezeichner ausschließlich der Schlüssel
    "EXTERN(...)" mit einer gültigen URL folgen, die den physikalischen
    Ort der externen Druckfunktion beschreibt.
-   Einzelne Druckfunktionen können in einem späteren Abschnitt
    "Druckfunktionen" redefiniert werden.
-   Im Unterschied zu normalen Funktionen werden Druckfunktionen immer
    asynchron in einem eigenen Thread gestartet. Der WollMux überwacht
    nicht, ob die Druckfunktion zurückkehrt und ob dabei
    Fehler auftraten.

Das Attribut ORDER: Verschiedene Druckfunktionen können beliebig kombiniert und hintereinander ausgeführt werden. Ein praktischer Anwendungszweck ist z.B. die Möglichkeit, den Komfortdruck für Sachleitende Verfügungen mit dem Komfortdruck für Serienbriefe zu verketten. Das Attribut ORDER definiert dabei die Reihenfolge, in der die einzelnen Druckfunktionen kombiniert werden, wobei Druckfunktionen mit kleinem ORDER-Wert vor Druckfunktionen mit höherem ORDER-Wert ausgeführt werden. Das Attribut ORDER ist für alle Druckfunktionen optional, sollte aber stets angegeben werden, damit die Aufrufkette immer eindeutig definiert ist. Ist das ORDER-Attribut nicht angegeben, so wird automatisch die Voreinstellung "100" verwendet.

de.muenchen.allg.itd51.wollmux.func.StandardPrint
-------------------------------------------------

Dieses Java-Modul enthält einige vorgefertigte Standard-Druckfunktionen.
Alle diese Druckfunktionen sind auch in der
WollMux-Standard-Konfiguration definiert.

-   *sachleitendeVerfuegung*: Druckt die verschiedenen Ausdrucke eines
    Dokuments mit Sachleitenden Verfügungen.
-   *sachleitendeVerfuegungOutput*: Die Druckfunktion wird automatisch
    im Hintergrund von der Druckfunktion sachleitendeVerfuegung
    verwendet und muss nie direkt aufgerufen bzw. eingebunden werden.
-   *mailMergeWithoutSelection*: Serienbriefdruck: Druckt für jeden
    Datensatz der über Bearbeiten/Datenbank austauschen gewählten
    Tabelle eine entsprechende Ausfertigung.
-   *mailMergeWithSelection*: Serienbriefdruck: Präsentiert dem Benutzer
    eine Auswahlliste in der er die Datensätze wählen kann, für die eine
    Ausfertigung gedruckt werden soll. Angezeigt wird in dieser Liste
    für jeden Datensatz der Inhalt der Spalte "WollMuxDescription". Ist
    eine Spalte "WollMuxSelected" vorhanden und enthält "1", "ja" oder
    "true", so ist der entsprechende Datensatz in der Auswahlliste
    bereits vorselektiert.
-   *superMailMerge*: Interaktive Seriendruckfunktion: Lässt den
    Benutzer eine Tabelle einer in OOo registrierten Datenquelle *oder
    eine Tabelle einer offenen Calc-Datei* auswählen als Datenlieferant
    für den Seriendruck. Im Falle der Calc-Tabelle werden nur die
    sichtbaren Zellen verwendet. Es ist also möglich, vor dem
    Seriendruck in Calc die Daten zu filtern. Ein Button *Einzelauswahl*
    erlaubt eine manuelle Selektion genau wie bei der Funktion
    *mailMergeWithSelection*. Die Spalten "WollMuxDescription" und
    "WollMuxSelected" werden in diesem Fall wie dort
    beschrieben ausgewertet.
-   *printIntoFile*: "Druckt" den Inhalt in ein offenes Writer-Dokument.
    Das XTextDocument in das der Druck geschrieben werden soll kann über
    das Property `PrintIntoFile_OutputDocument` des XPrintModels
    gesetzt werden. Ist dieses Property nicht gesetzt, so wird ein neues
    Dokumentfenster geöffnet.

Informationen zum Entwickeln eigener Konfortdruckfunktionen finden Sie
unter: [Schnittstellen für Experten: Einbinden von
Komfortdruckfunktionen](Schnittstellen_des_WollMux_f%C3%BCr_Experten#Einbinden_eigener_Komfortdruckfunktionen "wikilink").

Formulare
=========

Es gibt ein paar globale Einstellungen für Formulare, die im Abschnitt
*Formulare* festgelegt werden können. Das folgende Beispiel zeigt einen
entsprechenden Abschnitt.

`Formulare(
`  
\
`  Plausiwarnung( 
`    TYPE "confirm"
`    TITLE "WARNUNG!"
`    LABEL "Sie wollen ein Formular produzieren, das fehlerhaft ausgefüllt wurde. Wirklich fortfahren?"
`  )
`)`

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

Beispiel 1:

`Formularanpassung(
`     # Anpassung soll nur Formulare betreffen mit Titel "BS-Bescheid", die einen
`     # Reiter "Empfaengerauswahl" haben
`  Match( TITLE "BS-Bescheid" )          
`  Match( Fenster(Empfaengerauswahl(Eingabefelder())) )
\
`  Formular(
`    Fenster(
`      Empfaengerauswahl(
`        TITLE "Empfänger"
\
`        Eingabefelder(
`          (LABEL "Zustellvermerk" TYPE "combobox" ID "EmpfaengerZustellvermerk" ...)
`           ...
`        )
`        Buttons(
`          (LABEL "Abbrechen"  TYPE "button" HOTKEY "A"  ACTION "abort" TIP "Zum Abbrechen hier klicken")
`        ...
`        )
`      )
`    )
`  )
`)`

Beispiel 2:

`# Bei allen Formularen den Drucken-Knopf verbieten, dafür aber einen PDF-Knopf anbieten
`# Außerdem reparieren wir hier die Weiter/Zurück-Steuerung, die durch das Ändern des
`# Empfaengerauswahl-Reiters durcheinandergebracht wird
`Formularanpassung(
`  # keine Match() Angaben, betrifft also alle Formulare
\
`  Buttonanpassung(
`      EinzigerTab( NEVER ("printForm" "prevTab", "nextTab" )
`                   ALWAYS (LABEL "Als Pdf speichern..." TYPE "button" TIP "" READONLY "false" ACTION "form2PDF"
`                 )
`      ErsterTab( NEVER ("form2PDF", "printForm", "prevTab")
`                 ALWAYS (LABEL "Weiter->"  TYPE "button" HOTKEY "W"  ACTION "nextTab")
`               )
`      MittlererTab( NEVER ("form2PDF", "printForm")
`                    ALWAYS (LABEL "<-Zurück"  TYPE "button" HOTKEY "Z"  ACTION "prevTab")
`                    ALWAYS (LABEL "Weiter->"  TYPE "button" HOTKEY "W"  ACTION "nextTab")
`                  )
`      LetzterTab(NEVER ("printForm" "nextTab")
`                   ALWAYS (LABEL "<-Zurück"  TYPE "button" HOTKEY "Z"  ACTION "prevTab")
`                   ALWAYS (LABEL "Als Pdf speichern..." TYPE "button" TIP "" READONLY "false" ACTION "form2PDF"
`                )
`    )
`)`

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

Hinweise:

-   Die Änderungen durch *Formularanpassung*-Abschnitte werden nicht nur
    auf die Anzeige der Formular-GUI angewendet, sondern betreffen auch
    WollMux-Funktionen, die die Formularbeschreibung verändern, allen
    voran der [FormularMax 4000](FormularMax_4000 "wikilink"). D.h.
    falls ein von einem *Formularanpassung*-Abschnitt betroffenes
    Formular im FM4000 zum Bearbeiten geöffnet wird, so wird dort die
    *angepasste* Formularbeschreibung angezeigt und mit dem nächsten
    Speichern wird diese permanent in die Vorlangendatei übertragen.
    Dies kann verwendet werden, um mit relativ geringem Aufwand
    Änderungen in viele Formularvorlagen zu übertragen.
-   Bei Verwendung von
    [wollmux:Open](Schnittstellen_des_WollMux_f%C3%BCr_Experten#wollmux:Open "wikilink")
    in Gegenwart von *Formularanpassung*-Abschnitten wird die
    *Buttonanpassung* des wollmux:Open Befehls *nach* der Abarbeitung
    aller *Formularanpassung*-Abschnitte durchgeführt.
-   In der [Syntax der
    wollmux.conf](Format_von_WollMux-Config-Dateien "wikilink") bedeuten
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

Hinweis: Die Reihenfolge von Abschnitten und Schlüssel-Wert-Paaren in *Match*-Abschnitten ist bedeutungslos. Deswegen kann man auch alle *Match*-Abschnitte zu einem großen *Match*-Abschnitt zusammenfassen ohne die Bedeutung zu verändern.

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

-   *EinzigerTab:* Wird angewendet, wenn die angepasste Formular-GUI
    genau einen Reiter besitzt.
-   *ErsterTab:* Wird für den ersten Reiter der angepassten Formular-GUI
    angewendet, wenn die Formular-GUI mindestens 2 Reiter besitzt.
-   *LetzterTab:* Wird für den letzten Reiter der angepassten
    Formular-GUI angewendet, wenn die Formular-GUI mindestens 2
    Reiter besitzt.
-   *MittlererTab:* Wird für einen Reiter angewendet, der weder der
    erste noch der letzte Reiter der angepassten Formular-GUI ist. So
    ein Reiter existiert nur, wenn die Formular-GUI mindestens 3
    Reiter besitzt.

In jedem dieser Abschnitte können Regeln angegeben werden wie im
folgenden beschrieben.

### NEVER (<Aktionsliste>)

Alle Buttons, denen eine ACTION aus der <Aktionsliste> zugeordnet ist
werden vom betreffenden Reiter entfernt.

### ALWAYS (<Bedienelement>)

Überprüft, ob der betreffende Reiter bereits einen Button mit der selben
ACTION-Angabe wie <Bedienelement> hat. Falls nicht, so wird der durch
<Bedienelement> beschriebene Button in die Buttonleiste des Reiters
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

`ExterneAnwendungen(
`  (EXT ("pdf", "PDF") 
`     DOWNLOAD "true"
`     PIPE "true"
`     FILTER "writer_pdf_Export"
`     PROGRAM (
`       "acroread",
`       "acroread.bat", 
`       "AcroRd32.exe", 
`       "C:\Programme\Adobe\Acrobat 6.0\Reader\AcroRd32.exe"
`    ) 
`  )
` 
` (EXT "http:" 
`    DOWNLOAD "false" 
`    PROGRAM (
`      "sensible-browser", 
`      "sensible-browser.bat"
`    )
`  )
`)#ExterneAnwendungen`

Die Attribute der Einträge des Abschnitts sind im folgenden näher
erläutert.

EXT <Liste>
-----------

Die beim Attribut EXT angegebene Liste von Strings dient dazu, die
externe Anwendung zu identifizieren zu der der Eintrag gehört. Über das
gleichnamige Attribut bei Buttons mit [ACTION
"openExt"](Konfigurationsdatei_wollmux.conf#Das_Attribut_ACTION "wikilink")
wird der Bezug zwischen dem Button und der externen Anwendung
hergestellt. Die Strings der <Liste> sind beliebig und
Groß-/Kleinschreibung ist bedeutsam. Typischerweise werden hier die
Dateierweiterungen verwendet, die die entsprechende Applikation
verarbeitet. Im Falle, dass die Anwendung URLs direkt verarbeitet ist
die Angabe des Protokolls als Bezeichner gefolgt von einem Doppelpunkt
zur Abgrenzung gegenüber Dateierweiterungen sinnvoll (z.B. "http:").

PROGRAM <Liste>
---------------

Auf verschiedenen Plattformen ist das selbe Programm unter Umständen
unter verschiedenen Namen bzw. in verschiedenen Dateipfaden zu finden.
Um dennoch eine einheitliche Konfiguration für verschiedene Plattformen
verwenden zu können, erlaubt das PROGRAM-Attribut die Angabe einer
<Liste> von Programmnamen und Pfaden. Soll die externe Anwendung
gestartet werden, so versucht der WollMux die Einträge der <Liste> in
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

` # NEVER_EXECUTE = 0;
` # FROM_LIST = 1;
` # ALWAYS_EXECUTE = 2;
` # USE_CONFIG = 3;
` # ALWAYS_EXECUTE_NO_WARN = 4;
` # USE_CONFIG_REJECT_CONFIRMATION = 5;
` # USE_CONFIG_APPROVE_CONFIRMATION = 6;
` # FROM_LIST_NO_WARN = 7;
` # FROM_LIST_AND_SIGNED_WARN = 8;
` # FROM_LIST_AND_SIGNED_NO_WARN = 9;`

Näheres siehe in der [IDL-Doku zu
loadComponentFromURL](http://api.openoffice.org/docs/common/ref/com/sun/star/frame/XComponentLoader.html).

### Technische Hinweise

-   Angaben ohne Pfad werden wie allgemein üblich mit Hilfe der
    Systemvariable PATH aufgelöst.
-   Nach dem Start einer externen Anwendung schließt der WollMux
    normalerweise den Standardeingabe-, Standardausgabe- sowie den
    Standardfehlerkanal, um zu verhindern, dass die Anwendung blockiert
    weil sie auf Eingabe wartet bzw. Ausgabe tätigen möchte. Nicht alle
    Programme kommen damit zurecht. Für Programme, die mit diesem
    Verhalten Probleme haben, kann entweder das [Attribut PIPE
    "true"](Konfigurationsdatei_wollmux.conf#PIPE_.22.3Ctrue_oder_false.3E.22 "wikilink")
    gesetzt oder ein einfaches Skript als Wrapper geschrieben werden,
    das die Eingabe/Ausgabe von/zu entsprechenden Stellen umleitet.

DOWNLOAD "<true_oder_false>"
----------------------------

Die Angabe des Attributs DOWNLOAD ist optional (Defaultwert ist
"false"). Im Falle DOWNLOAD "false" wird der externen Anwendung die URL
der zu öffnenden Datei direkt als URL übergeben. Im Falle DOWNLOAD
"true" wird die URL erst heruntergeladen und in einer temporären Datei
gespeichert, deren Pfad an die externe Anwendung übergeben wird.

### Technische Hinweise

-   Die temporäre Datei wird im Standardverzeichnis für
    benutzerspezifische temporäre Daten gespeichert (unter Windows 2000
    ist dies C:\\Dokumente und Einstellungen\\<Anmeldekürzel>\\Lokale
    Einstellungen\\Temp), in einem Unterverzeichnis
    wollmuxbar-temp-download-<Zahl>, wobei <Zahl> bei jeder Datei um 1
    heraufgezählt wird.
-   Die temporäre Datei wird durch den WollMux nicht
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

PIPE "<true_oder_false>"
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

FILTER "<Filtername>"
---------------------

Die Angabe des Attributs FILTER ist nur notwendig, wenn der WollMux
Dateien für diese Anwendung schreiben muss. Dies ist z.B. der Fall, wenn
die externe Anwendung über die [ACTION "closeAndOpenExt" oder
"saveTempAndOpenExt"](Dokumentkommandos_des_WollMux#ACTION_.22Aktion.22 "wikilink"),
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
<Installationsverzeichnis>`/basis3.1/share/registry/modules/org/openoffice/TypeDetection/Filter/fcfg_writer_filters.xcu`
finden. Der als Filtername für das FILTER-Attribut zu verwendende
Bezeichner ist der dem gewünschten Format entsprechende String, der in
dieser Datei hinter <code><node oor:name=</code> steht. Wichtig: Es
können nur solche Filter zum Speichern verwendet werden, bei denen in
der darauf folgenden Zeile (beginnt mit <prop oor:name="Flags">) das
Wort "EXPORT" steht. Beispiele für legale Filternamen sind z.B. "Rich
Text Format", "HTML (StarWriter)", "MS Word 95", "writer\_pdf\_Export",
etc.

Der Abschnitt SachleitendeVerfuegungen
======================================

Der Abschnitt SachleitendeVerfuegungen enthält Attribute, über die das
Verhalten der Funktionen der Sachleitenden Verfügunen gesteuert werden
können. Der Abschnitt hat folgenden Aufbau:

`SachleitendeVerfuegungen(
`  NUMBERS "`<zahlenformat>`"
`  ABDRUCK_NAME "`<alternative-Bezeichnung>`"
\
`  ALL_VERSIONS_HIGHLIGHT_COLOR "`<farbe>`"
`  NOT_IN_ORIGINAL_HIGHLIGHT_COLOR "`<farbe>`"
`  ORIGINAL_ONLY_HIGHLIGHT_COLOR "`<farbe>`"
`  DRAFT_ONLY_HIGHLIGHT_COLOR "`<farbe>`"
`  COPY_ONLY_HIGHLIGHT_COLOR "`<farbe>`"
`) `

Das Attribut NUMBERS: Steuert die Darstellung der Ziffern von Verfügungspunkten und kann entweder die Werte "roman" (I., II., III., ...) oder "arabic" (1., 2., 3., ...) enthalten. Fehlt das Attribut, so ist "roman" Standardeinstellung.

<!-- -->

Das Attribut ABDRUCK\_NAME: Ermöglicht die Definition einer alternativen Bezeichnung für "Abdruck", so dass bei Abdrücken z.B. der Text "2. Kopie von 1." angezeigt werden könnte. Fehlt dieses Attribut, so gilt die Standardeinstellung "Abdruck".

<!-- -->

Die Attribute \*\_HIGHLIGHT\_COLOR "<farbe>": Über die Attribute \*\_HIGHLIGHT\_COLOR können Hintergrundfarben vergeben werden, mit denen die [Blöcke zur Drucksteuerung](Hilfen_f%C3%BCr_Sachleitende_Verf%C3%BCgungen_verwenden#Die_Schaltfl.C3.A4chen_zur_Drucksteuerung_einzelner_Bl.C3.B6cke "wikilink") der Sachleitenden Verfügungen hinterlegt werden können, um sie optisch abzuheben und damit leichter orten zu können. Die Farbe <farbe> wird als Hex-Zahl in der Form AARRGGBB (A=Alpha, R=Rot, G=Grün, B=Blau) beschrieben (z.B. entspricht "00ff0000" der Farbe rot). Führende Nullen können dabei weggelassen werden - so kann die vorherige Beispielzahl auch als "ff0000" beschrieben werden. Um den Druckblock ohne farbliche Markierung erscheinen zu lassen, ist der Wert **"none"** zu verwenden. Der vordere Teil des Attributnamens (z.B. ALL\_VERSIONS) ist analog zu den Namen der entsprechenden [Dokumentkommandos](Dokumentkommandos_des_WollMux#Kommandos_in_Sachleitende_Verf.C3.BCgungen "wikilink") benannt. Beim Drucken der Sachleitenden Verfügungen werden die in \*\_HIGHLIGHT\_COLOR gesetzten Farben **nicht** mit ausgedruckt.

Ein Beispielabschnitt sieht wie folgt aus:

`SachleitendeVerfuegungen(
`  NUMBERS "arabic"
`  ABDRUCK_NAME "Kopie"
\
`  ALL_VERSIONS_HIGHLIGHT_COLOR "ff0000"
`  NOT_IN_ORIGINAL_HIGHLIGHT_COLOR "00ff00"
`  ORIGINAL_ONLY_HIGHLIGHT_COLOR "ff00ff"
`  DRAFT_ONLY_HIGHLIGHT_COLOR "0000ff"
`  COPY_ONLY_HIGHLIGHT_COLOR "b8ffb8"
`) `

Verwendet arabische Ziffern für die Zählung der Verfügungspunkte und
schreibt für Abdrücke immer "1. Kopie von 2.", statt "II. Abdruck von
I.". Wird nun z.B. über die Schaltfläche [Block: immer
drucken](Hilfen_f%C3%BCr_Sachleitende_Verf%C3%BCgungen_verwenden#Schaltfl.C3.A4che_.22Block:_immer_drucken.22 "wikilink")
ein Block "immer Drucken" (repräsentiert durch das [Dokumentkommando
allVersions](Dokumentkommandos_des_WollMux#Das_Kommando_.22allVersions.22 "wikilink"))
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

[WollMux-Funktionen](Konfigurationsdatei_wollmux.conf#Arithmetik "wikilink")
verwenden automatisch das für die in OpenOffice.org eingestellte Region
passende Dezimaltrennzeichen (normalerweise Punkt oder Komma).

Hinweis: [Issue 80654](http://qa.openoffice.org/issues/show_bug.cgi?id=80654) sorgt unter Umständen für eine falsche Erkennung der Region, wenn die gewählte Benutzerinterface-Sprache von den gewählten Ländereinstellungen abweicht.

Der Abschnitt L10n
------------------

Über den Abschnitt *L10n* in der `wollmux.conf` können manuelle
Lokalisierungsanpassungen vorgenommen werden.

### Unterabschnitt Messages

Der Unterabschnitt *Messages* ist verantwortlich für die Übersetzung der
vom WollMux angezeigten Texte, inklusive der Beschriftung von Buttons,
Menüs,... Folgendes Beispiel demonstriert seinen Aufbau:

`Messages(
`       original "Bearbeiten..."    # Originaltext, normalerweise deutsch
`         en "Edit..."              # Übersetzung in Sprache "en"(glisch)
`         nl "Wijzigen..."          # Übersetzung in Sprache "n"(ieder)"l"(ändisch)
\
`       original "Welchen Absender möchten Sie für Ihre Briefköpfe verwenden ?"
`         en "Which sender do you want to use in your letters?"
`         nl "Welk afzender willt u voor de briefhoofden gebruiken?"
\
`       original "Schließen"
`         en "Close"
`         nl "Sluiten"
`)`

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

`LanguageAliases(
`   ("en"   "en_US" "en_UK" ...)
`   ("de"   "de_DE" "de_AT" ...)
`   ...
`  )`

Das erste Sprachkürzel der Zeile ist das Kürzel unter dem die Texte im
Abschnitt *Messages* hinterlegt sind. Alle folgenden Kürzel sind die
Sprachen für die (in Abwesenheit spezifischer Einträge in *Messages*)
ebenfalls die selben Texte verwendet werden sollen.

Dokumentaktionen
================

Der Abschnitt *Dokumentaktionen* bietet die Möglichkeit, dynamisch zu
steuern, wie der WollMux Dokumente und Vorlagen verarbeitet. Sein Aufbau
entspricht dem des Abschnitts *[Funktionen](#Funktionen "wikilink")*.

`Dokumentaktionen(
`  DMS(
`    SELECT(
`       # Falls die Benutzervariable FSC_CFGMUENCHEN_... vorhanden und leer ist => Vorlage bearbeiten
`      IF(STRCMP(VALUE "User/FSC_CFGMUENCHEN_15_1700_DocumentObjname" "") THEN "noaction")
`       # Falls die Benutzervariable FSC_CFGMUENCHEN_... vorhanden und nicht leer ist
`       #   => Wir sind Sachbearbeiter und wollen Expansionen und FormularGUI haben.
`      ELSE "allactions"
`       # Falls die Benutzervariable FSC_CFGMUENCHEN_... *nicht* vorhanden ist, bricht SELECT
`       # bereits beim ersten IF ab (weil STRCMP einen Fehler liefert weil VALUE einen Fehler liefert)
`       # und liefert den ONERROR-Wert zurück. Leerstring bedeutet => Diese Dokumentaktionen-Funktion
`       # hat keine Meinung dazu, wie das Dokument verarbeitet werden soll.
`      ONERROR ""
`    )
`  )
`)`

-   Die WollMux-Funktionen in diesem Abschnitt werden der Reihe nach
    aufgerufen, bevor der WollMux das Dokument bearbeitet.

Hinweis: Bestimmte, teils auch verändernde, Handlungen führt der WollMux noch vorher aus.

-   Die erste Funktion, die einen Wert ungleich leer zurückliefert
    bestimmt, wie der WollMux das Dokument behandeln soll. Weitere
    Funktionen werden dann nicht aufgerufen.
-   Gibt die Funktion den Wert "noaction" zurück, behandelt der WollMux
    das Dokument wie eine zum Bearbeiten geöffnete Vorlage, d.h. es
    werden weder Expansionen ausgeführt noch Werte eingefügt noch wird
    eine FormularGUI gestartet.
-   Gibt die Funktion den Wert "allactions" zurück, führt der WollMux
    alle sinnvollen Aktionen auf dem Dokument aus, auch wenn dies
    ansonsten nicht geschehen wäre (z.B. bei einer zum Bearbeiten
    geöffneten Vorlage). Unsinnige Aktionen, wie das Anzeigen einer
    FormularGUI bei einem Dokument ohne Formularbeschreibung, werden
    nicht durchgeführt.
-   In den Funktionen des Dokumentaktionen-Abschnitts wird die [VALUE
    Grundfunktion](Konfigurationsdatei_wollmux.conf#VALUE_.3CArgument.3E "wikilink")
    wie folgt verwendet:
    -   Das Argument ist in der Form "<Namensraum>/<id>".
    -   Derzeit wird für <Namensraum> nur "User" unterstützt, was auf
        Benutzervariablen (siehe Feldbefehle) zugreift. Die id ist in
        dem Fall der Variablenname.

FormularMax4000
===============

Im Abschnitt *FormularMax4000* können Einstellungen zum [FormularMax
4000](FormularMax_4000 "wikilink") getätigt werden.

Unterabschnitt *Standardelemente*
---------------------------------

Im Unterabschnitt *Standardelemente* des Abschnitts *FormularMax4000*
wird festgelegt, welche Einträge im Menü *Einfügen/Standardelemente
einfügen* vorhanden sein sollen. Folgendes Beispiel demonstriert seinen
Aufbau (eine Erklärung der im Beispiel verwendeten
Formular-GUI-Beschreibung findet sich unter [Dokumentkommandos des
WollMux](Dokumentkommandos_des_WollMux#Beschreibung_der_Formular-GUI "wikilink")):

`FormularMax4000(
` Standardelemente(
`   (  LABEL "Empfängerauswahl-Tab"
`      Tab(
`        Empfaengerauswahl(
`          TITLE "Empfänger"
`          CLOSEACTION "abort"
`          TIP "Hier können Sie den Empfänger auswählen"
`          HOTKEY "E"
`          
`          Eingabefelder(
`            (LABEL "Zustellvermerk" TYPE "combobox" ID 
`               "EmpfaengerZustellvermerk" VALUES("", "Einschreiben" "Einschreiben eigenhändig" "Einschreiben mit Rückschein" "Einschreiben eigenhändig mit Rückschein" "elektronischer Postzustellungsauftrag" "gegen Empfangsbekenntnis" "gegen Postzustellungsurkunde" "per E-Mail" "per Telefax" "öffentliche Zustellung"))
`            
`            (LABEL "Empfänger Zeile 1" TYPE "textfield" ID "EmpfaengerZeile1"
`               AUTOFILL(DIALOG("Empfaengerauswahl","EmpfaengerZeile1"))
`            )
`            (LABEL "Empfänger Zeile 2" TYPE "textfield" ID "EmpfaengerZeile2"
`               AUTOFILL(DIALOG("Empfaengerauswahl","EmpfaengerZeile2"))
`            )
`            (LABEL "Empfänger Zeile 3" TYPE "textfield" ID "EmpfaengerZeile3"
`               AUTOFILL(DIALOG("Empfaengerauswahl","EmpfaengerZeile3"))
`            )
`            (LABEL "Empfänger Zeile 4" TYPE "textfield" ID "EmpfaengerZeile4"
`               AUTOFILL(DIALOG("Empfaengerauswahl","EmpfaengerZeile4"))
`            )
`            (LABEL "Empfänger Zeile 5" TYPE "textfield" ID "EmpfaengerZeile5"
`               AUTOFILL(DIALOG("Empfaengerauswahl","EmpfaengerZeile5"))
`            )
`            (LABEL "Empfänger Zeile 6" TYPE "textfield" ID "EmpfaengerZeile6"
`               AUTOFILL(DIALOG("Empfaengerauswahl","EmpfaengerZeile6"))
`            )
`            (LABEL "Ihr Schreiben vom" TYPE "textfield" ID "IhrSchreibenVom")
`            (LABEL "Ihr Zeichen" TYPE "textfield" ID "IhrZeichen")
`            (LABEL "Unser Zeichen" TYPE "textfield" ID "UnserZeichen")
`          )
`          Buttons(
`            (LABEL "Abbrechen"  TYPE "button" HOTKEY "A"  ACTION "abort" TIP "Zum Abbrechen hier klicken")
`            (TYPE "glue" MINSIZE "20")
`            (LABEL "Adressauswahl" TYPE "button" HOTKEY "S"  ACTION "funcDialog" DIALOG "Empfaengerauswahl" TIP "Hier kommen Sie zur Empfängerauswahl")
`            (TYPE "glue" MINSIZE "20")
`            (LABEL "Weiter->"  TYPE "button" HOTKEY "W"  ACTION "nextTab")
`          )
`        )
`     )
`   )
\
`   (  LABEL "Abbrechen, <-Zurück, Weiter->"
`      Buttons(
`       (LABEL "Abbrechen"  TYPE "button" HOTKEY "A"  ACTION "abort")
`       (TYPE "glue" MINSIZE "20")
`       (LABEL "<-Zurück"  TYPE "button" HOTKEY "Z"  ACTION "prevTab")
`       (LABEL "Weiter->"  TYPE "button" HOTKEY "W"  ACTION "nextTab")
`      )
`   )
\
`   ( LABEL "Abbrechen, <-Zurück, PDF, Drucken"
`     Buttons(
`       (LABEL "Abbrechen"  TYPE "button" HOTKEY "A"  ACTION "abort")
`       (TYPE "glue" MINSIZE "20")
`       (LABEL "Als Pdf speichern..." TYPE "button" HOTKEY "S" ACTION "form2PDF")
`       (TYPE "glue" MINSIZE "20")
`       (LABEL "<-Zurück"  TYPE "button" HOTKEY "Z"  ACTION "prevTab")
`       (LABEL "Drucken..." TYPE "button" HOTKEY "D" ACTION "printForm")
`     )
`   )
\
`   ( LABEL "Abbrechen, <-Zurück, Speichern, Drucken"
`     Buttons(
`       (LABEL "Abbrechen"  TYPE "button" HOTKEY "A"  ACTION "abort")
`       (TYPE "glue" MINSIZE "20")
`       (LABEL "Speichern..." TYPE "button" HOTKEY "S" ACTION "save")
`       (TYPE "glue" MINSIZE "20")
`       (LABEL "<-Zurück"  TYPE "button" HOTKEY "Z"  ACTION "prevTab")
`       (LABEL "Drucken..." TYPE "button" HOTKEY "D" ACTION "printForm")
`     )
`   )
` )
`)`

<Category:Eierlegender_WollMux> <Category:Handbuch_des_WollMux>
[Category:WollMux English](Category:WollMux_English "wikilink")
