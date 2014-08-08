angular
  .module('Todo', [ //array means DEFINE THE MODULE
    'ui.router'
  ]) 
  .config([
    '$stateProvider', 
    '$urlRouterProvider',
    '$locationProvider', 
    function ($stateProvider,
              $urlRouterProvider,
              $locationProvider) {
    
    $locationProvider.html5Mode(true);
   
    $stateProvider
      .state('home', {
         abstract: true,
         template: '<ui-view/>'
       })

       .state('home.todo', {
         url: '/todo',
         controller: 'App.controller',
         templateUrl: '/templates/todo.html'
       })

       .state('home.completed', {
         url: '/completed',
         controller: 'Completed.controller',
         templateUrl: '/templates/completed.html'
       })

       .state('home.deleted', {
         url: '/deleted',
         controller: 'Deleted.controller',
         templateUrl: '/templates/completed.html'
       });

    $urlRouterProvider.otherwise('/todo');

  }]);



angular
  .module('Todo')
  .controller('App.controller', [
    '$scope', 
    'Data', 
    '$timeout', 
    function ($scope, 
              Data, 
              $timeout) {

    var test = [];   

    $scope.list = Data.todoList;
    $scope.completed = Data.completed;
    $scope.values = {};
    $scope.deleted = Data.deleted;   

    $scope.submit = function ($index) {
      
      // getting current time and formating it
      var currentdate = new Date(),
          datetime = currentdate.getDate() + "/" +
                     (currentdate.getMonth()+1)  + "/"  +
                     currentdate.getFullYear() + " @ " +
                     currentdate.getHours() + ":" +
                     currentdate.getMinutes() + ":" +
                     currentdate.getSeconds();


      // adding input to notes array + submittion time
      Data.todoList.unshift({todo: $scope.text, submitTime: datetime, showInput: false, notes: []});
      
      // clearing out input after submittion
      $scope.text = '';

      
    };

    $scope.remove = function (item, $index) {
      // removing item but it returns and array with an object [{}]
      Data.todoList.splice($index, 1); 
      // Adding item to Data.completed array by concetting two arrays
      Data.completed.push(item);

      console.log(Data.competed);

      // If Angular doesn't automatically update your view, use $timeout
      // $timeout(function(){$scope.completed = Data.completed});
  
    }

    $scope.submitNote = function ($index) {
      // grabing the current textinput by $index number
      var textinput = $scope.values['field_' + $index];
      // adding textiput to the beginning notes array
      Data.todoList[$index].notes.unshift(textinput);
      // clearing out input field
      $scope.values['field_' + $index] = '';
      // hiding input field
      Data.todoList[$index].showInput = false;
    }

    $scope.showInputOnClick = function ($index) {
      
      // checking to see if its beening shown
      if (Data.todoList[$index].showInput === true) {
        // if its being shown hide it by setting to false
        item = Data.todoList[$index].showInput = false;
      
      } else {
        // if its not being shown show it by setting it to true
        item = Data.todoList[$index].showInput = true;
      
      }

      return item;

    }

  }]);

angular
  .module('Todo')
  .controller('Completed.controller', [
    '$scope',
    'Data',
    function ($scope,
              Data) {

    $scope.completed = Data.completed;

    $scope.remove = function(item, $index){
      // removing item but it returns and array with an object [{}]
      Data.completed.splice($index,1); 
      Data.deleted.push(item);
  
    }



}]);

angular
  .module('Todo')
  .controller('Deleted.controller', ['$scope', 'Data', function($scope, Data) {

    $scope.deleted = Data.deleted;

    console.log("deleted")
    console.log(Data.deleted)


}]);

angular
  .module('Todo')
  .factory('Data', function() {

  return {
    todoList: [],
    completed: [],
    deleted: []
  }

});
