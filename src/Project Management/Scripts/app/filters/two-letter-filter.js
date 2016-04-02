angular.module('project-management').filter('twoletter', function () {
    return function (input) {
        if (input) {
            var split = input.split(' ');
            if (split.length > 1)
                return split[0][0].toUpperCase() + split[1][0].toUpperCase();
            else
                return split[0][0].toUpperCase();
        }
        return '';
    }
}
);