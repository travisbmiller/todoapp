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
      

       .state('todo', {
         url: '/',
         controller: 'App.controller',
         templateUrl: '/templates/todo.html'
       })

       // .state('home.completed', {
       //   url: '/completed',
       //   controller: 'Completed.controller',
       //   templateUrl: '/templates/completed.html'
       // })

       // .state('home.deleted', {
       //   url: '/deleted',
       //   controller: 'Deleted.controller',
       //   templateUrl: '/templates/completed.html'
       // });

    $urlRouterProvider.otherwise('/');

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

    
    



    $scope.$watch('list', function(list){

      var lengths = {},
          allLengths = {},
          todolength = Data.todo.length,
          i;

      for(i in list){
        if(lengths[list[i].group] === undefined){
          lengths[list[i].group] = 1;
        }
        else if(lengths[list[i].group] !== undefined){
          lengths[list[i].group]++;
        }
      }


      for (i in list) {
       if (list[i].group === "completed") {
        todolength--;
      } else if (list[i].group === "deleted") {
        todolength--;
      }
       
      }

      $timeout(function(){

        $scope.alllengths = todolength;

      });


      $timeout(function(){

        $scope.lengths = lengths;

      });

    }, true);

    $scope.list = Data.todo;
    // $scope.completed = Data.completed;
    $scope.values = {};
    // $scope.deleted = Data.deleted;  
    $showtodoinput = false; 
    $showlistinput = false;
    $scope.deleted = 0;
    $scope.completed = 0;
    $scope.group = "All"
    $scope.allcount; 
    $scope.todoList = Data.todogroup;
    $scope.showlayover = false;
    

    
    $scope.submitList = function () {
       
      if ($scope.inputList === undefined) {

          $scope.showlistinput = false;
      
      } else {

        if ( Data.todogroup.indexOf($scope.inputList.toLowerCase()) !== -1 || $scope.inputList.toLowerCase() == 'all' ) {
          
          $scope.showlayover = true;
          $scope.modalText = $scope.inputList;
          $scope.inputList = '';
          
        } else {

          if ($scope.inputList == '') {

            $scope.showlistinput = false;
         
         }
        
         if ($scope.inputList ) {
           
            Data.todogroup.unshift($scope.inputList.toLowerCase());
            $scope.inputList = '';
            $scope.showlistinput = false;
         }
        }  
       }
      
      
  }

    $scope.submit = function () {
      
      

      if ($scope.text === undefined || $scope.text === '' ) {
        $scope.showtodoinput = false;

      } else {

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
                    hours = currentdate.getHours(),
                     mins = currentdate.getMinutes(),
                timeofday = "am",       
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

            if ( hours >= 13 ) {
              timeofday = "pm";
            }

            if (hours >= 13) {
              hours = hours - 12;
            }
            


            dateFormatted = weekDay + " " + hours + ":" + mins + timeofday;

            return dateFormatted;
          
        }

        // adding input to notes array + submittion time
        Data.todo.unshift({title: $scope.text, group: $scope.group, submitTime: formatDate(), showInput: false, notes: []});
        
        // clearing out input after submittion
        $scope.text = '';

        //Hiding input after submit
        $scope.showtodoinput = false;
   
      };
    }

    $scope.remove = function (item) {
      // Changing group type
      item.group = "deleted"; 
      // Updating scope count for deleted items
       
    }

    $scope.itemcompleted = function (item) {
      // Changing group type
      item.group = "completed";
      
    }

    $scope.removeListItem = function (item) {
      
      // This is slice all the objects of out Data.todo that have the same group name

      i = Data.todo.length;
      while (i--) { 
        if (Data.todo[i].group === item) {
          Data.todo.splice(i,1)
        }
      }
      
      // This is remove the list name from Data.todogroup

      Data.todogroup.splice(Data.todogroup.indexOf(item),1);

      // Change $scope.group = back to all
      $scope.group = "all";

    }

    // $scope.submitNote = function ($index) {
    //   // grabing the current textinput by $index number
    //   var textinput = $scope.values['field_' + $index];
    //   // adding textiput to the beginning notes array
    //   Data.todoList[$index].notes.unshift(textinput);
    //   // clearing out input field
    //   $scope.values['field_' + $index] = '';
    //   // hiding input field
    //   Data.todoList[$index].showInput = false;
    // }

    // $scope.showInputOnClick = function ($index) {
      
    //   // checking to see if its beening shown
    //   if (Data.todoList[$index].showInput === true) {
    //     // if its being shown hide it by setting to false
    //     item = Data.todoList[$index].showInput = false;
      
    //   } else {
    //     // if its not being shown show it by setting it to true
    //     item = Data.todoList[$index].showInput = true;
      
    //   }

    //   return item;

    // }

  }]);

// angular
//   .module('Todo')
//   .controller('Completed.controller', [
//     '$scope',
//     'Data',
//     function ($scope,
//               Data) {

//     $scope.completed = Data.completed;

//     $scope.remove = function(item, $index){
//       // removing item but it returns and array with an object [{}]
//       Data.completed.splice($index,1); 
//       Data.deleted.push(item);
  
//     }



// }]);

// angular
//   .module('Todo')
//   .controller('Deleted.controller', ['$scope', 'Data', function($scope, Data) {

//     $scope.deleted = Data.deleted;

//     console.log("deleted")
//     console.log(Data.deleted)


// }]);

angular
  .module('Todo')
  .factory('Data', function() {

  return {
    todo: [],
    todogroup: []
    
  }

});

angular
  .module('Todo')
  .filter('capfirst', function() {
 return function(input, scope) {
 if (input!=null)
 input = input.toLowerCase();
 return input.substring(0,1).toUpperCase()+input.substring(1);
 }
});  
