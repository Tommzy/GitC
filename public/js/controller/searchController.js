/**
 * Created by Tommzy on 7/29/2016.
 */
//main page search function controller
searchRouter.controller('searchController', function ($scope, $http, searchService) {
    //paging init
    $scope.maxSize = 5;
    $scope.totalpage = 0;
    $scope.current_page = 1;
    $scope.result_perpage = 10;
    //paging functiongs
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.currentPage);
    };

    //init the search parameters
    $scope.results = null;
    $scope.language_1 = "C";
    $scope.language_2 = "C++";
    $scope.sort = {display_name : "Stars", code : "stars"};
    $scope.order = "desc";
    $scope.sort_menu = [
        {display_name : "Stars", code : "stars"},
        {display_name : "Forks", code : "forks"},
        {display_name : "Recent Updated", code : "updated"}
    ];
    $scope.result_menu = [10, 20, 50, 100];

    //pass parameters from the webpage to the service to create a http call to the API
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
            $scope.results = data.items;
            $scope.totalpage = data.total_count / $scope.result_perpage;
        }, function(error) {
            $scope.results = [{error: "Server in busy. Please try again later"}];
        });
    };

    //change the way sort and update
    $scope.changeSort = function(option){
        console.log("sort option change to: " + option)
        $scope.sort = option;
        $scope.search();
    };

    //change the Result perpage and update
    $scope.changeResultPerPage = function(num){
        console.log("Result Per Page change to: " + num)
        $scope.result_perpage = num;
        $scope.search();
    };
    $scope.search();// search when on load
});
