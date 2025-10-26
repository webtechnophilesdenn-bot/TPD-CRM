const path = require('path');

module.exports = grunt => {
    grunt.initConfig({
        requirejs: {
            build: {
                options: {
                    expand: true,
                    baseUrl: 'node_modules/jquery-ui/',
                    paths: {
                        jquery: './external/jquery/jquery',
                        external: './external/',
                    },
                    optimize: 'none',
                    findNestedDependencies: true,
                    skipModuleInsertion: true,
                    exclude: ['jquery'],
                    include:
                        grunt.file.expand(
                        {
                            cwd: path.resolve('node_modules/jquery-ui'),
                        },
                        [
                            'ui/version.js',
                            'ui/ie.js',
                            'ui/widget.js',
                            'ui/mouse.js',
                            'ui/position.js',
                            'ui/widgets/draggable.js',
                            'ui/widgets/droppable.js',
                            'ui/widgets/resizable.js',
                            'ui/widgets/sortable.js',
                        ]),
                    out: 'dist/jquery-ui.js',
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('build', [
        'requirejs:build',
    ]);

    grunt.registerTask('default', [
        'build',
    ]);
};
