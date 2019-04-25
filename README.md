# Handbuch des WollMux
This repository contains the technical documentation for the [WollMux](https://github.com/WollMux/WollMux) project.

The documentation is written in [Markdown format](https://toolchain.gitbook.com/syntax/markdown.html), that can be converted to HTML, PDF and several eBook formats with [GitBook](https://www.gitbook.com/).

## Build Requirements

* [Node.js](https://nodejs.org)
* [Grunt](http://gruntjs.com/getting-started)
* [GitBook](https://toolchain.gitbook.com/setup.html)
* [Calibre](https://calibre-ebook.com/download) for PDF and eBook formats.

## Building

* Clone the repository

  `git clone https://github.com/WollMux/WollMuxHandbuch.git`

* Switch to the GitBook folder

  `cd WollMuxHandbuch`

* Install Node.js dependencies

  `npm install`
  
* Install Gitbook plugins

  `gitbook install`

* Build the documentation

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

If your browser has a plugin for [LiveReload](http://livereload.com/) installed, the website is automatically refreshed.

## Deployment

The task `deploy` recompiles the documentation and pushes the resulting web-site
into the branch `gh-pages`.

`git checkout WollMux_<version>`
`grunt deploy [--tag="<tag>"] [--message="<commit-message>"]`

* **version**: Select the productive version to publish.

* **tag**: Creates a tag on the branch `gh-pages`. Default: no tag is created.

* **message**: Commit message. Default: "Neue Version."

[Link](https://wollmux.github.io/WollMuxHandbuch/Hauptseite.html) to generated documentation.

---

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
