module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
          scripts: {
            files: ['markdown/*.*', 'markdown/styles/*.*'],
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['run:gitbook', 'concurrent:gbserve']);
};
