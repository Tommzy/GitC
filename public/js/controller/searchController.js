/**
 * Created by Tommzy on 7/29/2016.
 */
//main page search function controller
searchRouter.controller('searchController', function ($scope, $http, searchService) {
    $scope.results = null;
    $scope.language_1 = "C";
    $scope.language_2 = "C++";
    $scope.sort = {display_name : "Stars", code : "stars"};
    $scope.order = "desc";
    $scope.current_page = 1;
    $scope.result_perpage = 2;
    $scope.sort_menu = [
        {display_name : "Stars", code : "stars"},
        {display_name : "Forks", code : "forks"},
        {display_name : "Recent Updated", code : "updated"}
    ];
    $scope.search = function(){
        $scope.results = [{status: "Loading ..."}];
        var searchPromise = searchService.getRepository(
            "",
            $scope.language_1,
            $scope.language_2,
            $scope.sort,
            $scope.order.code,
            $scope.current_page,
            $scope.result_perpage);
        searchPromise.then(function(data){
            $scope.results = data;
        }, function(error) {
            $scope.results = [{error: "Server in busy. Please try again later"}];
        });
    };

    $scope.prev = function() {
      if($scope.current_page > 1) {
          $scope.current_page--;
      }
      $scope.search();
    };

    $scope.next = function(){
        $scope.current_page++;
        $scope.search();
    };

    $scope.changeSort = function(option){
        console.log("sort option change to: " + option)
        $scope.sort = option;
    }
});
