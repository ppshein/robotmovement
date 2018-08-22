(function() {
    'use strict';
    var robotApp = angular.module('robotApp', []);
    
    // Declare all require variable here, never declare controller files for common usage.
    robotApp.run(['$rootScope', function ($rootScope) {
        /* draw space */

        $rootScope.botMovement = {
            movementSpace: {
                x: [0, 1, 2, 3, 4],
                y: [4, 3, 2, 1, 0]
            },
            movementKey: [
                { 37: 'west', 'd': 'move' },
                { 39: 'east', 'd': 'move' },
                { 38: 'north', 'd': 'move' },
                { 40: 'south', 'd': 'move' },
                { 76: ' ', 'd': 'left' },
                { 82: ' ', 'd': 'right' }
            ],
            allowKeyCode: [
                37, 39, 38, 40, 76, 82
            ],
            degrees: [
                { degree: 0, direction: 'north' },
                { degree: 90, direction: 'east' },
                { degree: 180, direction: 'south' },
                { degree: 270, direction: 'west' }
            ]
        }

    }]);
})();