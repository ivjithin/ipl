var contextPath="";
(function(window) {
	   "use strict";	
	   

	var _root, admin = {
			
		populateTeamDtls:function(teamDtl){
			var teamHTML="<div class='row'>";
			for(var i in teamDtl){
				var eachObj=teamDtl[i];	
				teamHTML+="<div class='col-lg-2 col-sm-4 text-center'>";
				teamHTML+="<img class='img-circle img-responsive img-center' src='"+eachObj.imageUrl+"' alt=''>";
				teamHTML+="<h3>"+eachObj.name;
				if(eachObj.isCaptain){
					teamHTML+="<small>Captain</small>";	
				}				
				teamHTML+="</h3>";
				teamHTML+="<p></p>";
				teamHTML+="</div>";
				if(((i*1)!==0)&&(((i*1+1)%6)===0)){
					teamHTML+="</div><div class='row'>";
				}
			}	
			teamHTML+="</div>";
			$("#teamContrainer").html(teamHTML);
		},
		loadTeam:function(teamId){
			if(-1!==teamId){				
				var apiObj={
						url:contextPath+ "../../team/members/"+teamId,
						method:'GET',
					 	contentType:'application/json',			
				};			
				IPLCom.ajaxService.invoke(apiObj).done(function(res) {
					_root.populateTeamDtls(res.result);	
				}).fail(IPLCom.exceptionHandler.ajaxFailure);				
			}
			
		},	
		boostrapComponentsFn : function(){
			

		},setEvents : function() {
			$("#selectTeam").change(function(){
				var teamId=$(this).val()*1,
					optionText=$(this).find("option:selected").text();
				_root.loadTeam(teamId,1);
				$("#teamTitle").html("Team : "+optionText);
			});
		
		},
		load : function() {
			_root.setEvents();
			_root.boostrapComponentsFn();
			_root.loadTeam(1);
			

		},
		init : function() {
			_root = this;		
			_root.load();
			
		}	
	}
	document.addEventListener('DOMContentLoaded', admin.init.bind(admin));

})(this);