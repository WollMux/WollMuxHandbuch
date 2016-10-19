# Handbuch des WollMux
This repository contains the technical documentation for the [WollMux](https://github.com/WollMux/WollMux) project.

The documentation is written in [Markdown format](https://toolchain.gitbook.com/syntax/markdown.html), that can be converted to HTML, PDF and several eBook formats with [GitBook](https://www.gitbook.com/).

## Build Requirements

* [Node.js](https://nodejs.org)
* [Grunt](http://gruntjs.com/)
* [GitBook](https://toolchain.gitbook.com/setup.html)
* [Calibre](https://calibre-ebook.com/download) for PDF and eBook formats.

## Building

* Clone the repository

  `git clone https://github.com/WollMux/WollMuxHandbuch.git`

* Install Node.js dependencies

  `npm install`

* Install Gitbook plugins

  `gitbook install`

* Build the documentation
  * Switch to the GitBook folder

    `cd WollMuxHandbuch`

  * HTML

    `gitbook build`

  * PDF

    `gitbook pdf . ./wollmux-handbuch.pdf`

  * eBook

    `gitbook mobi . ./wollmux-handbuch.mobi`

    `gitbook epub . ./wollmux-handbuch.epub`

## Editing

> Currently the documentation is primarily written in German. An incomplete version in English has been started in the branch 'language-en'.

The Markdown files can be edited with any plain text editor. Specialized editors with Markdown support can be found on the internet for free.

GitBook contains a web server, that can be used to preview the generated HTML while editing.

The server is started with Grunt.

`grunt`

This command will compile the Markdown to HTML and start the GitBook server. Any time a file in the folder `markdown` is changed, the files are recompiled and the server is restarted.

The server listens on the port 4000. To see the HTML document open your browser on `http://localhost:4000`.

If your browser has a plugin for LiveReload installed, the website is automatically refreshed.
