siteApp.registerCtrl('LoginCtrl', [
		'$scope',
		'$rootScope',
		'$log',
		'AuthRestangular',
		'Restangular',
		'UserService',
		function($scope, $rootScope, $log, AuthRestangular, Restangular,
				UserService) {
			$scope.login = {
				'username' : '',
				'password' : '',
				'rememberMe' : ''
			};
			$scope.isSignedIn = UserService.isSignedIn ? UserService.isSignedIn
					: false;
			$scope.signin = function() {
				var login = AuthRestangular.one('signin');
				login.customPOST($scope.login).then(
						function(response) {
							$scope.login.username = '';
							$scope.login.password = '';
							UserService.isSignedIn = true;
							$scope.isSignedIn = UserService.isSignedIn;
							$scope.fullName = UserService.firstName + ' '
									+ UserService.lastName;
						}, function(errorResponse) {
							$log.info(errorResponse);
						});
			};

			$scope.signout = function() {
				var logout = AuthRestangular.one('signout');
				logout.post().then(function() {
					UserService.username = '';
					UserService.isSignedIn = false;
					$scope.isSignedIn = false;
				}, function(response) {
					$log.info(response);
				});
			}
		} ]);