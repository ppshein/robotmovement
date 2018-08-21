(function() {
    'use strict';
    var robotApp = angular.module('robotApp', []);
    
    // Declare all require variable here, never declare controller files for common usage.
    robotApp.run(['$rootScope', function ($rootScope) {
        /* draw space */
        $rootScope.movementSpace = {
            x: [0, 1, 2, 3, 4],
            y: [4, 3, 2, 1, 0]
        };

        $rootScope.movementKey = [
            { 37: 'west', 'd': 'move' },
            { 39: 'east', 'd': 'move' },
            { 38: 'north', 'd': 'move' },
            { 40: 'south', 'd': 'move' },
            { 76: 'left', 'd': 'left' },
            { 82: 'right', 'd': 'right' }
        ];

        $rootScope.allowKeyCode = [
            37, 39, 38, 40, 76, 82
        ];

    }]);
})();