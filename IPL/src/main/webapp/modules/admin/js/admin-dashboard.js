var adminDashboard=(function(){
	
	var showDashboardPage=function(){
		var apiObj=SM_ADMIN.api["getDashboardDetails"];		
		SMAPCom.ajaxService.invoke(apiObj).done(function(res) {
			if(SMAPCom.exceptionHandler.isLoginSessionExpire(res)){
				if(!!res.status){
				$("#doctorsCount").html(res.resData.drCounts);
				$("#departmentsCount").html(res.resData.deptCounts);
				}
			}					
		}).fail(SMAPCom.exceptionHandler.ajaxFailure);
	};

	return {
		showDashboardPage:showDashboardPage
	};
})();