angular.module('project-management').controller('PeopleController',
    ['$scope', '$stateParams', 'TeamService', '$timeout', function ($scope, $stateParams, teamService, $timeout) {
        $scope.init = function () {
            $scope.newMember = {
                adding: false,
                member: null
            };
            $scope.teamId = $stateParams.id;
            loadMemberList($scope.teamId);
            $timeout(function() {
                loadNewMemberList($scope.teamId);
            });
        }

        var loadMemberList = function (teamId) {
            $scope.people = {
                loading: true,
                error: false,
                data: []
            };

            teamService.getTeamsMembers(teamId)
                .then(function (response) {
                    $scope.people.loading = false;
                    if (response.status === 200) {
                        $scope.people.data = response.data;
                    } else {
                        $scope.people.error = true;
                    }
                })
                .catch(function () {
                    $scope.teams.loading = false;
                    $scope.teams.error = true;
                });
        }

        var loadNewMemberList = function (teamId) {
            var ajaxUrl = "/Team/GetNonMembersForAutocomplete?teamId=" + teamId;
            var identifier = "#people";
            $(identifier).select2({
                ajax: {
                    url: ajaxUrl,
                    results: function (data) {
                        return { results: data };
                    }
                },
                multiple: true,
                formatResult: function (person) {
                    return "<span class='add-person-name'>" + person.name + "</span>"
                    + "<span class='add-person-email'>" + person.email + "</span>";
                }
            });
            $(identifier).on('change', function(e) {
                var member = e.added;
                addMember(member, teamId);
            });
        }

        var addMember = function (member, teamId) {
            var identifier = "#people";
            var newPlaceHolder = "Adding " + member.name + "...";
            $(identifier).attr('placeholder', newPlaceHolder);
            $('.select2-placeholder').focus().blur();
            $(identifier).select2('disable');
            $(identifier).select2("val", "");
            $scope.newMember.adding = true;
            $scope.newMember.member = member;
            $scope.$apply();

            var teamMember = {
                teamId: teamId,
                userId: member.id
            };

            teamService.addMember(teamMember)
                .then(function (response) {
                    resetSelect2Placeholder(identifier);
                    $scope.newMember.adding = false;
                    $scope.newMember.member = null;

                    if (response.status !== 200) {
                        $scope.newMember.error = true;
                        $scope.init();
                    }
                })
                .catch(function () {
                    resetSelect2Placeholder(identifier);
                    $scope.newMember.adding = false;
                    $scope.newMember.error = true;
                });
        }

        var resetSelect2Placeholder = function (identifier) {
            $(identifier).select2('enable');
            $(identifier).attr('placeholder', 'Add people to your team...');
            $('.select2-placeholder').focus().blur();
        }
    }]);