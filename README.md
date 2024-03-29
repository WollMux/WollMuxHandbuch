# Handbuch des WollMux
This repository contains the technical documentation for the [WollMux](https://github.com/WollMux/WollMux) project.

The documentation is written in [Markdown format](https://honkit.netlify.app/syntax/markdown.html), that can be converted to HTML, PDF and several eBook formats with [Honkit](https://honkit.netlify.app/).

## Build Requirements

* [Node.js](https://nodejs.org)

## Runtime Requirements

* [Calibre](https://calibre-ebook.com/download) for PDF and eBook formats.

## Building

* Clone the repository

  `git clone https://github.com/WollMux/WollMuxHandbuch.git`

* Switch to the GitBook folder

  `cd WollMuxHandbuch`

* Install Node.js dependencies

  `npm install`
  `npm install -g grunt-cli`

* Build the documentation

  * Serve locally
    `grunt serve`

  * Do syntax checks
    `grunt check`

  * HTML

    `grunt build` (Result is in `_book` directory)

  * PDF

    `npx honkit pdf . ./wollmux-handbuch.pdf`

  * eBook

    `npx honkit mobi . ./wollmux-handbuch.mobi`

    `npx honkit epub . ./wollmux-handbuch.epub`

## Editing

> Currently the documentation is primarily written in German. An incomplete version in English has been started in the branch 'language-en'.

## Deployment

The task `deploy` recompiles the documentation and pushes the resulting web-site
into the branch `gh-pages`.

`git checkout master`
`grunt deploy [--tag="<tag>"] [--message="<commit-message>"]`

* **tag**: Creates a tag on the branch `gh-pages`. Default: no tag is created.

* **message**: Commit message. Default: "Neue Version."

[View](https://wollmux.org/) generated documentation

---

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
