(function () {
    "use strict";

var app = angular.module('viewCustom', ['angularLoad']);


/* hijack the onclick of the logo */
app.controller('prmLogoAfterController', function($scope, $element, $compile) {
	var prnt = $element.parent();
	prnt[0].setAttribute("onclick", "window.location.href = 'https://otago-staging.hosted.exlibrisgroup.com/primo-explore/search?vid=DUNEDIN&sortby=rank&search_scope=All';");
});

app.component('prmLogoAfter', {
	bindings: {
		parentCtrl: '<'
	},
	controller: 'prmLogoAfterController'
});


// rework the top menu items
app.controller('prmMainMenuAfterController', function() {
	var topMenuObs = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (!mutation.addedNodes) return
			for (var i = 0; i < mutation.addedNodes.length; i++) {
				// do things to your newly added nodes here
				var node = mutation.addedNodes[i];
				if (node.nodeName == "A") {
					//Need to add an href to the main menu links, or they don't open correctly when told to open in a new tab
					try {	// New search
						if (node.getAttribute("aria-label") == "mainmenu.label.library_search" || node.getAttribute("aria-label") == "New search") {
							node.href = "/primo-explore/search?vid=DUNEDIN&lang=en_US";
						}
					} catch (e) {console.log("New search link error: ", e)}
					try {	// E-journals
						if (node.getAttribute("aria-label") == "nui.mainmenu.label.journalsearch" || node.getAttribute("aria-label") == "E-journals") {
							node.href = "/primo-explore/jsearch?vid=DUNEDIN&lang=en_US";
						}
					} catch (e) {console.log("E-journals link error: ", e)}
					try {	// Databases
						if (node.getAttribute("aria-label") == "mainmenu.label.databases" || node.getAttribute("aria-label") == "Databases") {
							node.href = "http://www.otago.ac.nz/library/databases/index.php";
							node.target = "_blank";
							node.setAttribute("onclick", "return false;");
						}
					} catch (e) {console.log("Databases link error: ", e)}
					try {	// Help
						if (node.getAttribute("aria-label") == "mainmenu.label.help" || node.getAttribute("aria-label") == "Help") {
							node.href = "https://otago.libguides.com/ketuhelp";
							node.target = "_blank";
							node.setAttribute("onclick", "return false;");
						}
					} catch (e) {console.log("Help link error: ", e)}
					try {	// Library home
						if (node.getAttribute("aria-label") == "mainmenu.label.library_home" || node.getAttribute("aria-label") == "Library home") {
							node.href = "http://www.otago.ac.nz/library/index.html";
						}
					} catch (e) {console.log("Library home link error: ", e)}
				}
			}
		})
	});

	topMenuObs.observe(document.getElementsByTagName("prm-main-menu")[0], {
		childList: true
		, subtree: true
		, attributes: false
		, characterData: false
	})
});

app.component('prmMainMenuAfter', {
	bindings: {
		parentCtrl: '<'
	},
	controller: 'prmMainMenuAfterController'
});




app.controller('prmUserAreaAfterController', ['$element', '$scope', '$location',  function($element, $scope, $location) {
	
    var ctrl = this;

    ctrl.$onInit = function() {
      ctrl.$element = $element;
    };

    ctrl.$postLink = function() {
      ctrl.insertUserSignin();
    };

    ctrl.insertUserSignin = function() {
		var elementRemove = document.getElementsByTagName('prm-user-area')[0];
		angular.element(elementRemove.children[1]).remove();
		angular.element(elementRemove.children[0]).remove();
	  
		$scope.signIn = function (choice) {
			
			var signin_choice = document.getElementById("signin_choice").value;
			var start_full_url = "";
			var end_full_url = "";
			if (choice == 'main') {
				switch (signin_choice) {
					case "UO":
						start_full_url = "https://otago-staging.hosted.exlibrisgroup.com:443/shib/DUNEDIN/pds_main?func=load-login&calling_system=primo&institute=DUNEDIN&PDS_HANDLE=&url=https://otago-staging.hosted.exlibrisgroup.com:443/primo_library/libweb/pdsLogin?targetURL=";
						end_full_url = "&from-new-ui=1&authenticationProfile=DUNEDIN%5FPDS"
						break;
					case "OP":
						start_full_url = "https://otago-staging.hosted.exlibrisgroup.com:443/pds?func=load-login&calling_system=primo&institute=64OTAGO_DUNEDIN_INST&PDS_HANDLE=&url=https://otago-staging.hosted.exlibrisgroup.com:443/primo_library/libweb/pdsLogin?targetURL=";
						end_full_url = "&from-new-ui=1&authenticationProfile=DUNEDIN%5FPDS";
						break;
					case "DHB":
						start_full_url = "https://otago-staging.hosted.exlibrisgroup.com:443/pds?func=load-login&calling_system=primo&institute=64OTAGO_DUNEDIN_INST&PDS_HANDLE=&url=https://otago-staging.hosted.exlibrisgroup.com:443/primo_library/libweb/pdsLogin?targetURL=";
						end_full_url = "&from-new-ui=1&authenticationProfile=DUNEDIN%5FPDS";
						break;
					case "HOC":
						start_full_url = "https://otago-staging.hosted.exlibrisgroup.com:443/pds?func=load-login&calling_system=primo&institute=64OTAGO_DUNEDIN_INST&PDS_HANDLE=&url=https://otago-staging.hosted.exlibrisgroup.com:443/primo_library/libweb/pdsLogin?targetURL=";
						end_full_url = "&from-new-ui=1&authenticationProfile=DUNEDIN%5FPDS";
						break;
					case "ULANZ":
						start_full_url = "https://otago-staging.hosted.exlibrisgroup.com:443/pds?func=load-login&calling_system=primo&institute=64OTAGO_DUNEDIN_INST&PDS_HANDLE=&url=https://otago-staging.hosted.exlibrisgroup.com:443/primo_library/libweb/pdsLogin?targetURL=";
						end_full_url = "&from-new-ui=1&authenticationProfile=DUNEDIN%5FPDS";
						break;
				}
				
				var current_url = $location.$$absUrl;
				var target_url = start_full_url + current_url + end_full_url;
			}
			
			if (choice == 'card') {
				var target_url = "https://otago-staging.hosted.exlibrisgroup.com/shib/DUNEDIN/pds_main?func=load-login&calling_system=primo&institute=DUNEDIN&PDS_HANDLE=&url=https://otago-staging.hosted.exlibrisgroup.com:443/primo_library/libweb/pdsLogin?targetURL=https%3A%2F%2Fotago-staging%2Ehosted%2Eexlibrisgroup%2Ecom%2Fprimo-explore%2Faccount%3Fvid%3DDUNEDIN&authenticationProfile=DUNEDIN%5FPDS";
			}
			
			
			window.location = target_url;
		};
	  
    };

  }
]);

app.component('prmUserAreaAfter', {
  bindings: {
    parentCtrl: '<'
  },
  controller: 'prmUserAreaAfterController',
  templateUrl: 'custom/DUNEDIN/html/prmUserAreaAfter.html'
});


/*sign in dropdown for full record view*/
app.controller('prmLoginAlmaMashupAfterController', ['$element', '$scope', '$location',  function($element, $scope, $location) {
	$scope.frvSignInAction = function() {
		document.getElementById('frv_pre_signin_btn').style.display = 'none';
		document.getElementById('frv_signin_dropdown').style.display = 'flex';
	};
	
	$scope.frvSignIn = function () {
		let signin_choice = document.getElementById("frv_signin_choice");
		if (signin_choice !== null) {
			signin_choice = signin_choice.value;
			var start_full_url = "";
			var end_full_url = "";
			switch (signin_choice) {
				case "UO":
					start_full_url = "https://otago-staging.hosted.exlibrisgroup.com:443/shib/DUNEDIN/pds_main?func=load-login&calling_system=primo&institute=DUNEDIN&PDS_HANDLE=&url=https://otago-staging.hosted.exlibrisgroup.com:443/primo_library/libweb/pdsLogin?targetURL=";
					end_full_url = "&from-new-ui=1&authenticationProfile=DUNEDIN%5FPDS";
					break;
				case "OP":
					start_full_url = "https://otago-staging.hosted.exlibrisgroup.com:443/pds?func=load-login&calling_system=primo&institute=64OTAGO_DUNEDIN_INST&PDS_HANDLE=&url=https://otago-staging.hosted.exlibrisgroup.com:443/primo_library/libweb/pdsLogin?targetURL=";
					end_full_url = "&from-new-ui=1&authenticationProfile=DUNEDIN%5FPDS";
					break;
				case "DHB":
					start_full_url = "https://otago-staging.hosted.exlibrisgroup.com:443/pds?func=load-login&calling_system=primo&institute=64OTAGO_DUNEDIN_INST&PDS_HANDLE=&url=https://otago-staging.hosted.exlibrisgroup.com:443/primo_library/libweb/pdsLogin?targetURL=";
					end_full_url = "&from-new-ui=1&authenticationProfile=DUNEDIN%5FPDS";
					break;
				case "HOC":
					start_full_url = "https://otago-staging.hosted.exlibrisgroup.com:443/pds?func=load-login&calling_system=primo&institute=64OTAGO_DUNEDIN_INST&PDS_HANDLE=&url=https://otago-staging.hosted.exlibrisgroup.com:443/primo_library/libweb/pdsLogin?targetURL=";
					end_full_url = "&from-new-ui=1&authenticationProfile=DUNEDIN%5FPDS";
					break;
				case "ULANZ":
					start_full_url = "https://otago-staging.hosted.exlibrisgroup.com:443/pds?func=load-login&calling_system=primo&institute=64OTAGO_DUNEDIN_INST&PDS_HANDLE=&url=https://otago-staging.hosted.exlibrisgroup.com:443/primo_library/libweb/pdsLogin?targetURL=";
					end_full_url = "&from-new-ui=1&authenticationProfile=DUNEDIN%5FPDS";
					break;
			}
			
			var current_url = $location.$$absUrl;
			var target_url = start_full_url + current_url + end_full_url;
			
			window.location = target_url;
		}
	};
}]);

app.component('prmLoginAlmaMashupAfter', {
  bindings: {
    parentCtrl: '<'
  },
  controller: 'prmLoginAlmaMashupAfterController',
  templateUrl: 'custom/DUNEDIN/html/prmLoginAlmaMashupAfter.html'
});


/* make "New Search" clear locked facets */
app.controller('prmExploreMainAfterController', function($scope) {
	setTimeout(function(){
		var currentURL = $scope.$parent.$ctrl.searchService.$location.$$absUrl;
		var newSearchURL = 'https://otago-staging.hosted.exlibrisgroup.com/primo-explore/search?vid=DUNEDIN&lang=en_US&sortby=rank';
		var newSearchURL2 = 'https://otago-staging.hosted.exlibrisgroup.com/primo-explore/search?vid=DUNEDIN&sortby=rank';
		// if we're on the new search page, clear all sticky facets and add review exclude facet
		if (currentURL == newSearchURL || currentURL == newSearchURL2) {
			var stickyFacets = $scope.$parent.$ctrl.searchService.facetService.getStickyFacets();
			for (var i = 0; i < stickyFacets.length; i++) {
				$scope.$parent.$ctrl.searchService.facetService.removeStickyFacet(stickyFacets[i]);
			}
			
			//add reviews facet
			var reviewFacet = {name: "rtype", type: "exclude", value: "reviews", displayedType: "exact", displayValue: "reviews", label: "Reviews", operation: "add", persistent: false, tooltip: "Remove Type Reviews"};
			$scope.$parent.$ctrl.searchService.facetService.addStickyFacet(reviewFacet);
		}
	}, 2500);	
	
	// convert review facet to sticky
	if (window.location.href.indexOf("http:%2F%2Fmarvin.otago.ac.nz") > 0) {
		waitForElementToDisplay('prm-breadcrumbs div div div button prm-icon > md-icon', 1000);
		
		function waitForElementToDisplay(selector, time) {
			if(document.querySelector(selector) !=null) {
				var reviewFacetSelector = document.querySelector('[aria-label="Make this filter persistent throughout the session Reviews"]');
				angular.element(reviewFacetSelector).triggerHandler('click');
				return;
			}
			else {
				setTimeout(function() {
					waitForElementToDisplay(selector, time);
				}, time);
			}
		}
	}
});

app.component('prmExploreMainAfter', {
	bindings: {
		parentCtrl: '<'
	},
	controller: 'prmExploreMainAfterController'
});


/*warnings in user area*/
app.factory('getUserFines', function($http) {
	return {
		async: function() {
			return $http.get('/primo_library/libweb/webservices/rest/v1/myaccount/fines'); //returns promise
		}
	};
});

app.factory('getUserLoans', function($http) {
	return {
		async: function() {
			return $http.get('/primo_library/libweb/webservices/rest/v1/myaccount/loans'); //returns promise
		}
	};
});

app.factory('getUserRequests', function($http) {
	return {
		async: function() {
			return $http.get('/primo_library/libweb/webservices/rest/v1/myaccount/requests'); //returns promise
		}
	};
});

app.factory('getUserMsgs', function($http) {
	return {
		async: function() {
			return $http.get('/primo_library/libweb/webservices/rest/v1/myaccount/blocks_messages'); //returns promise
		}
	};
});

app.controller('userWarning', function(getUserFines, getUserLoans, getUserRequests, getUserMsgs, $scope) {
	$scope.hasFines = false; //default to off
	$scope.hasOverdues = false;
	$scope.hasRequests = false;
	$scope.hasMsgs = false;
	if ($scope.$parent.$parent.$ctrl.userName() != "") { //only request fines if the user is logged in
		//fines warning
		try {
			getUserFines.async().then(function(response) {
				if (response.data.data.fines.fine.length > 0) {
					$scope.hasFines = true;
				}
			});
		} catch(e) {}
		//overdues warning
		try {
			getUserLoans.async().then(function(response) {
				$scope.hasOverdues = response.data.data.loans.hasAlerts;
			});
		} catch(e) {}
		//requests
		try {
			getUserRequests.async().then(function(response) {
				var holds = response.data.data.holds.hold;
				if (holds.length > 0) {
					for (var i = 0; i < holds.length; i++) {
						if (holds[i].available == "Y") {
							$scope.hasRequests = true;
							break;
						}
					}
				}
			});
		} catch(e) {}
		//messages
		try {
			getUserMsgs.async().then(function(response) {
				if (response.data.data.blocksmessages.blockmessage.length > 0) {
					$scope.hasMsgs = true;
				}
			});
		} catch(e) {}
	}
});


// sign out buttons
app.factory('getSignoutInfo', function($http) {
	return {
		async: function() {
			return $http.get('/primo_library/libweb/webservices/rest/v1/myaccount/personal_settings'); //returns promise
		}
	};
});

app.controller('signout', function(getSignoutInfo, $scope, $http) {
	$scope.shib = false; //default to off
	$scope.notShib = false; //default to off
	
	if ($scope.$parent.$parent.$ctrl.userName() != "" && typeof($scope.$parent.$parent.$ctrl.userName()) != "undefined") { //only request fines if the user is logged in
		try {
			$scope.notShib = true; //show a sign out button
			getSignoutInfo.async().then(function(response) {
				var patronCode = response.data.data.patronstatus[0].registration[0].institution[0].patronstatuscode;
				var shibCodes = ['STAFF', 'STUDENTDISTANCE', 'STUDENT', 'EXTERNAL'];
				if (shibCodes.includes(patronCode)) {
					//check to see if behind zen
					$http.get('https://api.cognitive.microsoft.com/bing/v7.0/search').then(function(response) {
						//success: it'll never succeed but we need to check internet access
					}, function(data) {
						//error: as expected
						if (data.status == -1) { //status is 401 if not going through zen
							// behind zen
							$scope.notShib = false;
							$scope.shib = true;
						}
					})
				}
			});
		} catch(e) {}
	}
});


/*user favorites area. Adds back to search link*/
app.controller('prmFavoritesToolBarAfterController', function($scope, $compile, $http) {
	$http.get("/primo_library/libweb/webservices/rest/v1/myaccount").then(function(){
		//try to get the most recent search. If there isn't one, go back to home screen.
		try {
			var mostRecentSearch = $scope.$parent.$ctrl.searchHistoryService.totalItems[0].deepLink;
		} catch (e) {
			var mostRecentSearch = "/primo-explore/";
		}
		
		// var aP = document.querySelector("prm-favorites-tool-bar > md-toolbar > div");
		var aP = angular.element(document.querySelector("prm-favorites-tool-bar > md-toolbar > div"));
		if (aP) {
			var backButton = document.createElement('a');
			backButton.setAttribute("id", "back_button");
			backButton.setAttribute("href", mostRecentSearch);
			var backButtonLinkText = document.createTextNode("Back to search");
			
			var backButtonIcon = document.createElement("prm-icon");
			backButtonIcon.setAttribute("aria-label", "Go Back To Search");
			backButtonIcon.setAttribute("icon-type", "svg");
			backButtonIcon.setAttribute("svg-icon-set", "primo-ui");
			backButtonIcon.setAttribute("icon-definition", "back-to-search");
			backButtonIcon.setAttribute("id", "back_button");
			
			$compile(backButtonIcon)($scope);
			
			backButton.appendChild(backButtonIcon);
			backButton.appendChild(backButtonLinkText);
		
			aP.append(backButton);
		}
		
		//set browser back button to previous search
		/*window.onpopstate = function() {
			if (history.state == null) {
				history.pushState({searchHist: "Library Search | Ketu"}, "Library Search | Ketu", mostRecentSearch);
			}
		}*/
	});
});


app.component('prmFavoritesToolBarAfter', {
	bindings: {
		parentCtrl: '<'
	},
	controller: 'prmFavoritesToolBarAfterController'
});

/*add borrowing entitlements link to account overview*/
app.controller('prmAccountOverviewAfterController', ['$element', '$scope', '$compile', '$http', function($element, $scope, $compile, $http) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.$element = $element;
	};

	ctrl.$postLink = function() {
		ctrl.insertBrwEntsLink();
	};
	
	ctrl.insertBrwEntsLink = function() {
		let parentElement = ctrl.$element.parent();
		let container = angular.element(parentElement.children()[0]);
		
		var createDiv = document.createElement("div");
		var createA = document.createElement("a");
		var createLinkText = document.createTextNode("Borrowing entitlements");
		var createPrmIconOut = document.createElement("prm-icon");
		
		createDiv.setAttribute("class", "borrowing_entitlements_div");
		createA.setAttribute("href", "http://www.otago.ac.nz/library/quicklinks/borrowing/index.html#borrowing");
		createA.setAttribute("aria-label", "Borrowing entitlements");
		createA.setAttribute("target", "_blank");
		
		createPrmIconOut.setAttribute("class", "cust_prm_out");
		createPrmIconOut.setAttribute("icon-type", "svg");
		createPrmIconOut.setAttribute("svg-icon-set", "primo-ui");
		createPrmIconOut.setAttribute("icon-definition", "open-in-new");
		
		$compile(createPrmIconOut)($scope);

		createA.appendChild(createLinkText);
		createA.appendChild(createPrmIconOut);
		
		createDiv.appendChild(createA);

		//container[0].getElementsByTagName('md-tabs-canvas')[0].append(createDiv);
		angular.element(container[0].getElementsByTagName('md-tabs-canvas')[0]).append(createDiv);
	};
	
	// start func to get the search hist
	try {
		$scope.$parent.$ctrl.primolyticsService.searchService.searchHistoryService.getItemsFromLocalForage(); 
	} catch (e) {
		console.log("error getting search history: " + e);
	}
	
	//only show overdue icons when items are overdue (required due to bug showing historic loans as overdue)
	$http.get('/primo_library/libweb/webservices/rest/v1/myaccount/loans').then(function(response) {
		if (response.data.data.loans.hasAlerts == true) {
			var overdueIconPrm = document.createElement("prm-icon");
			overdueIconPrm.setAttribute("icon-type", "svg");
			overdueIconPrm.setAttribute("svg-icon-set", "primo-ui");
			overdueIconPrm.setAttribute("icon-definition", "timer");
			overdueIconPrm.setAttribute("class", "prm-warn");
			overdueIconPrm.setAttribute("style", "display: flex;");
						
			$compile(overdueIconPrm)($scope);
			
			var attachPoint = document.querySelector('#accountoverview md-tab-item.md-tab:nth-child(2) > div:nth-child(1)');
			attachPoint.appendChild(overdueIconPrm);
		}
	});
	
	// show the fines warning icon
	$http.get('/primo_library/libweb/webservices/rest/v1/myaccount/fines').then(function(response) {
		try { var finesLength = response.data.data.fines.fine.length; } catch (e) {}
		if (finesLength > 0) {
			var overviewFinesWarn = document.createElement("md-icon");
			overviewFinesWarn.setAttribute("icon-type", "svg");
			overviewFinesWarn.setAttribute("md-svg-src", "/primo-explore/custom/CENTRAL_PACKAGE/img/fines_warn.svg");
			overviewFinesWarn.setAttribute("id", "overview_cust_fines_warn");
			
			$compile(overviewFinesWarn)($scope);
			
			// var aP = document.querySelector('md-pagination-wrapper > md-tab-item:nth-child(4) > div');
			var aP = angular.element(document.querySelector('md-pagination-wrapper > md-tab-item:nth-child(4) > div'));
			aP.append(overviewFinesWarn);
		}
		
		//add back to search link
		try {
			var mostRecentSearch = $scope.$parent.$ctrl.primolyticsService.searchService.searchHistoryService.items[0].deepLink;
		} catch (e) {
			var mostRecentSearch = "/primo-explore/";
		}
		
		var backButton = document.createElement('a');
		backButton.setAttribute("id", "back_button");
		backButton.setAttribute("href", mostRecentSearch);
		// backButton.setAttribute("style", "text-decoration:none");
		var backButtonLinkText = document.createTextNode("Back to search");
		
		var backButtonIcon = document.createElement("prm-icon");
		backButtonIcon.setAttribute("aria-label", "Go Back To Search");
		backButtonIcon.setAttribute("icon-type", "svg");
		backButtonIcon.setAttribute("svg-icon-set", "primo-ui");
		backButtonIcon.setAttribute("icon-definition", "back-to-search");
		backButtonIcon.setAttribute("id", "back_button");
		
		$compile(backButtonIcon)($scope);
		
		backButton.appendChild(backButtonIcon);
		backButton.appendChild(backButtonLinkText);
		
		// var aP = document.querySelector("prm-account > md-toolbar > div");
		var aP = angular.element(document.querySelector("prm-account > md-toolbar > div"));
		aP.append(backButton);
	});
}]);

app.component('prmAccountOverviewAfter', {
	bindings: {
		parentCtrl: '<'
	},
	controller: 'prmAccountOverviewAfterController'
});


/*search-box fix when typing terms fast*/
app.controller('prmSearchBarAfterController', function($scope) {
	var searchForm = document.getElementsByName("search-form")[0];

	var attHide = document.createAttribute("onsubmit");
	attHide.value = "document.getElementById('prm-simple-search').style.display = 'none' & document.activeElement.blur()";
	searchForm.setAttributeNode(attHide);
	
	var attShow = document.createAttribute("oninput");
	attShow.value = "document.getElementById('prm-simple-search').style.display = 'block';";
	searchForm.setAttributeNode(attShow);
	
	//remove the advanced search stuff when going back to simple search
	setTimeout(function(){
		var backToSimple = document.querySelector('.search-switch-buttons.hide-xs.layout-sm-column.layout-align-sm-start-stretch.facet-to-left-advanced-search');
		backToSimple.setAttribute("onclick", 'var curUrl=window.location.href;if(window.location.href.indexOf("&mode=advanced")>0){var s1=curUrl.indexOf(",AND");var e1=curUrl.lastIndexOf(",AND")+4;if(s1>0){var startStr=curUrl.slice(0,s1);var endStr=curUrl.slice(e1,curUrl.length);var newUrl=startStr+endStr;newUrl=newUrl.replace("&mode=advanced","");window.history.pushState(document.location.href,"",newUrl);}}');
	}, 2000);
	
	//always show scopes
	$scope.$parent.$ctrl.showTabsAndScopes = true;
});

app.component('prmSearchBarAfter', {
	bindings: {
		parentCtrl: '<'
	},
	controller: 'prmSearchBarAfterController'
});

/* Hide onscreen kb when searching in ejournal a-z */
app.controller('prmAtozSearchBarAfterController', function() {
	// hide keyboard on submit
	var searchForm = document.getElementsByName("search-form")[0];
	var attHide = document.createAttribute("onsubmit");
	attHide.value = "document.activeElement.blur();";
	searchForm.setAttributeNode(attHide);
});

app.component('prmAtozSearchBarAfter', {
	bindings: {
		parentCtrl: '<'
	},
	controller: 'prmAtozSearchBarAfterController'
});

// change advanced search to jump to results and hide onscreen kb
app.controller('prmAdvancedSearchAfterController', function() {
//watch to see if advanced search is there
	var advancedSearchObs = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (!mutation.addedNodes) return
			for (var i = 0; i < mutation.addedNodes.length; i++) {
				var node = mutation.addedNodes[i];
				if (node.nodeName == "BUTTON" && document.querySelector("prm-advanced-search")) {
					//need an id to jump to
					let submitArea = document.querySelector(".advanced-search-output.layout-row.flex");
					submitArea.setAttribute("id", "advancedSearchSubmitArea");
					
					var submitBtn = document.querySelector("prm-advanced-search .button-confirm.button-large.button-with-icon.md-button.md-primoExplore-theme.md-ink-ripple");
					submitBtn.addEventListener("click", function(){
						// hide the mobile keyboard
						document.activeElement.blur();
						// wait for some results
						var advancedSearchObs2 = new MutationObserver(function(mutations2) {
							mutations2.forEach(function(mutation2) {
								if (!mutation2.addedNodes) return
								for (var i = 0; i < mutation2.addedNodes.length; i++) {
									var node = mutation2.addedNodes[i];
									if (node.nodeName == "PRM-SEARCH-RESULT-SORT-BY" && window.innerHeight < 775) {
										window.location.hash='advancedSearchSubmitArea';
										advancedSearchObs2.disconnect();
									}
								}
							});
						});
							
						advancedSearchObs2.observe(document.body, {
							childList: true
							, subtree: true
							, attributes: false
							, characterData: false
						})
						//end wait for some results
					});
					advancedSearchObs.disconnect();
				}
			}
		})
	})
	
	advancedSearchObs.observe(document.body, {
		childList: true
		, subtree: true
		, attributes: false
		, characterData: false
	})
});

app.component('prmAdvancedSearchAfter', {
	bindings: {
		parentCtrl: '<'
	},
	controller: 'prmAdvancedSearchAfterController'
});

/*create new sort by dropdown*/
app.controller('prmSearchResultListAfterController', ['$scope', '$compile', function($scope, $compile) {
	//hide the sort option under certain circumstances
	var showSort = true;
	if (window.location.href.indexOf("primo-explore/favorites?") > 1) { showSort = false; } 
	if (window.location.href.indexOf('primo-explore/jsearch?') > 1 && window.location.href.indexOf('&journals=letter,') > 1) { showSort = false; }
	if (showSort == true) {
		var sortBy = document.createElement('prm-search-result-sort-by');
		$compile(sortBy)($scope);
		
		var sortByTitle = document.createElement('h3');
		var sortByWrapper = document.createElement('div');
		
		sortByTitle.setAttribute("class", "section-title-header");
		sortByTitle.setAttribute("id", "sort_by_dropdown_header");
		sortByTitle.textContent = "Sort by";
		
		sortByWrapper.setAttribute("layout", "row");
		sortByWrapper.setAttribute("id", "sort_by_dropdown_wrapper");
		sortByWrapper.setAttribute("layout-align", "start center");
		sortByWrapper.setAttribute("class", "section-title layout-align-start-center layout-row");
		
		sortByWrapper.appendChild(sortBy);
		sortByWrapper.appendChild(sortByTitle);

		var rRec = document.getElementById('mainResults');
		rRec.parentNode.insertBefore(sortByWrapper, rRec.parentNode.firstChild);
		
		//watch to see if controlled vocab bar/did u mean/no search result is added and, if it is, add a new class to the dropdown/hide sort box
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (!mutation.addedNodes) return
				for (var i = 0; i < mutation.addedNodes.length; i++) {
					var node = mutation.addedNodes[i];
					if (node.nodeName == "PRM-CONTROLLED-VOCABULARY" || node.nodeName == "PRM-DID-U-MEAN") {
						// stop watching
						observer.disconnect();
						document.getElementById("sort_by_dropdown_wrapper").setAttribute("class", "controlled_vocab_present");
					}
					if (node.nodeName == "PRM-NO-SEARCH-RESULT") {
						// stop watching
						observer.disconnect();
						document.getElementById("sort_by_dropdown_wrapper").setAttribute("class", "no_results");
					}
				}
			})
		})

		observer.observe(document.body, {
			childList: true
			, subtree: true
			, attributes: false
			, characterData: false
		})
	}
}]);


app.component('prmSearchResultListAfter', {
	bindings: {
		parentCtrl: '<'
	},
	controller: 'prmSearchResultListAfterController'
});


/*direct linking november*/
app.controller('prmBriefResultAfterController', ['$http', '$element', '$scope', '$compile', function($http, $element, $scope, $compile) {
    var ctrl = this;

    ctrl.$onInit = function() {
		ctrl.$element = $element;
    };

    ctrl.$postLink = function() {
		ctrl.createDirectLink();
    };

    ctrl.createDirectLink = function() {
		var parentElement = ctrl.$element.parent();
		var container = angular.element(parentElement.children()[0]);
		
		//Alma-E stuff needs a direct link if it's nor frbr
		if (($scope.$parent.$ctrl.item.pnx.delivery.delcategory[0] != 'Alma-P' && $scope.$parent.$ctrl.resourceTypeForDisplay != 'mediatype.multiplever')) {
			
			//change journal to e-journal
			if ($scope.$parent.$ctrl.item.pnx.display.type[0] == "journal") {
				var mediaType = parentElement.parent().parent().children()[1].firstElementChild;
				mediaType.textContent = "e-Journal";
			}
			
			if ($scope.$parent.$ctrl.item['@id'].indexOf("hathi_trust") > -1 && window.location.href.indexOf('/primo-explore/favorites?') == -1) {
				setTimeout(function(){
					var hathiTitle = $scope.$parent.$parent.$ctrl.$element[0].children[0].children[3].children[0].children[1].children[0].children[0];
					hathiTitle.setAttribute("style", "display: inline-block;");
					hathiTitle.children[1].textContent = "Multiple volumes exist";
				}, 500);
			}
			
			function directLinks() {
				if (typeof($scope.$parent.$ctrl.item.delivery) != "undefined") {
					let title_dl = angular.element(container);
					var url = $scope.$parent.$ctrl.item.delivery.GetIt1[0].links[0].link;
					if ($scope.$parent.$ctrl.item.delivery.GetIt1[0].links[0].link.indexOf('sandbox01-ap.alma.exlibrisgroup.com') >= 0) {
						url = url.replace('sandbox01-ap.alma.exlibrisgroup.com', 'ap01.alma.exlibrisgroup.com');
					}
					var uoTitle = $scope.$parent.$ctrl.item.pnx.display.title[0];
					uoTitle = uoTitle.replace(',', '%2C');
					uoTitle = uoTitle.replace('\'', '%27');
					
					var dlUrl = 'http://ezproxy.otago.ac.nz/login?url=http://www.otago.ac.nz/library/primo/testing/viewresource.php?resource=' + escape(url) + '&uoTitle=' + uoTitle;

					title_dl[0].setAttribute("ng-click", "$event.stopPropagation()");

					$compile(title_dl)($scope.$parent);
					
					if (($scope.$parent.$ctrl.item.delivery.GetIt1[0].links[0].link.indexOf('ap01.alma.exlibrisgroup.com') >= 0) || ($scope.$parent.$ctrl.item.delivery.GetIt1[0].links[0].link.indexOf('sandbox01-ap.alma.exlibrisgroup.com') >= 0)) {
						$scope.$parent.$ctrl.deepLink = dlUrl;
						title_dl[0].setAttribute("onclick", "window.open('"+dlUrl+"', '_blank')");
						title_dl[0].href = "";
					} else {
						$scope.$parent.$ctrl.deepLink = url;
						title_dl[0].setAttribute("onclick", "window.open('"+url+"', '_blank')");
					}
					
					if (window.location.href.indexOf("primo-explore/fulldisplay?") == -1) {
						// create "View Details"
						var viewDetails_div = document.createElement('div');
						viewDetails_div.setAttribute("id", "view_dtls_div");
								
						var viewDetails_btn = document.createElement('button');
						viewDetails_btn.setAttribute("id", "view_deets");
						viewDetails_btn.setAttribute("class", "neutralized-button arrow-link-button md-button md-primoExplore-theme md-ink-ripple");
						viewDetails_btn.setAttribute("type", "button");
						viewDetails_btn.setAttribute("prm-brief-internal-button-marker", "");
						// viewDetails_btn.setAttribute("ng-click", "$ctrl.handleAvailability($index, 'expand');$event.preventDefault()");
						viewDetails_btn.setAttribute("title", "View details");
						viewDetails_btn.setAttribute("aria-label", "View online button");

						var viewDetails_content = document.createElement('span');
						viewDetails_content.setAttribute("class", "button-content");
						viewDetails_content.textContent = "View details";
								
						var chevIcon_prm = document.createElement('prm-icon');
						chevIcon_prm.setAttribute("link-arrow", "");
						chevIcon_prm.setAttribute("aicon-type", "svg");
						chevIcon_prm.setAttribute("svg-icon-set", "primo-ui");
						chevIcon_prm.setAttribute("icon-definition", "chevron-right");
								
						viewDetails_btn.appendChild(viewDetails_content);
						viewDetails_btn.appendChild(chevIcon_prm);
						viewDetails_div.appendChild(viewDetails_btn);
						
						$compile(viewDetails_div)($scope.$parent);
						
						$scope.$parent.$parent.$ctrl.$element[0].children[0].lastChild.appendChild(viewDetails_div);
						var arrResultItem = document.getElementsByClassName("list-item-primary-content result-item-primary-content layout-row");
						var arrResultItemBG = document.getElementsByClassName("list-item-wrapper");
						for (var i = 0; i < arrResultItem.length; i++) {
							arrResultItem[i].style.visibility = "visible";
							arrResultItemBG[i].style.borderBottomStyle = "solid";
						}
					}
				} else {
					var arrResultItem = document.getElementsByClassName("list-item-primary-content result-item-primary-content layout-row");
					var arrResultItemBG = document.getElementsByClassName("list-item-wrapper");
					if (arrResultItem[0].style.visibility != "hidden") {
						for (var i = 0; i < arrResultItem.length; i++) {
							arrResultItem[i].style.visibility = "hidden";
							arrResultItemBG[i].style.borderBottomStyle = "none";
						}
					}
					window.setTimeout(directLinks, 100);
				}
			}
			directLinks();
		}
    };
}]);

app.component('prmBriefResultAfter', {
	bindings: {
		parentCtrl: '<'
	},
	controller: 'prmBriefResultAfterController'
});

/*prmSearchResultAvailabilityLineAfter*/
app.controller('prmSearchResultAvailabilityLineAfterController', ['$element', '$scope', '$compile', '$http', function($element, $scope, $compile, $http) {
    var ctrl = this;

    ctrl.$onInit = function() {
		ctrl.$element = $element;
    };

    ctrl.$postLink = function() {
		ctrl.createDirectLink();
    };

    ctrl.createDirectLink = function() {
		let parentElement = ctrl.$element.parent();
		var delCat = "";
		if (typeof($scope.$parent.$ctrl.delCategories[0]) != "undefined") {
			delCat = $scope.$parent.$ctrl.delCategories[0];
		}
		try {
			delCat = $scope.$parent.$ctrl.delCategories()[0];
		} catch (e) {} //Nov release uses a function
		
		if (delCat != "Alma-P") {
			$scope.$parent.$ctrl.$element[0].setAttribute("style", "display:none;");
		}
		
		if (delCat == "Alma-P") {
			function cenFloorInfo() {
				if (typeof($scope.$parent.$ctrl.libraryCode) != "undefined") {
					var cenFloor = "";
					
					var objCenFloor = document.createElement("span");
					objCenFloor.setAttribute("class", "cenFloor");
					objCenFloor.textContent = cenFloor;
					var target = $scope.$parent.$ctrl.$element[0].children[0].children[0].children[1].firstChild.firstChild;
					target.insertBefore(objCenFloor, target.children[1].nextSibling);
					target.children[2].style.display = "none";
						
					var i = 0;
					
					function cenBooksFloorLoop() {
						window.setTimeout(function(){
							i++;
							if ($scope.$parent.$ctrl.libraryCode == "Central Library" && ($scope.$parent.$ctrl.subLocation == "Main" || $scope.$parent.$ctrl.subLocation == "Books")) {
								var callNum = $scope.$parent.$ctrl.callNumber;
								cenFloor = "";
								if (callNum.charAt(0).match(/[A-K]/gi)) {
									cenFloor = "[Floor 1]";
								}
								if (callNum.charAt(0).match(/[M-Z]/gi)) {
									cenFloor = "[Floor 2]";
								}

								if (cenFloor != "") {
									target.children[2].style.display = "inline";
									target.children[2].textContent = cenFloor;
									// sometimes the call number is removed, so add it back in
									if (target.children.length == "3") {
										target.children[2].textContent = target.children[2].textContent + " " + callNum;
									}
								} else {
									target.children[2].style.display = "none";
									target.children[2].textContent = cenFloor;
									// sometimes the call number is removed, so add it back in
									if (target.children.length == "3") {
										target.children[2].textContent = target.children[2].textContent + " " + callNum;
									}
								}
							}
							
							if (i < 20) {
								cenBooksFloorLoop();
							}
						}, 500);
					}
					cenBooksFloorLoop();
				} else {
					window.setTimeout(cenFloorInfo, 100);
				}
			}
			cenFloorInfo();
		}
	};
}]);

app.component('prmSearchResultAvailabilityLineAfter', {
	bindings: {
		parentCtrl: '<'
	},
	controller: 'prmSearchResultAvailabilityLineAfterController'
});


/** reorder full record view **/
angular.module('viewCustom').component('prmFullViewAfter', {
        bindings: {
        	parentCtrl: '<',
        },
        controller: ['$http', '$compile', '$scope', function($http, $compile, $scope) {
        	var ctrl = this;
		document.getElementsByTagName("html")[0].style.overflowY = "auto";
	//remove "sign in for request options" for non-physical items & redirect openurl entries
		var fullViewObs = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (!mutation.addedNodes) return
				for (var i = 0; i < mutation.addedNodes.length; i++) {
					var node = mutation.addedNodes[i];
					if (node.nodeName == "PRM-FULL-VIEW-SERVICE-CONTAINER") {
						console.log("prm-full-view-service-container");
						if (ctrl.parentCtrl.item.delivery.GetIt1[0].category != "Alma-P") {
							e_linking_mod();
						} else {
							p_linking_mod();
						}
						fullViewObs.disconnect();
					}
				}
			});
		});
			
		fullViewObs.observe(document.getElementsByTagName("prm-full-view")[0], {
			childList: true
			, subtree: true
			, attributes: false
			, characterData: false
		})
		
			//wait for the record to load then remove the element and send openurl links away
		//	Primo.records.then(function () {
		function e_linking_mod() {
			if (ctrl.parentCtrl.$document[0].URL.indexOf("primo-explore/openurl?") > 0) {
				//it's an openurl
				var urlStart = "http://ezproxy.otago.ac.nz/login?url=http://www.otago.ac.nz/library/primo/testing/viewresource.php?resource=";
				if (window.location.href.indexOf('ezproxy.otago.ac.nz') >= 0) { //if users are already auth'ed against ezproxy
					urlStart = 'www.otago.ac.nz.ezproxy.otago.ac.nz/library/primo/viewresource.php?resource=';
				} else if (window.location.href.indexOf('ereserve.otago.ac.nz') >= 0) { //if users are already auth'ed against ereserve ezproxy
					urlStart = 'www.otago.ac.nz.ereserve.otago.ac.nz/library/primo/viewresource.php?resource=';  
				} else if (window.location.href.indexOf('alproxy.otago.ac.nz') >= 0) { //if users are already auth'ed against test ezproxy
					urlStart = 'www.otago.ac.nz.alproxy.otago.ac.nz/library/primo/viewresource.php?resource=';
				}
				
				var urlOut = urlStart + escape(ctrl.parentCtrl.item.delivery.GetIt1[0].links[0].link) + "&uoTitle=" + ctrl.parentCtrl.item.pnx.display.title[0] + "&openUrl=true";
				urlOut = urlOut.replace(',', '%2C');
				urlOut = urlOut.replace('\'', '%27');
				urlOut = urlOut.replace('sandbox01-ap.alma.exlibrisgroup.com', 'ap01.alma.exlibrisgroup.com');
				var outWarning_div = document.createElement('div');
				outWarning_div.setAttribute("id", "outWarning_div");
				outWarning_div.textContent = "Redirecting to resource";
				var loading_gif = document.createElement("div");
				loading_gif.setAttribute("id", "loading_img");
				let attachPoint = document.getElementsByClassName("section-body")[0];
				//attachPoint.insertAdjacentElement("afterBegin", loading_gif);
				outWarning_div.appendChild(loading_gif);
				attachPoint.insertAdjacentElement("afterBegin", outWarning_div);
				
				//remove existing elements
				document.getElementsByTagName("prm-brief-result-container")[0].style.display = "none";
				document.getElementsByTagName("prm-full-view-service-container")[1].style.display = "none";
				document.getElementsByTagName("prm-full-view-service-container")[4].style.display = "none";
				document.getElementById("services-index").style.display = "none";
				//send to resource
				window.location = urlOut;
			}
			document.querySelector('#getit_link1_0 > div > prm-full-view-service-container > div.section-body > div > prm-login-alma-mashup').style.display = 'none';
			var t = document.querySelector('#brief > prm-full-view-service-container > div.section-body > prm-brief-result-container > div.list-item-primary-content.result-item-primary-content.layout-row > div.result-item-text.layout-fill.layout-column.flex > prm-brief-result > h3 > a > span > prm-highlight > span');
			t.style.setProperty("color", "#416ebf", "important");
			t.style.setProperty("cursor", "inherit");
			var t2 = document.querySelector('prm-brief-result .item-title .full-view-mouse-pointer');
			t2.style.setProperty("cursor", "inherit");
		};

		function p_linking_mod() {
			var t = document.querySelector('#brief > prm-full-view-service-container > div.section-body > prm-brief-result-container > div.list-item-primary-content.result-item-primary-content.layout-row > div.result-item-text.layout-fill.layout-column.flex > prm-brief-result > h3 > a > span > prm-highlight > span');
			t.style.setProperty("color", "#6d6d6d", "important");
			t.style.setProperty("cursor", "default");
		};
			
			
		//check if user is expired - show warning if they are
		if (document.getElementById("user_name").innerText.length) {
			$http.get('/primo_library/libweb/webservices/rest/v1/myaccount/personal_settings').then(function(result) {
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();
				if(dd<10) {dd = '0'+dd} 
				if(mm<10) {mm = '0'+mm} 
				today = "" + yyyy + mm + dd;
				
				var expiry = parseInt(result.data.data.patronstatus[0].registration[0].institution[0].patronexpirydate);
				today = parseInt(today);
				
				//compare today vs expiry
				if (today > expiry) {
					console.log("user is expired");
					var expiredWarning = document.createElement("div");
					expiredWarning.setAttribute("id", "expired_user_warning");
					expiredWarning.textContent = "Your library account has expired and request options are disabled. For further information contact:";
					
					var mailTo = document.createElement("a");
					mailTo.setAttribute("id", "expired_mailto");
					mailTo.setAttribute("href", "mailto:ask.library@otago.ac.nz");
					mailTo.textContent = "ask.library@otago.ac.nz";
					
					expiredWarning.appendChild(mailTo);
					document.getElementsByTagName("prm-full-view-service-container")[0].appendChild(expiredWarning);
				}
			});
		}
           	
        }]
});

//angular.module('viewCustom').service('sectionOrdering', function() {
  /**
   *  See: https://github.com/muratseyhan/primo-explore-section-ordering
   *  Reorder the sections in the full view.
   *  @param {Array} sections - An array of section objects.  
   *  @throws {Error} If the fullview sections cannot be found.  
   */
	/*this.orderSections = function(sections) {
		if (!sections || !sections.length || !(sections.length > 0)) {
			throw new Error('Section Ordering: Full view sections could not be found.');
		}
		moveToBottomIfExists('details', sections);
		moveToBottomIfExists('action_list', sections);
		moveToBottomIfExists('citationTrails', sections);
		moveToBottomIfExists('links', sections);
	};

	function moveToBottomIfExists(sectionId, sections) {
		let section = sections.find(function(s) {
			return s.scrollId === sectionId;
		});
		if (section) {
			moveToBottom(section, sections);
		}
	}

	function moveToBottom(section, sections) {
		// Remove the section.
		sections.splice(sections.indexOf(section), 1);
		// Append the section to the end.
		sections.splice(sections.length, 0, section);
	}

});*/

/** change sign-in **/
//currently only on dev, due to signing in not working (incorrect URLs?)

/*modify virtual browse*/
app.component('prmVirtualBrowseItemAfter', {
	bindings: {
		parentCtrl: '<'
	},
	template: '<span>{{$parent.$ctrl.virtualBrowseItem.callNumber}}</span>'
});

/** add fines payment button (overview) **/
app.controller('prmFinesOverviewAfterController', ['$element', '$scope', '$http', function($element, $scope, $http) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.$element = $element;
	};

	ctrl.$postLink = function() {
		ctrl.insertPayNowBtn();
	};

	ctrl.insertPayNowBtn = function() {
		let parentElement = ctrl.$element.parent();
		let container = angular.element(parentElement.children()[0].children[0]);
		try { document.getElementById("pay_fines_btn_overview").style.display = 'none'; } catch (e) { console.log(e); }
		angular.element(container[0].children[0].children[0]).append(ctrl.$element.children()[0]);

		$http.get('/primo_library/libweb/webservices/rest/v1/myaccount/fines').then(function(user) {
			if (user.data.data.fines.fine.length > 0) {
				try { document.getElementById("pay_fines_btn_overview").style.display = 'block'; } catch (e) { console.log(e); }
				$scope.payFines = function () {
					//open window now to avoid pop-up blockers
					window.open('', 'pay_fines_window');
					var uid = $scope.$root.$$childHead.$ctrl.userSessionManagerService.jwtUtilService.getDecodedToken().user;
					var fobj = document.getElementById('pay_fines_uname_overview');
					fobj.userId.value = uid;
					fobj.submit();
				};
			} else {
				document.getElementById('pay_fines_btn_overview').disabled = true;
			}
		});
	};
}]);

app.component('prmFinesOverviewAfter', {
	bindings: {
		parentCtrl: '<'
	},
	controller: 'prmFinesOverviewAfterController',
	templateUrl: 'custom/CENTRAL_PACKAGE/html/prmFinesOverviewAfter.html',
});



app.controller('prmFinesAfterController', ['$element', '$scope', "$compile", "$http", function($element, $scope, $compile, $http) {
    var ctrl = this;

    ctrl.$onInit = function() {
		ctrl.$element = $element;
    };

    ctrl.$postLink = function() {
		ctrl.insertPayNowBtn();
    };

    ctrl.insertPayNowBtn = function() {
		let parentElement = ctrl.$element.parent();
		let container = angular.element(parentElement.children()[0].children[0]);
		try {
			document.getElementById("pay_fines_btn_main").style.visibility = 'hidden';
		} catch (e) {
			console.log(e);
		}
		
		angular.element(container[0].children[0]).append(ctrl.$element.children()[0]);


		$http.get('/primo_library/libweb/webservices/rest/v1/myaccount/fines').then(function(user) {
			if (user.data.data.fines.fine.length > 0) {
				try {
					document.getElementById("pay_fines_btn_main").style.visibility = 'visible';
				} catch (e) {
					console.log(e);
				}
				$scope.payFines = function () {
					//open window now to avoid pop-up blockers
					window.open('', 'pay_fines_window');
					//after username returned, set the hidden element in the "open fines page" form
					var fobj = document.getElementById('pay_fines_uname_overview');
					var uid = $scope.$parent.$parent.$parent.$parent.$parent.$ctrl.skipToService.userSessionManagerService.areaName;
					fobj.userId.value = uid;
					fobj.submit();
				};
			} else {
				document.getElementById('pay_fines_btn_main').disabled = true;
			}
		});
		
		//also add in fines info link
		var createDiv = document.createElement("div");
		var createA = document.createElement("a");
		var createLinkText = document.createTextNode("Fine rates");
		var createPrmIconOut = document.createElement("prm-icon");
		
		createDiv.setAttribute("class", "fine_rates_div");
		
		createA.setAttribute("href", "http://www.otago.ac.nz/library/quicklinks/borrowing/index.html#rates");
		createA.setAttribute("aria-label", "Fine rates");
		createA.setAttribute("target", "_blank");
		
		//createPrmIconOut.setAttribute("ng-if", "");
		createPrmIconOut.setAttribute("class", "cust_prm_out");
		createPrmIconOut.setAttribute("icon-type", "svg");
		createPrmIconOut.setAttribute("svg-icon-set", "primo-ui");
		createPrmIconOut.setAttribute("icon-definition", "open-in-new");
		
		$compile(createPrmIconOut)($scope);
		
		createA.appendChild(createLinkText);
		createA.appendChild(createPrmIconOut);
		
		createDiv.appendChild(createA);

		angular.element(parentElement[0].parentNode).append(createDiv);
    };
}]);

app.component('prmFinesAfter', {
	bindings: {
		parentCtrl: '<'
	},
	controller: 'prmFinesAfterController',
	templateUrl: 'custom/CENTRAL_PACKAGE/html/prmFinesAfter.html',
});


/** Add Google analytics **/
app.run(function($rootScope, $window) {
	$window.ga('create', 'UA-36296579-1', 'auto');
	$window.ga('create', 'UA-9031494-1', 'auto', {'name': 'b'});
	$rootScope.$on('$locationChangeSuccess', function(event) {
		var urlPath = window.location.pathname + window.location.search;
		$window.ga('send', 'pageview', {location: urlPath});
		$window.ga('b.send', 'pageview', {location: urlPath});
	});
});

/** Add Google Translate **/
app.run(function ($rootScope, $window) {
	var gtDiv = document.createElement("div");	 
	gtDiv.setAttribute("id", "google_translate_element");
 	document.body.appendChild(gtDiv);
	var gtSrc = document.createElement("script");
	gtSrc.setAttribute("type", "text/javascript");
	gtSrc.setAttribute("src", "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
	document.body.appendChild(gtSrc);
	
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en', gaTrack: true, gaId: 'UA-36296579-1'}, 'google_translate_element');
}

});



/* rest of GA */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');


//end angular stuff
})();



//remove " - " from the start of the pre-search title
(function(){
	var target = document.querySelector('head > title');
	var observer = new window.MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (document.title.length == 52) {
				document.title = document.title.substr(2, 52);
			}
		});
	});
	observer.observe(target, { subtree: false, characterData: true, childList: true });
})();

/********LIBCHAT********/

//LibChat Bottom
var springSpace = springSpace || {};

(function(){
    if (!window.console) {
        var noOp = function(){};
        console = { log: noOp, warn: noOp, error: noOp };
    }
    var chat_div, chat_load, chat_timer, chat_self_triggered, chat_button, qs;
    var libchat_options = {"id":"8459","iid":"1527","hash":"41d30d36453a14b0994775506885495b","name":"Primo LibChat Bottom - DUNEDIN","key":"ca23340fd189c54","queue_id":0,"chat_title":"Welcome to LibChat!","byeMsg":"Thanks for chatting!","dept_label":"Select Department:","name_label":"Name (blank=anonymous)","name_default":"","guest_label":"Guest","contact_label":"Contact Info","width":"360px","height":"340","chat_button":"Start Chat","press_enter":"Press ENTER to send","submit_button":"Submit","email_trans":"View\/Email Transcript","offline_text":"Ask Us","offline_url":"","slidebutton_url":"https:\/\/www.otago.ac.nz\/library\/primo\/images\/chat-bubble-icon-yellow-two_2.svg","slidebutton_url_off":"","slidebutton_text":"LibChat","slidebutton_text_off":"Offline","slidebutton_position":"b","slidebutton_bcolor":"#FFFFFF","slidebutton_color":"#333333","slidebutton_bcolor_off":"","slidebutton_color_off":"","slidebutton_width":"","slidebutton_height":"","la_hide":false,"la_hide_msg":"Sorry, chat is offline but you can still get help.","la_hide_msg2":"<a href=\"https:\/\/otago.libanswers.com\" target=\"_parent\">Search our Knowledgebase and\/or submit your question<\/a>","la_search_opt":{"group_id":0,"button":"Search","placeholder":"","label":""},"la_search_box":"<div id=\"s-la-content-search-8459\" class=\"s-la-content-search s-la-content\"><form method=\"get\" name=\"s-la-searchform\" id=\"s-la-searchform-8459\" action=\"\" onsubmit=\"return false;\" target=\"_parent\" role=\"search\" aria-labelledby=\"s-la-content-search-query-8459\"><div class=\"form-group\"><label for=\"s-la-content-search-query-8459\" class=\"s-la-searchform-label control-label\"><\/label><input type=text id=s-la-content-search-query-0 class=\"s-la-content-search-query form-control\" name=\"q\" placeholder=\"\" value=\"\" autocomplete=off \/><\/div><div class=\"form-group\"><button class=\"btn btn-sm btn-default s-la-searchform-button\" type=\"submit\" style=\"background-color: #286090; border-color: #286090; color: #FFFFFF;\">Search<\/button><\/div><\/form><\/div>","sound_on":"Sound is On (click to toggle)","sound_off":"Sound is Off (click to toggle)","star_text":"Please rate this chat:","rate_1":"Bad","rate_2":"So-so","rate_3":"Good","rate_4":"Great","trans":"Enter an email address to send this chat transcript to:","error_sess":"Error starting session.","error_send":"Error sending this message.","left":" has left the chat","typing":" is typing...","joined":" has joined the chat","initial_question":false,"initial_question_label":"Your Question","comments_label":"Any comments?","comments_button_text":"Submit Feedback","comments_followup":"I would like to be contacted for a follow-up.","enable_anon":true,"enable_sound":false,"star_ratings":true,"file_uploads":true,"file_title":"Upload File","file_intro":"Note: Maximum file size is 5MB. File is removed after one month, it is not kept permanently.","file_label":"Attach a file","file_action":"Upload","cancel_button":"Cancel","custom_css":"","color_backg":"#f9f9f9","color_head":"#286090","color_btn":"#FFFFFF","color_border":"","user1":{"name":"","id":0,"show":0,"required":0,"type":"t","val":""},"user2":{"name":"","id":0,"show":0,"required":0,"type":"t","val":""},"user3":{"name":"","id":0,"show":0,"required":0,"type":"t","val":""},"error_off":"Sorry it doesn't appear any librarians are online... Please try again later.","wait":"Please wait... A librarian will connect shortly!","depart_id":[{"u":0,"d":[2653]}],"widget_type":3,"skip_login":false,"nologin_message":"Type your question in the box below and press Enter to start chatting.","autoload_time":0,"autoload_head":"Do you need help?","autoload_text":"A librarian is online ready to help.","autoload_yes":"Chat Now","autoload_no":"No Thanks","missedchat_time":30,"missedchat_message":"We apologize for the delay. Don't want to wait?","missedchat_link":"Submit your question.","error_message":"Sorry, it looks like you're having a connection issue. Would you like to submit your question for email follow-up?","error_link":"Submit your question.","away_message":"Chat is online but the operator is temporarily away. If you don't want to wait, you can submit your question for email follow-up.","away_link":"Submit your question.","reload_button":"Recheck Status","valid_form_q":"Please enter your question.","valid_form_n":"Please enter your name.","valid_form_c":"Please enter valid contact information.","fbwidget":false,"autopop":false,"contact_request":false,"contact_required":false,"contact_request_msg":"To help us be able to follow up with you, please enter an email address or sms number.","followup_msg":"If you wish to be followed up with via email or phone, submit a message below to create a new support ticket.","cal_offline":false,"cal_autoload":false,"cal_text":"Schedule a Meeting","cal_url":"","defaultProfile":"","uid":29689,"base_domain":"v2.libanswers.com","onlinerules":[{"u":0,"d":[2653]}]};
    var cascadeServer = "https:\/\/cascade2.libchat.com";
    var loaded = false;
    function checkStatus(){JSONP.init({error:function(ex){console.log("Failed to load : "+ex.url),setStatus(!1)}}),JSONP.get(cascadeServer+"/widget_status",{iid:libchat_options.iid,rules:JSON.stringify(libchat_options.onlinerules)},function(data){var online=!1;(data.u||data.d)&&(online=!0),setStatus(online)})}function insertWidgetCSS(){("number"==typeof libchat_options.width||"string"==typeof libchat_options.width&&-1===libchat_options.width.indexOf("%"))&&(libchat_options.width=parseInt(libchat_options.width,10)+"px"),-1!==libchat_options.width.indexOf("%")&&(libchat_options.width=parseInt("400",10)+"px");var offsetwidth=parseInt(libchat_options.width,10)+2+"px";("number"==typeof libchat_options.height||"string"==typeof libchat_options.height&&-1===libchat_options.height.indexOf("%"))&&(libchat_options.height=parseInt(libchat_options.height,10)+"px"),libchat_options.slidebutton_bcolor&&""!==libchat_options.slidebutton_bcolor||(libchat_options.slidebutton_bcolor="transparent");var b_btn_offset="-42px";libchat_options.slidebutton_url&&""!==libchat_options.slidebutton_url&&libchat_options.slidebutton_height&&""!==libchat_options.slidebutton_height&&(b_btn_offset="-"+libchat_options.slidebutton_height+"px");var css="/* LibChat Widget CSS */ .lcs_slide_out { width: "+libchat_options.width+"; height: "+libchat_options.height+"; position: fixed; -webkit-transition-duration: 0.6s; -moz-transition-duration: 0.6s; -o-transition-duration: 0.6s; transition-duration: 0.6s; background-color: rgb(249, 249, 249); border: 1px solid #ccc; z-index: 1000; } .lcs_slide_out header { display: block; } .lcs_slide_out header a { text-align: center; padding: 10px; display: block; position: absolute; border-width: 0; border-style: solid; background-color: "+libchat_options.slidebutton_bcolor+"; } .lcs_load { width: "+libchat_options.width+"; height: 100%; padding: 0 2px 0 0; box-sizing: border-box; } .lcs_slide_out-l { top: 100px; left: -"+offsetwidth+"; } .lcs_slide_out-l.open { left: 0px; } .lcs_slide_out-l header { -webkit-transform: rotate(-90deg); -ms-transform: rotate(-90deg); transform: rotate(-90deg); -webkit-transform-origin: top right; -ms-transform-origin: top right; transform-origin: top right; } .lcs_slide_out-l header a { right: 10px; } .lcs_slide_out-r { top: 100px; right: -"+offsetwidth+"; } .lcs_slide_out-r.open { right: 0px; } .lcs_slide_out-r header { -webkit-transform: rotate(90deg); -ms-transform: rotate(90deg); transform: rotate(90deg);  -webkit-transform-origin: top left; -ms-transform-origin: top left; transform-origin: top left; } .lcs_slide_out-r header a { left: 10px; } .lcs_slide_out-b { right: 100px; bottom: -2px; height: 0; } .lcs_slide_out-b.open { height: "+libchat_options.height+"; } .lcs_slide_out-b header a { left: 10px; bottom: 0px; border-width: 1px 1px 0px 1px; } .lcs_slide_out-b.open header a { top: "+b_btn_offset+"; bottom: auto; } .lcs_slide_out iframe { width: 100%; height: 100%; background-color: "+libchat_options.color_backg+"; border: 0px; box-sizing:border-box; } @media (max-width: 768px) { .lcs_slide_out { width: 80%; } .lcs_load { width: 100% } .lcs_slide_out-l { left: -80%; } .lcs_slide_out-r { right: -80%; } .lcs_slide_out-b { left: 0; } } ",head=document.head||document.getElementsByTagName("head")[0],style=document.createElement("style");style.type="text/css",style.styleSheet?style.styleSheet.cssText=css:style.appendChild(document.createTextNode(css)),head.appendChild(style)}function start(){if(!0!==loaded){loaded=!0,insertWidgetCSS(),chat_div=document.createElement("div"),chat_div.id="lcs_slide_out-"+libchat_options.id,chat_div.className="lcs_slide_out lcs_slide_out-"+libchat_options.slidebutton_position;var chat_header=document.createElement("header");if(chat_button=document.createElement("a"),chat_button.setAttribute("role","button"),chat_button.setAttribute("aria-controls","lcs_slide_out-"+libchat_options.id),chat_button.setAttribute("href","#"),chat_header.appendChild(chat_button),chat_div.appendChild(chat_header),chat_load=document.createElement("div"),chat_load.className="lcs_load",chat_load.setAttribute("aria-hidden","true"),chat_div.appendChild(chat_load),libchat_options.slidebutton_url&&""!==libchat_options.slidebutton_url){var img=document.createElement("img");img.setAttribute("src",libchat_options.slidebutton_url),img.setAttribute("alt",libchat_options.slidebutton_text),chat_button.style.padding="0",chat_button.appendChild(img)}else libchat_options.slidebutton_color||(libchat_options.slidebutton_color="#ffffff"),chat_button.innerHTML=libchat_options.slidebutton_text,chat_button.style.borderColor=libchat_options.slidebutton_color,chat_button.style.color=libchat_options.slidebutton_color,chat_button.style.backgroundColor=libchat_options.slidebutton_bcolor,chat_button.style.boxShadow="rgb(204, 204, 204) 0px 0px 5px","b"==libchat_options.slidebutton_position?chat_button.style.borderWidth="4px 4px 0px 4px":chat_button.style.borderWidth="0px 4px 4px 4px";document.body.appendChild(chat_div),chat_button.addEventListener("click",function(e){e.preventDefault(),window.clearTimeout(chat_timer),-1===chat_div.className.indexOf("open")?(chat_div.className+=" open",checkStatus()):chat_div.className=chat_div.className.replace(/(^|\s)open(\s|$)/,"")}),libchat_options.autoload_time&&parseInt(libchat_options.autoload_time,10)>0&&(chat_timer=window.setTimeout(function(){chat_self_triggered=!0,checkStatus()},1e3*parseInt(libchat_options.autoload_time,10)))}}function setStatus(online){if(null===chat_load.querySelector("iframe"))if(qs="https://"+libchat_options.base_domain+"/chati.php?",qs+="hash="+libchat_options.hash,window.document.title&&(qs+="&referer_title="+encodeURIComponent(window.document.title)),!1!==online||!0!==chat_self_triggered){!0===chat_self_triggered&&(chat_self_triggered=!1,qs+="&auto=true",chat_load.setAttribute("aria-live","polite"),chat_load.setAttribute("aria-hidden","false")),window.addEventListener("message",function(e){var data=e.data;"object"==typeof data&&data.action&&("closeWidget"===data.action?(chat_div.className=chat_div.className.replace(/(^|\s)open(\s|$)/,""),chat_load.removeAttribute("aria-live"),chat_load.setAttribute("aria-hidden","true")):"chatStarted"===data.action||"autopop"===data.action&&-1===chat_div.className.indexOf("open")&&(chat_div.className+=" open"))});var iframe=document.createElement("iframe");iframe.setAttribute("id","iframe_"+libchat_options.hash),iframe.setAttribute("name","iframe_"+libchat_options.hash),iframe.setAttribute("src",qs),iframe.setAttribute("title","Chat Widget"),iframe.setAttribute("frameborder",0),iframe.setAttribute("scrolling","no"),chat_load.appendChild(iframe)}else chat_self_triggered=!1}var JSONP=function(){function load(url,pfnError){var script=document.createElement("script"),done=!1;script.src=url,script.async=!0;var errorHandler=pfnError||config.error;"function"==typeof errorHandler&&(script.onerror=function(ex){errorHandler({url:url,event:ex})}),script.onload=script.onreadystatechange=function(){done||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(done=!0,script.onload=script.onreadystatechange=null,script&&script.parentNode&&script.parentNode.removeChild(script))},head||(head=document.getElementsByTagName("head")[0]),head.appendChild(script)}function encode(str){return encodeURIComponent(str)}function jsonp(url,params,callback,callbackName){var key,query=-1===(url||"").indexOf("?")?"?":"&",uniqueName=(callbackName=callbackName||config.callbackName||"callback")+"_json"+libchat_options.hash;params=params||{};for(key in params)params.hasOwnProperty(key)&&(query+=encode(key)+"="+encode(params[key])+"&");return window[uniqueName]=function(data){callback(data);try{delete window[uniqueName]}catch(e){}window[uniqueName]=null},load(url+query+callbackName+"="+uniqueName),uniqueName}function setDefaults(obj){config=obj}var head,window=this,config={};return{get:jsonp,init:setDefaults}}();"complete"===document.readyState||"interactive"===document.readyState?start():(document.addEventListener("DOMContentLoaded",start,!1),window.addEventListener("load",start,!1));})();

