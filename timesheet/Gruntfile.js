// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
//
module.exports = function (grunt) {

  grunt.initConfig ({
    pkg : grunt.file.readJSON('package.json'),

    assets: 'client/assets',
    components: '<%= assets %>/js/components',
    clientdist: 'client/dist',

    // The clean task ensures all files are removed from the dist/ directory so
    // that no files linger from previous builds.
    clean: ["dist", "<%= clientdist %>", "client/docs", "client/test-reports", "*.zip"],

    // The jshint option for scripturl is set to lax, because the anchor
    // override inside main.js needs to test for them so as to not accidentally
    // route.
    jshint:{
      options: {
        scripturl: true,
        laxcomma: true,
        nomen: false,
        globals : {
          angular: true,
          chai: true,
          describe: true,
          beforeEach: true,
          afterEach: true,
          it: true,
          xit: true
        }
      },
      code : {
        src: ["client/src/**/*.js"]
      },
      specs : {
        src: ["client/test/**/*.js"],
        options: {
          expr: true
        }
      }
    },

    // Compiles the Less files into the style.css file.
    less:{
      app:{
        options: {
          paths: ["<%= assets %>/less"]
        },
        files : {
          '<%= clientdist %>/assets/css/style.css': '<%= assets %>/less/style.less'
        }
      }
    },

    // Combines the application templates into a single javascript file that populates 
    // the angular template cache.
    //
    // Also builds the angular ui-bootstrap application specific template overrides
    html2js: {
      // Application Templates
      main: {
        options: {
          base: 'client',
        },
        src: [
          '<%= assets %>/templates/app/**/*.html',
          '<%= assets %>/templates/common/**/*.html',
          '<%= assets %>/templates/home/**/*.html',
          '<%= assets %>/templates/navigation/**/*.html',
          '<%= assets %>/templates/*.html'
        ],
        dest: '<%= clientdist %>/assets/templates/main.templates.js'
      },
      lib: {
        options: {
          base: '<%= assets %>/templates/lib/angular-ui-bootstrap',
        },
        src: [
          '<%= assets %>/templates/lib/angular-ui-bootstrap/**/*.html'
        ],
        dest: '<%= clientdist %>/assets/templates/lib.templates.js'
      }
    },

    // The concatenate task is used here to merge the almond require/define
    // shim and the templates into the application code.
    concat:{
      jsdeps : {
        src : [
          // Shims
          '<%= components %>/respond.js/respond.min.js',
          '<%= components %>/modernizr/modernizr.js',

          // jQuery and Related
          '<%= components %>/jquery/jquery.js',
          '<%= components %>/jquery-ui/ui/jquery.ui.core.js',
          '<%= components %>/jquery-ui/ui/jquery.ui.widget.js',
          '<%= components %>/jquery-ui/ui/jquery.ui.mouse.js',
          '<%= components %>/jquery-ui/ui/jquery.ui.position.js',
          '<%= components %>/jquery-ui/ui/jquery.ui.draggable.js',
          '<%= components %>/jquery-ui/ui/jquery.ui.droppable.js',
          '<%= components %>/dynatree/src/jquery.dynatree.js',
          '<%= components %>/jquery-ui-touch-punch/jquery.ui.touch-punch.js',
          '<%= components %>/hammerjs/dist/hammer.js',
          '<%= components %>/select2/select2.js',
          '<%= components %>/messenger/build/js/messenger.js',
          '<%= components %>/messenger/build/js/messenger-theme-future.js',

          // bootstrap
          '<%= components %>/bootstrap/dist/js/bootstrap.js',
          '<%= components %>/bootstrap-datepicker/js/bootstrap-datepicker.js',
          '<%= components %>/bootstrap-timepicker/js/bootstrap-timepicker.js',

          // AngularJS libraries
          '<%= components %>/angular/angular.js',
          '<%= components %>/angular-cookies/angular-cookies.js',
          '<%= components %>/angular-resource/angular-resource.js',
          '<%= components %>/angular-sanitize/angular-sanitize.js',
          '<%= components %>/angular-strap/dist/angular-strap.js',

          //AngularJS Library Dependencies
          '<%= components %>/bootstrap-select/bootstrap-select.js',
          '<%= components %>/angular-strap/vendor/bootstrap-datepicker.js',

          // Angular UI libraries
          '<%= components %>/angular-ui-bootstrap/dist/ui-bootstrap-tpls-0.6.0.js',
          '<%= components %>/angular-ui-select2/src/select2.js',
          '<%= components %>/angular-ui-router/release/angular-ui-router.js',
          '<%= components %>/angular-ui-utils/components/angular-ui-docs/build/ui-utils.js',
          '<%= components %>/angular-dragdrop/src/angular-dragdrop.js',
          '<%= components %>/angular-ui-calendar/src/calendar.js',

          //Highcharts
          '<%= components %>/highcharts/highcharts.src.js',

          //Farbtastic
          '<%= components %>/farbtastic/farbtastic.js',

          //NProgress
          '<%= components %>/nprogress/nprogress.js',

          // logger
          '<%= components %>/javascript-debug/ba-debug.js',

          // Full calendar
          '<%= components %>/angular-ui-calendar/src/calendar.js',

          // utilities
          '<%= components %>/lodash/dist/lodash.js',
          '<%= components %>/moment/moment.js',
          '<%= components %>/add-to-homescreen/src/add2home.js',
          '<%= components %>/responsive-tables/responsive-tables.js',
          '<%= components %>/faker/Faker.js',
          '<%= components %>/color/one-color-all-debug.js'
        ],

        dest: "<%= clientdist %>/assets/js/deps.js"
      },
      appjs : {
        src : [
          '<%= clientdist %>/assets/js/deps.js',
          '<%= clientdist %>/assets/templates/main.templates.js',
          '<%= clientdist %>/assets/templates/lib.templates.js',
          'client/src/**/*.js'
        ],
        dest: "<%= clientdist %>/assets/js/app.js"
      },
      css : {
        src : [
          "<%= components %>/select2/select2.css",
          "<%= components %>/bootstrap-select/bootstrap-select.css",
          "<%= components %>/angular-strap/vendor/bootstrap-datepicker.css",
          "<%= components %>/add-to-homescreen/style/add2home.css",
          "<%= components %>/jquery-ui/themes/base/jquery.ui.core.css",
          "<%= components %>/jquery-ui/themes/base/jquery.ui.dialog.css",
          "<%= components %>/dynatree/src/skin/ui.dynatree.css",
          "<%= components %>/farbtastic/farbtastic.css",
          "<%= components %>/nprogress/nprogress.css",
          "<%= components %>/messenger/build/css/messenger.css",
          "<%= components %>/messenger/build/css/messenger-theme-air.css",
          "<%= components %>/messenger/build/css/messenger-spinner.css",
          "<%= components %>/fullcalendar/fullcalendar.css",
          "<%= clientdist %>/assets/css/style.css"
        ],
        dest: "<%= clientdist %>/assets/css/style.css"
      }
    },

    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named style.css.  It
    // also minifies all the CSS as well.  This is named style.css, because we
    // only want to load one stylesheet in index.html.
    cssmin :{
      all : {
        files : {
          "<%= clientdist %>/assets/css/style.min.css": ["<%= clientdist %>/assets/css/style.css"]
        }
      }
    },

    // Takes the built require.js file and minifies it for filesize benefits.
    uglify : {
      dist : {
        files: {
          "<%= clientdist %>/assets/js/app.min.js" : ["<%= clientdist %>/assets/js/app.js"]
        }
      }
    },

    // A task that runs in the background 'watching' for changes to code.
    watch : {
      options : {
        livereload: true,
        atBegin: true
      },
      development: {
        files: [
          'client/src/**/*.js',
          'client/test/**/*.js',
          '<%= assets %>/templates/**/*.html',
          '<%= assets %>/less/**/*.less',
          'app/views/**/*.jade'
        ],
        tasks: ['development', 'karma:unit:run', 'karma:e2e:run']
      },
      debug: {
        files: [
          'client/src/**/*.js',
          'client/test/**/*.js',
          '<%= assets %>/templates/**/*.html',
          '<%= assets %>/less/**/*.less',
          'app/views/**/*.jade'
        ],
        tasks: ['debug', 'karma:unit:run', 'karma:e2e:run']
      },
      production: {
        files: [
          'client/src/**/*.js',
          'client/test/**/*.js',
          '<%= assets %>/templates/**/*.html',
          '<%= assets %>/less/**/*.less',
          'app/views/**/*.jade'
        ],
        tasks: ['production', 'karma:unit:run', 'karma:e2e:run']
      },
      server : {
        files: [
          'test/**/*.js',
          'app/**/*.js'
        ],
        tasks: ['mochacli']
      }
    },

    // Starts the karama runner for unit and e2e tests.
    // For the non CI tasks, tests are ran when the task is re-invoked 
    // from the watch task.
    // For the CI tasks, tests are ran immediately.  The application server
    // must be running for these to succeed 
    karma : {
      unit : {
        reporters: 'dots',
        configFile: 'karma.unit.config.js',
        options: {
          background: true
        }
      },

      e2e : {
        reporters: 'dots',
        configFile: 'karma.e2e.config.js',
        options : {
          port: 9877,
          runnerPort: 9101,
          background: true
        }
      },

      unitci : {
        configFile: 'karma.ci.unit.config.js'
      },

      e2eci : {
        configFile: 'karma.ci.e2e.config.js'
      }
    },

    // Run the server-side Mocha tests
    mochacli : {
      options : {
        reporter: 'spec',
        bail: true
      },
      all : ['test/**/*.js']
    },

    // Stages all the files for running the application.  Each of these
    // tasks are cumulative where production builds off of debug, debug 
    // off of development, and development off of vendor.
    // vendor: All of the 3rd party library files
    // development: All of the files required for development mode
    // debug: All of the files required for debug mode
    // production:  All of the files required for production mode
    copy: {
      vendor : {
        files: [
          {
            expand: true,
            cwd: '<%= components %>/font-awesome/font',
            src:['**'],
            dest:'<%= clientdist %>/assets/font/font-awesome'
          },
          {
            expand: true,
            cwd: '<%= components %>/lato/font',
            src:['**'],
            dest:'<%= clientdist %>/assets/font/lato'
          },
          {
            expand: true,
            cwd: '<%= components %>/dynatree/src/skin',
            src:['**.gif'],
            dest:'<%= clientdist %>/assets/img/dynatree'
          },
          {
            expand: true,
            cwd: '<%= components %>/farbtastic',
            src:['**.png'],
            dest:'<%= clientdist %>/assets/img/farbtastic'
          }
        ]
        },
      development : {
        files: [
          {
            expand: true,
            cwd: '<%= assets %>',
            src: ['img/**', 'font/**'],
            dest: '<%= clientdist %>/assets'
          }
        ]
      },
      debug : {
        files: [
          {
            expand: true,
            cwd: '<%= clientdist %>/assets',
            src: ['css/style.css', 'font/**', 'img/**', 'js/app.js'],
            dest: '<%= clientdist %>/<%= pkg.name %>-debug/assets'
          },
          {
            expand: true,
            cwd: '<%= clientdist %>/assets/html',
            src:['index.html'],
            dest: '<%= clientdist %>/<%= pkg.name %>-debug'
          }
        ]
      },
      production : {
        files: [
          {
            expand: true,
            cwd: '<%= clientdist %>/assets',
            src: ['css/style.min.css', 'font/**', 'img/**', 'js/app.min.js'],
            dest: '<%= clientdist %>/<%= pkg.name %>/assets'
          },
          {
            src: '<%= clientdist %>/assets/html/index.min.html',
            dest:'<%= clientdist %>/<%= pkg.name %>/index.html'
          }
        ]
      }
    },

    // Compile the **jade** templates into html for deployment
    jade: {
      debug: {
        options: {
          pretty: true,
          data: {
            debug: true,
            env: 'debug'
          }
        },
        files: {
          '<%= clientdist %>/assets/html/index.html' : ['app/views/application/index.jade']
        }
      },
      production : {
        options: {
          data: {
            debug: false,
            env: 'production'
          }
        },
        files: {
          '<%= clientdist %>/assets/html/index.min.html' : ['app/views/application/index.jade']
        }
      }
    },

    // The **docco** task iterates through the `src` files and creates annotated source reports for them.
    docco: {
      options: {
        layout : "parallel"
      },
      client: {
        options: {
          output : "dist/docs/client/"
        },
        src: "client/src/**/*.js"
      },
      app: {
        options: {
          output : "dist/docs/app/"
        },
        src: "app/**/*.js"
      },
      grunt: {
        options: {
          output : "dist/docs/docs/grunt/"
        },
        src: "Gruntfile.js"
      },
      config: {
        options: {
          output : "dist/docs/config/"
        },
        src: "config/**/*.js"
      }
    },

    // The **runapp** task will run the `server.js` in a `nodemon` and watch the server files for changes
    runapp: {
      development : {
        env: 'development'
      },

      debug : {
        env: 'debug'
      },

      production : {
        env: 'production'
      },

      test : {
        options: {
          dieWithParent: true
        },
        env: 'development'
      }
    },

    // Runs shell tasks
    // bowerInstall - Runs `bower install`
    // angular - Runs npm install for the Angular source pulled down with bower install.
    // angularuibootstrap - Runs npm install for the angular-ui bootstrap source pulled down with bower install.
    // angularuiutils - Runs npm install for the angular-ui utils source pulled down with bower install.
    shell : {
      bowerInstall : {
        options: {
          stdout: true,
          stderr: true
        },
        command: 'bower install'
      },
      startup : {
        options: {
          stdout: true,
          stderror: true
        },
        command: [
        'grunt karma:unit',
        'grunt karma:e2e',
        'grunt watch'
        ].join('&')
      },
      angularuibootstrap : {
        options: {
          stdout: true,
          stderr: true,
          execOptions: {
            cwd: '<%= components %>/angular-ui-bootstrap'
          }
        },
        command: 'npm install'
      },
      angularuiutils : {
        options: {
          stdout: true,
          stderr: true,
          execOptions: {
            cwd: '<%= components %>/angular-ui-utils'
          }
        },
        command: 'npm install'
      }
    },

    // Runs dependency grunt builds
    hub: {
      angularuibootstrap: {
        src: ['<%= components %>/angular-ui-bootstrap/Gruntfile.js'],
        tasks: ['html2js', 'build']
      },
      angularuiutils: {
        src: ['<%= components %>/angular-ui-utils/gruntFile.js'],
        tasks: ['build']
      }
    },

    maven: {
      options: {
        groupId: 'com.lodosoftware.control',
        artifactId: 'd3-control-ui',        
      },
      deploy: {
        options: {
          goal: 'deploy',
          url: 'http://nexus.dev.d3banking.com/nexus/content/repositories/snapshots',
          repositoryId: 'lodosoftware-nexus'
        },
        src: ['**']
      },
      release: {
        options: {
          goal: 'deploy',
          url: 'http://nexus.dev.d3banking.com/nexus/content/repositories/releases',
          repositoryId: 'lodosoftware-nexus'
        },
        src: ['**']
      }
    }
  });

  // *********************************************************************************************

  grunt.loadNpmTasks('grunt-hub');
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mixtape-run-app');
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks('grunt-docco-multi');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-maven-tasks');

  // **********************************************************************************************

  //Initialize a fresh project.  This will build any dependencies and run the default grunt task.
  grunt.registerTask("init", ['shell:bowerInstall', 'builddeps', 'production']);

  //Build dependencies of the project
  grunt.registerTask("builddeps", ['angularuibootstrap', 'angularuiutils']);

  //Build angular-ui bootstrap
  grunt.registerTask("angularuibootstrap", ['shell:angularuibootstrap', 'hub:angularuibootstrap']);

  //Build angular-ui utils
  grunt.registerTask("angularuiutils", ['shell:angularuiutils', 'hub:angularuiutils']);

  // The default task will remove all contents inside the dist/ folder, lint
  // all your code, precompile all the underscore templates into
  // dist/debug/templates.js, compile all the application code into
  // dist/debug/require.js, and then concatenate the require/define shim
  // almond.js and dist/debug/templates.js into the require.js file.

  grunt.registerTask("default", ['clean']);

  // Task to compile everything in development mode
  grunt.registerTask("development", ['default', 'jshint', 'less', 'concat:css', 'html2js', 'concat:jsdeps', 'copy:vendor', 'copy:development']);
  grunt.registerTask("debug", ['development', 'concat:appjs', 'jade:debug', 'copy:debug']);
  grunt.registerTask("production", ['debug', 'cssmin', 'uglify', 'jade:production', 'copy:production']);

  // Forks off the application server and runs the unit and e2e tests.
  // Test results stored in client/test-reports
  grunt.registerTask("test", ['production', 'runapp:test', 'karma:unitci', 'karma:e2eci']);

  // Gitflow tasks
  grunt.registerTask('deploy', ['test', 'maven:deploy', 'clean']);
  grunt.registerTask('release', ['test', 'maven:release', 'clean']);
};
