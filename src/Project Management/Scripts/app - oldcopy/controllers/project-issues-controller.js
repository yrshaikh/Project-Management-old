angular.module('project-management').controller('ProjectIssuesController', ['$scope', '$http', '$modal', 'ProjectService', '$stateParams', '$rootScope',
    function ($scope, $http, $modal, projectService, $stateParams, $rootScope) {
        
        $scope.init = function () {
            $scope.projectId = $stateParams.id;
            $rootScope.$broadcast('project:tab:change', {
                id: $scope.projectId,
                title: 'issues'
            });
            createDummyData();
            setTimeout(function () {
                initDraggable();
            });
        }
        
        var createDummyData = function () {
            $scope.lists = [{
                    title: 'Backlog',
                    children: [{
                            title: 'There is no error logging.'
                        }, {
                            title: 'Forgot password mails do not work.'
                        }, {
                            title: 'The landing page UI is not complete.'
                        }]
                }, {
                    title: 'Todo',
                    children: [{
                            title: 'Test draggable.'
                        }]
                }, {
                    title: 'Doing',
                    children: [{
                            title: 'Make mocked data.'
                        }]
                }, {
                    title: 'Review',
                    children: [{
                            title: 'Make mocked data.'
                        }]
                }, {
                    title: 'Done',
                    children: [{
                            title: 'UI for Project listing on the dashboard.'
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

        $scope.submitIssue = function (keyEvent) {
            if (keyEvent.which === 13) {
                $scope.lists[0].children.push({ title: $scope.newIssueTitle });
                $scope.newIssueTitle = "";
            }
        }

    }
]);