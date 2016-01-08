
var IPLCom=(function(){
	var ajaxService={				
		invoke:function(urlObj){					
		    return $.ajax(urlObj);  	
		}	
	};
	
		
	
	var exceptionHandler={
		ajaxFailure: function(jqXHR,error, errorThrown) {
            var message;
            var statusErrorMap = {
                400 : "Server understood the request but request content was invalid.",
                401 : "Unauthorised access.",
                403 : "Forbidden resouce can't be accessed",
                404:  "The requested resource is not available",
                500 : "Internal Server Error.",
                503 : "Service Unavailable"
            };           
            if (jqXHR.status) {            
                message =statusErrorMap[jqXHR.status];            
            }        
            if(!message){
              //  message="Something went wrong";
            	  message="Internal Server Error.";
            }
            /*if(!!CMSGl_Data.userLogin){
            	if(!CMSCom.isUserSessionExists(CMSGl_Data.userLogin)){ // if user session expires 
            		message="Session Expired, Please Login again";
            		logoutRedirect();
            	}
            }*/

           // var msg={session:0,msg:message};
            //CMSMessage.showCommonMsg(msg);
		},
		isLoginSessionExpire:function(data){
			var jsonResData=null,
				result=true;
		    try {
		    	jsonResData=typeof data ==='object' ? data : JSON.parse(data);	
		    	if("status" in jsonResData && jsonResData["status"]===false){
				 //  logoutRedirect();				   
				   result=false
		    	}
		    }catch(e){
				result=false;
		    }		    
			return result;
		}
	};	
	
	
	var oversToBalls=function(wickets){		
		var over=Math.floor(wickets),
			 decimal = wickets- Math.floor(wickets),
			 balls=0;
		balls=over*6+decimal*10;
		return balls;
	};

	return {
		ajaxService:ajaxService,
		exceptionHandler:exceptionHandler,
		oversToBalls:oversToBalls
	}
	
})();






