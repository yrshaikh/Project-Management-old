angular.module('project-management').controller('TasksController',
    ['$scope', '$timeout', 'TeamService', function ($scope, $timeout, teamService) {
        $scope.init = function () {
            $(".inner-nav li a").removeClass("active");
            $(".inner-nav .tasks").addClass("active");
            createDummyData();

            $timeout(function() {
                initDraggable();
            }, 0);
        }

        var createDummyData = function () {
            $scope.lists = [{
                title: 'Un-Assigned',
                children: [{
                    title: 'There is no error logging.'
                }, {
                    title: 'Forgot password mails do not work. I tried on beta, for tasks set for qa.'
                }, {
                    title: 'The landing page UI is not complete.'
                }]
            }, {
                title: 'Yasser Shaikh',
                children: [{
                    title: 'Test draggable.'
                }]
            }, {
                title: 'Ian Fonseca',
                children: [{
                    title: 'Make mocked data.'
                }]
            }, {
                title: 'Neel Shah',
                children: [{
                    title: 'Make mocked data.'
                }]
            }, {
                title: 'Ali Abbas Rizvi',
                children: [{
                    title: 'UI for Project listing on the dashboard.'
                }]
            }, {
                title: 'Completed',
                children: [{
                    title: 'Login form for this app.'
                },
                {
                    title: 'Get design ready for the board, list and card.'
                }]
            }
            ];
        }

        var initDraggable = function () {
            $(".column").sortable({
                connectWith: ".column",
                handle: ".portlet-content",
                cancel: ".portlet-toggle",
                start: function (event, ui) {
                    ui.item.addClass('tilt');
                    tilt_direction(ui.item);
                },
                stop: function (event, ui) {
                    ui.item.removeClass("tilt");
                    $("html").unbind('mousemove', ui.item.data("move_handler"));
                    ui.item.removeData("move_handler");
                },
                placeholder: {
                    element: function (currentItem) {
                        return $("<div class='drag-placeholder'>drop you card here</div>")[0];
                    },
                    update: function (container, p) {
                        return;
                    }
                }
            });

            function tilt_direction(item) {
                var left_pos = item.position().left,
                    move_handler = function (e) {
                        if (e.pageX >= left_pos) {
                            item.addClass("right");
                            item.removeClass("left");
                        } else {
                            item.addClass("left");
                            item.removeClass("right");
                        }
                        left_pos = e.pageX;
                    };
                $("html").bind("mousemove", move_handler);
                item.data("move_handler", move_handler);
            }

            $(".portlet")
                .addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
                .find(".portlet-header")
                .addClass("ui-widget-header ui-corner-all")
                .prepend("<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

            $(".portlet-toggle").click(function () {
                var icon = $(this);
                icon.toggleClass("ui-icon-minusthick ui-icon-plusthick");
                icon.closest(".portlet").find(".portlet-content").toggle();
            });
            // end of draggable  
        }
    }]);