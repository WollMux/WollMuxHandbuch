module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    // Command line args
    var tag = grunt.option('tag');
    var message = grunt.option('message');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        run: {
            options: {
              // Task-specific options go here.
            },
            build: {
                 cmd: (function(){
                    return "node_modules/honkit/bin/honkit.js";
                }()),
                args: [
                    'build'
                ]
            },
            live: {
                cmd: (function(){
                   return "node_modules/honkit/bin/honkit.js";
               }()),
               args: [
                   'serve'
               ]
            },
        },
        markdownlint: {
            full: {
                options: {
                    config: {
                        'default': true,
                        'line-length': false,
                        'blanks-around-headers': false,
                        'no-duplicate-header': false,
                        'no-inline-html': false,
                        'fenced-code-language': false
                    }
                },
                src: [
                    'README.md',
                    'markdown/**/*.md'
                ]
            }
        },
        'gh-pages': {
            options: {
                base: '_book',
                push: true,
                tag: (function(){ return (tag) ? tag : ""; }()),
                message: (function(){ return (message) ? message : "Deploy current version"; }())
            },
            src: ['**']
        }
    });

    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-markdownlint');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.registerTask('default', ['run:live']);
    grunt.registerTask('serve', ['run:live']);
    grunt.registerTask('build', ['check', 'run:build']);
    grunt.registerTask('check', ['markdownlint']);
    grunt.registerTask('deploy', ['check', 'run:honkit', 'gh-pages']);
};
