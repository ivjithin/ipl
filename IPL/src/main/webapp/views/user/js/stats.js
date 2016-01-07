var contextPath = "";
$(document).ready(
    function() {
    	getLeadingRunScorer();
    	 /* $("#ldngRun").off('click').on(
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
	      
	    }
	  });
}