'use strict';

var myApp = angular.module('myApp.controllers', ['fhcloud']);

myApp.controller('MainCtrl', function($scope, $http) {

    $scope.data = { platformSelect: "pc", regionSelect: "eu", oppPlatformSelect: "pc", oppRegionSelect: "eu" };

    //My details
    var myDetails = [];
    var allMyHeroesQP = [];
    var allMyHeroesComp = [];
    var myHeroQP = [];
    var myHeroComp = [];
    var myPlayedHeroesQP = [];
    var myPlayedHeroesComp = [];

    //Opponent details
    var oppDetails = [];
    var allOppHeroesQP = [];
    var allOppHeroesComp = [];
    var oppHeroQP = [];
    var oppHeroComp = [];
    var oppPlayedHeroesQP = [];
    var oppPlayedHeroesComp = [];

    var myCall = false;
    var oppCall = false;
    var comparison = false;
    $scope.comparison = comparison;

    //---------------------------------------------------------------------------------------------------------------------------
    //MY DETAILS

    $scope.getMyData = function() {
        var myUserInput = $scope.myUserInput;
        var myUserName = myUserInput.replace("#", "-");
        var myPlatform = $scope.data.platformSelect;
        var myRegion = $scope.data.regionSelect;

        //get basic profile data
        $http({
            method: 'GET',
            url: "https://api.lootbox.eu/" + myPlatform + "/" + myRegion + "/" + myUserName + "/profile"
        }).then(function successCallback(response) {
            myDetails = response.data;
            getMyDetails(myDetails);
        }, function errorCallback(response) { alert(response.error); });

        //get all heroes data from quick play
        $http({
            method: 'GET',
            url: "https://api.lootbox.eu/" + myPlatform + "/" + myRegion + "/" + myUserName + "/quick-play/allHeroes/"
        }).then(function successCallback(response) {
            allMyHeroesQP = response.data;
            getAllMyHeroesQP(allMyHeroesQP);
        }, function errorCallback(response) { alert(response); });

        //get all heroes data from competitive play
        $http({
            method: 'GET',
            url: "https://api.lootbox.eu/" + myPlatform + "/" + myRegion + "/" + myUserName + "/competitive-play/allHeroes/"
        }).then(function successCallback(response) {
            allMyHeroesComp = response.data;
            getAllMyHeroesComp(allMyHeroesComp);
        }, function errorCallback(response) { alert(response); });

        //get a singular hero's data from quick play
        // $http({
        //     method: 'GET',
        //     url: "https://api.lootbox.eu/" + myPlatform + "/" + myRegion + "/" + myUserName + "/quick-play/" + hero
        // }).then(function successCallback(response) {
        //     myHeroQP = response.data;
        //     getMyHeroQP(myHeroQP);
        // }, function errorCallback(response) { alert(response); });

        //get a singular hero's data from competitive play
        // $http({
        //     method: 'GET',
        //     url: "https://api.lootbox.eu/" + myPlatform + "/" + myRegion + "/" + myUserName + "/competitive-play/" + hero
        // }).then(function successCallback(response) {
        //     myHeroComp = response.data;
        //     getMyHeroComp(myHeroComp);
        // }, function errorCallback(response) { alert(response); });

        //get list of most played heroes in quick play
        $http({
            method: 'GET',
            url: "https://api.lootbox.eu/" + myPlatform + "/" + myRegion + "/" + myUserName + "/quick-play/heroes"
        }).then(function successCallback(response) {
            myPlayedHeroesQP = response.data;
            getMyPlayedHeroesQP(myPlayedHeroesQP);
        }, function errorCallback(response) { alert(response); });

        //get list of most played heroes in competitive play
        $http({
            method: 'GET',
            url: "https://api.lootbox.eu/" + myPlatform + "/" + myRegion + "/" + myUserName + "/competitive-play/heroes"
        }).then(function successCallback(response) {
            myPlayedHeroesComp = response.data;
            getMyPlayedHeroesComp(myPlayedHeroesComp);
        }, function errorCallback(response) { alert(response); });
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

    function getAllMyHeroesQP(allMyHeroesQP) {

    }

    function getAllMyHeroesComp(allMyHeroesComp) {

    }

    function getMyHeroQP(myHeroQP) {

    }

    function getMyHeroComp(myHeroComp) {

    }

    function getMyPlayedHeroesQP(myPlayedHeroesQP) {
        for (var i = 0; i < myPlayedHeroesQP.length; i++) {
            var myMostPlayedQP = myPlayedHeroesQP[0];
            $scope.myMostPlayedQP = myMostPlayedQP.image;
        }
    }

    function getMyPlayedHeroesComp(myPlayedHeroesComp) {

    }

    //-----------------------------------------------------------------------------------------------------------------------
    //OPPONENT DETAILS

    $scope.getOppData = function() {
        var oppUserInput = $scope.oppUserInput;
        var oppUserName = oppUserInput.replace("#", "-");
        var oppPlatform = $scope.data.oppPlatformSelect;
        var oppRegion = $scope.data.oppRegionSelect;

        //get basic profile data
        $http({
            method: 'GET',
            url: "https://api.lootbox.eu/" + oppPlatform + "/" + oppRegion + "/" + oppUserName + "/profile"
        }).then(function successCallback(response) {
            oppDetails = response.data;
            getOppDetails(oppDetails);
        }, function errorCallback(response) { alert(response.error); });

        //get all heroes data from quick play
        $http({
            method: 'GET',
            url: "https://api.lootbox.eu/" + oppPlatform + "/" + oppRegion + "/" + oppUserName + "/quick-play/allHeroes/"
        }).then(function successCallback(response) {
            allOppHeroesQP = response.data;
            getAllOppHeroesQP(allOppHeroesQP);
        }, function errorCallback(response) { alert(response); });

        //get all heroes data from competitive play
        $http({
            method: 'GET',
            url: "https://api.lootbox.eu/" + oppPlatform + "/" + oppRegion + "/" + oppUserName + "/competitive-play/allHeroes/"
        }).then(function successCallback(response) {
            allOppHeroesComp = response.data;
            getAllOppHeroesComp(allOppHeroesComp);
        }, function errorCallback(response) { alert(response); });

        //get a singular hero's data from quick play
        // $http({
        //     method: 'GET',
        //     url: "https://api.lootbox.eu/" + oppPlatform + "/" + oppRegion + "/" + oppUserName + "/quick-play/" + hero
        // }).then(function successCallback(response) {
        //     oppHeroQP = response.data;
        //     getOppHeroQP(oppHeroQP);
        // }, function errorCallback(response) { alert(response); });

        //get a singular hero's data from competitive play
        // $http({
        //     method: 'GET',
        //     url: "https://api.lootbox.eu/" + oppPlatform + "/" + oppRegion + "/" + oppUserName + "/competitive-play/" + hero
        // }).then(function successCallback(response) {
        //     oppHeroComp = response.data;
        //     getOppHeroComp(oppHeroComp);
        // }, function errorCallback(response) { alert(response); });

        //get list of most played heroes in quick play
        $http({
            method: 'GET',
            url: "https://api.lootbox.eu/" + oppPlatform + "/" + oppRegion + "/" + oppUserName + "/quick-play/heroes"
        }).then(function successCallback(response) {
            oppPlayedHeroesQP = response.data;
            getOppPlayedHeroesQP(oppPlayedHeroesQP);
        }, function errorCallback(response) { alert(response); });

        //get list of most played heroes in competitive play
        $http({
            method: 'GET',
            url: "https://api.lootbox.eu/" + oppPlatform + "/" + oppRegion + "/" + oppUserName + "/competitive-play/heroes"
        }).then(function successCallback(response) {
            oppPlayedHeroesComp = response.data;
            getOppPlayedHeroesComp(oppPlayedHeroesComp);
        }, function errorCallback(response) { alert(response); });
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

    function getAllOppHeroesQP(allOppHeroesQP) {

    }

    function getAllOppHeroesComp(allOppHeroesComp) {

    }

    function getOppHeroQP(oppHeroQP) {

    }

    function getOppHeroComp(oppHeroComp) {

    }

    function getOppPlayedHeroesQP(oppPlayedHeroesQP) {
        for (var i = 0; i < oppPlayedHeroesQP.length; i++) {
            var oppMostPlayedQP = oppPlayedHeroesQP[0];
            $scope.oppMostPlayedQP = oppMostPlayedQP.image;
        }
    }

    function getOppPlayedHeroesComp(oppPlayedHeroesComp) {

    }

    //------------------------------------------------------------------------------------------------------------------------
    //COMPARISON INFORMATION

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