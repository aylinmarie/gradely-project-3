ShowController.$inject = ['$stateParams', '$scope', 'UsersService'];

function ShowController($stateParams, $scope, UsersService) {
  const vm = this;
  vm.current = {};

  activate();

  function activate() {
  	loadCurrent();
  }

  function loadCurrent(userId) {

  	UsersService
  		.loadCurrent($stateParams.userId)
  		.then(function resolve(response) {
  			vm.current = response.data.user;
  		})
  }

  $scope.getSumPointsEarned = function(student){
      var total = Number(0);
      for(var i = 0; i < student.assignments.length; i++){
          var points = Number(student.assignments[i].pointsEarned);
          total += points;
      }
      return total;
  }

  $scope.getSumPointsMax = function(student){
      var total = Number(0);
      for(var i = 0; i < student.assignments.length; i++){
          var points = Number(student.assignments[i].pointsMax);
          total += points;
      }
      return total;
  }
}

module.exports = ShowController;

