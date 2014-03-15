module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      pre: ['dist'],
      post: ['dist/temp'],
    },

    less:{
      app:{
        options: {
          paths: ['src/assets/less']
        },
        files : {
          'dist/temp/style.css': 'src/assets/less/style.less'
        }
      }
    },

    cssmin :{
      combine : {
        files : {
          'dist/assets/css/style.css':[
            'src/assets/js/components/highlight.js/styles/github.css',
            'dist/temp/style.css'
          ]
        }
      }
    },

    concat:{
      dist : {
        src : [
          // Reveal.js
          'src/assets/js/components/headjs/dist/head.js',
          'src/assets/js/components/reveal.js/js/reveal.js',
          'src/assets/js/components/reveal.js/lib/js/classList.js',

          // Reveal.js Plugins
          'src/assets/js/components/reveal.js/plugin/markdown/marked.js',
          'src/assets/js/components/reveal.js/plugin/markdown/markdown.js',
          'src/assets/js/components/highlight.js/highlight.pack.js',
          'src/assets/js/components/reveal.js/plugin/zoom-js/zoom.js',

          //Presentation init
          'src/js/reveal.init.js'
        ],

        dest: 'dist/temp/app.js'
      }
    },

    uglify : {
      dist : {
        files: {
          'dist/assets/js/app.js' : ['dist/temp/app.js']
        }
      }
    },

    jade: {
      options : {
        pretty: true
      },
      index: {
        options: {
          data: {
            debug: true
          }
        },
        files: [
          {
            expand: true,
            cwd: 'src/views',
            src: ['**/*.jade'],
            dest: 'dist/',
            ext: '.html'
          }
        ]
      }
    },

    copy: {
      vendor : {
        files: [
          {
            src:'src/assets/js/components/angular/angular.js',
            dest:'dist/assets/js/components/angular/angular.js'
          },
          {
            src:'src/assets/js/components/angular-animate/angular-animate.js',
            dest:'dist/assets/js/components/angular-animate/angular-animate.js'
          },
          {
            expand: true,
            cwd: 'src/assets/js/components/reveal.js/lib/font',
            src:['**'],
            dest:'dist/assets/font'
          },
          {
            expand: true,
            cwd: 'src/assets/js/components/font-awesome/fonts',
            src:['**'],
            dest:'dist/assets/font'
          }
        ]
      },
      assets : {
        files: [
          {
            expand: true,
            cwd: 'src/assets/img',
            src:['**'],
            dest:'dist/assets/img'
          }
        ]
      },

    },

    watch : {
      options : {
        livereload: true
      },
      src: {
        files: [
          'src/views/**/*',
          'src/assets/less/**/*',
          'src/assets/img/**/*'
        ],
        tasks: ['assemble']
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dist'
        }
      }
    },

    shell : {
      publish : {
        options: {
          stdout: true,
          stderr: true
        },
        command: 'git subtree split --branch gh-pages --prefix dist/'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
  grunt.registerTask('default', ['assemble']);
  grunt.registerTask('assemble', ['clean:pre', 'less', 'cssmin', 'concat', 'uglify', 'jade', 'copy', 'clean:post']);
  grunt.registerTask('run', ['connect', 'watch']);
  grunt.registerTask('publish', ['assemble', 'shell:publish']);

};
