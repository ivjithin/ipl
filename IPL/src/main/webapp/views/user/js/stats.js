var contextPath = "";
$(document).ready(
    function() {
    	 getLeadingRunScorer();
    	 getLeadingWicketTakers();
    	 getMVP();
   
    	
    });

var getLeadingRunScorer = function (){
	var Url = contextPath+ "../../stats/leadingRunScorers"
	  $.ajax({
	    type : 'GET',
	    url : Url,
	    contentType:'application/json',
	    success : function(data) {
	    	loadLeadingRunScorers(data.result)
	      
	    }
	  });
}

var loadLeadingRunScorers = function(list){
	var leadinghtml = "";
	for(var i in list){
		var eachObj=list[i];	
		leadinghtml+="<tr>";
		leadinghtml+="<td scope='row'>"+(i*1+1)+"</td>";
		leadinghtml+= "<td> <a target='_blank' href="+eachObj.imageUrl+">"+eachObj.memberName+"</a></td>";
		leadinghtml+= "<td>"+eachObj.teamName+"</td>";
		leadinghtml+= "<td>"+eachObj.totMatches+"</td>";
		leadinghtml+= "<td>"+eachObj.totRuns+"</td>";
		leadinghtml+= "<td>"+eachObj.totBallsFaced+"</td>";
		leadinghtml+= "<td>"+eachObj.strikeRate+"</td>";
		leadinghtml+= "<td>"+eachObj.totFours+"</td>";
		leadinghtml+= "<td>"+eachObj.totSixes+"</td>";
	}
	$("#ldngRun tbody").html(leadinghtml);	
}
var getLeadingWicketTakers = function (){
	var Url = contextPath+ "../../stats/leadingWicketTakers"
	  $.ajax({
	    type : 'GET',
	    url : Url,
	    contentType:'application/json',
	    success : function(data) {
	    	loadLeadingWicketTakers(data.result)
	      
	    }
	  });
}
var loadLeadingWicketTakers = function(list){
	var leadinghtml = "";
	for(var i in list){
		var eachObj=list[i];	
		leadinghtml+="<tr>";
		leadinghtml+="<td scope='row'>"+(i*1+1)+"</td>";
		leadinghtml+= "<td> <a target='_blank' href="+eachObj.imageUrl+">"+eachObj.memberName+"</a></td>";
		leadinghtml+= "<td>"+eachObj.teamName+"</td>";
		leadinghtml+= "<td>"+eachObj.totMatches+"</td>";
		leadinghtml+= "<td>"+eachObj.totWickets+"</td>";
		leadinghtml+= "<td>"+getOver(eachObj.totBallsDelivered)+"</td>";
		leadinghtml+= "<td>"+eachObj.economy+"</td>";
	}
	$("#ldngWkt tbody").html(leadinghtml);	
}
var getOver = function(balls){
	var overs= 0.0;
	var iPart = balls / 6;
	var fPart = balls%6;
	overs = iPart + (fPart/10);
	return overs;
}
var getMVP = function(){
	var Url = contextPath+ "../../stats/mvp"
	  $.ajax({
	    type : 'GET',
	    url : Url,
	    contentType:'application/json',
	    success : function(data) {
	    	loadMVP(data.result)
	      
	    }
	  });
}
var loadMVP = function(list){
	var leadinghtml = "";
	for(var i in list){
		var eachObj=list[i];	
		leadinghtml+="<tr>";
		leadinghtml+="<td scope='row'>"+(i*1+1)+"</td>";
		leadinghtml+= "<td> <a target='_blank' href="+eachObj.imageUrl+">"+eachObj.memberName+"</a></td>";
		leadinghtml+= "<td>"+eachObj.teamName+"</td>";
		leadinghtml+= "<td>"+eachObj.totMatches+"</td>";
		leadinghtml+= "<td>"+eachObj.totWickets+"</td>";
		leadinghtml+= "<td>"+getOver(eachObj.totBallsDelivered)+"</td>";
		leadinghtml+= "<td>"+eachObj.economy+"</td>";
	}
	$("#ldngWkt tbody").html(leadinghtml);	
}