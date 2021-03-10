/* 
 * Author: jianqing
 * Date: Mar 10, 2021
 * Description: This document is created for buliding the lib.
 */
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dist: {
            // the files to concatenate
            src: ['src/**/*.js'],
            // the location of the resulting JS file
            dest: 'dist/<%= pkg.name %>.js'
        }, concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['src/**/*.js'],
                // the location of the resulting JS file
                dest: 'dist/<%= pkg.name %>.js'
            }
        }, uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*!Jianqing Gao <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },clean: ['dist']

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    //grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('build', ['concat', 'uglify']);
    
    
};
