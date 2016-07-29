/**
 * Created by Tommzy on 7/29/2016.
 */

//create an Angular service for http request to git search API and restful web service(backend)
searchRouter.service('searchService', function ($http, $q) {
    return {
        getRepository: function(searchStr, language_1, language_2,sort, order, current_page, result_perpage){
        // getRepository: function(){

            return $http.get("https://api.github.com/search/repositories?" +
                "q=" +
                "+language:" + language_1 +
                "+language:" + language_2 +
                "&sort=" + sort +
                "&order=" + order +
                "&page=" + current_page +
                "&per_page=" + result_perpage).then(function(response){
                var result = null;
                if (response.data != null) {
                    console.log("Result Received from git search API" + response.data.items.toString());
                    result = response.data.items;
                } else {
                    console.log("get no data from git search API");
                }
                return result;
            }, function(error) {
                // promise rejected, could log the error with: console.log('error', error);
                console.log("Get result Error At server: ");
                console.log('error', error);
                return $q.reject(error);
            });

        }
    }
});