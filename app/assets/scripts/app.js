angular
  .module('Todo', ['ui.router']) //array means DEFINE THE MODULE
  .config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);
   
     $stateProvider.state('home', {
       abstract: true,
       template: '<ui-view/>'
     })


     .state('home.todo', {
       url: '/',
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
     })

  }]);



angular
  .module('Todo')
  .controller('App.controller', ['$scope', 'Data', function($scope, Data) {
   

    $scope.list = Data.todoList;
    
    $scope.values = {};
    
    $scope.completed = Data.completed;

    $scope.deleted = Data.deleted;
    
    var test = [];    

    $scope.submit = function($index){
      
      // getting current time and formating it
      var currentdate = new Date(); 
      var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();


      // adding input to notes array + submittion time
      Data.todoList.unshift({todo: $scope.text, submitTime: datetime, showInput: false, notes: []});
      
      // clearing out input after submittion
      $scope.text = '';

      
    };

    $scope.remove = function($index){
      // removing item but it returns and array with an object [{}]
      var item = Data.todoList.splice($index,1); 
      Data.completed.unshift(item);
      console.log(Data.completed);
  
    }


    $scope.submitNote = function($index) {
      // grabing the current textinput by $index number
      var textinput = $scope.values['field_' + $index];
      // adding textiput to the beginning notes array
      Data.todoList[$index].notes.unshift(textinput);
      // clearing out input field
      $scope.values['field_' + $index] = '';
      // hiding input field
      Data.todoList[$index].showInput = false;
    }

    $scope.showInputOnClick = function( $index ) {
      
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
  .controller('Completed.controller', ['$scope', 'Data', function($scope, Data) {

    $scope.completed = Data.completed;

    $scope.remove = function($index){
      // removing item but it returns and array with an object [{}]
      var item = Data.completed.splice($index,1); 
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
