var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "login.html",
            controller : "loginCtrl"
        })
        .when("/emp", {
            templateUrl : "employee.html"
        })
        .when("/add", {
            templateUrl : "signup.html",
            controller : "addCtrl"
        });
});
app.service("empdataService",function ($http) {
    this.employeefunc = function()
    {
        return $http.get("EmployeeData.JSON");
    };
    this.temp = null;
    this.object = {};
});
app.controller("empCtrl", function($scope,empdataService,$location,$filter)
{
    empdataService.employeefunc().then(function(response)
    {
        $scope.Records = response.data.Records;
        empdataService.object = $scope.Records;
        $scope.total = $scope.Records.length;
        console.log(empdataService.object);
    });
    $scope.IsVisible = false;

        $scope.ShowHide = function () {
        $scope.IsVisible = $scope.IsVisible = true;
    }
        $scope.order = function(predicate) {
            $scope.reverse = !$scope.reverse;
            $scope.Records = $filter('orderBy')($scope.Records, predicate, $scope.reverse);
        };
    $scope.removeInput = function(index) {
        empdataService.object.splice(index, 1);
    };
    $scope.add = function ()
    {
        $location.path('/add');
        empdataService.temp  = null;

    };
    $scope.editInput = function (index) {
        empdataService.temp = index;
        $location.path('/add');
        console.log(empdataService.temp);

    };
    $scope.sortBy = function () {
        
    }
});
app.controller("addCtrl", function ($scope,$location,empdataService) {
    $scope.user={};
    $scope.user = empdataService.object[empdataService.temp];
        if (!empdataService.temp) {
            $scope.addInput = function() {
                $location.path('/emp');
                empdataService.object.push($scope.user);
                $scope.user = "";
            }
        }
        else {
            $scope.addInput = function () {
                empdataService.object[empdataService.temp] = $scope.user;
                $location.path("/emp");
            }
        }
});
app.controller("loginCtrl", function ($scope,$location) {
    $scope.new = {};
    $scope.loginInput = function () {

        for ( i = 0; i < $scope.Records.length ; i++){

            if ( angular.equals($scope.new.name , $scope.Records[i].name)  &&
                angular.equals($scope.new.email , $scope.Records[i].email) ){

                $scope.store = $scope.new;

            }

        }
        if ( $scope.store) {

            $location.path("/emp");

        }
        else {

            alert("Username or Password is Incorrect!");
        }

    };
    $scope.cancelwindow = function()
    {
        $location.path("/emp");

    }
});
