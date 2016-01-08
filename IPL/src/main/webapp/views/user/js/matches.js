var contextPath="";
(function(window) {
	   "use strict";	
	   

	var _root, admin = {
		 	
		 getScores:function(eachObj){
			 var finalScore="",
				firstInnName="",
				secondInnName="",
				winnerTeamName="";
			
			if(eachObj.toss===eachObj.team1.id){						
				firstInnName+=eachObj.team1.name;
				secondInnName+=eachObj.team2.name;
			}else{
				firstInnName+=eachObj.team2.name;
				secondInnName+=eachObj.team1.name;
			}
			if(winnerTeamName*1===eachObj.team1.id){
				winnerTeamName=eachObj.team1.name;
			}else{
				winnerTeamName=eachObj.team2.name;
			}

			finalScore+=firstInnName+" "+eachObj.firstIngsScore+"/"+eachObj.firstIngsWicket;
			finalScore+="<br/>";
			finalScore+="Overs "+eachObj.firstIngsOver;
			finalScore+="<br/>";
			finalScore+=secondInnName+" "+eachObj.scndIngsScore+"/"+eachObj.firstIngsWicket;
			finalScore+="<br/>";
			finalScore+="Overs "+eachObj.scndIngsOver;
			finalScore+="<br/>Result : "+winnerTeamName+" "+eachObj.result;
			finalScore+="<br/><a href='matches-dtls.html?id="+eachObj.id+"' class='btn btn-default'>Score</a>";
			return finalScore;
		 },	
		 populateMatchesDtls:function(matchesDtl){
					 
			var matchesDtlHTML="<div class='row'>",
				quli=1,
				elimi=1,
				semi=1;
			for(var i in matchesDtl){
				var eachObj=matchesDtl[i];	
				if("F"===eachObj.matchType){						
					$("#finalScore").html(_root.getScores(eachObj));
					$("#finalTitle").html("Final "+eachObj.team1.name+" vs "+eachObj.team2.name);
				}else  if("S"===eachObj.matchType){						
					$("#semiFinal_"+semi).html(_root.getScores(eachObj));
					$("#semiFinalTitle_"+semi).html("Semi Final "+semi+" "+eachObj.team1.name+" vs "+eachObj.team2.name);		
					semi++;				
				}else  if("E"===eachObj.matchType){						
					$("#elimi_match_"+elimi).html(_root.getScores(eachObj));
					$("#elimi_title_"+elimi).html("Eliminator "+elimi+" "+eachObj.team1.name+" vs "+eachObj.team2.name);		
					elimi++;
				}else  if("Q"===eachObj.matchType){						
					$("#quli_match_"+quli).html(_root.getScores(eachObj));
					$("#quli_title_"+quli).html("Qualifier "+quli+" "+eachObj.team1.name+" vs "+eachObj.team2.name);		
					quli++;
				}
			}		
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