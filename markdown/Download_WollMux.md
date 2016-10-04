On this page, you will find direct links to download the most recent release.

You can find detailed installation instructions on the page "[Installing WollMux](Installing_WollMux.md)"

## Current Release

### Windows ###

<table border="2" cellspacing="0" cellpadding="4" rules="all" style="margin:1em 1em 1em 0; border:solid 1px #AAAAAA; border-collapse:collapse; background-color:#F9F9F9; font-size:100%; empty-cells:show;">
<tr>
<th width="250px" colspan="2"> Download
</th>
<th>Description
</th></tr>
<tr>
<td colspan="2"> <a href="/wiki/Datei:Windows-icon.png" class="image"><img alt="Windows-icon.png" src="Windows-icon.png" width="16" height="16" /></a> <a rel="nofollow" class="external text" href="http://www.wollmux.net/files/15.04/WollMux-15.04-installer.exe">WollMux-15.04-installer.exe</a>
</td>
<td> The Windows Installer automatically registers the WollMux extension (.oxt) within the LibreOffice/OpenOffice.org system, copies the <a href="/wiki/WollMuxBar" title="WollMuxBar">WollMuxBar</a> to your system and optionally generates a desktop icon and an entry in the start menu. You need administrator rights on your computer in order to execute the installer.<br />
<p><i>Note: In addition, you need a configuration for WollMux to function.</i>
</p>
</td></tr>
<tr>
<td rowspan="3"> WollMux configuration
<p><i>(Choose one of the files on the right)</i>
</p>
</td>
<td> <a href="/wiki/Datei:Windows-icon.png" class="image"><img alt="Windows-icon.png" src="Windows-icon.png" width="16" height="16" /></a> <a rel="nofollow" class="external text" href="http://www.wollmux.net/files/15.04/wollmux-config-de-15.04-installer.exe">wollmux-config-de-15.04-installer.exe</a>
</td>
<td> Windows Installer for the German-language sample configuration
</td></tr>
<tr>
<td> <a href="/wiki/Datei:Windows-icon.png" class="image"><img alt="Windows-icon.png" src="Windows-icon.png" width="16" height="16" /></a> <a rel="nofollow" class="external text" href="http://www.wollmux.net/files/15.04/wollmux-config-en-15.04-installer.exe">wollmux-config-en-15.04-installer.exe</a>
</td>
<td> Windows Installer for the English-language sample configuration
</td></tr>
<tr>
<td> <a href="/wiki/Datei:Windows-icon.png" class="image"><img alt="Windows-icon.png" src="Windows-icon.png" width="16" height="16" /></a> <a rel="nofollow" class="external text" href="http://www.wollmux.net/files/15.04/wollmux-config-nl-15.04-installer.exe">wollmux-config-nl-15.04-installer.exe</a>
</td>
<td> Windows Installer for the Dutch sample configuration
</td></tr>
</table>

### Manual Installation (all systems)

<table border="2" cellspacing="0" cellpadding="4" rules="all" style="margin:1em 1em 1em 0; border:solid 1px #AAAAAA; border-collapse:collapse; background-color:#F9F9F9; font-size:100%; empty-cells:show;">
<tr>
<th width="250px" colspan="2"> Download
</th>
<th colspan="2"> Description
</th></tr>
<tr>
<td colspan="2" rowspan="5"> <a href="/wiki/Datei:Linux-icon.png" class="image"><img alt="Linux-icon.png" src="/wiki/images/d/db/Linux-icon.png" width="15" height="18" /></a> <a href="/wiki/Datei:Windows-icon.png" class="image"><img alt="Windows-icon.png" src="/wiki/images/f/f2/Windows-icon.png" width="16" height="16" /></a> <a rel="nofollow" class="external text" href="http://www.wollmux.net/files/15.04/WollMux-15.04-manual_installation.zip">WollMux-15.04-manual_installation.zip</a>
</td></tr>
<tr>
<td> WollMux.oxt
</td>
<td> Extension for LibreOffice/OpenOffice.org. For a system-wide installation, run the following command as an administrator:
<p><code>unopkg add --shared WollMux.oxt</code>
</p><p>You can find the command <code>unopkg</code> in the program registry of your LibreOffice/OpenOffice.org installation registry.
</p><p>You can use the extension manager for an installation in the user area. You can start it in OpenOffice.org via Extras-&gt; Extension Manager.
</p><p><i>Note: You will need an additional configuration for WollMux to run. You can download it further down.</i>
</p>
</td></tr>
<tr>
<td> WollMuxBar.jar
</td>
<td> Contains the Java classes to start the WollMux bar. Copy this file to a program directory of your choice, for example to /usr/share/java/ (for Linux) or C:\programs\wollmux (for Windows).
<p>The WollMux bar can be activated with the command <code>java -jar WollMuxBar.jar</code>. Alternatively, you can also use one of the two following starter scripts:
</p>
</td></tr>
<tr>
<td> wollmuxbar (for Linux)
</td>
<td> Use this simple Unix Shell script to start the WollMuxBar.jar. The script assumes that WollMuxBar.jar is located in <code>/usr/share/java/</code>.
</td></tr>
<tr>
<td> wollmuxbar.exe (for Windows)
</td>
<td> Use this executable to sart the WollMuxBar.jar in Windows. The programme has to be located in the same directory as the file WollMuxBar.jar.
</td></tr>
<tr>
<td rowspan="3"> WollMux Configuration Linux
<p><i>(Choose one of the files on the right)</i>
</p>
</td>
<td> <a href="/wiki/Datei:Linux-icon.png" class="image"><img alt="Linux-icon.png" src="Linux-icon.png" width="15" height="18" /></a> <a rel="nofollow" class="external text" href="http://www.wollmux.net/files/15.04/wollmux-config-de-utf8-15.04.tar.gz">wollmux-config-de-utf8-15.04.tar.gz</a>
</td>
<td colspan="2"> German-language configuration for Linux systems with UTF-8 file encoding.<br />Extract this archive in <code>$HOME</code> so that the necessary directory <code>.wollmux/</code> is created there.
</td></tr>
<tr>
<td> <a href="/wiki/Datei:Linux-icon.png" class="image"><img alt="Linux-icon.png" src="Linux-icon.png" width="15" height="18" /></a> <a rel="nofollow" class="external text" href="http://www.wollmux.net/files/15.04/wollmux-config-en-utf8-15.04.tar.gz">wollmux-config-en-utf8-15.04.tar.gz</a>
</td>
<td colspan="2"> English-language configuration for Linux systems with UTF-8 file encoding.<br />Extract this archive in <code>$HOME</code> so that the necessary directory <code>.wollmux/</code> is created there.
</td></tr>
<tr>
<td> <a href="/wiki/Datei:Linux-icon.png" class="image"><img alt="Linux-icon.png" src="Linux-icon.png" width="15" height="18" /></a> <a rel="nofollow" class="external text" href="http://www.wollmux.net/files/15.04/wollmux-config-nl-utf8-15.04.tar.gz">wollmux-config-nl-utf8-15.04.tar.gz</a>
</td>
<td colspan="2"> Dutch configuration for Linux systems with UTF-8 data encoding.<br />Extract this archive in <code>$HOME</code> so that the necessary directory <code>.wollmux/</code> is created there.
</td></tr>
<tr>
<td rowspan="3"> WollMux Configuration Windows
<p><i>(Choose one of the files on the right)</i>
</p>
</td>
<td> <a href="/wiki/Datei:Linux-icon.png" class="image"><img alt="Linux-icon.png" src="Linux-icon.png" width="15" height="18" /></a> <a rel="nofollow" class="external text" href="http://www.wollmux.net/files/15.04/wollmux-config-de-iso8859-1-15.04.7z">wollmux-config-de-iso8859-1-15.04.7z</a>
</td>
<td colspan="2"> German-language configuration for Linux systems with ISO-8859-1 file encoding.<br />Extract this archive in <code>%USERPROFILE%</code> so that the necessary directory <code>.wollmux/</code> is created there.
</td></tr>
<tr>
<td> <a href="/wiki/Datei:Linux-icon.png" class="image"><img alt="Linux-icon.png" src="Linux-icon.png" width="15" height="18" /></a> <a rel="nofollow" class="external text" href="http://www.wollmux.net/files/15.04/wollmux-config-en-iso8859-1-15.04.7z">wollmux-config-en-iso8859-1-15.04.7z</a>
</td>
<td colspan="2"> English-language configuration for Linux systems with ISO-8859-1 file encoding.<br />Extract this archive in <code>%USERPROFILE%</code> so that the necessary directory <code>.wollmux/</code> is created there.
</td></tr>
<tr>
<td> <a href="/wiki/Datei:Linux-icon.png" class="image"><img alt="Linux-icon.png" src="Linux-icon.png" width="15" height="18" /></a> <a rel="nofollow" class="external text" href="http://www.wollmux.net/files/15.04/wollmux-config-nl-iso8859-1-15.04.7z">wollmux-config-nl-iso8859-1-15.04.7z</a>
</td>
<td colspan="2"> Dutch configuration for Linux systems with ISO-8859-1 data encoding.<br />Extract this archive in <code>%USERPROFILE%</code> so that the necessary directory <code>.wollmux/</code> is created there.
</td></tr>
</table>
