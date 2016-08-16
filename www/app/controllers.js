'use strict';

var myApp = angular.module('myApp.controllers', ['fhcloud']);

myApp.controller('MainCtrl', function($scope, $http) {

    $scope.data = { platformSelect: "pc", regionSelect: "eu", oppPlatformSelect: "pc", oppRegionSelect: "eu" };
    var myDetails = [];
    var oppDetails = [];
    var myCall = false;
    var oppCall = false;
    var comparison = false;
    $scope.comparison = comparison;

    $scope.getMyData = function() {
        var myUserInput = $scope.myUserInput;
        var myUserName = myUserInput.replace("#", "-");
        var myPlatform = $scope.data.platformSelect;
        var myRegion = $scope.data.regionSelect;

        // Simple GET request example:
        $http({
            method: 'GET',
            url: "https://api.lootbox.eu/" + myPlatform + "/" + myRegion + "/" + myUserName + "/profile"
        }).then(function successCallback(response) {
            myDetails = response.data;
            console.log(myDetails);
            getMyDetails(myDetails);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.getOppData = function() {
        var oppUserInput = $scope.oppUserInput;
        var oppUserName = oppUserInput.replace("#", "-");
        var oppPlatform = $scope.data.oppPlatformSelect;
        var oppRegion = $scope.data.oppRegionSelect;

        // Simple GET request example:
        $http({
            method: 'GET',
            url: "https://api.lootbox.eu/" + oppPlatform + "/" + oppRegion + "/" + oppUserName + "/profile"
        }).then(function successCallback(response) {
            oppDetails = response.data;
            console.log(oppDetails);
            getOppDetails(oppDetails);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    function getMyDetails(myDetails) {
        $scope.myAvatar = myDetails.data.avatar;
        $scope.myRankIcon = myDetails.data.competitive.rank_img;
        $scope.myUsername = myDetails.data.username;
        $scope.myLevel = myDetails.data.level;
        $scope.myLevelFrame = myDetails.data.levelFrame;
        $scope.myRank = myDetails.data.competitive.rank;
        $scope.myQPWins = myDetails.data.games.quick.wins;
        $scope.myCompWins = myDetails.data.games.competitive.wins;
        $scope.myQPPlaytime = myDetails.data.playtime.quick;
        $scope.myCompPlaytime = myDetails.data.playtime.competitive;
        $scope.myStar = myDetails.data.star;
        //Sets x = wins/games played and sets myQWPR to the value of x to two decimal places
        //Multiplies myQPWR by 100 and slaps a percentage on the end
        var x = myDetails.data.games.quick.wins / myDetails.data.games.quick.played;
        var myQPWR = (x * 100);
        $scope.myQPWinRate = myQPWR.toFixed(2) + "%";
        //-------------------------------------------------------
        var y = myDetails.data.games.competitive.wins / myDetails.data.games.competitive.played;
        var myCWR = (y * 100);
        $scope.myCompWinRate = myCWR.toFixed(2) + "%";
        myCall = true;
        if (oppCall == true && myCall == true) {
            compareDetails();
            $scope.comparison = true;
        }
        $scope.myUserInput = '';
    }

    function getOppDetails(oppDetails) {
        $scope.oppAvatar = oppDetails.data.avatar;
        $scope.oppUsername = oppDetails.data.username;
        $scope.oppLevel = oppDetails.data.level;
        $scope.oppRank = oppDetails.data.competitive.rank;
        $scope.oppQPWins = oppDetails.data.games.quick.wins;
        $scope.oppCompWins = oppDetails.data.games.competitive.wins;
        $scope.oppQPPlaytime = oppDetails.data.playtime.quick;
        $scope.oppCompPlaytime = oppDetails.data.playtime.competitive;
        $scope.oppLevelFrame = oppDetails.data.levelFrame;
        $scope.oppStar = oppDetails.data.star;
        $scope.oppRankIcon = oppDetails.data.competitive.rank_img;
        var q = oppDetails.data.games.quick.wins / oppDetails.data.games.quick.played;
        var oppQPWR = (q * 100);
        $scope.oppQPWinRate = oppQPWR.toFixed(2) + "%";
        var r = oppDetails.data.games.competitive.wins / oppDetails.data.games.competitive.played;
        var oppCWR = (r * 100);
        $scope.oppCompWinRate = oppCWR.toFixed(2) + "%";
        oppCall = true;
        if (oppCall == true && myCall == true) {
            compareDetails();
            $scope.comparison = true;
        }
        $scope.oppUserInput = '';
    }

    function compareDetails() {
        $scope.levelDif = parseInt($scope.myLevel) - parseInt($scope.oppLevel);
        $scope.rankDif = parseInt($scope.myRank) - parseInt($scope.oppRank);
        $scope.qpWinsDif = parseInt($scope.myQPWins) - parseInt($scope.oppQPWins);
        $scope.compWinsDif = parseInt($scope.myCompWins) - parseInt($scope.oppCompWins);
        var qpWinRateDif = parseFloat($scope.myQPWinRate) - parseFloat($scope.oppQPWinRate);
        $scope.qpWinRateDif = qpWinRateDif.toFixed(2) + "%";
        var compWinRateDif = parseFloat($scope.myCompWinRate) - parseFloat($scope.oppCompWinRate);
        $scope.compWinRateDif = compWinRateDif.toFixed(2) + "%";
    }
});