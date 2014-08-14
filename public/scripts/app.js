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
          datetime = currentdate.getHours() + ":" +
                     currentdate.getMinutes() + ":" +
                     currentdate.getSeconds(),
       dateFormmat = currentdate.getMonth() + "/" +
                     currentdate.getDay() + 
                     currentdate.getDate();


      var formatDate = function() {
        var currentdate = new Date(),
                weekDay = currentdate.getDay(),
              monthDate = currentdate.getDate(), 
                          dateFormatted,
                          suffix;
        
          switch (weekDay) {
            case 0:
              weekDay = "Mon"
              break;
            case 1:
              weekDay = "Tues"
              break;
            case 3:
              weekDay = "Wed"
              break;
            case 4:
              weekDay = "Thur"
              break;
            case 5:
              weekDay = "Fri"
              break;
            case 6:
              weekDay = "Sat"
              break
          } 

          switch (monthDate) {
            case '1': case '21': case '31': suffix = 'st'; break;
            case '2': case '22': suffix = 'nd'; break;
            case '3': case '23': suffix = 'rd'; break;
            default: suffix = 'th';
          }

          

          dateFormatted = weekDay + " " + monthDate + suffix;

          return dateFormatted;
        
      }

      // adding input to notes array + submittion time
      Data.todoList.unshift({todo: $scope.text, submitTime: formatDate(), showInput: false, notes: []});
      

      



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
