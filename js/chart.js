(function () {
    var module = angular.module("chart", ["chart.js"]);
    module.factory('players', function ($http) {
        return {
            all: function (callback) {
                $http.get('data/data.json').then(callback);
            }
        };
    });


    module.controller("BarCtrl", function ($scope, $http) {
        $http.get('data/data.json').then(function (response) {
            $scope.players = response.data;
            $scope.selectedPlayers = [];
        });


        $scope.updateChart = function (player) {
            var selectedPlayers = $scope.selectedPlayers;
            if (selectedPlayers.indexOf(player) != -1) selectedPlayers.splice(selectedPlayers.indexOf(player), 1)
            else selectedPlayers.push(player)
            $scope.labels = [];
            $scope.series = [];
            $scope.data = [];

            var games = prepareGameData();

            addLabels(games);
            addData(games);

            function prepareGameData() {
                var games = [];
                angular.forEach(selectedPlayers, function (value, key) {
                    var playerName = value.name;
                    $scope.series.push(playerName);

                    angular.forEach(value.games, function (value, key) {

                        var game = value;
                        if (game.rank > 0)
                        {
                            game.number = key;
                            game.playerName = playerName;
                            games.push(game);
                        }

                    });
                    games.sort(function (a, b) {
                        return a.number - b.number;
                    });
                });
                return games;
            }

            function addLabels(games) {
                angular.forEach(games, function (value, key) {
                    if ($scope.labels.indexOf(value.number) == -1) {
                        $scope.labels.push(value.number)
                    }
                });
            }

            function addData(games) {
                angular.forEach($scope.series, function (player, key) {
                    var currentPlayerData = [];
                    angular.forEach(games, function (value, key) {
                        if (value.playerName === player) {
                            currentPlayerData.push(value.rank);
                        }
                    });
                    $scope.data.push(currentPlayerData);
                });
            }
        }
    });

})();

