module.exports = function(grunt) {

  grunt.initConfig({

    concat: {
      options: {
        stripBanners: true,
        separator : ";",
      },
      dist: {
        src: [
              'bower_components/**/jquery.min.js',
              'bower_components/**/fastclick.js',
              // add other dependent scripts from bower.json
              // ... 

              'develop/**/*.js', 
              '!develop/tmp/*', 
            ],
        dest: 'develop/tmp/all.js'
      },
      css: {
        src: [
              'develop/**/*.css',
              '!develop/tmp/*',
            ],
        dest: 'develop/tmp/all.css',
      },
    },
    uglify: {
      options : {
        banner : '/*\n Author: Your name\n Date: <%= grunt.template.today("yyyy-mm-dd") %>\n e-mail: email@email.com\n*/\n'
      },
      dist: {
        files: {
          'www/scripts/main.min.js' : ['<%= concat.dist.dest %>'],

        },
      },
    },
    cssmin: {
      main : {
        options : {
          banner : '/*\n Author: Your name\n Date: <%= grunt.template.today("yyyy-mm-dd") %>\n e-mail: email@email.com\n*/\n'
        },
        files : {
          "www/styles/custom.min.css" : ['<%= concat.css.dest %>'],
        }
      }
    },
    watch : {
      options : {
        livereload : true,
      },
      scripts : {
        files : [
          'develop/**/*.js', 
          '!develop/tmp/*', 
        ],
        tasks : ['process_js'],
      },
      css : {
        files : [
          'develop/**/*.css',
          '!develop/tmp/*', 
        ],
        tasks : ['process_css'],
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('default',     ['concat', 'uglify', 'cssmin', 'watch']);
  grunt.registerTask('process_js',  ['concat:dist', 'uglify:dist']);
  grunt.registerTask('process_css', ['concat:css',  'cssmin']);

};
