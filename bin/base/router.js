var nav = {
    pathToTemplate: '../templates/nav.html',
    renderIn: '.nav',
    name: 'nav'
};
Mistral.configure({
    templates: [nav]
});
Mistral.route('/', 'base', [{
    pathToTemplate: '../templates/landing.html',
    renderIn: '#content',
    name: 'hello',
    data: {
        name: 'Yoza Wiratama'
    }
}]);
Mistral.route('/about', 'about', [{
    pathToTemplate: '../templates/about.html',
    renderIn: '#content',
    name: 'about'
        }]);
Mistral.routeOtherWise('/');
