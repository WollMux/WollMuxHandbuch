module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    // Kommandozeilenparameter
    var tag = grunt.option('tag');
    var message = grunt.option('message');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
          scripts: {
            files: ['markdown/**/*.*'],
            tasks: ['run:gitbook'],
            options: {
              spawn: false,
              interrupt: true,
              livereload: true
            },
          },
        },
        run: {
            options: {
              // Task-specific options go here.
            },
            gitbook: {
                cmd: (function(){
                  if (process.platform.startsWith("win")) {
                    return "gitbook.cmd";
                  }
                  return "gitbook";
                }()),
                args: [
                    'build'
                ]
            }
        },
        serve: {
            options: {
                port: 4000,
                serve: {
                    path: '_book'
                }
            }
        },
        concurrent: {
            gbserve: {
                tasks: ['watch', 'serve'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        markdownlint: {
            full: {
                options: {
                    config: {
                        'default': true,
                        'line-length': false,
                        'blanks-around-headers': false,
                        'no-duplicate-header': false,
                        'no-inline-html': false
                    }
                },
                src: [
                    'README.md',
                    'markdown/*.md'
                ]
            }
        },
        'gh-pages': {
            options: {
                base: '_book',
                push: true,
                tag: (function(){ return (tag) ? tag : ""; }()),
                message: (function(){ return (message) ? message : "Neue Version."; }()),
                user: {
                    name: 'WollMux',
                    email: 'wollmux@wollmux.org'
                }
            },
            src: ['**']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-markdownlint');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.registerTask('default', ['run:gitbook', 'concurrent:gbserve']);
    grunt.registerTask('check', ['markdownlint']);
    grunt.registerTask('deploy', ['run:gitbook', 'gh-pages']);
};
