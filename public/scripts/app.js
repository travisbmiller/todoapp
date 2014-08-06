


angular
  .module('Todo', ['ui.router'])
  .config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
     
     $locationProvider.html5Mode(true);
   
     $stateProvider.state('todo', {
      url: '/',
      controller: 'App.controller',
      templateUrl: 'templates/todo.html'
      });

     $stateProvider.state('completed', {
       url: '/completed',
       controller: 'Completed.controller',
       templateUrl: '/templates/completed.html'
     });

     $stateProvider.state('deleted', {
       url: '/deleted',
       controller: 'Delete.controller',
       templateUrl: '/templates/deleted.html'
     });

  }]);



angular
  .module('Todo')
  .controller('App.controller', ['$scope', 'Data', function($scope, Data) {
    console.log("app controller");
    $scope.Data = Data;

    $scope.list = Data.testList;
    $scope.values = {};
    $scope.completedList = Data.completedList;
    $scope.numberCompleted = Data.completedList.length;

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
      Data.testList.unshift({todo: $scope.text, submitTime: datetime, showInput: false, notes: []});
      
      // clearing out input after submittion
      $scope.text = '';

      
    };

    $scope.remove = function($index){
      // remoing item but it returns and array with an object
      var item = Data.testList.splice($index,1);
      // removing array and just returning and object
      var completedItem = item.splice(0,1);
      // adding object to the beginning of completedItem array
      Data.completedList = Data.completedList.concat(completedItem);
      console.log(item);
      console.log(completedItem);
    }

    $scope.submitNote = function($index) {
      // grabing the current textinput by $index number
      var textinput = $scope.values['field_' + $index];
      // adding textiput to the beginning notes array
      Data.testList[$index].notes.unshift(textinput);
      // clearing out input field
      $scope.values['field_' + $index] = '';
      // hiding input field
      Data.testList[$index].showInput = false;
    }

    $scope.showInputOnClick = function( $index ) {
      
      // checking to see if its beening shown
      if (Data.testList[$index].showInput === true) {
        // if its being shown hide it by setting to false
        item = Data.testList[$index].showInput = false;
      
      } else {
        // if its not being shown show it by setting it to true
        item = Data.testList[$index].showInput = true;
      
      }

      return item;

    }

  }]);



angular
  .module('Todo')
  .controller('Completed.controller', ['$scope','Data', function($scope, Data) {
  
    $scope.Data = Data;
    $scope.completedList = Data.completedList.reverse();
    
    $scope.remove = function($index){
      
      var strconfirm = confirm("Are you sure you want to delete?");
      if (strconfirm == true) { 
        var item = Data.completedList.splice($index,1);}
      // remoing item but it returns and array with an object
     
      // removing array and just returning and object
      var deletedItem = item.splice(0,1);
      // adding object to the beginning of completedItem array
      Data.deletedList = Data.deletedList.concat(deletedItem);
    }

  }]);

angular
  .module('Todo')
  .controller('Delete.controller', ['$scope','Data', function($scope, Data) {
  
    $scope.deletedList = Data.deletedList.reverse();
    $scope.completedList = Data.completedList;
    
    console.log(Data.deletedList);

  }]);

angular
  .module('Todo')
  .service('Data', function() {

    return {
      testList: [], 
      completedList: [],
      deletedList: [] 
    }

 });


