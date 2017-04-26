(function () {

	/**
	* passportjwtAuth Module
	*
	* The main module of this application...
	*/
	angular.module('passportjwtAuth', ['passportjwtAuth.router', 'passportjwtAuth.ctrl']);

	angular.module('passportjwtAuth.router', ['ui.router']);
	angular.module('passportjwtAuth.ctrl', []);

})();
