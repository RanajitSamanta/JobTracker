
/* JavaScript content from js/main.js in folder common */
/* JavaScript content from js/main.js in folder common */
		
(function(){
	
	var app = angular.module('AngularStarterApp', ["uiSlider","ngRoute","pageslide-directive","UserValidation"]);
	
	app.config(['$routeProvider',function( $routeProvider) {
        $routeProvider
        
        .when('/datalatencystat', {
            templateUrl : 'datalatencystat.html',
            	controller  : 'ApplicationController'
        }).when('/dashboard', {
                templateUrl : 'dashboard.html',
                controller  : 'ApplicationController'
            })
            .when('/reportdetail', {
                templateUrl : 'reportdetail.html',
                controller  : 'ApplicationController'
            }) 
            .when('/latencytrendreport', {
                templateUrl : 'latencytrendreport.html',
                controller  : 'ApplicationController'
            })
               .otherwise({ redirectTo: '/dashboard' });
    }]);
	
	app.controller("ApplicationController",function($scope, $route, $sce, $http,$cacheFactory,$location){
		 $scope.checked1 = false;// This will be binded using the ps-open
									// attribute
		 $scope.checked2 = true;
		 $scope.togglebody = function(){
			// alert("in togglebody");
            if( $scope.checked1 == true)
             {
            	 $scope.checked1 = !$scope.checked1;
             }
         };
         $scope.toggle = function(){
             $scope.checked1 = !$scope.checked1;
         };
		var l = WL.Logger.create({pkg:"ApplicationController"});
		var _this = this;
		var currentPageId = 1;
		$scope.appBusyInd = new WL.BusyIndicator('content', {text : "Please wait..."});
		$scope.username = '';
		$scope.npassword = '';
		$scope.country = '';
		$scope.flagval='';
		$scope.tkno = '';
		$scope.status = '';
		$scope.test="Severity";
		$scope.firstSelect="Select Ticket";
		$scope.newnotifticket=[];
		$scope.yearm='';
		$scope.bool='';
		$scope.ticketid='';
		$scope.newpagedata = [];
		$scope.functid=[];
		$scope.areainfo='';
		$scope.flag='';
		this.feeds = [];
		this.solutions = [];
		this.options = [];
		this.currentFeed = {};
		this.auth = '';
		$scope.newfunctionality=[];
		$scope.topfunctionality='';
		$scope.total=0;
		$scope.startTime='';
		$scope.seconds='';
		$scope.deg='';
		$scope.output='';
		$scope.input='';
		$scope.initial="false";
		

	/* Start  For showing Alerts */						
			
		$scope.showSimpleDialog = function(message) {

							title = "Alert!!!";
							jAlert(message, title);

						};
	/* End  For showing Alerts*/
					
						
						/* Start for login function*/
												
												this.authun = function(pageId) {
																										
							WL.Device
									.getNetworkInfo(function(info) {
										$scope.netstatus = '';
										console
												.log("Checking if device is connected to the network");
										// info.isNetworkConnected = 'true';
										if (info.isNetworkConnected == 'false') {

											$('#username').val("");
											$('#npassword').val("");
											$scope
													.showSimpleDialog('No network connection.  Please connect to the network and try again.');

										} else {
											console
													.log("Device is connected to the network");
											if($scope.username=='' || $scope.npassword=='' || $scope.username == null || $scope.npassword == null) {
												$scope.username='';
												$scope.npassword='';
												$scope
														.showSimpleDialog('Invalid Username and Password. Try Again !!');
											}
										else{	
											//$scope.appBusyInd.show();
											var user = $scope.username;
											var pass = $scope.npassword;
											if(user == 'admin' && pass == 'admin'){
												$scope.appBusyInd
												.hide();
												currentPageId = pageId;
												$scope.$apply();
											}
											else{
												$('#username').val("");
												$('#npassword').val("");
												$scope.appBusyInd.hide();
												$scope.showSimpleDialog('Invalid Username and Password. Try Again !!');
											}
											/*var data = '{"id":"'+user+'","password":"'+pass+'"}';

											$http
											.post(
													" http://vodafonenl-gen.mybluemix.net/login",
													data,
													{
														headers : {
															'Content-Type' : 'application/json'
														}
													})
													.success(
															function(data) {

																$scope.greeting = data;
																$scope.country = data.Login.country;

																console
																		.log('Success '
																				+ data);
																if (data == 'Success ! ') {

																	$scope.appBusyInd
																			.hide();
																	currentPageId = pageId;
																	$scope.$apply();
																}

															else{
																	$(
																	'#username')
																	.val(
																			"");
															$(
																	'#npassword')
																	.val(
																			"");
															$scope.appBusyInd
																	.hide();
															$scope
																	.showSimpleDialog('Invalid Username and Password. Try Again !!');
																}
															})
													.error(
															function(data) {
																$scope.appBusyInd
																		.hide();
																$scope
																		.showSimpleDialog('Error '
																				+ "Services are down!!");
															});*/
										}
										}
									});
						};	
			/* End of Login Function*/
		
	/* Start for Sign-Out Function*/
						$scope.latencydata='';
		$scope.logout = function(pageId){
			$scope.toggle();
			navigator.app.exitApp();
			$('#username').val("");
			$('#npassword').val("");
			currentPageId = pageId;
			
		};
	
	/* End for Sign-Out Function*/	
		
		/* Start of Data Latency Status*/
				

												$scope.latencyStatus = function(pageId) {
							$scope.appBusyInd.show();
							$scope.latencydata = [];
							$http
									.get(
											'http://vodafonenl-gen.mybluemix.net/getDataLatency')
									.success(
											function(data1) {
												$scope.appBusyInd.hide();
												console
														.log("printing ---->"
																+ JSON
																		.stringify(data1));
												for (var i = 0; i < data1.length; i++) {
													if (data1[i].Source == null
															|| data1[i].Source == 'undefined') {
													} else {
														$scope.latencydata
																.push(data1[i]);
														
													}
												}

											}).error(function(data1) {
										$scope.appBusyInd.hide();
										console.log('Error ' + data1);
									});

							currentPageId = pageId;
						};
					
																	
		/* End of Data Latency Status*/
						
						/* Start of ETL Job report*/
						$scope.jobarray=['STAGE_ETL', 'CVM', 'CLOSING_ETL_JOB', 'UNIFY', 'BCK_LDM', 'C2P', 'CMC'];
						$scope.datearray=[];
							$scope.etljobreport = function(pageId)
							{$scope.appBusyInd.show();
							$scope.newfunctionality=[];
								$http.get(  
										'http://vodafonenl-gen.mybluemix.net/getETLJobReport').success(
										function(data1) {
											$scope.appBusyInd.hide();
											//$scope.newfunctionality = data1;
											for(var i=0;i<data1.length;i++)
												{	var myDate=new Date((data1[i].Scheduled_Date).trim());
														var m = (myDate.getMonth())< 9?'0'+(myDate.getMonth()+1):(myDate.getMonth()+1);
														var d=  (myDate.getDate())< 10?'0'+(myDate.getDate()):(myDate.getDate());
														var dmy = m + "/" + d + "/" + myDate.getFullYear();
														//alert("complete date is---->"+dmy);
														if($.inArray(dmy,$scope.datearray) == '-1')
														$scope.datearray.push(dmy);
												}
											//$scope.datearray.sort();
											var sorted = $scope.datearray.sort();
											var maxDate = sorted[sorted.length-1];
											//alert($scope.datearray+"---"+maxDate);
											
											for(var j=0;j<$scope.jobarray.length;j++)
												{//alert("printing---" + $scope.jobarray[j]);
												for(var k=0;k<data1.length;k++)
												{	var jobdate = new Date((data1[k].Scheduled_Date).trim());
													var jdmy = ((jobdate.getMonth())< 9?'0'+(jobdate.getMonth()+1):(jobdate.getMonth()+1)) + "/" +( (jobdate.getDate())< 10?'0'+(jobdate.getDate()):(jobdate.getDate()))+"/" +jobdate.getFullYear();
													//alert(jdmy);
													//alert($scope.jobarray[j]+"=="+data1[k].JOB_Name+"===="+jdmy +"=="+ maxDate);
															if($scope.jobarray[j]==((data1[k].JOB_Name).toUpperCase()).trim() && jdmy == maxDate)
																{ //alert($scope.jobarray[j]+"=="+data1[k].JOB_Name+"===="+(data1[k].Scheduled_Date).trim() +"=="+ maxDate);
																$scope.newfunctionality.push(data1[k]);
																//break;
																}
															
														}
												}
											
											currentPageId = pageId;
											$scope.$apply();
											console.log('Success for follow status ' + JSON.stringify(data1) + "--->"+$scope.newfunctionality);

										}).error(function(data1) {
											$scope.appBusyInd.hide();
									console.log('Error ' + data1);
								});
							};
							
							$scope.dateformat = function(data)
							{
								var d=((new Date(data.Scheduled_Date)).toString()).substr(4,7);
								//alert(d);
								return d;
							};
						/* End of ETL Job report */
							WL.App.overrideBackButton(function(){
								//alert(currentPageId);
						        $scope.backBehavior();
						    });
								$scope.backBehavior=function()
								{	//alert(currentPageId);
									if(currentPageId == 2)
										this.changePage(1);
									if(currentPageId == 1)
										navigator.app.exitApp();
								};
							/*Start of ETL Job Report Trend*/
							$scope.scheduledate=[];
							$scope.schduledatedup=[];
							$scope.jnames=[];
							$scope.result=[];
														

													$scope.etltrend = function(pageId) {
							$scope.appBusyInd.show();

							$scope.namedura = [];
							$scope.nadura = [];
							$scope.res = [];
							var colorarray = [ '#00007f', 'brown', 'red', '#00ffa5', '#a500ff' ];
							$http
									.get(
											'http://vodafonenl-gen.mybluemix.net/getETLJobReport/1')
									.success(
											function(data1) {
												$scope.appBusyInd.hide();
												$scope.jobtrend = data1;
												var j = 0;
												for (var i = 0; i < data1.JobDetails.length; i++) { // alert(data1.JobDetails[i]);
													if (data1.JobDetails[i] == null
															|| data1.JobDetails[i] == undefined) {
													} else {
														var n = (new Date(
																data1.JobDetails[i].Scheduled_Date))
																.toString();
														var d = n.substr(4, 7);
														 //alert(d+"->"+$scope.scheduledate);
														 var trendate = new Date((data1.JobDetails[i].Scheduled_Date).trim());
														 var trendy = ((trendate.getMonth())< 9?'0'+(trendate.getMonth()+1):(trendate.getMonth()+1)) + "/" +( (trendate.getDate())< 10?'0'+(trendate.getDate()):(trendate.getDate()))+"/" +trendate.getFullYear();
														if ($
																.inArray(
																		d,
																		$scope.scheduledate) == '-1') {
															$scope.scheduledate
																	.push(d);
															$scope.schduledatedup
																	.push(trendy);
														}
														// alert(($scope.schduledatedup).sort());
														if ($
																.inArray(
																		(data1.JobDetails[i].JOB_Name).toUpperCase(),
																		$scope.jnames) == '-1') {
															$scope.jnames
																	.push((data1.JobDetails[i].JOB_Name).toUpperCase());
														}
														
														$scope.scheduledate
																.sort();

													}
												}
												//alert($scope.jnames+"===="+$scope.scheduledate);

												var valtest = $scope.schduledatedup
														.sort();
												// alert(valtest);
												for (var m = 0; m < $scope.jnames.length; m++) {
													for (var k = 0; k < valtest.length; k++) {
														var counter = 0;
														for (var i = 0; i < (data1.JobDetails)
																.length; i++) {
															if (data1.JobDetails[i] == null
																	|| data1.JobDetails[i] == undefined) {
															}

															else {
																var chartdate = new Date((data1.JobDetails[i].Scheduled_Date).trim());
																var chartdmy = ((chartdate.getMonth())< 9?'0'+(chartdate.getMonth()+1):(chartdate.getMonth()+1)) + "/" +( (chartdate.getDate())< 10?'0'+(chartdate.getDate()):(chartdate.getDate()))+"/" +chartdate.getFullYear();
																// alert(valtest[k]+"==="+chartdmy
																//		 +"&&"+$scope.jnames[m]+"==="+(data1.JobDetails[i].JOB_Name).toUpperCase());
																if (valtest[k] == chartdmy
																		&& $scope.jnames[m] == (data1.JobDetails[i].JOB_Name).toUpperCase()
																		&& counter == 0  && data1.JobDetails[i].Trendflag == 1) { //alert("Ivneet testing "+valtest[k]+"==="+chartdmy
																				// +"&&"+$scope.jnames[m]+"==="+(data1.JobDetails[i].JOB_Name).toUpperCase());
																	counter++;
																	var durat = data1.JobDetails[i].Duration;
																	$scope.result
																			.push(durat);
																	// alert($scope.result)
																	if (durat.length > 4){
																		/*$scope.res
																				.push(parseInt(durat
																						.substr(
																								0,
																								2)));*/
																	
																	var checkdur = (parseInt(durat
																			.substr(
																					0,
																					2))*60)+(parseInt(durat
																							.substr(
																									3,
																									4)));
																	//alert("durat before calculation"+durat+"......."+checkdur);																			
																	var roundhour=(checkdur)/60;
																	var roundinghour = Math.round( roundhour * 10 ) / 10;
																	
																	//alert(roundinghour);
																	$scope.res
																	.push(roundinghour);}
																	
																	else{
																		
																	var checkval = (parseInt(durat
																			.substr(
																					0,
																					1))*60)+(parseInt(durat
																							.substr(
																									2,
																									3)));
																																					
																	var roundval=(checkval)/60;
																	var rounding = Math.round( roundval * 10 ) / 10;
																	
																	//alert(rounding);
																	$scope.res
																	.push(rounding);
																	
																	/*if(parseInt((roundval.toString()).substr(2,1))>3){
																	var finalvalue = Math.ceil(roundval);
																	
																		$scope.res
																			.push(finalvalue);}
																		else{
																		var finalvalue = Math.floor(roundval);
																		
																			$scope.res
																					.push(finalvalue);
																	}*/
																		
																	
																	
																	
																	}

																}

															}

														}

														if (counter == 0) {
															$scope.result
																	.push('-');
															$scope.res
																	.push('-');
														}
													}

													$scope.nadura
															.push({
																'name' : $scope.jnames[m],
																'data' : $scope.result
															});
													for (; j < colorarray.length;) {
														$scope.namedura
																.push({
																	'name' : $scope.jnames[m],
																	colorByPoint : false,
																	'color' : colorarray[j],
																	'data' : $scope.res
																});

														j++;
														break;
													}
													$scope.res = [];
													$scope.result = [];
												}

												$('#container')
														.highcharts(
																{
																	chart : {
																		type : 'column',
																		height:340
																	},
																	title : {
																		text : 'Batch Run Stats',
																		style : {
																			color : '#00007f'
																		}
																	},
																	xAxis : {
																		categories : $scope.scheduledate,
																		labels : {
																			style : {
																				color : '#00007f',
																				fontWeight : 'bold'
																			}
																		}
																	},
																	yAxis : {
																		min : 0,
																		padding:0,
																		title : {
																			text : 'Hours'
																		},
																		labels : {
																			style : {
																				color : '#00007f',
																				fontWeight : 'bold'
																			}
																		}
																	},
																	credits : {// gets
																				// rid
																				// of
																				// the
																				// highcharts
																				// logo
																				// in
																				// bottom
																				// right
																		enabled : false
																	},
																	legend : {
																		align : 'center',
																		x : 10,
																		verticalAlign : 'bottom',
																		y : 25,
																		padding : 12,
																		width : 250,
																		floating : false,
																		backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
																				|| 'white',
																		borderColor : '#CCC',
																		borderWidth : 1,
																		shadow : false,
																		itemStyle : {
																			fontSize : '8px'
																		}
																	},
																	plotOptions : {
																		column : {
																			stacking : 'normal',

																		},
																	},

																	series : $scope.namedura
																	
																});
												currentPageId = pageId;
												$scope.$apply();

											}).error(function(data1) {
										$scope.appBusyInd.hide();
										console.log('Error ' + data1);
									});
						};
							/*End of ETL Job Report Trend*/
							
						this.changePage = function(pageId) {
							if (pageId == 1) {
								
								$("#username").val('');
								$("#npassword").val('');
								$scope.username ='';
								$scope.npassword='';
								//navigator.app.exitApp();
							}
							
					
							currentPageId = pageId;
					
				};
				this.showDetails = function(pageId, tkt) {
					currentPageId = pageId;
					$scope.picked = tkt;
				};

				this.shouldDisplay = function(pageId) {
					return pageId === currentPageId;
				};
				
				this.msgDisplay = function(keyVal) {
					currentPageId = 1;
				};

				this.renderHtml = function() {
					return $sce
							.trustAsHtml(_this.currentFeed.description);
				};

				this.onFeedItemClicked = function(feedId) {
					this.currentFeed = this.feeds[feedId];
					currentPageId = 2;
				};

					});
	
	
	app.directive('loginPage', function(){
		return {
			restrict: 'E', 
			templateUrl: 'login-page.html'
		};
	});
	app.directive('dashboard',function(){
		return {
			restrict: 'E', 
			templateUrl: 'dashboard.html'
		};
	});
	
	
	app.directive('reportdetail', function(){
		return {
			restrict: 'E', 
			templateUrl: 'reportdetail.html'
		};
	});
	app.directive('datalatencystat', function(){
		return {
			restrict: 'E', 
			templateUrl: 'datalatencystat.html'
		};
	});
	app.directive('latencytrendreport', function(){
		return {
			restrict: 'E', 
			templateUrl: 'latencytrendreport.html'
		};
	});
	
}());
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful
// initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}