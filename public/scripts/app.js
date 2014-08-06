
angular
  .module('Todo',['ui.router'])
  .config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
     $locationProvider.html5Mode(true);
   
     $stateProvider.state('home', {
       abstract: true;
       template: '<ui-view/>'
     });


     $stateProvider.state('home.todo', {
       url: '/',
       controller: 'App.controller',
       templateUrl: '/templates/todo.html'
     });

     $stateProvider.state('home.completed', {
       url: '/completed',
       controller: 'Completed.controller',
       templateUrl: '/templates/completed.html'
     });

     $stateProvider.state('deleted', {
       url: '/deleted',
       controller: 'Deleted.controller',
       templateUrl: '/templates/completed.html'
     });

  }]);



angular
  .module('Todo', ["ui.router"])
  .controller('App.controller', ['$scope', function($scope) {
   
   console.log("app controler");
    var testList = [] //[{todo: "list item 1", submitTime: 1, notes: ["note 1", "note 1.1"]},{todo: "list item 1", submitTime: 1, notes: []}];
    var completedList = []; // array for completed items

    $scope.list = testList;
    $scope.values = {};
    $scope.completedList = completedList
    $scope.numberCompleted = completedList.length;
   

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
      testList.unshift({todo: $scope.text, submitTime: datetime, showInput: false, notes: []});
      
      // clearing out input after submittion
      $scope.text = '';

      
    };

    $scope.remove = function($index){
      // remoing item but it returns and array with an object
      var item = testList.splice($index,1);
      // removing array and just returning and object
      var completedItem = item.splice(0,1);
      // adding object to the beginning of completedItem array
      completedList.unshift(completedItem);

    }

    $scope.submitNote = function($index) {
      // grabing the current textinput by $index number
      var textinput = $scope.values['field_' + $index];
      // adding textiput to the beginning notes array
      testList[$index].notes.unshift(textinput);
      // clearing out input field
      $scope.values['field_' + $index] = '';
      // hiding input field
      testList[$index].showInput = false;
    }

    $scope.showInputOnClick = function( $index ) {
      
      // checking to see if its beening shown
      if (testList[$index].showInput === true) {
        // if its being shown hide it by setting to false
        item = testList[$index].showInput = false;
      
      } else {
        // if its not being shown show it by setting it to true
        item = testList[$index].showInput = true;
      
      }

      return item;

    }



  }]);