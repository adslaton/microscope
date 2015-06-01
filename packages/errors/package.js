Package.describe({
    documentation: 'README.md',
    git: '',
    name: 'adslaton:errors',
    summary: 'A pattern to display application errors to the user',
    version: '0.0.1'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');
    api.addFiles(['errors.js', 'errors_list.html', 'errors_list.js'], 'client');
    if (api.export) {
        api.export('Errors');
    }
});

Package.onTest(function(api) {
    api.use('adslaton:errors', 'client');
    api.use(['tinytest', 'test-helpers'], 'client');
    api.addFiles('errors_tests.js', 'client');
});
