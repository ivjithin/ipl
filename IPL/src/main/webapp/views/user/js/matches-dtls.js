var contextPath="";
(function(window) {
	   "use strict";	
	   

	var _root, admin = {
			
		 loadbatting:function(battingDetails,htmlEl){
			 var battingHtml="";
			 for(var i in battingDetails){
				 var eachObj=battingDetails[i];
				 battingHtml+="<tr>";
				 battingHtml+="<td>"+eachObj.memberId.name+"</td>";
				 battingHtml+="<td>"+(!!eachObj.wicketDescription?eachObj.wicketDescription:"")+"</td>";
				 battingHtml+="<td>"+eachObj.runs+"</td>";
				 battingHtml+="<td>"+eachObj.balls+"</td>";
				 battingHtml+="<td>"+eachObj.fours+"</td>";
				 battingHtml+="<td>"+eachObj.sixes+"</td>";
				 battingHtml+="</tr>";
				 if(i*1===10){
					 break;
				 }
			 }
			 $(htmlEl+" tbody").html(battingHtml);
		 },
		 loadbowling:function(bowlingDetails,htmlEl){
			 var bowlingHtml="";
			 for(var i in bowlingDetails){
				 var eachObj=bowlingDetails[i];			
				 if(eachObj.overs*1!==0){					 
					 bowlingHtml+="<tr>";
					 bowlingHtml+="<td>"+eachObj.memberId.name+"</td>";
					 bowlingHtml+="<td>"+eachObj.overs+"</td>";
					 bowlingHtml+="<td>"+eachObj.maiden+"</td>";
					 bowlingHtml+="<td>"+eachObj.runsGiven+"</td>";
					 bowlingHtml+="<td>"+eachObj.wickets+"</td>";
					 bowlingHtml+="<td>"+eachObj.economy+"</td>";
					 bowlingHtml+="</tr>"; 					 
				 }			
			 }
			 $(htmlEl+" tbody").html(bowlingHtml);
		 },	
		 populateMatchesDtls:function(matchesDtl){
			
			var firstbatting=matchesDtl.firstInnings.battingDetails,
			firstbowling=matchesDtl.firstInnings.bowlingDetails,
			secondbatting=matchesDtl.secondInnings.battingDetails,
			secondbowling=matchesDtl.secondInnings.bowlingDetails;
			
			_root.loadbatting(firstbatting,"#firstInnBattingtable");
			_root.loadbowling(firstbowling,"#firstInnBowlingtable");
			_root.loadbatting(secondbatting,"#scndInnBattingtable");
			_root.loadbowling(secondbowling,"#scndInnBowlingtable");
			
			var summary=matchesDtl.summary,
				firstInnName="",
				secondInnName="",
				winnerTeamName="";
			if(summary.toss===summary.team1.id){						
				firstInnName+=summary.team1.name;
				secondInnName+=summary.team2.name;
			}else{
				firstInnName+=summary.team2.name;
				secondInnName+=summary.team1.name;
			}
			if(winnerTeamName*1===summary.team1.id){
				winnerTeamName=summary.team1.name;
			}else{
				winnerTeamName=summary.team2.name;
			}
			
			$("#firstInnBattingTitle").html(firstInnName);
			$("#scndInnBattingTitle").html(secondInnName);
			
			$("#fistInnWicketsOvers").html("( "+summary.firstIngsWicket+" wickets;"+summary.firstIngsOver+" overs)");
			$("#firstInnScore").html(summary.firstIngsScore);
			
			$("#scndInnWicketsOvers").html("( "+summary.scndIngsWicket+" wickets;"+summary.scndIngsOver+" overs)");
			$("#scndInnScore").html(summary.scndIngsScore);
			
			var //firstBalls=IPLCom.oversToBalls(summary.firstIngsOver),
				firstRpo=summary.firstIngsScore*1/summary.firstIngsOver,
				//secondBalls=IPLCom.oversToBalls(summary.scndIngsOver),
				secondRpo=summary.scndIngsScore*1/summary.scndIngsOver;
			
			$("#firstInnRPO").html(firstRpo.toFixed(2)+" RPO");
			$("#scndInnRPO").html(secondRpo.toFixed(2)+" RPO");
			$("#matchTitle").html(summary.team1.name+" vs "+summary.team2.name );
			$("#matchResult").html(winnerTeamName+" "+summary.result);
			
		},
		loadMatch:function(id){							
				var apiObj={
						url:contextPath+ "../../match/"+id,
						method:'GET',
					 	contentType:'application/json',			
				};			
				IPLCom.ajaxService.invoke(apiObj).done(function(res) {
					_root.populateMatchesDtls(res.result);	
				}).fail(IPLCom.exceptionHandler.ajaxFailure);				
		},	
		boostrapComponentsFn : function(){
			

		},setEvents : function() {

		
		},
		load : function() {
			_root.setEvents();
			_root.boostrapComponentsFn();			
			var id = location.search.split('id=')[1];		
		 	_root.loadMatch(id);
		},
		init : function() {
			_root = this;		
			_root.load();
			
		}	
	}
	document.addEventListener('DOMContentLoaded', admin.init.bind(admin));

})(this);