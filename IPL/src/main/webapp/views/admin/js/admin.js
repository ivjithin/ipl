var contextPath="";
(function(window) {
	   "use strict";	
	   
	
	var service=(function(){
		
		var loadBattingTables=function(battingDtls,innType,innName){
			var battingHtml="",
			    bowlingHtml="";			
			
			for(var i in battingDtls){
				var eachObj=battingDtls[i];	
				battingHtml+="<tr data-memberid='"+eachObj.id+"' data-teamid='"+eachObj.team.id+"'>";
				battingHtml+="<td scope='row' class='handle'>"+(i*1+1)+"</td>";
				battingHtml+="<td><input type='text' name='playername' class='col-lg-12' value="+eachObj.name+" readOnly ></td>";
				battingHtml+="<td><input type='text' name='runs'  class='col-lg-10' value='0'/></td>";
				battingHtml+="<td><input type='text' name='balls' class='col-lg-10' value='0'/></td>";
				battingHtml+="<td><input type='text' name='four' class='col-lg-10' value='0'/></td>";
				battingHtml+="<td><input type='text' name='six' class='col-lg-10' value='0'/></td>";
				battingHtml+="<td><input type='checkbox'  name='isBatted'></td>";
				battingHtml+="<td><input type='checkbox' name='wicketStatus'></td>";				
				battingHtml+="<td><input type='text' name='wicketDescription' class='col-lg-12'/></td>";
				battingHtml+="<td><a href='javascript:void(0)' class='removeCl glyphicon glyphicon-remove'></a></td>";
				battingHtml+="</tr>";	
								
				bowlingHtml+="<tr  data-memberid='"+eachObj.id+"' data-teamid='"+eachObj.team.id+"'>";
				bowlingHtml+="<td scope='row' class='handle'>"+(i*1+1)+"</td>";
				bowlingHtml+="<td><input type='text' name='playername'  class='col-lg-12' value="+eachObj.name+" readOnly /></td>";
				bowlingHtml+="<td><input type='text' name='overs'  class='col-lg-10' value='0' /></td>";
				bowlingHtml+="<td><input type='text' name='maiden' class='col-lg-10' value='0'/></td>";
				bowlingHtml+="<td><input type='text' name='dotBalls' class='col-lg-10' value='0' /></td>";
				bowlingHtml+="<td><input type='text' name='runsGiven' class='col-lg-10' value='0' /></td>";
				bowlingHtml+="<td><input type='text' name='wickets' class='col-lg-10' value='0'/></td>";
				bowlingHtml+="<td><input type='text' name='economy' class='col-lg-10' value='0' /></td>";
				bowlingHtml+="<td><input type='text' name='catches' class='col-lg-10' value='0' /></td>";
				bowlingHtml+="<td><input type='text' name='runout'  class='col-lg-10' value='0' /></td>";
				bowlingHtml+="<td><a href='javascript:void(0)' class='removeCl glyphicon glyphicon-remove'></a></td>";
				bowlingHtml+="</tr>";
				
			}
			if(1===innType){
				$("#firstInnBattingtable tbody").html(battingHtml);			
				$("#secondInnBowlingtable tbody").html(bowlingHtml);
				
				$("#firstInnBattingTitle").html(" Batting : <b>"+innName+"</b>");
				$("#secondInnBowlingTitle").html(" Bowling : <b>"+innName+"</b>");
			}else{

				$("#secondInnBattingtable tbody").html(battingHtml);
				$("#firstInnBowlingtable tbody").html(bowlingHtml);
				
				$("#secondInnBattingTitle").html(" Batting : <b>"+innName+"</b>");
				$("#firstInnBowlingTitle").html(" Bowling : <b>"+innName+"</b>");
			}	
			$('table tbody input').click(function() { $(this).focus(); });
			
		};
		var populateBattingDtls=function(teamId,innType,innName){
			if(-1!==teamId){				
				var apiObj={
						url:contextPath+ "../../team/members/"+teamId,
						method:'GET',
					 	contentType:'application/json',			
				};			
				IPLCom.ajaxService.invoke(apiObj).done(function(res) {
					loadBattingTables(res.result,innType,innName);	
				}).fail(IPLCom.exceptionHandler.ajaxFailure);				
			}
		};
		
		var getBattingDetails=function(tableEl,innings){			
			var battingArr=[];
			$(tableEl+" tbody tr").each(function(){	
				var battingObj={};
				var memberid=$(this).data("memberid"),
				teamId=$(this).data("teamid");
				battingObj["memberId"]={"id":memberid};	
				battingObj["teamId"]={"id":teamId};	
				battingObj["runs"]=$(this).find("input[name=runs]").val()*1;
				battingObj["balls"]=$(this).find("input[name=balls]").val()*1;				
				battingObj["four"]=$(this).find("input[name=four]").val()*1;				
				battingObj["six"]=$(this).find("input[name=six]").val()*1;				
				battingObj["isBatted"]=$(this).find("input[name=isBatted]").is(':checked')?1:0;
				battingObj["wicketStatus"]=$(this).find("input[name=wicketStatus]").is(':checked')?1:0;				
				battingObj["wicketDescription"]=$(this).find("input[name=wicketDescription]").val();
				battingObj["innings"]=innings;
				battingArr.push(battingObj);
			});
		
			return battingArr;
		};
		var getBowlingDetails=function(tableEl,innings){			
			var bowlingArr=[];
			$(tableEl+" tbody tr").each(function(){	
				var bowlingObj={};
				var memberid=$(this).data("memberid"),
					teamId=$(this).data("teamid");
				bowlingObj["memberId"]={"id":memberid};		
				bowlingObj["teamId"]={"id":teamId};	
				var overs=$(this).find("input[name=overs]").val()*1;
				
				bowlingObj["overs"]=overs;
				
				bowlingObj["balls"]=IPLCom.oversToBalls(overs);
				
				bowlingObj["maiden"]=$(this).find("input[name=maiden]").val()*1;				
				bowlingObj["dotBalls"]=$(this).find("input[name=dotBalls]").val()*1;				
				bowlingObj["runsGiven"]=$(this).find("input[name=runsGiven]").val()*1;				
				bowlingObj["economy"]=$(this).find("input[name=economy]").val()*1;
				bowlingObj["catches"]=$(this).find("input[name=catches]").val()*1;			
				bowlingObj["runout"]=$(this).find("input[name=runout]").val()*1;
				bowlingObj["innings"]=innings;
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
			summary["team1"]={"id":$("#firstInnTeamSelect").val()*1};
			summary["team2"]={"id":$("#secondInnTeamSelect").val()*1};
				
			summary["firstIngsTeam"]=$("#firstInnTeamSelect").val()*1;			
			summary["firstIngsScore"]=$("#firstIngsScore").val()*1;
			summary["firstIngsWicket"]=$("#firstIngsWicket").val()*1;
			summary["firstIngsOver"]=	$("#firstIngsOver").val()*1;						
			summary["firstIngsExtras"]=$("#firstIngsExtras").val()*1;
				
			summary["scndIngsTeam"]=$("#secondInnTeamSelect").val()*1;
			var scndIngsScore=$("#scndIngsScore").val();
			summary["scndIngsScore"]=scndIngsScore*1;
			summary["scndIngsWicket"]=$("#scndIngsWicket").val()*1;
			summary["scndIngsOver"]=$("#scndIngsOver").val()*1;							
			summary["scndIngsExtras"]=	$("#scndIngsExtras").val()*1;	
				
			summary["winner"]=$("#winnerTeam").val();
			summary["result"]=$("#winnerTeamResults").val();

			
			saveData["summary"]=summary;
			
			var firstInnings={},
				secondInnings={};			
			firstInnings["battingDetails"]=getBattingDetails("#firstInnBattingtable",1);
			firstInnings["bowlingDetails"]=getBowlingDetails("#firstInnBowlingtable",1);			
			secondInnings["battingDetails"]=getBattingDetails("#secondInnBattingtable",2);
			secondInnings["bowlingDetails"]=getBowlingDetails("#secondInnBowlingtable",2);			
			saveData["firstInnings"]=firstInnings;
			saveData["secondInnings"]=secondInnings;
			
			saveData=JSON.stringify(saveData);
			
			var apiObj={
					url:contextPath+ "../../match",
					method:'POST',
				 	contentType:'application/json',	
				 	data:saveData
			};
			console.log(saveData);
			if(!!scndIngsScore){
				alert("Saved ")
				/*IPLCom.ajaxService.invoke(apiObj).done(function(res) {
					if(res.result){
						$(".savedMsg").removeClass("error");
						$(".savedMsg").addClass("success");							
						$(".savedMsg").html("Saved Successfully");
						
						$("#firstInnBattingtable tbody").html("");			
						$("#secondInnBowlingtable tbody").html("");
						$("#secondInnBattingtable tbody").html("");
						$("#firstInnBowlingtable tbody").html("");
						$("#winnerTeamResults").val("");
						$("#matchNo").val("");
						$("select").select2("val", "-1");
					}else{
						$(".savedMsg").removeClass("success");	
						$(".savedMsg").addClass("error");						
						$(".savedMsg").html(res.message);
					}
					$(".savedMsg").show();
					setTimeout(function(){
						 $(".savedMsg").fadeOut(1000);
					},1000);				
					$("html, body").animate({ scrollTop: 0 }, "slow");
				}).fail(IPLCom.exceptionHandler.ajaxFailure);	*/
			}else{
				alert(" Please Enter 2nd Innings details ")
			}
			
			
			
		};
		
		var updateTableIndex=function(){
			
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
		};
		return {
			populateBattingDtls:populateBattingDtls,
			updateTableIndex:updateTableIndex,
			saveMatch:saveMatch
			
		};
	})();   
	
	var _root, admin = {	
		boostrapComponentsFn : function(){
			 $("table tbody").sortable({ 	
				 handle: '.handle',
				 stop: function(event,ui) {
					 service.updateTableIndex();
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
				var teamId=$(this).val()*1,
				optionText=$(this).find("option:selected").text();
				service.populateBattingDtls(teamId,1,optionText);
			});
			$("#secondInnTeamSelect").change(function(){
				var teamId=$(this).val()*1,
				optionText=$(this).find("option:selected").text();
				service.populateBattingDtls(teamId,2,optionText);
			});
			
			$("#saveMatch").click(function(){		
				 if (confirm("Please ensure that you have entered both 1st Innings and 2nd Innings score !") == true) {
					 service.saveMatch();
				 } else {
				        
				 }				 
			});
			$("table").on("click","a.removeCl",function(){			
				$(this).parent().parent().remove();
				 service.updateTableIndex();
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