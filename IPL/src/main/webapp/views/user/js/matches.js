var contextPath="";
(function(window) {
	   "use strict";	
	   

	var _root, admin = {
			
		 populateMatchesDtls:function(matchesDtl){
			 console.log(" matchesDtl ",matchesDtl);
			 
			var matchesDtlHTML="<div class='row'>";
			for(var i in matchesDtl){
				var eachObj=matchesDtl[i];	
				if("F"===eachObj.matchType){
					var finalScore="",
						firstInnName="",
						secondInnName="";
					
					if(eachObj.toss===eachObj.team1.id){						
						firstInnName+=eachObj.team1.name;
						secondInnName+=eachObj.team2.name;
					}else{
						firstInnName+=eachObj.team2.name;
						secondInnName+=eachObj.team1.name;
					}

					finalScore+=firstInnName+" "+eachObj.firstIngsScore+"/"+eachObj.firstIngsWicket;
					finalScore+="<br/>";
					finalScore+="Overs "+eachObj.firstIngsOver;
					finalScore+="<br/>";
					finalScore+=secondInnName+" "+eachObj.scndIngsScore+"/"+eachObj.firstIngsWicket;
					finalScore+="<br/>";
					finalScore+="Overs "+eachObj.scndIngsOver;
					finalScore+="<br/>Result : "+eachObj.result;
					finalScore+="<br/><a href='matches-dtls.html?id="+eachObj.id+"' class='btn btn-default'>See Score</a>";
					
					$("#finalScore").html(finalScore);
					$("#finalTitle").html("Final "+eachObj.team1.name+" vs "+eachObj.team2.name);
				}
			}	
						//$("#teamContrainer").html(teamHTML);
		},
		loadMatch:function(teamId){
							
				var apiObj={
						url:contextPath+ "../../match",
						method:'GET',
					 	contentType:'application/json',			
				};			
				IPLCom.ajaxService.invoke(apiObj).done(function(res) {
					_root.populateMatchesDtls(res.result);	
				}).fail(IPLCom.exceptionHandler.ajaxFailure);	
				if(-1!==teamId){
			}
			
		},	
		boostrapComponentsFn : function(){
			

		},setEvents : function() {

		
		},
		load : function() {
			_root.setEvents();
			_root.boostrapComponentsFn();
			_root.loadMatch(1);
			

		},
		init : function() {
			_root = this;		
			_root.load();
			
		}	
	}
	document.addEventListener('DOMContentLoaded', admin.init.bind(admin));

})(this);