var contextPath="";
(function(window) {
	   "use strict";	
	   
	
	var service=(function(){
		
		var loadBattingTables=function(battingDtls,innType){
			var battingHtml="",
			    bowlingHtml="";			
			
			for(var i in battingDtls){
				var eachObj=battingDtls[i];	
			
				battingHtml+="<tr data-memberid='"+eachObj.id+"'>";
				battingHtml+="<td scope='row'>"+(i*1+1)+"</td>";
				battingHtml+="<td><input type='text' name='playername' class='col-lg-12' value="+eachObj.name+" readOnly ></td>";
				battingHtml+="<td><input type='text' name='runs'  class='col-lg-10'/></td>";
				battingHtml+="<td><input type='text' name='balls' class='col-lg-10'/></td>";
				battingHtml+="<td><input type='text' name='four' class='col-lg-10'/></td>";
				battingHtml+="<td><input type='text' name='six' class='col-lg-10'/></td>";
				battingHtml+="<td><input type='checkbox' name='wicketStatus'></td>";
				battingHtml+="<td><input type='checkbox'  name='isBatted'></td>";
				battingHtml+="<td><input type='text' name='wicketDescription' class='col-lg-12'/></td>";
				battingHtml+="<td><a href='javascript:void(0)' class='removeCl'>remove</a></td>";
				battingHtml+="</tr>";	
								
				bowlingHtml+="<tr>";
				bowlingHtml+="<th scope='row'>"+(i*1+1)+"</th>";
				bowlingHtml+="<td><input type='text' name='playername'  class='col-lg-12' value="+eachObj.name+" readOnly /></td>";
				bowlingHtml+="<td><input type='text' name='overs'  class='col-lg-10' /></td>";
				bowlingHtml+="<td><input type='text' name='maiden' class='col-lg-10' /></td>";
				bowlingHtml+="<td><input type='text' name='dotBalls' class='col-lg-10' /></td>";
				bowlingHtml+="<td><input type='text' name='runsGiven' class='col-lg-10' /></td>";
				bowlingHtml+="<td><input type='text' name='wickets' class='col-lg-10' /></td>";
				bowlingHtml+="<td><input type='text' name='economy' class='col-lg-10' /></td>";
				bowlingHtml+="<td><input type='text' name='catches' class='col-lg-10' /></td>";
				bowlingHtml+="<td><input type='text' name='runout'  class='col-lg-10' /></td>";
				bowlingHtml+="<td><a href='javascript:void(0)' class='removeCl'>remove</a></td>";
				bowlingHtml+="</tr>";
				
			}
			if(1===innType){
				$("#firstInnBattingtable tbody").html(battingHtml);			
				$("#secondInnBowlingtable tbody").html(bowlingHtml);
			}else{

				$("#secondInnBattingtable tbody").html(battingHtml);
				$("#firstInnBowlingtable tbody").html(bowlingHtml);
			}			
		};
		var populateBattingDtls=function(teamId,innType){
			if(-1!==teamId){				
				var apiObj={
						url:contextPath+ "../../team/members/"+teamId,
						method:'GET',
					 	contentType:'application/json',			
				};			
				IPLCom.ajaxService.invoke(apiObj).done(function(res) {
					loadBattingTables(res.result,innType);	
				}).fail(IPLCom.exceptionHandler.ajaxFailure);				
			}
		};
		
		var getBattingDetails=function(tableEl){			
			var battingArr=[];
			$(tableEl+" tbody tr").each(function(){	
				var battingObj={};
				var memberid=$(this).data("memberid");		
				battingObj["memberId"]={"id":memberid};				
				battingObj["runs"]=$(this).find("input[name=runs]").val();
				battingObj["balls"]=$(this).find("input[name=balls]").val();				
				battingObj["four"]=$(this).find("input[name=four]").val();				
				battingObj["six"]=$(this).find("input[name=six]").val();				
				battingObj["isBatted"]=$(this).find("input[name=isBatted]").is(':checked')?1:0;
				battingObj["wicketStatus"]=$(this).find("input[name=wicketStatus]").is(':checked')?1:0;				
				battingObj["wicketDescription"]=$(this).find("input[name=wicketDescription]").val();
				battingArr.push(battingObj);
			});
		
			return battingArr;
		};
		var getBowlingDetails=function(tableEl){			
			var bowlingArr=[];
			$(tableEl+" tbody tr").each(function(){	
				var bowlingObj={};
				var memberid=$(this).data("memberid");		
				bowlingObj["memberId"]={"id":memberid};		
				
				bowlingObj["overs"]=$(this).find("input[name=overs]").val();
				bowlingObj["maiden"]=$(this).find("input[name=maiden]").val();				
				bowlingObj["dotBalls"]=$(this).find("input[name=dotBalls]").val();				
				bowlingObj["runsGiven"]=$(this).find("input[name=runsGiven]").val();				
				bowlingObj["economy"]=$(this).find("input[name=economy]").val();
				bowlingObj["catches"]=$(this).find("input[name=catches]").val();			
				bowlingObj["runout"]=$(this).find("input[name=runout]").val();
				bowlingArr.push(bowlingObj);
			});
			return bowlingArr;
		};
		
		var saveMatch=function(){
			var saveData={},
			summary={};
			
			summary["matchNo"]=$("#matchNo").val();
			summary["matchType"]=$("#matchType").val();
			summary["toss"]=$("#matchToss").val();	
			summary["team1"]={"team":$("#firstInnTeamSelect").val()};
			summary["team2"]={"team":$("#secondInnTeamSelect").val()};
				
			summary["firstIngsTeam"]=$("#firstInnTeamSelect").val();			
			summary["firstIngsScore"]=$("#firstIngsScore").val();
			summary["firstIngsWicket"]=$("#firstIngsWicket").val();
			summary["firstIngsOver"]=	$("#firstIngsOver").val();						
			summary["firstIngsExtras"]=$("#firstIngsExtras").val();
				
			summary["scndIngsTeam"]=$("#secondInnTeamSelect").val();				
			summary["scndIngsScore"]=$("#scndIngsScore").val();
			summary["scndIngsWicket"]=$("#scndIngsWicket").val();
			summary["scndIngsOver"]=$("#scndIngsOver").val();							
			summary["scndIngsExtras"]=	$("#scndIngsExtras").val();	
				
			summary["winner"]=$("#winnerTeam").val();
			summary["result"]=$("#winnerTeamResults").val();

			
			saveData["summary"]=summary;
			
			var firstInnings={},
				secondInnings={};			
			firstInnings["battingDetails"]=getBattingDetails("#firstInnBattingtable");
			firstInnings["bowlingDetails"]=getBowlingDetails("#firstInnBowlingtable");			
			secondInnings["battingDetails"]=getBattingDetails("#secondInnBattingtable");
			secondInnings["bowlingDetails"]=getBowlingDetails("#secondInnBowlingtable");			
			saveData["firstInnings"]=firstInnings;
			saveData["secondInnings"]=secondInnings;
			
			
			
			console.log( " saveData" ,saveData)
			saveData=JSON.stringify(saveData);
			
			var apiObj={
					url:contextPath+ "../../match",
					method:'POST',
				 	contentType:'application/json',	
				 	data:saveData
			};
		
			IPLCom.ajaxService.invoke(apiObj).done(function(res) {
				loadBattingTables(res.result,innType);
					console.log(" res",res.result);			
			}).fail(IPLCom.exceptionHandler.ajaxFailure);/*	*/
			
			
		};
		return {
			populateBattingDtls:populateBattingDtls,
	
			saveMatch:saveMatch
			
		};
	})();   
	
	var _root, admin = {	
		boostrapComponentsFn : function(){
			 $("table tbody").sortable({ 				     
				 stop: function(event,ui) {
					 $("#firstInnBattingtable tbody tr").each(function(i){
						 $(this).find("td:eq(0)").html((i*1+1));
					 });
					 $("#firstInnBowlingtable tbody tr").each(function(i){
						 $(this).find("td:eq(0)").html((i*1+1));
					 });
					 
					 $("#secondInnBattingtable tbody tr").each(function(i){
						 $(this).find("td:eq(0)").html((i*1+1));
					 });
					 
					 $("#secondInnBowlingtable tbody tr").each(function(i){
						 $(this).find("td:eq(0)").html((i*1+1));
					 });
				 }  
			 }).disableSelection();
				
		},
		el : {
			body:$("body"),
			window:$(window),			
		},	
		setEvents : function() {
			_root.el.window.on('hashchange', _root.URLHashChangeHandler);
			_root.el.window.on('resize', _root.windowResizeHandler);
			
			$("#firstInnTeamSelect").change(function(){
				var teamId=$(this).val()*1;
				service.populateBattingDtls(teamId,1);
			});
			$("#secondInnTeamSelect").change(function(){
				var teamId=$(this).val()*1;
				service.populateBattingDtls(teamId,2);
			});
			
			$("#saveMatch").click(function(){
				
				service.saveMatch();
			});
			$(".removeCl").on("click",function(){
				alert("ddd")
				$(this).parent().parent().remove();
			});
		},
		load : function() {
			_root.setEvents();
			_root.boostrapComponentsFn();
			
			//_root.indexPageSetUp();
		},
		init : function() {
			_root = this;
		
			_root.load();
			
		}	
	}
	document.addEventListener('DOMContentLoaded', admin.init.bind(admin));
	window.publicModule = {
				
	}
})(this);