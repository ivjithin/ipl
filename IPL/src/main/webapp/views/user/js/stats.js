var contextPath = "";
$(document).ready(
    function() {
    	 getLeadingRunScorer();
    	  /*$("#ldngRun").off('click').on(
    	          'click',
    	          function() {
    	        	  getLeadingRunScorer();
    	          });*/
    	
    });

var getLeadingRunScorer = function (){
	var Url = contextPath+ "../../stats/leadingRunScorers"
	  $.ajax({
	    type : 'GET',
	    url : Url,
	    contentType:'application/json',
	    success : function(data) {
	    	console.log("data",data);
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